import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import DetailDrawer from "@/components/DetailDrawer";
import { Clock, Award, ArrowRight } from "lucide-react";
import { useLanguagePrograms } from "@/hooks/api";

type LanguageCard = {
  flag: string;
  title: string;
  duration: string;
  badge: string;
  color: string;
  desc: string;
  benefits: string[];
};

const LanguagesSection = () => {
  const { ref, visible } = useScrollReveal();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<LanguageCard | null>(null);
  const { data, isLoading } = useLanguagePrograms();
  const displayPrograms = (data?.data ?? []).map((program) => ({
    flag: program.flag_emoji,
    title: program.title,
    duration: program.duration,
    badge: program.badge,
    color: program.color_class,
    desc: program.description,
    benefits: program.benefits ?? [],
  }));

  return (
    <>
      <section className="py-20 md:py-28">
        <div ref={ref} className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="text-center mb-14">
            <span className="section-label">Language Programs</span>
            <h2 className="section-title mt-3">Speak the World</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Open doors to international universities, careers, and cultures.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <div key={i} className="premium-card h-64 animate-pulse" />)}
            </div>
          ) : displayPrograms.length === 0 ? null : (
            <div className="grid md:grid-cols-3 gap-6">
              {displayPrograms.map((p) => (
                <div
                  key={p.title}
                  className="premium-card p-7 group cursor-pointer"
                  onClick={() => { setSelected(p); setDrawerOpen(true); }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{p.flag}</div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground font-heading text-lg mb-2 group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.duration}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selected?.title || "Language Program"}>
        {selected && (
          <div className="space-y-6">
            <div className="text-6xl">{selected.flag}</div>
            <div>
              <h4 className="font-heading font-bold text-xl text-foreground mb-2">{selected.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{selected.desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="text-xs text-muted-foreground mb-1">Duration</div>
                <div className="font-semibold text-foreground text-sm">{selected.duration}</div>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="text-xs text-muted-foreground mb-1">Certification</div>
                <div className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-accent" /> {selected.badge}
                </div>
              </div>
            </div>
            {selected.benefits.length > 0 && (
              <div>
                <h5 className="font-semibold text-foreground mb-3">What's Included</h5>
                <ul className="space-y-2">
                  {selected.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DetailDrawer>
    </>
  );
};

export default LanguagesSection;
