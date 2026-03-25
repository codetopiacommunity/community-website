"use client";

import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  Plus,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getSubscriberCount } from "@/actions/subscriber";

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

const newsletterLogs = [
  {
    id: "1",
    subject: "March Community Update",
    status: "Success",
    recipients: "1,240",
    date: "2026-03-22 14:00",
  },
  {
    id: "2",
    subject: "New Workshop: AI Fundamentals",
    status: "Success",
    recipients: "1,235",
    date: "2026-03-15 09:30",
  },
  {
    id: "3",
    subject: "Weekend Hackathon Reminder",
    status: "Failed",
    recipients: "1,230",
    date: "2026-03-10 18:45",
    error: "SMTP Timeout",
  },
  {
    id: "4",
    subject: "Welcome to Codetopia",
    status: "Success",
    recipients: "45",
    date: "2026-03-05 10:15",
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
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

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

  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      const count = await getSubscriberCount();
      setSubscriberCount(count);
    }
    fetchCounts();
  }, []);

  const displayStats = [
    {
      name: "Upcoming Events",
      value: "08",
      icon: Calendar,
      duration: 1200,
    },
    {
      name: "Newsletter Subscribers",
      value:
        subscriberCount === null ? "..." : subscriberCount.toLocaleString(),
      icon: Mail,
      duration: 800, // Shorter duration to "snap" into place after loading
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-black mb-1 font-sans uppercase">
            ADMIN CENTER
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-grey-500 text-[10px] font-mono uppercase tracking-widest leading-none">
              Broadcast Control & Event Management Protocol
            </p>
            {adminEmail && (
              <>
                <div className="h-1 w-1 rounded-full bg-grey-300" />
                <p className="text-black text-[10px] font-mono font-bold uppercase tracking-widest leading-none">
                  {adminEmail}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-grey-100 text-black px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-black hover:text-white transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            New Event
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-grey-800 transition-all shadow-lg border border-white/10"
          >
            <Mail className="h-3.5 w-3.5" />
            New Newsletter
          </button>
        </div>
      </div>

      {/* Stats Grid - Monochrome Codetopia Style with Counting Animation */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 delay-150 duration-500 animate-in fade-in slide-in-from-bottom-2 fill-mode-both">
        {displayStats.map((stat) => (
          <div
            key={stat.name}
            className="group relative overflow-hidden rounded-xl bg-white p-6 border border-black border-l-[6px] shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
          >
            <div className="flex items-start justify-between font-mono">
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-grey-400 uppercase tracking-[0.2em] mb-2">
                  {stat.name}
                </p>
                <p className="text-4xl font-black text-black tracking-tighter leading-none">
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
              <div className="p-2.5 bg-black rounded-lg translate-y-[-2px] rotate-[-2deg] group-hover:rotate-0 group-hover:scale-110 transition-all">
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area: Newsletter Logs */}
      <div className="space-y-6 delay-300 duration-500 animate-in fade-in slide-in-from-bottom-2 fill-mode-both">
        <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden shadow-sm hover:border-grey-200 transition-all duration-300">
          <div className="p-6 border-b border-grey-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-grey-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-grey-400" />
              Newsletter Delivery Logs
            </h2>
            <button
              type="button"
              className="text-sm text-grey-500 hover:text-black transition-colors flex items-center gap-1 font-medium group"
            >
              Refresh logs
              <ExternalLink className="h-3 w-3 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-black text-[11px] font-bold uppercase tracking-widest text-white">
                  <th className="px-6 py-4">Newsletter Subject</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Total Sent</th>
                  <th className="px-6 py-4 text-right">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-grey-50">
                {newsletterLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-grey-50/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-grey-900">
                          {log.subject}
                        </span>
                        {log.error && (
                          <span className="text-[10px] text-red-500 font-medium">
                            {log.error}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          log.status === "Success"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-red-50 text-red-700 border border-red-100"
                        }`}
                      >
                        {log.status === "Success" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        {log.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-grey-600 font-medium">
                      {log.recipients} users
                    </td>
                    <td className="px-6 py-4 text-sm text-grey-400 font-mono text-right">
                      {log.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-grey-50/50 border-t border-grey-50 text-center">
            <button
              type="button"
              className="text-sm font-bold text-grey-500 hover:text-black transition-colors underline-offset-4 hover:underline"
            >
              Load more history
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
