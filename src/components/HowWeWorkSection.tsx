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
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
          <p className="text-sm font-medium text-muted-foreground lg:col-span-2 lg:pt-2">
            {sectionText(heading, "eyebrow", "Our approach")}
          </p>
          {/* min-w-0: the card row's full-bleed `-mx-4` wrapper would otherwise
              widen this grid column past the viewport instead of being clipped. */}
          <div className="min-w-0 lg:col-span-10">
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
            gridClassName="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 items-start"
            items={items.map((item) => ({
              key: item.id,
              node: (
                <article className="h-full border-t border-border pt-5">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="mb-4 aspect-[4/3] w-full rounded-sm object-cover object-center"
                      loading="lazy"
                      width={640}
                      height={480}
                    />
                  )}
                  <h3 className="font-heading text-lg font-bold leading-snug tracking-[-0.01em] text-foreground">
                    {item.title}
                  </h3>
                  <blockquote className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.quote}
                  </blockquote>
                  {item.author && (
                    <div className="mt-3 text-sm font-medium text-foreground">{item.author}</div>
                  )}
                </article>
              ),
            }))}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
