import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import DetailDrawer from "@/components/DetailDrawer";

const destinations = [
  { flag: "🇬🇧", country: "United Kingdom", unis: "40+", desc: "World-renowned universities with rich heritage and cutting-edge research.", highlight: "Oxford, Cambridge, UCL", intake: "Sept & Jan", visa: "98% success rate" },
  { flag: "🇨🇦", country: "Canada", unis: "35+", desc: "Affordable excellence with post-study work permits up to 3 years.", highlight: "Toronto, UBC, McGill", intake: "Sept, Jan & May", visa: "95% success rate" },
  { flag: "🇦🇺", country: "Australia", unis: "30+", desc: "Top-ranked universities in stunning locations with great quality of life.", highlight: "Melbourne, Sydney, ANU", intake: "Feb & July", visa: "96% success rate" },
  { flag: "🇺🇸", country: "United States", unis: "45+", desc: "Ivy League and cutting-edge research institutions with global recognition.", highlight: "MIT, Stanford, Harvard", intake: "Fall & Spring", visa: "93% success rate" },
];

const StudyDestinations = () => {
  const { ref, visible } = useScrollReveal();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<typeof destinations[0] | null>(null);

  const openDrawer = (d: typeof destinations[0]) => { setSelected(d); setDrawerOpen(true); };

  return (
    <>
      <section id="destinations" className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div
          ref={ref}
          className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60">Global Opportunities</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight font-heading mt-3">Top Study Destinations</h2>
            <p className="text-primary-foreground/50 mt-4 max-w-lg mx-auto">Explore world-class education opportunities across the globe.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((d) => (
              <div
                key={d.country}
                onClick={() => openDrawer(d)}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-7 text-center group cursor-pointer hover:bg-primary-foreground/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{d.flag}</div>
                <h3 className="font-bold font-heading text-lg mb-1">{d.country}</h3>
                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground/70 mb-3">
                  <MapPin className="w-3.5 h-3.5" /> {d.unis} Partner Universities
                </div>
                <p className="text-xs text-primary-foreground/40 mb-4 leading-relaxed">{d.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground/80 hover:text-primary-foreground group-hover:gap-2.5 transition-all">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selected ? `Study in ${selected.country}` : "Destination"}>
        {selected && (
          <div className="space-y-6">
            <div className="text-6xl">{selected.flag}</div>
            <div>
              <h4 className="font-heading font-bold text-xl text-foreground">{selected.country}</h4>
              <p className="text-muted-foreground mt-2 leading-relaxed">{selected.desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Partner Universities", value: selected.unis },
                { label: "Visa Success", value: selected.visa },
                { label: "Intake Periods", value: selected.intake },
                { label: "Top Universities", value: selected.highlight },
              ].map((item) => (
                <div key={item.label} className="bg-muted/50 rounded-xl p-4">
                  <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                  <div className="font-semibold text-foreground text-sm">{item.value}</div>
                </div>
              ))}
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">Services We Offer</h5>
              <ul className="space-y-2">
                {["University selection & shortlisting", "Application & documentation support", "Visa preparation & mock interviews", "Pre-departure orientation", "Post-arrival support"].map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </DetailDrawer>
    </>
  );
};

export default StudyDestinations;
