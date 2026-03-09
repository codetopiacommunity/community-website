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
  // {
  //   value: "2+",
  //   label: "Countries Reached",
  //   description:
  //     "Building beyond borders — from Ghana to Nigeria and growing across Africa.",
  // },
  // {
  //   value: "140+",
  //   label: "Learners Reached",
  //   description:
  //     "Individuals who've been directly impacted through our events, bootcamps, and mentorships.",
  // },
  // {
  //   value: "2+",
  //   label: "Countries Reached",
  //   description:
  //     "Building beyond borders — from Ghana to Nigeria and growing across Africa.",
  // },
  // {
  //   value: "140+",
  //   label: "Learners Reached",
  //   description:
  //     "Individuals who've been directly impacted through our events, bootcamps, and mentorships.",
  // },
];

export function Stats() {
  return (
    <section className="w-full py-20 md:py-32 bg-white flex flex-col items-center justify-center relative overflow-hidden text-black z-20">
      <Container className="w-full px-4 max-w-7xl relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center flex-1 text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider mb-4 font-sans text-black">
            Traction
          </h2>
          <p className="text-zinc-600 text-base md:text-lg max-w-3xl font-mono">
            A disciplined environment where 500+ technologists transition from
            consumers to creators through structured mentorship and
            collaborative contribution.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 w-full">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative group text-left w-full sm:w-72 md:w-80 lg:w-72 xl:w-80 shrink-0"
            >
              {/* Hollow offset border shadow */}
              <div className="absolute inset-0 border-2 border-zinc-900 translate-x-[8px] translate-y-[8px] z-0 transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />

              {/* Top Interactive Card */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 md:p-10 text-center bg-white border-2 border-zinc-900 hover:bg-zinc-50 transition-all duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]">
                <span className="text-5xl md:text-6xl font-black font-sans tracking-tighter text-zinc-900 mb-4 md:mb-6 select-none transition-transform duration-500 group-hover:scale-105">
                  {stat.value}
                </span>
                <span className="text-zinc-900 text-base md:text-lg lg:text-xl font-sans font-bold uppercase tracking-[0.2em] mb-4">
                  {stat.label}
                </span>
                <p className="text-zinc-500 font-mono text-sm leading-relaxed">
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
