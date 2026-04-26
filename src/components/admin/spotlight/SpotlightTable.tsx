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
      const res = await fetch(`/api/admin/spotlight/${id}/feature`, {
        method: "PATCH",
      });
      if (res.ok) {
        toast.success("Spotlight featured");
        onRefetch();
      } else toast.error("Failed to feature spotlight");
    } catch {
      toast.error("An error occurred");
    }
    setFeaturingId(null);
  };

  return (
    <div className="bg-white border border-zinc-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900">
          Spotlights
        </h2>
        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
          {spotlights.length} {spotlights.length === 1 ? "Entry" : "Entries"}
        </span>
      </div>

      {loading && (
        <div className="p-20 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      )}

      {!loading && spotlights.length === 0 && (
        <div className="py-16 text-center">
          <Sparkles className="h-8 w-8 mx-auto text-zinc-200 mb-3" />
          <p className="font-mono text-sm font-semibold text-zinc-900">
            No spotlights yet
          </p>
          <p className="font-mono text-xs text-zinc-400 mt-1">
            Add your first spotlight to feature a person on the home page.
          </p>
          <button
            type="button"
            onClick={onAddFirst}
            className="mt-4 inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
          >
            Add First Spotlight
          </button>
        </div>
      )}

      {!loading && spotlights.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="bg-black text-[10px] font-bold uppercase tracking-widest text-white">
                <th className="text-left px-6 py-3">Person</th>
                <th className="text-left px-6 py-3 hidden md:table-cell">
                  Role
                </th>
                <th className="text-left px-6 py-3">Featured</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {spotlights.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-zinc-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 overflow-hidden border border-zinc-200 shrink-0">
                        <Image
                          src={s.imageUrl}
                          alt={s.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <p className="font-mono font-semibold text-sm text-zinc-900">
                        {s.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell font-mono text-xs text-zinc-500">
                    {s.role}
                  </td>
                  <td className="px-6 py-4">
                    {s.featured ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest bg-black text-white px-2 py-0.5 border border-black">
                        <Star className="h-2.5 w-2.5 fill-white" /> Featured
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFeature(s.id)}
                        disabled={featuringId === s.id}
                        className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-zinc-400 border border-zinc-200 px-2 py-0.5 hover:border-zinc-900 hover:text-zinc-900 transition-colors disabled:opacity-50"
                      >
                        {featuringId === s.id ? (
                          <Loader2 className="h-2.5 w-2.5 animate-spin" />
                        ) : (
                          <Star className="h-2.5 w-2.5" />
                        )}
                        Set Featured
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(s)}
                        className="h-8 w-8 hover:bg-zinc-100 transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(s.id)}
                        className="h-8 w-8 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
