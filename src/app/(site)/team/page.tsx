"use client";

import { Loader2, Search, Users2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  TeamCard,
  type TeamMember,
  TeamMemberModal,
} from "@/components/about/TeamCard";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

interface TeamTier {
  value: string;
  label: string;
}

export default function TeamPage() {
  const [tiers, setTiers] = useState<TeamTier[]>([]);
  const [activeTier, setActiveTier] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch("/api/team");
        if (res.ok) {
          const data = await res.json();
          setTeamMembers(data.members ?? []);
          setTiers(data.tiers ?? []);
          setActiveTier(data.tiers?.[0]?.value ?? "");
        }
      } catch (err) {
        console.error("Failed to fetch team members:", err);
      }
      setLoading(false);
    }
    loadMembers();
  }, []);

  useEffect(() => {
    if (!selectedMember) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedMember]);

  const activeTierLabel =
    tiers.find((t) => t.value === activeTier)?.label ?? activeTier;

  const visibleMembers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return teamMembers.filter((m: TeamMember) => {
      if (m.tier !== activeTier) return false;
      if (!query) return true;
      return (
        m.name.toLowerCase().includes(query) ||
        m.role.toLowerCase().includes(query)
      );
    });
  }, [teamMembers, activeTier, search]);

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Teams Section: Dynamic Hub */}
      <section className="w-full py-24 md:py-32 bg-black text-white z-20">
        <Container className="w-full px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 px-2">
            <div className="flex-1">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
                THE <span className="text-zinc-400">TEAM</span>
              </h1>
              <div className="max-w-2xl">
                <p className="text-zinc-500 text-lg md:text-xl font-mono leading-relaxed">
                  Meet the humans behind Codetopia Community: the core team,
                  mentors, volunteers, and ambassadors who make it what it is.
                </p>
              </div>
            </div>

            {/* Tactical Toggle */}
            {tiers.length > 0 && (
              <div className="flex flex-wrap gap-2 md:gap-3 p-1 bg-zinc-950 border border-zinc-900">
                {tiers.map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => setActiveTier(tier.value)}
                    className={cn(
                      "px-4 py-2 text-[9px] font-mono uppercase tracking-[0.2em] transition-all",
                      activeTier === tier.value
                        ? "bg-white text-black"
                        : "bg-transparent text-zinc-400 hover:text-zinc-300",
                    )}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          {!loading && teamMembers.length > 0 && (
            <div className="relative max-w-md mb-10 px-2">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name or role…"
                className="w-full bg-transparent border border-zinc-800 text-white text-xs font-mono pl-10 pr-9 py-3 focus:outline-none focus:border-zinc-600 placeholder:text-zinc-400 transition-colors uppercase tracking-widest"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
          ) : visibleMembers.length === 0 && search.trim() ? (
            <div className="border border-zinc-900 bg-zinc-950 py-24 text-center px-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                No one matches "{search.trim()}" in the{" "}
                {activeTierLabel || "team"} tier.
              </p>
            </div>
          ) : visibleMembers.length === 0 ? (
            <div className="w-full flex flex-col md:flex-row items-stretch border border-zinc-900 bg-zinc-950 min-h-[400px]">
              <div className="flex-1 flex flex-col justify-center p-10 md:p-16 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 px-4 py-2 border border-zinc-800 bg-black text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-8">
                    <span className="w-2 h-2 bg-zinc-600 animate-pulse rounded-full"></span>
                    COMING SOON
                  </div>

                  <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none font-sans">
                    STAY <span className="text-zinc-400">TUNED</span>
                  </h3>

                  <p className="text-zinc-500 font-mono text-base max-w-lg leading-relaxed">
                    We're currently assembling our community leaders for the{" "}
                    <span className="text-zinc-300 font-bold">
                      {activeTierLabel || "team"}
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
                  className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.3em] rotate-180 relative z-10"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {"CODETOPIA COMMUNITY // TEAM DIRECTORY"}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px">
              {visibleMembers.map((member: TeamMember) => (
                <TeamCard
                  key={member.id || member.slug}
                  member={member}
                  onSelect={setSelectedMember}
                />
              ))}
            </div>
          )}
        </Container>
      </section>

      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
