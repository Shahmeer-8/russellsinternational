/**
 * Turns a WhatsApp settings value into a link that opens a chat.
 *
 * The admin field asks for a phone number, because that is what the office
 * publishes and what anyone filling the field in will reach for. wa.me wants it
 * bare — digits only, country code included, no plus, spaces or dashes — so a
 * number pasted the way it is printed on a card would otherwise produce a dead
 * link.
 *
 * Anything that already looks like a URL is passed through untouched, so an owner
 * who pastes a full wa.me or chat link still gets what they meant.
 */
export function socialHref(key: string, value: string): string {
  const trimmed = value.trim();

  if (key !== "whatsapp" || /^https?:\/\//i.test(trimmed)) return trimmed;

  const digits = trimmed.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : trimmed;
}
