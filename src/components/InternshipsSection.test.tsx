import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import InternshipsSection from "@/components/InternshipsSection";

const mockUseInternships = vi.fn();

vi.mock("@/hooks/api", () => ({
  useInternships: () => mockUseInternships(),
}));

vi.mock("@/hooks/useSectionCopy", () => ({
  useSectionCopy: (_page: string, key: string) => (field: string, fallback: string) =>
    `${key}:${field}` === "internships_summer:title"
      ? "Summer Internship Programs"
      : `${key}:${field}` === "internships_paid:title"
        ? "Paid Internships"
        : fallback,
}));

const internship = (over = {}) => ({
  id: 1,
  title: "Frontend Development Intern",
  company: "Russell's International",
  location: "Gojra",
  duration: "3 Months",
  type: "Paid",
  category: "regular",
  description: "Build real interfaces.",
  skills: ["React"],
  gains: ["Portfolio"],
  image_url: null,
  ...over,
});

const setData = (rows: unknown[]) =>
  mockUseInternships.mockReturnValue({ data: { data: { data: rows } }, isLoading: false });

beforeEach(() => {
  mockUseInternships.mockReturnValue({ data: undefined, isLoading: true });
});

describe("InternshipsSection groups", () => {
  it("mounts its wrapper while still loading", () => {
    const { container } = render(<InternshipsSection />);

    expect(container.querySelector("section")).toBeTruthy();
  });

  it("splits listings into the paid and summer groups", () => {
    setData([
      internship(),
      internship({ id: 2, title: "Summer Data Intern", category: "summer" }),
    ]);

    render(<InternshipsSection />);

    expect(screen.getByText("Paid Internships")).toBeTruthy();
    expect(screen.getByText("Summer Internship Programs")).toBeTruthy();
    expect(screen.getByText("Frontend Development Intern")).toBeTruthy();
    expect(screen.getByText("Summer Data Intern")).toBeTruthy();
  });

  it("hides a group heading when that group has no listings", () => {
    setData([internship()]);

    render(<InternshipsSection />);

    expect(screen.getByText("Paid Internships")).toBeTruthy();
    expect(screen.queryByText("Summer Internship Programs")).toBeNull();
  });

  it("treats a listing with no category as a regular one", () => {
    setData([internship({ category: undefined })]);

    render(<InternshipsSection />);

    expect(screen.getByText("Paid Internships")).toBeTruthy();
    expect(screen.getByText("Frontend Development Intern")).toBeTruthy();
  });
});
