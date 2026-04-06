"use client";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit2,
  Loader2,
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: "bg-grey-100 text-grey-600 border border-grey-200",
    sending: "bg-amber-50 text-amber-700 border border-amber-200",
    sent: "bg-green-50 text-green-700 border border-green-200",
    failed: "bg-red-50 text-red-700 border border-red-200",
  };

  const style =
    styles[status] ?? "bg-grey-100 text-grey-600 border border-grey-200";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-widest ${style}`}
    >
      {status}
    </span>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-grey-100 last:border-0">
      {[...Array(5)].map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows have no meaningful key
        <td key={i} className="px-4 py-4">
          <div className="h-4 bg-grey-100 rounded animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
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
    <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden shadow-none">
      {/* Header */}
      <div className="p-6 border-b border-grey-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg">
            <Mail className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">
            Newsletters
          </h2>
        </div>
        <span className="text-[10px] font-mono font-bold bg-grey-50 px-3 py-1.5 rounded-lg text-black uppercase tracking-widest border border-grey-100">
          {total} Total
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-grey-100 bg-grey-50/50">
              <th className="px-4 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-widest text-grey-500">
                Subject
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-widest text-grey-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-widest text-grey-500">
                Recipients
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-widest text-grey-500">
                Sent At
              </th>
              <th className="px-4 py-3 text-right text-[10px] font-mono font-bold uppercase tracking-widest text-grey-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            )}

            {!loading && newsletters.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Mail className="h-10 w-10 text-grey-200" />
                    <p className="text-sm font-black text-black uppercase tracking-tighter">
                      No newsletters yet
                    </p>
                    <p className="text-grey-400 font-mono text-xs uppercase tracking-widest">
                      Create your first newsletter to get started
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              newsletters.map((newsletter) => {
                const isDraft = newsletter.status === "draft";
                return (
                  <tr
                    key={newsletter.id}
                    className="border-b border-grey-100 last:border-0 hover:bg-grey-50/40 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <span className="font-sans font-semibold text-black text-sm line-clamp-1 max-w-xs block">
                        {newsletter.subject}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={newsletter.status} />
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono text-xs text-grey-600">
                        {newsletter.recipientCount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono text-xs text-grey-600">
                        {newsletter.sentAt
                          ? new Date(newsletter.sentAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {isDraft && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(newsletter)}
                            className="h-8 px-3 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                          >
                            <Edit2 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDuplicate(newsletter.id)}
                          className="h-8 px-3 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Duplicate
                        </Button>
                        {isDraft && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(newsletter.id)}
                            className="h-8 px-3 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest text-red-600 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
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

      {/* Loading overlay spinner (for in-place refresh) */}
      {loading && newsletters.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-2xl">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-grey-100 flex items-center justify-between">
          <span className="text-[10px] font-mono text-grey-500 uppercase tracking-widest">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1 || loading}
              className="p-1.5 rounded-lg border border-grey-200 text-grey-600 hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                disabled={loading}
                className={`w-7 h-7 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  p === page
                    ? "bg-black text-white"
                    : "border border-grey-200 text-grey-600 hover:border-black hover:text-black"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages || loading}
              className="p-1.5 rounded-lg border border-grey-200 text-grey-600 hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next page"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
