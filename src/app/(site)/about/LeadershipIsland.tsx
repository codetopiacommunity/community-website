"use client";

import { ArrowUpRight, Loader2, Users2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TeamCard } from "@/components/about/TeamCard";
import { Container } from "@/components/layout/Container";
import type { TeamMember } from "@/types";

export function LeadershipIsland() {
  const [coreMembers, setCoreMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoreMembers() {
      try {
        const res = await fetch("/api/admin/team");
        if (res.ok) {
          const data = await res.json();
          setCoreMembers(
            data.filter((m: TeamMember) => m.tier === "CORE").slice(0, 3),
          );
        }
      } catch (err) {
        console.error("Failed to fetch team members:", err);
      }
      setLoading(false);
    }
    fetchCoreMembers();
  }, []);

  return (
    <section className="w-full py-32 bg-black text-white z-20 border-t border-zinc-900">
      <Container className="w-full px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="flex-1 px-2">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
              LEADERSHIP <br />
              <span className="text-zinc-700">BRIEF</span>
            </h2>
            <div className="max-w-2xl">
              <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed">
                A Codetopia initiative. The Codetopia Community is led by a
                decentralized collective of engineers and community leaders
                defining the future of technical mastery.
              </p>
            </div>
          </div>

          <Link
            href="/team"
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-mono text-[9px] uppercase tracking-[0.3em] font-black hover:bg-zinc-200 transition-colors"
          >
            VIEW ALL TEAMS
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          </div>
        ) : coreMembers.length === 0 ? (
          <div className="w-full flex flex-col md:flex-row items-stretch border border-zinc-900 bg-zinc-950 min-h-[400px]">
            <div className="flex-1 flex flex-col justify-center p-10 md:p-16 relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-2 border border-zinc-800 bg-black text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-8">
                  <span className="w-2 h-2 bg-zinc-600 animate-pulse rounded-full"></span>
                  COMMUNITY LEADERS
                </div>

                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none font-sans">
                  STAY <span className="text-zinc-600">TUNED</span>
                </h3>

                <p className="text-zinc-500 font-mono text-base max-w-lg leading-relaxed">
                  We're currently assembling our community leadership network.
                  Check back soon for updates to the directory.
                </p>
              </div>
            </div>

            <div className="hidden md:flex w-1/4 min-w-[200px] border-l border-zinc-900 bg-black flex-col justify-between p-8 relative overflow-hidden group">
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
                {"CODETOPIA // LEADERSHIP DIRECTORY"}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-950 border border-zinc-950 overflow-hidden">
            {coreMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
