export interface TocEntry {
  id: string;
  text: string;
  level: number; // 1–6
}

/**
 * Derives a slug-style id from heading text.
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
 */
function stripTags(html: string): string {
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
 * Injects id attributes into h1–h6 tags in an HTML string
 * so TOC anchor links have targets to scroll to.
 */
export function injectHeadingIds(html: string): string {
  if (!html) return html;

  return html.replace(
    /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level, attrs, inner) => {
      const text = stripTags(inner);
      const id = slugify(text);
      if (!id) return match;
      // Strip any existing id attribute and replace with our slugified one
      const attrsWithoutId = attrs.replace(/\s*id\s*=\s*["'][^"']*["']/gi, "");
      return `<h${level}${attrsWithoutId} id="${id}">${inner}</h${level}>`;
    },
  );
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
