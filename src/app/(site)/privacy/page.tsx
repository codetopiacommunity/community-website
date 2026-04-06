import { Container } from "@/components/layout/Container";
import { sections } from "./data";

export default function PrivacyPage() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="w-full pt-32 pb-16 bg-black">
        <Container className="px-4">
          <div className="px-2">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
              PRIVACY <br />
              <span className="text-zinc-700">POLICY</span>
            </h1>
            <p className="text-zinc-500 font-mono text-sm">
              Last updated: April 2026
            </p>
          </div>
        </Container>
      </section>

      {/* Sections */}
      <section className="border-t border-zinc-900 pb-32">
        <Container className="px-4">
          <div className="flex flex-col gap-px bg-zinc-900">
            {sections.map((s) => (
              <div
                key={s.title}
                className="bg-black p-8 md:p-12 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-16"
              >
                <p className="text-white font-black uppercase tracking-tight text-lg font-sans">
                  {s.title}
                </p>
                <p className="text-zinc-400 font-sans text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
            {/* Contact */}
            <div className="bg-black p-8 md:p-12 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-16">
              <p className="text-white font-black uppercase tracking-tight text-lg font-sans">
                Contact
              </p>
              <p className="text-zinc-400 font-sans text-sm leading-relaxed">
                For any privacy-related questions or requests, email us at{" "}
                <a
                  href="mailto:hello@codetopia.org"
                  className="text-white underline underline-offset-4"
                >
                  hello@codetopia.org
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
