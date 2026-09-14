import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useStats } from "@/hooks/api";
import { resolveIcon } from "@/lib/icons";
import type { Stat } from "@/types/api";
import { Award } from "lucide-react";

/**
 * One figure, counting up from zero the first time it comes into view. Split out
 * so each stat gets its own observer and its own animation frame rather than the
 * strip driving four at once.
 */
const StatFigure = ({ stat }: { stat: Stat }) => {
  const Icon = resolveIcon(stat.icon_name, Award);
  const { ref, display } = useCountUp(stat.value);

  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="w-11 h-11 rounded-lg bg-muted flex items-center justify-center">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div
        ref={ref}
        className="font-heading text-3xl md:text-4xl font-extrabold text-foreground tabular-nums"
      >
        {display}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground leading-snug">{stat.label}</div>
    </div>
  );
};

/**
 * The stats were editable in the admin but rendered nowhere, so the owner could
 * curate "5,000+ Students Placed" and never see it on the site.
 *
 * Deliberately a compact strip rather than cards: it earns its place near the top
 * of the page without adding meaningful scroll height — two rows on a phone, one
 * on desktop.
 */
const StatsStrip = () => {
  const { ref, visible } = useScrollReveal();
  const { data, isLoading } = useStats();

  const stats = data?.data ?? [];

  // Bail out only once we know for certain there is nothing to show. Returning
  // null while still loading would skip mounting the ref below on the first
  // render; useScrollReveal's observer effect only runs once, so with nothing to
  // observe that first time the section would stay invisible forever once the
  // data arrived and it finally rendered.
  if (!isLoading && stats.length === 0) {
    return null;
  }

  return (
    <section className="py-10 md:py-14 bg-section-alt">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <StatFigure key={stat.id} stat={stat} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsStrip;
