import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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

/**
 * A card that navigates should be a real link.
 *
 * The services grid opened a summary panel on click, which was a dead end for the
 * five services that already have a whole page behind them. Making the card an
 * anchor rather than a div with a handler is what gives it middle-click,
 * open-in-new-tab and a status-bar preview.
 */
describe("FlipCard as a link", () => {
  const faces = { front: <span>Front side</span>, back: <span>Back side</span> };

  it("renders an internal destination as a router link", () => {
    render(
      <MemoryRouter>
        <FlipCard {...faces} to="/skills" />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/skills");
    expect(link.getAttribute("target")).toBeNull();
  });

  it("opens an external destination in a new tab, safely", () => {
    render(
      <MemoryRouter>
        <FlipCard {...faces} to="https://example.com/programme" />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("https://example.com/programme");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toContain("noreferrer");
  });

  it("stays a button when there is nowhere to go", () => {
    render(<FlipCard {...faces} onActivate={() => {}} />);

    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("prefers the destination over a click handler, so it cannot do both", () => {
    let activated = false;
    render(
      <MemoryRouter>
        <FlipCard {...faces} to="/skills" onActivate={() => { activated = true; }} />
      </MemoryRouter>,
    );

    screen.getByRole("link").click();
    expect(activated).toBe(false);
  });
});
