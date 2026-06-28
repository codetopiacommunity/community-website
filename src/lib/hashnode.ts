import { withRetry } from "./retry";

const HASHNODE_GQL_ENDPOINT = "https://gql.hashnode.com";
const HASHNODE_POSTS_LIMIT = 50;

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
}

export interface HashnodeArticleDetail extends HashnodeArticle {
  content: { html: string };
  url: string;
  seo?: { title?: string; description?: string };
}

const GET_PUBLICATION_ARTICLES = `
  query GetPublicationArticles($host: String!, $first: Int!) {
    publication(host: $host) {
      posts(first: $first) {
        edges {
          node {
            slug title brief
            coverImage { url }
            author { name profilePicture }
            publishedAt readTimeInMinutes
            tags { name slug }
            reactionCount responseCount
          }
        }
      }
    }
  }
`;

const GET_ARTICLE = `
  query GetArticle($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        slug title brief
        coverImage { url }
        author { name profilePicture }
        publishedAt readTimeInMinutes
        tags { name slug }
        reactionCount responseCount
        content { html }
        url
        seo { title description }
      }
    }
  }
`;

async function gqlFetch<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T | null> {
  return withRetry<T | null>(
    async () => {
      const res = await fetch(HASHNODE_GQL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) {
        throw new Error(`Hashnode API error: ${res.status} ${res.statusText}`);
      }

      const text = await res.text();
      const contentType = res.headers.get("content-type") ?? "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          `Hashnode API returned ${contentType || "unknown content type"} instead of JSON`,
        );
      }

      const json = JSON.parse(text);

      if (json.errors) {
        console.error(
          "Hashnode GraphQL Errors:",
          JSON.stringify(json.errors, null, 2),
        );
        throw new Error("Hashnode GraphQL error");
      }

      return json.data as T;
    },
    {
      maxRetries: 2,
      delayMs: 1000,
      fallback: null,
    },
  );
}

function mapNode(node: Record<string, unknown>): HashnodeArticle {
  const coverImage = (node.coverImage as Record<string, unknown> | null) ?? {};
  const author = (node.author as Record<string, unknown> | null) ?? {};
  const tags = (node.tags as Record<string, unknown>[] | null) ?? [];

  return {
    slug: (node.slug as string) ?? "",
    title: (node.title as string) ?? "",
    brief: (node.brief as string) ?? "",
    coverImage: { url: (coverImage.url as string) ?? "" },
    author: {
      name: (author.name as string) ?? "",
      profilePicture: (author.profilePicture as string) ?? "",
    },
    publishedAt: (node.publishedAt as string) ?? "",
    readTimeInMinutes: (node.readTimeInMinutes as number) ?? 0,
    tags: tags.map((t) => ({
      name: (t.name as string) ?? "",
      slug: (t.slug as string) ?? "",
    })),
    reactionCount: (node.reactionCount as number) ?? 0,
    responseCount: (node.responseCount as number) ?? 0,
  };
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
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
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

function parseRssArticle(item: string): HashnodeArticleDetail {
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
    content: { html: content },
    url: link,
  };
}

async function fetchRssArticles(
  host: string,
): Promise<HashnodeArticleDetail[]> {
  return withRetry<HashnodeArticleDetail[]>(
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
  const data = await gqlFetch<{
    publication: {
      posts: { edges: { node: Record<string, unknown> }[] };
    } | null;
  }>(GET_PUBLICATION_ARTICLES, {
    host: normalizePublicationHost(host),
    first: HASHNODE_POSTS_LIMIT,
  });

  const edges = data?.publication?.posts?.edges ?? [];
  if (edges.length > 0) {
    return edges.map((edge) => mapNode(edge.node));
  }

  return fetchRssArticles(host);
}

export async function fetchArticle(
  host: string,
  slug: string,
): Promise<HashnodeArticleDetail | null> {
  const data = await gqlFetch<{
    publication: { post: Record<string, unknown> | null } | null;
  }>(GET_ARTICLE, { host: normalizePublicationHost(host), slug });

  const post = data?.publication?.post;
  if (!post) {
    const rssArticles = await fetchRssArticles(host);
    return rssArticles.find((article) => article.slug === slug) ?? null;
  }

  const base = mapNode(post);
  const content = (post.content as Record<string, unknown> | null) ?? {};
  const seo = (post.seo as Record<string, unknown> | null) ?? null;

  return {
    ...base,
    content: { html: (content.html as string) ?? "" },
    url: (post.url as string) ?? "",
    ...(seo
      ? {
          seo: {
            title: (seo.title as string | undefined) ?? undefined,
            description: (seo.description as string | undefined) ?? undefined,
          },
        }
      : {}),
  };
}
