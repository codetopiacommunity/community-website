"use client";

import { format } from "date-fns";
import { ArrowUpRight, Briefcase, MapPin, Star, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Career } from "@/lib/careers";

interface CareersClientProps {
  initialCareers: Career[];
}

const cx = "mx-auto w-full max-w-screen-2xl px-6 lg:px-12";

const TYPE_OPTIONS = [
  "ALL",
  "Full-time",
  "Part-time",
  "Internship",
  "Volunteer",
];

export function CareersClient({ initialCareers }: CareersClientProps) {
  const [typeFilter, setTypeFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return initialCareers.filter(
      (c) => typeFilter === "ALL" || c.type === typeFilter,
    );
  }, [initialCareers, typeFilter]);

  const activeTypes = useMemo(() => {
    const types = new Set(initialCareers.map((c) => c.type));
    return TYPE_OPTIONS.filter((t) => t === "ALL" || types.has(t));
  }, [initialCareers]);

  return (
    <div className="w-full flex flex-col">
      {/* Filters */}
      <div className="w-full border-t border-zinc-800">
        <div className={`${cx} pt-12 pb-8 flex flex-col gap-6`}>
          <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="text-white/20">01 /</span> TYPE FILTER
          </span>
          <div className="flex flex-wrap gap-2">
            {activeTypes.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setTypeFilter(opt)}
                className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                  typeFilter === opt
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300"
                }`}
              >
                {opt === "ALL" ? "ALL TYPES" : opt}
              </button>
            ))}
          </div>

          {typeFilter !== "ALL" && (
            <div className="flex items-center gap-6 animate-in fade-in slide-in-from-left-4 duration-500">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                ACTIVE FILTER:
              </span>
              <button
                type="button"
                onClick={() => setTypeFilter("ALL")}
                className="group flex items-center gap-2 font-mono text-[10px] text-white uppercase tracking-[0.2em] border-b border-white pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-all"
              >
                CLEAR FILTER
                <X className="w-3 h-3 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table header */}
      <div className="hidden lg:block w-full border-t border-b border-zinc-800">
        <div
          className={`${cx} grid grid-cols-[2fr_1.5fr_3fr_1fr] gap-6 py-6 text-white/30 font-mono text-[10px] uppercase tracking-[0.2em]`}
        >
          <div>Position / Company</div>
          <div>Type / Location</div>
          <div>About the Role</div>
          <div>Action</div>
        </div>
      </div>

      {/* Rows */}
      {filtered.length === 0 ? (
        <div className="w-full border-b border-zinc-800">
          <div
            className={`${cx} flex flex-col items-center justify-center py-40`}
          >
            <div className="flex flex-col items-center text-center max-w-md gap-6">
              <Briefcase className="h-12 w-12 text-zinc-800" />
              <h3 className="text-white font-mono text-xs uppercase tracking-[0.4em] font-black">
                NO OPPORTUNITIES FOUND
              </h3>
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                {typeFilter !== "ALL"
                  ? `No open roles match [${typeFilter}]`
                  : "No open opportunities right now. Check back soon."}
              </p>
              {typeFilter !== "ALL" && (
                <button
                  type="button"
                  onClick={() => setTypeFilter("ALL")}
                  className="text-white font-mono text-[10px] uppercase tracking-[0.3em] border border-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-300"
                >
                  CLEAR FILTER
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        filtered.map((career, index) => (
          <div
            key={career.id}
            className="group relative w-full border-b border-zinc-800 transition-colors hover:bg-zinc-900/30 overflow-hidden"
          >
            <div
              className={`${cx} flex flex-col lg:grid lg:grid-cols-[2fr_1.5fr_3fr_1fr] items-start lg:items-center gap-6 py-12`}
            >
              {/* Ghost index */}
              <span className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] font-black text-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none select-none z-0">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Position / Company */}
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {career.isFeatured && (
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] bg-white text-black px-2 py-0.5">
                      <Star className="h-2.5 w-2.5 fill-current" />
                      Featured
                    </span>
                  )}
                  <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
                    Expires {format(new Date(career.expiryDate), "MMM d, yyyy")}
                  </span>
                </div>
                <h4 className="text-3xl font-black uppercase tracking-tight font-sans text-white leading-none">
                  {career.title}
                </h4>
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                  {career.company}
                </span>
              </div>

              {/* Type / Location */}
              <div className="relative z-10 flex flex-col gap-2 font-mono uppercase">
                <span className="text-sm font-bold text-white tracking-tight">
                  {career.type}
                </span>
                <span className="flex items-center gap-1.5 text-zinc-500 text-[10px] tracking-[0.2em]">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {career.location}
                </span>
              </div>

              {/* About the Role */}
              <div className="relative z-10 flex flex-col gap-4">
                <p className="text-zinc-500 font-mono text-sm max-w-lg leading-relaxed">
                  {career.description
                    .replace(/#{1,6}\s+/g, "")
                    .replace(/\*\*(.+?)\*\*/g, "$1")
                    .replace(/\*(.+?)\*/g, "$1")
                    .replace(/^[-*]\s+/gm, "")
                    .replace(/\n+/g, " ")
                    .trim()
                    .slice(0, 160)}
                  {career.description.length > 160 ? "…" : ""}
                </p>
                {career.requirements.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {career.requirements.slice(0, 4).map((req) => (
                      <span
                        key={req}
                        className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600 border border-zinc-800 px-2 py-0.5"
                      >
                        {req}
                      </span>
                    ))}
                    {career.requirements.length > 4 && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-700">
                        +{career.requirements.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="relative z-10 w-full lg:w-auto flex flex-col gap-2 ml-auto">
                <Link
                  href={`/careers/${career.id}`}
                  className="group/btn flex items-center justify-between w-full lg:w-48 px-6 py-4 bg-white text-black font-mono text-[10px] uppercase tracking-[0.2em] font-black transition-all hover:bg-zinc-200"
                >
                  VIEW JOB
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
