import { Container } from "@/components/layout/Container";

const stats = [
  {
    value: "500+",
    label: "Active Codetopians",
    description:
      "Innovators, builders, and creators shaping the tech ecosystem.",
  },
  {
    value: "20+",
    label: "Workshops Hosted",
    description:
      "Hands-on sessions covering everything from software to hardware and design.",
  },
];

export function Stats() {
  return (
    <section className="w-full py-20 md:py-32 bg-[#09090b] flex flex-col items-center justify-center border-t border-zinc-900 relative overflow-hidden">
      {/* Subtle background focal glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-zinc-400/[0.04] blur-[100px] rounded-full pointer-events-none" />

      <Container className="w-full px-4 max-w-5xl relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center flex-1 text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider mb-4 font-sans">
            Our Growing Community
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-3xl font-mono">
            A thriving tech community where developers, engineers, designers,
            tinkeres, tech enthusiasts and professionals come together to learn,
            share, grow and connect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800/80 border border-zinc-800/80 overflow-hidden shadow-2xl w-full">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center p-12 md:p-20 text-center group bg-[#09090b] hover:bg-zinc-900/40 transition-colors duration-500"
            >
              <span className="text-6xl md:text-8xl font-black font-sans tracking-tighter bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent mb-4 md:mb-6 select-none transition-transform duration-500 group-hover:scale-105">
                {stat.value}
              </span>
              <span className="text-white text-base md:text-lg lg:text-xl font-sans font-bold uppercase tracking-[0.2em] mb-3">
                {stat.label}
              </span>
              <p className="text-zinc-500 font-mono text-xs md:text-sm max-w-[280px]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
