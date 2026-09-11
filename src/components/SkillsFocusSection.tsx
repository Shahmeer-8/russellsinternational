import { BadgeCheck, BookOpenCheck, Brain, Code, Database, MapPinned } from "lucide-react";
import { usePageSections } from "@/hooks/api";
import { sectionImage, sectionItems, sectionText } from "@/lib/content";
import type { SectionItem } from "@/lib/content";
import FocusSection from "@/components/FocusSection";
import ResponsiveCardRow from "@/components/ResponsiveCardRow";
import skillImg from "@/assets/skill-training.jpg";

const fallbackCourses: SectionItem[] = [
  { title: "Full Stack Web Development", meta: "6 months" },
  { title: "AI & Machine Learning", meta: "4 months" },
  { title: "Data Science & Analytics", meta: "5 months" },
];

/** Positional, not per-course: admins edit course titles freely, so an icon is
 *  tied to the slot rather than to any particular course name. */
const courseIcons = [Code, Brain, Database];

const SkillsFocusSection = () => {
  const { data } = usePageSections("home");
  const section = data?.data?.skills_focus;
  const courses = sectionItems(section, fallbackCourses, "course");

  return (
    <FocusSection
      tone="dark"
      eyebrow={sectionText(section, "eyebrow", "Skills Focus")}
      title={sectionText(
        section,
        "title",
        "Practical programs for job-ready IT skills.",
      )}
      intro={sectionText(
        section,
        "subtitle",
        "Hands-on IT programs built around real projects, so students finish with a portfolio and skills employers actually ask for.",
      )}
      image={sectionImage(section, skillImg)}
      imageAlt="Students learning practical technology skills"
      badge={section?.extra?.badge || "Skills focus"}
      badgeIcon={BookOpenCheck}
      footnote={section?.extra?.footnote || "Local training, global confidence"}
      footnoteIcon={MapPinned}
      ctaLabel={sectionText(section, "cta_label", "View Skill Programs")}
      ctaUrl={sectionText(section, "cta_url", "/skills")}
      imageSide="right"
    >
      <ResponsiveCardRow
        gridClassName="grid gap-3"
        items={courses.map((course, index) => {
          const Icon = courseIcons[index] || Code;

          return {
            key: course.title ?? "",
            node: (
              <div className="flex h-full items-center gap-3 rounded-2xl bg-primary-foreground/10 p-3.5 ring-1 ring-primary-foreground/15">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold leading-5">{course.title}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-primary-foreground/65">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {course.meta}
                  </div>
                </div>
              </div>
            ),
          };
        })}
      />
    </FocusSection>
  );
};

export default SkillsFocusSection;
