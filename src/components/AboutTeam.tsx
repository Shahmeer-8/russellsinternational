import { Users } from "lucide-react";
import { useTeamMembers } from "@/hooks/api";
import type { TeamMember } from "@/types/api";
import AboutSection from "@/components/AboutSection";
import ResponsiveCardRow from "@/components/ResponsiveCardRow";

/**
 * Twenty people listed as twenty identical cards told a visitor nothing about who
 * actually runs the place. Splitting them says something real: who leads it, who
 * advises it, and who you will deal with day to day — which is exactly what a
 * parent is trying to work out.
 *
 * Matching is on the role text, with the wider team as the fallback, so a role an
 * admin types that we do not recognise still appears instead of vanishing.
 */
// "Consultant" on its own is a leadership role here; "Training Consultant" is one
// of the trainers, so the bare word has to be anchored rather than matched loosely.
const LEADERSHIP = /founder|chief|ceo|director|coordinator|^consultant$/i;
const ADVISORY = /advisor/i;

function group(members: TeamMember[]) {
  const advisory = members.filter((m) => ADVISORY.test(m.role));
  const leadership = members.filter((m) => !ADVISORY.test(m.role) && LEADERSHIP.test(m.role));
  const team = members.filter((m) => !advisory.includes(m) && !leadership.includes(m));

  return [
    { title: "Leadership", members: leadership },
    { title: "Advisory board", members: advisory },
    { title: "Team", members: team },
  ].filter((g) => g.members.length > 0);
}

const Person = ({ member }: { member: TeamMember }) => (
  <div className="border-t border-border pt-5">
    {member.image_url ? (
      <img
        src={member.image_url}
        alt={member.name}
        className="mb-4 aspect-[4/5] w-full rounded-sm object-cover object-top"
        loading="lazy"
        decoding="async"
        width={320}
        height={400}
      />
    ) : (
      <div className="mb-4 flex aspect-[4/5] w-full items-center justify-center rounded-sm bg-muted">
        <Users className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      </div>
    )}
    <div className="font-heading font-bold leading-snug text-foreground">{member.name}</div>
    {/* Slate, not accent: twenty roles in orange would spend the page's one loud
        colour on its least important text. */}
    <div className="mt-0.5 text-sm text-muted-foreground">{member.role}</div>
    {member.bio && (
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{member.bio}</p>
    )}
  </div>
);

const AboutTeam = () => {
  const { data, isLoading } = useTeamMembers();
  const members = data?.data ?? [];

  // Bailing out while loading would leave the page jumping as data lands; only
  // hide the section once we know there is nobody to show.
  if (!isLoading && members.length === 0) {
    return null;
  }

  return (
    <AboutSection label="Our people">
      <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em] text-foreground">
        The people behind the work
      </h2>

      {group(members).map((section) => (
        <div key={section.title} className="mt-14 first:mt-10">
          <h3 className="mb-6 font-heading text-lg font-bold text-foreground">{section.title}</h3>
          {/* Twenty portraits stacked two-up ran to roughly 7,700px on a phone —
              two thirds of the whole page. Swiping each group costs one card of
              height however many people are in it. */}
          <ResponsiveCardRow
            gridClassName="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 items-start"
            items={section.members.map((member) => ({
              key: member.id,
              node: <Person member={member} />,
            }))}
          />
        </div>
      ))}
    </AboutSection>
  );
};

export default AboutTeam;
