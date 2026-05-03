"use client";

import { format } from "date-fns";
import {
  Briefcase,
  Building2,
  Calendar,
  Edit2,
  MapPin,
  Star,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Career, getCareerStatus } from "@/lib/careers";

interface CareersTableProps {
  careers: Career[];
  loading: boolean;
  onEdit: (career: Career) => void;
  onDelete: (id: number) => void;
  onAddFirst: () => void;
}

export function CareersTable({
  careers,
  loading,
  onEdit,
  onDelete,
  onAddFirst,
}: CareersTableProps) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-grey-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-lg">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">
              Positions Log
            </h2>
          </div>
          <div className="h-6 w-20 bg-grey-100 rounded-lg animate-pulse" />
        </div>
        {(["sk-0", "sk-1", "sk-2"] as const).map((key) => (
          <div
            key={key}
            className="flex items-center gap-4 p-5 border-b border-grey-50 last:border-b-0 animate-pulse"
          >
            <div className="h-12 w-12 rounded-xl bg-grey-100 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-grey-100 rounded w-1/3" />
              <div className="h-2 bg-grey-50 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (careers.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-grey-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-lg">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">
              Positions Log
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold bg-grey-50 px-3 py-1.5 rounded-lg text-black uppercase tracking-widest border border-grey-100">
            0 Positions
          </span>
        </div>
        <div className="px-6 py-20 text-center flex flex-col items-center gap-5">
          <div className="p-5 bg-grey-50 border border-grey-100 rounded-2xl">
            <Briefcase className="h-10 w-10 text-grey-300" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-black font-black uppercase tracking-tight text-lg font-sans">
              No career listings yet
            </h3>
            <p className="text-grey-400 text-sm max-w-[320px] mx-auto font-medium font-mono leading-relaxed">
              Start building the community pipeline. Post internships, job
              offers, or project roles to find your next top talent.
            </p>
          </div>
          <Button
            onClick={onAddFirst}
            className="mt-2 text-[10px] font-black uppercase tracking-widest bg-black text-white px-8 h-12 rounded-xl hover:bg-grey-800 transition-all active:scale-[0.98] shadow-none"
          >
            Post First Opportunity
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-grey-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">
            Positions Log
          </h2>
        </div>
        <span className="text-[10px] font-mono font-bold bg-grey-50 px-3 py-1.5 rounded-lg text-black uppercase tracking-widest border border-grey-100">
          {careers.length} {careers.length === 1 ? "Position" : "Positions"}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="border-b border-grey-100 bg-grey-50/50">
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-grey-500">
                Position
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-grey-500">
                Type / Location
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-grey-500">
                Expiry
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-grey-500">
                Status
              </th>
              <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-grey-500">
                Controls
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grey-50">
            {careers.map((career) => {
              const status = getCareerStatus(career);
              return (
                <tr
                  key={career.id}
                  className="hover:bg-grey-50/40 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm tracking-tight text-black font-sans">
                        {career.title}
                      </span>
                      {career.isFeatured && (
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Building2 className="h-3 w-3 text-grey-400" />
                      <span className="text-[10px] text-grey-500 font-mono uppercase tracking-wider">
                        {career.company}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-grey-700">
                        {career.type}
                      </span>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-grey-400" />
                        <span className="text-[10px] text-grey-500">
                          {career.location}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-grey-400" />
                      <span className="text-xs text-grey-600">
                        {format(new Date(career.expiryDate), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <Badge
                      variant="outline"
                      className={`text-[9px] uppercase tracking-widest font-mono border-none px-2 h-5 flex items-center justify-center w-fit ${
                        status === "open"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {status}
                    </Badge>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-40 sm:group-hover:opacity-100 transition-all duration-300">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(career)}
                        className="h-9 w-9 text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all rounded-xl"
                        title="Edit position"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(career.id)}
                        className="h-9 w-9 text-grey-400 hover:text-white hover:bg-red-500 border-2 border-transparent hover:border-black transition-all rounded-xl"
                        title="Remove position"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
