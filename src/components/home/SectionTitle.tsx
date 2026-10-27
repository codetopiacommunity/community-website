import type { ReactNode } from "react";

/**
 * A home page section title wrapped in the brackets from our logo,
 * like <The log />. The brackets are the one signature detail on the page,
 * so they are quiet and only used on section titles.
 */
export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-sans text-3xl font-bold tracking-tight text-white md:text-5xl">
      <span aria-hidden="true" className="font-mono font-normal text-zinc-600">
        {"<"}
      </span>
      {children}
      <span aria-hidden="true" className="font-mono font-normal text-zinc-600">
        {" />"}
      </span>
    </h2>
  );
}
