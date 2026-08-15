import { prisma } from "@/../prisma/prisma";
import { Container } from "@/components/layout/Container";
import { fetchPortalMembers } from "@/lib/portal";

type Stat = {
  value: string;
  label: string;
  description: string;
};

/**
 * The homepage figures are counted live — members from the portal, events
 * from the database — so this band and the About page can never disagree.
 * A count that fails or comes back zero is dropped rather than replaced
 * with a hand-typed number; the one hand-written entry left is a statement,
 * not a statistic.
 */
/**
 * The community predates the portal: 500+ people across Discord, WhatsApp,
 * and events, of whom only a fraction have created portal accounts so far
 * (the join guide is still being rolled out). Until registrations catch up,
 * this floor is the honest figure — the moment the live portal count passes
 * it, the live count takes over automatically and this constant is dead.
 */
const MEMBER_FLOOR = 500;

async function loadStats(): Promise<Stat[]> {
  const [membersResult, eventsResult] = await Promise.allSettled([
    fetchPortalMembers({ excludeFlagged: true }, 60),
    prisma.event.count({ where: { startDate: { lte: new Date() } } }),
  ]);

  const stats: Stat[] = [];

  // The floor is a known fact rather than a live claim, so the members
  // figure renders even when the portal is unreachable.
  const liveMembers =
    membersResult.status === "fulfilled" ? membersResult.value.length : 0;
  if (membersResult.status === "rejected") {
    console.error("Stats: portal members unavailable", membersResult.reason);
  }
  stats.push({
    value: `${Math.max(liveMembers, MEMBER_FLOOR)}+`,
    label: "Members",
    description:
      "Builders, learners, and creators across the Ghana tech ecosystem and beyond.",
  });

  if (eventsResult.status === "fulfilled" && eventsResult.value > 0) {
    stats.push({
      value: `${eventsResult.value}+`,
      label: "Events Hosted",
      description:
        "Workshops, bootcamps, and community sessions that turn learners into hands-on builders.",
    });
  } else if (eventsResult.status === "rejected") {
    console.error("Stats: event count unavailable", eventsResult.reason);
  }

  stats.push({
    value: "100%",
    label: "Community Built",
    description:
      "Every line of code, every event, and every initiative is driven entirely by members.",
  });

  return stats;
}

const GRID_COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

export async function Stats() {
  const stats = await loadStats();

  return (
    <section className="w-full py-32 bg-black text-white z-20 border-t border-zinc-900 overflow-hidden">
      <Container className="w-full px-4 relative z-10">
        <div className="mb-24 flex flex-col gap-6">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-sans">
            Our <span className="text-zinc-400">Traction</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-mono max-w-2xl">
            Numbers that reflect where we are and where we&apos;re going.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 ${GRID_COLS[stats.length] ?? "md:grid-cols-3"} gap-px bg-zinc-900 border border-zinc-900 overflow-hidden`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-black p-12 md:p-16 flex flex-col items-center text-center overflow-hidden transition-colors hover:bg-zinc-950 cursor-default"
            >
              <span className="text-7xl md:text-8xl xl:text-[9rem] font-black font-sans tracking-tighter text-white leading-none mb-8 select-none tabular-nums transition-transform duration-500 group-hover:scale-105">
                {stat.value}
              </span>
              <div className="relative z-10 flex flex-col items-center gap-3">
                <p className="text-zinc-400 font-mono text-xs uppercase tracking-[0.4em] font-black">
                  {stat.label}
                </p>
                <p className="text-zinc-400 font-mono text-sm max-w-xs leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
