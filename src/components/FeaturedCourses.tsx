import { Code, Brain, TrendingUp, Shield, Palette, Server, Clock, Users, ArrowRight, BadgeCheck, Crown } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import DetailDrawer from "@/components/DetailDrawer";

const paidCourses = [
  { icon: Code, title: "Full Stack Web Development", duration: "6 Months", students: "450+", tag: "Bestseller", price: "PKR 45,000", color: "bg-blue-50 text-blue-600" },
  { icon: Brain, title: "AI & Machine Learning", duration: "4 Months", students: "320+", tag: "New", price: "PKR 55,000", color: "bg-purple-50 text-purple-600" },
  { icon: TrendingUp, title: "Digital Marketing & SEO", duration: "3 Months", students: "580+", tag: "", price: "PKR 30,000", color: "bg-green-50 text-green-600" },
  { icon: Shield, title: "Cybersecurity Essentials", duration: "5 Months", students: "210+", tag: "", price: "PKR 50,000", color: "bg-red-50 text-red-600" },
  { icon: Palette, title: "UI/UX Design Mastery", duration: "4 Months", students: "390+", tag: "Popular", price: "PKR 35,000", color: "bg-pink-50 text-pink-600" },
  { icon: Server, title: "Cloud & DevOps", duration: "5 Months", students: "270+", tag: "", price: "PKR 48,000", color: "bg-indigo-50 text-indigo-600" },
];

const navttcCourses = [
  { icon: Code, title: "Web Development Fundamentals", duration: "3 Months", students: "800+", tag: "NAVTTC", color: "bg-emerald-50 text-emerald-600" },
  { icon: Brain, title: "Python Programming", duration: "3 Months", students: "650+", tag: "NAVTTC", color: "bg-teal-50 text-teal-600" },
  { icon: TrendingUp, title: "E-Commerce & Freelancing", duration: "2 Months", students: "1,200+", tag: "NAVTTC", color: "bg-cyan-50 text-cyan-600" },
];

const FeaturedCourses = () => {
  const { ref, visible } = useScrollReveal();
  const [tab, setTab] = useState<"paid" | "navttc">("paid");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const courses = tab === "paid" ? paidCourses : navttcCourses;

  const openDrawer = (course: any) => {
    setSelectedCourse(course);
    setDrawerOpen(true);
  };

  return (
    <>
      <section id="courses" className="py-20 md:py-28">
        <div
          ref={ref}
          className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-10">
            <span className="section-label">Featured Programs</span>
            <h2 className="section-title mt-3">Elevate Your Skillset</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Industry-aligned training programs designed to make you job-ready from day one.</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-muted rounded-2xl p-1.5 gap-1">
              <button
                onClick={() => setTab("paid")}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  tab === "paid" ? "bg-background text-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Crown className="w-4 h-4" /> Premium Courses
              </button>
              <button
                onClick={() => setTab("navttc")}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  tab === "navttc" ? "bg-background text-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BadgeCheck className="w-4 h-4" /> NAVTTC (Free)
              </button>
            </div>
          </div>

          {/* NAVTTC Trust Badge */}
          {tab === "navttc" && (
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                <BadgeCheck className="w-4 h-4" /> Government Funded – 100% Free Training Under NAVTTC
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => (
              <div
                key={c.title}
                className="premium-card p-6 group cursor-pointer"
                onClick={() => openDrawer(c)}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl ${c.color.split(" ")[0]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <c.icon className={`w-6 h-6 ${c.color.split(" ")[1]}`} />
                  </div>
                  {c.tag && (
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      c.tag === "NAVTTC" ? "bg-emerald-50 text-emerald-700" : "bg-accent/10 text-accent"
                    }`}>
                      {c.tag}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-foreground font-heading text-lg mb-2 group-hover:text-accent transition-colors">{c.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{c.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{c.students} enrolled</span>
                </div>
                {"price" in c && (
                  <div className="font-bold text-foreground text-base mb-4">{(c as any).price}</div>
                )}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                  {tab === "navttc" ? "Apply Now" : "Learn More"} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedCourse?.title || "Course Details"}
      >
        {selectedCourse && (
          <div className="space-y-6">
            <div className={`w-16 h-16 rounded-2xl ${selectedCourse.color.split(" ")[0]} flex items-center justify-center`}>
              <selectedCourse.icon className={`w-8 h-8 ${selectedCourse.color.split(" ")[1]}`} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl text-foreground mb-2">{selectedCourse.title}</h4>
              {"price" in selectedCourse && (
                <div className="text-2xl font-bold text-accent mb-1">{(selectedCourse as any).price}</div>
              )}
              {tab === "navttc" && (
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5" /> Free – Government Funded
                </div>
              )}
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {selectedCourse.duration}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {selectedCourse.students} enrolled</span>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">What You'll Learn</h5>
              <ul className="space-y-2">
                {["Industry-standard tools and frameworks", "Real-world project-based learning", "Portfolio development and career prep", "Certification upon completion"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">Program Highlights</h5>
              <div className="grid grid-cols-2 gap-3">
                {["Expert Trainers", "Hands-On Labs", "Job Placement", "Flexible Schedule"].map((h) => (
                  <div key={h} className="bg-muted/50 rounded-xl p-3 text-center text-sm font-medium text-foreground">{h}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </>
  );
};

export default FeaturedCourses;
