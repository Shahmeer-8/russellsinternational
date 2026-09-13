import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutStatement from "@/components/AboutStatement";

const mockUsePageSections = vi.fn();
const mockUseStats = vi.fn();

vi.mock("@/hooks/api", () => ({
  usePageSections: () => mockUsePageSections(),
  useStats: () => mockUseStats(),
}));

const renderIt = () =>
  render(
    <MemoryRouter>
      <AboutStatement />
    </MemoryRouter>,
  );

beforeEach(() => {
  mockUsePageSections.mockReturnValue({ data: undefined, isLoading: true });
  mockUseStats.mockReturnValue({ data: undefined, isLoading: true });
});

describe("AboutStatement", () => {
  it("mounts its wrapper while still loading", () => {
    const { container } = renderIt();

    expect(container.querySelector("section")).toBeTruthy();
  });

  it("renders the admin-managed statement and body", () => {
    mockUsePageSections.mockReturnValue({
      data: { data: { campus_life: { title: "A living, learning ecosystem", body: "Training labs and counselling spaces." } } },
      isLoading: false,
    });
    mockUseStats.mockReturnValue({ data: { data: [] }, isLoading: false });

    renderIt();

    expect(screen.getByText("A living, learning ecosystem")).toBeTruthy();
    expect(screen.getByText("Training labs and counselling spaces.")).toBeTruthy();
  });

  it("shows the figures that carry the credibility", () => {
    mockUsePageSections.mockReturnValue({ data: { data: {} }, isLoading: false });
    mockUseStats.mockReturnValue({
      data: { data: [
        { id: 1, value: "5,000+", label: "Students Placed", icon_name: "Users" },
        { id: 2, value: "95%", label: "Visa Success Rate", icon_name: "ShieldCheck" },
      ] },
      isLoading: false,
    });

    renderIt();

    expect(screen.getByText("5,000+")).toBeTruthy();
    expect(screen.getByText("Students Placed")).toBeTruthy();
    expect(screen.getByText("95%")).toBeTruthy();
  });

  it("renders without figures when none are published", () => {
    mockUsePageSections.mockReturnValue({ data: { data: {} }, isLoading: false });
    mockUseStats.mockReturnValue({ data: { data: [] }, isLoading: false });

    const { container } = renderIt();

    expect(container.querySelector("section")).toBeTruthy();
    expect(container.querySelector("dl")).toBeNull();
  });

  it("links the call to action when the section supplies one", () => {
    mockUsePageSections.mockReturnValue({
      data: { data: { campus_life: { cta_label: "Contact us", cta_url: "/#contact" } } },
      isLoading: false,
    });
    mockUseStats.mockReturnValue({ data: { data: [] }, isLoading: false });

    renderIt();

    expect(screen.getByRole("link", { name: /contact us/i }).getAttribute("href")).toBe("/#contact");
  });
});
