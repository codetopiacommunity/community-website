import { Container } from "@/components/layout/Container";
import {
  encouragedBehaviours,
  enforcementSteps,
  generalViolations,
  techViolations,
} from "./data";

export default function CodeOfConductPage() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="w-full pt-32 pb-16 bg-black">
        <Container className="px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 px-2">
            <div className="flex-1">
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
                CODE OF <br />
                <span className="text-zinc-700">CONDUCT</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed max-w-2xl">
                A utopia for tech enthusiasts — where everyone belongs.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Who We Are + Our Pledge */}
      <section className="py-16 border-t border-zinc-900">
        <Container className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-2">
            <div>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4">
                Who We Are
              </p>
              <p className="text-zinc-300 font-sans text-base leading-relaxed">
                Codetopia Community is an inclusive and collaborative initiative
                of{" "}
                <a
                  href="https://codetopia.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white underline underline-offset-4"
                >
                  Codetopia
                </a>
                , created to empower aspiring and practicing technologists. We
                believe technology is more than a tool — it is the foundation of
                innovation, creativity, and problem-solving.
              </p>
              <p className="text-zinc-500 font-sans text-sm leading-relaxed mt-4">
                Our community is guided by six core values:{" "}
                <span className="text-zinc-300">
                  Inclusivity, Collaboration, Continuous Learning, Practical
                  Application, Innovation, and Integrity.
                </span>
              </p>
            </div>
            <div>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4">
                Our Pledge
              </p>
              <p className="text-zinc-300 font-sans text-base leading-relaxed">
                We pledge to make our community welcoming, safe, and equitable
                for all — regardless of race, ethnicity, age, disability, gender
                identity, sexual orientation, language, religion, national
                origin, socio-economic position, level of education, or other
                status.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Encouraged Behaviours */}
      <section className="py-16 border-t border-zinc-900">
        <Container className="px-4">
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-10 px-2">
            Encouraged Behaviours
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900">
            {encouragedBehaviours.map((item) => (
              <div key={item.title} className="bg-black p-8">
                <p className="text-white font-black uppercase tracking-tight text-lg font-sans mb-3">
                  {item.title}
                </p>
                <p className="text-zinc-500 font-sans text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Restricted Behaviours */}
      <section className="py-16 border-t border-zinc-900">
        <Container className="px-4">
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-10 px-2">
            Restricted Behaviours
          </p>

          <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-6 px-2">
            General Violations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 mb-px">
            {generalViolations.map((item) => (
              <div key={item.title} className="bg-black p-8">
                <p className="text-white font-black uppercase tracking-tight text-lg font-sans mb-3">
                  {item.title}
                </p>
                <p className="text-zinc-500 font-sans text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest mt-10 mb-6 px-2">
            Tech Community Specific
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900">
            {techViolations.map((item) => (
              <div key={item.title} className="bg-black p-8">
                <p className="text-white font-black uppercase tracking-tight text-lg font-sans mb-3">
                  {item.title}
                </p>
                <p className="text-zinc-500 font-sans text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Reporting */}
      <section className="py-16 border-t border-zinc-900">
        <Container className="px-4">
          <div className="px-2 max-w-3xl">
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-6">
              Reporting an Issue
            </p>
            <p className="text-zinc-300 font-sans text-base leading-relaxed mb-6">
              Not every conflict represents a Code of Conduct violation.
              However, when an incident does occur, it is important to report it
              promptly. Community Moderators take all reports seriously and will
              investigate in private, prioritising safety and confidentiality at
              all times.
            </p>
            <a
              href="mailto:codetopiancommunity@gmail.com"
              className="inline-block bg-white text-black font-black uppercase tracking-tight text-sm px-8 py-4 hover:bg-zinc-200 transition-colors font-sans"
            >
              REPORT AN INCIDENT →
            </a>
          </div>
        </Container>
      </section>

      {/* Enforcement Ladder */}
      <section className="py-16 border-t border-zinc-900">
        <Container className="px-4">
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-10 px-2">
            Addressing & Repairing Harm
          </p>
          <div className="flex flex-col gap-px bg-zinc-900">
            {enforcementSteps.map((item) => (
              <div
                key={item.step}
                className="bg-black p-8 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_1fr] gap-8"
              >
                <p className="text-zinc-700 font-black text-4xl font-sans">
                  {item.step}
                </p>
                <div>
                  <p className="text-white font-black uppercase tracking-tight text-lg font-sans mb-2">
                    {item.title}
                  </p>
                  <p className="text-zinc-500 font-sans text-sm leading-relaxed">
                    {item.event}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-2">
                    Consequence
                  </p>
                  <p className="text-zinc-400 font-sans text-sm leading-relaxed">
                    {item.consequence}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-2">
                    Repair
                  </p>
                  <p className="text-zinc-400 font-sans text-sm leading-relaxed">
                    {item.repair}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-zinc-700 font-sans text-xs leading-relaxed mt-6 px-2 max-w-2xl">
            This enforcement ladder is a guideline. It does not limit the
            ability of Community Moderators to use their discretion and judgment
            in the best interests of the Codetopia community.
          </p>
        </Container>
      </section>

      {/* Scope + Attribution */}
      <section className="py-16 border-t border-zinc-900 pb-32">
        <Container className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-2">
            <div>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4">
                Scope
              </p>
              <p className="text-zinc-500 font-sans text-sm leading-relaxed">
                This Code of Conduct applies within all Codetopia spaces —
                including our GitHub repositories, Discord server, website,
                events, and any other space where you are representing the
                Codetopia community.
              </p>
            </div>
            <div>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4">
                Attribution
              </p>
              <p className="text-zinc-500 font-sans text-sm leading-relaxed">
                This Code of Conduct is an original document written for the
                Codetopia Community, informed by our Community Charter and
                adapted from the{" "}
                <a
                  href="https://www.contributor-covenant.org/version/3/0/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 underline underline-offset-4"
                >
                  Contributor Covenant, version 3.0
                </a>
                , licensed under{" "}
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 underline underline-offset-4"
                >
                  CC BY-SA 4.0
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
