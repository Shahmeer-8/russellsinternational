import { Link } from "react-router-dom";
import { usePageSections, useStats } from "@/hooks/api";
import { sectionImage, sectionText } from "@/lib/content";
import AboutSection from "@/components/AboutSection";
import campusLifeImg from "@/assets/campus-life.jpg";

/**
 * The page's one bold moment: a navy field carrying the statement of what the
 * organisation does, and immediately under it the figures that back it up.
 *
 * Parents are the ones signing the cheque, and the old page gave them nothing
 * verifiable — a headline about dreams and a photo in a rounded box. The numbers
 * already existed on the home page; they do far more work here. They are set as a
 * hairline-separated row rather than tinted cards so they read as a record, not
 * as decoration.
 */
const AboutStatement = () => {
  const { data } = usePageSections("about");
  const { data: statsData } = useStats();

  const section = data?.data?.campus_life;
  const stats = statsData?.data ?? [];
  const ctaLabel = sectionText(section, "cta_label", "");
  const ctaUrl = sectionText(section, "cta_url", "");
  const image = sectionImage(section, campusLifeImg);

  return (
    <AboutSection tone="ink" label="What we do">
      <h2 className="max-w-[18ch] font-display text-[clamp(2.25rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
        {sectionText(section, "title", "A living, learning ecosystem")}
      </h2>

      <p className="mt-6 max-w-[62ch] text-base leading-[1.75] text-primary-foreground/75 md:text-[17px]">
        {sectionText(
          section,
          "body",
          "A modern learning environment with training labs, counselling spaces and student support facilities.",
        )}
      </p>

      {ctaLabel && ctaUrl && (
        <Link
          to={ctaUrl}
          className="mt-7 inline-block border-b-2 border-accent pb-1 text-base font-semibold text-primary-foreground transition-colors hover:text-accent"
        >
          {ctaLabel}
        </Link>
      )}

      {stats.length > 0 && (
        <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-primary-foreground/15 pt-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id}>
              <dt className="font-heading text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold leading-none tracking-[-0.02em] tabular-nums">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-primary-foreground/60">{stat.label}</dd>
            </div>
          ))}
        </dl>
      )}

      {image && (
        <div className="mt-14 overflow-hidden rounded-sm">
          <img
            src={image}
            alt={sectionText(section, "title", "A living, learning ecosystem")}
            className="aspect-[16/9] w-full object-cover md:aspect-[21/9]"
            loading="lazy"
            decoding="async"
            width={1600}
            height={686}
          />
        </div>
      )}
    </AboutSection>
  );
};

export default AboutStatement;
