import { useScrollReveal } from "@/hooks/useScrollReveal";
import skillImg from "@/assets/skill-training.jpg";
import abroadImg from "@/assets/study-abroad-clean.jpg";
import { Code, Brain, Database, Globe2, Landmark, ArrowRight } from "lucide-react";

const courses = [
  { icon: Code, title: "Full Stack Web Development", duration: "6 months" },
  { icon: Brain, title: "AI & Machine Learning", duration: "4 months" },
  { icon: Database, title: "Data Science & Analytics", duration: "5 months" },
];

const countries = [
  { flag: "🇬🇧", name: "United Kingdom", unis: "40+ Universities" },
  { flag: "🇨🇦", name: "Canada", unis: "35+ Universities" },
  { flag: "🇦🇺", name: "Australia", unis: "30+ Universities" },
];

const DualFocusSection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-section-alt">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-14">
          <span className="section-label">Two Paths, One Goal</span>
          <h2 className="section-title mt-3">Choose Your Path to Success</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Whether you want to master tech skills or study abroad, we guide you every step of the way.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Skill Training Card */}
          <div className="premium-card overflow-hidden group">
            <div className="h-52 overflow-hidden">
              <img src={skillImg} alt="Students in coding lab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={960} height={640} />
            </div>
            <div className="p-7">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
                <Code className="w-3.5 h-3.5" /> Skill-Based Training
              </div>
              <h3 className="text-xl font-bold font-heading text-foreground mb-5">Build In-Demand IT Skills</h3>
              <div className="space-y-3">
                {courses.map((c) => (
                  <div key={c.title} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <c.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-sm">{c.title}</div>
                      <div className="text-xs text-muted-foreground">{c.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#courses" className="btn-primary inline-flex items-center gap-2 mt-6 text-sm px-5 py-2.5 group">
                View Skill Programs <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Study Abroad Card */}
          <div className="premium-card overflow-hidden group">
            <div className="h-52 overflow-hidden">
              <img src={abroadImg} alt="Student heading to university" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={960} height={640} />
            </div>
            <div className="p-7">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
                <Globe2 className="w-3.5 h-3.5" /> Study Abroad
              </div>
              <h3 className="text-xl font-bold font-heading text-foreground mb-5">Explore Global Universities</h3>
              <div className="space-y-3">
                {countries.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0">{c.flag}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-sm">{c.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1"><Landmark className="w-3 h-3" /> {c.unis}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#destinations" className="btn-accent inline-flex items-center gap-2 mt-6 text-sm px-5 py-2.5 group">
                Explore Destinations <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualFocusSection;
