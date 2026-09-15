{{--
    Counts the dashboard figures up from zero the first time they appear.

    The numbers were always live database counts, but a figure that is simply
    printed reads as though it might be hardcoded. Counting up says plainly that
    it was measured.

    Runs once per value: the widget polls, and a figure that re-animated every
    thirty seconds would pull the eye away from whatever the admin was reading.
    A stat only animates again if its number has actually changed.
--}}
<script>
    (() => {
        const DURATION_MS = 900;
        // Filament's own class for the big number in a stats-overview card.
        const VALUE_SELECTOR = '.fi-wi-stats-overview-stat-value';

        const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        // Eases out: quick off the mark, settling gently on the final figure.
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);

        const animate = (el) => {
            const finalText = el.textContent.trim();
            // Only figures that are purely a number; anything with a unit, a plus
            // or a currency symbol is left exactly as the widget wrote it.
            if (!/^\d+$/.test(finalText)) return;

            const target = Number(finalText);
            if (el.dataset.countupTo === finalText) return;
            el.dataset.countupTo = finalText;

            if (reducedMotion || target === 0) return;

            const start = performance.now();
            const step = (now) => {
                const progress = Math.min(1, (now - start) / DURATION_MS);
                el.textContent = progress === 1
                    ? finalText
                    : String(Math.round(target * easeOut(progress)));
                if (progress < 1) requestAnimationFrame(step);
            };

            el.textContent = '0';
            requestAnimationFrame(step);
        };

        const run = () => document.querySelectorAll(VALUE_SELECTOR).forEach(animate);

        // The widget arrives lazily and again on every poll, so watch for it
        // rather than running once on load and hoping it is already there.
        const observer = new MutationObserver(run);
        const startObserving = () => {
            run();
            observer.observe(document.body, { childList: true, subtree: true });
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startObserving);
        } else {
            startObserving();
        }
    })();
</script>
