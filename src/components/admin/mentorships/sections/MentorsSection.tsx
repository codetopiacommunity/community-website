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

export function MentorsSection({ mentorIds, teamData, onToggle }: MentorsSectionProps) {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const suggestions = teamData?.filter(
    (m) =>
      !mentorIds.includes(m.id) &&
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase())),
  ) ?? [];

  return (
    <div className="bg-white border border-grey-200 p-8 space-y-6">
      <h2 className="text-xl font-bold text-black uppercase tracking-tight">
        Mentors
      </h2>

      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search and add mentors..."
            className="border-grey-200 focus:border-black"
          />

          {showDropdown && search && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-grey-200 z-10 max-h-64 overflow-y-auto">
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
                    className="w-full px-4 py-3 text-left hover:bg-grey-50 transition-colors border-b border-grey-100 last:border-b-0 flex items-center gap-3"
                  >
                    {m.imageUrl && (
                      <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={m.imageUrl} alt={m.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black truncate">{m.name}</p>
                      <p className="text-xs text-grey-500 truncate">{m.role}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-grey-500">No mentors found</div>
              )}
            </div>
          )}
        </div>

        {/* Selected pills */}
        {mentorIds.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {mentorIds.map((mentorId) => {
              const mentor = teamData?.find((m) => m.id === mentorId);
              return mentor ? (
                <div
                  key={mentor.id}
                  className="inline-flex items-center gap-2 bg-black text-white px-3 py-2 text-sm font-medium animate-in zoom-in duration-200"
                >
                  {mentor.imageUrl && (
                    <div className="relative h-6 w-6 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={mentor.imageUrl} alt={mentor.name} fill className="object-cover" />
                    </div>
                  )}
                  <span>{mentor.name}</span>
                  <button
                    type="button"
                    onClick={() => onToggle(mentor.id)}
                    className="hover:text-red-400 transition-colors ml-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
