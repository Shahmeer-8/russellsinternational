import { useCallback, useEffect, useRef, useState } from "react";
import { formatStatValue, parseStatValue } from "@/lib/statValue";

/** Ease-out: fast off the mark, settling gently on the final figure. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts a stat up from zero the first time it scrolls into view.
 *
 * Driven by requestAnimationFrame against a real clock rather than a fixed step,
 * so the count takes the same time on a slow device as a fast one. It runs once —
 * a figure that re-counts every time it scrolls past is a distraction, not a
 * flourish.
 *
 * Anyone who has asked for reduced motion, and any value with no number in it,
 * gets the final text immediately.
 */
export function useCountUp(raw: string, durationMs = 1600) {
  const parsed = parseStatValue(raw);
  const [display, setDisplay] = useState(() => (parsed ? formatStatValue(0, parsed) : raw));
  const startedRef = useRef(false);
  const frameRef = useRef<number>();

  const ref = useCallback(
    (node: Element | null) => {
      if (!node || !parsed || startedRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        startedRef.current = true;
        setDisplay(raw);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || startedRef.current) return;
          startedRef.current = true;
          observer.disconnect();

          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min(1, (now - start) / durationMs);
            const current = parsed.value * easeOut(progress);
            // Land on the string the owner typed rather than a re-formatted
            // version of it, so "5,000+" cannot come back as "5000+".
            setDisplay(progress === 1 ? raw : formatStatValue(current, parsed));
            if (progress < 1) {
              frameRef.current = requestAnimationFrame(step);
            }
          };
          frameRef.current = requestAnimationFrame(step);
        },
        { threshold: 0.4 },
      );

      observer.observe(node);
    },
    [durationMs, parsed, raw],
  );

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { ref, display };
}
