import { Container } from "@/components/layout/Container";

const stats = [
  {
    value: "500+",
    label: "Active Members",
    description:
      "A high-performance network of creators and leaders in the Ghana tech ecosystem.",
  },
  {
    value: "20+",
    label: "Technical Deployments",
    description:
      "Direct technical sessions and projects that convert knowledge into production-ready skills.",
  },
];

export function Stats() {
  return (
    <section className="w-full py-20 md:py-32 bg-white flex flex-col items-center justify-center relative overflow-hidden text-black z-20">
      <Container className="w-full px-4 max-w-5xl relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center flex-1 text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider mb-4 font-sans text-black">
            Performance & Growth
          </h2>
          <p className="text-zinc-600 text-base md:text-lg max-w-3xl font-mono">
            A disciplined environment where 500+ technologists transition from
            consumers to creators through structured mentorship and
            collaborative contribution.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full">
          {stats.map((stat) => (
            <div key={stat.label} className="relative group text-left flex-1">
              {/* Hollow offset border shadow */}
              <div className="absolute inset-0 border-2 border-zinc-900 translate-x-[8px] translate-y-[8px] z-0 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />

              {/* Top Interactive Card */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 md:p-20 text-center bg-white border-2 border-zinc-900 hover:bg-zinc-50 transition-all duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]">
                <span className="text-6xl md:text-8xl font-black font-sans tracking-tighter text-zinc-900 mb-4 md:mb-6 select-none transition-transform duration-500 group-hover:scale-105">
                  {stat.value}
                </span>
                <span className="text-zinc-900 text-base md:text-lg lg:text-xl font-sans font-bold uppercase tracking-[0.2em] mb-4">
                  {stat.label}
                </span>
                <p className="text-zinc-500 font-mono text-sm leading-relaxed max-w-[280px]">
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
