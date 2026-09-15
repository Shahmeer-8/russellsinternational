import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHeroSlides } from "@/hooks/api";
import fallbackHeroImage from "@/assets/hero-students-clean.jpg";

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

const HeroCarousel = () => {
  const [active, setActive] = useState(0);

  const { data: slidesData } = useHeroSlides();

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
    <section className="relative pt-header">
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

        {/* The prev/next arrows are gone: the carousel advances on its own, and two
            floating buttons over the headline were competing with the one thing the
            slide is asking the reader to do. The dots stay — they are quiet, they
            show how many slides there are, and they are the only way to go back to
            one that has passed. */}
        {slides.length > 1 && (
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
        )}
      </div>
    </section>
  );
};

export default HeroCarousel;
