import { ChevronDown } from "lucide-react";
import type { TocEntry } from "@/lib/toc";

/** The guide's own headings on smaller screens, styled to match GuideMenu. */
export function GuideTocMenu({ entries }: { entries: TocEntry[] }) {
  return (
    <details className="group mb-10 max-w-3xl border border-border rounded-none xl:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-sans text-base font-bold transition-colors duration-200 hover:bg-foreground/[0.03] [&::-webkit-details-marker]:hidden">
        On this page
        <ChevronDown
          aria-hidden="true"
          className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <nav
        aria-label="On this page"
        className="border-t border-border px-4 py-2"
      >
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className="block py-2 text-sm leading-snug text-muted-foreground transition-colors duration-200 hover:text-foreground"
                style={{
                  paddingLeft: `${entry.level > 2 ? (entry.level - 2) * 12 : 0}px`,
                }}
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
