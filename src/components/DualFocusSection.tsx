import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Brain,
  Code,
  Database,
  FileCheck2,
  Globe2,
  GraduationCap,
  Landmark,
  MapPinned,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageSections } from "@/hooks/api";
import { sectionImage, sectionText } from "@/lib/content";
import type { PageSection } from "@/types/api";
import skillImg from "@/assets/skill-training.jpg";
import abroadImg from "@/assets/study-abroad-clean.jpg";

const fallbackCourses = [
  { icon: Code, title: "Full Stack Web Development", meta: "6 months" },
  { icon: Brain, title: "AI & Machine Learning", meta: "4 months" },
  { icon: Database, title: "Data Science & Analytics", meta: "5 months" },
];

const fallbackCountries = [
  { code: "UK", name: "United Kingdom", meta: "40+ universities" },
  { code: "CA", name: "Canada", meta: "35+ universities" },
  { code: "AU", name: "Australia", meta: "30+ universities" },
];

const courseIcons = [Code, Brain, Database];

function sectionItems(
  section: PageSection | undefined,
  fallback: Array<{ code?: string; title?: string; name?: string; meta: string }>,
  prefix: string,
) {
  const items = section?.items;
  if (!items) return fallback;

  const parsed = [1, 2, 3].map((index) => {
    const title = items[`${prefix}_${index}_title`];
    const name = items[`${prefix}_${index}_name`];
    const code = items[`${prefix}_${index}_code`];
    const meta = items[`${prefix}_${index}_meta`];

    if ((!title && !name) || !meta) return null;

    return { title, name, code, meta };
  });

  return parsed.filter(Boolean) as typeof fallback;
}

const DualFocusSection = () => {
  const { ref, visible } = useScrollReveal(0.08);
  const { data } = usePageSections("home");
  const sections = data?.data ?? {};
  const heading = sections.dual_focus;
  const study = sections.dual_focus_study;
  const skills = sections.dual_focus_skills;
  const countries = sectionItems(study, fallbackCountries, "country");
  const courses = sectionItems(skills, fallbackCourses, "course");

  return (
    <section className="bg-[hsl(var(--muted))] py-14 md:py-20">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 md:px-8 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="section-label">
              {sectionText(heading, "eyebrow", "Study abroad and skills")}
            </span>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold leading-tight text-foreground md:text-4xl lg:text-5xl">
              {sectionText(
                heading,
                "title",
                "Pick the pathway that fits your next move.",
              )}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {sectionText(
              heading,
              "body",
              "A quick homepage preview of Russell's two core directions: global admissions support for students planning overseas study, and practical IT training for students building career-ready skills.",
            )}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 xl:gap-6">
          <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--card-shadow-hover)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-primary sm:aspect-[16/8] lg:aspect-auto lg:h-64">
              <img
                src={sectionImage(study, abroadImg)}
                alt="Student on an international campus"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={960}
                height={640}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/35 to-transparent" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--background))] px-3 py-1.5 text-xs font-bold text-primary shadow-md sm:left-5 sm:top-5">
                <FileCheck2 className="h-3.5 w-3.5 text-accent" />
                {study?.extra?.badge || "Admissions support"}
              </div>
              <div className="absolute bottom-5 left-5 right-5 max-w-md text-primary-foreground">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Globe2 className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  {sectionText(study, "eyebrow", "Study Abroad")}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-extrabold leading-tight md:text-3xl">
                  {sectionText(
                    study,
                    "title",
                    "From country shortlisting to visa file guidance.",
                  )}
                </h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="text-sm leading-7 text-muted-foreground">
                {sectionText(
                  study,
                  "body",
                  "Help students compare destinations, understand intakes, prepare documents and move toward international applications with a clearer plan.",
                )}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {countries.map((country) => (
                  <div
                    key={country.name}
                    className="rounded-2xl bg-muted/75 p-3.5 ring-1 ring-border/60"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xs font-extrabold text-primary-foreground">
                      {country.code || country.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      {country.name}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Landmark className="h-3.5 w-3.5" />
                      {country.meta}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to={sectionText(study, "cta_url", "/study-abroad")}
                  className="btn-primary inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm sm:w-fit"
                >
                  {sectionText(study, "cta_label", "Explore Study Abroad")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground sm:justify-start">
                  <GraduationCap className="h-4 w-4 text-accent" />
                  {study?.extra?.footnote || "Counselling, admissions, visa support"}
                </div>
              </div>
            </div>
          </article>

          <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary bg-primary text-primary-foreground shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--card-shadow-hover)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-primary sm:aspect-[16/8] lg:aspect-auto lg:h-64">
              <img
                src={sectionImage(skills, skillImg)}
                alt="Students learning practical technology skills"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={960}
                height={640}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/10" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--background))] px-3 py-1.5 text-xs font-bold text-primary shadow-md sm:left-5 sm:top-5">
                <BookOpenCheck className="h-3.5 w-3.5 text-accent" />
                {skills?.extra?.badge || "Skills focus"}
              </div>
              <div className="absolute bottom-5 left-5 right-5 max-w-md">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Code className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  {sectionText(skills, "eyebrow", "Skills Training")}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-extrabold leading-tight md:text-3xl">
                  {sectionText(
                    skills,
                    "title",
                    "Practical programs for job-ready IT skills.",
                  )}
                </h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="text-sm leading-7 text-primary-foreground/75">
                {sectionText(
                  skills,
                  "body",
                  "A focused training preview for students who want hands-on tech learning, portfolio work and marketable skills without searching through the whole site first.",
                )}
              </p>

              <div className="mt-5 grid gap-3">
                {courses.map((course, index) => {
                  const Icon = courseIcons[index] || Code;
                  return (
                  <div
                    key={course.title}
                    className="flex items-center gap-3 rounded-2xl bg-primary-foreground/10 p-3.5 ring-1 ring-primary-foreground/15"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
                      <Icon className="h-4.5 w-4.5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold leading-5">
                        {course.title}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-primary-foreground/65">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {course.meta}
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to={sectionText(skills, "cta_url", "/skills")}
                  className="btn-accent inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm sm:w-fit"
                >
                  {sectionText(skills, "cta_label", "View Skill Programs")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-primary-foreground/70 sm:justify-start">
                  <MapPinned className="h-4 w-4 text-accent" />
                  {skills?.extra?.footnote || "Local training, global confidence"}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default DualFocusSection;
