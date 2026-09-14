import { Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useWhyChooseUs } from "@/hooks/api";
import ResponsiveCardRow from "@/components/ResponsiveCardRow";
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
                <div
                  className="premium-card p-7 group h-full"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Neutral chip, admin colour on the icon only — same restraint as
                      the services grid, so the two sections stop clashing. */}
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-5">
                    <p.icon className={`w-6 h-6 ${p.color?.split(" ")[1] ?? "text-primary"}`} />
                  </div>
                  <h3 className="font-bold text-foreground font-heading text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ),
            }))}
          />
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
