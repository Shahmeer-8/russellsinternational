import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import DetailDrawer from "@/components/DetailDrawer";
import { Languages, Clock, Award, ArrowRight } from "lucide-react";

const programs = [
  {
    flag: "🇬🇧",
    title: "IELTS Preparation",
    duration: "8 Weeks",
    badge: "Most Popular",
    color: "bg-blue-50 text-blue-600",
    desc: "Comprehensive coaching across all four IELTS modules with weekly mock tests.",
    benefits: ["British Council-trained instructors", "Weekly full-length mocks", "Personalized band score strategy", "Speaking practice sessions"],
  },
  {
    flag: "🇩🇪",
    title: "German Language (A1–B2)",
    duration: "12 Weeks per level",
    badge: "Visa-Ready",
    color: "bg-amber-50 text-amber-600",
    desc: "Goethe-aligned curriculum to prepare you for studies, work, and life in Germany.",
    benefits: ["Goethe Institute syllabus", "Native-speaking conversation labs", "Exam preparation included", "Pathway to Ausbildung & study"],
  },
  {
    flag: "🇰🇷",
    title: "Korean Language (TOPIK)",
    duration: "10 Weeks",
    badge: "EPS-TOPIK Ready",
    color: "bg-rose-50 text-rose-600",
    desc: "From Hangul basics to TOPIK exam mastery — perfect for Korea study or EPS programs.",
    benefits: ["TOPIK I & II preparation", "Cultural immersion sessions", "EPS exam support", "Real conversation practice"],
  },
];

const LanguagesSection = () => {
  const { ref, visible } = useScrollReveal();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<typeof programs[0] | null>(null);

  return (
    <>
      <section className="py-20 md:py-28">
        <div ref={ref} className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-14">
            <span className="section-label">Language Programs</span>
            <h2 className="section-title mt-3">Speak the World</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Open doors to international universities, careers, and cultures.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((p) => (
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
          </div>
        )}
      </DetailDrawer>
    </>
  );
};

export default LanguagesSection;
