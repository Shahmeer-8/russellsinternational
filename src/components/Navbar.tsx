import { useState, useEffect } from "react";
import { GraduationCap, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#why-us" },
  { label: "Courses", href: "#courses" },
  { label: "Study Abroad", href: "#destinations" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-background/90 backdrop-blur-2xl border-b border-border/50 shadow-sm"
        : "bg-transparent"
    }`}>
      <div className="container mx-auto flex items-center justify-between h-18 px-4 md:px-8 py-3">
        <a href="#" className="flex items-center gap-2.5">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            scrolled ? "hero-bg" : "bg-white/10 backdrop-blur-xl border border-white/20"
          }`}>
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className={`font-heading font-bold text-lg transition-colors duration-300 ${
            scrolled ? "text-foreground" : "text-white"
          }`}>
            Russell's <span className="text-gradient">International</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="hidden md:inline-flex btn-accent text-sm">
          Apply Now
        </a>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X className={`w-5 h-5 ${scrolled ? "text-foreground" : "text-white"}`} />
          ) : (
            <Menu className={`w-5 h-5 ${scrolled ? "text-foreground" : "text-white"}`} />
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-border px-4 pb-4 animate-fade-in">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="block mt-2 btn-accent text-sm text-center">
            Apply Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
