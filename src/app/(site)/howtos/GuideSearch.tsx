"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export interface GuideLink {
  title: string;
  description?: string;
  href: string;
  category: string;
}

/** The search box at the top of /howtos. Matching guides show right under it. */
export function GuideSearch({ guides }: { guides: GuideLink[] }) {
  const [search, setSearch] = useState("");

  const term = search.trim().toLowerCase();
  const matches =
    term === ""
      ? []
      : guides.filter(
          (g) =>
            g.title.toLowerCase().includes(term) ||
            (g.description ?? "").toLowerCase().includes(term),
        );

  return (
    <div className="relative w-full md:max-w-sm">
      <label className="flex items-center gap-3 border border-border bg-background px-4 py-3 transition-colors focus-within:border-foreground">
        <Search
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-muted-foreground"
        />
        <input
          type="search"
          aria-label="Search guides"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search guides, like Discord or event"
          className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </label>

      {term !== "" && (
        <div className="absolute inset-x-0 top-full z-20 max-h-96 overflow-y-auto border border-t-0 border-border bg-background">
          {matches.length === 0 ? (
            <p className="px-4 py-4 font-mono text-sm text-muted-foreground">
              No guides match "{search.trim()}". Try one word, like Discord or
              event.
            </p>
          ) : (
            <ul>
              {matches.map((g) => (
                <li key={g.href}>
                  <Link
                    href={g.href}
                    className="flex flex-col gap-0.5 px-4 py-3 transition-colors duration-200 hover:bg-foreground/[0.03]"
                  >
                    <span className="font-sans text-sm font-bold">
                      {g.title}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {g.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
