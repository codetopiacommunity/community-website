import { prisma } from "@/../prisma/prisma";
import { FeaturedCarousel } from "@/components/articles/FeaturedCarousel";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { fetchArticles, type HashnodeArticle } from "@/lib/hashnode";
import { ArticlesGrid } from "./ArticlesGrid";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  let config = null;
  try {
    config = await prisma.articlesConfig.findUnique({ where: { id: 1 } });
  } catch (error) {
    console.error("ArticlesPage: failed to fetch config", error);
  }

  const hasHost = config?.hashnodeHost && config.hashnodeHost.trim() !== "";

  if (!hasHost) {
    return (
      <div className="flex-1 bg-background text-foreground min-h-screen">
        <section className="w-full py-32 md:py-40 bg-background border-b border-border">
          <Container className="px-4 flex flex-col gap-8">
            <div className="flex items-end justify-between gap-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-sans">
                Articles
              </h1>
              <ThemeToggle />
            </div>
          </Container>
        </section>
        <section className="py-16 border-t border-border pb-32">
          <Container className="px-4">
            <div className="flex flex-col items-center justify-center py-32 gap-6 select-none">
              <div className="w-24 h-24 border border-border flex items-center justify-center">
                <span className="font-mono text-muted-foreground text-3xl font-black">
                  {"//"}
                </span>
              </div>
              <div className="text-center space-y-2">
                <p className="text-foreground font-black uppercase tracking-tighter text-2xl font-sans">
                  Not configured
                </p>
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest max-w-xs">
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

  const host = config?.hashnodeHost.trim() ?? "";
  const featuredSlugs: string[] = Array.isArray(config?.featuredSlugs)
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
    <div className="flex-1 bg-background text-foreground min-h-screen">
      {/* Header */}
      <section className="w-full py-32 md:py-40 bg-background border-b border-border">
        <Container className="px-4 flex flex-col gap-8">
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-sans">
                Articles
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl font-mono leading-relaxed max-w-2xl">
                Insights, tutorials, and stories from the Codetopia community.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </Container>
      </section>

      {/* Featured Carousel */}
      {featuredArticles.length > 0 && (
        <section className="border-t border-border">
          <Container className="px-4 py-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 px-2">
              Featured
            </p>
            <FeaturedCarousel articles={featuredArticles} />
          </Container>
        </section>
      )}

      {/* Articles Grid */}
      <section className="border-t border-border pb-32">
        <Container className="px-4 py-12">
          <ArticlesGrid articles={articles} featuredSlugs={featuredSlugs} />
        </Container>
      </section>
    </div>
  );
}
