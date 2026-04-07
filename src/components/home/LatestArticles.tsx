import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { prisma } from "@/../prisma/prisma";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Container } from "@/components/layout/Container";
import { fetchArticles } from "@/lib/hashnode";

export const revalidate = 3600;

export async function LatestArticles() {
  const config = await prisma.articlesConfig.findUnique({ where: { id: 1 } });

  if (!config || !config.hashnodeHost) return null;

  const articles = await fetchArticles(config.hashnodeHost);

  const latest = articles
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section className="w-full py-32 bg-black flex flex-col border-t border-zinc-900">
      <Container className="w-full px-4 font-sans">
        <div className="w-full mb-16 text-left">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter mb-6 leading-none font-sans">
            LATEST <span className="text-zinc-600">ARTICLES</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-mono max-w-2xl">
            Insights, tutorials, and stories from the Codetopia community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {latest.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              href={`/articles/${article.slug}`}
            />
          ))}
        </div>

        <div className="flex justify-start">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white border border-zinc-700 hover:border-white hover:bg-white hover:text-black px-6 py-3 transition-colors duration-200 group"
          >
            View all articles <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
