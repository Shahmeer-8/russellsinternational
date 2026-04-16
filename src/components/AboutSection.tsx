import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Target, Eye, Award, Users } from "lucide-react";
import aboutImg from "@/assets/about-team.jpg";

const milestones = [
  { icon: Award, value: "2014", label: "Founded" },
  { icon: Users, value: "5,000+", label: "Students" },
  { icon: Target, value: "50+", label: "Universities" },
  { icon: Eye, value: "10+", label: "Years" },
];

const AboutSection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="about" className="py-20 md:py-28">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img src={aboutImg} alt="Russell's International team" className="w-full h-auto object-cover" loading="lazy" width={960} height={640} />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground rounded-2xl p-5 shadow-lg hidden md:block">
              <div className="text-2xl font-extrabold font-heading">10+</div>
              <div className="text-xs font-medium opacity-80">Years of Excellence</div>
            </div>
          </div>

          <div>
            <span className="section-label">About Us</span>
            <h2 className="section-title mt-3 mb-5">Empowering Futures Since 2014</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Russell's International is a leading education consultancy and IT training institute based in Islamabad, Pakistan. We bridge the gap between ambition and achievement by providing world-class skill development programs and expert study abroad guidance.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our mission is to empower students with the skills, knowledge, and global exposure they need to build successful careers — whether through mastering in-demand technologies or pursuing education at top international universities.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {milestones.map((m) => (
                <div key={m.label} className="text-center p-4 rounded-xl bg-muted/50">
                  <m.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                  <div className="font-extrabold text-foreground font-heading text-lg">{m.value}</div>
                  <div className="text-xs text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
