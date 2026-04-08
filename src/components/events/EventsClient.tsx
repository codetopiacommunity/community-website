"use client";

import { format } from "date-fns";
import { ArrowUpRight, Clock, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { type Event, getEventStatus } from "@/lib/events";

interface EventsClientProps {
  initialEvents: Event[];
}

const cx = "mx-auto w-full max-w-screen-2xl px-6 lg:px-12";

export function EventsClient({ initialEvents }: EventsClientProps) {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [formatFilter, setFormatFilter] = useState<string>("ALL");

  const filteredEvents = useMemo(() => {
    return initialEvents.filter((item) => {
      const status = getEventStatus(item);
      const matchesStatus = statusFilter === "ALL" || status === statusFilter;
      const matchesFormat =
        formatFilter === "ALL" ||
        (formatFilter === "ONLINE" && item.isOnline) ||
        (formatFilter === "IN_PERSON" && !item.isOnline);
      return matchesStatus && matchesFormat;
    });
  }, [initialEvents, statusFilter, formatFilter]);

  const statusOptions = [
    { id: "ALL", label: "ALL OPERATIONS" },
    { id: "UPCOMING", label: "UPCOMING" },
    { id: "LIVE", label: "LIVE NOW" },
    { id: "COMPLETED", label: "COMPLETED" },
  ];

  const formatOptions = [
    { id: "ALL", label: "ALL FORMATS" },
    { id: "ONLINE", label: "ONLINE ONLY" },
    { id: "IN_PERSON", label: "IN-PERSON" },
  ];

  return (
    <div className="w-full flex flex-col">

      {/* Filters — full-width top border, content contained */}
      <div className="w-full border-t border-zinc-800">
        <div className={`${cx} pt-12 pb-8 flex flex-col gap-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="text-white/20">01 /</span> STATUS FILTER
              </span>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setStatusFilter(opt.id)}
                    className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                      statusFilter === opt.id
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="text-white/20">02 /</span> FORMAT FILTER
              </span>
              <div className="flex flex-wrap gap-2">
                {formatOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setFormatFilter(opt.id)}
                    className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                      formatFilter === opt.id
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {(statusFilter !== "ALL" || formatFilter !== "ALL") && (
            <div className="flex items-center gap-6 animate-in fade-in slide-in-from-left-4 duration-500">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                ACTIVE SELECTION:
              </span>
              <button
                type="button"
                onClick={() => { setStatusFilter("ALL"); setFormatFilter("ALL"); }}
                className="group flex items-center gap-2 font-mono text-[10px] text-white uppercase tracking-[0.2em] border-b border-white pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-all"
              >
                CLEAR ALL FILTERS
                <X className="w-3 h-3 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table header — full-width borders, content contained */}
      <div className="hidden lg:block w-full border-t border-b border-zinc-800">
        <div className={`${cx} grid grid-cols-[1.5fr_2fr_4fr_1fr] gap-6 py-6 text-white/30 font-mono text-[10px] uppercase tracking-[0.2em]`}>
          <div>Datetime / Status</div>
          <div>Classification</div>
          <div>The Brief</div>
          <div>Action</div>
        </div>
      </div>

      {/* Rows */}
      {filteredEvents.length === 0 ? (
        <div className="w-full border-b border-zinc-800">
          <div className={`${cx} flex flex-col items-center justify-center py-40`}>
            <div className="flex flex-col items-center text-center max-w-md gap-6">
              <h3 className="text-white font-mono text-xs uppercase tracking-[0.4em] font-black">
                NO EVENTS FOUND
              </h3>
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                No activities match{" "}
                <span className="text-zinc-300">[{statusFilter}]</span> /{" "}
                <span className="text-zinc-300">[{formatFilter}]</span>
              </p>
              <button
                type="button"
                onClick={() => { setStatusFilter("ALL"); setFormatFilter("ALL"); }}
                className="text-white font-mono text-[10px] uppercase tracking-[0.3em] border border-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-300"
              >
                CLEAR FILTERS
              </button>
            </div>
          </div>
        </div>
      ) : (
        filteredEvents.map((item, index) => (
          <div
            key={item.id}
            className="group relative w-full border-b border-zinc-800 transition-colors hover:bg-zinc-900/30 overflow-hidden"
          >
            <div className={`${cx} flex flex-col lg:grid lg:grid-cols-[1.5fr_2fr_4fr_1fr] items-start lg:items-center gap-6 py-12`}>
              <span className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] font-black text-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none select-none z-0">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Datetime & Status */}
              <div className="relative z-10 flex flex-col items-start gap-4 uppercase font-mono tracking-wider">
                <div className="space-y-1">
                  <div className="text-zinc-400 text-sm">
                    {format(new Date(item.startDate), "MMM d, yyyy")}
                  </div>
                  <div className="text-zinc-500 text-[10px] font-bold">
                    {format(new Date(item.startDate), "h:mm a")}
                    {item.endDate &&
                      format(new Date(item.startDate), "MMM d") !==
                        format(new Date(item.endDate), "MMM d") && (
                        <span> – {format(new Date(item.endDate), "MMM d, yyyy")}</span>
                      )}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-4 py-1 font-mono text-[10px] uppercase tracking-[0.15em] font-bold border rounded-none transition-colors ${
                    getEventStatus(item) === "LIVE"
                      ? "border-green-500/40 text-[#00D154]"
                      : "border-zinc-700 text-zinc-400"
                  }`}
                >
                  {getEventStatus(item)}
                </span>
              </div>

              {/* Classification */}
              <div className="relative z-10 font-mono text-sm uppercase tracking-[0.05em] font-bold text-white">
                {item.classification}
              </div>

              {/* The Brief */}
              <div className="relative z-10 flex flex-col gap-3">
                <h4 className="text-3xl font-black uppercase tracking-tight font-sans text-white">
                  {item.title}
                </h4>
                <p className="text-zinc-500 font-mono text-sm max-w-lg leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              {/* Actions */}
              <div className="relative z-10 w-full lg:w-48 flex flex-col gap-2 ml-auto">
                {(() => {
                  const status = getEventStatus(item);
                  if (status === "COMPLETED") {
                    if (item.recordedVideoLink) {
                      return (
                        <Link
                          href={item.recordedVideoLink}
                          target="_blank"
                          className="group/btn flex items-center justify-between w-full px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] font-black transition-all bg-[#0066FF] text-white hover:bg-[#0052CC] border border-transparent shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0"
                        >
                          VIEW RECORDING
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Link>
                      );
                    }
                    return (
                      <div className="flex items-center justify-between w-full px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] font-black bg-zinc-900 text-white/10 border border-zinc-500/10 cursor-not-allowed">
                        SESSION OVER
                        <ArrowUpRight className="w-4 h-4 opacity-5" />
                      </div>
                    );
                  }
                  return (
                    <>
                      {status === "UPCOMING" && item.reserveSpotLink && (
                        <Link
                          href={item.reserveSpotLink}
                          target="_blank"
                          className="group/reserve flex items-center justify-between w-full px-6 py-4 bg-white text-black font-mono text-[10px] uppercase tracking-[0.2em] font-black transition-all hover:bg-zinc-200"
                        >
                          RESERVE SPOT
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/reserve:translate-x-0.5 group-hover/reserve:-translate-y-0.5" />
                        </Link>
                      )}
                      {status === "LIVE" && (item.joinMeetingLink || item.locationUrl) && (
                        <Link
                          href={(item.joinMeetingLink || item.locationUrl) as string}
                          target="_blank"
                          className="group/btn flex items-center justify-between w-full px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] font-black transition-all bg-[#00D154] text-black hover:bg-[#00b247]"
                        >
                          {item.isOnline ? "JOIN SESSION" : "VIEW LOCATION"}
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Link>
                      )}
                      {status === "UPCOMING" && !item.reserveSpotLink && (
                        <div className="flex items-center justify-between w-full px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] font-black bg-zinc-900 text-zinc-500 border border-zinc-800">
                          COMING SOON
                          <Clock className="w-4 h-4 opacity-20" />
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
