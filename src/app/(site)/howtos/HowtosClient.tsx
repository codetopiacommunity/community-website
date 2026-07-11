"use client";

import { useState } from "react";
import { HowtoRow } from "@/components/howtos/HowtoRow";
import { Container } from "@/components/layout/Container";
import type { HowtoSummary } from "@/lib/howtos";

export function HowtosClient({
  howtos,
  categories,
}: {
  howtos: HowtoSummary[];
  categories: string[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = howtos.filter((h) => {
    const matchesCat = activeCategory === null || h.category === activeCategory;
    const term = search.trim().toLowerCase();
    const matchesSearch =
      term === "" ||
      (h.meta.title ?? h.slug).toLowerCase().includes(term) ||
      (h.meta.description ?? "").toLowerCase().includes(term);
    return matchesCat && matchesSearch;
  });

  const byCategory = filtered.reduce<Record<string, HowtoSummary[]>>(
    (acc, h) => {
      if (!acc[h.category]) acc[h.category] = [];
      acc[h.category].push(h);
      return acc;
    },
    {},
  );

  const toggleCategory = (cat: string) =>
    setActiveCategory((prev) => (prev === cat ? null : cat));

  return (
    <section className="pb-32">
      <Container className="px-4">
        {/* Mobile: horizontal category chips */}
        {categories.length > 0 && (
          <div className="lg:hidden flex gap-2 overflow-x-auto py-6 border-b border-border -mx-4 px-4">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                activeCategory === null
                  ? "bg-foreground text-background border-foreground"
                  : "text-muted-foreground border-border hover:border-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`shrink-0 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-16 pt-12">
          {/* Desktop sticky sidebar */}
          {categories.length > 0 && (
            <aside className="hidden lg:block w-44 shrink-0">
              <div className="sticky top-28 flex flex-col gap-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Categories
                </p>
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className={`text-left font-mono text-xs uppercase tracking-widest py-2 border-l-2 pl-3 transition-colors ${
                    activeCategory === null
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  All guides
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`text-left font-mono text-xs uppercase tracking-widest py-2 border-l-2 pl-3 transition-colors ${
                      activeCategory === cat
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    {cat.replace(/-/g, " ")}
                  </button>
                ))}
              </div>
            </aside>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search */}
            <div className="mb-10">
              <input
                type="text"
                aria-label="Search how-tos"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guides..."
                className="w-full md:max-w-sm bg-background border border-border text-foreground font-mono text-sm px-4 py-2 placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            {/* Empty state */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 gap-6 select-none">
                <div className="w-20 h-20 border border-border flex items-center justify-center">
                  <span className="font-mono text-muted-foreground text-2xl font-black">
                    {"//"}
                  </span>
                </div>
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
                  No guides match your search.
                </p>
              </div>
            ) : (
              Object.entries(byCategory).map(([category, items]) => (
                <div
                  key={category}
                  className="border-b border-border pt-4 pb-2 mb-4"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {items.length} {items.length === 1 ? "guide" : "guides"}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter font-sans mb-6">
                    {category.replace(/-/g, " ")}
                  </h2>

                  {items.map((howto) => (
                    <HowtoRow
                      key={`${howto.category}/${howto.slug}`}
                      howto={howto}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
