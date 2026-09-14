import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutTeam from "@/components/AboutTeam";

const mockUseTeamMembers = vi.fn();

vi.mock("@/hooks/api", () => ({
  useTeamMembers: () => mockUseTeamMembers(),
  // The heading is admin-editable now; these tests are about the grouping, so an
  // empty response leaves the component on its own fallback wording.
  usePageSections: () => ({ data: undefined }),
}));

const member = (over = {}) => ({
  id: 1,
  name: "Faiz Rasul",
  role: "Founder",
  bio: null,
  image_url: null,
  linkedin_url: null,
  ...over,
});

const setMembers = (rows: unknown[]) =>
  mockUseTeamMembers.mockReturnValue({ data: { data: rows }, isLoading: false });

beforeEach(() => {
  mockUseTeamMembers.mockReturnValue({ data: undefined, isLoading: true });
});

describe("AboutTeam", () => {
  it("mounts its wrapper while still loading", () => {
    const { container } = render(<AboutTeam />);

    expect(container.querySelector("section")).toBeTruthy();
  });

  it("renders nothing once loaded with no members", () => {
    setMembers([]);

    const { container } = render(<AboutTeam />);

    expect(container.querySelector("section")).toBeNull();
  });

  it("separates leadership, the advisory board and the wider team", () => {
    setMembers([
      member(),
      member({ id: 2, name: "Dr. Zulfiqar Ahmad", role: "Advisory Board" }),
      member({ id: 3, name: "Shayan", role: "Training Consultant" }),
    ]);

    render(<AboutTeam />);

    expect(screen.getByText("Leadership")).toBeTruthy();
    expect(screen.getByText("Advisory board")).toBeTruthy();
    expect(screen.getByText("Team")).toBeTruthy();
    expect(screen.getByText("Faiz Rasul")).toBeTruthy();
    expect(screen.getByText("Dr. Zulfiqar Ahmad")).toBeTruthy();
    expect(screen.getByText("Shayan")).toBeTruthy();
  });

  it("hides a group that has nobody in it", () => {
    setMembers([member({ id: 3, name: "Shayan", role: "Training Consultant" })]);

    render(<AboutTeam />);

    expect(screen.queryByText("Advisory board")).toBeNull();
    expect(screen.queryByText("Leadership")).toBeNull();
    expect(screen.getByText("Shayan")).toBeTruthy();
  });

  it("puts an unrecognised role in the wider team rather than dropping it", () => {
    setMembers([member({ id: 9, name: "New Person", role: "Something Unexpected" })]);

    render(<AboutTeam />);

    expect(screen.getByText("New Person")).toBeTruthy();
  });
});
