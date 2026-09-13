import { usePageSections } from "@/hooks/api";
import { sectionText } from "@/lib/content";
import AboutSection from "@/components/AboutSection";

const fallbackItems: Record<string, string> = {
  Mission: "To deliver skill-based programs that prepare students for global success.",
  Vision: "To create a learning climate where students become productive and socially conscious.",
  "Core Values": "Commitment, accessibility, and excellence in every learning journey.",
};

/**
 * Mission, vision and values.
 *
 * These were three identical centred cards, each with a circular icon badge that
 * grew on hover — the card kit that makes any page look generated, and the icons
 * said nothing the words did not. They are now hairline-separated rows: the term
 * set large on the left, the definition in a readable measure on the right, which
 * is how a statement of principles actually reads.
 *
 * The three are not a sequence, so they carry no numbering.
 */
const AboutFoundation = () => {
  const { data } = usePageSections("about");
  const section = data?.data?.foundation;

  const items =
    section?.items && !Array.isArray(section.items) ? section.items : fallbackItems;
  const entries = Object.entries(items);

  if (entries.length === 0) {
    return null;
  }

  return (
    <AboutSection label="What drives us">
      <h2 className="font-heading text-[clamp(1.6rem,2.6vw,2.25rem)] font-bold leading-tight tracking-[-0.02em] text-foreground">
        {sectionText(section, "title", "Our foundation")}
      </h2>

      {/* border-b closes the list: every row rules off its top, so without it the
          final entry trails away instead of the set reading as finished. */}
      <dl className="mt-10 border-b border-border">
        {entries.map(([term, definition]) => (
          <div
            key={term}
            className="grid gap-2 border-t border-border py-8 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-10"
          >
            <dt className="font-heading text-xl font-bold tracking-[-0.01em] text-foreground md:text-2xl">
              {term}
            </dt>
            <dd className="max-w-[62ch] text-base leading-[1.75] text-muted-foreground">
              {String(definition)}
            </dd>
          </div>
        ))}
      </dl>
    </AboutSection>
  );
};

export default AboutFoundation;
