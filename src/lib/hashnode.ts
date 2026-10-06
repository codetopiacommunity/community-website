import { withRetry } from "./retry";

// Articles come from the publication's public RSS feed. Hashnode's GraphQL
// API needs a Pro plan for every request since 13 May 2026, reads included,
// so the feed is the free source. It carries the full article HTML but no
// reaction or comment counts.

export interface HashnodeAuthor {
  name: string;
  profilePicture: string;
}

export interface HashnodeTag {
  name: string;
  slug: string;
}

export interface HashnodeArticle {
  slug: string;
  title: string;
  brief: string;
  coverImage: { url: string };
  author: HashnodeAuthor;
  publishedAt: string;
  readTimeInMinutes: number;
  tags: HashnodeTag[];
  reactionCount: number;
  responseCount: number;
  /** The article on Hashnode. The site lists articles and links here. */
  url: string;
}

function normalizePublicationHost(host: string): string {
  const trimmed = host.trim();
  if (!trimmed) return "";

  try {
    return new URL(trimmed).host;
  } catch {
    return trimmed.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }
}

// Validates that a publication host is a safe external domain before
// using it in a server-side fetch (prevents SSRF).
function validatePublicationHost(host: string): string {
  const normalized = normalizePublicationHost(host);

  if (!normalized) throw new Error("Publication host is required");

  // Block raw IPv4 addresses (e.g. 192.168.1.1)
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(normalized)) {
    throw new Error("IP addresses are not allowed as publication hosts");
  }

  // Block IPv6 addresses
  if (normalized.startsWith("[")) {
    throw new Error("IPv6 addresses are not allowed as publication hosts");
  }

  // Block localhost and .local TLDs
  if (/^(localhost|.*\.local)$/i.test(normalized)) {
    throw new Error("Local addresses are not allowed as publication hosts");
  }

  // Must be a valid hostname: labels separated by dots, no consecutive dots
  if (
    !/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(
      normalized,
    )
  ) {
    throw new Error("Invalid publication host format");
  }

  return normalized;
}

function decodeXml(value: string): string {
  // Only decode safe entities. &lt; and &gt; are intentionally kept as-is —
  // decoding them would introduce raw angle brackets into plain-text fields
  // (titles, authors, briefs) where they have no meaning and could trigger
  // double-unescaping warnings downstream.
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function getXmlTagValue(item: string, tag: string): string {
  const match = item.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"),
  );
  if (!match?.[1]) return "";

  return decodeXml(match[1].replace(/^<!\[CDATA\[|\]\]>$/g, "").trim());
}

function getXmlAttribute(item: string, tag: string, attribute: string): string {
  const match = item.match(new RegExp(`<${tag}\\s+[^>]*>`, "i"));
  const tagText = match?.[0] ?? "";
  const attrMatch = tagText.match(new RegExp(`${attribute}=["']([^"']+)["']`));
  return attrMatch?.[1] ? decodeXml(attrMatch[1]) : "";
}

function stripHtml(html: string): string {
  return decodeXml(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function getSlugFromUrl(url: string): string {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts.at(-1) ?? "";
  } catch {
    return url.split("/").filter(Boolean).at(-1) ?? "";
  }
}

function estimateReadTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function getFirstImageUrl(html: string): string {
  const imageMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imageMatch?.[1] ? decodeXml(imageMatch[1]) : "";
}

function parseRssArticle(item: string): HashnodeArticle {
  const title = getXmlTagValue(item, "title");
  const link = getXmlTagValue(item, "link");
  const description = getXmlTagValue(item, "description");
  const content = getXmlTagValue(item, "content:encoded") || description;
  const publishedAt = getXmlTagValue(item, "pubDate");
  const author =
    getXmlTagValue(item, "dc:creator") ||
    getXmlTagValue(item, "author") ||
    "Codetopia Community";
  const tags = Array.from(item.matchAll(/<category>([\s\S]*?)<\/category>/gi))
    .map((match) => decodeXml(match[1].replace(/^<!\[CDATA\[|\]\]>$/g, "")))
    .filter(Boolean)
    .map((name) => ({
      name,
      slug: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    }));
  const coverImage =
    getXmlAttribute(item, "media:content", "url") ||
    getXmlAttribute(item, "enclosure", "url") ||
    getFirstImageUrl(content);

  return {
    slug: getSlugFromUrl(link),
    title,
    brief: stripHtml(description || content).slice(0, 220),
    coverImage: { url: coverImage },
    author: { name: author, profilePicture: "" },
    publishedAt: publishedAt ? new Date(publishedAt).toISOString() : "",
    readTimeInMinutes: estimateReadTime(content),
    tags,
    reactionCount: 0,
    responseCount: 0,
    url: link,
  };
}

async function fetchRssArticles(host: string): Promise<HashnodeArticle[]> {
  return withRetry<HashnodeArticle[]>(
    async () => {
      const publicationHost = validatePublicationHost(host);
      const res = await fetch(`https://${publicationHost}/rss.xml`, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) {
        throw new Error(`Hashnode RSS error: ${res.status} ${res.statusText}`);
      }

      const xml = await res.text();
      const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/gi));
      return items.map((match) => parseRssArticle(match[1]));
    },
    {
      maxRetries: 1,
      delayMs: 1000,
      fallback: [],
    },
  );
}

export async function fetchArticles(host: string): Promise<HashnodeArticle[]> {
  return fetchRssArticles(host);
}

// Where an article lives on Hashnode. Built from the host alone, without
// the feed, so it works for old articles that have left the RSS feed too.
export function hashnodeArticleUrl(host: string, slug: string): string {
  return `https://${validatePublicationHost(host)}/${encodeURIComponent(slug)}`;
}
