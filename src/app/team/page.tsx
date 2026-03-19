"use client";

import React from "react";
import { TeamCard } from "@/components/about/TeamCard";
import { Container } from "@/components/layout/Container";
import { teamMembers } from "@/lib/data/team";
import { cn } from "@/lib/utils";

export default function TeamPage() {
  const [activeTier, setActiveTier] = React.useState<
    "CORE" | "VOLUNTEER" | "AMBASSADOR"
  >("CORE");

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Teams Section: Dynamic Hub */}
      <section className="w-full py-24 md:py-32 bg-black text-white z-20">
        <Container className="w-full px-4 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 px-2">
            <div className="flex-1">
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
                THE <span className="text-zinc-700">TEAM</span>
              </h1>
              <div className="max-w-2xl">
                <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed">
                  The team behind the Codetopia Community. A dedicated
                  collective of builders and mentors driving the mission of
                  technical growth and collaboration.
                </p>
              </div>
            </div>

            {/* Tactical Toggle */}
            <div className="flex flex-wrap gap-2 md:gap-3 p-1 bg-zinc-950 border border-zinc-900">
              {(["CORE", "VOLUNTEER", "AMBASSADOR"] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setActiveTier(tier)}
                  className={cn(
                    "px-4 py-2 text-[9px] font-mono uppercase tracking-[0.2em] transition-all",
                    activeTier === tier
                      ? "bg-white text-black"
                      : "bg-transparent text-zinc-600 hover:text-zinc-300",
                  )}
                >
                  {tier.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-950 border border-zinc-950 overflow-hidden">
            {teamMembers
              .filter((m) => m.tier === activeTier)
              .map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
