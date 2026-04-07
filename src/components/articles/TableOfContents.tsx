import type { TocEntry } from "@/lib/toc";

export interface TableOfContentsProps {
  entries: TocEntry[];
}

const indentClass: Record<number, string> = {
  1: "pl-0",
  2: "pl-0",
  3: "pl-3",
  4: "pl-6",
  5: "pl-9",
  6: "pl-12",
};

export function TableOfContents({ entries }: TableOfContentsProps) {
  if (entries.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 border border-border bg-background p-4 font-mono"
    >
      <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Contents
      </p>
      <ul className="space-y-1">
        {entries.map((entry) => (
          <li key={entry.id} className={indentClass[entry.level] ?? "pl-0"}>
            <a
              href={`#${entry.id}`}
              className="block text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 leading-snug py-0.5 truncate"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
