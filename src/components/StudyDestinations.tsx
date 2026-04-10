import { ArrowRight } from "lucide-react";

const destinations = [
  { flag: "🇬🇧", country: "United Kingdom", unis: "40+", desc: "World-renowned universities with rich heritage" },
  { flag: "🇨🇦", country: "Canada", unis: "35+", desc: "Affordable excellence with post-study work options" },
  { flag: "🇦🇺", country: "Australia", unis: "30+", desc: "Top-ranked universities in stunning locations" },
  { flag: "🇺🇸", country: "United States", unis: "45+", desc: "Ivy League and cutting-edge research institutions" },
];

const StudyDestinations = () => (
  <section id="destinations" className="py-20 md:py-28">
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <span className="section-label">Global Opportunities</span>
        <h2 className="section-title mt-3">Top Study Destinations</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((d) => (
          <div key={d.country} className="glass-card p-6 text-center group cursor-pointer">
            <div className="text-5xl mb-4">{d.flag}</div>
            <h3 className="font-bold text-foreground font-heading text-lg mb-1">{d.country}</h3>
            <div className="text-sm font-semibold text-accent mb-2">{d.unis} Partner Universities</div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{d.desc}</p>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StudyDestinations;
