import { Code, Brain, Database, Globe2, Landmark, MapPin } from "lucide-react";

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
  <section className="py-20 md:py-28 bg-muted/30">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <span className="section-label">Two Paths, One Goal</span>
        <h2 className="section-title mt-3">Choose Your Path to Success</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* IT Training */}
        <div className="glass-card p-8 md:p-10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent" style={{ background: "var(--accent-gradient)" }} />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Code className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-foreground">Skill-Based IT Training</h3>
              <p className="text-sm text-muted-foreground">Industry-ready programs</p>
            </div>
          </div>

          <div className="space-y-4">
            {courses.map((c) => (
              <div key={c.title} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group/item cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <c.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.duration}</div>
                </div>
                {c.tag && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-accent/10 text-accent">
                    {c.tag}
                  </span>
                )}
              </div>
            ))}
          </div>

          <a href="#courses" className="btn-accent inline-flex items-center gap-2 mt-6 text-sm">
            View All Courses →
          </a>
        </div>

        {/* Study Abroad */}
        <div className="glass-card p-8 md:p-10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--cta-gradient)" }} />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Globe2 className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-foreground">Study Abroad Programs</h3>
              <p className="text-sm text-muted-foreground">World-class education awaits</p>
            </div>
          </div>

          <div className="space-y-4">
            {countries.map((c) => (
              <div key={c.name} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm">{c.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Landmark className="w-3 h-3" /> {c.unis}
                  </div>
                </div>
                <MapPin className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>

          <a href="#destinations" className="btn-cta inline-flex items-center gap-2 mt-6 text-sm">
            Explore Destinations →
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default DualFocusSection;
