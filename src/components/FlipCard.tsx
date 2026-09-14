import type { KeyboardEvent, ReactNode } from "react";

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
  className = "",
  minHeight = "min-h-[20rem]",
}: {
  front: ReactNode;
  back: ReactNode;
  onActivate?: () => void;
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

  return (
    <div
      className={`flip-card group ${minHeight} ${className}`}
      tabIndex={0}
      role={onActivate ? "button" : undefined}
      onClick={onActivate}
      onKeyDown={handleKey}
    >
      <div className="flip-card-inner">
        <div className="flip-card-face" data-flip-face="front">
          {front}
        </div>
        <div className="flip-card-face flip-card-back" data-flip-face="back" aria-hidden="true">
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
