import { Calendar, ArrowRight } from "lucide-react";
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
  },
  {
    image: seminarImg,
    tag: "Seminar",
    tagColor: "bg-purple-50 text-purple-700",
    title: "Study in UK – September 2026 Intake Briefing",
    date: "May 3, 2026",
    desc: "Learn about top UK universities, scholarships, and the complete application process.",
  },
  {
    image: admissionsImg,
    tag: "Admissions",
    tagColor: "bg-green-50 text-green-700",
    title: "Open Day – Campus Tour & Free Counseling",
    date: "May 10, 2026",
    desc: "Visit our campus, meet trainers, and get free career counseling for IT and study abroad.",
  },
];

const NewsEvents = () => (
  <section className="py-20 md:py-28 bg-section-alt">
    <div className="container mx-auto px-4 md:px-8">
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
          <div key={e.title} className="premium-card overflow-hidden group cursor-pointer">
            <div className="h-48 overflow-hidden">
              <img
                src={e.image}
                alt={e.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width={800}
                height={512}
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${e.tagColor}`}>
                  {e.tag}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" /> {e.date}
                </span>
              </div>
              <h3 className="font-bold text-foreground font-heading text-base mb-2 group-hover:text-accent transition-colors leading-snug">
                {e.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default NewsEvents;
