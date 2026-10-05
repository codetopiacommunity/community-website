import { ArrowUpRight, CircleCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";
import { ImageRow } from "./ImageRow";

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
    <span className="inline-block rounded-none border border-border bg-muted px-1.5 py-0.5 font-sans text-[0.9em] font-semibold whitespace-nowrap">
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
    <ol className="not-prose my-8 grid list-none gap-3 p-0 [counter-reset:step]">
      {children}
    </ol>
  );
}

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
  const body = (
    <>
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center border border-foreground font-sans text-lg font-black [counter-increment:step] before:content-[counter(step)]"
      />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-sans text-lg font-black uppercase tracking-tight">
          {title}
        </span>
        {children && (
          <span className="font-mono text-sm leading-relaxed text-muted-foreground">
            {children}
          </span>
        )}
        {time && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {time}
          </span>
        )}
      </span>
      {href && (
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      )}
    </>
  );
  const className =
    "group flex items-start gap-4 border border-border p-4 md:p-5 no-underline";
  return (
    <li>
      {href ? (
        <Link
          href={href}
          className={`${className} transition-colors hover:border-foreground`}
        >
          {body}
        </Link>
      ) : (
        <div className={className}>{body}</div>
      )}
    </li>
  );
}

export function Cards({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">{children}</div>
  );
}

export function Card({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children?: ReactNode;
}) {
  const body = (
    <>
      <span className="flex items-start justify-between gap-3">
        <span className="font-sans text-base font-black uppercase tracking-tight">
          {title}
        </span>
        {href && (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        )}
      </span>
      {children && (
        <span className="font-mono text-sm leading-relaxed text-muted-foreground">
          {children}
        </span>
      )}
    </>
  );
  const className =
    "group flex h-full flex-col gap-2 border border-border p-4 no-underline";
  return href ? (
    <Link
      href={href}
      className={`${className} transition-colors hover:border-foreground`}
    >
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

export function DoneWhen({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 border-l-[3px] border-l-[var(--success-500)] bg-muted px-5 py-4 [&>p:last-child]:mb-0 [&_ol]:my-2 [&_ul]:my-2">
      <p className="!mt-0 mb-2 flex items-center gap-2 font-sans text-sm font-black uppercase tracking-widest text-[var(--success-500)]">
        <CircleCheck className="h-4 w-4" aria-hidden="true" />
        Done when
      </p>
      {children}
    </div>
  );
}

/** Everything a howto's MDX can use, for the guide pages and the landing. */
export const HOWTO_MDX_COMPONENTS = {
  pre: CodeBlock,
  ImageRow,
  Command,
  Channel,
  Button,
  Key,
  Steps,
  Step,
  Cards,
  Card,
  DoneWhen,
};
