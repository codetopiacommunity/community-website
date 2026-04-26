"use client";

import { format } from "date-fns";
import { Briefcase, Building2, Calendar, Edit2, Loader2, MapPin, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Career, getCareerStatus } from "@/lib/careers";

interface CareersTableProps {
  careers: Career[];
  loading: boolean;
  onEdit: (career: Career) => void;
  onDelete: (id: number) => void;
  onAddFirst: () => void;
}

export function CareersTable({ careers, loading, onEdit, onDelete, onAddFirst }: CareersTableProps) {
  return (
    <div className="bg-white border border-zinc-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900">
          Positions Log
        </h2>
        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
          {careers.length} {careers.length === 1 ? "Position" : "Positions"}
        </span>
      </div>

      {loading && (
        <div className="p-20 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      )}

      {!loading && careers.length === 0 && (
        <div className="py-16 text-center">
          <Briefcase className="h-8 w-8 mx-auto text-zinc-200 mb-3" />
          <p className="font-mono text-sm font-semibold text-zinc-900">No career listings yet</p>
          <p className="font-mono text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
            Post internships, job offers, or project roles.
          </p>
          <button
            type="button"
            onClick={onAddFirst}
            className="mt-4 inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
          >
            Post First Opportunity
          </button>
        </div>
      )}

      {!loading && careers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="bg-black text-[10px] font-bold uppercase tracking-widest text-white">
                <th className="text-left px-6 py-3">Position</th>
                <th className="text-left px-6 py-3">Type / Location</th>
                <th className="text-left px-6 py-3">Expiry</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {careers.map((career) => {
                const status = getCareerStatus(career);
                return (
                  <tr key={career.id} className="hover:bg-zinc-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <p className="font-mono font-semibold text-sm text-zinc-900">{career.title}</p>
                        {career.isFeatured && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Building2 className="h-3 w-3 text-zinc-400" />
                        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">{career.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-mono text-xs text-zinc-700">{career.type}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-zinc-400" />
                        <span className="font-mono text-[10px] text-zinc-400">{career.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-zinc-400" />
                        <span className="font-mono text-xs text-zinc-500">
                          {format(new Date(career.expiryDate), "MMM dd, yyyy")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest border ${
                        status === "open"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => onEdit(career)}
                          className="h-8 w-8 hover:bg-zinc-100 transition-colors">
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDelete(career.id)}
                          className="h-8 w-8 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
