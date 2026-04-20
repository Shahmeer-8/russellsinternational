import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const cols = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Skills", to: "/skills" },
      { label: "Contact", to: "/#contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Web Development", to: "/skills" },
      { label: "AI & ML", to: "/skills" },
      { label: "Languages", to: "/languages" },
      { label: "NAVTTC (Free)", to: "/skills" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Careers", to: "/careers" },
      { label: "Events & News", to: "/events" },
      { label: "Gallery", to: "/events" },
      { label: "Study Abroad", to: "/study-abroad" },
    ],
  },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="grid lg:grid-cols-12 gap-10">
        {/* Brand + contact */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold">Russell's International</span>
          </div>
          <p className="text-sm text-primary-foreground/50 leading-relaxed mb-5">
            Empowering students with global education opportunities and industry-ready IT skills since 2014.
          </p>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5 text-primary-foreground/70">
              <Phone className="w-4 h-4 text-accent" /> +92 311 1130 250
            </li>
            <li className="flex items-center gap-2.5 text-primary-foreground/70">
              <Mail className="w-4 h-4 text-accent" /> info@russellsinternational.com
            </li>
            <li className="flex items-start gap-2.5 text-primary-foreground/70">
              <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" /> Gajju Khan Medical College Rd, Gajar City, Pakistan
            </li>
          </ul>
          <div className="flex gap-2 mt-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-bold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="lg:col-span-4">
          <h4 className="font-heading font-bold text-sm mb-4">Find Us</h4>
          <div className="rounded-2xl overflow-hidden ring-1 ring-primary-foreground/10 h-56">
            <iframe
              title="Russell's International location"
              src="https://www.google.com/maps?q=Islamabad,Pakistan&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            />
          </div>
        </div>
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
