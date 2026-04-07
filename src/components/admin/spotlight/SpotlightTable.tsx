"use client";

import { Loader2, Pencil, Sparkles, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Spotlight } from "@/types";

interface SpotlightTableProps {
  spotlights: Spotlight[];
  loading: boolean;
  onEdit: (s: Spotlight) => void;
  onDelete: (id: number) => void;
  onAddFirst: () => void;
  onRefetch: () => void;
}

export function SpotlightTable({
  spotlights,
  loading,
  onEdit,
  onDelete,
  onAddFirst,
  onRefetch,
}: SpotlightTableProps) {
  const [featuringId, setFeaturingId] = useState<number | null>(null);

  const handleFeature = async (id: number) => {
    setFeaturingId(id);
    try {
      const res = await fetch(`/api/admin/spotlight/${id}/feature`, { method: "PATCH" });
      if (res.ok) {
        toast.success("Spotlight featured");
        onRefetch();
      } else {
        toast.error("Failed to feature spotlight");
      }
    } catch {
      toast.error("An error occurred");
    }
    setFeaturingId(null);
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden">
        <div className="p-6 border-b border-grey-100 flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg"><Sparkles className="h-4 w-4 text-white" /></div>
          <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">Spotlights</h2>
        </div>
        {(["sk-0", "sk-1", "sk-2"] as const).map((key) => (
          <div key={key} className="flex items-center gap-4 p-5 border-b border-grey-50 last:border-b-0 animate-pulse">
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

  if (spotlights.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden">
        <div className="p-6 border-b border-grey-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-lg"><Sparkles className="h-4 w-4 text-white" /></div>
            <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">Spotlights</h2>
          </div>
          <span className="text-[10px] font-mono font-bold bg-grey-50 px-3 py-1.5 rounded-lg text-black uppercase tracking-widest border border-grey-100">0 Entries</span>
        </div>
        <div className="px-6 py-20 text-center flex flex-col items-center gap-5">
          <div className="p-5 bg-grey-50 border border-grey-100 rounded-2xl">
            <Sparkles className="h-10 w-10 text-grey-300" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-black font-black uppercase tracking-tight text-lg font-sans">No spotlights yet</h3>
            <p className="text-grey-400 text-sm max-w-[320px] mx-auto font-medium font-mono">
              Add your first spotlight to feature a person on the home page.
            </p>
          </div>
          <Button onClick={onAddFirst} className="mt-2 text-xs font-black uppercase tracking-widest bg-black text-white px-8 h-12 rounded-xl hover:bg-grey-800 transition-all active:scale-[0.98]">
            Add First Spotlight
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden">
      <div className="p-6 border-b border-grey-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg"><Sparkles className="h-4 w-4 text-white" /></div>
          <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">Spotlights</h2>
        </div>
        <span className="text-[10px] font-mono font-bold bg-grey-50 px-3 py-1.5 rounded-lg text-black uppercase tracking-widest border border-grey-100">
          {spotlights.length} {spotlights.length === 1 ? "Entry" : "Entries"}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="border-b border-grey-100 bg-grey-50/50">
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-grey-500">Person</th>
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-grey-500 hidden md:table-cell">Role</th>
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-grey-500">Featured</th>
              <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-grey-500">Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grey-50">
            {spotlights.map((s) => (
              <tr key={s.id} className="hover:bg-grey-50/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-grey-100 flex-shrink-0 bg-grey-50">
                      <Image src={s.imageUrl} alt={s.name} fill className="object-cover" unoptimized />
                    </div>
                    <p className="font-semibold text-black text-sm font-sans">{s.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="font-mono text-xs text-grey-600">{s.role}</span>
                </td>
                <td className="px-6 py-4">
                  {s.featured ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest bg-black text-white px-2.5 py-1 rounded-lg">
                      <Star className="h-3 w-3 fill-white" /> Featured
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleFeature(s.id)}
                      disabled={featuringId === s.id}
                      className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-grey-400 border border-grey-200 px-2.5 py-1 rounded-lg hover:border-black hover:text-black transition-colors disabled:opacity-50"
                    >
                      {featuringId === s.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Star className="h-3 w-3" />}
                      Set Featured
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-40 sm:group-hover:opacity-100 transition-all duration-300">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(s)} className="h-9 w-9 text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all rounded-xl" title="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(s.id)} className="h-9 w-9 text-grey-400 hover:text-white hover:bg-red-500 border-2 border-transparent hover:border-black transition-all rounded-xl" title="Delete">
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
