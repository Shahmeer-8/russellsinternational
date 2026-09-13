import { Award, CalendarDays, CheckCircle2, Users } from "lucide-react";
import { useInternshipRecords } from "@/hooks/api";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSectionCopy } from "@/hooks/useSectionCopy";
import ResponsiveCardRow from "@/components/ResponsiveCardRow";

/**
 * Internship programmes that have already run, with who took part and what came
 * out of them. Admin-managed; the heading above lives in the
 * `careers/internship_record` page section.
 *
 * Cards carry a photo, an achievements list and a couple of stats, so stacking
 * them on a phone would add several screens to an already long Careers page —
 * hence the swipe row, matching the other card rows on this site.
 */
const InternshipRecordSection = () => {
  const copy = useSectionCopy("careers", "internship_record");
  const { ref, visible } = useScrollReveal(0.08);
  const { data, isLoading } = useInternshipRecords();

  const records = data?.data ?? [];

  // Bailing out while loading would cost the scroll reveal its ref, so only hide
  // the section once we know there is nothing to show.
  if (!isLoading && records.length === 0) {
    return null;
  }

  return (
    <section className="bg-[hsl(var(--muted))] py-20 md:py-28">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="mb-10 max-w-2xl">
          <span className="section-label">{copy("eyebrow", "Our track record")}</span>
          <h2 className="section-title mt-3 mb-4">{copy("title", "Internship Record")}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {copy(
              "subtitle",
              "Programmes we have already run, the people who took part and what they went on to achieve.",
            )}
          </p>
        </div>

        <ResponsiveCardRow
          gridClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start"
          items={records.map((record) => ({
            key: record.id,
            node: (
              <article className="premium-card h-full overflow-hidden">
                {record.image_url && (
                  <img
                    src={record.image_url}
                    alt={record.title}
                    className="aspect-[16/9] w-full object-cover"
                    loading="lazy"
                    width={640}
                    height={360}
                  />
                )}
                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground leading-snug">
                    {record.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-accent" />
                      {record.period}
                    </span>
                    {record.participants_count != null && (
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-accent" />
                        {record.participants_count} participants
                      </span>
                    )}
                  </div>

                  {record.description && (
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {record.description}
                    </p>
                  )}

                  {(record.achievements ?? []).length > 0 && (
                    <>
                      <div className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                        <Award className="h-3.5 w-3.5 text-accent" />
                        Achievements
                      </div>
                      <ul className="mt-2 space-y-2">
                        {(record.achievements ?? []).map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </article>
            ),
          }))}
        />
      </div>
    </section>
  );
};

export default InternshipRecordSection;
