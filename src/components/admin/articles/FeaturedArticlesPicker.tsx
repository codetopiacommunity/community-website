"use client";

import { AlertCircle, BookOpen, Loader2, Star, StarOff } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getHashnodeArticles } from "@/actions/articles";
import type { HashnodeArticle } from "@/lib/hashnode";

interface FeaturedArticlesPickerProps {
  hashnodeHost: string;
  featuredSlugs: string[];
  onSuccess: () => void;
}

const LIMIT = 3;

export function FeaturedArticlesPicker({
  hashnodeHost,
  featuredSlugs,
  onSuccess,
}: FeaturedArticlesPickerProps) {
  const [articles, setArticles] = useState<HashnodeArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHashnodeArticles(hashnodeHost);
      setArticles(data);
    } catch {
      setError(
        "Failed to load articles from Hashnode. Check your publication host and try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [hashnodeHost]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const updateFeatured = async (newSlugs: string[]) => {
    const res = await fetch("/api/admin/articles/featured", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featuredSlugs: newSlugs }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error ?? "Failed to update featured articles");
    }
  };

  const handleFeature = async (slug: string) => {
    if (featuredSlugs.length >= LIMIT) return;
    setPending(slug);
    try {
      await updateFeatured([...featuredSlugs, slug]);
      toast.success("Article featured");
      onSuccess();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to feature article");
    } finally {
      setPending(null);
    }
  };

  const handleUnfeature = async (slug: string) => {
    setPending(slug);
    try {
      await updateFeatured(featuredSlugs.filter((s) => s !== slug));
      toast.success("Article unfeatured");
      onSuccess();
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Failed to unfeature article",
      );
    } finally {
      setPending(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 gap-3 text-zinc-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-[10px] uppercase tracking-widest font-mono font-medium">
          Loading articles…
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <AlertCircle className="h-8 w-8 text-red-400" />
        <p className="text-[11px] font-mono text-zinc-500 max-w-sm">{error}</p>
        <button
          type="button"
          onClick={loadArticles}
          className="text-[10px] uppercase tracking-widest font-mono font-bold text-black border border-black px-6 h-9 rounded-none hover:bg-black hover:text-white transition-all active:scale-[0.98]"
        >
          Retry
        </button>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <BookOpen className="h-8 w-8 text-zinc-300" />
        <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
          No articles found
        </p>
      </div>
    );
  }

  const atLimit = featuredSlugs.length >= LIMIT;

  return (
    <div className="space-y-3">
      {atLimit && (
        <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 border border-zinc-200 bg-zinc-50 rounded-none px-4 py-2.5">
          Featured limit reached — unfeature an article to add another.
        </p>
      )}

      <ul className="space-y-2">
        {articles.map((article) => {
          const isFeatured = featuredSlugs.includes(article.slug);
          const isLoading = pending === article.slug;

          return (
            <li
              key={article.slug}
              className={[
                "flex items-center gap-4 rounded-none border px-4 py-3 transition-all",
                isFeatured
                  ? "border-black bg-black/[0.03]"
                  : "border-zinc-100 bg-white hover:border-zinc-200",
              ].join(" ")}
            >
              {/* Cover thumbnail */}
              <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-none bg-zinc-100">
                {article.coverImage?.url ? (
                  <Image
                    src={article.coverImage.url}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="h-full w-full bg-zinc-200" />
                )}
              </div>

              {/* Meta */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {isFeatured && (
                    <span className="shrink-0 text-[9px] font-mono font-bold uppercase tracking-widest bg-black text-white px-2 py-0.5 rounded-none">
                      Featured
                    </span>
                  )}
                  <p className="truncate text-[11px] font-mono font-semibold text-black">
                    {article.title}
                  </p>
                </div>
                <p className="mt-0.5 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  {article.author.name} &middot; {article.readTimeInMinutes}m
                  read
                </p>
              </div>

              {/* Action button */}
              <button
                type="button"
                disabled={isLoading || (!isFeatured && atLimit)}
                onClick={() =>
                  isFeatured
                    ? handleUnfeature(article.slug)
                    : handleFeature(article.slug)
                }
                className={[
                  "shrink-0 flex items-center gap-1.5 h-8 px-4 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest transition-all active:scale-[0.97]",
                  isFeatured
                    ? "bg-black text-white hover:bg-zinc-800"
                    : atLimit
                      ? "border border-zinc-200 text-zinc-300 cursor-not-allowed"
                      : "border border-black text-black hover:bg-black hover:text-white",
                ].join(" ")}
              >
                {isLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : isFeatured ? (
                  <>
                    <StarOff className="h-3 w-3" />
                    Unfeature
                  </>
                ) : (
                  <>
                    <Star className="h-3 w-3" />
                    Feature
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
