import codingLabImg from "@/assets/coding-lab.jpg";
import studyAbroadImg from "@/assets/study-abroad.jpg";
import { Code, Brain, Database, Globe2, Landmark, MapPin, ArrowRight } from "lucide-react";

const courses = [
  { icon: Code, title: "Full Stack Web Development", duration: "6 months", tag: "Popular" },
  { icon: Brain, title: "AI & Machine Learning", duration: "4 months", tag: "New" },
  { icon: Database, title: "Data Science & Analytics", duration: "5 months", tag: "" },
];

const countries = [
  { icon: "🇬🇧", name: "United Kingdom", unis: "40+ Universities" },
  { icon: "🇨🇦", name: "Canada", unis: "35+ Universities" },
  { icon: "🇦🇺", name: "Australia", unis: "30+ Universities" },
];

const DualFocusSection = () => (
  <section className="py-24 md:py-32 bg-mesh relative overflow-hidden">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-16 animate-fade-up">
        <span className="section-label">Two Paths, One Goal</span>
        <h2 className="section-title mt-3">Choose Your Path to Success</h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Whether you want to master in-demand tech skills or pursue global education, we've got you covered.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* IT Training */}
        <div className="relative rounded-3xl overflow-hidden group min-h-[480px]">
          <img src={codingLabImg} alt="Coding lab" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={960} height={640} />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(224,71%,10%)] via-[hsl(224,71%,10%)/0.7] to-[hsl(224,71%,10%)/0.4]" />
          
          <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-end">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/15 px-3 py-1.5 rounded-full text-xs text-white/90 font-medium mb-4 w-fit">
              <Code className="w-3.5 h-3.5 text-accent" /> Skill-Based Training
            </div>
            <h3 className="text-2xl font-bold font-heading text-white mb-6">Build In-Demand IT Skills</h3>

            <div className="space-y-3">
              {courses.map((c) => (
                <div key={c.title} className="glass-card-dark p-4 flex items-center gap-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm">{c.title}</div>
                    <div className="text-xs text-white/50">{c.duration}</div>
                  </div>
                  {c.tag && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-accent/20 text-accent">
                      {c.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <a href="#courses" className="btn-accent inline-flex items-center gap-2 mt-6 text-sm w-fit group/btn">
              View All Courses <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Study Abroad */}
        <div className="relative rounded-3xl overflow-hidden group min-h-[480px]">
          <img src={studyAbroadImg} alt="Study abroad" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={960} height={640} />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(260,50%,12%)] via-[hsl(260,50%,12%)/0.7] to-[hsl(260,50%,12%)/0.4]" />
          
          <div className="relative z-10 p-8 md:p-10 flex flex-col h-full justify-end">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/15 px-3 py-1.5 rounded-full text-xs text-white/90 font-medium mb-4 w-fit">
              <Globe2 className="w-3.5 h-3.5 text-[hsl(260,80%,70%)]" /> Study Abroad
            </div>
            <h3 className="text-2xl font-bold font-heading text-white mb-6">Explore Global Universities</h3>

            <div className="space-y-3">
              {countries.map((c) => (
                <div key={c.name} className="glass-card-dark p-4 flex items-center gap-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-2xl shrink-0">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm">{c.name}</div>
                    <div className="text-xs text-white/50 flex items-center gap-1">
                      <Landmark className="w-3 h-3" /> {c.unis}
                    </div>
                  </div>
                  <MapPin className="w-4 h-4 text-white/30" />
                </div>
              ))}
            </div>

            <a href="#destinations" className="btn-cta inline-flex items-center gap-2 mt-6 text-sm w-fit group/btn">
              Explore Destinations <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DualFocusSection;
