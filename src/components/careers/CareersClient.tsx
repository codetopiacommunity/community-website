"use client";

import { format } from "date-fns";
import {
  ArrowRight,
  Clock,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Timer,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { EmptyState } from "@/components/layout/EmptyState";
import type { Career } from "@/lib/careers";
import { getDescriptionPreview } from "@/lib/careers";
import { cn } from "@/lib/utils";

interface CareersClientProps {
  initialCareers: Career[];
}

const TYPE_OPTIONS = [
  "ALL",
  "Full-time",
  "Part-time",
  "Internship",
  "Volunteer",
];

export function CareersClient({ initialCareers }: CareersClientProps) {
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const activeTypes = useMemo(() => {
    const types = new Set(initialCareers.map((c) => c.type));
    return TYPE_OPTIONS.filter((t) => t === "ALL" || types.has(t));
  }, [initialCareers]);

  const filtered = useMemo(
    () =>
      initialCareers.filter((c) => {
        const matchesType = typeFilter === "ALL" || c.type === typeFilter;
        const matchesSearch =
          !search ||
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.company.toLowerCase().includes(search.toLowerCase()) ||
          c.location.toLowerCase().includes(search.toLowerCase());
        return matchesType && matchesSearch;
      }),
    [initialCareers, typeFilter, search],
  );

  const activeFilterCount = [typeFilter !== "ALL", search !== ""].filter(
    Boolean,
  ).length;

  const clearAll = () => {
    setTypeFilter("ALL");
    setSearch("");
  };

  if (initialCareers.length === 0) {
    return (
      <div className="border-t border-zinc-900">
        <Container className="px-4">
          <EmptyState title="No open roles right now">
            Organisations post roles, internships and projects here when they
            have them. New ones are also shared in #announcements on Discord.
          </EmptyState>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* Search + Filter Bar */}
      <Container className="px-4">
        <div className="px-2 pt-10 pb-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, company, or location..."
                className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm font-mono pl-11 pr-4 py-3 focus:outline-none focus:border-zinc-600 placeholder:text-zinc-500 transition-colors"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
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
                "uppercase tracking-widest flex items-center gap-2 px-5 py-3 border text-sm font-mono transition-colors",
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
              <div className="space-y-3">
                <p className="uppercase tracking-widest text-xs font-mono text-zinc-400 font-bold">
                  Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeTypes.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setTypeFilter(opt)}
                      className={cn(
                        "uppercase tracking-wider px-3 py-1.5 text-xs font-mono border transition-colors",
                        typeFilter === opt
                          ? "bg-white text-black border-white"
                          : "text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white",
                      )}
                    >
                      {opt === "ALL" ? "All types" : opt}
                    </button>
                  ))}
                </div>
              </div>

              {activeFilterCount > 0 && (
                <div className="pt-4 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={clearAll}
                    className="uppercase tracking-widest text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
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
            <p className="uppercase tracking-widest text-xs font-mono text-zinc-400">
              {filtered.length} {filtered.length === 1 ? "role" : "roles"} found
            </p>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        </div>
      </Container>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="border-t border-zinc-900">
          <Container className="px-4">
            <EmptyState
              title="No roles match your search"
              action={
                <button
                  type="button"
                  onClick={clearAll}
                  className="border border-white px-6 py-2.5 font-sans text-sm font-bold text-white transition-colors duration-200 hover:bg-white hover:text-black"
                >
                  Show all roles
                </button>
              }
            />
          </Container>
        </div>
      ) : (
        /* Career rows — architectural list style */
        <div className="flex flex-col border-t border-zinc-900">
          {filtered.map((career, index) => (
            <Link
              key={career.id}
              href={`/careers/${career.slug}`}
              className="group block border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors duration-200"
            >
              <Container className="px-4">
                <div className="relative px-2 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                  {/* Massive background index number */}
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-[10rem] md:text-[14rem] font-bold text-white/[0.025] pointer-events-none select-none leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Left: main info */}
                  <div className="relative z-10 flex flex-col gap-4 flex-1 min-w-0">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      {career.isFeatured && (
                        <span className="uppercase tracking-[0.2em] inline-flex items-center gap-1 font-mono text-xs bg-white text-black px-2 py-0.5 font-bold">
                          <Star className="h-2.5 w-2.5 fill-current" />
                          Featured
                        </span>
                      )}
                      <span
                        className={cn(
                          "uppercase tracking-[0.2em] font-mono text-xs px-2 py-0.5 border font-bold",
                          career.type === "Full-time"
                            ? "border-green-500/40 text-green-400 bg-green-500/10"
                            : career.type === "Internship"
                              ? "border-blue-500/40 text-blue-400 bg-blue-500/10"
                              : "border-zinc-700 text-zinc-400 bg-black/40",
                        )}
                      >
                        {career.type}
                      </span>
                      {career.duration && (
                        <span className="uppercase tracking-[0.2em] inline-flex items-center gap-1 font-mono text-xs border border-zinc-800 text-zinc-400 px-2 py-0.5">
                          <Timer className="h-2.5 w-2.5" />
                          {career.duration}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="uppercase tracking-tighter text-3xl md:text-4xl lg:text-5xl font-bold font-sans text-white leading-none group-hover:text-zinc-100 transition-colors">
                      {career.title}
                    </h2>

                    {/* Meta row */}
                    <div className="uppercase tracking-[0.15em] flex flex-wrap items-center gap-4 font-mono text-xs text-zinc-400">
                      <span className="text-zinc-400">{career.company}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {career.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 shrink-0" />
                        {"Closes "}
                        {format(new Date(career.expiryDate), "MMM d, yyyy")}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-400 font-mono text-sm leading-relaxed max-w-2xl">
                      {getDescriptionPreview(career, 130)}
                    </p>

                    {/* Skills */}
                    {career.requirements.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {career.requirements.slice(0, 5).map((req) => (
                          <span
                            key={req}
                            className="uppercase tracking-[0.2em] font-mono text-xs text-zinc-400 border border-zinc-800 px-2 py-0.5"
                          >
                            {req}
                          </span>
                        ))}
                        {career.requirements.length > 5 && (
                          <span className="uppercase tracking-[0.2em] font-mono text-xs text-zinc-400">
                            +{career.requirements.length - 5} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right: CTA */}
                  <div className="relative z-10 flex-shrink-0 flex items-center gap-2 text-sm font-bold font-sans text-white opacity-40 group-hover:opacity-100 transition-opacity duration-200">
                    View role
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Container>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
