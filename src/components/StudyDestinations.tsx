import { ArrowRight, MapPin } from "lucide-react";

const destinations = [
  { flag: "🇬🇧", country: "United Kingdom", unis: "40+", desc: "World-renowned universities with rich heritage", highlight: "Oxford, Cambridge, UCL" },
  { flag: "🇨🇦", country: "Canada", unis: "35+", desc: "Affordable excellence with post-study work options", highlight: "Toronto, UBC, McGill" },
  { flag: "🇦🇺", country: "Australia", unis: "30+", desc: "Top-ranked universities in stunning locations", highlight: "Melbourne, Sydney, ANU" },
  { flag: "🇺🇸", country: "United States", unis: "45+", desc: "Ivy League and cutting-edge research institutions", highlight: "MIT, Stanford, Harvard" },
];

const StudyDestinations = () => (
  <section id="destinations" className="py-20 md:py-28 bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60">Global Opportunities</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight font-heading mt-3">Top Study Destinations</h2>
        <p className="text-primary-foreground/50 mt-4 max-w-lg mx-auto">Explore world-class education opportunities across the globe.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((d) => (
          <div key={d.country} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-7 text-center group cursor-pointer hover:bg-primary-foreground/10 transition-all duration-300 hover:-translate-y-1">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{d.flag}</div>
            <h3 className="font-bold font-heading text-lg mb-1">{d.country}</h3>
            <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground/70 mb-3">
              <MapPin className="w-3.5 h-3.5" /> {d.unis} Partner Universities
            </div>
            <p className="text-xs text-primary-foreground/40 mb-2 leading-relaxed">{d.desc}</p>
            <p className="text-[11px] text-primary-foreground/30 font-medium mb-4">{d.highlight}</p>
            <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground/80 hover:text-primary-foreground group-hover:gap-2.5 transition-all">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StudyDestinations;
