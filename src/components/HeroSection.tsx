import heroImg from "@/assets/hero-students.jpg";
import { ArrowRight, BookOpen, Globe } from "lucide-react";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Partner Universities" },
  { value: "95%", label: "Visa Success Rate" },
  { value: "5,000+", label: "Students Placed" },
];

const HeroSection = () => (
  <section className="relative pt-16 overflow-hidden">
    <div className="hero-bg min-h-[600px] lg:min-h-[700px] flex items-center relative">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur px-4 py-2 rounded-full text-sm text-primary-foreground/90 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Admissions Open for 2026 Intake
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-[1.1] font-heading">
              Build In-Demand Skills{" "}
              <span className="relative">
                <span className="relative z-10">or Study Abroad</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-accent/30 -z-0 rounded" />
              </span>
            </h1>

            <p className="text-lg text-primary-foreground/75 max-w-lg leading-relaxed">
              Launch your career with industry-leading IT training programs or explore world-class education opportunities across the globe.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#courses" className="btn-accent inline-flex items-center gap-2 text-base">
                <BookOpen className="w-4 h-4" /> Explore Courses <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#destinations" className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-primary-foreground/20 text-base">
                <Globe className="w-4 h-4" /> Study Abroad
              </a>
            </div>
          </div>

          <div className="hidden lg:block animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
              <img
                src={heroImg}
                alt="International students collaborating"
                width={1920}
                height={1080}
                className="relative rounded-3xl shadow-2xl object-cover aspect-[16/10]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Stats bar */}
    <div className="bg-background border-b border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 -mt-px">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-6 md:py-8 text-center ${i < 3 ? "border-r border-border" : ""} animate-count-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-2xl md:text-3xl font-extrabold text-gradient font-heading">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
