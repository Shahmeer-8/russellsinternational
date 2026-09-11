import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Props = {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  /** Intro paragraph. Comes from the section's `subtitle` field. */
  intro: string;
  image: string;
  imageAlt: string;
  /** Pill overlaid on the image, e.g. "Admissions support". */
  badge: string;
  badgeIcon: LucideIcon;
  footnote: string;
  footnoteIcon: LucideIcon;
  ctaLabel: string;
  ctaUrl: string;
  /** The section's list of cards — countries, courses, whatever it holds. */
  children: ReactNode;
  /**
   * `dark` inverts onto the primary brand colour. The two homepage focus
   * sections alternate tone so that stacking them still reads as two things.
   */
  tone?: "light" | "dark";
  /** Which side the image takes from `lg` up; the sections alternate. */
  imageSide?: "left" | "right";
};

/**
 * Shared shell for the homepage's two focus sections (Study Abroad, Skills).
 * They were one "dual focus" block with a shared heading and two cards side by
 * side; they are now separate full-width sections, each owning its heading.
 *
 * Stacking two full-width sections risks making the page taller on phones, which
 * is the opposite of what we want. Two things keep the height down: the image sits
 * in its own column beside the text from `lg` up (so neither stacks on desktop),
 * and the caller passes its list through ResponsiveCardRow, which swipes on mobile
 * instead of stacking. A section therefore costs about one card of list height on
 * a phone however many cards it holds.
 */
const FocusSection = ({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  badge,
  badgeIcon: BadgeIcon,
  footnote,
  footnoteIcon: FootnoteIcon,
  ctaLabel,
  ctaUrl,
  children,
  tone = "light",
  imageSide = "left",
}: Props) => {
  const { ref, visible } = useScrollReveal(0.08);
  const dark = tone === "dark";

  return (
    <section
      className={
        dark
          ? "bg-primary py-12 text-primary-foreground md:py-20"
          : "bg-[hsl(var(--muted))] py-12 md:py-20"
      }
    >
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 md:px-8 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div
            className={`relative min-w-0 overflow-hidden rounded-2xl bg-primary ${
              imageSide === "right" ? "lg:order-2" : ""
            }`}
          >
            <img
              src={image}
              alt={imageAlt}
              className="aspect-[16/9] w-full object-cover object-center lg:aspect-[4/3]"
              loading="lazy"
              width={960}
              height={720}
            />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--background))] px-3 py-1.5 text-xs font-bold text-primary shadow-md">
              <BadgeIcon className="h-3.5 w-3.5 text-accent" />
              {badge}
            </div>
          </div>

          {/* min-w-0: a grid item defaults to min-width:auto, so the card row's
              full-bleed `-mx-4` wrapper would widen this column past the viewport
              instead of being clipped by the carousel's own overflow. */}
          <div className={`min-w-0 ${imageSide === "right" ? "lg:order-1" : ""}`}>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </span>
            <h2
              className={`mt-2 font-heading text-2xl font-extrabold leading-tight md:text-4xl ${
                dark ? "" : "text-foreground"
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-3 text-sm leading-7 md:text-base ${
                dark ? "text-primary-foreground/75" : "text-muted-foreground"
              }`}
            >
              {intro}
            </p>

            <div className="mt-6">{children}</div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to={ctaUrl}
                className={`${
                  dark ? "btn-accent" : "btn-primary"
                } group inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm sm:w-fit`}
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div
                className={`flex items-center justify-center gap-2 text-xs font-semibold sm:justify-start ${
                  dark ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                <FootnoteIcon className="h-4 w-4 text-accent" />
                {footnote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusSection;
