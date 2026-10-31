"use client";

import { Loader2, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  TeamCard,
  type TeamMember,
  TeamMemberModal,
} from "@/components/about/TeamCard";
import { Container } from "@/components/layout/Container";
import { EmptyState } from "@/components/layout/EmptyState";
import { PageHeader } from "@/components/layout/PageHeader";
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
      <PageHeader
        title="The team"
        action={
          tiers.length > 0 && (
            <div className="flex flex-wrap gap-2 md:gap-3 p-1 bg-zinc-950 border border-zinc-900">
              {tiers.map((tier) => (
                <button
                  key={tier.value}
                  type="button"
                  onClick={() => setActiveTier(tier.value)}
                  className={cn(
                    "uppercase tracking-widest px-4 py-2 text-xs font-sans transition-all",
                    activeTier === tier.value
                      ? "bg-white text-black"
                      : "bg-transparent text-zinc-400 hover:text-zinc-300",
                  )}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          )
        }
      >
        The people who run Codetopia Community.
      </PageHeader>

      <section className="w-full pb-32 bg-black text-white">
        <Container className="w-full px-4">
          {/* Search */}
          {!loading && teamMembers.length > 0 && (
            <div className="relative max-w-md mb-10 px-2">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name or role…"
                className="uppercase tracking-widest w-full bg-transparent border border-zinc-800 text-white text-xs font-sans pl-10 pr-9 py-3 focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500 transition-colors"
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
              <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
          ) : visibleMembers.length === 0 && search.trim() ? (
            <EmptyState title={`No one matches "${search.trim()}"`}>
              Try another name, or look in a different group.
            </EmptyState>
          ) : visibleMembers.length === 0 ? (
            <EmptyState title="No one here yet">
              The people in this group will show up here once they are added.
            </EmptyState>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px">
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
