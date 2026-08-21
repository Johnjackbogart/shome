/**
 * Projects externally supplied HTML into displayable plain text. This is not a
 * sanitizer: callers must render the result as text, never as HTML.
 */
const OMITTED_ELEMENTS = /<(script|style|template|noscript|svg|math)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;
const BLOCK_ELEMENTS =
  /<\/?(?:address|article|aside|blockquote|br|div|dl|dt|dd|figure|figcaption|h[1-6]|header|hr|li|main|nav|ol|p|pre|section|table|tr|ul)\b[^>]*>/gi;
const TAGS = /<[^>]*>/g;

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};

function decodeEntity(entity: string): string | undefined {
  const named = NAMED_ENTITIES[entity.toLowerCase()];
  if (named) return named;

  const match = entity.match(/^#(x[\da-f]+|\d+)$/i);
  if (!match) return undefined;
  const encoded = match[1];
  if (!encoded) return undefined;
  const hexadecimal = encoded.startsWith("x");
  const codePoint = Number.parseInt(
    hexadecimal ? encoded.slice(1) : encoded,
    hexadecimal ? 16 : 10,
  );
  if (!Number.isSafeInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff) return undefined;
  try {
    return String.fromCodePoint(codePoint);
  } catch {
    return undefined;
  }
}

/**
 * Extract readable text from an external HTML fragment while discarding markup
 * and non-content elements. The return value is safe to persist and render in
 * a normal text node.
 */
export function htmlToPlainText(html: string): string {
  const withoutMarkup = html
    .replace(OMITTED_ELEMENTS, "")
    .replace(BLOCK_ELEMENTS, "\n")
    .replace(TAGS, "");
  const decoded = withoutMarkup.replace(
    /&(#x[\da-f]+|#\d+|[a-z][a-z\d]+);/gi,
    (match, entity) => decodeEntity(entity) ?? match,
  );
  return decoded
    .replace(/\r\n?/g, "\n")
    .replace(/[\t\f\v ]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
