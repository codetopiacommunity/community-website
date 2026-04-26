"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { FeaturedArticlesPicker } from "@/components/admin/articles/FeaturedArticlesPicker";
import { PublicationHostForm } from "@/components/admin/articles/PublicationHostForm";
import type { ArticlesConfig } from "@/types";

export default function ManageArticlesPage() {
  const [config, setConfig] = useState<ArticlesConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch("/api/admin/articles/config");
      if (res.ok) {
        const data = await res.json();
        setConfig(data ?? null);
      }
    } catch {
      toast.error("Failed to load articles config");
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="pb-8 border-b border-zinc-100">
        <h1 className="font-sans font-black uppercase text-2xl tracking-widest text-zinc-900">
          Manage Articles
        </h1>
        <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1">
          Configure Hashnode integration and manage featured articles
        </p>
      </div>

      {/* Publication Host Section */}
      <section className="space-y-3">
        <div>
          <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900">
            Publication Host
          </h2>
          <p className="font-mono text-xs text-zinc-400 mt-0.5">
            Set your Hashnode publication host to enable article fetching
          </p>
        </div>
        <div className="border border-zinc-200 p-6 bg-white">
          {!loading && (
            <PublicationHostForm
              hashnodeHost={config?.hashnodeHost ?? null}
              onSuccess={() => fetchConfig(true)}
            />
          )}
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="space-y-3">
        <div>
          <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900">
            Featured Articles
          </h2>
          <p className="font-mono text-xs text-zinc-400 mt-0.5">
            Select up to 3 articles to feature on the articles page
          </p>
        </div>
        <div className="border border-zinc-200 p-6 bg-white">
          {loading ? null : config?.hashnodeHost ? (
            <FeaturedArticlesPicker
              hashnodeHost={config.hashnodeHost}
              featuredSlugs={config.featuredSlugs ?? []}
              onSuccess={() => fetchConfig(true)}
            />
          ) : (
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest py-8 text-center">
              Configure a publication host above to manage featured articles
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
