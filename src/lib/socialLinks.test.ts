import { describe, expect, it } from "vitest";
import { socialHref } from "./socialLinks";

describe("socialHref", () => {
  it("turns a printed phone number into a wa.me link", () => {
    expect(socialHref("whatsapp", "+92 304 111 2233")).toBe("https://wa.me/923041112233");
  });

  it("keeps a link the owner pasted themselves", () => {
    expect(socialHref("whatsapp", "https://wa.me/923041112233?text=Hi")).toBe(
      "https://wa.me/923041112233?text=Hi",
    );
  });

  it("leaves every other network's value alone", () => {
    expect(socialHref("facebook", "https://facebook.com/russellsinternational/")).toBe(
      "https://facebook.com/russellsinternational/",
    );
  });

  it("does not invent a link out of a value with no digits in it", () => {
    expect(socialHref("whatsapp", "coming soon")).toBe("coming soon");
  });
});
