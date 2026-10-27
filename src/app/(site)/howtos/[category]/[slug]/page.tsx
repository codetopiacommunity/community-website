import matter from "gray-matter";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";
import type { PluggableList } from "unified";
import { TableOfContents } from "@/components/articles/TableOfContents";
import { GuideMenu, GuideSidebar } from "@/components/howtos/GuideNav";
import { HOWTO_MDX_COMPONENTS } from "@/components/howtos/mdxComponents";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  estimateReadingTime,
  getAllHowtos,
  getCategoryInfo,
  getHowtoRaw,
  type HowtoMeta,
  type HowtoSummary,
  howtoHref,
  resolveHowto,
  stripLeadingH1,
} from "@/lib/howtos";
import { extractMarkdownToc } from "@/lib/toc";

export const revalidate = 60;

const MDX_COMPONENTS = HOWTO_MDX_COMPONENTS;

const MDX_OPTIONS = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkAlert] as PluggableList,
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: { light: "github-light", dark: "github-dark" },
          keepBackground: false,
          bypassInlineCode: true,
          // Fences with no language (message templates in the guides) would
          // otherwise skip the highlighter and miss the code block styles.
          defaultLang: { block: "plaintext" },
        },
      ],
    ] as PluggableList,
  },
};

/**
 * The guide behind a URL and its source, redirecting older forms of the
 * address to the clean one and 404ing when there is no such guide.
 */
async function loadHowto(category: string, slug: string) {
  const howto = await resolveHowto(category, slug).catch(() => null);
  if (!howto) notFound();
  if (category !== howto.categorySlug || slug !== howto.slug) {
    permanentRedirect(howtoHref(howto));
  }
  const raw = await getHowtoRaw(howto.category, howto.file).catch(() => null);
  if (!raw) notFound();
  return { howto, raw };
}

export default async function HowtoPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const { howto, raw } = await loadHowto(category, slug);

  const { content: rawContent, data } = matter(raw);
  const content = stripLeadingH1(rawContent);
  const meta = data as HowtoMeta;

  const formattedDate = meta.date
    ? new Date(meta.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const toc = extractMarkdownToc(content);
  const hasToc = toc.length >= 3;
  const readingMinutes = estimateReadingTime(content);

  // Every guide, for the list down the side; this guide's section, for
  // "Guide 3 of 12" and the previous and next links at the foot.
  const [allGuides, categories] = await Promise.all([
    getAllHowtos().catch(() => []),
    getCategoryInfo().catch(() => []),
  ]);
  const siblings = allGuides.filter((h) => h.category === howto.category);
  const position = siblings.findIndex((h) => h.file === howto.file);
  const previous = position > 0 ? siblings[position - 1] : null;
  const next = position >= 0 ? (siblings[position + 1] ?? null) : null;
  const categoryName =
    categories.find((c) => c.name === howto.category)?.title ??
    howto.category.replace(/-/g, " ");

  const article = (
    <article
      className="prose dark:prose-invert max-w-none
      prose-headings:font-bold prose-headings:tracking-tight prose-headings:font-sans prose-headings:scroll-mt-24
      prose-h1:text-4xl prose-h1:md:text-5xl
      prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-16 prose-h2:mb-4
      prose-h3:text-xl prose-h3:md:text-2xl
      prose-p:font-mono prose-p:leading-relaxed
      prose-li:font-mono
      prose-strong:font-black
      prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:not-italic prose-blockquote:font-mono
      prose-hr:border-transparent prose-hr:my-4
      prose-a:text-foreground prose-a:font-semibold hover:prose-a:underline
      prose-code:font-mono
      prose-img:rounded-none prose-img:border prose-img:border-border prose-img:max-h-[32rem] prose-img:w-auto prose-img:mx-auto prose-img:my-8
      prose-table:font-mono prose-th:font-sans prose-th:text-sm"
    >
      <MDXRemote
        source={content}
        components={MDX_COMPONENTS}
        options={MDX_OPTIONS}
      />
    </article>
  );

  return (
    <div className="flex-1 bg-background text-foreground min-h-screen">
      <Container className="px-4">
        <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12 xl:gap-16 pt-12 md:pt-16 pb-32">
          <aside className="hidden lg:block">
            <GuideSidebar
              howtos={allGuides}
              categories={categories}
              current={howto}
            />
          </aside>

          <div className="min-w-0">
            <header className="mb-12">
              <div className="flex items-center justify-between gap-4 mb-10">
                <nav
                  aria-label="Breadcrumb"
                  className="flex flex-wrap items-center gap-2 font-mono text-sm text-muted-foreground"
                >
                  <Link
                    href="/howtos"
                    className="hover:text-foreground transition-colors"
                  >
                    How-Tos
                  </Link>
                  <span aria-hidden="true">/</span>
                  <Link
                    href={`/howtos#${howto.category.toLowerCase()}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {categoryName}
                  </Link>
                </nav>
                <ThemeToggle />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] font-sans mb-6 max-w-4xl">
                {meta.title ?? slug}
              </h1>

              {meta.description && (
                <p className="font-mono text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl mb-6">
                  {meta.description}
                </p>
              )}

              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                {position >= 0 && (
                  <span>
                    Guide {position + 1} of {siblings.length}
                  </span>
                )}
                {position >= 0 && <span aria-hidden="true">·</span>}
                <span>{readingMinutes} min read</span>
                {meta.author && <span>· {meta.author}</span>}
                {formattedDate && <span>· {formattedDate}</span>}
              </p>
            </header>

            <GuideMenu
              howtos={allGuides}
              categories={categories}
              current={howto}
            />

            <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-4">
              <main id="article-content" className="min-w-0 max-w-3xl">
                {article}
              </main>
              {hasToc && (
                <aside className="hidden xl:block">
                  <TableOfContents entries={toc} />
                </aside>
              )}
            </div>

            {(previous || next) && (
              <nav
                aria-label="Previous and next guide"
                className="mt-20 grid max-w-3xl gap-6 sm:grid-cols-2"
              >
                {previous ? (
                  <GuideLink howto={previous} label="Previous" />
                ) : (
                  <span className="hidden sm:block" />
                )}
                {next && <GuideLink howto={next} label="Next" alignEnd />}
              </nav>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

/** A link to the guide before or after this one in its section. */
function GuideLink({
  howto,
  label,
  alignEnd = false,
}: {
  howto: HowtoSummary;
  label: string;
  alignEnd?: boolean;
}) {
  return (
    <Link
      href={howtoHref(howto)}
      className={`group flex flex-col gap-1 ${alignEnd ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground">
        {!alignEnd && (
          <FaArrowLeft className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-1" />
        )}
        {label}
        {alignEnd && (
          <FaArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </span>
      <span className="font-sans text-lg font-bold underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] duration-200 group-hover:decoration-2">
        {howto.meta.title ?? howto.slug}
      </span>
    </Link>
  );
}
