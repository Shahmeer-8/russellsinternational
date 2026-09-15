import type { KeyboardEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { isExternalUrl } from "@/lib/navigation";

/**
 * A card that turns over to show a second face.
 *
 * The flip is an enhancement, never the only way to something. It is enabled only
 * where a pointer can genuinely hover and the visitor has not asked for reduced
 * motion; everywhere else the back is not rendered at all and the front stands on
 * its own. That is why every caller must put the essential content on the front —
 * the back may repeat or extend it, but must not be the only place it lives.
 *
 * The back is `aria-hidden` for the same reason: it would otherwise read as a
 * second copy of the card to a screen reader. Callers that put extra detail back
 * there give it an accessible home too — the services grid opens a drawer with
 * the same material on click, which `onActivate` also fires on Enter or Space.
 */
const FlipCard = ({
  front,
  back,
  onActivate,
  to,
  className = "",
  minHeight = "min-h-[20rem]",
}: {
  front: ReactNode;
  back: ReactNode;
  onActivate?: () => void;
  /**
   * Where the card goes when it is a link rather than a button.
   *
   * A card that navigates should be an anchor, not a div with a click handler:
   * that is what gives it middle-click, open-in-new-tab, a status-bar preview and
   * a sensible place in the tab order. Takes precedence over `onActivate`.
   */
  to?: string;
  className?: string;
  minHeight?: string;
}) => {
  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onActivate) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate();
    }
  };

  const faces = (
    <div className="flip-card-inner">
      <div className="flip-card-face" data-flip-face="front">
        {front}
      </div>
      <div className="flip-card-face flip-card-back" data-flip-face="back" aria-hidden="true">
        {back}
      </div>
    </div>
  );

  const shell = `flip-card group ${minHeight} ${className}`;

  if (to) {
    return isExternalUrl(to) ? (
      <a href={to} className={`${shell} block`} target="_blank" rel="noreferrer">
        {faces}
      </a>
    ) : (
      <Link to={to} className={`${shell} block`}>
        {faces}
      </Link>
    );
  }

  return (
    <div
      className={shell}
      tabIndex={0}
      role={onActivate ? "button" : undefined}
      onClick={onActivate}
      onKeyDown={handleKey}
    >
      {faces}
    </div>
  );
};

export default FlipCard;
