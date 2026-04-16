import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import DetailDrawer from "@/components/DetailDrawer";
import { BookOpen, Globe2, Briefcase, GraduationCap, Languages, Laptop, ArrowRight } from "lucide-react";
import ieltsImg from "@/assets/ielts-prep.jpg";

const services = [
  {
    icon: Laptop,
    title: "IT & Skill Training",
    desc: "Industry-certified programs in web development, AI, data science, cybersecurity, and more.",
    color: "bg-blue-50 text-blue-600",
    details: "Our IT training covers Full Stack Development, AI & Machine Learning, Data Science, Digital Marketing, UI/UX Design, Cloud Computing, and Cybersecurity. All programs include hands-on projects and job placement support.",
  },
  {
    icon: Globe2,
    title: "Study Abroad Consultancy",
    desc: "Expert guidance for admissions to top universities in UK, Canada, Australia, and USA.",
    color: "bg-green-50 text-green-600",
    details: "We provide end-to-end support: university selection, application assistance, SOP writing, scholarship guidance, visa preparation, mock interviews, and pre-departure orientation.",
  },
  {
    icon: Languages,
    title: "IELTS Preparation",
    desc: "Comprehensive IELTS coaching with practice tests, mock exams, and band score improvement strategies.",
    color: "bg-purple-50 text-purple-600",
    details: "Our IELTS program covers all four modules — Listening, Reading, Writing, and Speaking. Expert British Council-trained instructors, weekly mock tests, and personalized feedback to help you achieve your target band score.",
  },
  {
    icon: GraduationCap,
    title: "NAVTTC Programs",
    desc: "Free government-funded vocational training programs in IT and technical skills.",
    color: "bg-emerald-50 text-emerald-600",
    details: "Government-funded training under NAVTTC covering web development, Python programming, e-commerce, freelancing, and more. 100% free with certification upon completion.",
  },
  {
    icon: Briefcase,
    title: "Career Counseling",
    desc: "Personalized career guidance and job placement assistance for students and professionals.",
    color: "bg-orange-50 text-orange-600",
    details: "One-on-one career counseling sessions, resume building workshops, interview preparation, and direct connections with hiring companies in Pakistan and abroad.",
  },
  {
    icon: BookOpen,
    title: "Corporate Trainings",
    desc: "Customized training programs for organizations looking to upskill their workforce.",
    color: "bg-pink-50 text-pink-600",
    details: "Tailored training solutions for businesses including team workshops, bootcamps, and certification programs in the latest technologies and management practices.",
  },
];

const ServicesSection = () => {
  const { ref, visible } = useScrollReveal();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<typeof services[0] | null>(null);

  const openDrawer = (s: typeof services[0]) => { setSelected(s); setDrawerOpen(true); };

  return (
    <>
      <section id="services" className="py-20 md:py-28 bg-section-alt">
        <div
          ref={ref}
          className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-14">
            <span className="section-label">Our Services</span>
            <h2 className="section-title mt-3">Comprehensive Education Solutions</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">From skill development to global education, we offer everything you need to succeed.</p>
          </div>

          {/* IELTS highlight banner */}
          <div className="premium-card overflow-hidden mb-10 group cursor-pointer" onClick={() => openDrawer(services[2])}>
            <div className="grid md:grid-cols-2 items-center">
              <div className="h-56 md:h-full overflow-hidden">
                <img src={ieltsImg} alt="IELTS preparation class" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={960} height={640} />
              </div>
              <div className="p-8">
                <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
                  <Languages className="w-3.5 h-3.5" /> IELTS Preparation
                </div>
                <h3 className="text-xl font-bold font-heading text-foreground mb-3">Achieve Your Target IELTS Band Score</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">Expert coaching, weekly mock tests, and personalized strategies to help you succeed in all four IELTS modules.</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="premium-card p-7 group cursor-pointer"
                onClick={() => openDrawer(s)}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${s.color.split(" ")[0]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <s.icon className={`w-6 h-6 ${s.color.split(" ")[1]}`} />
                </div>
                <h3 className="font-bold text-foreground font-heading text-lg mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selected?.title || "Service Details"}>
        {selected && (
          <div className="space-y-6">
            <div className={`w-16 h-16 rounded-2xl ${selected.color.split(" ")[0]} flex items-center justify-center`}>
              <selected.icon className={`w-8 h-8 ${selected.color.split(" ")[1]}`} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl text-foreground mb-2">{selected.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{selected.details}</p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">Key Benefits</h5>
              <ul className="space-y-2">
                {["Expert instructors with industry experience", "Hands-on practical approach", "Certification upon completion", "Career placement support", "Flexible scheduling options"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </DetailDrawer>
    </>
  );
};

export default ServicesSection;
