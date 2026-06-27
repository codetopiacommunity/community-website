import { Container } from "@/components/layout/Container";
import { coreValues } from "./data";
import { LeadershipIsland } from "./LeadershipIsland";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center py-32 md:py-48 bg-black relative overflow-hidden border-b border-zinc-900">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <Container className="flex flex-col items-start text-left px-4 relative z-10">
          <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] mb-12">
            Who We Are
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase mb-12 leading-[0.9] font-sans">
            Engineering Impact <br />
            Through <span className="text-zinc-600">Collaboration</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl font-mono leading-relaxed max-w-3xl">
            Launched in 2020 as{" "}
            <a
              href="https://codetopia.org/"
              className="text-white hover:underline decoration-zinc-500"
            >
              Codetopia
            </a>
            &apos;s first initiative, we&apos;ve grown from a small group into a
            thriving ecosystem of tech professionals and enthusiasts united by a
            commitment to{" "}
            <span className="text-white">collaborative building.</span>
          </p>
        </Container>
      </div>

      {/* Statement */}
      <section className="w-full py-32 md:py-48 bg-black text-white border-t border-zinc-900">
        <Container className="w-full px-4">
          <p className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] font-sans max-w-5xl">
            Not a networking group.
            <br />
            <span className="text-zinc-600">A community that builds.</span>
          </p>
          <p className="font-mono text-base md:text-lg text-zinc-500 leading-relaxed max-w-2xl mt-12">
            Everyone here is working on something: a project, a skill, a career.
            We show up, share what we know, and grow together. That's it.
          </p>
        </Container>
      </section>

      {/* Core Values */}
      <section className="w-full py-32 bg-black text-white border-t border-zinc-900 overflow-hidden">
        <Container className="w-full px-4 relative z-10">
          <div className="mb-24">
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] mb-8 block">
              The Manifesto
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-sans">
              What We Stand For
            </h2>
          </div>
        </Container>

        <div className="flex flex-col border-t border-zinc-800">
          {coreValues.map((value, index) => (
            <div
              key={value.title}
              className="group relative border-b border-zinc-800 transition-colors hover:bg-zinc-900/50"
            >
              <Container className="relative z-10 w-full px-4 flex flex-col lg:flex-row items-start lg:items-center justify-between py-16">
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-[12rem] md:text-[16rem] font-black text-white/[0.03] pointer-events-none select-none">
                  0{index + 1}
                </span>
                <div className="relative z-10 flex items-center gap-6 mb-4 lg:mb-0">
                  <value.icon
                    className="w-8 h-8 lg:w-12 lg:h-12 text-white shrink-0"
                    strokeWidth={2}
                  />
                  <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter font-sans">
                    {value.title}
                  </h3>
                </div>
                <p className="relative z-10 text-zinc-400 font-mono text-base lg:text-lg max-w-xl lg:text-right">
                  {value.description}
                </p>
              </Container>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <LeadershipIsland />
    </>
  );
}
