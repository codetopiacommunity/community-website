import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const scheduledEvents = [
  {
    id: "01",
    status: "LIVE",
    classification: "BUILD TOGETHER",
    title: "Weekend Co-Working Session",
    description:
      "Dedicated silent and collaborative building hours for the community to unblock each other.",
    datetime: "2026.04.12 // 18:00 GMT",
    link: "#",
    actionText: "JOIN SESSION",
  },
  {
    id: "02",
    status: "UPCOMING",
    classification: "OPEN SOURCE SPRINT",
    title: "African Open Source Tooling",
    description:
      "48-hour sprint to build and contribute to local open source initiatives.",
    datetime: "2026.04.20 // 09:00 GMT",
    link: "#",
    actionText: "RESERVE SPOT",
  },
  {
    id: "03",
    status: "UPCOMING",
    classification: "ENGINEERING SYNC",
    title: "Tech Talk: Modern Tooling",
    description:
      "Member-led deep dive into modern development workflows and scalable abstractions.",
    datetime: "2026.05.05 // 14:00 GMT",
    link: "#",
    actionText: "RESERVE SPOT",
  },
];

export function EventsLedger() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl flex flex-col border-t border-zinc-800">
        {/* Ledger Header (Hidden on Mobile) */}
        <div className="hidden lg:grid grid-cols-[1fr_2fr_3fr_1.5fr] gap-6 py-6 border-b border-zinc-800 text-zinc-600 font-mono text-xs uppercase tracking-[0.2em]">
          <div>Datetime / Status</div>
          <div>Classification</div>
          <div>The Brief</div>
          <div className="text-right">Action</div>
        </div>

        {/* Ledger Rows */}
        {scheduledEvents.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col lg:grid lg:grid-cols-[1fr_2fr_3fr_1.5fr] items-start lg:items-center gap-6 py-12 border-b border-zinc-800 transition-colors hover:bg-zinc-900/30 overflow-hidden"
          >
            {/* Massive subtle background number on hover across the whole row */}
            <span className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] font-black text-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none select-none z-0">
              {item.id}
            </span>

            {/* Datetime & Status */}
            <div className="relative z-10 flex flex-col items-start gap-4">
              <span className="font-mono text-sm text-zinc-400">
                {item.datetime}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] font-bold border ${
                  item.status === "LIVE"
                    ? "border-green-500/30 text-green-400 bg-green-500/10"
                    : "border-zinc-700 text-zinc-400"
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* Classification */}
            <div className="relative z-10 font-mono text-sm uppercase tracking-[0.1em] text-zinc-300">
              {item.classification}
            </div>

            {/* The Brief */}
            <div className="relative z-10 flex flex-col gap-2">
              <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-sans text-white">
                {item.title}
              </h4>
              <p className="text-zinc-500 font-mono text-sm max-w-md leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Action */}
            <div className="relative z-10 w-full lg:w-auto lg:text-right mt-6 lg:mt-0 lg:ml-auto">
              <Link
                href={item.link}
                className={`group/btn relative inline-flex items-center justify-center lg:justify-end gap-4 w-full lg:w-auto px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                  item.status === "LIVE"
                    ? "bg-green-500 text-black hover:bg-green-400"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                {item.actionText}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
