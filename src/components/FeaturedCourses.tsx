import { Code, Brain, TrendingUp, Shield, Palette, Server, Clock, Users, ArrowRight } from "lucide-react";

const courses = [
  { icon: Code, title: "Full Stack Web Development", duration: "6 Months", students: "450+", tag: "Bestseller", gradient: "from-[hsl(217,91%,60%)] to-[hsl(240,70%,50%)]" },
  { icon: Brain, title: "AI & Machine Learning", duration: "4 Months", students: "320+", tag: "New", gradient: "from-[hsl(260,80%,60%)] to-[hsl(280,70%,50%)]" },
  { icon: TrendingUp, title: "Digital Marketing & SEO", duration: "3 Months", students: "580+", tag: "", gradient: "from-[hsl(200,80%,50%)] to-[hsl(217,91%,60%)]" },
  { icon: Shield, title: "Cybersecurity Essentials", duration: "5 Months", students: "210+", tag: "", gradient: "from-[hsl(240,60%,50%)] to-[hsl(260,80%,60%)]" },
  { icon: Palette, title: "UI/UX Design Mastery", duration: "4 Months", students: "390+", tag: "Popular", gradient: "from-[hsl(280,70%,50%)] to-[hsl(320,70%,60%)]" },
  { icon: Server, title: "Cloud & DevOps", duration: "5 Months", students: "270+", tag: "", gradient: "from-[hsl(200,70%,40%)] to-[hsl(240,60%,50%)]" },
];

const FeaturedCourses = () => (
  <section id="courses" className="py-24 md:py-32 relative overflow-hidden">
    {/* Mesh background */}
    <div className="absolute inset-0 bg-mesh opacity-50" />
    
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="text-center mb-16">
        <span className="section-label">Featured Programs</span>
        <h2 className="section-title mt-3">Elevate Your Skillset</h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Industry-aligned training programs designed to make you job-ready from day one.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c, i) => (
          <div
            key={c.title}
            className="glass-card group cursor-pointer overflow-hidden"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Gradient top bar */}
            <div className={`h-1.5 bg-gradient-to-r ${c.gradient}`} />
            
            <div className="p-7">
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shadow-lg`}>
                  <c.icon className="w-7 h-7 text-white" />
                </div>
                {c.tag && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                    {c.tag}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-foreground font-heading text-lg mb-2 group-hover:text-accent transition-colors">{c.title}</h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{c.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{c.students} enrolled</span>
              </div>
              <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                Course Details <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedCourses;
