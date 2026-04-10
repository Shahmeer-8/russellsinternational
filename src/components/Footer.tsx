import { GraduationCap } from "lucide-react";

const Footer = () => (
  <footer className="hero-bg text-primary-foreground">
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold">Russell's International</span>
          </div>
          <p className="text-sm text-primary-foreground/60 leading-relaxed">
            Empowering students with global education opportunities and industry-ready IT skills since 2014.
          </p>
        </div>

        {[
          { title: "Quick Links", links: ["About Us", "Courses", "Study Abroad", "Contact"] },
          { title: "Programs", links: ["Web Development", "AI & ML", "Digital Marketing", "Cybersecurity"] },
          { title: "Study Abroad", links: ["UK Universities", "Canada Programs", "Australia Options", "USA Admissions"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-heading font-bold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/40">
        <span>© 2026 Russell's International. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
