import { Award, Users, ShieldCheck, Headphones, TrendingUp, Globe } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const points = [
  { icon: Award, title: "Experienced Consultants", desc: "Over a decade of success in global education and IT training.", color: "bg-blue-50 text-blue-600" },
  { icon: ShieldCheck, title: "95% Visa Success", desc: "Proven track record with transparent guidance at every step.", color: "bg-green-50 text-green-600" },
  { icon: Globe, title: "Global University Network", desc: "Partnerships with 50+ top universities across UK, Canada, Australia.", color: "bg-purple-50 text-purple-600" },
  { icon: TrendingUp, title: "Career-Focused Training", desc: "Industry-aligned IT programs with job placement support.", color: "bg-orange-50 text-orange-600" },
  { icon: Users, title: "5,000+ Alumni", desc: "A thriving community of successful graduates worldwide.", color: "bg-pink-50 text-pink-600" },
  { icon: Headphones, title: "End-to-End Support", desc: "From application to arrival, we're with you every step.", color: "bg-indigo-50 text-indigo-600" },
];

const WhyChooseUs = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="why-us" className="py-20 md:py-28 bg-section-alt">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center mb-14">
          <span className="section-label">Why Russell's International</span>
          <h2 className="section-title mt-3">Your Trusted Partner in Growth</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Trusted by thousands of students worldwide to unlock their potential.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((p, i) => (
            <div
              key={p.title}
              className="premium-card p-7 group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${p.color.split(" ")[0]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <p.icon className={`w-6 h-6 ${p.color.split(" ")[1]}`} />
              </div>
              <h3 className="font-bold text-foreground font-heading text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
