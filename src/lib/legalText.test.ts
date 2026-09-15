import { describe, expect, it } from "vitest";
import { parseLegalText } from "./legalText";

describe("parseLegalText", () => {
  it("reads headings, paragraphs and lists out of one field", () => {
    expect(
      parseLegalText(
        [
          "## What we collect",
          "",
          "We collect the details you give us",
          "when you enquire.",
          "",
          "- Your name",
          "- Your email",
          "",
          "## How long we keep it",
          "Until you ask us to delete it.",
        ].join("\n"),
      ),
    ).toEqual([
      { kind: "heading", text: "What we collect" },
      { kind: "paragraph", text: "We collect the details you give us when you enquire." },
      { kind: "list", items: ["Your name", "Your email"] },
      { kind: "heading", text: "How long we keep it" },
      { kind: "paragraph", text: "Until you ask us to delete it." },
    ]);
  });

  it("closes an open list when a heading follows it with no blank line", () => {
    expect(parseLegalText("- One\n- Two\n## Next")).toEqual([
      { kind: "list", items: ["One", "Two"] },
      { kind: "heading", text: "Next" },
    ]);
  });

  it("returns nothing for an empty document", () => {
    expect(parseLegalText("")).toEqual([]);
    expect(parseLegalText("\n\n   \n")).toEqual([]);
  });

  it("copes with Windows line endings, which is what a paste from Word gives", () => {
    expect(parseLegalText("## Title\r\n\r\nBody text.")).toEqual([
      { kind: "heading", text: "Title" },
      { kind: "paragraph", text: "Body text." },
    ]);
  });
});
