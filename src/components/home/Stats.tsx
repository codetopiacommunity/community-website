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
    <section className="w-full py-20 md:py-32 bg-white flex flex-col items-center justify-center relative overflow-hidden text-black z-20">
      <Container className="w-full px-4 max-w-5xl relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center flex-1 text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider mb-4 font-sans text-black">
            Our Growing Community
          </h2>
          <p className="text-zinc-600 text-base md:text-lg max-w-3xl font-mono">
            A thriving tech community where developers, engineers, designers,
            tinkeres, tech enthusiasts and professionals come together to learn,
            share, grow and connect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 overflow-hidden w-full">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center p-12 md:p-20 text-center group bg-white hover:bg-zinc-50 transition-colors duration-500"
            >
              <span className="text-6xl md:text-8xl font-black font-sans tracking-tighter text-zinc-900 mb-4 md:mb-6 select-none transition-transform duration-500 group-hover:scale-105">
                {stat.value}
              </span>
              <span className="text-zinc-900 text-base md:text-lg lg:text-xl font-sans font-bold uppercase tracking-[0.2em] mb-3">
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
