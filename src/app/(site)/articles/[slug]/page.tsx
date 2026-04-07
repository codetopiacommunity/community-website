import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import sanitizeHtml from "sanitize-html";
import { prisma } from "@/../prisma/prisma";
import { ArticleCard } from "@/components/articles/ArticleCard";
import ArticleContent from "@/components/articles/ArticleContent";
import { TableOfContents } from "@/components/articles/TableOfContents";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { fetchArticle, fetchArticles } from "@/lib/hashnode";
import { extractToc, injectHeadingIds } from "@/lib/toc";

export const dynamic = "force-dynamic";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const config = await prisma.articlesConfig.findUnique({ where: { id: 1 } });
  const host = config?.hashnodeHost?.trim();
  if (!host) notFound();

  const article = await fetchArticle(host, slug);
  if (!article) notFound();

  const sanitizedHtml = sanitizeHtml(article.content.html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "pre",
      "code",
      "iframe",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "id", "style"],
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      iframe: ["src", "width", "height", "frameborder", "allowfullscreen"],
    },
  });

  const htmlWithIds = injectHeadingIds(sanitizedHtml);
  const toc = extractToc(htmlWithIds);

  const allArticles = await fetchArticles(host);
  const articleTagSlugs = new Set(article.tags.map((t) => t.slug));
  const relatedArticles = allArticles
    .filter(
      (a) =>
        a.slug !== article.slug &&
        a.tags.some((t) => articleTagSlugs.has(t.slug)),
    )
    .slice(0, 3);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="flex-1 bg-background text-foreground min-h-screen">
      {/* Hero Cover Image */}
      {article.coverImage?.url && (
        <div className="relative h-[50vh] w-full overflow-hidden">
          <Image
            src={article.coverImage.url}
            alt={article.title}
            fill
            unoptimized
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Article Header */}
      <section className="pt-16 pb-8 border-b border-border">
        <Container className="px-4">
          <div className="max-w-6xl mx-auto px-2">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase tracking-widest hover:text-foreground transition-colors group"
              >
                <FaArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                Articles
              </Link>
              <ThemeToggle />
            </div>

            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none font-sans mb-8">
              {article.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {article.author.profilePicture && (
                <div className="relative w-9 h-9 overflow-hidden border border-border flex-shrink-0">
                  <Image
                    src={article.author.profilePicture}
                    alt={article.author.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-xs text-foreground uppercase tracking-widest">
                  {article.author.name}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  {formattedDate}
                </span>
              </div>
              <div className="flex items-center gap-4 ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>{article.readTimeInMinutes} min read</span>
                <span>{article.responseCount} comments</span>
                <span>{article.reactionCount} likes</span>
              </div>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/articles?tag=${tag.slug}`}
                    className="font-mono text-[9px] uppercase tracking-[0.25em] text-background bg-foreground px-2 py-0.5 border border-foreground hover:opacity-80 transition-opacity"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Main Content + Sidebar */}
      <section className="py-12">
        <Container className="px-4">
          <div className="max-w-6xl mx-auto px-2">
            <div
              className={`flex gap-12 ${toc.length >= 3 ? "lg:grid lg:grid-cols-[1fr_280px]" : ""}`}
            >
              {/* Article Content */}
              <main className="min-w-0">
                <ArticleContent html={htmlWithIds} />
              </main>

              {/* Sidebar TOC */}
              {toc.length >= 3 && (
                <aside className="hidden lg:block">
                  <TableOfContents entries={toc} />
                </aside>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Share + Read on Hashnode */}
      <section className="py-10 border-t border-border">
        <Container className="px-4">
          <div className="max-w-6xl mx-auto px-2 flex flex-wrap items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Share
            </span>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(article.url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground border border-border px-4 py-2 hover:border-foreground hover:text-foreground transition-colors"
            >
              X / Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(article.url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground border border-border px-4 py-2 hover:border-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 ml-auto font-mono text-xs uppercase tracking-widest text-muted-foreground border border-border px-4 py-2 hover:border-foreground hover:text-foreground transition-colors group"
            >
              Read on Hashnode <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 border-t border-border pb-32">
          <Container className="px-4">
            <div className="max-w-6xl mx-auto px-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
                Related Articles
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <ArticleCard
                    key={related.slug}
                    article={related}
                    href={`/articles/${related.slug}`}
                  />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
