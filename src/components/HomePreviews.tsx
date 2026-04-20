import { Link } from "react-router-dom";
import { ArrowRight, Code, Globe2, Languages, Briefcase, Calendar } from "lucide-react";
import skillImg from "@/assets/skill-training.jpg";
import studyImg from "@/assets/study-abroad-clean.jpg";
import ieltsImg from "@/assets/ielts-prep.jpg";
import jobsImg from "@/assets/jobs-career.jpg";
import eventImg from "@/assets/event-workshop.jpg";

const previews = [
  {
    icon: Code,
    image: skillImg,
    eyebrow: "Skills & Courses",
    title: "Industry-Ready IT Training",
    desc: "Web Dev, AI/ML, Cybersecurity, Digital Marketing & free NAVTTC programs.",
    to: "/skills",
    cta: "Explore Courses",
  },
  {
    icon: Globe2,
    image: studyImg,
    eyebrow: "Study Abroad",
    title: "Top Universities Worldwide",
    desc: "End-to-end admissions for UK, Canada, Australia, USA — 95%+ visa success.",
    to: "/study-abroad",
    cta: "Discover Destinations",
  },
  {
    icon: Languages,
    image: ieltsImg,
    eyebrow: "Languages",
    title: "IELTS, German & Korean",
    desc: "Expert coaching with mock tests and target band score strategies.",
    to: "/languages",
    cta: "View Programs",
  },
  {
    icon: Briefcase,
    image: jobsImg,
    eyebrow: "Careers",
    title: "Jobs & Internships",
    desc: "Open positions at our partner companies and structured internships.",
    to: "/careers",
    cta: "Browse Openings",
  },
  {
    icon: Calendar,
    image: eventImg,
    eyebrow: "Events & News",
    title: "Workshops & Open Days",
    desc: "Stay updated on free workshops, seminars, and admissions events.",
    to: "/events",
    cta: "See What's On",
  },
];

const HomePreviews = () => (
  <section className="py-20 md:py-28 bg-section-alt">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <span className="section-label">Explore</span>
        <h2 className="section-title mt-3">Everything You Need, in One Place</h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
          From skills to study abroad — explore each area in detail.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {previews.map((p, i) => (
          <Link
            key={p.title}
            to={p.to}
            className={`premium-card overflow-hidden group ${i === 0 ? "lg:row-span-2 lg:col-span-1" : ""}`}
          >
            <div className={`overflow-hidden ${i === 0 ? "h-64 lg:h-80" : "h-44"}`}>
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <p.icon className="w-4 h-4 text-accent" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent">{p.eyebrow}</span>
              </div>
              <h3 className="font-heading font-bold text-foreground text-lg mb-2 group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                {p.cta} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default HomePreviews;
