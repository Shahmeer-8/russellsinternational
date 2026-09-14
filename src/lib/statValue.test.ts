import { describe, expect, it } from "vitest";
import { formatStatValue, parseStatValue } from "@/lib/statValue";

describe("parseStatValue", () => {
  it("splits a thousands-separated figure from its suffix", () => {
    expect(parseStatValue("5,000+")).toEqual({ prefix: "", value: 5000, suffix: "+", decimals: 0 });
  });

  it("reads a percentage", () => {
    expect(parseStatValue("95%")).toEqual({ prefix: "", value: 95, suffix: "%", decimals: 0 });
  });

  it("keeps a leading symbol as a prefix", () => {
    expect(parseStatValue("$1.2M")).toEqual({ prefix: "$", value: 1.2, suffix: "M", decimals: 1 });
  });

  it("returns no number for text that has none, so the caller can show it as-is", () => {
    expect(parseStatValue("Nationwide")).toBeNull();
  });

  it("handles a bare number", () => {
    expect(parseStatValue("12")).toEqual({ prefix: "", value: 12, suffix: "", decimals: 0 });
  });
});

describe("formatStatValue", () => {
  it("re-applies the separators and the suffix while counting", () => {
    const parsed = parseStatValue("5,000+")!;
    expect(formatStatValue(2500, parsed)).toBe("2,500+");
  });

  it("keeps the original decimal places so the figure does not jitter", () => {
    const parsed = parseStatValue("$1.2M")!;
    expect(formatStatValue(0.6, parsed)).toBe("$0.6M");
  });

  it("returns the final value unchanged at the end of the count", () => {
    const parsed = parseStatValue("95%")!;
    expect(formatStatValue(95, parsed)).toBe("95%");
  });
});
