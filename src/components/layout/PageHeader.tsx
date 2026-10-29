import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

/**
 * The top of every listing page: the title, one short line on what the page
 * is, and an optional link or control on the right. Shared so titles sit in
 * the same place on every page.
 */
export function PageHeader({
  title,
  children,
  action,
  themed = false,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  /** True on pages with a light/dark toggle, so the line follows the theme. */
  themed?: boolean;
}) {
  return (
    <section className="w-full pt-32 pb-16 md:pt-40">
      <Container className="px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-2">
          <div className="flex flex-col gap-6">
            <h1 className="uppercase tracking-tighter text-4xl md:text-6xl font-bold leading-tight font-sans">
              {title}
            </h1>
            {children && (
              <p
                className={cn(
                  "text-lg md:text-xl font-mono leading-relaxed max-w-2xl",
                  themed ? "text-muted-foreground" : "text-zinc-400",
                )}
              >
                {children}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </Container>
    </section>
  );
}
