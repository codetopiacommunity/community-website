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
    <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden relative shadow-none">
      <div className="p-6 border-b border-grey-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg">
            <Users2 className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">
            Active Directory
          </h2>
        </div>
        <span className="text-[10px] font-mono font-bold bg-grey-50 px-3 py-1.5 rounded-lg text-black uppercase tracking-widest border border-grey-100">
          {filteredMembers.length} Members Total
        </span>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono">
          <thead>
            <tr className="bg-grey-50 text-[10px] font-bold uppercase tracking-[0.2em] text-grey-500 border-b border-grey-100">
              <th className="px-6 py-5">TEAM MEMBER</th>
              <th className="px-6 py-5">ROLE & TIER</th>
              <th className="px-6 py-5">EXPERTISE</th>
              <th className="px-6 py-5 text-right">CONTROLS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grey-50 text-xs">
            {currentMembers.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-black font-black uppercase tracking-tight text-lg">
                        No team members found
                      </h3>
                      <p className="text-grey-400 text-sm max-w-[300px] mx-auto font-medium">
                        {search
                          ? `We couldn't find anyone matching "${search}". Try another keyword or clear the search.`
                          : "Your team directory is currently empty. Start by adding your first contributor."}
                      </p>
                    </div>
                    {!search && (
                      <Button
                        onClick={onAddFirst}
                        className="mt-4 text-xs font-black uppercase tracking-widest bg-black text-white px-8 h-12 rounded-xl hover:bg-grey-800 transition-all active:scale-[0.98]"
                      >
                        Add Your First Member
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              currentMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-grey-50/40 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-grey-50 border border-grey-100 overflow-hidden flex items-center justify-center text-grey-400 group-hover:bg-black group-hover:text-white transition-all relative">
                        {member.imageUrl ? (
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Users2 className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-black">
                          {member.name}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          {member.github && (
                            <Github className="h-3 w-3 text-grey-400 hover:text-black cursor-pointer" />
                          )}
                          {member.linkedin && (
                            <Linkedin className="h-3 w-3 text-grey-400 hover:text-black cursor-pointer" />
                          )}
                          {member.twitter && (
                            <Twitter className="h-3 w-3 text-grey-400 hover:text-black cursor-pointer" />
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-black uppercase tracking-tight leading-none font-mono">
                        {member.role}
                      </span>
                      <div
                        className={`inline-flex items-center w-fit gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider font-mono ${member.tier === "CORE" ? "bg-black text-white" : member.tier === "VOLUNTEER" ? "bg-white text-emerald-600 border border-emerald-100" : "bg-white text-indigo-600 border border-indigo-100"}`}
                      >
                        {member.tier === "CORE" ? (
                          <Shield className="h-3 w-3" />
                        ) : (
                          <Star className="h-3 w-3" />
                        )}
                        {member.tier}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-1.5 max-w-[240px]">
                      {member.expertise?.map((exp: string) => (
                        <span
                          key={exp}
                          className="text-[10px] font-medium text-black bg-grey-50 px-2 py-1 rounded border border-grey-200 font-mono"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-40 sm:group-hover:opacity-100 transition-all duration-300">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(member)}
                        className="h-9 w-9 text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all rounded-xl"
                        title="Edit member"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(member.id)}
                        className="h-9 w-9 text-grey-400 hover:text-white hover:bg-red-500 border-2 border-transparent hover:border-black transition-all rounded-xl"
                        title="Remove member"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-grey-50 border-t border-grey-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-mono text-grey-400 uppercase tracking-widest">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredMembers.length)} of{" "}
          {filteredMembers.length} members
        </p>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.max((prev as number) - 1, 1))
            }
            disabled={currentPage === 1}
            className="text-[10px] font-bold uppercase tracking-widest h-8 text-black border-grey-200"
          >
            Previous
          </Button>
          <div className="flex items-center gap-1 mx-2">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={`page-${i + 1}`}
                variant={currentPage === i + 1 ? "default" : "ghost"}
                size="icon"
                onClick={() => setCurrentPage(i + 1)}
                className={`h-8 w-8 text-[10px] font-bold ${currentPage === i + 1 ? "bg-black text-white" : "text-grey-400 hover:text-black"}`}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min((prev as number) + 1, totalPages),
              )
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="text-[10px] font-bold uppercase tracking-widest h-8 text-black border-grey-200"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
