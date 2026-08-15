import { Container } from "@/components/layout/Container";

export type AboutStat = { value: number; label: string; one: string };

/**
 * A full-bleed break in the page's rhythm, and the only place on About where
 * type runs at this scale. Every figure is counted live — nothing here is
 * typed in by hand, which is the point of a page about keeping records.
 */
export function NumbersBand({ stats }: { stats: AboutStat[] }) {
  // A four-column band holding one or two figures reads as broken rather
  // than as information. Below three, the page is better off saying nothing.
  if (stats.length < 3) return null;

  return (
    <section className="w-full bg-black text-white py-20 md:py-28">
      <Container className="px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          {stats.map((stat) => (
            <div
              key={stat.value === 1 ? stat.one : stat.label}
              className="flex flex-col gap-3"
            >
              <span className="font-sans font-black text-5xl md:text-7xl tracking-tighter leading-none tabular-nums">
                {stat.value}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-300">
                {stat.value === 1 ? stat.one : stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
