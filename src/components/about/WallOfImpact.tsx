"use client";

import {
  Activity,
  ArrowUpRight,
  Award,
  Shield,
  Star,
  Trophy,
} from "lucide-react";
import React from "react";
import { Container } from "@/components/layout/Container";
import type { RecognitionCategory } from "@/lib/data/recognition";
import { cn } from "@/lib/utils";

interface RecognitionItem {
  id: string;
  slug: string;
  name: string;
  role: string;
  image: string;
  coverImage?: string;
  category: RecognitionCategory;
  awardName: string;
  period: string;
  impactSummary: string;
  domain?: string | null;
  achievements?: string[];
}

const CATEGORY_META: Record<
  RecognitionCategory,
  { icon: React.ElementType; label: string; accent: string }
> = {
  MEMBER: {
    icon: Star,
    label: "Member",
    accent: "text-amber-400  border-amber-400/40",
  },
  VOLUNTEER: {
    icon: Shield,
    label: "Volunteer",
    accent: "text-sky-400    border-sky-400/40",
  },
  AMBASSADOR: {
    icon: Award,
    label: "Ambassador",
    accent: "text-violet-400 border-violet-400/40",
  },
  CORE_TEAM: {
    icon: Trophy,
    label: "Core Team",
    accent: "text-emerald-400 border-emerald-400/40",
  },
  DOMAIN_SPECIFIC: {
    icon: Activity,
    label: "Domain",
    accent: "text-rose-400   border-rose-400/40",
  },
};

const FILTERS: Array<{ key: RecognitionCategory | "ALL"; label: string }> = [
  { key: "ALL", label: "All" },
  { key: "CORE_TEAM", label: "Core Team" },
  { key: "AMBASSADOR", label: "Ambassador" },
  { key: "VOLUNTEER", label: "Volunteer" },
  { key: "MEMBER", label: "Member" },
  { key: "DOMAIN_SPECIFIC", label: "Domain" },
];

function getCategoryLabel(entry: RecognitionItem): string {
  const meta = CATEGORY_META[entry.category];
  return entry.category === "DOMAIN_SPECIFIC" && entry.domain
    ? entry.domain
    : meta.label;
}

function getInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "CT";
}

