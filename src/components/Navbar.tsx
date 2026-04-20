import { useState, useEffect } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Study Abroad", to: "/study-abroad" },
  { label: "Languages", to: "/languages" },
  { label: "Careers", to: "/careers" },
  { label: "Events", to: "/events" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) => location.pathname === to;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
        : "bg-background/80 backdrop-blur-sm"
    }`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-lg text-foreground">
            Russell's <span className="text-gradient">International</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`text-[13px] font-medium transition-colors ${
                isActive(l.to) ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link to="/#contact" className="hidden lg:inline-flex btn-accent text-sm px-5 py-2.5">
          Start Your Journey
        </Link>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border px-4 pb-4 animate-fade-in max-h-[70vh] overflow-y-auto">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`block py-3 text-sm font-medium ${
                isActive(l.to) ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/#contact" className="block mt-2 btn-accent text-sm text-center" onClick={() => setOpen(false)}>
            Start Your Journey
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
