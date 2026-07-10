import GithubSlugger from "github-slugger";

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

/**
 * Extracts a heading TOC directly from raw markdown source (pre-MDX-compile).
 * Slugs are generated with the same `github-slugger` instance-per-document
 * approach rehype-slug uses internally, so ids line up with the ones it
 * injects into the compiled headings for anchor links to work.
 */
export function extractMarkdownToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inCodeFence = false;

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();
    if (/^(```|~~~)/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const match = /^(#{1,6})\s+(.+?)\s*#*$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2]
      .replace(/`([^`]*)`/g, "$1")
      .replace(/\*\*([^*]*)\*\*/g, "$1")
      .replace(/\*([^*]*)\*/g, "$1")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .trim();
    if (!text) continue;

    entries.push({ id: slugger.slug(text), text, level });
  }

  return entries;
}
