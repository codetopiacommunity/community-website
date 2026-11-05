import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { type HowtoCategory, type HowtoSummary, howtoHref } from "@/lib/howtos";

type GuideNavProps = {
  howtos: HowtoSummary[];
  categories: HowtoCategory[];
  current: HowtoSummary;
};

/** Every guide, grouped by section, with the one being read marked. */
function GuideList({ howtos, categories, current }: GuideNavProps) {
  const byCategory = howtos.reduce<Record<string, HowtoSummary[]>>((acc, h) => {
    if (!acc[h.category]) acc[h.category] = [];
    acc[h.category].push(h);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(byCategory).map(([category, items]) => (
        <div key={category}>
          <p className="font-sans text-sm font-bold mb-3">
            {categories.find((c) => c.name === category)?.title ??
              category.replace(/-/g, " ")}
          </p>
          <ul className="flex flex-col border-l border-border">
            {items.map((h) => {
              const active =
                h.file === current.file && h.category === current.category;
              return (
                <li key={h.file}>
                  <Link
                    href={howtoHref(h)}
                    aria-current={active ? "page" : undefined}
                    className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors duration-200 ${
                      active
                        ? "border-foreground font-semibold text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {h.meta.title ?? h.slug}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** The guide list down the left on a computer. */
export function GuideSidebar(props: GuideNavProps) {
  return (
    <nav aria-label="All guides" className="sticky top-28">
      <GuideList {...props} />
    </nav>
  );
}

/** The same list on a phone, folded into an "All guides" menu above the guide. */
export function GuideMenu(props: GuideNavProps) {
  return (
    <details className="group mb-10 border border-border rounded-none lg:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-sans text-base font-bold transition-colors duration-200 hover:bg-foreground/[0.03] [&::-webkit-details-marker]:hidden">
        See all guides
        <ChevronDown
          aria-hidden="true"
          className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <nav
        aria-label="All guides"
        className="border-t border-border px-4 pb-6 pt-4"
      >
        <GuideList {...props} />
      </nav>
    </details>
  );
}
