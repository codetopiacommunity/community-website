"use client";

import { InstitutionalNote } from "@/components/about/InstitutionalNote";
import { WallOfImpact } from "@/components/about/WallOfImpact";
import { Container } from "@/components/layout/Container";

export default function ImpactPage() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Impact Hero: Mission Alignment */}
      <section className="w-full pt-32 pb-16 bg-black">
        <Container className="px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 px-2">
            <div className="flex-1">
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
                THE WALL OF <br />
                <span className="text-zinc-700">IMPACT</span>
              </h1>
              <div className="max-w-2xl">
                <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed">
                  Recognition & Rewards Protocol for the Codetopia Community.
                  Documenting a Codetopia initiative driven by technical
                  excellence and measurable human impact.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main recognition grid */}
      <WallOfImpact />

      <section className="pb-32 bg-black border-t border-zinc-900">
        <Container className="px-4 mt-16">
          <InstitutionalNote />
        </Container>
      </section>
    </div>
  );
}
