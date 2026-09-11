import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StudyAbroadSection from "@/components/StudyAbroadSection";

const mockUsePageSections = vi.fn();

vi.mock("@/hooks/api", () => ({
  usePageSections: () => mockUsePageSections(),
}));

const renderSection = () =>
  render(
    <MemoryRouter>
      <StudyAbroadSection />
    </MemoryRouter>,
  );

beforeEach(() => {
  mockUsePageSections.mockReturnValue({ data: undefined, isLoading: true });
});

describe("StudyAbroadSection", () => {
  it("mounts its wrapper while still loading", () => {
    const { container } = renderSection();

    expect(container.querySelector("section")).toBeTruthy();
  });

  it("renders its own heading rather than a shared one", () => {
    mockUsePageSections.mockReturnValue({
      data: {
        data: {
          study_abroad: {
            eyebrow: "Study Abroad",
            title: "From country shortlisting to visa file guidance.",
            subtitle: "Compare destinations and prepare a stronger application.",
          },
        },
      },
      isLoading: false,
    });

    renderSection();

    expect(screen.getByText("Study Abroad")).toBeTruthy();
    expect(
      screen.getByText("From country shortlisting to visa file guidance."),
    ).toBeTruthy();
    expect(
      screen.getByText("Compare destinations and prepare a stronger application."),
    ).toBeTruthy();
  });

  it("renders admin-managed countries from the section items", () => {
    mockUsePageSections.mockReturnValue({
      data: {
        data: {
          study_abroad: {
            items: {
              country_1_code: "DE",
              country_1_name: "Germany",
              country_1_meta: "20+ universities",
            },
          },
        },
      },
      isLoading: false,
    });

    renderSection();

    expect(screen.getByText("Germany")).toBeTruthy();
    expect(screen.getByText("20+ universities")).toBeTruthy();
    expect(screen.queryByText("United Kingdom")).toBeNull();
  });

  it("falls back to default countries when the section has no items", () => {
    mockUsePageSections.mockReturnValue({ data: { data: {} }, isLoading: false });

    renderSection();

    expect(screen.getByText("United Kingdom")).toBeTruthy();
    expect(screen.getByText("Canada")).toBeTruthy();
    expect(screen.getByText("Australia")).toBeTruthy();
  });

  it("points its call to action at the study abroad page by default", () => {
    mockUsePageSections.mockReturnValue({ data: { data: {} }, isLoading: false });

    renderSection();

    const cta = screen.getByRole("link", { name: /explore study abroad/i });
    expect(cta.getAttribute("href")).toBe("/study-abroad");
  });
});
