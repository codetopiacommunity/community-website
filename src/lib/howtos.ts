import matter from "gray-matter";

const REPO = "codetopiacommunity/community-howtos";
const API = `https://api.github.com/repos/${REPO}/contents`;

export interface HowtoMeta {
  title: string;
  description?: string;
  date?: string;
  author?: string;
}

export interface HowtoSummary {
  slug: string;
  category: string;
  meta: HowtoMeta;
}

async function ghFetch(path: string) {
  const res = await fetch(`${API}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getCategories(): Promise<string[]> {
  const data = await ghFetch("/");
  if (!Array.isArray(data)) return [];
  return data
    .filter(
      (item: { type: string; name: string }) =>
        item.type === "dir" && !item.name.startsWith("."),
    )
    .map((item: { name: string }) => item.name);
}

export async function getHowtosByCategory(
  category: string,
): Promise<HowtoSummary[]> {
  const data = await ghFetch(`/${category}`);
  if (!Array.isArray(data)) return [];

  const mdxFiles = data.filter(
    (item: { type: string; name: string }) =>
      item.type === "file" && item.name.endsWith(".mdx"),
  );

  const results = await Promise.all(
    mdxFiles.map(async (file: { name: string }) => {
      const slug = file.name.replace(/\.mdx$/, "");
      const raw = await getHowtoRaw(category, slug);
      if (!raw) return null;
      const { data: meta } = matter(raw);
      return { slug, category, meta: meta as HowtoMeta };
    }),
  );

  return results.filter(Boolean) as HowtoSummary[];
}

export async function getAllHowtos(): Promise<HowtoSummary[]> {
  const categories = await getCategories();
  const nested = await Promise.all(categories.map(getHowtosByCategory));
  return nested.flat();
}

export async function getHowtosIntro(): Promise<string> {
  const data = await ghFetch("/README.md");
  if (!data?.content) return "";
  return Buffer.from(data.content, "base64").toString("utf-8");
}

export async function getHowtoRaw(
  category: string,
  slug: string,
): Promise<string | null> {
  const data = await ghFetch(`/${category}/${slug}.mdx`);
  if (!data?.content) return null;
  return Buffer.from(data.content, "base64").toString("utf-8");
}

const WORDS_PER_MINUTE = 200;

/**
 * Rough word-count estimate off the raw markdown body, stripping code
 * fences/inline code/links so dense snippets don't inflate the count.
 */
export function estimateReadingTime(markdown: string): number {
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~`-]/g, "");

  const words = stripped.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
