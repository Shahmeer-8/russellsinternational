import { useState, useEffect } from "react";
import { GraduationCap, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#why-us" },
  { label: "Programs", href: "#courses" },
  { label: "Study Abroad", href: "#destinations" },
  { label: "Stories", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
        : "bg-background/80 backdrop-blur-sm"
    }`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-lg text-foreground">
            Russell's <span className="text-gradient">International</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="hidden md:inline-flex btn-accent text-sm px-5 py-2.5">
          Start Your Journey
        </a>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-4 animate-fade-in">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="block mt-2 btn-accent text-sm text-center" onClick={() => setOpen(false)}>
            Start Your Journey
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
