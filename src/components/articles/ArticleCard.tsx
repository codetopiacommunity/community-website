import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { HashnodeArticle } from "@/lib/hashnode";

export interface ArticleCardProps {
  article: HashnodeArticle;
}

// Articles are read on Hashnode, so the card links out in a new tab.
export function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );

  const visibleTags = article.tags.slice(0, 3);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-background overflow-hidden"
    >
      {/* Cover Image */}
      <div className="relative w-full aspect-[2/1] overflow-hidden bg-muted">
        {article.coverImage?.url ? (
          <Image
            src={article.coverImage.url}
            alt={article.title}
            fill
            unoptimized
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <span className="uppercase tracking-widest font-sans text-xs text-muted-foreground">
              No cover
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {visibleTags.map((tag) => (
              <span
                key={tag.slug}
                className="uppercase tracking-widest font-sans text-xs text-background bg-foreground px-2 py-0.5"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Title, and who wrote it */}
        <div>
          <h3 className="uppercase tracking-tighter font-bold text-foreground text-xl leading-tight font-sans group-hover:text-muted-foreground transition-colors">
            {article.title}
          </h3>
          <p className="mt-1.5 uppercase tracking-widest font-sans text-xs text-muted-foreground">
            By {article.author.name}
          </p>
        </div>

        {/* Excerpt */}
        <p className="font-mono text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {article.brief}
        </p>

        {/* Meta */}
        <div className="mt-auto uppercase tracking-widest flex items-center justify-between gap-3 font-sans text-xs text-muted-foreground">
          <span>
            {formattedDate} · {article.readTimeInMinutes} min read
          </span>
          <span className="inline-flex items-center gap-1 group-hover:text-foreground transition-colors">
            <span className="sr-only">
              Read on Hashnode (opens in a new tab)
            </span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>
  );
}
