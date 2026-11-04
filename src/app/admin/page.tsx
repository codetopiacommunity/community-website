"use client";

import { Calendar, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { getUpcomingEventsCount } from "@/actions/event";

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
  const [adminUser, setAdminUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const data = await res.json();
          setAdminUser({ name: data.name, email: data.email });
        }
      } catch (error) {
        console.error("Failed to fetch admin:", error);
      }
    };
    fetchAdmin();
  }, []);

  const [upcomingEventsCount, setUpcomingEventsCount] = useState<number | null>(
    null,
  );

  useEffect(() => {
    getUpcomingEventsCount().then(setUpcomingEventsCount);
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
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-zinc-100">
        <div>
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            Community operations
          </p>
          <h1 className="font-sans text-3xl font-black tracking-tight text-zinc-900">
            Welcome back{adminUser?.name ? `, ${adminUser.name}` : ""}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="font-mono text-xs text-zinc-500">
              Manage community content, programs, events, and communications.
            </p>
            {adminUser?.email && (
              <>
                <span className="text-zinc-300">·</span>
                <p className="hidden font-mono text-xs text-zinc-400 sm:block">
                  {adminUser.email}
                </p>
              </>
            )}
          </div>
        </div>
        <a
          href="https://resend.com/broadcasts"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Newsletter in Resend
        </a>
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
    </div>
  );
}
