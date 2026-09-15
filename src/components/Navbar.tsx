import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNavigation, useSettings } from "@/hooks/api";
import type { NavigationItem } from "@/types/api";
import { badgeClass, isExternalUrl } from "@/lib/navigation";
import NavDropdown from "@/components/NavDropdown";
import russellsLogo from "@/assets/russells-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: navigationData, isLoading: navigationLoading } = useNavigation();
  const { data: settingsData } = useSettings();
  const navLinks = navigationData?.data.header ?? [];
  const settings = settingsData?.data ?? {};
  const siteName = settings.site_name ?? "Russell's International";
  // The header button is on every page and was the one piece of nav the owner
  // could not touch — the links beside it are already admin-managed.
  const ctaLabel = settings.nav_cta_label || "Start Your Journey";
  const ctaUrl = settings.nav_cta_url || "/#contact";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Where the window lands after a navigation is ScrollManager's job — forcing
  // the top from here overrode every `#anchor` link on the site.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) => !isExternalUrl(to) && location.pathname === to;

  const renderLink = (item: NavigationItem, mobile = false) => {
    const content = (
      <>
        <span>{item.label}</span>
        {item.badge_label && <span className={badgeClass(item)}>{item.badge_label}</span>}
      </>
    );
    const className = mobile
      ? `flex items-center gap-2 py-3 text-sm font-medium ${isActive(item.url) ? "text-accent" : "text-muted-foreground hover:text-foreground"}`
      : `inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors ${isActive(item.url) ? "text-accent" : "text-muted-foreground hover:text-foreground"}`;

    if (isExternalUrl(item.url)) {
      return (
        <a key={item.id} href={item.url} target={item.target} rel={item.target === "_blank" ? "noreferrer" : undefined} className={className}>
          {content}
        </a>
      );
    }

    return (
      <Link key={item.id} to={item.url} className={className} onClick={() => mobile && setOpen(false)}>
        {content}
      </Link>
    );
  };

  return (
    <nav className={`transition-all duration-300 ${
      scrolled
        ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
        : "bg-background/80 backdrop-blur-sm"
    }`}>
      <div className="container mx-auto flex items-center justify-between gap-6 h-20 px-4 md:px-8">
        {/* The logo was 48px tall in a 64px bar, which squeezed the "Knowledge,
            Skills, Employment" line under the wordmark down to a grey smudge. The
            bar is 80px now and the mark fills it, so the tagline is legible —
            which is the whole point of having one. `shrink-0` keeps it at that
            size instead of letting the nav row squeeze it on a narrow laptop. */}
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src={russellsLogo}
            alt={siteName}
            className="h-16 w-48 object-contain object-left md:w-56"
            width={483}
            height={163}
            fetchPriority="high"
          />
          <span className="sr-only">
            {siteName}
          </span>
        </Link>

        {/* Centred in the space between the logo and the button, rather than
            pushed against the button by justify-between — with the wider logo the
            links had drifted right and sat unevenly under it. */}
        <div className="hidden flex-1 items-center justify-center gap-7 lg:flex">
          {navigationLoading ? (
            <div className="h-4 w-96 rounded bg-muted animate-pulse" />
          ) : (
            navLinks.map((item) =>
              item.children?.length ? (
                <NavDropdown
                  key={item.id}
                  item={item}
                  renderLink={renderLink}
                  isActive={isActive}
                />
              ) : (
                renderLink(item)
              ),
            )
          )}
        </div>

        <Link to={ctaUrl} className="hidden shrink-0 lg:inline-flex btn-accent text-sm px-5 py-2.5">
          {ctaLabel}
        </Link>

        <button
          className="lg:hidden min-w-11 min-h-11 flex items-center justify-center -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border px-4 pb-4 animate-fade-in max-h-[70vh] overflow-y-auto">
          {/* No dropdowns on a phone — a submenu inside an already-scrolling panel
              is one tap too many. The parent and its children are listed together,
              the children indented under it. */}
          {navLinks.map((item) => (
            <div key={item.id}>
              {renderLink(item, true)}
              {item.children?.length ? (
                <div className="ml-4 border-l border-border pl-3">
                  {item.children.map((child) => renderLink(child, true))}
                </div>
              ) : null}
            </div>
          ))}
          <Link to={ctaUrl} className="block mt-2 btn-accent text-sm text-center" onClick={() => setOpen(false)}>
            {ctaLabel}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
