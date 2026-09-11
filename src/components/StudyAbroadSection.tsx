import { FileCheck2, GraduationCap, Landmark } from "lucide-react";
import { usePageSections } from "@/hooks/api";
import { sectionImage, sectionItems, sectionText } from "@/lib/content";
import type { SectionItem } from "@/lib/content";
import FocusSection from "@/components/FocusSection";
import ResponsiveCardRow from "@/components/ResponsiveCardRow";
import abroadImg from "@/assets/study-abroad-clean.jpg";

const fallbackCountries: SectionItem[] = [
  { code: "UK", name: "United Kingdom", meta: "40+ universities" },
  { code: "CA", name: "Canada", meta: "35+ universities" },
  { code: "AU", name: "Australia", meta: "30+ universities" },
];

const StudyAbroadSection = () => {
  const { data } = usePageSections("home");
  const section = data?.data?.study_abroad;
  const countries = sectionItems(section, fallbackCountries, "country");

  return (
    <FocusSection
      eyebrow={sectionText(section, "eyebrow", "Study Abroad")}
      title={sectionText(
        section,
        "title",
        "From country shortlisting to visa file guidance.",
      )}
      intro={sectionText(
        section,
        "subtitle",
        "Compare destinations, understand intakes and prepare a stronger application with counsellors who have placed students across the UK, Canada and Australia.",
      )}
      image={sectionImage(section, abroadImg)}
      imageAlt="Student on an international campus"
      badge={section?.extra?.badge || "Admissions support"}
      badgeIcon={FileCheck2}
      footnote={section?.extra?.footnote || "Counselling, admissions, visa support"}
      footnoteIcon={GraduationCap}
      ctaLabel={sectionText(section, "cta_label", "Explore Study Abroad")}
      ctaUrl={sectionText(section, "cta_url", "/study-abroad")}
      imageSide="left"
    >
      <ResponsiveCardRow
        gridClassName="grid gap-3 sm:grid-cols-3"
        items={countries.map((country) => ({
          key: country.name ?? country.code ?? "",
          node: (
            <div className="h-full rounded-2xl bg-background/70 p-3.5 ring-1 ring-border/60">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xs font-extrabold text-primary-foreground">
                {country.code || country.name?.slice(0, 2).toUpperCase()}
              </div>
              <div className="text-sm font-bold text-foreground">{country.name}</div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Landmark className="h-3.5 w-3.5" />
                {country.meta}
              </div>
            </div>
          ),
        }))}
      />
    </FocusSection>
  );
};

export default StudyAbroadSection;
