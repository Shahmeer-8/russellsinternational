import { Quote } from "lucide-react";
import { useHowWeWorkItems, usePageSections } from "@/hooks/api";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { sectionText } from "@/lib/content";
import ResponsiveCardRow from "@/components/ResponsiveCardRow";

/**
 * The ways of working shown on the About page, each a photo with the discipline's
 * name and a quote. Content and images are admin-managed; the heading above them
 * lives in the `about / how_we_work` page section.
 *
 * Six tall photo cards stacked on a phone would add several screens to a page
 * that is already long, so the row swipes on mobile via ResponsiveCardRow and
 * only becomes a grid from `sm` up.
 */
const HowWeWorkSection = () => {
  const { ref, visible } = useScrollReveal(0.08);
  const { data, isLoading } = useHowWeWorkItems();
  const { data: sectionData } = usePageSections("about");

  const items = data?.data ?? [];
  const heading = sectionData?.data?.how_we_work;

  // An empty section would leave a stray heading on the page, but bailing out
  // while still loading would cost the scroll reveal its ref — so only hide it
  // once we know there is genuinely nothing to show.
  if (!isLoading && items.length === 0) {
    return null;
  }

  return (
    <section className="bg-[hsl(var(--muted))] py-12 md:py-20">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 md:px-8 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="mb-8 text-center">
          <span className="section-label">
            {sectionText(heading, "eyebrow", "Our approach")}
          </span>
          <h2 className="section-title mt-3">
            {sectionText(heading, "title", "How we work with you")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {sectionText(
              heading,
              "subtitle",
              "Six ways we partner with people and organisations — from developing leaders to building resilience and professional performance.",
            )}
          </p>
        </div>

        <ResponsiveCardRow
          gridClassName="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          items={items.map((item) => ({
            key: item.id,
            node: (
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--card-shadow-hover)]">
                {item.image_url && (
                  <div className="relative overflow-hidden bg-primary">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="aspect-[4/3] w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      width={640}
                      height={480}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-extrabold leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <Quote className="mt-3 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <blockquote className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.quote}
                  </blockquote>
                  {item.author && (
                    <div className="mt-auto pt-4 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                      — {item.author}
                    </div>
                  )}
                </div>
              </article>
            ),
          }))}
        />
      </div>
    </section>
  );
};

export default HowWeWorkSection;
