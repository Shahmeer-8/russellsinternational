import destinationsImg from "@/assets/global-destinations.jpg";
import { ArrowRight, MapPin } from "lucide-react";

const destinations = [
  { flag: "🇬🇧", country: "United Kingdom", unis: "40+", desc: "World-renowned universities with rich heritage", highlight: "Oxford, Cambridge, UCL" },
  { flag: "🇨🇦", country: "Canada", unis: "35+", desc: "Affordable excellence with post-study work options", highlight: "Toronto, UBC, McGill" },
  { flag: "🇦🇺", country: "Australia", unis: "30+", desc: "Top-ranked universities in stunning locations", highlight: "Melbourne, Sydney, ANU" },
  { flag: "🇺🇸", country: "United States", unis: "45+", desc: "Ivy League and cutting-edge research institutions", highlight: "MIT, Stanford, Harvard" },
];

const StudyDestinations = () => (
  <section id="destinations" className="relative py-24 md:py-32 overflow-hidden">
    {/* Full-width background */}
    <div className="absolute inset-0">
      <img src={destinationsImg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={800} />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(224,71%,10%)/0.92] via-[hsl(224,71%,10%)/0.85] to-[hsl(224,71%,10%)/0.95]" />
    </div>

    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="text-center mb-16">
        <span className="section-label">Global Opportunities</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-heading mt-3">Top Study Destinations</h2>
        <p className="text-white/50 mt-4 max-w-lg mx-auto">Explore world-class education opportunities across the globe with our expert guidance.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((d, i) => (
          <div
            key={d.country}
            className="glass-card-dark p-7 text-center group cursor-pointer relative overflow-hidden"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">{d.flag}</div>
              <h3 className="font-bold text-white font-heading text-lg mb-1">{d.country}</h3>
              <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent mb-3">
                <MapPin className="w-3.5 h-3.5" /> {d.unis} Partner Universities
              </div>
              <p className="text-xs text-white/40 mb-2 leading-relaxed">{d.desc}</p>
              <p className="text-[11px] text-accent/60 font-medium mb-5">{d.highlight}</p>
              <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StudyDestinations;
