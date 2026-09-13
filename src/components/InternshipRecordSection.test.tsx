import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import InternshipRecordSection from "@/components/InternshipRecordSection";

const mockUseInternshipRecords = vi.fn();

vi.mock("@/hooks/api", () => ({
  useInternshipRecords: () => mockUseInternshipRecords(),
}));

vi.mock("@/hooks/useSectionCopy", () => ({
  useSectionCopy: () => (_field: string, fallback: string) => fallback,
}));

const record = (over = {}) => ({
  id: 1,
  title: "Frontend Development Internship",
  period: "Summer 2025",
  participants_count: 24,
  description: "A twelve-week cohort building real interfaces.",
  achievements: ["18 interns placed in full-time roles", "6 client projects shipped"],
  image_url: null,
  ...over,
});

beforeEach(() => {
  mockUseInternshipRecords.mockReturnValue({ data: undefined, isLoading: true });
});

describe("InternshipRecordSection", () => {
  it("mounts its wrapper while still loading", () => {
    const { container } = render(<InternshipRecordSection />);

    expect(container.querySelector("section")).toBeTruthy();
  });

  it("renders nothing once loaded with no records", () => {
    mockUseInternshipRecords.mockReturnValue({ data: { data: [] }, isLoading: false });

    const { container } = render(<InternshipRecordSection />);

    expect(container.querySelector("section")).toBeNull();
  });

  it("renders the programme, period, participants and achievements", () => {
    mockUseInternshipRecords.mockReturnValue({ data: { data: [record()] }, isLoading: false });

    render(<InternshipRecordSection />);

    expect(screen.getByText("Frontend Development Internship")).toBeTruthy();
    expect(screen.getByText("Summer 2025")).toBeTruthy();
    expect(screen.getByText(/24/)).toBeTruthy();
    expect(screen.getByText("18 interns placed in full-time roles")).toBeTruthy();
    expect(screen.getByText("6 client projects shipped")).toBeTruthy();
  });

  it("omits the participant count when the record has none", () => {
    mockUseInternshipRecords.mockReturnValue({
      data: { data: [record({ participants_count: null })] },
      isLoading: false,
    });

    render(<InternshipRecordSection />);

    expect(screen.getByText("Frontend Development Internship")).toBeTruthy();
    expect(screen.queryByText(/participants/i)).toBeNull();
  });

  it("survives a record whose achievements list is missing", () => {
    mockUseInternshipRecords.mockReturnValue({
      data: { data: [record({ achievements: undefined })] },
      isLoading: false,
    });

    render(<InternshipRecordSection />);

    expect(screen.getByText("Frontend Development Internship")).toBeTruthy();
  });
});
