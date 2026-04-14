import { useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import DetailDrawer from "@/components/DetailDrawer";
import workshopImg from "@/assets/event-workshop.jpg";
import seminarImg from "@/assets/event-seminar.jpg";
import admissionsImg from "@/assets/event-admissions.jpg";

const events = [
  {
    image: workshopImg,
    tag: "Workshop",
    tagColor: "bg-blue-50 text-blue-700",
    title: "AI & Machine Learning Hands-On Workshop",
    date: "April 25, 2026",
    desc: "Join our free 2-hour workshop and explore the fundamentals of AI with real-world projects.",
    details: "This workshop covers neural networks, supervised learning, and hands-on model building with Python and TensorFlow. Open to all skill levels.",
  },
  {
    image: seminarImg,
    tag: "Seminar",
    tagColor: "bg-purple-50 text-purple-700",
    title: "Study in UK – September 2026 Intake Briefing",
    date: "May 3, 2026",
    desc: "Learn about top UK universities, scholarships, and the complete application process.",
    details: "Meet university representatives, learn about scholarship opportunities, and get one-on-one counseling. Refreshments provided.",
  },
  {
    image: admissionsImg,
    tag: "Admissions",
    tagColor: "bg-green-50 text-green-700",
    title: "Open Day – Campus Tour & Free Counseling",
    date: "May 10, 2026",
    desc: "Visit our campus, meet trainers, and get free career counseling for IT and study abroad.",
    details: "Tour our state-of-the-art labs, meet expert trainers, and receive personalized career guidance. Families welcome.",
  },
];

const NewsEvents = () => {
  const { ref, visible } = useScrollReveal();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<typeof events[0] | null>(null);

  const openDrawer = (e: typeof events[0]) => { setSelected(e); setDrawerOpen(true); };

  return (
    <>
      <section className="py-20 md:py-28 bg-section-alt">
        <div
          ref={ref}
          className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
            <div>
              <span className="section-label">News & Events</span>
              <h2 className="section-title mt-3">What's Happening</h2>
              <p className="text-muted-foreground mt-3 max-w-md">Stay updated with our latest events, workshops, and admissions announcements.</p>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all shrink-0">
              View All News <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {events.map((e) => (
              <div key={e.title} className="premium-card overflow-hidden group cursor-pointer" onClick={() => openDrawer(e)}>
                <div className="h-48 overflow-hidden">
                  <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={512} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${e.tagColor}`}>{e.tag}</span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="w-3 h-3" /> {e.date}</span>
                  </div>
                  <h3 className="font-bold text-foreground font-heading text-base mb-2 group-hover:text-accent transition-colors leading-snug">{e.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selected?.title || "Event Details"}>
        {selected && (
          <div className="space-y-6">
            <img src={selected.image} alt={selected.title} className="w-full h-48 object-cover rounded-xl" />
            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${selected.tagColor}`}>{selected.tag}</span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><Calendar className="w-4 h-4" /> {selected.date}</span>
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl text-foreground mb-2">{selected.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{selected.desc}</p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-2">More Details</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.details}</p>
            </div>
          </div>
        )}
      </DetailDrawer>
    </>
  );
};

export default NewsEvents;
