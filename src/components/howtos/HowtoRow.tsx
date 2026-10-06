import Link from "next/link";
import { type HowtoSummary, howtoHref } from "@/lib/howtos";

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
      href={howtoHref(howto)}
      className="group flex items-start justify-between gap-6 py-5 border-t border-border -mx-4 px-4 md:mx-0 md:px-0 hover:bg-foreground/[0.03] transition-colors"
    >
      <div className="flex flex-col gap-1.5">
        <span className="font-sans font-bold text-lg md:text-xl">
          {howto.meta.title ?? howto.slug}
        </span>
        {howto.meta.description && (
          <span className="font-mono text-sm text-muted-foreground line-clamp-2 normal-case tracking-normal">
            {howto.meta.description}
          </span>
        )}
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground mt-0.5">
          <span>{howto.minutes} min read</span>
          {howto.meta.author && <span>·</span>}
          {howto.meta.author && <span>{howto.meta.author}</span>}
          {formattedDate && <span>·</span>}
          {formattedDate && <span>{formattedDate}</span>}
        </div>
      </div>
    </Link>
  );
}
