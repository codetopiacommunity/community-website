"use client";

import { format } from "date-fns";
import {
  ArrowUpRight,
  Briefcase,
  Clock,
  MapPin,
  Star,
  Timer,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Career } from "@/lib/careers";
import { getDescriptionPreview } from "@/lib/careers";

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

  const filtered = useMemo(
    () =>
      initialCareers.filter(
        (c) => typeFilter === "ALL" || c.type === typeFilter,
      ),
    [initialCareers, typeFilter],
  );

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

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="w-full border-t border-zinc-800">
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
        <div className="w-full border-t border-zinc-800">
          {filtered.map((career) => (
            <div
              key={career.id}
              className="group w-full border-b border-zinc-800 hover:bg-zinc-900/40 transition-colors duration-300"
            >
              <div className={`${cx} py-10 flex flex-col gap-6`}>
                {/* Top row: title + apply button */}
                <div className="flex items-start justify-between gap-6">
                  <div className="flex flex-col gap-3 min-w-0">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      {career.isFeatured && (
                        <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] bg-white text-black px-2 py-0.5 font-black">
                          <Star className="h-2.5 w-2.5 fill-current" />
                          Featured
                        </span>
                      )}
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] border border-zinc-800 text-zinc-500 px-2 py-0.5">
                        {career.type}
                      </span>
                      {career.duration && (
                        <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] border border-zinc-800 text-zinc-500 px-2 py-0.5">
                          <Timer className="h-2.5 w-2.5" />
                          {career.duration}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-sans text-white leading-none">
                      {career.title}
                    </h4>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-zinc-500 uppercase tracking-[0.15em]">
                      <span>{career.company}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {career.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 shrink-0" />
                        Closes{" "}
                        {format(new Date(career.expiryDate), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>

                  {/* Apply button — goes to detail page first */}
                  <Link
                    href={`/careers/${career.id}`}
                    className="group/btn shrink-0 hidden sm:flex items-center gap-3 px-6 py-3.5 bg-white text-black font-mono text-[10px] uppercase tracking-[0.2em] font-black hover:bg-zinc-200 transition-all duration-200"
                  >
                    Apply
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>

                {/* About the role preview */}
                <p className="text-zinc-500 font-mono text-sm leading-relaxed max-w-3xl">
                  {getDescriptionPreview(career, 200)}
                </p>

                {/* Skills + mobile apply */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {career.requirements.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {career.requirements.slice(0, 5).map((req) => (
                        <span
                          key={req}
                          className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600 border border-zinc-800 px-2 py-0.5"
                        >
                          {req}
                        </span>
                      ))}
                      {career.requirements.length > 5 && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-700">
                          +{career.requirements.length - 5} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Mobile apply */}
                  <Link
                    href={`/careers/${career.id}`}
                    className="sm:hidden flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white border border-zinc-700 px-4 py-2.5 hover:bg-white hover:text-black transition-all"
                  >
                    Apply
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
