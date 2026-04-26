"use client";

import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Mail,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUpcomingEventsCount } from "@/actions/event";
import { getSubscriberCount } from "@/actions/subscriber";

type NewsletterLog = {
  id: string;
  newsletterId: string;
  totalRecipients: number;
  successCount: number;
  failCount: number;
  status: string;
  completedAt: string | null;
  createdAt: string;
  newsletter: { subject: string };
};

const _stats = [
  {
    name: "Upcoming Events",
    value: "08",
    icon: Calendar,
  },
  {
    name: "Newsletter Subscribers",
    value: "1,248",
    icon: Mail,
  },
];

function Counter({
  end,
  duration = 1200,
  pad = 0,
}: {
  end: string;
  duration?: number;
  pad?: number;
}) {
  const [count, setCount] = useState(0);
  const target = Number.parseInt(end.replace(/,/g, ""), 10);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  const formatted = count.toLocaleString();
  return <span>{pad > 0 ? formatted.padStart(pad, "0") : formatted}</span>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [newsletterLogs, setNewsletterLogs] = useState<NewsletterLog[]>([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const data = await res.json();
          setAdminEmail(data.email);
        }
      } catch (error) {
        console.error("Failed to fetch admin:", error);
      }
    };
    fetchAdmin();
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("/api/admin/newsletter/logs");
        if (res.ok) {
          const data = await res.json();
          setNewsletterLogs(data.logs ?? data);
        }
      } catch (error) {
        console.error("Failed to fetch newsletter logs:", error);
      }
    };
    fetchLogs();
  }, []);

  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [upcomingEventsCount, setUpcomingEventsCount] = useState<number | null>(
    null,
  );

  useEffect(() => {
    async function fetchCounts() {
      const subCount = await getSubscriberCount();
      const eventCount = await getUpcomingEventsCount();
      setSubscriberCount(subCount);
      setUpcomingEventsCount(eventCount);
    }
    fetchCounts();
  }, []);

  const displayStats = [
    {
      name: "Upcoming Events",
      value:
        upcomingEventsCount === null
          ? "..."
          : upcomingEventsCount.toString().padStart(2, "0"),
      icon: Calendar,
      duration: 800,
    },
    {
      name: "Newsletter Subscribers",
      value:
        subscriberCount === null ? "..." : subscriberCount.toLocaleString(),
      icon: Mail,
      duration: 800,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-zinc-100">
        <div>
          <h1 className="font-sans font-black uppercase text-2xl tracking-widest text-zinc-900">
            Admin Center
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              Broadcast Control & Event Management Protocol
            </p>
            {adminEmail && (
              <>
                <span className="text-zinc-300">·</span>
                <p className="font-mono text-xs font-bold text-zinc-900 uppercase tracking-widest">
                  {adminEmail}
                </p>
              </>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => router.push("/admin/newsletter")}
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
        >
          <Mail className="h-3.5 w-3.5" />
          New Newsletter
        </button>
      </div>

      {/* Stats */}
      <section className="space-y-3">
        <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900">
          Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {displayStats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white border border-zinc-200 p-6 space-y-1"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                  {stat.name}
                </p>
                <stat.icon className="h-4 w-4 text-zinc-400" />
              </div>
              <p className="font-mono font-black text-4xl text-zinc-900 tracking-tighter leading-none">
                {stat.value === "..." ? (
                  "..."
                ) : (
                  <Counter
                    end={stat.value}
                    duration={stat.duration}
                    pad={stat.value.startsWith("0") ? stat.value.length : 0}
                  />
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Delivery Logs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900">
            Newsletter Delivery Logs
          </h2>
          <button
            type="button"
            onClick={() => router.push("/admin/newsletter")}
            className="font-mono text-xs text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1"
          >
            View all <ExternalLink className="h-3 w-3" />
          </button>
        </div>

        <div className="bg-white border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-black text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Sent</th>
                  <th className="px-6 py-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {newsletterLogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center font-mono text-sm text-zinc-400"
                    >
                      No broadcast history yet
                    </td>
                  </tr>
                ) : (
                  newsletterLogs.map((log) => {
                    const statusKey = log.status.toLowerCase();
                    const badgeClass =
                      statusKey === "sent"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : statusKey === "failed"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200";
                    const StatusIcon =
                      statusKey === "sent"
                        ? CheckCircle2
                        : statusKey === "failed"
                          ? XCircle
                          : AlertCircle;
                    const displayDate = log.completedAt
                      ? new Date(log.completedAt).toLocaleString()
                      : new Date(log.createdAt).toLocaleString();

                    return (
                      <tr
                        key={log.id}
                        className="hover:bg-zinc-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono text-sm font-semibold text-zinc-900">
                          {log.newsletter.subject}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-widest border ${badgeClass}`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {log.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-zinc-600">
                          {log.successCount.toLocaleString()} /{" "}
                          {log.totalRecipients.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-zinc-400 text-right">
                          {displayDate}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
