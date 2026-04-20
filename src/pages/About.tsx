import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Target, Eye, Heart, Users, Award, GraduationCap } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";
import campusLife from "@/assets/campus-life.jpg";
import founderImg from "@/assets/founder-portrait.jpg";

const pillars = [
  {
    icon: Target,
    title: "Mission",
    body: "To deliver advanced educational facilities and skill-based programs that prepare students for global success and innovation-driven entrepreneurship.",
  },
  {
    icon: Eye,
    title: "Vision",
    body: "Creating an educational climate where students transform into productive, socially conscious, and culturally aware members of society.",
  },
  {
    icon: Heart,
    title: "Core Values",
    body: "Every lesson nurtures commitment, accessibility, and excellence — opening real-world doors that enable students to break out of poverty.",
  },
];

const team = [
  { name: "Dr. Zulfiqar Ahmad", role: "Advisory Board", note: "Ph.D. in Soil Science, ex-Asst. Professor IT-MO." },
  { name: "Dr. Iqbal", role: "Advisory Board", note: "Post-Doctoral in Educational Psychology, UK." },
  { name: "Dr. Noreen Zainab", role: "Advisory Board", note: "Ph.D. NUST — Image Processing & ML." },
  { name: "Barrister Sibt-e-Hassan", role: "Advisory Board", note: "Legal compliance & corporate counsel." },
  { name: "Aqsa Anwar", role: "Admissions Officer", note: "Leads admissions and student support." },
];

const About = () => {
  const intro = useScrollReveal();
  const founder = useScrollReveal();
  const pillarsR = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        eyebrow="About Us"
        title="Change Begins With One Dream"
        description="Russell's International is a premier education consultancy and IT training institute committed to bridging ambition with global opportunity."
        image={aboutHero}
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

      {/* Campus Life */}
      <section className="py-20 md:py-28">
        <div
          ref={intro.ref}
          className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${intro.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="section-label">Campus Life</span>
              <h2 className="section-title mt-3 mb-5">A Living, Learning Ecosystem</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Russell's International is excited to introduce a lively learning setting that sets a standard in the educational scene of Gajar City. This makes the time students in the city will encounter a mix of luxury and education aimed at answering tech academic excellence and personal development.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our advanced facilities boost technology, cozy and chic study spaces and various amenities to create an inspiring environment. This endeavor showcases our dedication to offering a rich experience with every aspect carefully designed to cater to the diverse needs of our students.
              </p>
              <a href="/#contact" className="btn-accent inline-flex">Contact Us</a>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img src={campusLife} alt="Russell's International Campus" loading="lazy" width={1200} height={800} className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-2xl p-5 shadow-lg hidden md:block">
                <div className="text-2xl font-extrabold font-heading">10+</div>
                <div className="text-xs font-medium opacity-90">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="py-20 md:py-28 bg-section-alt">
        <div
          ref={founder.ref}
          className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${founder.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="rounded-3xl overflow-hidden shadow-xl max-w-sm mx-auto">
                <img src={founderImg} alt="Faiz Rasul, Founder" loading="lazy" width={800} height={1000} className="w-full h-auto object-cover" />
              </div>
            </div>
            <div className="lg:col-span-3">
              <span className="section-label">Founder's Message</span>
              <h2 className="section-title mt-3 mb-5">Dear Students, Parents & Well-Wishers</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I am indeed delighted to extend warm greetings from the very bosom of my heart on the behalf of Russell's International. This institute has been founded on a commitment to delivering excellence in the work of service in terms of education. We believe in the transforming power of education in shaping vision and looking at the doors of equality.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                One of our core visions is that of an open and barrier-learning environment where boundaries are seen as opportunities. We house a state-of-the-art examination center for international choice and online courses — an evidence of our commitment to an educationally viable, administratively efficient, and technologically modern learning space.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Thank you for choosing Russell's International. Together, let's shape a brighter future through education.
              </p>
              <div className="border-l-4 border-accent pl-4">
                <div className="font-heading font-bold text-foreground">Faiz Rasul</div>
                <div className="text-sm text-muted-foreground">Founder, Russell's International</div>
                <div className="text-xs text-muted-foreground mt-0.5">Philanthropist · Entrepreneur · Educationist</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 md:py-28">
        <div
          ref={pillarsR.ref}
          className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${pillarsR.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-14">
            <span className="section-label">What Drives Us</span>
            <h2 className="section-title mt-3">Our Foundation</h2>
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

      {/* Team */}
      <section className="py-20 md:py-28 bg-section-alt">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="section-label">Our People</span>
            <h2 className="section-title mt-3">Core Team & Advisory Board</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              A group of accomplished individuals who form the backbone of our institution.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m) => (
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

      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
