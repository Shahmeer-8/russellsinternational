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
