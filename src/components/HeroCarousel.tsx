import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import slide1 from "@/assets/hero-students-clean.jpg";
import slide2 from "@/assets/skill-training.jpg";
import slide3 from "@/assets/study-abroad-clean.jpg";
import slide4 from "@/assets/event-seminar.jpg";

const slides = [
  {
    image: slide1,
    eyebrow: "Admissions Open 2026",
    title: "Your Global Career Starts Here",
    desc: "Industry-certified IT training and expert study abroad consultancy — trusted by 5,000+ students.",
    cta: { label: "Explore Programs", to: "/skills" },
  },
  {
    image: slide2,
    eyebrow: "Skills That Get You Hired",
    title: "Master In-Demand Tech Skills",
    desc: "Web Development, AI, Cybersecurity, Digital Marketing — taught by industry experts.",
    cta: { label: "View Courses", to: "/skills" },
  },
  {
    image: slide3,
    eyebrow: "Study Abroad",
    title: "World-Class Universities Await",
    desc: "UK, Canada, Australia, USA — end-to-end admissions and visa support with 95%+ success.",
    cta: { label: "Discover Destinations", to: "/study-abroad" },
  },
  {
    image: slide4,
    eyebrow: "Events & News",
    title: "Workshops, Seminars & Open Days",
    desc: "Stay updated on free workshops, university intake briefings, and admissions events.",
    cta: { label: "See Events", to: "/events" },
  },
];

const HeroCarousel = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  const go = (dir: number) => setActive((p) => (p + dir + slides.length) % slides.length);

  return (
    <section className="relative pt-16">
      {/* Ticker */}
      <div className="bg-primary text-primary-foreground py-2.5 overflow-hidden">
        <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap gap-12">
          {[
            "🎓 Admissions Open 2026",
            "🚀 New AI & ML Batch Starting",
            "🌍 UK September Intake Open",
            "💻 Free Career Counseling",
          ].concat([
            "🎓 Admissions Open 2026",
            "🚀 New AI & ML Batch Starting",
            "🌍 UK September Intake Open",
            "💻 Free Career Counseling",
          ]).map((t, i) => (
            <span key={i} className="text-xs font-medium tracking-wide">{t}</span>
          ))}
        </div>
      </div>

      {/* Slides */}
      <div className="relative h-[560px] md:h-[640px] overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-hidden={i !== active}
          >
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-2xl text-primary-foreground animate-fade-in" key={`${i}-${active}`}>
                  <span className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
                    {s.eyebrow}
                  </span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] font-heading mb-5">
                    {s.title}
                  </h1>
                  <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed mb-8">
                    {s.desc}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to={s.cta.to} className="btn-accent inline-flex items-center gap-2 group">
                      {s.cta.label} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/#contact" className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:bg-primary-foreground/20 transition-all">
                      Free Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/20 hover:bg-background/40 backdrop-blur-md flex items-center justify-center text-primary-foreground transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/20 hover:bg-background/40 backdrop-blur-md flex items-center justify-center text-primary-foreground transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-accent" : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
