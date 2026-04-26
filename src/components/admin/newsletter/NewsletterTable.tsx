"use client";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit2,
  Mail,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Newsletter } from "@/types";

export interface NewsletterFull extends Newsletter {
  previewText: string | null;
  markdownContent: string;
  recipientCount: number;
  sentAt: Date | null;
  errorMessage: string | null;
}

interface NewsletterTableProps {
  newsletters: NewsletterFull[];
  loading: boolean;
  onEdit: (n: NewsletterFull) => void;
  onDuplicate: (id: number) => void;
  onDelete: (id: number) => void;
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

const statusStyles: Record<string, string> = {
  draft: "bg-zinc-100 text-zinc-600 border-zinc-200",
  sending: "bg-amber-50 text-amber-700 border-amber-200",
  sent: "bg-emerald-50 text-emerald-700 border-emerald-200",
  failed: "bg-red-50 text-red-700 border-red-200",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest border ${statusStyles[status] ?? "bg-zinc-100 text-zinc-600 border-zinc-200"}`}
    >
      {status}
    </span>
  );
}

export function NewsletterTable({
  newsletters,
  loading,
  onEdit,
  onDuplicate,
  onDelete,
  page,
  totalPages,
  total,
  onPageChange,
}: NewsletterTableProps) {
  return (
    <div className="bg-white border border-zinc-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900">
          Newsletters
        </h2>
        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
          {total} Total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-black text-[10px] font-mono font-bold uppercase tracking-widest text-white">
              <th className="px-6 py-3 text-left">Subject</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Recipients</th>
              <th className="px-6 py-3 text-left">Sent At</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {loading &&
              [...Array(3)].map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <tr key={i}>
                  {[...Array(5)].map((__, j) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 bg-zinc-100 animate-pulse w-3/4" />
                    </td>
                  ))}
                </tr>
              ))}

            {!loading && newsletters.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <Mail className="h-8 w-8 mx-auto text-zinc-200 mb-3" />
                  <p className="font-mono text-sm font-semibold text-zinc-900">
                    No newsletters yet
                  </p>
                  <p className="font-mono text-xs text-zinc-400 mt-1 uppercase tracking-widest">
                    Create your first newsletter to get started
                  </p>
                </td>
              </tr>
            )}

            {!loading &&
              newsletters.map((newsletter) => {
                const isDraft = newsletter.status === "draft";
                return (
                  <tr
                    key={newsletter.id}
                    className="hover:bg-zinc-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono font-semibold text-sm text-zinc-900 line-clamp-1 max-w-xs block">
                        {newsletter.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={newsletter.status} />
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-600">
                      {newsletter.recipientCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-400">
                      {newsletter.sentAt
                        ? new Date(newsletter.sentAt).toLocaleDateString(
                            undefined,
                            { year: "numeric", month: "short", day: "numeric" },
                          )
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {isDraft && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(newsletter)}
                            className="h-7 px-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                          >
                            <Edit2 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDuplicate(newsletter.id)}
                          className="h-7 px-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Dupe
                        </Button>
                        {isDraft && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(newsletter.id)}
                            className="h-7 px-2 font-mono text-[10px] font-bold uppercase tracking-widest text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Del
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-3 border-t border-zinc-100 flex items-center justify-between bg-zinc-50">
          <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1 || loading}
              className="p-1.5 border border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-7 h-7 font-mono text-[10px] font-bold transition-colors ${p === page ? "bg-black text-white" : "border border-zinc-200 text-zinc-600 hover:border-zinc-900 bg-white"}`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages || loading}
              className="p-1.5 border border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
