import { useTickerItems } from "@/hooks/api";

/**
 * Announcements are typed in the admin with a decorative emoji in front. They read
 * as clutter in a narrow strip, so they are dropped at render — the wording the
 * admin typed is untouched, and removing the emoji there instead would work too.
 */
function stripLeadingEmoji(text: string): string {
  return text.replace(/^[\p{Extended_Pictographic}\p{Emoji_Presentation}️‍\s]+/u, "").trim();
}

const fallbackItems = [
  "Admissions Open for September 2026 Intake",
  "95% Visa Success Rate for UK, Canada & AU",
  "New IT Courses Starting Monthly",
  "NAVTTC Free Training Now Available",
];

/**
 * The scrolling announcement strip that sits above the header on every page.
 *
 * It used to live inside the home page hero, which meant the one place a visitor
 * could see what was currently open for admission was the one page they might
 * arrive past. In the footer's navy it reads as a masthead rather than a banner
 * inside the content.
 *
 * The list renders twice and the track travels -50%, so the moment the first copy
 * leaves the frame the second is already where it started and the loop restarts
 * with no visible jump. The duplicate is hidden from assistive tech, which would
 * otherwise read every announcement twice.
 */
const AnnouncementTicker = () => {
  const { data } = useTickerItems();

  const apiItems = (data?.data ?? []).map((t) => `${t.emoji ?? ""} ${t.text}`.trim());
  const items = apiItems.length > 0 ? apiItems : fallbackItems;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="ticker-viewport bg-primary text-primary-foreground">
      <div className="ticker-track py-2">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            /* pr-8 matches gap-x-8, so the join between the two copies is spaced
               exactly like every other gap and the seam is invisible. */
            className="flex shrink-0 gap-x-8 pr-8"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {items.map((t, i) => (
              <span key={`${t}-${i}`} className="whitespace-nowrap text-xs font-medium">
                {stripLeadingEmoji(t)}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementTicker;
