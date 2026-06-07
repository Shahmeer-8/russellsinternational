import { useMemo, useState } from "react";
import type { ElementType } from "react";
import { ArrowRight, Award, BookOpenText, Clock, Languages, MessageCircle, ScrollText } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import DetailDrawer from "@/components/DetailDrawer";
import { useLanguagePrograms } from "@/hooks/api";
import type { LanguageProgram } from "@/types/api";

type LanguageGroupKey = "english" | "german" | "korean";

type LanguageCard = {
  id: string;
  group: LanguageGroupKey;
  code: string;
  icon: ElementType;
  title: string;
  duration: string;
  badge: string;
  description: string;
  benefits: string[];
  color: string;
};

const GROUPS: Array<{
  key: LanguageGroupKey;
  label: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  icon: ElementType;
}> = [
  {
    key: "english",
    label: "English Tests",
    shortLabel: "English",
    title: "English Test Preparation",
    subtitle: "IELTS, PTE, LanguageCert and university-ready English coaching.",
    icon: Languages,
  },
  {
    key: "german",
    label: "German Tests",
    shortLabel: "German",
    title: "German Language & Exams",
    subtitle: "A1 to B2 pathways plus Goethe, TestDaF and telc exam readiness.",
    icon: BookOpenText,
  },
  {
    key: "korean",
    label: "Korean Tests",
    shortLabel: "Korean",
    title: "Korean Language & EPS",
    subtitle: "TOPIK, EPS-TOPIK and practical Korean for study or work.",
    icon: MessageCircle,
  },
];

