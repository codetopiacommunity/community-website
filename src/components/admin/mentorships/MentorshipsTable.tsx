"use client";

import { format } from "date-fns";
import { Calendar, Edit2, Image as ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/types";

interface Mentorship {
  id: number;
  title: string;
  startDate?: string | null;
  endDate?: string | null;
  status: string;
  coverImage?: string | null;
  mentors?: TeamMember[];
}

interface MentorshipsTableProps {
  mentorships: Mentorship[];
  loading: boolean;
  onEdit: (m: Mentorship) => void;
  onDelete: (id: number) => void;
  onAddFirst: () => void;
}

export function MentorshipsTable({
  mentorships,
  loading,
  onEdit,
  onDelete,
  onAddFirst,
}: MentorshipsTableProps) {
  if (loading) {
    return (
      <div className="bg-white border border-grey-200 p-12 text-center">
        <div className="inline-block animate-spin">
          <div className="h-8 w-8 border-4 border-grey-200 border-t-black rounded-full" />
        </div>
        <p className="text-grey-600 mt-4">Loading mentorships...</p>
      </div>
    );
  }

  if (!mentorships || mentorships.length === 0) {
    return (
      <div className="bg-white border border-grey-200 overflow-hidden p-12 text-center">
        <div className="w-16 h-16 bg-grey-100 flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8 text-grey-400" />
        </div>
        <h3 className="text-lg font-bold text-black mb-2">
          No mentorship sessions yet
        </h3>
        <p className="text-sm text-grey-600 mb-6">
          Create your first mentorship session to get started.
        </p>
        <Button
          onClick={onAddFirst}
          className="bg-black text-white hover:bg-grey-900 rounded-none"
        >
          Create First Session
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-grey-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-grey-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">
            Mentorship Sessions
          </h2>
          <p className="text-xs text-grey-500 mt-1 font-mono">
            Manage all mentorship programs
          </p>
        </div>
        <span className="text-sm font-bold bg-black text-white px-4 py-2">
          {mentorships.length}{" "}
          {mentorships.length === 1 ? "Session" : "Sessions"}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-grey-200 bg-grey-50">
              <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-grey-600">
                Session
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-grey-600">
                Cover Image
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-grey-600">
                Date
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-grey-600">
                Mentors
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-grey-600">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-grey-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grey-100">
            {mentorships.map((m) => (
              <tr
                key={m.id}
                className="hover:bg-grey-50 transition-colors group"
              >
                {/* Title */}
                <td className="px-6 py-5">
                  <div className="font-bold text-sm text-black line-clamp-2">
                    {m.title}
                  </div>
                </td>

                {/* Cover Image */}
                <td className="px-6 py-5">
                  {m.coverImage ? (
                    <div className="relative w-12 h-12 overflow-hidden border border-grey-200">
                      <Image
                        src={m.coverImage}
                        alt={m.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-grey-100 flex items-center justify-center border border-grey-200">
                      <ImageIcon className="w-5 h-5 text-grey-400" />
                    </div>
                  )}
                </td>

                {/* Date */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-grey-400" />
                    <span className="text-xs text-grey-600 font-mono">
                      {m.startDate
                        ? format(new Date(m.startDate), "MMM dd, yyyy")
                        : "—"}
                    </span>
                  </div>
                </td>

                {/* Mentors */}
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-1 text-sm">
                    {m.mentors && m.mentors.length > 0 ? (
                      m.mentors.slice(0, 2).map((t) => (
                        <span key={t.id} className="text-grey-700 font-medium">
                          {t.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-grey-500 text-xs">No mentors</span>
                    )}
                    {m.mentors && m.mentors.length > 2 && (
                      <span className="text-grey-500 text-xs">
                        +{m.mentors.length - 2} more
                      </span>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <Badge
                    variant={m.status === "open" ? "default" : "outline"}
                    className="text-xs uppercase tracking-widest font-semibold rounded-none"
                  >
                    {m.status}
                  </Badge>
                </td>

                {/* Actions */}
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-40 sm:group-hover:opacity-100 transition-all duration-300">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(m)}
                      className="h-9 w-9 text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all rounded-none"
                      title="Edit session"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(m.id)}
                      className="h-9 w-9 text-grey-400 hover:text-white hover:bg-red-500 border-2 border-transparent hover:border-red-500 transition-all rounded-none"
                      title="Remove session"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
