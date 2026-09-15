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

    /*
     * The target section usually belongs to a route that has only just mounted,
     * and its content arrives with a request after that, so the element is rarely
     * in the document on this tick — hence the wait for it to appear.
     *
     * Then it has to be followed. Scrolling once is not enough on a long page:
     * everything above the target is still loading its images and growing, so the
     * section slides further down after the scroll lands. Going to /#contact from
     * a programme panel put the reader roughly 1,200px above the form by the time
     * the page settled. So the position is re-checked until it stops moving.
     */
    let frame = 0;
    const started = performance.now();
    const APPEAR_TIMEOUT_MS = 2000;
    const SETTLE_TIMEOUT_MS = 4000;
    const DRIFT_TOLERANCE_PX = 8;

    let lastOffset: number | null = null;
    let stableFrames = 0;

    const offsetOf = (el: Element) => Math.round(el.getBoundingClientRect().top + window.scrollY);

    const follow = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      const elapsed = performance.now() - started;

      if (!target) {
        if (elapsed < APPEAR_TIMEOUT_MS) frame = requestAnimationFrame(follow);
        return;
      }

      const offset = offsetOf(target);

      if (lastOffset === null || Math.abs(offset - lastOffset) > DRIFT_TOLERANCE_PX) {
        // First sight of it, or the page moved it: (re)aim at where it is now.
        target.scrollIntoView({ behavior: lastOffset === null ? "smooth" : "auto", block: "start" });
        lastOffset = offset;
        stableFrames = 0;
      } else {
        stableFrames += 1;
      }

      // Two consecutive steady frames is enough to call the layout settled.
      if (stableFrames < 2 && elapsed < SETTLE_TIMEOUT_MS) {
        frame = requestAnimationFrame(follow);
      }
    };

    frame = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
};

export default ScrollManager;
