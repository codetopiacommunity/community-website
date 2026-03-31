import { Container } from "@/components/layout/Container";

const stats = [
  {
    value: "500+",
    label: "Active Members",
    description:
      "A high-performance network of creators and leaders in the Ghana tech ecosystem.",
  },
  {
    value: "2+",
    label: "Events Hosted",
    description:
      "Workshops, bootcamps, and community sessions that turn learners into hands-on builders.",
  },
];

export function Stats() {
  return (
    <section className="w-full py-32 bg-white text-black z-20 border-t border-zinc-100 overflow-hidden">
      <Container className="w-full px-4 relative z-10">
        <div className="mb-24 text-left">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-8 leading-none font-sans">
            OUR <span className="text-zinc-300">TRACTION</span>
          </h2>
          <p className="text-zinc-600 text-lg md:text-xl font-mono max-w-2xl">
            A disciplined environment where technologists transition from
            consumers to creators through structured collaborative engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 overflow-hidden">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-white p-12 md:p-20 flex flex-col items-center text-center overflow-hidden transition-colors hover:bg-zinc-50"
            >
              <span className="text-7xl md:text-9xl xl:text-[12rem] font-black font-sans tracking-tighter text-black leading-none mb-8 select-none transition-transform duration-500 group-hover:scale-105">
                {stat.value}
              </span>
              <div className="relative z-10 flex flex-col items-center">
                <p className="text-zinc-600 font-mono text-sm md:text-base uppercase tracking-[0.4em] font-black mb-4">
                  {stat.label}
                </p>
                <p className="text-zinc-500 font-mono text-base md:text-lg max-w-sm">
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
