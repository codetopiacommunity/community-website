"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { TeamMember } from "@/types";

interface MentorsSectionProps {
  mentorIds: number[];
  teamData: TeamMember[] | null;
  onToggle: (id: number) => void;
}

export function MentorsSection({
  mentorIds,
  teamData,
  onToggle,
}: MentorsSectionProps) {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const suggestions =
    teamData?.filter(
      (m) =>
        !mentorIds.includes(m.id) &&
        (m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.role.toLowerCase().includes(search.toLowerCase())),
    ) ?? [];

  return (
    <div className="bg-zinc-50 border border-zinc-100 p-6 space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-200">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-l-2 border-black pl-3">
          05 — Mentors
        </span>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <label
            htmlFor="mentorship-mentor-search"
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block"
          >
            Search & Add Mentors
          </label>
          <Input
            id="mentorship-mentor-search"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search by name or role..."
            className="border-zinc-200 focus:border-zinc-900 focus:ring-0 rounded-none bg-white"
          />

          {showDropdown && search && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 z-10 max-h-64 overflow-y-auto">
              {suggestions.length > 0 ? (
                suggestions.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      onToggle(m.id);
                      setSearch("");
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-zinc-50 transition-colors border-b border-zinc-100 last:border-b-0 flex items-center gap-3"
                  >
                    {m.imageUrl && (
                      <div className="relative h-8 w-8 overflow-hidden flex-shrink-0 border border-zinc-200">
                        <Image
                          src={m.imageUrl}
                          alt={m.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black truncate">
                        {m.name}
                      </p>
                      <p className="text-xs font-mono text-zinc-400 truncate">
                        {m.role}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  No mentors found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected pills */}
        {mentorIds.length > 0 && (
          <div className="border-t border-zinc-100 pt-4">
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
              Selected ({mentorIds.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {mentorIds.map((mentorId) => {
                const mentor = teamData?.find((m) => m.id === mentorId);
                return mentor ? (
                  <div
                    key={mentor.id}
                    className="inline-flex items-center gap-2 bg-black text-white px-3 py-2 text-xs font-mono animate-in zoom-in duration-200"
                  >
                    {mentor.imageUrl && (
                      <div className="relative h-5 w-5 overflow-hidden flex-shrink-0">
                        <Image
                          src={mentor.imageUrl}
                          alt={mentor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span>{mentor.name}</span>
                    <button
                      type="button"
                      onClick={() => onToggle(mentor.id)}
                      className="hover:text-zinc-400 transition-colors ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
