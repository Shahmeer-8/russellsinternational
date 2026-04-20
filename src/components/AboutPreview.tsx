import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import aboutImg from "@/assets/about-team.jpg";

const points = [
  "10+ years of education excellence",
  "5,000+ students empowered globally",
  "50+ partner universities worldwide",
];

const AboutPreview = () => {
  const { ref, visible } = useScrollReveal();
  return (
    <section className="py-20 md:py-28 bg-section-alt">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img src={aboutImg} alt="Russell's International team" className="w-full h-auto object-cover" loading="lazy" width={960} height={640} />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground rounded-2xl p-5 shadow-lg hidden md:block">
              <div className="text-2xl font-extrabold font-heading">10+</div>
              <div className="text-xs font-medium opacity-90">Years of Excellence</div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="section-label">About Us</span>
            <h2 className="section-title mt-3 mb-5">Empowering Futures Since 2014</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Russell's International is a leading education consultancy and IT training institute based in Islamabad. We bridge the gap between ambition and achievement with world-class skill development and expert study abroad guidance.
            </p>
            <ul className="space-y-3 mb-8">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm text-foreground font-medium">{p}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-accent inline-flex items-center gap-2">
              View More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
