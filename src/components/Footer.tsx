import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const cols = [
  { title: "Quick Links", links: [
    { label: "Home", to: "/" },
    { label: "Skills", to: "/skills" },
    { label: "Study Abroad", to: "/study-abroad" },
    { label: "Contact", to: "/#contact" },
  ]},
  { title: "Programs", links: [
    { label: "Web Development", to: "/skills" },
    { label: "AI & ML", to: "/skills" },
    { label: "Languages", to: "/languages" },
    { label: "NAVTTC (Free)", to: "/skills" },
  ]},
  { title: "More", links: [
    { label: "Careers", to: "/careers" },
    { label: "Events & News", to: "/events" },
    { label: "Gallery", to: "/events" },
    { label: "About", to: "/#about" },
  ]},
];

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold">Russell's International</span>
          </div>
          <p className="text-sm text-primary-foreground/40 leading-relaxed">
            Empowering students with global education opportunities and industry-ready IT skills since 2014.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="font-heading font-bold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-primary-foreground/40 hover:text-primary-foreground transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/30">
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
