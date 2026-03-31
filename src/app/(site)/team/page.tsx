"use client";

import { Loader2, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TeamCard, type TeamMember } from "@/components/about/TeamCard";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export default function TeamPage() {
  const [activeTier, setActiveTier] = useState<
    "CORE" | "VOLUNTEER" | "AMBASSADOR"
  >("CORE");

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch("/api/admin/team");
        if (res.ok) {
          const data = await res.json();
          setTeamMembers(data);
        }
      } catch (err) {
        console.error("Failed to fetch team members:", err);
      }
      setLoading(false);
    }
    loadMembers();
  }, []);

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Teams Section: Dynamic Hub */}
      <section className="w-full py-24 md:py-32 bg-black text-white z-20">
        <Container className="w-full px-4 relative z-10">
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

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
          ) : teamMembers.filter((m: TeamMember) => m.tier === activeTier)
              .length === 0 ? (
            <div className="w-full flex flex-col md:flex-row items-stretch border border-zinc-900 bg-zinc-950 min-h-[400px]">
              <div className="flex-1 flex flex-col justify-center p-10 md:p-16 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 px-4 py-2 border border-zinc-800 bg-black text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-8">
                    <span className="w-2 h-2 bg-zinc-600 animate-pulse rounded-full"></span>
                    COMING SOON
                  </div>

                  <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none font-sans">
                    STAY <span className="text-zinc-600">TUNED</span>
                  </h3>

                  <p className="text-zinc-500 font-mono text-base max-w-lg leading-relaxed">
                    We're currently assembling our community leaders for the{" "}
                    <span className="text-zinc-300 font-bold">
                      {activeTier}
                    </span>{" "}
                    tier. Check back soon to see who joins the roster.
                  </p>
                </div>
              </div>

              {/* Abstract decorative right side */}
              <div className="hidden md:flex w-1/4 min-w-[200px] border-l border-zinc-900 bg-black flex-col justify-between p-8 relative overflow-hidden group">
                {/* Diagonal striping */}
                <div
                  className="absolute inset-0 opacity-10 transition-opacity duration-700 group-hover:opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #27272a 0, #27272a 1px, transparent 0, transparent 20px)",
                  }}
                ></div>

                <div className="self-end p-5 border border-zinc-800 bg-zinc-950 text-zinc-500 transition-all duration-500 group-hover:text-zinc-300 relative z-10">
                  <Users2 className="w-8 h-8" strokeWidth={1} />
                </div>

                <div
                  className="font-mono text-[9px] text-zinc-700 uppercase tracking-[0.3em] rotate-180 relative z-10"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {"CODETOPIA // EMPTY DIRECTORY"}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-950 border border-zinc-950 overflow-hidden">
              {teamMembers
                .filter((m: TeamMember) => m.tier === activeTier)
                .map((member: TeamMember) => (
                  <TeamCard key={member.id || member.slug} member={member} />
                ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
