import { Award, Users, ShieldCheck, Headphones, TrendingUp, Globe } from "lucide-react";
import partnersImg from "@/assets/partners-meeting.jpg";

const points = [
  { icon: Award, title: "Experienced Consultants", desc: "Over a decade of success in global education and IT training." },
  { icon: ShieldCheck, title: "95% Visa Success", desc: "Proven track record with transparent guidance at every step." },
  { icon: Globe, title: "Global University Network", desc: "Partnerships with 50+ top universities across UK, Canada, Australia." },
  { icon: TrendingUp, title: "Career-Focused Training", desc: "Industry-aligned IT programs with job placement support." },
  { icon: Users, title: "5,000+ Alumni", desc: "A thriving community of successful graduates worldwide." },
  { icon: Headphones, title: "End-to-End Support", desc: "From application to arrival, we're with you every step." },
];

const WhyChooseUs = () => (
  <section id="why-us" className="py-20 md:py-28">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="section-label">Why Russell's International</span>
          <h2 className="section-title mt-3 mb-8">Your Dedicated Partners in Growth</h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {points.map((p) => (
              <div key={p.title} className="flex gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <p.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{p.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-6 bg-accent/5 rounded-3xl" />
          <img
            src={partnersImg}
            alt="Russell's International team"
            width={960}
            height={640}
            loading="lazy"
            className="relative rounded-3xl shadow-xl object-cover aspect-[3/2]"
          />
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
