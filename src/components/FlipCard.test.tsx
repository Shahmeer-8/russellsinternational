import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import FlipCard from "@/components/FlipCard";

describe("FlipCard", () => {
  it("renders the front content", () => {
    render(<FlipCard front={<span>Front side</span>} back={<span>Back side</span>} />);

    expect(screen.getByText("Front side")).toBeTruthy();
  });

  it("hides the back from assistive tech, so the card is not announced twice", () => {
    const { container } = render(
      <FlipCard front={<span>Front side</span>} back={<span>Back side</span>} />,
    );

    const back = container.querySelector("[data-flip-face='back']");
    expect(back?.getAttribute("aria-hidden")).toBe("true");
    expect(container.querySelector("[data-flip-face='front']")?.getAttribute("aria-hidden")).toBeNull();
  });

  it("is reachable by keyboard so the back is not hover-only", () => {
    const { container } = render(
      <FlipCard front={<span>Front side</span>} back={<span>Back side</span>} />,
    );

    expect(container.querySelector("[tabindex='0']")).toBeTruthy();
  });

  it("passes a click handler through to the card", () => {
    let clicked = false;
    render(
      <FlipCard
        front={<span>Front side</span>}
        back={<span>Back side</span>}
        onActivate={() => {
          clicked = true;
        }}
      />,
    );

    (screen.getByText("Front side").closest("[tabindex='0']") as HTMLElement).click();

    expect(clicked).toBe(true);
  });
});
