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
    <section className="bg-background py-16 md:py-24 lg:py-28">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-opacity duration-700 md:px-8 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Badge above the heading, like every other section on this page. It used
            to sit in a left rail, a column away from the heading it names. */}
        <p className="mb-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent">
          {sectionText(heading, "eyebrow", "Our approach")}
        </p>
        {/* min-w-0: the card row's full-bleed `-mx-4` wrapper would otherwise widen
            this container past the viewport instead of being clipped. */}
        <div className="min-w-0">
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em] text-foreground">
            {sectionText(heading, "title", "How we work with you")}
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-[1.75] text-muted-foreground">
            {sectionText(
              heading,
              "subtitle",
              "Six ways we partner with people and organisations — from developing leaders to building resilience and professional performance.",
            )}
          </p>

          <div className="mt-10">
            <ResponsiveCardRow
              gridClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start"
              items={items.map((item) => ({
                key: item.id,
                /*
                 * The old site showed these as plain photo tiles that revealed their
                 * title and quote under a wash of colour on hover, and the client
                 * asked for that back. Spelling out all six quotes at once, as this
                 * did, turned a glanceable row into six paragraphs of reading.
                 *
                 * The title is always visible, unlike the original — a tile you have
                 * to hover to identify tells a phone user nothing, and hover does not
                 * exist there. On hover the wash deepens and the quote rises into it.
                 */
                node: (
                  <article className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        width={640}
                        height={480}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted" />
                    )}

                    {/* Two washes: a permanent one anchoring the title at the foot of
                        the tile, and a full-cover one that fades in for the quote. */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-tr from-primary/95 via-primary/85 to-accent/75 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
                      aria-hidden="true"
                    />

                    <div className="absolute inset-0 flex flex-col justify-end p-5 text-primary-foreground">
                      <h3 className="font-heading text-lg font-bold leading-snug tracking-[-0.01em]">
                        {item.title}
                      </h3>
                      {/* Laid out but transparent rather than absent, so revealing it
                          does not reflow the tile — and the quote stays in the
                          document for screen readers and search engines, which never
                          hover. */}
                      <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-56 group-hover:opacity-100 group-focus-within:max-h-56 group-focus-within:opacity-100">
                        <blockquote className="mt-3 text-sm leading-6 text-primary-foreground/90">
                          {item.quote}
                        </blockquote>
                        {item.author && (
                          <div className="mt-2 text-sm font-medium text-primary-foreground">
                            {item.author}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ),
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