const DEFAULT_PROGRAMS: LanguageCard[] = [
  {
    id: "english-ielts",
    group: "english",
    code: "english",
    icon: Languages,
    title: "IELTS Preparation",
    duration: "8 Weeks",
    badge: "Most Popular",
    description: "Complete coaching for listening, reading, writing and speaking with weekly mock tests.",
    benefits: ["Band score strategy", "Writing task feedback", "Speaking interview practice", "Full-length mock exams"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "english-pte",
    group: "english",
    code: "english",
    icon: ScrollText,
    title: "PTE Academic",
    duration: "6 Weeks",
    badge: "Fast Track",
    description: "Computer-based practice focused on scoring patterns, fluency, pronunciation and time control.",
    benefits: ["AI-scored practice", "Template drills", "Speaking fluency sessions", "Target-score roadmap"],
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    id: "english-languagecert",
    group: "english",
    code: "english",
    icon: Award,
    title: "LanguageCert",
    duration: "6 Weeks",
    badge: "Visa Ready",
    description: "Preparation for LanguageCert ESOL and SELT-style assessment routes.",
    benefits: ["Exam format training", "Grammar refreshers", "Writing correction", "Interview-style speaking"],
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    id: "german-goethe",
    group: "german",
    code: "german",
    icon: BookOpenText,
    title: "Goethe A1-B2",
    duration: "12 Weeks per level",
    badge: "Visa Ready",
    description: "Goethe-aligned German classes for study, Ausbildung, family reunion and work pathways.",
    benefits: ["A1 to B2 levels", "Grammar and vocabulary labs", "Model papers", "Conversation practice"],
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "german-testdaf",
    group: "german",
    code: "german",
    icon: ScrollText,
    title: "TestDaF Preparation",
    duration: "8 Weeks",
    badge: "University Track",
    description: "Academic German preparation for students targeting German university admission.",
    benefits: ["Reading and listening drills", "Academic writing", "Speaking simulations", "Timed practice tests"],
    color: "bg-red-50 text-red-600",
  },
  {
    id: "german-telc",
    group: "german",
    code: "german",
    icon: Award,
    title: "telc German",
    duration: "8 Weeks",
    badge: "Exam Ready",
    description: "Structured telc preparation for everyday, professional and visa-focused German exams.",
    benefits: ["Exam sections breakdown", "Writing samples", "Pair speaking practice", "Level assessment"],
    color: "bg-yellow-50 text-yellow-700",
  },
  {
    id: "korean-topik",
    group: "korean",
    code: "korean",
    icon: MessageCircle,
    title: "TOPIK Preparation",
    duration: "10 Weeks",
    badge: "Study Track",
    description: "From Hangul foundations to TOPIK I and II preparation for Korean study pathways.",
    benefits: ["Hangul mastery", "Vocabulary sets", "Reading practice", "Mock TOPIK papers"],
    color: "bg-rose-50 text-rose-600",
  },
  {
    id: "korean-eps",
    group: "korean",
    code: "korean",
    icon: Award,
    title: "EPS-TOPIK",
    duration: "8 Weeks",
    badge: "EPS Ready",
    description: "Work-route Korean preparation with practical vocabulary and EPS-style question practice.",
    benefits: ["Workplace vocabulary", "Listening drills", "EPS model tests", "Application guidance"],
    color: "bg-emerald-50 text-emerald-600",
  },
];

const normalizeGroup = (code: string): LanguageGroupKey => {
  const normalized = code.toLowerCase();

  if (["ielts", "pte", "toefl", "languagecert", "english"].includes(normalized)) {
    return "english";
  }

  if (normalized.includes("german") || ["goethe", "testdaf", "telc"].includes(normalized)) {
    return "german";
  }

  return "korean";
};

const mapProgram = (program: LanguageProgram): LanguageCard => ({
  id: String(program.id),
  group: normalizeGroup(program.language_code),
  code: program.language_code,
  icon: normalizeGroup(program.language_code) === "english"
    ? Languages
    : normalizeGroup(program.language_code) === "german"
      ? BookOpenText
      : MessageCircle,
  title: program.title,
  duration: program.duration,
  badge: program.badge,
  description: program.description,
  benefits: program.benefits ?? [],
  color: program.color_class ?? "bg-blue-50 text-blue-600",
});

const LanguagesSection = () => {
  const { ref, visible } = useScrollReveal();
  const [tab, setTab] = useState<LanguageGroupKey>("english");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<LanguageCard | null>(null);
  const { data, isLoading } = useLanguagePrograms();

  const programs = useMemo(() => {
    const apiPrograms = (data?.data ?? []).map(mapProgram);
    return apiPrograms.length > 0 ? apiPrograms : DEFAULT_PROGRAMS;
  }, [data?.data]);

  const activeGroup = GROUPS.find((group) => group.key === tab) ?? GROUPS[0];
  const activePrograms = programs.filter((program) => program.group === tab);
  const cards = activePrograms.length > 0 ? activePrograms : DEFAULT_PROGRAMS.filter((program) => program.group === tab);
  const ActiveIcon = activeGroup.icon;

  return (
    <>
      <section className="py-20 md:py-28">
        <div
          ref={ref}
          className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="text-center mb-10">
            <span className="section-label">Language Programs</span>
            <h2 className="section-title mt-3">Speak the World</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Exam-focused language training for study abroad, visa pathways, work routes and global careers.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="grid grid-cols-3 w-full max-w-xl bg-muted rounded-2xl p-1.5 gap-1">
              {GROUPS.map((group) => {
                const Icon = group.icon;
                const active = tab === group.key;

                return (
                  <button
                    key={group.key}
                    type="button"
                    onClick={() => setTab(group.key)}
                    className={`min-h-12 rounded-xl px-2 sm:px-5 text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      active ? "bg-background text-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="hidden sm:inline">{group.label}</span>
                    <span className="sm:hidden">{group.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent mb-2">
                <ActiveIcon className="w-4 h-4" />
                {activeGroup.shortLabel}
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">{activeGroup.title}</h3>
              <p className="text-muted-foreground mt-2 max-w-2xl">{activeGroup.subtitle}</p>
            </div>
            <div className="text-sm font-semibold text-muted-foreground">
              {cards.length} {cards.length === 1 ? "program" : "programs"}
            </div>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="premium-card p-6 h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((program) => (
                <div
                  key={program.id}
                  className="premium-card p-6 group cursor-pointer"
                  onClick={() => {
                    setSelected(program);
                    setDrawerOpen(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-5 gap-4">
                    <div className={`w-12 h-12 rounded-xl ${program.color.split(" ")[0]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <program.icon className={`w-6 h-6 ${program.color.split(" ")[1] ?? "text-blue-600"}`} />
                    </div>
                    {program.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent/10 text-accent text-right">
                        {program.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-foreground font-heading text-lg mb-2 group-hover:text-accent transition-colors">
                    {program.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {program.duration}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{program.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selected?.title || "Language Program"}>
        {selected && (
          <div className="space-y-6">
            <div className={`w-16 h-16 rounded-2xl ${selected.color.split(" ")[0]} flex items-center justify-center`}>
              <selected.icon className={`w-8 h-8 ${selected.color.split(" ")[1] ?? "text-blue-600"}`} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl text-foreground mb-2">{selected.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{selected.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="text-xs text-muted-foreground mb-1">Duration</div>
                <div className="font-semibold text-foreground text-sm">{selected.duration}</div>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="text-xs text-muted-foreground mb-1">Certification</div>
                <div className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-accent" /> {selected.badge}
                </div>
              </div>
            </div>
            {selected.benefits.length > 0 && (
              <div>
                <h5 className="font-semibold text-foreground mb-3">What's Included</h5>
                <ul className="space-y-2">
                  {selected.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DetailDrawer>
    </>
  );
};

export default LanguagesSection;
