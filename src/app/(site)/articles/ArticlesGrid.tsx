"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import type { HashnodeArticle } from "@/lib/hashnode";

export interface ArticlesGridProps {
  articles: HashnodeArticle[];
  featuredSlugs: string[];
}

export function ArticlesGrid({ articles }: ArticlesGridProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect unique tags across all articles
  const allTags = Array.from(
    new Map(articles.flatMap((a) => a.tags).map((t) => [t.slug, t])).values(),
  );

  const filtered = articles.filter((article) => {
    const matchesSearch =
      search.trim() === "" ||
      article.title.toLowerCase().includes(search.trim().toLowerCase());
    const matchesTag =
      activeTag === null || article.tags.some((t) => t.slug === activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Search + Tag filters */}
      <div className="flex flex-col gap-4 px-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full md:max-w-sm bg-black border border-zinc-800 text-white font-mono text-sm px-4 py-2 placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
        />

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 border transition-colors duration-150 ${
                activeTag === null
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-400 hover:text-white"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag.slug}
                type="button"
                onClick={() =>
                  setActiveTag(activeTag === tag.slug ? null : tag.slug)
                }
                className={`font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 border transition-colors duration-150 ${
                  activeTag === tag.slug
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-400 hover:text-white"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 px-2">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
      </p>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6 select-none">
          <div className="w-20 h-20 border border-zinc-800 flex items-center justify-center">
            <span className="font-mono text-zinc-700 text-2xl font-black">
              ?
            </span>
          </div>
          <div className="text-center space-y-2">
            <p className="text-white font-black uppercase tracking-tighter text-xl font-sans">
              No articles found
            </p>
            <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest max-w-xs">
              Try a different search term or clear the tag filter.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              href={`/articles/${article.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
