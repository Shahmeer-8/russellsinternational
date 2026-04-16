import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Users, Calendar, Heart, MessageCircle, ArrowRight } from "lucide-react";
import socialImg from "@/assets/social-club.jpg";

const activities = [
  { icon: Calendar, title: "Monthly Meetups", desc: "Networking events with alumni, industry leaders, and fellow students." },
  { icon: Users, title: "Study Groups", desc: "Peer-led study sessions for IELTS, coding bootcamps, and exam prep." },
  { icon: Heart, title: "Community Support", desc: "Mentorship programs connecting new students with experienced alumni." },
  { icon: MessageCircle, title: "Online Forum", desc: "Active WhatsApp and Discord communities for discussions and help." },
];

const SocialClubSection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="community" className="py-20 md:py-28 bg-section-alt">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="section-label">Community & Social Club</span>
            <h2 className="section-title mt-3 mb-5">More Than Just Learning</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Join a vibrant community of learners, achievers, and global thinkers. Our social club connects students through events, mentorship, and shared experiences that go beyond the classroom.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {activities.map((a) => (
                <div key={a.title} className="flex gap-3 p-4 rounded-xl bg-background border border-border hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <a.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-0.5">{a.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-accent inline-flex items-center gap-2 mt-8 text-sm px-6 py-3 group">
              Join the Community <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img src={socialImg} alt="Students at a social event" className="w-full h-auto object-cover" loading="lazy" width={960} height={640} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialClubSection;
