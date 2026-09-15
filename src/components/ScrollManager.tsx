import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Decides where the window sits after every navigation.
 *
 * Three buttons pointed at `/#contact` — the hero's "Free Consultation", the
 * header's "Start Your Journey" and the footer's "Contact" — and none of them
 * worked. React Router parses the hash but never scrolls to it, and the Navbar
 * was separately forcing the window to the top on every route change, so even a
 * browser that would have honoured the anchor was overruled.
 *
 * Both behaviours belong in one place: a hash scrolls to its section, anything
 * else goes to the top.
 *
 * Keyed on the whole location rather than the pathname, because clicking
 * `/#contact` while already on `/` leaves the pathname untouched — which is the
 * case that made the header button look completely dead on the home page.
 */
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    // The target section usually belongs to a route that has only just mounted,
    // and its content often arrives with a request after that, so the element is
    // rarely in the document on this tick. Retry over roughly a second and give
    // up quietly rather than leaving the reader somewhere arbitrary.
    let frame = 0;
    const started = performance.now();

    const findAndScroll = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (performance.now() - started < 1000) {
        frame = requestAnimationFrame(findAndScroll);
      }
    };

    frame = requestAnimationFrame(findAndScroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
};

export default ScrollManager;
