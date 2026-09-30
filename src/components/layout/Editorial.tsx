import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

/*
 * The numbered-section layout shared by the long editorial pages (About,
 * Work with us): a sticky number and label in a left rail, content on the
 * right.
 */

/** Left-hand rail label shared by every section. */
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-row lg:flex-col items-baseline lg:items-start gap-4 lg:gap-5 lg:sticky lg:top-28">
      <span className="font-sans font-black text-3xl lg:text-5xl tracking-tighter leading-none text-zinc-500 tabular-nums">
        {num}
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-300 leading-relaxed">
        {label}
      </span>
    </div>
  );
}

export function Section({
  num,
  label,
  children,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full py-24 md:py-32 bg-black text-white border-t border-zinc-900">
      <Container className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[12rem_1fr] gap-8 lg:gap-16 items-start">
          <SectionLabel num={num} label={label} />
          <div className="flex flex-col gap-8 md:gap-10 min-w-0">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] font-sans text-balance">
      {children}
    </h2>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-sm md:text-base leading-loose text-zinc-400 max-w-[68ch]">
      {children}
    </p>
  );
}

/** Inline emphasis inside prose — lifts a phrase to full white. */
export function Lit({ children }: { children: React.ReactNode }) {
  return <span className="text-white">{children}</span>;
}

export function InlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  const className =
    "text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-white transition-colors";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function LeadLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 self-start font-sans font-black text-[11px] uppercase tracking-[0.22em] text-white border-b border-zinc-800 pb-2 hover:text-zinc-400 hover:border-zinc-600 transition-colors"
    >
      {children}
      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
