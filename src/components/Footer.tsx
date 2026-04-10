import { GraduationCap } from "lucide-react";

const Footer = () => (
  <footer className="relative overflow-hidden">
    {/* Dark premium bg */}
    <div className="absolute inset-0 hero-bg" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    
    <div className="container mx-auto px-4 md:px-8 py-14 md:py-20 relative z-10">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/15">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-white">Russell's International</span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed">
            Empowering students with global education opportunities and industry-ready IT skills since 2014.
          </p>
        </div>

        {[
          { title: "Quick Links", links: ["About Us", "Courses", "Study Abroad", "Contact"] },
          { title: "Programs", links: ["Web Development", "AI & ML", "Digital Marketing", "Cybersecurity"] },
          { title: "Study Abroad", links: ["UK Universities", "Canada Programs", "Australia Options", "USA Admissions"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-heading font-bold text-sm mb-5 text-white/80">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-300">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
        <span>© 2026 Russell's International. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
