"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/toc";

export interface TableOfContentsProps {
  entries: TocEntry[];
}

export function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.getElementById("article-content");
    if (!article) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -95% 0px" }
    );

    observer.observe(article);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (obs) => {
        for (const entry of obs) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    for (const { id } of entries) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={`fixed right-8 top-28 z-20 hidden xl:block w-56 transition-opacity duration-300 ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70 mb-3">
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-border">
        {entries.map((entry) => {
          const indent = entry.level > 2 ? (entry.level - 2) * 12 : 0;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={`block py-1 text-[13px] leading-snug transition-colors border-l -ml-px ${
                  activeId === entry.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                style={{ paddingLeft: `${12 + indent}px` }}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
