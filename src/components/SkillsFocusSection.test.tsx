import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SkillsFocusSection from "@/components/SkillsFocusSection";

const mockUsePageSections = vi.fn();

vi.mock("@/hooks/api", () => ({
  usePageSections: () => mockUsePageSections(),
}));

const renderSection = () =>
  render(
    <MemoryRouter>
      <SkillsFocusSection />
    </MemoryRouter>,
  );

beforeEach(() => {
  mockUsePageSections.mockReturnValue({ data: undefined, isLoading: true });
});

describe("SkillsFocusSection", () => {
  it("mounts its wrapper while still loading", () => {
    const { container } = renderSection();

    expect(container.querySelector("section")).toBeTruthy();
  });

  it("renders its own heading rather than a shared one", () => {
    mockUsePageSections.mockReturnValue({
      data: {
        data: {
          skills_focus: {
            eyebrow: "Skills Focus",
            title: "Practical programs for job-ready IT skills.",
            subtitle: "Hands-on IT programs built around real projects.",
          },
        },
      },
      isLoading: false,
    });

    renderSection();

    expect(screen.getByText("Skills Focus")).toBeTruthy();
    expect(
      screen.getByText("Practical programs for job-ready IT skills."),
    ).toBeTruthy();
    expect(
      screen.getByText("Hands-on IT programs built around real projects."),
    ).toBeTruthy();
  });

  it("renders admin-managed courses from the section items", () => {
    mockUsePageSections.mockReturnValue({
      data: {
        data: {
          skills_focus: {
            items: {
              course_1_title: "Cyber Security",
              course_1_meta: "3 months",
            },
          },
        },
      },
      isLoading: false,
    });

    renderSection();

    expect(screen.getByText("Cyber Security")).toBeTruthy();
    expect(screen.getByText("3 months")).toBeTruthy();
    expect(screen.queryByText("Full Stack Web Development")).toBeNull();
  });

  it("falls back to default courses when the section has no items", () => {
    mockUsePageSections.mockReturnValue({ data: { data: {} }, isLoading: false });

    renderSection();

    expect(screen.getByText("Full Stack Web Development")).toBeTruthy();
    expect(screen.getByText("AI & Machine Learning")).toBeTruthy();
    expect(screen.getByText("Data Science & Analytics")).toBeTruthy();
  });

  it("points its call to action at the skills page by default", () => {
    mockUsePageSections.mockReturnValue({ data: { data: {} }, isLoading: false });

    renderSection();

    const cta = screen.getByRole("link", { name: /view skill programs/i });
    expect(cta.getAttribute("href")).toBe("/skills");
  });
});
