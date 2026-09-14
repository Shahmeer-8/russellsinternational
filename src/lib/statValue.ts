export type ParsedStat = {
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
};

/**
 * Stats are stored as display strings — "5,000+", "95%", "10+" — because the owner
 * types them in the admin. Counting one up means pulling the number back out
 * without losing what sits either side of it, so the figure can be animated and
 * still render exactly as it was written when it lands.
 *
 * Returns null when there is no number to count, e.g. a stat whose value is a word.
 */
export function parseStatValue(raw: string): ParsedStat | null {
  const match = raw.trim().match(/^([^\d]*)([\d][\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  const value = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(value)) return null;

  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;

  return { prefix, value, suffix, decimals };
}

/** Renders an in-progress count with the original separators, decimals and affixes. */
export function formatStatValue(current: number, parsed: ParsedStat): string {
  const body = current.toLocaleString("en-US", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  });

  return `${parsed.prefix}${body}${parsed.suffix}`;
}
