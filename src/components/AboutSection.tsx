import type { ReactNode } from "react";

/**
 * The shell every About-page section sits in.
 *
 * The section name sits directly above its heading, as a badge. It spent a while
 * in a left rail as a margin note, which read well on a wide screen and badly
 * everywhere else: on any narrower viewport the rail folded on top of the content
 * anyway, so the same label appeared in two different places depending on the
 * width, and the heading it belonged to was a column away from it.
 *
 * Above the heading it is in one place, tied to the thing it names.
 */
const AboutSection = ({
  label,
  children,
  tone = "paper",
  className = "",
}: {
  /** Section name, sentence case. Omit when the heading alone is enough. */
  label?: string;
  children: ReactNode;
  tone?: "paper" | "mist" | "ink";
  className?: string;
}) => {
  const grounds = {
    paper: "bg-background",
    mist: "bg-[hsl(var(--muted))]",
    ink: "bg-primary text-primary-foreground",
  };

  return (
    <section className={`${grounds[tone]} py-16 md:py-24 lg:py-28 ${className}`}>
      <div className="container mx-auto px-4 md:px-8">
        {label && (
          <p
            className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
              tone === "ink"
                ? "bg-primary-foreground/10 text-primary-foreground/75"
                : "bg-accent/10 text-accent"
            }`}
          >
            {label}
          </p>
        )}
        {/* min-w-0: a flex/grid child defaults to min-width:auto, so any full-bleed
            content would widen the track past the viewport rather than be clipped. */}
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
};

export default AboutSection;
