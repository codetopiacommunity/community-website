import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { HowtoSummary } from "@/lib/howtos";

export function HowtoRow({ howto }: { howto: HowtoSummary }) {
  const formattedDate = howto.meta.date
    ? new Date(howto.meta.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <Link
      href={`/howtos/${howto.category}/${howto.slug}`}
      className="group flex items-start justify-between gap-6 py-5 border-t border-border -mx-4 px-4 md:mx-0 md:px-0 hover:bg-foreground/[0.03] transition-colors"
    >
      <div className="flex flex-col gap-1.5">
        <span className="font-sans font-black text-lg md:text-xl uppercase tracking-tighter">
          {howto.meta.title ?? howto.slug}
        </span>
        {howto.meta.description && (
          <span className="font-mono text-sm text-muted-foreground line-clamp-2 normal-case tracking-normal">
            {howto.meta.description}
          </span>
        )}
        {(howto.meta.author || formattedDate) && (
          <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
            {howto.meta.author && <span>{howto.meta.author}</span>}
            {howto.meta.author && formattedDate && <span>·</span>}
            {formattedDate && <span>{formattedDate}</span>}
          </div>
        )}
      </div>
      <ArrowUpRight className="shrink-0 mt-1 w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
    </Link>
  );
}
