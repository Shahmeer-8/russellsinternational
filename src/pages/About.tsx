import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicPageHero from "@/components/DynamicPageHero";
import CTASection from "@/components/CTASection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageSections, useTeamMembers } from "@/hooks/api";
import { sectionText } from "@/lib/content";
import { Target, Eye, Heart, Users } from "lucide-react";

const pillarIcons = [Target, Eye, Heart];

const About = () => {
  const intro = useScrollReveal();
  const founder = useScrollReveal();
  const pillarsR = useScrollReveal();
  const { data: sectionData, isLoading: sectionsLoading } = usePageSections("about");
  const { data: teamData, isLoading: teamLoading } = useTeamMembers();
  const sections = sectionData?.data ?? {};
  const campus = sections.campus_life;
  const founderSection = sections.founder_message;
  const foundation = sections.foundation;
  const pillars = Object.entries(foundation?.items ?? {}).map(([title, body], index) => ({
    icon: pillarIcons[index % pillarIcons.length],
    title,
    body,
  }));
  const displayedTeam = (teamData?.data ?? []).map((member) => ({
    name: member.name,
    role: member.role,
    note: member.bio,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <DynamicPageHero
        page="about"
        fallback={{
          eyebrow: "",
          title: "",
          description: "",
          image: "",
          crumbs: [{ label: "Home", to: "/" }, { label: "About Us" }],
        }}
      />

      {sectionsLoading ? (
        <section className="py-20 md:py-28" aria-hidden="true">
          <div className="container mx-auto px-4 md:px-8">
            <div className="h-80 rounded-3xl bg-muted animate-pulse" />
          </div>
        </section>
      ) : campus && (
        <section className="py-20 md:py-28">
          <div
            ref={intro.ref}
            className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${intro.visible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="section-label">{sectionText(campus, "eyebrow", "")}</span>
                <h2 className="section-title mt-3 mb-5">{sectionText(campus, "title", "")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {sectionText(campus, "body", "")}
                </p>
                {sectionText(campus, "cta_url", "") && sectionText(campus, "cta_label", "") && (
                  <a href={sectionText(campus, "cta_url", "")} className="btn-accent inline-flex">
                    {sectionText(campus, "cta_label", "")}
                  </a>
                )}
              </div>
              {campus.image_url && (
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img src={campus.image_url} alt={sectionText(campus, "title", "")} loading="lazy" decoding="async" width={1200} height={800} className="w-full h-auto object-cover" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {founderSection && (
        <section className="py-20 md:py-28 bg-section-alt">
          <div
            ref={founder.ref}
            className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${founder.visible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-2">
                {founderSection.image_url && (
                  <div className="rounded-3xl overflow-hidden shadow-xl max-w-sm mx-auto">
                    <img src={founderSection.image_url} alt={sectionText(founderSection, "title", "")} loading="lazy" decoding="async" width={800} height={1000} className="w-full h-auto object-cover" />
                  </div>
                )}
              </div>
              <div className="lg:col-span-3">
                <span className="section-label">{sectionText(founderSection, "eyebrow", "")}</span>
                <h2 className="section-title mt-3 mb-5">{sectionText(founderSection, "title", "")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {sectionText(founderSection, "body", "")}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {foundation && pillars.length > 0 && (
        <section className="py-20 md:py-28">
          <div
            ref={pillarsR.ref}
            className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${pillarsR.visible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="text-center mb-14">
              <span className="section-label">{sectionText(foundation, "eyebrow", "")}</span>
              <h2 className="section-title mt-3">{sectionText(foundation, "title", "")}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((p) => (
                <div key={p.title} className="premium-card p-8 text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <p.icon className="w-6 h-6 text-primary group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {teamLoading ? (
        <section className="py-20 md:py-28 bg-section-alt" aria-hidden="true">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <div key={i} className="premium-card h-40 animate-pulse" />)}
            </div>
          </div>
        </section>
      ) : displayedTeam.length > 0 && (
        <section className="py-20 md:py-28 bg-section-alt">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-14">
              <span className="section-label">Our People</span>
              <h2 className="section-title mt-3">Core Team & Advisory Board</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedTeam.map((m) => (
                <div key={m.name} className="premium-card p-6 flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-foreground">{m.name}</div>
                    <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-1.5">{m.role}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{m.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
