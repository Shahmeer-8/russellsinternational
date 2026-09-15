import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEvents } from "@/hooks/api";
import ResponsiveCardRow from "@/components/ResponsiveCardRow";
import { useSectionCopy } from "@/hooks/useSectionCopy";

/**
 * The events listing. Each card goes to that event's own page.
 *
 * It used to open a side drawer, which could not be linked to or shared and which
 * ended in a "Download PDF" button that downloaded nothing. An event has
 * photographs, a place and a date — that wants a page.
 */
const NewsEvents = () => {
  const copy = useSectionCopy("events", "news");
  const { ref, visible } = useScrollReveal();

  const { data: eventsData, isLoading } = useEvents("event");
  const eventsList = (eventsData?.data?.data ?? []).map((e) => ({
    id: e.id,
    image: e.image_url,
    tag: e.tag,
    tagColor: e.tag_color,
    title: e.title,
    date: e.formatted_date ?? e.event_date ?? "",
    desc: e.short_description,
    photoCount: e.image_urls?.length ?? 0,
  }));

  return (
    <>
      <section className="py-20 md:py-28 bg-section-alt">
        <div
          ref={ref}
          className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
            <div>
              <span className="section-label">{copy("eyebrow", "News & Events")}</span>
              <h2 className="section-title mt-3">{copy("title", "What's Happening")}</h2>
              <p className="text-muted-foreground mt-3 max-w-md">{copy("subtitle", "Stay updated with our latest events, workshops, and admissions announcements.")}</p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <div key={i} className="premium-card h-80 animate-pulse" />)}
            </div>
          ) : eventsList.length === 0 ? null : (
            <ResponsiveCardRow
              gridClassName="grid md:grid-cols-3 gap-6"
              items={eventsList.map((e) => ({
                key: e.id,
                node: (
                <Link to={`/events/${e.id}`} className="premium-card overflow-hidden group h-full flex flex-col">
                  <div className="h-48 overflow-hidden bg-muted relative">
                    {e.image && (
                      <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width={800} height={512} />
                    )}
                    {/* Tells the visitor there is more to see before they click,
                        which is the point of giving events a page of their own. */}
                    {e.photoCount > 1 && (
                      <span className="absolute bottom-3 right-3 rounded-full bg-foreground/70 px-2.5 py-1 text-[11px] font-semibold text-background backdrop-blur-sm">
                        {e.photoCount} photos
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${e.tagColor}`}>{e.tag}</span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="w-3 h-3" /> {e.date}</span>
                    </div>
                    <h3 className="font-bold text-foreground font-heading text-base mb-2 group-hover:text-accent transition-colors leading-snug">{e.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                      View event <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
                ),
              }))}
            />
          )}
        </div>
      </section>

    </>
  );
};

export default NewsEvents;
