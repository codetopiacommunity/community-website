"use client";

import {
  Github,
  Linkedin,
  Loader2,
  Pencil,
  Shield,
  Star,
  Trash2,
  Twitter,
  Users2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/types";

export function TeamTable({
  currentMembers,
  loading,
  search,
  filteredMembers,
  currentPage,
  itemsPerPage,
  totalPages,
  setCurrentPage,
  onEdit,
  onDelete,
  onAddFirst,
}: {
  currentMembers: TeamMember[];
  loading: boolean;
  search: string;
  filteredMembers: TeamMember[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: number) => void;
  onAddFirst: () => void;
}) {
  return (
    <div className="bg-white border border-zinc-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900">
          Active Directory
        </h2>
        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
          {filteredMembers.length} Members
        </span>
      </div>

      {loading && (
        <div className="p-20 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono">
          <thead>
            <tr className="bg-black text-[10px] font-bold uppercase tracking-widest text-white">
              <th className="px-6 py-3">Member</th>
              <th className="px-6 py-3">Role & Tier</th>
              <th className="px-6 py-3">Expertise</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs">
            {currentMembers.length === 0 && !loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center">
                  <Users2 className="h-8 w-8 mx-auto text-zinc-200 mb-3" />
                  <p className="font-mono text-sm font-semibold text-zinc-900">No team members found</p>
                  <p className="font-mono text-xs text-zinc-400 mt-1">
                    {search
                      ? `No results for "${search}"`
                      : "Your team directory is empty."}
                  </p>
                  {!search && (
                    <button
                      type="button"
                      onClick={onAddFirst}
                      className="mt-4 inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                    >
                      Add First Member
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              currentMembers.map((member) => (
                <tr key={member.id} className="hover:bg-zinc-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 border border-zinc-200 overflow-hidden flex items-center justify-center text-zinc-400 relative shrink-0">
                        {member.imageUrl ? (
                          <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                        ) : (
                          <Users2 className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-mono font-semibold text-sm text-zinc-900">{member.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {member.github && <Github className="h-3 w-3 text-zinc-400" />}
                          {member.linkedin && <Linkedin className="h-3 w-3 text-zinc-400" />}
                          {member.twitter && <Twitter className="h-3 w-3 text-zinc-400" />}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs font-bold text-zinc-900 uppercase tracking-tight">{member.role}</p>
                    <span
                      className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest border ${
                        member.tier === "CORE"
                          ? "bg-black text-white border-black"
                          : member.tier === "VOLUNTEER"
                            ? "text-emerald-700 border-emerald-200 bg-emerald-50"
                            : "text-indigo-700 border-indigo-200 bg-indigo-50"
                      }`}
                    >
                      {member.tier === "CORE" ? <Shield className="h-2.5 w-2.5" /> : <Star className="h-2.5 w-2.5" />}
                      {member.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[220px]">
                      {member.expertise?.map((exp: string) => (
                        <span key={exp} className="font-mono text-[10px] text-zinc-600 border border-zinc-200 px-1.5 py-0.5">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(member)}
                        className="h-8 w-8 hover:bg-zinc-100 transition-colors"
                        title="Edit member"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(member.id)}
                        className="h-8 w-8 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove member"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredMembers.length > 0 && (
        <div className="px-6 py-3 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-50">
          <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredMembers.length)} of {filteredMembers.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max((p as number) - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest border border-zinc-200 text-zinc-900 hover:border-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={`page-${i + 1}`}
                type="button"
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 font-mono text-xs font-bold transition-colors ${currentPage === i + 1 ? "bg-black text-white" : "border border-zinc-200 text-zinc-600 hover:border-zinc-900 bg-white"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min((p as number) + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest border border-zinc-200 text-zinc-900 hover:border-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
