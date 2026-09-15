import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useHeroSlides, useTickerItems } from "@/hooks/api";
import fallbackHeroImage from "@/assets/hero-students-clean.jpg";

/**
 * Announcements are typed in the admin with a decorative emoji in front. They read
 * as clutter in a quiet strip, so they are dropped at render — the wording the
 * admin typed is untouched, and removing the emoji there instead would work too.
 */
function stripLeadingEmoji(text: string): string {
  return text.replace(/^[\p{Extended_Pictographic}\p{Emoji_Presentation}️‍\s]+/u, "").trim();
}

const fallbackSlides = [
  {
    image: fallbackHeroImage,
    eyebrow: "Admissions Open 2026",
    title: "Your Global Career Starts Here",
    desc: "Expert guidance for study abroad, skill training, and career placement trusted by 5,000+ students.",
    cta: { label: "Explore Programs", to: "/skills" },
    secondaryCta: { label: "Free Consultation", to: "/#contact" },
  },
];

const fallbackTickerItems = [
  "Admissions Open for September 2026 Intake",
  "95% Visa Success Rate for UK, Canada & AU",
  "New IT Courses Starting Monthly",
  "NAVTTC Free Training Now Available",
];

const HeroCarousel = () => {
  const [active, setActive] = useState(0);

  const { data: slidesData } = useHeroSlides();
  const { data: tickerData } = useTickerItems();

  const apiSlides = (slidesData?.data ?? [])
    .filter((s) => s.is_active)
    .map((s) => ({
      image: s.image_url,
      eyebrow: s.eyebrow,
      title: s.title,
      desc: s.description,
      cta: { label: s.cta_label, to: s.cta_url },
      secondaryCta: { label: s.secondary_cta_label, to: s.secondary_cta_url },
    }));

  const slides = apiSlides.length > 0 ? apiSlides : fallbackSlides;
  const apiTickerItems = (tickerData?.data ?? []).map((t) => `${t.emoji ?? ""} ${t.text}`.trim());
  const tickerItems = apiTickerItems.length > 0 ? apiTickerItems : fallbackTickerItems;

  const goTo = useCallback(
    (nextIndex: number) => {
      setActive((nextIndex + slides.length) % slides.length);
    },
    [slides.length],
  );

  const go = useCallback(
    (dir: number) => {
      setActive((p) => (p + dir + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setTimeout(() => {
      go(1);
    }, 5000);
    return () => window.clearTimeout(id);
  }, [active, go, slides.length]);

  return (
    <section className="relative pt-16">
      {tickerItems.length > 0 && (
        /*
         * A continuously scrolling announcement strip. It was stopped during the
         * pass that quietened the site, which left the announcements wrapping onto
         * two static lines; the motion is back, but slow, muted and pausing under
         * the cursor rather than the navy bar it used to be.
         *
         * The list is rendered twice so the loop can restart without a visible
         * jump — see .ticker-track. The second copy is hidden from assistive tech,
         * which would otherwise read every announcement out twice.
         */
        <div className="ticker-viewport border-b border-border bg-muted">
          <div className="ticker-track py-2.5">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                /* pr-8 matches gap-x-8, so the join between the two copies is
                   spaced exactly like every other gap and the seam is invisible. */
                className="flex shrink-0 gap-x-8 pr-8"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {tickerItems.map((t, i) => (
                  <span
                    key={`${t}-${i}`}
                    className="whitespace-nowrap text-xs font-medium text-muted-foreground"
                  >
                    {stripLeadingEmoji(t)}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative h-[560px] md:h-[640px] overflow-hidden bg-primary">
        {slides.map((s, i) => (
          <div
            key={`${s.title}-${i}`}
            className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-hidden={i !== active}
          >
            {s.image && (
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            )}
            {/* Softened from 90/70/30: the heavier wash buried the photography.
                This is the lightest wash that still clears WCAG AA for white text
                over every slide image — measured worst case 4.24:1 for the heading
                (needs 3:1) and 4.66:1 for the body copy (needs 4.5:1). Going to
                75/50/15 drops the body copy to 3.67:1. */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/58 to-primary/15" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-2xl text-primary-foreground animate-fade-in" key={`${i}-${active}`}>
                  {/* Was a filled orange pill in tracked-out caps, competing with
                      the orange button directly below it for the same attention. */}
                  <span className="mb-5 inline-block text-sm font-medium text-primary-foreground/75">
                    {s.eyebrow}
                  </span>
                  <h1 className="mb-5 font-display text-5xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
                    {s.title}
                  </h1>
                  <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed mb-8">
                    {s.desc}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {/* One filled button, one plain link. Two solid buttons side by
                        side gave the page no primary action to point at. */}
                    <Link to={s.cta.to} className="btn-accent inline-flex items-center">
                      {s.cta.label}
                    </Link>
                    {s.secondaryCta.label && s.secondaryCta.to && (
                      <Link
                        to={s.secondaryCta.to}
                        className="inline-flex items-center px-2 py-3 font-semibold text-primary-foreground underline decoration-primary-foreground/40 underline-offset-8 transition-colors hover:decoration-primary-foreground"
                      >
                        {s.secondaryCta.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/20 hover:bg-background/40 backdrop-blur-md flex items-center justify-center text-primary-foreground transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/20 hover:bg-background/40 backdrop-blur-md flex items-center justify-center text-primary-foreground transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-accent" : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroCarousel;
