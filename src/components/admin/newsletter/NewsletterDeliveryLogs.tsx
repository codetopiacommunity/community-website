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

function LogStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    sent: "bg-green-50 text-green-700 border border-green-200",
    partial: "bg-amber-50 text-amber-700 border border-amber-200",
    failed: "bg-red-50 text-red-700 border border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-widest ${styles[status] ?? "bg-grey-100 text-grey-600 border border-grey-200"}`}
    >
      {status}
    </span>
  );
}

export function NewsletterDeliveryLogs() {
  const [logs, setLogs] = useState<DeliveryLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchLogs = useCallback(
    async (currentOffset: number, append: boolean) => {
      if (append) setLoadingMore(true);
      else setLoading(true);

      try {
        const res = await fetch(
          `/api/admin/newsletter/logs?offset=${currentOffset}`,
        );
        if (!res.ok) return;
        const data = await res.json();
        setLogs((prev) => (append ? [...prev, ...data.logs] : data.logs));
        setHasMore(data.hasMore);
        setOffset(currentOffset + data.logs.length);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchLogs(0, false);
  }, [fetchLogs]);

  return (
    <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden">
      <div className="p-6 border-b border-grey-100 flex items-center gap-3">
        <div className="p-2 bg-black rounded-lg">
          <Activity className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">
          Delivery Logs
        </h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-grey-400" />
        </div>
      ) : logs.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16">
          <Activity className="h-10 w-10 text-grey-200" />
          <p className="text-sm font-black text-black uppercase tracking-tighter">
            No logs yet
          </p>
          <p className="text-grey-400 font-mono text-xs uppercase tracking-widest">
            Logs appear after sending a newsletter
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-grey-100 bg-grey-50/50">
                  {["Subject", "Status", "Sent", "Failed", "Completed"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-widest text-grey-500"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-grey-100 last:border-0 hover:bg-grey-50/40 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <span className="font-sans font-semibold text-black text-sm line-clamp-1 max-w-xs block">
                        {log.newsletter.subject}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <LogStatusBadge status={log.status} />
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono text-xs text-green-700">
                        {log.successCount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono text-xs text-red-600">
                        {log.failCount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono text-xs text-grey-600">
                        {new Date(log.completedAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hasMore && (
            <div className="px-6 py-4 border-t border-grey-100 flex justify-center">
              <button
                type="button"
                onClick={() => fetchLogs(offset, true)}
                disabled={loadingMore}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-grey-600 hover:text-black transition-colors disabled:opacity-50"
              >
                {loadingMore ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
                {loadingMore ? "LOADING..." : "LOAD 5 MORE"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
