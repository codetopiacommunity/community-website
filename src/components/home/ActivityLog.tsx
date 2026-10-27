import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { type ActivityEntry, getRecentActivity } from "@/lib/activity";
import { JOIN_URL } from "@/lib/data/links";
import { SectionTitle } from "./SectionTitle";

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** The home page log: what members did lately, newest first. */
export async function ActivityLog() {
  const entries = await getRecentActivity(10);
  if (entries.length === 0) return null;

  return (
    <section className="w-full border-t border-zinc-900 bg-black">
      <Container className="px-4 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <SectionTitle>The log</SectionTitle>
          <p className="mt-4 font-mono text-lg leading-relaxed text-zinc-400">
            What members have done lately, newest first.
          </p>
        </div>

        <ol className="border-b border-zinc-900">
          {entries.map((entry) => (
            <LogRow
              key={`${entry.kind}-${entry.href}-${entry.date.toISOString()}`}
              entry={entry}
            />
          ))}
        </ol>

        <p className="mt-10 max-w-2xl font-mono text-base leading-relaxed text-zinc-400">
          Everything here was done by members.{" "}
          <Link
            href={JOIN_URL}
            className="font-sans font-bold text-white underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] duration-200 hover:decoration-2"
          >
            Join
          </Link>
          , and what you do shows up on your own record.
        </p>
      </Container>
    </section>
  );
}

function LogRow({ entry }: { entry: ActivityEntry }) {
  return (
    <li className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-t border-zinc-900 py-5 md:grid-cols-[8rem_minmax(0,1fr)_7rem] md:items-baseline md:gap-x-10">
      <time
        dateTime={entry.date.toISOString()}
        className="col-span-2 font-mono text-sm text-zinc-500 md:col-span-1"
      >
        {DATE_FORMAT.format(entry.date)}
      </time>
      <span className="min-w-0">
        <Link
          href={entry.href}
          {...(entry.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="font-sans text-lg font-bold text-white underline decoration-zinc-700 decoration-1 underline-offset-4 transition-colors duration-200 hover:decoration-white"
        >
          {entry.title}
        </Link>
        {entry.who && (
          <span className="font-mono text-base text-zinc-400">
            {" "}
            · {entry.who}
          </span>
        )}
      </span>
      <span className="font-mono text-sm text-zinc-500 md:text-right">
        {entry.kind}
      </span>
    </li>
  );
}
