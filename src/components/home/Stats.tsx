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
  {
    value: "100%",
    label: "Community Built",
    description:
      "Every line of code, every event, and every initiative is driven entirely by members.",
  },
];

export function Stats() {
  return (
    <section className="w-full py-32 bg-black text-white z-20 border-t border-zinc-900 overflow-hidden">
      <Container className="w-full px-4 relative z-10">
        <div className="mb-24 flex flex-col gap-6">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-sans">
            Our <span className="text-zinc-400">Traction</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-mono max-w-2xl">
            Numbers that reflect where we are and where we're going.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-black p-12 md:p-16 flex flex-col items-center text-center overflow-hidden transition-colors hover:bg-zinc-950 cursor-default"
            >
              <span className="text-7xl md:text-8xl xl:text-[9rem] font-black font-sans tracking-tighter text-white leading-none mb-8 select-none transition-transform duration-500 group-hover:scale-105">
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
