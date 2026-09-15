import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { usePageSections } from "@/hooks/api";
import { sectionText } from "@/lib/content";
import { parseLegalText } from "@/lib/legalText";

interface LegalProps {
  /** Page slug in `page_sections` — "privacy" or "terms". */
  page: string;
  fallback: { eyebrow: string; title: string; intro: string; body: string };
}

/**
 * The shell both legal documents share.
 *
 * The footer has always linked to a Privacy Policy and Terms of Service; both
 * links pointed at "#", so the pages a visitor is told exist did not. These are
 * plain reading pages — no hero image, no call to action — because someone who
 * opens one is checking a fact, not being sold to.
 *
 * The whole document lives in the section's `body` field so the owner can revise
 * it in the panel without a deploy, which matters for a document that has to stay
 * accurate.
 */
const Legal = ({ page, fallback }: LegalProps) => {
  const { data } = usePageSections(page);
  const section = data?.data?.document;

  const title = sectionText(section, "title", fallback.title);
  const blocks = parseLegalText(sectionText(section, "body", fallback.body));

  return (
    <div className="min-h-screen bg-page">
      <SiteHeader />

      <main className="pt-header">
        <div className="container mx-auto px-4 py-16 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent">
              {sectionText(section, "eyebrow", fallback.eyebrow)}
            </p>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-foreground">
              {title}
            </h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              {sectionText(section, "subtitle", fallback.intro)}
            </p>

            <div className="mt-12 space-y-6">
              {blocks.map((block, i) => {
                if (block.kind === "heading") {
                  return (
                    <h2
                      key={i}
                      className="pt-6 font-heading text-xl font-bold text-foreground first:pt-0"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.kind === "list") {
                  return (
                    <ul key={i} className="list-disc space-y-2 pl-5 text-muted-foreground">
                      {block.items.map((item, j) => (
                        <li key={j} className="leading-7">
                          {item}
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
