import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { coreValues } from "./data";

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
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.2em] mb-12">
            Who We Are
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase mb-12 leading-[0.9] font-sans">
            Engineering Impact <br />
            Through <span className="text-zinc-400">Collaboration</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed max-w-3xl">
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
            <span className="text-zinc-400">A community that builds.</span>
          </p>
          <p className="font-mono text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mt-12">
            Everyone here is working on something: a project, a skill, a career.
            We show up, share what we know, and grow together. That&apos;s it.
          </p>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="w-full bg-black border-t border-zinc-900">
        <Container className="px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-900">
            <div className="flex flex-col gap-6 px-2 py-20 lg:pr-16">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.2em]">
                Vision
              </span>
              <p className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight font-sans text-white">
                To be the leading builder-focused tech community in Ghana and
                across Africa, where anyone can grow their skills, contribute
                meaningfully, and shape the future of technology.
              </p>
            </div>
            <div className="flex flex-col gap-6 px-2 py-20 lg:pl-16">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.2em]">
                Mission
              </span>
              <p className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight font-sans text-white">
                To empower learners and creators through mentorship,
                collaboration, and hands-on experiences, turning potential into
                practical impact across the tech ecosystem.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="w-full py-32 bg-black text-white border-t border-zinc-900">
        <Container className="w-full px-4">
          <div className="mb-20">
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.2em] mb-8 block">
              The Manifesto
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-sans">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="group bg-black p-10 flex flex-col gap-6 hover:bg-zinc-900/60 transition-colors"
              >
                <value.icon
                  className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-black uppercase tracking-tighter font-sans text-white">
                    {value.title}
                  </h3>
                  <p className="font-mono text-sm text-zinc-400 leading-relaxed group-hover:text-white transition-colors">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="w-full py-32 bg-black text-white z-20 border-t border-zinc-900">
        <Container className="w-full px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="flex-1 px-2">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
                LEADERSHIP <br />
                <span className="text-zinc-400">BRIEF</span>
              </h2>
              <div className="max-w-2xl">
                <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed">
                  The Codetopia Community is led by experienced engineers and
                  community builders working to grow the next generation of tech
                  talent in Ghana and beyond.
                </p>
              </div>
            </div>

            <Link
              href="/team"
              className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-mono text-[9px] uppercase tracking-[0.3em] font-black hover:bg-zinc-200 transition-colors"
            >
              MEET THE TEAM
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
