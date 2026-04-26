"use client";

import { Activity, ChevronDown, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface DeliveryLog {
  id: number;
  newsletterId: number;
  totalRecipients: number;
  successCount: number;
  failCount: number;
  status: string;
  completedAt: string;
  newsletter: { subject: string };
}

const statusStyles: Record<string, string> = {
  sent: "bg-emerald-50 text-emerald-700 border-emerald-200",
  partial: "bg-amber-50 text-amber-700 border-amber-200",
  failed: "bg-red-50 text-red-700 border-red-200",
};

export function NewsletterDeliveryLogs() {
  const [logs, setLogs] = useState<DeliveryLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchLogs = useCallback(async (currentOffset: number, append: boolean) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    try {
      const res = await fetch(`/api/admin/newsletter/logs?offset=${currentOffset}`);
      if (!res.ok) return;
      const data = await res.json();
      setLogs((prev) => (append ? [...prev, ...data.logs] : data.logs));
      setHasMore(data.hasMore);
      setOffset(currentOffset + data.logs.length);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => { fetchLogs(0, false); }, [fetchLogs]);

  return (
    <div className="bg-white border border-zinc-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900">
          Delivery Logs
        </h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      ) : logs.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16">
          <Activity className="h-8 w-8 text-zinc-200" />
          <p className="font-mono text-sm font-semibold text-zinc-900">No logs yet</p>
          <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            Logs appear after sending a newsletter
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-black text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                  {["Subject", "Status", "Sent", "Failed", "Completed"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-sm text-zinc-900 max-w-xs">
                      <span className="line-clamp-1 block">{log.newsletter.subject}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest border ${statusStyles[log.status] ?? "bg-zinc-100 text-zinc-600 border-zinc-200"}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-emerald-700">
                      {log.successCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-red-600">
                      {log.failCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-400">
                      {new Date(log.completedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hasMore && (
            <div className="px-6 py-3 border-t border-zinc-100 flex justify-center bg-zinc-50">
              <button
                type="button"
                onClick={() => fetchLogs(offset, true)}
                disabled={loadingMore}
                className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors disabled:opacity-50"
              >
                {loadingMore ? <Loader2 className="h-3 w-3 animate-spin" /> : <ChevronDown className="h-3 w-3" />}
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
