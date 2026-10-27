import Link from "next/link";
import { type HowtoSummary, howtoHref } from "@/lib/howtos";

/** One guide in the "All guides" list: an underlined title, what it covers, and the reading time. */
export function HowtoRow({ howto }: { howto: HowtoSummary }) {
  return (
    <li className="flex flex-col gap-1">
      <Link
        href={howtoHref(howto)}
        className="font-sans text-base font-bold underline decoration-1 underline-offset-4 transition-all duration-200 hover:decoration-2 sm:text-lg"
      >
        {howto.meta.title ?? howto.slug}
      </Link>
      {howto.meta.description && (
        <span className="font-mono text-[15px] leading-relaxed text-foreground/70">
          {howto.meta.description}
        </span>
      )}
      <span className="font-mono text-xs text-muted-foreground">
        {howto.minutes} min read
      </span>
    </li>
  );
}
