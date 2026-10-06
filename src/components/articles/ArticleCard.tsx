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
      className="group flex flex-col bg-background border border-border hover:border-foreground transition-colors duration-200 overflow-hidden"
    >
      {/* Cover Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
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
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              No Cover
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Tags */}
        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {visibleTags.map((tag) => (
              <span
                key={tag.slug}
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-background bg-foreground px-2 py-0.5"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-black text-foreground uppercase tracking-tighter text-xl leading-tight font-sans group-hover:text-muted-foreground transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="font-mono text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {article.brief}
        </p>

        {/* Meta */}
        <div className="mt-auto flex flex-col gap-2 pt-3 border-t border-border">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>{formattedDate}</span>
            <span>{article.readTimeInMinutes} min read</span>
          </div>
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>{article.author.name}</span>
            <span className="inline-flex items-center gap-1 group-hover:text-foreground transition-colors">
              Read on Hashnode
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
