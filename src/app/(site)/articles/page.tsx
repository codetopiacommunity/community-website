import { prisma } from "@/../prisma/prisma";
import { FeaturedCarousel } from "@/components/articles/FeaturedCarousel";
import { Container } from "@/components/layout/Container";
import { fetchArticles, type HashnodeArticle } from "@/lib/hashnode";
import { ArticlesGrid } from "./ArticlesGrid";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const config = await prisma.articlesConfig.findUnique({ where: { id: 1 } });

  const hasHost = config?.hashnodeHost && config.hashnodeHost.trim() !== "";

  if (!hasHost) {
    return (
      <div className="flex-1 bg-black text-white min-h-screen">
        <section className="w-full pt-32 pb-16 bg-black">
          <Container className="px-4">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
              ARTICLES
            </h1>
          </Container>
        </section>
        <section className="py-16 border-t border-zinc-900 pb-32">
          <Container className="px-4">
            <div className="flex flex-col items-center justify-center py-32 gap-6 select-none">
              <div className="w-24 h-24 border border-zinc-800 flex items-center justify-center">
                <span className="font-mono text-zinc-700 text-3xl font-black">
                  {"//"}
                </span>
              </div>
              <div className="text-center space-y-2">
                <p className="text-white font-black uppercase tracking-tighter text-2xl font-sans">
                  Not configured
                </p>
                <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest max-w-xs">
                  No Hashnode publication has been linked yet. Configure one in
                  the admin settings.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  const host = config.hashnodeHost.trim();
  const featuredSlugs: string[] = Array.isArray(config.featuredSlugs)
    ? (config.featuredSlugs as string[])
    : [];

  let articles: HashnodeArticle[] = [];
  try {
    articles = await fetchArticles(host);
  } catch {
    // Silently fall through to empty state
  }

  const featuredArticles =
    featuredSlugs.length > 0
      ? articles.filter((a) => featuredSlugs.includes(a.slug))
      : [];

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Header */}
      <section className="w-full pt-32 pb-16 bg-black">
        <Container className="px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 px-2">
            <div className="flex-1">
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
                ARTICLES
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed max-w-2xl">
                Insights, tutorials, and stories from the Codetopia community.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Carousel */}
      {featuredArticles.length > 0 && (
        <section className="border-t border-zinc-900">
          <Container className="px-4 py-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4 px-2">
              Featured
            </p>
            <FeaturedCarousel articles={featuredArticles} />
          </Container>
        </section>
      )}

      {/* Articles Grid */}
      <section className="border-t border-zinc-900 pb-32">
        <Container className="px-4 py-12">
          <ArticlesGrid articles={articles} featuredSlugs={featuredSlugs} />
        </Container>
      </section>
    </div>
  );
}
