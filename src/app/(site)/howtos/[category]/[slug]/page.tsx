import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FaArrowLeft } from "react-icons/fa6";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";
import type { PluggableList } from "unified";
import { TableOfContents } from "@/components/articles/TableOfContents";
import { CodeBlock } from "@/components/howtos/CodeBlock";
import { HowtoRow } from "@/components/howtos/HowtoRow";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  estimateReadingTime,
  getHowtoRaw,
  getHowtosByCategory,
  type HowtoMeta,
} from "@/lib/howtos";
import { extractMarkdownToc } from "@/lib/toc";

export const revalidate = 60;

const MDX_COMPONENTS = { pre: CodeBlock };

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
        },
      ],
    ] as PluggableList,
  },
};

export default async function HowtoPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const raw = await getHowtoRaw(category, slug).catch(() => null);
  if (!raw) notFound();

  const { content, data } = matter(raw);
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

  const relatedGuides = (await getHowtosByCategory(category).catch(() => []))
    .filter((h) => h.slug !== slug)
    .slice(0, 3);

  const article = (
    <article
      className="prose dark:prose-invert max-w-none
      prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-sans prose-headings:scroll-mt-24
      prose-h1:text-4xl prose-h1:md:text-5xl
      prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-16 prose-h2:mb-4
      prose-h3:text-xl prose-h3:md:text-2xl
      prose-p:font-mono prose-p:leading-relaxed
      prose-li:font-mono
      prose-strong:font-black
      prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:not-italic prose-blockquote:font-mono
      prose-hr:border-border prose-hr:my-12
      prose-a:text-foreground prose-a:font-semibold hover:prose-a:underline
      prose-code:font-mono
      prose-img:rounded-none prose-img:border prose-img:border-border prose-img:max-h-[32rem] prose-img:w-auto prose-img:mx-auto prose-img:my-8
      prose-table:font-mono prose-th:font-sans prose-th:uppercase prose-th:tracking-widest prose-th:text-xs"
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
      <section className="pt-16 pb-8 border-b border-border">
        <Container className="px-4">
          <div className="max-w-6xl mx-auto px-2">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/howtos"
                className="inline-flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase tracking-widest hover:text-foreground transition-colors group"
              >
                <FaArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                How-tos
              </Link>
              <ThemeToggle />
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {category.replace(/-/g, " ")}
            </p>

            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none font-sans mb-8">
              {meta.title ?? slug}
            </h1>

            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {meta.author && <span>{meta.author}</span>}
              {meta.author && formattedDate && <span>·</span>}
              {formattedDate && <span>{formattedDate}</span>}
              {(meta.author || formattedDate) && <span>·</span>}
              <span>{readingMinutes} min read</span>
            </div>
          </div>
        </Container>
      </section>

      <section className={`py-12 ${relatedGuides.length > 0 ? "" : "pb-32"}`}>
        <Container className="px-4">
          <div className="max-w-6xl mx-auto px-2">
            {hasToc ? (
              <div className="lg:grid lg:grid-cols-[1fr_280px] gap-12">
                <main id="article-content" className="min-w-0">
                  {article}
                </main>
                <aside className="hidden lg:block">
                  <TableOfContents entries={toc} />
                </aside>
              </div>
            ) : (
              <main id="article-content" className="max-w-3xl mx-auto">
                {article}
              </main>
            )}
          </div>
        </Container>
      </section>

      {relatedGuides.length > 0 && (
        <section className="py-12 border-t border-border pb-32">
          <Container className="px-4">
            <div className="max-w-6xl mx-auto px-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                More in {category.replace(/-/g, " ")}
              </p>
              {relatedGuides.map((howto) => (
                <HowtoRow
                  key={`${howto.category}/${howto.slug}`}
                  howto={howto}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
