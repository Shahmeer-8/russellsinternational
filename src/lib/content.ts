import type { PageSection } from "@/types/api";

export function sectionText(
  section: PageSection | undefined,
  field: "eyebrow" | "title" | "subtitle" | "body" | "cta_label" | "cta_url",
  fallback: string,
) {
  const value = section?.[field];
  return value && value.trim() ? value : fallback;
}

export function sectionImage(section: PageSection | undefined, fallback: string) {
  return section?.image_url || fallback;
}

export function setting(settings: Record<string, string>, key: string, fallback: string) {
  return settings[key] || fallback;
}

/**
 * Reads a numbered list out of a section's `items` map — `interest_1`,
 * `interest_2`, … — for the places where the admin needs to control a set of
 * choices rather than a heading: the contact form's dropdown, a tab's label.
 *
 * Like sectionItems, once a section has an `items` map it is taken as the
 * authority: an admin who deletes every row means "show nothing", not "go back
 * to the defaults". Only a section with no map at all uses the fallback, which
 * keeps an unseeded install rendering exactly what it did when the list was
 * hardcoded.
 */
export function sectionOptions(
  section: PageSection | undefined,
  prefix: string,
  fallback: string[],
): string[] {
  const items = section?.items;
  if (!items) return fallback;

  return Object.keys(items)
    .map((key) => {
      const match = key.match(new RegExp(`^${prefix}_(\\d+)$`));
      return match ? { index: Number(match[1]), value: items[key] } : null;
    })
    .filter((entry): entry is { index: number; value: string } => Boolean(entry?.value?.trim()))
    .sort((a, b) => a.index - b.index)
    .map((entry) => entry.value.trim());
}

export type SectionItem = {
  code?: string;
  title?: string;
  name?: string;
  meta: string;
};

/**
 * Admins edit these list rows as flat `items` keys (`country_1_name`,
 * `course_2_meta`, …) rather than a nested array, because the page-section form
 * is a plain key/value editor. This reassembles up to three of them into the
 * shape a card row expects, dropping any row the admin left half-filled so a
 * blank entry never renders. Only a section with no `items` at all falls back to
 * the caller's copy — once an admin has saved rows, clearing them is treated as
 * "show nothing", not "show the defaults again".
 */
export function sectionItems(
  section: PageSection | undefined,
  fallback: SectionItem[],
  prefix: string,
): SectionItem[] {
  const items = section?.items;
  if (!items) return fallback;

  return [1, 2, 3]
    .map((index) => {
      const title = items[`${prefix}_${index}_title`];
      const name = items[`${prefix}_${index}_name`];
      const code = items[`${prefix}_${index}_code`];
      const meta = items[`${prefix}_${index}_meta`];

      if ((!title && !name) || !meta) return null;

      return { title, name, code, meta };
    })
    .filter(Boolean) as SectionItem[];
}
