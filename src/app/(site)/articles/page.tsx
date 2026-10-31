import { prisma } from "@/../prisma/prisma";
import { FeaturedCarousel } from "@/components/articles/FeaturedCarousel";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
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
        <PageHeader title="Articles" themed action={<ThemeToggle />} />
        <section className="py-16 pb-32">
          <Container className="px-4">
            <div className="flex flex-col items-center justify-center py-32 gap-6 select-none">
              <div className="w-24 h-24 border border-border flex items-center justify-center">
                <span className="font-mono text-muted-foreground text-3xl font-bold">
                  {"//"}
                </span>
              </div>
              <div className="text-center space-y-2">
                <p className="uppercase tracking-tighter text-foreground font-bold text-2xl font-sans">
                  Not configured
                </p>
                <p className="uppercase tracking-widest text-muted-foreground font-sans text-xs max-w-xs">
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
      <PageHeader title="Articles" themed action={<ThemeToggle />}>
        Writing by members of the community.
      </PageHeader>

      {/* Featured Carousel */}
      {featuredArticles.length > 0 && (
        <section>
          <Container className="px-4 py-8">
            <p className="uppercase tracking-widest font-sans text-xs text-muted-foreground mb-4 px-2">
              Featured
            </p>
            <FeaturedCarousel articles={featuredArticles} />
          </Container>
        </section>
      )}

      {/* Articles Grid */}
      <section className="pb-32">
        <Container className="px-4 py-12">
          <ArticlesGrid articles={articles} featuredSlugs={featuredSlugs} />
        </Container>
      </section>
    </div>
  );
}
