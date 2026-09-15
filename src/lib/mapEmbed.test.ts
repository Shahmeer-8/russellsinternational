import { describe, expect, it } from "vitest";
import { mapEmbedUrl } from "./mapEmbed";

describe("mapEmbedUrl", () => {
  it("passes an existing embed URL through untouched", () => {
    const embed = "https://www.google.com/maps/embed?pb=!1m18!1m12";
    expect(mapEmbedUrl(embed)).toBe(embed);
  });

  it("uses the coordinates out of a place URL", () => {
    const place =
      "https://www.google.com/maps/place/Russells+International/@31.1713676,72.6833,17z/data=!3m1";
    expect(mapEmbedUrl(place)).toBe(
      "https://maps.google.com/maps?q=31.1713676,72.6833&z=16&output=embed",
    );
  });

  it("falls back to searching for a plain address", () => {
    expect(mapEmbedUrl("Pensra Rd, Gojra")).toBe(
      "https://maps.google.com/maps?q=Pensra%20Rd%2C%20Gojra&output=embed",
    );
  });

  it("searches for the place name when a place URL carries no coordinates", () => {
    expect(mapEmbedUrl("https://www.google.com/maps/place/Russells+International")).toBe(
      "https://maps.google.com/maps?q=Russells%2BInternational&output=embed",
    );
  });

  it("renders nothing for an empty field", () => {
    expect(mapEmbedUrl("")).toBeNull();
    expect(mapEmbedUrl("   ")).toBeNull();
    expect(mapEmbedUrl(undefined)).toBeNull();
  });
});
