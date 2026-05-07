"use client";

import type { Mentorship } from "@prisma/client";
import {
  ArrowRight,
  Calendar,
  Loader2,
  MapPin,
  Search,
  SlidersHorizontal,
  Users2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

interface MentorshipWithMentors extends Mentorship {
  mentors: { id: number; name: string; slug: string }[];
}

type StatusFilter = "all" | "open" | "closed" | "full";
type TimeFilter = "all" | "upcoming" | "past";

export function MentorshipsGridIsland() {
  const [mentorships, setMentorships] = useState<MentorshipWithMentors[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [locationFilter, setLocationFilter] = useState<
    "all" | "online" | "in-person"
  >("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/admin/mentorships")
      .then((r) => r.json())
      .then((data) => setMentorships(Array.isArray(data) ? data : []))
      .catch(() => setMentorships([]))
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mentorships.forEach((m) => {
      if (Array.isArray(m.tags)) {
        for (const t of m.tags) tags.add(t as string);
      }
    });
    return Array.from(tags);
  }, [mentorships]);

  const filtered = useMemo(() => {
    return mentorships.filter((m) => {
      // Search
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

      // Status
      if (statusFilter !== "all" && m.status !== statusFilter) return false;

      // Time
      if (timeFilter === "upcoming") {
        if (m.endDate && new Date(m.endDate) <= now) return false;
      }
      if (timeFilter === "past") {
        if (!m.endDate || new Date(m.endDate) > now) return false;
      }

      // Location
      if (locationFilter === "online" && !m.isOnline) return false;
      if (locationFilter === "in-person" && m.isOnline) return false;

      // Tag
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
    now,
  ]);

  const activeFilterCount = [
    statusFilter !== "all",
    timeFilter !== "all",
    locationFilter !== "all",
    activeTag !== null,
  ].filter(Boolean).length;

  const clearAll = () => {
    setSearch("");
    setStatusFilter("all");
    setTimeFilter("all");
    setLocationFilter("all");
    setActiveTag(null);
  };

  return (
    <section className="py-16 bg-black border-t border-zinc-900">
      <Container className="px-4">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
          </div>
        ) : mentorships.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-20 h-20 border border-zinc-800 flex items-center justify-center">
              <Users2 className="w-8 h-8 text-zinc-700" />
            </div>
            <p className="text-white font-black uppercase tracking-tighter text-xl font-space-grotesk">
              No mentorships yet
            </p>
            <p className="text-zinc-600 font-inter text-sm max-w-xs text-center">
              No active mentorship sessions at the moment — check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Search + Filter Bar */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, mentor, or topic..."
                  className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm font-inter pl-11 pr-4 py-3 focus:outline-none focus:border-zinc-600 placeholder:text-zinc-600 transition-colors"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 border text-sm font-inter transition-colors",
                  showFilters || activeFilterCount > 0
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white",
                )}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-black text-white text-xs w-5 h-5 flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="border border-zinc-800 bg-zinc-950 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Status */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold font-space-grotesk uppercase tracking-widest text-zinc-400">
                      Status
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(
                        ["all", "open", "closed", "full"] as StatusFilter[]
                      ).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStatusFilter(s)}
                          className={cn(
                            "px-3 py-1.5 text-xs font-inter uppercase tracking-wider border transition-colors",
                            statusFilter === s
                              ? "bg-white text-black border-white"
                              : "text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white",
                          )}
                        >
                          {s === "all" ? "All" : s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold font-space-grotesk uppercase tracking-widest text-zinc-400">
                      Time
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(["all", "upcoming", "past"] as TimeFilter[]).map(
                        (t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTimeFilter(t)}
                            className={cn(
                              "px-3 py-1.5 text-xs font-inter uppercase tracking-wider border transition-colors",
                              timeFilter === t
                                ? "bg-white text-black border-white"
                                : "text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white",
                            )}
                          >
                            {t === "all" ? "All" : t}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold font-space-grotesk uppercase tracking-widest text-zinc-400">
                      Location
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(["all", "online", "in-person"] as const).map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLocationFilter(l)}
                          className={cn(
                            "px-3 py-1.5 text-xs font-inter uppercase tracking-wider border transition-colors",
                            locationFilter === l
                              ? "bg-white text-black border-white"
                              : "text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white",
                          )}
                        >
                          {l === "all" ? "All" : l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {allTags.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-zinc-800">
                    <p className="text-xs font-bold font-space-grotesk uppercase tracking-widest text-zinc-400">
                      Topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() =>
                            setActiveTag(activeTag === tag ? null : tag)
                          }
                          className={cn(
                            "px-3 py-1.5 text-xs font-inter border transition-colors",
                            activeTag === tag
                              ? "bg-white text-black border-white"
                              : "text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white",
                          )}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clear */}
                {activeFilterCount > 0 && (
                  <div className="pt-4 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-xs font-inter text-zinc-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2"
                    >
                      <X className="w-3 h-3" />
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Results count */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-inter text-zinc-500 uppercase tracking-widest">
                {filtered.length}{" "}
                {filtered.length === 1 ? "session" : "sessions"} found
              </p>
              {(search || activeFilterCount > 0) && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-inter text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 border border-zinc-900">
                <p className="text-zinc-500 font-inter text-sm">
                  No mentorships match your filters.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-inter text-white underline underline-offset-4"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-px">
                {filtered.map((m) => (
                  <Link
                    key={m.id}
                    href={`/mentorships/${m.slug}`}
                    className="group block"
                  >
                    <article className="relative h-56 overflow-hidden border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                      {/* Background */}
                      {m.coverImage ? (
                        <Image
                          src={m.coverImage}
                          alt={m.title}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-900" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

                      {/* Content */}
                      <div className="absolute inset-0 p-6 flex items-center justify-between">
                        <div className="flex-1 space-y-2 max-w-2xl">
                          {/* Status + Tags row */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={cn(
                                "text-[10px] font-bold font-space-grotesk uppercase tracking-widest px-2 py-0.5 border",
                                m.status === "open"
                                  ? "border-green-500/50 text-green-400 bg-green-500/10"
                                  : m.status === "full"
                                    ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                                    : "border-zinc-700 text-zinc-400 bg-black/40",
                              )}
                            >
                              {m.status}
                            </span>
                            {Array.isArray(m.tags) &&
                              m.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag as string}
                                  className="text-[10px] font-inter text-zinc-400 border border-zinc-800 px-2 py-0.5 bg-black/40"
                                >
                                  {tag as string}
                                </span>
                              ))}
                          </div>

                          {/* Title */}
                          <h2 className="text-2xl font-black font-space-grotesk text-white tracking-tight leading-tight">
                            {m.title}
                          </h2>

                          {/* Mentors */}
                          {m.mentors && m.mentors.length > 0 && (
                            <p className="text-sm text-zinc-300 font-inter">
                              with{" "}
                              <span className="text-white font-semibold">
                                {m.mentors.map((t) => t.name).join(", ")}
                              </span>
                            </p>
                          )}

                          {/* Meta */}
                          <div className="flex flex-wrap gap-4 text-xs text-zinc-400 font-inter">
                            {m.startDate && (
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(m.startDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </div>
                            )}
                            {(m.location || m.isOnline) && (
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                {m.location || "Online"}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="ml-6 flex-shrink-0 flex items-center gap-2 text-sm font-black font-space-grotesk text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          View
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
