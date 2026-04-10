import { Code, Brain, TrendingUp, Shield, Palette, Server, Clock, Users, ArrowRight } from "lucide-react";

const courses = [
  { icon: Code, title: "Full Stack Web Development", duration: "6 Months", students: "450+", tag: "Bestseller", color: "text-blue-500 bg-blue-500/10" },
  { icon: Brain, title: "AI & Machine Learning", duration: "4 Months", students: "320+", tag: "New", color: "text-emerald-500 bg-emerald-500/10" },
  { icon: TrendingUp, title: "Digital Marketing & SEO", duration: "3 Months", students: "580+", tag: "", color: "text-orange-500 bg-orange-500/10" },
  { icon: Shield, title: "Cybersecurity Essentials", duration: "5 Months", students: "210+", tag: "", color: "text-red-500 bg-red-500/10" },
  { icon: Palette, title: "UI/UX Design Mastery", duration: "4 Months", students: "390+", tag: "Popular", color: "text-pink-500 bg-pink-500/10" },
  { icon: Server, title: "Cloud & DevOps", duration: "5 Months", students: "270+", tag: "", color: "text-violet-500 bg-violet-500/10" },
];

const FeaturedCourses = () => (
  <section id="courses" className="py-20 md:py-28 bg-muted/30">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <span className="section-label">Featured Programs</span>
        <h2 className="section-title mt-3">Elevate Your Skillset</h2>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Industry-aligned training programs designed to make you job-ready from day one.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div key={c.title} className="glass-card p-6 group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.color}`}>
                <c.icon className="w-6 h-6" />
              </div>
              {c.tag && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                  {c.tag}
                </span>
              )}
            </div>
            <h3 className="font-bold text-foreground font-heading mb-2">{c.title}</h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.students} enrolled</span>
            </div>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
              Course Details <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedCourses;
