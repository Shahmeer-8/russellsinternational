import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNavigation, useSettings } from "@/hooks/api";
import type { NavigationItem } from "@/types/api";
import { badgeClass, isExternalUrl } from "@/lib/navigation";
import NavDropdown from "@/components/NavDropdown";
import russellsEmblem from "@/assets/russells-logo-emblem.png";
import russellsWordmark from "@/assets/russells-logo-wordmark.png";

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
  // Part of the mark, so it has a default; editable in case the company line changes.
  const tagline = settings.site_tagline || "Knowledge, Skills, Employment";

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
      : `inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium transition-colors ${isActive(item.url) ? "text-accent" : "text-muted-foreground hover:text-foreground"}`;

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
        {/*
         * The lockup is assembled rather than one flat image, because the tagline
         * cannot be read otherwise.
         *
         * In the artwork the tagline is 14px of a 163px-tall file — a ratio of
         * 0.086 — so at the 64px the header can spare it renders about 5.5px and
         * reads as a grey smudge. Measured against the source, it only becomes
         * legible once the whole logo is around 96px tall, which would cost a
         * 136px header on every page.
         *
         * So the emblem and wordmark are the original artwork, cropped, and the
         * tagline is live text at 11px: crisp at any size and on any screen, and
         * the header stays the height it was.
         */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={siteName}>
          <img
            src={russellsEmblem}
            alt=""
            className="h-11 w-11 shrink-0 lg:h-[3.25rem] lg:w-[3.25rem]"
            width={302}
            height={302}
            fetchPriority="high"
          />
          <span className="flex flex-col">
            <img
              src={russellsWordmark}
              alt=""
              className="h-[1.9rem] w-auto lg:h-[2.15rem]"
              width={624}
              height={204}
              fetchPriority="high"
            />
            {/* Rules either side, as in the artwork. aria-hidden because the link
                already carries the company name. */}
            <span className="mt-1 hidden items-center gap-1.5 sm:flex" aria-hidden="true">
              <span className="h-px w-3 bg-accent" />
              <span className="whitespace-nowrap text-[10px] font-semibold tracking-[0.02em] text-muted-foreground lg:text-[11px]">
                {tagline}
              </span>
              <span className="h-px w-3 bg-accent" />
            </span>
          </span>
          <span className="sr-only">{siteName}</span>
        </Link>

        {/* Centred in the space between the logo and the button, rather than
            pushed against the button by justify-between — with the wider logo the
            links had drifted right and sat unevenly under it. */}
        <div className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-7">
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
