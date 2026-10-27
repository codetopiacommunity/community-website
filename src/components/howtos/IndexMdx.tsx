import Link from "next/link";
import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { CARD_ICONS } from "./cardIcons";

/*
 * How the README's <Steps> and <Cards> look on the /howtos page. Steps are a
 * numbered path joined by a thin line, like GOV.UK's step by step pages.
 * Cards are a plain list. Titles are underlined links, so it is clear what
 * to click without boxes. Inside a guide the components in mdx.tsx are used.
 */

const LINK =
  "underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] duration-200 hover:decoration-2";

export function IndexSteps({ children }: { children: ReactNode }) {
  const steps = Children.toArray(children).filter(isValidElement);
  return (
    <ol className="not-prose my-10 list-none p-0">
      {steps.map((step, i) =>
        cloneElement(
          step as React.ReactElement<{ number?: number; last?: boolean }>,
          { number: i + 1, last: i === steps.length - 1 },
        ),
      )}
    </ol>
  );
}

export function IndexStep({
  title,
  href,
  time,
  number,
  last,
  children,
}: {
  title: string;
  href?: string;
  time?: string;
  /** Set by IndexSteps. */
  number?: number;
  last?: boolean;
  children?: ReactNode;
}) {
  return (
    <li className={`relative flex gap-5 ${last ? "" : "pb-10"}`}>
      {!last && (
        <span
          aria-hidden="true"
          className="absolute left-4 top-9 bottom-1 w-px bg-foreground/25"
        />
      )}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground bg-background font-sans text-sm font-bold">
        {number}
      </span>
      <span className="flex min-w-0 flex-col gap-1.5 pt-0.5">
        {href ? (
          <Link
            href={href}
            className={`font-sans text-lg font-bold leading-snug md:text-xl ${LINK}`}
          >
            {title}
          </Link>
        ) : (
          <span className="font-sans text-lg font-bold leading-snug md:text-xl">
            {title}
          </span>
        )}
        {children && (
          <span className="font-mono text-[15px] leading-relaxed text-foreground/70">
            {children}
          </span>
        )}
        {time && (
          <span className="font-mono text-xs text-muted-foreground">
            About {time}
          </span>
        )}
      </span>
    </li>
  );
}

export function IndexCards({ children }: { children: ReactNode }) {
  return (
    <ul className="not-prose my-10 grid list-none gap-x-14 gap-y-8 p-0 sm:grid-cols-2">
      {children}
    </ul>
  );
}

export function IndexCard({
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
    <li className="flex gap-4">
      {Icon && (
        <Icon
          aria-hidden="true"
          strokeWidth={1.5}
          className="mt-0.5 h-6 w-6 shrink-0"
        />
      )}
      <span className="flex min-w-0 flex-col gap-1.5">
        {href ? (
          <Link href={href} className={`font-sans text-lg font-bold ${LINK}`}>
            {title}
          </Link>
        ) : (
          <span className="font-sans text-lg font-bold">{title}</span>
        )}
        {children && (
          <span className="font-mono text-[15px] leading-relaxed text-foreground/70">
            {children}
          </span>
        )}
      </span>
    </li>
  );
}
