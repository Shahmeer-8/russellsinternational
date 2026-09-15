export type LegalBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] };

/**
 * Turns the plain text of a legal document into blocks to render.
 *
 * A privacy policy is a long document with headings and lists, and the admin
 * panel edits page-section copy as plain textareas. Rather than give these two
 * pages their own database tables, the whole document lives in one `body` field
 * and this reads the shape back out of it:
 *
 *   `## ` at the start of a line  → a heading
 *   `- ` at the start of a line   → a list item, consecutive ones grouped
 *   a blank line                  → a paragraph break
 *
 * It is the smallest subset of Markdown that covers what these documents need,
 * and someone editing the text in the panel does not have to learn anything
 * beyond the two prefixes.
 */
export function parseLegalText(raw: string): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length) {
      blocks.push({ kind: "list", items: list });
      list = [];
    }
  };

  for (const line of raw.replace(/\r\n/g, "\n").split("\n")) {
    const text = line.trim();

    if (!text) {
      flushParagraph();
      flushList();
      continue;
    }

    if (text.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ kind: "heading", text: text.slice(3).trim() });
      continue;
    }

    if (text.startsWith("- ")) {
      flushParagraph();
      list.push(text.slice(2).trim());
      continue;
    }

    flushList();
    paragraph.push(text);
  }

  flushParagraph();
  flushList();

  return blocks;
}
