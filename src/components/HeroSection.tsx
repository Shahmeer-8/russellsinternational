import heroImg from "@/assets/hero-cinematic.jpg";
import { ArrowRight, BookOpen, Globe, Sparkles, Zap, GraduationCap } from "lucide-react";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Partner Universities" },
  { value: "95%", label: "Visa Success Rate" },
  { value: "5,000+", label: "Students Placed" },
];

const HeroSection = () => (
  <section className="relative min-h-screen flex flex-col">
    {/* Background image with overlay */}
    <div className="absolute inset-0">
      <img src={heroImg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(224,71%,10%)/0.92] via-[hsl(240,60%,15%)/0.85] to-[hsl(260,50%,18%)/0.75]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(224,71%,10%)] via-transparent to-transparent opacity-60" />
    </div>

    {/* Floating glow orbs */}
    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/20 rounded-full blur-[100px] animate-glow-pulse" />
    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[hsl(260,80%,60%)]/15 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

    {/* Content */}
    <div className="relative z-10 flex-1 flex items-center pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl">
          {/* Floating badges */}
          <div className="flex flex-wrap gap-3 mb-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/15 px-4 py-2 rounded-full text-sm text-white/90 font-medium animate-float">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Admissions Open 2026
            </div>
            <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/15 px-4 py-2 rounded-full text-sm text-white/90 font-medium animate-float-delayed">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              New AI & ML Courses
            </div>
            <div className="hidden md:inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/15 px-4 py-2 rounded-full text-sm text-white/90 font-medium animate-float" style={{ animationDelay: "1s" }}>
              <GraduationCap className="w-3.5 h-3.5 text-accent" />
              UK Intake 2026
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] font-heading animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Build Future Skills.{" "}
            <span className="text-gradient">Study Abroad.</span>
            <br />
            <span className="text-white/90">Unlock Global Opportunities.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mt-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Launch your career with cutting-edge IT training or explore world-class education at top universities across the globe.
          </p>

          <div className="flex flex-wrap gap-4 mt-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <a href="#courses" className="btn-accent inline-flex items-center gap-2 text-base group">
              <BookOpen className="w-4 h-4" /> Explore Programs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="btn-glass inline-flex items-center gap-2 text-base">
              <Sparkles className="w-4 h-4" /> Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Stats bar - glass */}
    <div className="relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl mb-8 mx-0 lg:mx-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-6 md:py-8 text-center ${i < 3 ? "border-r border-white/10" : ""} animate-count-up`}
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <div className="text-2xl md:text-3xl font-extrabold text-gradient font-heading">{s.value}</div>
                <div className="text-xs md:text-sm text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
