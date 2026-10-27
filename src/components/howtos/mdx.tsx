import { ArrowRight, CircleCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { CARD_ICONS } from "./cardIcons";

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
 *   <Cards> <Card title href icon>…</Card> </Cards>   a grid of action cards
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
    <ol className="not-prose my-8 list-none p-0 [counter-reset:step]">
      {children}
    </ol>
  );
}

/** Makes the whole item tappable when it has somewhere to go. */
function MaybeLink({
  href,
  className,
  children,
}: {
  href?: string;
  className: string;
  children: ReactNode;
}) {
  return href ? (
    <Link href={href} className={`group ${className}`}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-foreground"
    />
  );
}

/**
 * One step on a numbered path: a number joined to the next step by a line,
 * the title, how long it takes, and a line of text.
 */
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
    <li className="group/step relative flex gap-5 pb-8 last:pb-0 [counter-increment:step]">
      <span
        aria-hidden="true"
        className="absolute top-10 bottom-0 left-[1.1875rem] w-px bg-border group-last/step:hidden"
      />
      <span
        aria-hidden="true"
        className="relative flex h-10 w-10 shrink-0 items-center justify-center bg-foreground font-sans text-lg font-black text-background before:content-[counter(step)]"
      />
      <MaybeLink
        href={href}
        className="flex min-w-0 flex-1 flex-col gap-1 pt-1.5"
      >
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-sans text-lg font-bold leading-snug underline-offset-4 group-hover:underline">
            {title}
          </span>
          {time && (
            <span className="font-mono text-xs whitespace-nowrap text-muted-foreground">
              {time}
            </span>
          )}
          {href && <Arrow />}
        </span>
        {children && (
          <span className="font-mono text-sm leading-relaxed text-muted-foreground">
            {children}
          </span>
        )}
      </MaybeLink>
    </li>
  );
}

export function Cards({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {children}
    </div>
  );
}

/** An item in a two-column grid: a bold title and a line. The whole item is the link. */
export function Card({
  title,
  href,
  icon,
  children,
}: {
  title: string;
  href?: string;
  icon?: string;
  children?: ReactNode;
}) {
  const Icon = icon ? CARD_ICONS[icon] : undefined;
  return (
    <MaybeLink
      href={href}
      className="flex flex-col gap-1 border-t border-border py-4"
    >
      <span className="flex items-center gap-2 font-sans text-base font-bold group-hover:underline underline-offset-4">
        {Icon && <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />}
        {title}
        {href && <Arrow />}
      </span>
      {children && (
        <span className="font-mono text-sm leading-relaxed text-foreground/75">
          {children}
        </span>
      )}
    </MaybeLink>
  );
}

export function DoneWhen({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 border-l-4 border-l-foreground py-1 pl-5 [&>p:last-child]:mb-0 [&_ol]:my-2 [&_ul]:my-2">
      <p className="!mt-0 mb-2 flex items-center gap-2 font-sans text-base font-bold text-foreground">
        <CircleCheck className="h-4 w-4" aria-hidden="true" />
        You are done when
      </p>
      {children}
    </div>
  );
}
