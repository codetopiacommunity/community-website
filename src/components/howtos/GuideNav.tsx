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
    <details className="group mb-10 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-2 py-2 font-sans text-base font-bold underline decoration-1 underline-offset-4 [&::-webkit-details-marker]:hidden">
        See all guides
        <span
          aria-hidden="true"
          className="text-base transition-transform duration-200 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <nav aria-label="All guides" className="pb-6 pt-2">
        <GuideList {...props} />
      </nav>
    </details>
  );
}
