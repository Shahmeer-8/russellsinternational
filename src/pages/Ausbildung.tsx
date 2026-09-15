import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import DynamicPageHero from "@/components/DynamicPageHero";
import CTASection from "@/components/CTASection";
import { usePageSections } from "@/hooks/api";
import { sectionText } from "@/lib/content";
import { parseLegalText } from "@/lib/legalText";
import { AUSBILDUNG } from "@/pages/ausbildungContent";

/**
 * The Ausbildung pathway, added because the navigation now offers it under Study
 * Abroad and a menu entry that leads nowhere is worse than no menu entry.
 *
 * The body is one editable field rather than a set of hand-built blocks. Nobody
 * here can write this page properly — what Russell's actually offers around
 * Ausbildung is the client's to state — so the page describes the pathway itself,
 * accurately and without claiming placements or partnerships, and hands the whole
 * text to the panel for them to replace.
 */
const Ausbildung = () => {
  const { data } = usePageSections("ausbildung");
  const section = data?.data?.overview;
  const blocks = parseLegalText(sectionText(section, "body", AUSBILDUNG.body));

  return (
    <div className="min-h-screen bg-page">
      <SiteHeader />
      <DynamicPageHero
        page="ausbildung"
        fallback={{
          eyebrow: AUSBILDUNG.eyebrow,
          title: AUSBILDUNG.title,
          description: AUSBILDUNG.description,
          image: "",
          crumbs: [
            { label: "Home", to: "/" },
            { label: "Study Abroad", to: "/study-abroad" },
            { label: "Ausbildung" },
          ],
        }}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-6">
            {blocks.map((block, i) => {
              if (block.kind === "heading") {
                return (
                  <h2
                    key={i}
                    className="pt-6 font-display text-2xl font-semibold tracking-[-0.01em] text-foreground first:pt-0"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.kind === "list") {
                return (
                  <ul key={i} className="list-disc space-y-2 pl-5 text-muted-foreground">
                    {block.items.map((listItem, j) => (
                      <li key={j} className="leading-7">
                        {listItem}
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={i} className="leading-7 text-muted-foreground">
                  {block.text}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Ausbildung;