/* --- Card ----------------------------------------------------------- */
function HonorCard({
  entry,
  onSelect,
}: {
  entry: RecognitionItem;
  onSelect: (entry: RecognitionItem) => void;
}) {
  const meta = CATEGORY_META[entry.category];
  const Icon = meta.icon;
  const categoryLabel = getCategoryLabel(entry);

  return (
    <button
      type="button"
      onClick={() => onSelect(entry)}
      className="group relative w-full text-left overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all duration-500 flex flex-col cursor-pointer"
    >
      {/* Photo - grayscale ? colour on hover, slow zoom */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        {entry.image ? (
          // biome-ignore lint/performance/noImgElement: remote cloudinary/portal avatar
          <img
            src={entry.image}
            alt={entry.name}
            className="absolute inset-0 h-full w-full object-cover object-top grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          /* Fallback - initials on dark bg */
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
            <span className="font-black text-4xl text-zinc-700 font-mono select-none">
              {getInitials(entry.name)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Category badge - top left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-black/70 backdrop-blur-sm border border-zinc-800 group-hover:border-zinc-600 transition-all duration-300 translate-y-0 group-hover:-translate-y-0.5">
          <Icon className={cn("w-3 h-3", meta.accent.split(" ")[0])} />
          <span className="font-mono text-[9px] uppercase tracking-widest text-white font-black">
            {categoryLabel}
          </span>
        </div>

        {/* Period badge - top right */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm border border-zinc-800 group-hover:border-zinc-600 transition-all duration-300 translate-y-0 group-hover:-translate-y-0.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-black">
            {entry.period}
          </span>
        </div>

        {/* Name block - bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="inline-block bg-white px-2 py-1 mb-2 transform group-hover:translate-x-1 transition-transform duration-300">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] font-black text-black leading-none">
              {entry.awardName}
            </p>
          </div>
          <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter text-white leading-tight font-sans">
            {entry.name}
          </h3>
          {entry.role && (
            <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.25em] mt-1">
              {entry.role}
            </p>
          )}
        </div>
      </div>

      {/* Impact summary row */}
      <div className="px-3 py-2.5 border-t border-zinc-800 flex items-start justify-between gap-3 flex-1">
        <p className="text-zinc-500 font-mono text-[10px] leading-relaxed line-clamp-2 group-hover:text-zinc-400 transition-colors flex-1">
          {entry.impactSummary}
        </p>
        <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-zinc-700 group-hover:text-zinc-400 transition-colors shrink-0 mt-0.5">
          View <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </button>
  );
}

function RecognitionModal({
  entry,
  onClose,
}: {
  entry: RecognitionItem;
  onClose: () => void;
}) {
  const meta = CATEGORY_META[entry.category];
  const Icon = meta.icon;
  const categoryLabel = getCategoryLabel(entry);
  const heroImage = entry.coverImage || entry.image;

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <button
        type="button"
        className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-default w-full h-full"
        onClick={onClose}
        aria-label="Close recognition details"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="recognition-modal-title"
        className="relative w-full max-w-6xl bg-black border border-white/20 shadow-2xl flex flex-col lg:flex-row max-h-[90vh] overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-white hover:rotate-90 transition-transform p-2 bg-black border border-zinc-800"
          aria-label="Close recognition details"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            role="img"
            aria-label="Close"
          >
            <title>Close</title>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Photo Column */}
        <div className="w-full lg:w-1/2 h-[300px] lg:h-auto relative bg-zinc-900">
          {heroImage ? (
            // biome-ignore lint/performance/noImgElement: remote cloudinary/portal image
            <img
              src={heroImage}
              alt={entry.name}
              className="absolute inset-0 h-full w-full object-cover object-top grayscale"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
              <span className="font-mono text-7xl font-black tracking-widest text-zinc-700">
                {getInitials(entry.name)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
            <div className="inline-block px-4 py-2 bg-white text-black font-mono text-xs uppercase tracking-[0.3em] font-black mb-6">
              {entry.awardName}
            </div>
            <h3
              id="recognition-modal-title"
              className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-none font-sans mb-4"
            >
              {entry.name}
            </h3>
            {entry.role && (
              <p className="text-zinc-500 font-mono text-sm md:text-base uppercase tracking-[0.3em]">
                {entry.role}
              </p>
            )}
          </div>
        </div>

        {/* Data/Impact Column */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 overflow-y-auto bg-black no-scrollbar text-left font-sans">
          <div className="space-y-14">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 border bg-black/40 font-mono text-[10px] uppercase tracking-widest font-black",
                  meta.accent,
                )}
              >
                <Icon className="w-3 h-3" />
                {categoryLabel}
              </span>
              <span className="px-3 py-1.5 border border-zinc-800 font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-black">
                {entry.period}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8 text-zinc-800">
                <span className="h-[1px] w-12 bg-current" />
                <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                  The Impact
                </h4>
              </div>
              <p className="text-white text-xl md:text-2xl font-mono leading-relaxed italic">
                "{entry.impactSummary}"
              </p>
            </div>

            {entry.category === "DOMAIN_SPECIFIC" && entry.domain && (
              <div className="pt-10 border-t border-zinc-900">
                <h5 className="text-zinc-700 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">
                  Domain of Excellence
                </h5>
                <p className="text-white font-mono text-sm uppercase tracking-widest">
                  {entry.domain}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-zinc-900">
              {entry.role && (
                <div>
                  <h5 className="text-zinc-700 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">
                    Community Role
                  </h5>
                  <p className="text-white font-mono text-sm uppercase tracking-widest">
                    {entry.role}
                  </p>
                </div>
              )}
              <div>
                <h5 className="text-zinc-700 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">
                  Honor Date
                </h5>
                <p className="text-white font-mono text-sm uppercase tracking-widest">
                  {entry.period}
                </p>
              </div>
            </div>

            {entry.achievements && entry.achievements.length > 0 && (
              <div className="pt-10 border-t border-zinc-900">
                <h5 className="text-zinc-700 font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                  Key Achievements
                </h5>
                <ul className="space-y-4">
                  {entry.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex gap-4 text-zinc-400 font-mono text-sm leading-relaxed"
                    >
                      <span className="text-zinc-700 shrink-0">-</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-20 pt-8 border-t border-zinc-900 flex justify-between items-center opacity-30">
            <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.5em]">
              A Codetopia Initiative
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Main ------------------------------------------------------------ */
export function WallOfImpact() {
  const [items, setItems] = React.useState<RecognitionItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedEntry, setSelectedEntry] =
    React.useState<RecognitionItem | null>(null);
  const [activeFilter, setActiveFilter] = React.useState<
    RecognitionCategory | "ALL"
  >("ALL");

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/recognition")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => {
        if (!cancelled) setItems(Array.isArray(d) ? d : []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    if (!selectedEntry) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedEntry]);

  const visible =
    activeFilter === "ALL"
      ? items
      : items.filter((r) => r.category === activeFilter);

  return (
    <section className="w-full pb-24 bg-black font-sans">
      <Container className="px-4">
        {/* Filter row - matches mentorship toolbar style: sharp, mono, uppercase */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => {
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                className={cn(
                  "px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all duration-200",
                  activeFilter === f.key
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-[3/4] animate-pulse bg-zinc-900" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="border border-zinc-800 bg-zinc-950 py-24 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              No honorees in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px">
            {visible.map((entry) => (
              <HonorCard
                key={entry.id}
                entry={entry}
                onSelect={setSelectedEntry}
              />
            ))}
          </div>
        )}
      </Container>

      {selectedEntry && (
        <RecognitionModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </section>
  );
}
