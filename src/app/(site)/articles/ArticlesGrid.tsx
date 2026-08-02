"use client";

import { Filter, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import type { HashnodeArticle } from "@/lib/hashnode";

export interface ArticlesGridProps {
  articles: HashnodeArticle[];
  featuredSlugs: string[];
}

export function ArticlesGrid({ articles }: ArticlesGridProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [tagMenuOpen, setTagMenuOpen] = useState(false);
  const [tagQuery, setTagQuery] = useState("");
  const tagMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tagMenuOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!tagMenuRef.current?.contains(event.target as Node)) {
        setTagMenuOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setTagMenuOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [tagMenuOpen]);

  // Ranked by how many articles use them, so the tags worth filtering by
  // surface first inside the panel instead of sitting in fetch order.
  const tagCounts = articles.reduce((map, a) => {
    for (const t of a.tags) map.set(t.slug, (map.get(t.slug) ?? 0) + 1);
    return map;
  }, new Map<string, number>());

  const allTags = Array.from(
    articles
      .reduce((map, a) => {
        for (const t of a.tags) map.set(t.slug, t);
        return map;
      }, new Map<string, (typeof articles)[0]["tags"][0]>())
      .values(),
  ).sort((a, b) => (tagCounts.get(b.slug) ?? 0) - (tagCounts.get(a.slug) ?? 0));

  const activeTagData = allTags.find((t) => t.slug === activeTag);

  const menuTags = tagQuery.trim()
    ? allTags.filter((tag) =>
        tag.name.toLowerCase().includes(tagQuery.trim().toLowerCase()),
      )
    : allTags;

  function selectTag(slug: string) {
    setActiveTag(activeTag === slug ? null : slug);
    setTagMenuOpen(false);
    setTagQuery("");
  }

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
          aria-label="Search articles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full md:max-w-sm bg-background border border-border text-foreground font-mono text-sm px-4 py-2 placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
        />

        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 border transition-colors duration-150 ${
                activeTag === null
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
              }`}
            >
              All
            </button>

            {/* Pinned so the active filter stays visible once the panel
                that picked it is closed. */}
            {activeTagData && (
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 border bg-foreground text-background border-foreground"
              >
                {activeTagData.name}
                <X className="w-3 h-3" />
              </button>
            )}

            <div className="relative" ref={tagMenuRef}>
              <button
                type="button"
                onClick={() => setTagMenuOpen((open) => !open)}
                className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 border transition-colors duration-150 ${
                  tagMenuOpen
                    ? "border-foreground text-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                <Filter className="w-3 h-3" />
                Filter by tag
              </button>

              {tagMenuOpen && (
                <div className="absolute z-20 top-full left-0 mt-2 w-72 bg-background border border-border p-3 flex flex-col gap-3">
                  <input
                    type="text"
                    value={tagQuery}
                    onChange={(e) => setTagQuery(e.target.value)}
                    placeholder="Search tags..."
                    className="w-full bg-background border border-border text-foreground font-mono text-xs px-2.5 py-1.5 placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                  <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto">
                    {menuTags.length === 0 ? (
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground px-1 py-1">
                        No matching tags.
                      </p>
                    ) : (
                      menuTags.map((tag) => (
                        <button
                          key={tag.slug}
                          type="button"
                          onClick={() => selectTag(tag.slug)}
                          className={`font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 border transition-colors duration-150 ${
                            activeTag === tag.slug
                              ? "bg-foreground text-background border-foreground"
                              : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                          }`}
                        >
                          {tag.name}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground px-2">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
      </p>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6 select-none">
          <div className="w-20 h-20 border border-border flex items-center justify-center">
            <span className="font-mono text-muted-foreground text-2xl font-black">
              ?
            </span>
          </div>
          <div className="text-center space-y-2">
            <p className="text-foreground font-black uppercase tracking-tighter text-xl font-sans">
              No articles found
            </p>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest max-w-xs">
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
