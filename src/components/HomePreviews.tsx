import { Link } from "react-router-dom";
import { ArrowRight, Code, Globe2, Languages, Briefcase, Calendar } from "lucide-react";
import skillImg from "@/assets/skill-training.jpg";
import studyImg from "@/assets/study-abroad-clean.jpg";
import ieltsImg from "@/assets/ielts-prep.jpg";
import jobsImg from "@/assets/jobs-career.jpg";
import eventImg from "@/assets/event-workshop.jpg";

const cards = [
  {
    icon: Code,
    image: skillImg,
    eyebrow: "Skills & Courses",
    title: "Industry-Ready IT Training",
    desc: "Web, AI/ML, Cybersecurity & free NAVTTC programs.",
    to: "/skills",
  },
  {
    icon: Globe2,
    image: studyImg,
    eyebrow: "Study Abroad",
    title: "Top Universities Worldwide",
    desc: "UK, Canada, Australia, USA — 95%+ visa success.",
    to: "/study-abroad",
  },
  {
    icon: Languages,
    image: ieltsImg,
    eyebrow: "Languages",
    title: "IELTS, German & Korean",
    desc: "Expert coaching with target band strategies.",
    to: "/languages",
  },
  {
    icon: Briefcase,
    image: jobsImg,
    eyebrow: "Careers",
    title: "Jobs & Internships",
    desc: "Open positions and structured internships.",
    to: "/careers",
  },
  {
    icon: Calendar,
    image: eventImg,
    eyebrow: "Events & News",
    title: "Workshops & Open Days",
    desc: "Free workshops, seminars, and admissions events.",
    to: "/events",
  },
];

const HomePreviews = () => (
  <section className="py-20 md:py-28 bg-section-alt relative overflow-hidden">
    {/* Soft background accents */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
    </div>

    <div className="container mx-auto px-4 md:px-8 relative">
      <div className="text-center mb-14">
        <span className="section-label">Your Path</span>
        <h2 className="section-title mt-3">Choose Your Path to Success</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Five focused directions — pick the one that moves your future forward.
        </p>
      </div>

      {/* Interactive grid: 1 / 2 / 3 / 5 cols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {cards.map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="group relative h-72 md:h-80 rounded-2xl overflow-hidden ring-1 ring-border/60 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-500 hover:-translate-y-1.5"
          >
            {/* Background image */}
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
            />
            {/* Blue gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/20" />
            {/* Orange glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-accent/40 via-transparent to-transparent" />

            {/* Top icon (glass) */}
            <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md ring-1 ring-white/25 flex items-center justify-center group-hover:bg-accent group-hover:ring-accent transition-all duration-300">
              <c.icon className="w-5 h-5 text-white" />
            </div>

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">
                {c.eyebrow}
              </span>
              <h3 className="font-heading font-bold text-white text-lg leading-snug mt-1.5 mb-2">
                {c.title}
              </h3>
              <p className="text-[13px] text-white/80 leading-relaxed mb-3 line-clamp-2">
                {c.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-accent group-hover:gap-2.5 transition-all">
                Explore More <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default HomePreviews;
