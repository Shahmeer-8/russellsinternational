import { usePageSections } from "@/hooks/api";
import { sectionImage, sectionText } from "@/lib/content";
import AboutSection from "@/components/AboutSection";
import founderPortraitImg from "@/assets/founder-portrait.jpg";

/**
 * The founder's message.
 *
 * This was a large portrait on the left and two lines of text on the right, which
 * left a third of the screen empty and made a stock headshot the most prominent
 * thing on the page. Inverted here: the message is set large as the thing you
 * actually read, and the portrait drops to a small credit beside the name — the
 * scale a signature deserves. The empty space goes with it.
 */
const AboutFounder = () => {
  const { data } = usePageSections("about");
  const section = data?.data?.founder_message;

  const portrait = sectionImage(section, founderPortraitImg);
  const name = sectionText(section, "title", "Dear students, parents and well-wishers");

  return (
    <AboutSection tone="mist" label="From the founder">
      <blockquote className="max-w-[24ch] font-heading text-[clamp(1.75rem,3.4vw,2.85rem)] font-bold leading-[1.18] tracking-[-0.025em] text-foreground">
        {sectionText(
          section,
          "body",
          "Together, we shape brighter futures through education, skills, and global opportunity.",
        )}
      </blockquote>

      <figcaption className="mt-10 flex items-center gap-4 border-t border-border pt-6">
        {portrait && (
          <img
            src={portrait}
            alt={name}
            className="h-14 w-14 shrink-0 rounded-full object-cover object-top"
            loading="lazy"
            decoding="async"
            width={112}
            height={112}
          />
        )}
        <div className="min-w-0">
          <div className="font-semibold text-foreground">{name}</div>
          <div className="text-sm text-muted-foreground">
            {sectionText(section, "eyebrow", "Founder message")}
          </div>
        </div>
      </figcaption>
    </AboutSection>
  );
};

export default AboutFounder;
