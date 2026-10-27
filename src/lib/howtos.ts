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
  /** URL slug: the file name without its number, e.g. "help-out". */
  slug: string;
  /** File name without ".mdx", e.g. "02-help-out". The number sets the order. */
  file: string;
  /** Folder name in the repo, e.g. "Getting-Started". */
  category: string;
  /** URL segment for the folder, e.g. "getting-started". */
  categorySlug: string;
  /** Estimated reading time in minutes. */
  minutes: number;
  meta: HowtoMeta;
}

/** "02-help-out" -> "help-out". */
export function cleanSlug(file: string): string {
  return file.replace(/^\d+-/, "");
}

export function howtoHref(howto: Pick<HowtoSummary, "categorySlug" | "slug">) {
  return `/howtos/${howto.categorySlug}/${howto.slug}`;
}

async function ghFetch(path: string) {
  const res = await fetch(`${API}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

export interface HowtoCategory {
  /** Folder name in the repo, e.g. "Getting-Started". */
  name: string;
  /** Shown as the section heading, e.g. "Getting started". */
  title: string;
  /** One line under the heading, so newcomers know where to look. */
  description?: string;
  /** Position on the page: 1 comes first. */
  order: number;
}

/**
 * Every category folder, in page order. A folder can hold a `_category.md`
 * whose frontmatter gives its title, description and order. Folders without
 * one use their name as the title and come after the rest, A to Z.
 */
export async function getCategoryInfo(): Promise<HowtoCategory[]> {
  const data = await ghFetch("/");
  if (!Array.isArray(data)) return [];
  const folders: string[] = data
    .filter(
      (item: { type: string; name: string }) =>
        item.type === "dir" && !item.name.startsWith("."),
    )
    .map((item: { name: string }) => item.name);

  const categories = await Promise.all(
    folders.map(async (name) => {
      const file = await ghFetch(`/${name}/_category.md`);
      const meta = file?.content
        ? matter(Buffer.from(file.content, "base64").toString("utf-8")).data
        : {};
      return {
        name,
        title:
          typeof meta.title === "string" ? meta.title : name.replace(/-/g, " "),
        description:
          typeof meta.description === "string" ? meta.description : undefined,
        order:
          typeof meta.order === "number"
            ? meta.order
            : Number.POSITIVE_INFINITY,
      };
    }),
  );

  return categories.sort(
    (a, b) => a.order - b.order || a.name.localeCompare(b.name),
  );
}

export async function getCategories(): Promise<string[]> {
  return (await getCategoryInfo()).map((c) => c.name);
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
      const name = file.name.replace(/\.mdx$/, "");
      const raw = await getHowtoRaw(category, name);
      if (!raw) return null;
      const { data: meta, content } = matter(raw);
      return {
        minutes: estimateReadingTime(content),
        slug: cleanSlug(name),
        file: name,
        category,
        categorySlug: category.toLowerCase(),
        meta: meta as HowtoMeta,
      };
    }),
  );

  return (results.filter(Boolean) as HowtoSummary[]).sort((a, b) =>
    a.file.localeCompare(b.file),
  );
}

// Guides whose name changed, mapped both ways so a link works before and
// after the rename reaches the howtos repo.
const RENAMED_PAIRS: [string, string][] = [
  ["make-your-first-contribution", "help-out"],
  ["your-first-fix", "your-first-pull-request"],
];
const RENAMED_GUIDES: Record<string, string[]> = {};
for (const [oldName, newName] of RENAMED_PAIRS) {
  RENAMED_GUIDES[oldName] = [newName];
  RENAMED_GUIDES[newName] = [oldName];
}

/**
 * Finds the guide behind a URL. Accepts the clean form
 * (/howtos/contributing/help-out) and older ones: any letter case, and the
 * file name with its number (/howtos/Contributing/02-help-out). The caller
 * redirects to `howtoHref(result)` when the URL is not already that.
 */
export async function resolveHowto(
  categoryParam: string,
  slugParam: string,
): Promise<HowtoSummary | null> {
  const categories = await getCategories();
  const category = categories.find(
    (c) => c.toLowerCase() === categoryParam.toLowerCase(),
  );
  if (!category) return null;
  const wanted = cleanSlug(slugParam.toLowerCase());
  const howtos = await getHowtosByCategory(category);
  const names = new Set([wanted, ...(RENAMED_GUIDES[wanted] ?? [])]);
  return howtos.find((h) => names.has(h.slug.toLowerCase())) ?? null;
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

/**
 * Splits the howtos README at "## How this started". What comes before is
 * the /howtos intro; the rest (the people who started the guides, and how to
 * fix a mistake) is the /howtos/about page. `creditedTo` is the group named
 * there, like "June to July 2026 intern cohort".
 */
export function splitReadme(readme: string) {
  const cut = readme.search(/^## How this started/m);
  if (cut === -1) return { intro: readme, about: "", creditedTo: "" };
  const about = readme.slice(cut);
  const creditedTo = about.match(/by the ([^,.]+? intern cohort)/)?.[1] ?? "";
  return { intro: readme.slice(0, cut), about, creditedTo };
}

/**
 * Guides duplicate their frontmatter title as a leading H1 in the body.
 * The page already renders the title from frontmatter, so drop the
 * redundant heading to avoid showing it twice.
 */
export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^\s*#\s+.+\n+/, "");
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
