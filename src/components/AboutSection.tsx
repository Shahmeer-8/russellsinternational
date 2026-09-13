import type { ReactNode } from "react";

/**
 * The shell every About-page section sits in.
 *
 * The old page put a tracked-out, all-caps orange label above each heading. That
 * treatment appeared on every section regardless of content, which is what made
 * the page read as a template. The section name carries the same information
 * here, but it sits in a left rail as a margin note — positioned rather than
 * shouted — and the rail running down the page gives it a spine that a stack of
 * independently centred blocks never had.
 *
 * Below `lg` the rail folds above the content, where it reads as a quiet caption.
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
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
          {label && (
            <p
              className={`text-sm font-medium lg:col-span-2 lg:pt-2 ${
                tone === "ink" ? "text-primary-foreground/55" : "text-muted-foreground"
              }`}
            >
              {label}
            </p>
          )}
          {/* min-w-0: a grid item defaults to min-width:auto, so any full-bleed
              child would widen the column past the viewport rather than be clipped. */}
          <div className={`min-w-0 ${label ? "lg:col-span-10" : "lg:col-span-12"}`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
