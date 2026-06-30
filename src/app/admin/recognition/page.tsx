"use client";

import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Recognition {
  id: number;
  portalUsername: string;
  category: string;
  awardName: string;
  period: string;
  isPublished: boolean;
  order: number;
}

export default function ManageRecognitionPage() {
  const [items, setItems] = useState<Recognition[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/recognition");
      setItems(res.ok ? await res.json() : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function remove(id: number) {
    if (!confirm("Delete this honoree?")) return;
    try {
      const res = await fetch(`/api/admin/recognition/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast.success("Honoree removed.");
      fetchItems();
    } catch {
      toast.error("Failed to delete.");
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 pb-8 border-b border-grey-100 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-black uppercase font-sans">
            Wall of <span className="text-grey-400">Impact</span>
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-grey-400">
            Honorees · member identity pulled live from the portal
          </p>
        </div>
        <Link href="/admin/recognition/new">
          <Button className="h-11 bg-black text-white rounded-xl text-[10px] uppercase font-bold tracking-widest shadow-none hover:bg-grey-900 active:scale-[0.98] transition-all flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Honoree
          </Button>
        </Link>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-24 text-grey-300">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-grey-200 rounded-2xl bg-white py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-grey-300">
            No honorees yet.
          </p>
          <Link
            href="/admin/recognition/new"
            className="mt-4 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-black hover:text-grey-600 transition-colors"
          >
            <Plus className="h-3 w-3" />
            Add the first one
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-grey-100 rounded-2xl overflow-hidden">
          {/* Column headers */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1.5fr_1fr_auto] gap-4 border-b border-grey-50 bg-grey-50/50 px-6 py-3">
            {["Member", "Category", "Award", "Period", ""].map((h, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: static header
                key={i}
                className="font-mono text-[9px] font-bold uppercase tracking-widest text-grey-400"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="divide-y divide-grey-50">
            {items.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-1 gap-3 px-6 py-4 md:grid-cols-[2fr_1fr_1.5fr_1fr_auto] md:items-center hover:bg-grey-50/30 transition-colors"
              >
                <div className="flex items-center gap-2 font-mono text-sm font-bold text-black">
                  @{r.portalUsername}
                  {!r.isPublished && (
                    <span className="border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-amber-600 rounded-full">
                      Draft
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs text-grey-400 uppercase tracking-widest">
                  {r.category.replace(/_/g, " ")}
                </span>
                <span className="truncate font-mono text-xs text-grey-600">
                  {r.awardName}
                </span>
                <span className="font-mono text-xs text-grey-400">
                  {r.period}
                </span>
                <div className="flex items-center gap-3 md:justify-end">
                  <Link
                    href={`/admin/recognition/${r.id}/edit`}
                    className="text-grey-300 hover:text-black transition-colors"
                    aria-label="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(r.id)}
                    aria-label="Delete"
                    className="text-grey-200 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
