import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import HowWeWorkSection from "@/components/HowWeWorkSection";

const mockUseHowWeWorkItems = vi.fn();
const mockUsePageSections = vi.fn();

vi.mock("@/hooks/api", () => ({
  useHowWeWorkItems: () => mockUseHowWeWorkItems(),
  usePageSections: () => mockUsePageSections(),
}));

const item = (over = {}) => ({
  id: 1,
  title: "Leadership Development",
  quote: "Leadership, like swimming, cannot be learned by reading about it.",
  author: "Henry Mintzberg",
  image_url: "https://example.test/leadership.jpg",
  ...over,
});

beforeEach(() => {
  mockUseHowWeWorkItems.mockReturnValue({ data: undefined, isLoading: true });
  mockUsePageSections.mockReturnValue({ data: undefined, isLoading: true });
});

describe("HowWeWorkSection", () => {
  it("mounts its wrapper while still loading", () => {
    const { container } = render(<HowWeWorkSection />);

    expect(container.querySelector("section")).toBeTruthy();
  });

  it("renders nothing once loaded with no items, so the About page has no empty block", () => {
    mockUseHowWeWorkItems.mockReturnValue({ data: { data: [] }, isLoading: false });
    mockUsePageSections.mockReturnValue({ data: { data: {} }, isLoading: false });

    const { container } = render(<HowWeWorkSection />);

    expect(container.querySelector("section")).toBeNull();
  });

  it("renders each item's title, quote and author", () => {
    mockUseHowWeWorkItems.mockReturnValue({
      data: { data: [item(), item({ id: 2, title: "Coaching and Mentoring", quote: "Winning companies win.", author: "Noel Tichy" })] },
      isLoading: false,
    });
    mockUsePageSections.mockReturnValue({ data: { data: {} }, isLoading: false });

    render(<HowWeWorkSection />);

    expect(screen.getByText("Leadership Development")).toBeTruthy();
    expect(screen.getByText(/cannot be learned by reading about it/)).toBeTruthy();
    expect(screen.getByText(/Henry Mintzberg/)).toBeTruthy();
    expect(screen.getByText("Coaching and Mentoring")).toBeTruthy();
    expect(screen.getByText(/Noel Tichy/)).toBeTruthy();
  });

  it("omits the author line when an item has no author", () => {
    mockUseHowWeWorkItems.mockReturnValue({
      data: { data: [item({ author: null })] },
      isLoading: false,
    });
    mockUsePageSections.mockReturnValue({ data: { data: {} }, isLoading: false });

    render(<HowWeWorkSection />);

    expect(screen.getByText("Leadership Development")).toBeTruthy();
    expect(screen.queryByText(/^—/)).toBeNull();
  });

  it("uses the admin-managed heading when the page section provides one", () => {
    mockUseHowWeWorkItems.mockReturnValue({ data: { data: [item()] }, isLoading: false });
    mockUsePageSections.mockReturnValue({
      data: { data: { how_we_work: { eyebrow: "Our approach", title: "How we work with you" } } },
      isLoading: false,
    });

    render(<HowWeWorkSection />);

    expect(screen.getByText("Our approach")).toBeTruthy();
    expect(screen.getByText("How we work with you")).toBeTruthy();
  });
});
