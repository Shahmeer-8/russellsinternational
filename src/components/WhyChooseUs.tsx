import { Award, Users, ShieldCheck, Headphones, TrendingUp, Globe } from "lucide-react";

const points = [
  { icon: Award, title: "Experienced Consultants", desc: "Over a decade of success in global education and IT training.", gradient: "from-[hsl(217,91%,60%)] to-[hsl(240,70%,50%)]" },
  { icon: ShieldCheck, title: "95% Visa Success", desc: "Proven track record with transparent guidance at every step.", gradient: "from-[hsl(160,70%,40%)] to-[hsl(200,80%,50%)]" },
  { icon: Globe, title: "Global University Network", desc: "Partnerships with 50+ top universities across UK, Canada, Australia.", gradient: "from-[hsl(260,80%,60%)] to-[hsl(280,70%,50%)]" },
  { icon: TrendingUp, title: "Career-Focused Training", desc: "Industry-aligned IT programs with job placement support.", gradient: "from-[hsl(200,80%,50%)] to-[hsl(217,91%,60%)]" },
  { icon: Users, title: "5,000+ Alumni", desc: "A thriving community of successful graduates worldwide.", gradient: "from-[hsl(280,70%,50%)] to-[hsl(320,70%,60%)]" },
  { icon: Headphones, title: "End-to-End Support", desc: "From application to arrival, we're with you every step.", gradient: "from-[hsl(240,60%,50%)] to-[hsl(260,80%,60%)]" },
];

const WhyChooseUs = () => (
  <section id="why-us" className="py-24 md:py-32 relative overflow-hidden">
    {/* Subtle mesh bg */}
    <div className="absolute inset-0 bg-mesh opacity-40" />
    
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <div className="text-center mb-16">
        <span className="section-label">Why Russell's International</span>
        <h2 className="section-title mt-3">Your Dedicated Partners in Growth</h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Trusted by thousands of students worldwide to unlock their potential.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {points.map((p, i) => (
          <div key={p.title} className="glass-card p-7 group" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <p.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-foreground font-heading text-lg mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
