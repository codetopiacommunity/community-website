"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { FeaturedArticlesPicker } from "@/components/admin/articles/FeaturedArticlesPicker";
import { PublicationHostForm } from "@/components/admin/articles/PublicationHostForm";
import type { ArticlesConfig } from "@/types";

export default function ManageArticlesPage() {
  const [config, setConfig] = useState<ArticlesConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/articles/config");
      if (res.ok) {
        const data = await res.json();
        setConfig(data ?? null);
      }
    } catch {
      toast.error("Failed to load articles config");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
          Manage <span className="text-grey-400">Articles</span>
        </h1>
        <div className="flex items-center gap-2 mt-1 font-mono">
          <p className="text-grey-500 text-[10px] uppercase tracking-widest pl-1 font-medium">
            Configure Hashnode integration and manage featured articles
          </p>
        </div>
      </div>

      {/* Publication Host Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest font-mono text-black">
            Publication Host
          </h2>
          <p className="text-[10px] text-grey-400 font-mono mt-0.5">
            Set your Hashnode publication host to enable article fetching
          </p>
        </div>
        <div className="border border-zinc-100 rounded-2xl p-6 bg-white">
          {!loading && (
            <PublicationHostForm
              hashnodeHost={config?.hashnodeHost ?? null}
              onSuccess={fetchConfig}
            />
          )}
        </div>
      </div>

      {/* Featured Articles Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest font-mono text-black">
            Featured Articles
          </h2>
          <p className="text-[10px] text-grey-400 font-mono mt-0.5">
            Select up to 3 articles to feature on the articles page
          </p>
        </div>
        <div className="border border-zinc-100 rounded-2xl p-6 bg-white">
          {loading ? null : config?.hashnodeHost ? (
            <FeaturedArticlesPicker
              hashnodeHost={config.hashnodeHost}
              featuredSlugs={config.featuredSlugs ?? []}
              onSuccess={fetchConfig}
            />
          ) : (
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest py-8 text-center">
              Configure a publication host above to manage featured articles
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
