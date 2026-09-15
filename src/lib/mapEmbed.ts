/**
 * Turns whatever the owner pasted into the map field into something an iframe can
 * actually show.
 *
 * The footer used to need a pre-built `/maps/embed` URL, which is buried behind
 * "Share → Embed a map → copy the src out of the HTML" — so the settings ended up
 * holding two map keys: one embed URL nobody could regenerate, and one ordinary
 * Google Maps link that was never rendered. Editing the ordinary one changed
 * nothing on the site, which is exactly what got reported.
 *
 * Now the ordinary link works. A place URL carries its coordinates after an `@`,
 * which is the most precise thing available without an API key; failing that the
 * whole string is handed over as a search term, which is also how a plain address
 * typed into the field resolves.
 */
export function mapEmbedUrl(raw: string | undefined | null): string | null {
  const value = raw?.trim();
  if (!value) return null;

  // Already an embed URL — the owner did it the hard way, or this is the value
  // that was seeded before. Leave it exactly as it is.
  if (value.includes("/maps/embed")) return value;

  const coordinates = value.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordinates) {
    const [, lat, lng] = coordinates;
    return `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
  }

  // A share link (maps.app.goo.gl/…) cannot be resolved here without following
  // the redirect, and Google will not frame it, so treat anything else — a bare
  // address included — as a search query.
  const query = /^https?:\/\//i.test(value)
    ? value.replace(/^https?:\/\/(www\.)?google\.[^/]+\/maps\/place\//i, "").split("/")[0]
    : value;

  return `https://maps.google.com/maps?q=${encodeURIComponent(decodeURIComponent(query))}&output=embed`;
}
