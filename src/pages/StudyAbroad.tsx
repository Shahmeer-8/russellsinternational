import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import StudyDestinations from "@/components/StudyDestinations";
import CTASection from "@/components/CTASection";
import { Award, FileCheck, GraduationCap, Plane } from "lucide-react";
import studyImg from "@/assets/study-abroad-clean.jpg";

const steps = [
  { icon: GraduationCap, title: "Profile Evaluation", desc: "Free counseling to assess your academic profile and goals." },
  { icon: FileCheck, title: "University Selection", desc: "Shortlist universities matching your profile, budget, and aspirations." },
  { icon: Award, title: "Application & SOP", desc: "Complete application support including SOPs, LORs, and documentation." },
  { icon: Plane, title: "Visa & Departure", desc: "Visa preparation, mock interviews, and pre-departure orientation." },
];

const scholarships = [
  { country: "🇬🇧 United Kingdom", items: ["Chevening", "Commonwealth", "GREAT Scholarships", "University-specific awards"] },
  { country: "🇨🇦 Canada", items: ["Vanier CGS", "Trudeau Foundation", "University entrance scholarships"] },
  { country: "🇦🇺 Australia", items: ["Australia Awards", "Destination Australia", "Research Training Program"] },
  { country: "🇺🇸 USA", items: ["Fulbright", "Hubert Humphrey", "University merit aid"] },
];

const StudyAbroad = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero
      eyebrow="Study Abroad"
      title="Your Pathway to Global Universities"
      description="End-to-end admissions and visa support for the UK, Canada, Australia, USA and beyond — with a 95%+ visa success rate."
      image={studyImg}
      crumbs={[{ label: "Home", to: "/" }, { label: "Study Abroad" }]}
    />

    <StudyDestinations />

    {/* Process */}
    <section className="py-20 md:py-28 bg-section-alt">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Our Process</span>
          <h2 className="section-title mt-3">From Inquiry to Departure</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">A clear 4-step roadmap to your global education journey.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="premium-card p-6 relative">
              <div className="absolute -top-3 -left-3 w-9 h-9 rounded-xl bg-accent text-accent-foreground font-heading font-bold flex items-center justify-center shadow-lg">
                {i + 1}
              </div>
              <s.icon className="w-8 h-8 text-primary mb-4 mt-2" />
              <h3 className="font-heading font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Scholarships & Requirements */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="section-label">Scholarships</span>
          <h2 className="section-title mt-3 mb-6">Funding Your Dreams</h2>
          <div className="space-y-4">
            {scholarships.map((s) => (
              <div key={s.country} className="premium-card p-5">
                <h3 className="font-heading font-bold text-foreground mb-3">{s.country}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <span key={i} className="text-xs bg-muted px-3 py-1.5 rounded-full text-foreground font-medium">{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="section-label">Requirements</span>
          <h2 className="section-title mt-3 mb-6">What You'll Need</h2>
          <div className="premium-card p-7">
            <ul className="space-y-3">
              {[
                "Academic transcripts & degree certificates",
                "Valid passport copy",
                "English proficiency (IELTS / TOEFL / PTE)",
                "Statement of Purpose (SOP)",
                "2–3 Letters of Recommendation",
                "Resume / CV",
                "Proof of financial support",
                "Updated portfolio (for design / arts programs)",
              ].map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
    <Footer />
  </div>
);

export default StudyAbroad;
