import { Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useWhyChooseUs } from "@/hooks/api";
import ResponsiveCardRow from "@/components/ResponsiveCardRow";
import FlipCard from "@/components/FlipCard";
import { useSectionCopy } from "@/hooks/useSectionCopy";
import { resolveIcon } from "@/lib/icons";

const WhyChooseUs = () => {
  const { ref, visible } = useScrollReveal();
  const copy = useSectionCopy("home", "why_choose_us");
  const { data, isLoading } = useWhyChooseUs();
  const points = (data?.data ?? []).map((item) => ({
    icon: resolveIcon(item.icon_name, Award),
    title: item.title,
    desc: item.description,
    color: item.color_class,
    image: item.image_url,
  }));

  return (
    <section id="why-us" className="py-20 md:py-28 bg-section-alt">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-2xl mb-14">
          <span className="section-label">{copy("eyebrow", "Why Russell's International")}</span>
          <h2 className="section-title mt-3">{copy("title", "Your Trusted Partner in Growth")}</h2>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="premium-card h-48 animate-pulse" />)}
          </div>
        ) : points.length === 0 ? null : (
          <ResponsiveCardRow
            items={points.map((p, i) => ({
              key: p.title,
              node: (
                <FlipCard
                  minHeight="min-h-[19rem]"
                  front={
                    <div className="premium-card h-full overflow-hidden flex flex-col">
                      {p.image && (
                        /* The photograph warms into the brand gradient under the
                           cursor, so a card announces it is interactive before the
                           reader has to guess. Sits over the image rather than
                           replacing it — the subject stays readable through it. */
                        <div className="relative h-40 w-full overflow-hidden">
                          <img
                            src={p.image}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                            width={640}
                            height={360}
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-primary/40 to-accent/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                          <p.icon className={`h-5 w-5 ${p.color?.split(" ")[1] ?? "text-primary"}`} />
                        </div>
                        <h3 className="font-heading text-lg font-bold text-foreground">{p.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  }
                  back={
                    <div className="premium-card h-full overflow-hidden bg-primary text-primary-foreground flex flex-col justify-center p-7">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-foreground/10">
                        <p.icon className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="font-heading text-lg font-bold">{p.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">{p.desc}</p>
                    </div>
                  }
                />
              ),
            }))}
          />
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
