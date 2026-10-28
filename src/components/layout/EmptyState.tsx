import Link from "next/link";
import type { ReactNode } from "react";

/**
 * What a list page says when there is nothing to show: one plain line on
 * what is missing, one on what to do instead, and links to go there.
 */
export function EmptyState({
  title,
  children,
  links = [],
  action,
}: {
  title: string;
  children?: ReactNode;
  links?: { label: string; href: string }[];
  /** A button, like "Clear filters", when filters caused the empty list. */
  action?: ReactNode;
}) {
  return (
    <div className="max-w-xl py-16 md:py-24">
      <p className="font-sans text-xl font-bold text-white mb-3">{title}</p>
      {children && (
        <p className="font-mono text-base leading-relaxed text-zinc-400">
          {children}
        </p>
      )}
      {links.length > 0 && (
        <ul className="mt-6 flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans text-base font-bold text-white underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] duration-200 hover:decoration-2"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
