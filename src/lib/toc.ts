export interface TocEntry {
  id: string;
  text: string;
  level: number; // 1–6
}

/**
 * Derives a slug-style id from heading text.
 * Lowercases, strips non-alphanumeric characters (except spaces/hyphens),
 * and replaces spaces with hyphens.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Strips inner HTML tags from a string, returning plain text content.
 * Uses the sanitized html string — since input is already DOMPurify-cleaned,
 * we decode it via a well-known entity map rather than regex manipulation.
 */
function stripTags(html: string): string {
  // Remove all tag-like sequences by splitting on < and taking only text before each tag
  const parts = html.split("<");
  return parts
    .map((part, i) => {
      if (i === 0) return part;
      const closeIndex = part.indexOf(">");
      return closeIndex === -1 ? "" : part.slice(closeIndex + 1);
    })
    .join("")
    .trim();
}

/**
 * Parses h1–h6 elements from an HTML string (server-safe, regex-based).
 * Returns [] for empty input or when no headings are found.
 */
export function extractToc(html: string): TocEntry[] {
  if (!html) return [];

  const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const entries: TocEntry[] = [];
  let match: RegExpExecArray | null;

  // biome-ignore lint/suspicious/noAssignInExpressions: standard regex exec loop pattern
  while ((match = headingRegex.exec(html)) !== null) {
    const level = Number.parseInt(match[1], 10);
    const text = stripTags(match[2]);
    const id = slugify(text);
    if (text) {
      entries.push({ id, text, level });
    }
  }

  return entries;
}
