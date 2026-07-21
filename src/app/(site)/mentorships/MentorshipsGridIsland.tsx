"use client";

import type { Mentorship } from "@prisma/client";
import {
  ArrowUpRight,
  Calendar,
  ChevronDown,
  Clock,
  Loader2,
  MapPin,
  Search,
  SlidersHorizontal,
  Users2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MentorshipWithMentors extends Mentorship {
  mentors: { id: number; name: string; slug: string }[];
}

type StatusFilter = "ALL" | "OPEN" | "CLOSED" | "FULL";
type TimeFilter = "ALL" | "UPCOMING" | "PAST";

const cx = "mx-auto w-full max-w-screen-2xl px-6 lg:px-12";

export function MentorshipsGridIsland() {
  const [mentorships, setMentorships] = useState<MentorshipWithMentors[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("ALL");
  const [locationFilter, setLocationFilter] = useState<
    "ALL" | "ONLINE" | "IN_PERSON"
  >("ALL");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowFilters(false);
      }
    }
    if (showFilters) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showFilters]);

  useEffect(() => {
    fetch("/api/admin/mentorships")
      .then((r) => r.json())
      .then((data) => setMentorships(Array.isArray(data) ? data : []))
      .catch(() => setMentorships([]))
      .finally(() => setLoading(false));
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const m of mentorships) {
      if (Array.isArray(m.tags)) {
        for (const t of m.tags) tags.add(t as string);
      }
    }
    return Array.from(tags);
  }, [mentorships]);

  const filtered = useMemo(() => {
    const now = new Date();
    return mentorships.filter((m) => {
      if (search) {
        const q = search.toLowerCase();
        const inTitle = m.title.toLowerCase().includes(q);
        const inDesc = m.description?.toLowerCase().includes(q);
        const inMentors = m.mentors?.some((t) =>
          t.name.toLowerCase().includes(q),
        );
        const inTags =
          Array.isArray(m.tags) &&
          m.tags.some((t) => (t as string).toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inMentors && !inTags) return false;
      }
      if (statusFilter !== "ALL" && m.status.toUpperCase() !== statusFilter)
        return false;
      if (timeFilter === "UPCOMING") {
        if (m.endDate && new Date(m.endDate) <= now) return false;
      }
      if (timeFilter === "PAST") {
        if (!m.endDate || new Date(m.endDate) > now) return false;
      }
      if (locationFilter === "ONLINE" && !m.isOnline) return false;
      if (locationFilter === "IN_PERSON" && m.isOnline) return false;
      if (activeTag && !(Array.isArray(m.tags) && m.tags.includes(activeTag)))
        return false;
      return true;
    });
  }, [
    mentorships,
    search,
    statusFilter,
    timeFilter,
    locationFilter,
    activeTag,
  ]);

  const activeFilterCount = [
    statusFilter !== "ALL",
    timeFilter !== "ALL",
    locationFilter !== "ALL",
    activeTag !== null,
  ].filter(Boolean).length;

  const hasActiveFilters =
    search ||
    statusFilter !== "ALL" ||
    timeFilter !== "ALL" ||
    locationFilter !== "ALL" ||
    activeTag !== null;

  const clearAll = () => {
    setSearch("");
    setStatusFilter("ALL");
    setTimeFilter("ALL");
    setLocationFilter("ALL");
    setActiveTag(null);
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-40">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (mentorships.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-40 gap-5">
        <div className="w-16 h-16 border border-zinc-800 flex items-center justify-center">
          <Users2 className="w-7 h-7 text-zinc-400" />
        </div>
        <p className="text-white font-black uppercase tracking-tighter text-xl font-space-grotesk">
          No mentorships yet
        </p>
        <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest text-center">
          No active sessions at the moment. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* ── Toolbar: search + filter button — sticky below nav ── */}
      <div className="sticky top-20 z-40 w-full border-t border-b border-zinc-800 bg-black/95 backdrop-blur-md">
        <div className={`${cx} py-4`}>
          <div className="flex items-center gap-3 relative" ref={dropdownRef}>
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title, mentor, topic…"
                className="w-full bg-transparent border border-zinc-800 text-white text-xs font-mono pl-10 pr-9 py-3 focus:outline-none focus:border-zinc-600 placeholder:text-zinc-400 transition-colors uppercase tracking-widest"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter button */}
            <div>
              <button
                type="button"
                onClick={() => setShowFilters((v) => !v)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 border font-mono text-[10px] uppercase tracking-widest transition-all duration-200 whitespace-nowrap",
                  showFilters || activeFilterCount > 0
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white",
                )}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span
                    className={cn(
                      "w-4 h-4 flex items-center justify-center text-[9px] font-black",
                      showFilters || activeFilterCount > 0
                        ? "bg-black text-white"
                        : "bg-white text-black",
                    )}
                  >
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform duration-200",
                    showFilters && "rotate-180",
                  )}
                />
              </button>
            </div>

            {/* Clear */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="group flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 hover:text-white uppercase tracking-widest transition-colors whitespace-nowrap"
              >
                <X className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}

            {/* Dropdown — anchored to the full toolbar row */}
            {showFilters && (
              <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-zinc-950 border border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-4 sm:p-6 flex flex-col gap-5">
                  {/* Status */}
                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.3em]">
                      Status
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(
                        ["ALL", "OPEN", "CLOSED", "FULL"] as StatusFilter[]
                      ).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStatusFilter(s)}
                          className={cn(
                            "px-3 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all duration-200",
                            statusFilter === s
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300",
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Format */}
                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.3em]">
                      Format
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          { id: "ALL", label: "ALL" },
                          { id: "ONLINE", label: "ONLINE" },
                          { id: "IN_PERSON", label: "IN-PERSON" },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setLocationFilter(opt.id)}
                          className={cn(
                            "px-3 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all duration-200",
                            locationFilter === opt.id
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300",
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.3em]">
                      Time
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(["ALL", "UPCOMING", "PAST"] as TimeFilter[]).map(
                        (t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTimeFilter(t)}
                            className={cn(
                              "px-3 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all duration-200",
                              timeFilter === t
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300",
                            )}
                          >
                            {t === "ALL" ? "ALL TIME" : t}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Topics */}
                  {allTags.length > 0 && (
                    <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.3em]">
                        Topics
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() =>
                              setActiveTag(activeTag === tag ? null : tag)
                            }
                            className={cn(
                              "px-3 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all duration-200",
                              activeTag === tag
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300",
                            )}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                    {activeFilterCount > 0 ? (
                      <button
                        type="button"
                        onClick={clearAll}
                        className="group flex items-center gap-2 font-mono text-[10px] text-zinc-400 hover:text-white uppercase tracking-widest transition-colors"
                      >
                        <X className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                        Clear all
                      </button>
                    ) : (
                      <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                        No active filters
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowFilters(false)}
                      className="font-mono text-[10px] text-white uppercase tracking-widest border border-zinc-700 px-4 py-2 hover:border-white transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Rows ── */}
      {filtered.length === 0 ? (
        <div className="w-full border-t border-b border-zinc-800">
          <div
            className={`${cx} flex flex-col items-center justify-center py-40`}
          >
            <div className="flex flex-col items-center text-center max-w-md gap-6">
              <h3 className="text-white font-mono text-xs uppercase tracking-[0.4em] font-black">
                NO SESSIONS FOUND
              </h3>
              <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                No mentorships match your current filters.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="text-white font-mono text-[10px] uppercase tracking-[0.3em] border border-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-300"
              >
                CLEAR FILTERS
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6 pt-6">
          {filtered.map((m) => (
            <Link
              key={m.id}
              href={`/mentorships/${m.slug}`}
              className="group relative w-full flex overflow-hidden min-h-[320px] block"
            >
              {/* Background image — grayscale → colour on hover, slow zoom */}
              {m.coverImage && (
                <>
                  <Image
                    src={m.coverImage}
                    alt={m.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30 z-10" />
                </>
              )}
              {!m.coverImage && (
                <div className="absolute inset-0 bg-zinc-950" />
              )}

              {/* Content */}
              <div
                className={`${cx} relative z-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 py-16`}
              >
                {/* Left: status + date + location */}
                <div className="flex flex-col items-start gap-4 shrink-0 min-w-[160px]">
                  <span
                    className={cn(
                      "inline-flex items-center px-4 py-1 font-mono text-[10px] uppercase tracking-[0.15em] font-bold border backdrop-blur-sm",
                      m.status === "open"
                        ? "border-green-500/50 text-green-400 bg-green-500/10"
                        : m.status === "full"
                          ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                          : "border-zinc-700 text-zinc-400 bg-black/40",
                    )}
                  >
                    {m.status}
                  </span>
                  {m.startDate && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-zinc-300 text-sm font-mono">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        {new Date(m.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      {m.endDate && (
                        <div className="text-zinc-400 text-[10px] font-mono">
                          {"→ "}
                          {new Date(m.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  {(m.location || m.isOnline) && (
                    <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-mono uppercase tracking-widest">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {m.location || "Online"}
                    </div>
                  )}
                </div>

                {/* Centre: title + description + tags — the main character */}
                <div className="flex-1 flex flex-col gap-4">
                  <h4 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter font-space-grotesk text-white leading-[0.9]">
                    {m.title}
                  </h4>
                  {m.description && (
                    <p className="text-zinc-400 font-mono text-sm max-w-2xl leading-relaxed line-clamp-2">
                      {m.description}
                    </p>
                  )}
                  {Array.isArray(m.tags) && m.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {(m.tags as string[]).slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 border border-zinc-700/60 bg-black/40 backdrop-blur-sm px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: action */}
                <div className="shrink-0 w-full lg:w-48">
                  {m.status === "closed" ? (
                    <div className="flex items-center justify-between w-full px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] font-black bg-black/60 text-white/20 border border-zinc-800 cursor-not-allowed backdrop-blur-sm">
                      CLOSED
                      <Clock className="w-4 h-4 opacity-20" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full px-6 py-4 bg-white text-black font-mono text-[10px] uppercase tracking-[0.2em] font-black transition-all group-hover:bg-zinc-100">
                      VIEW PROGRAM
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
