import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { useEvent } from "@/hooks/api";

/**
 * One news item or event, on its own page.
 *
 * Events used to open in a side drawer that ended with a "Download PDF" button
 * which downloaded nothing. An event is a thing that happened in a place on a
 * date, with photographs of it — that is a page, and it is a page that can be
 * linked to, shared and found in search, none of which a drawer can be.
 */
const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useEvent(id);
  const event = data?.data;

  // The cover leads the gallery, so the picture from the card the visitor clicked
  // is the one that greets them here.
  const photos = event?.image_urls ?? [];
  const [lead, setLead] = useState(0);
  const leadPhoto = photos[Math.min(lead, Math.max(photos.length - 1, 0))];

  return (
    <div className="min-h-screen bg-page">
      <SiteHeader />

      <main className="pt-header">
        <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> News &amp; events
          </Link>

          {isLoading && (
            <div className="mt-8 max-w-4xl animate-pulse space-y-4">
              <div className="h-8 w-2/3 rounded bg-muted" />
              <div className="aspect-[16/9] w-full rounded-2xl bg-muted" />
            </div>
          )}

          {isError && (
            <div className="mt-16 max-w-xl">
              <h1 className="font-display text-2xl font-semibold text-foreground">
                We could not find that page
              </h1>
              <p className="mt-3 text-muted-foreground">
                It may have been taken down. Everything currently published is on the news and events page.
              </p>
              <Link to="/events" className="btn-primary mt-6 inline-flex text-sm">
                Back to news &amp; events
              </Link>
            </div>
          )}

          {event && (
            <article className="mt-6 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                {event.tag && (
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${event.tag_color}`}
                  >
                    {event.tag}
                  </span>
                )}
                {event.formatted_date && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" /> {event.formatted_date}
                  </span>
                )}
                {event.venue && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {event.venue}
                  </span>
                )}
                {event.capacity ? (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" /> {event.capacity} attending
                  </span>
                ) : null}
              </div>

              <h1 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-foreground">
                {event.title}
              </h1>

              {event.short_description && (
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {event.short_description}
                </p>
              )}

              {leadPhoto && (
                <img
                  src={leadPhoto}
                  alt={event.title}
                  className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
                  loading="eager"
                  decoding="async"
                  width={1280}
                  height={720}
                />
              )}

              {/* Thumbnails only once there is more than one picture — a single
                  thumbnail under the photo it duplicates is just clutter. */}
              {photos.length > 1 && (
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
                  {photos.map((photo, i) => (
                    <button
                      key={photo}
                      type="button"
                      onClick={() => setLead(i)}
                      aria-label={`Show photo ${i + 1} of ${photos.length}`}
                      aria-current={i === lead}
                      className={`overflow-hidden rounded-lg transition-opacity ${
                        i === lead ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={photo}
                        alt=""
                        className="aspect-[4/3] w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width={320}
                        height={240}
                      />
                    </button>
                  ))}
                </div>
              )}

              {event.full_details && (
                <div className="mt-10 max-w-2xl space-y-4">
                  {/* Admins type this as plain paragraphs separated by blank lines. */}
                  {event.full_details
                    .split(/\n\s*\n/)
                    .map((paragraph) => paragraph.trim())
                    .filter(Boolean)
                    .map((paragraph, i) => (
                      <p key={i} className="leading-7 text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                </div>
              )}
            </article>
          )}
        </div>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
};

export default EventDetail;
