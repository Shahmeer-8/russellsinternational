import heroImg from "@/assets/hero-students-clean.jpg";
import { ArrowRight, Sparkles, TrendingUp, Globe } from "lucide-react";

const ticker = ["🎓 Admissions Open 2026", "🚀 New AI & ML Batch Starting", "🌍 UK September Intake Open", "💻 Free Career Counseling"];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Partner Universities" },
  { value: "95%", label: "Visa Success Rate" },
  { value: "5,000+", label: "Students Placed" },
];

const HeroSection = () => (
  <section className="relative pt-16">
    {/* Ticker bar */}
    <div className="bg-primary text-primary-foreground py-2.5 overflow-hidden">
      <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap gap-12">
        {[...ticker, ...ticker].map((t, i) => (
          <span key={i} className="text-xs font-medium tracking-wide">{t}</span>
        ))}
      </div>
    </div>

    {/* Split hero */}
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 md:py-24">
        {/* Left: Text */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent text-xs font-semibold px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Trusted by 5,000+ Students
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-foreground leading-[1.12] font-heading">
            Master In-Demand Skills or Study Abroad —{" "}
            <span className="text-gradient">Your Global Career Starts Here</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed mt-6">
            Join thousands who've launched successful careers through our industry-certified IT training and expert study abroad consultancy.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#contact" className="btn-accent inline-flex items-center gap-2 group">
              Start Your Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#courses" className="btn-outline inline-flex items-center gap-2">
              Explore Programs
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-accent" /> Career-Focused</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-accent" /> Global Network</span>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={heroImg} alt="Diverse international students on campus" width={1280} height={960} className="w-full h-auto object-cover" />
          </div>
          {/* Floating stat cards */}
          <div className="absolute -bottom-6 -left-4 bg-background rounded-2xl shadow-lg border border-border p-4 hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-bold text-foreground text-sm">95% Visa Success</div>
              <div className="text-xs text-muted-foreground">Proven track record</div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-background rounded-2xl shadow-lg border border-border p-4 hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-foreground text-sm">50+ Universities</div>
              <div className="text-xs text-muted-foreground">Worldwide partners</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Stats bar */}
    <div className="bg-primary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`py-6 md:py-8 text-center ${i < 3 ? "border-r border-primary-foreground/10" : ""}`}>
              <div className="text-2xl md:text-3xl font-extrabold text-primary-foreground font-heading">{s.value}</div>
              <div className="text-xs text-primary-foreground/60 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
