import { CircleCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

/*
 * Components howto guides can use in their MDX. They make things a beginner
 * has to recognise on screen look like what they are:
 *
 *   <Command>/link</Command>             a Discord slash command to type
 *   <Button>Create Account</Button>      a button to click or tap
 *   <Key>Shift</Key> + <Key>Enter</Key>  keyboard keys
 *   <Channel>ask-for-help</Channel>      a Discord channel
 *
 * and give guides structure:
 *
 *   <Steps> <Step title href time>…</Step> </Steps>   numbered step cards
 *   <Cards> <Card title href>…</Card> </Cards>        a grid of action cards
 *   <DoneWhen>…</DoneWhen>                            how you know you are done
 */

export function Command({ children }: { children: ReactNode }) {
  return (
    // A span, not <code>: the site's inline-code rule (.prose code) would
    // otherwise override these colours.
    <span className="inline-block rounded-none bg-foreground px-1.5 py-0.5 font-mono text-[0.85em] font-semibold whitespace-nowrap text-background">
      {children}
    </span>
  );
}

export function Channel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-none bg-muted px-1 font-sans text-[0.95em] font-semibold whitespace-nowrap">
      <span aria-hidden="true" className="opacity-70">
        #
      </span>
      <span className="sr-only">channel </span>
      {children}
    </span>
  );
}

export function Button({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-none border border-foreground bg-background px-2 py-0.5 font-sans text-[0.85em] font-bold whitespace-nowrap">
      {children}
    </span>
  );
}

export function Key({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-block min-w-[1.6em] rounded-none border border-b-[3px] border-border bg-muted px-1.5 text-center font-mono text-[0.8em] font-semibold whitespace-nowrap">
      {children}
    </kbd>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="not-prose my-8 list-none border-t border-border p-0 [counter-reset:step]">
      {children}
    </ol>
  );
}

/** One numbered step: a big number, the title as a link, a line of text. */
export function Step({
  title,
  href,
  time,
  children,
}: {
  title: string;
  href?: string;
  time?: string;
  children?: ReactNode;
}) {
  return (
    <li className="flex gap-5 border-b border-border py-5 [counter-increment:step]">
      <span
        aria-hidden="true"
        className="w-8 shrink-0 font-sans text-3xl font-black leading-none text-muted-foreground before:content-[counter(step)]"
      />
      <span className="flex min-w-0 flex-col gap-1">
        <span className="font-sans text-lg font-bold">
          {href ? (
            <Link
              href={href}
              className="underline decoration-border underline-offset-4 transition-colors duration-200 hover:decoration-foreground"
            >
              {title}
            </Link>
          ) : (
            title
          )}
          {time && (
            <span className="ml-2 font-mono text-xs font-normal whitespace-nowrap text-muted-foreground">
              {time}
            </span>
          )}
        </span>
        {children && (
          <span className="font-mono text-sm leading-relaxed text-muted-foreground">
            {children}
          </span>
        )}
      </span>
    </li>
  );
}

export function Cards({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
      {children}
    </div>
  );
}

/** A short item in a two-column list: a bold title (a link if href) and a line. */
export function Card({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-sans text-base font-bold">
        {href ? (
          <Link
            href={href}
            className="underline decoration-border underline-offset-4 transition-colors duration-200 hover:decoration-foreground"
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </span>
      {children && (
        <span className="font-mono text-sm leading-relaxed text-muted-foreground">
          {children}
        </span>
      )}
    </div>
  );
}

export function DoneWhen({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 border-l-[3px] border-l-[var(--success-500)] bg-muted px-5 py-4 [&>p:last-child]:mb-0 [&_ol]:my-2 [&_ul]:my-2">
      <p className="!mt-0 mb-2 flex items-center gap-2 font-sans text-base font-bold text-[var(--success-500)]">
        <CircleCheck className="h-4 w-4" aria-hidden="true" />
        You are done when
      </p>
      {children}
    </div>
  );
}
