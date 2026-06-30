"use client";

import { Activity, Award, Shield, Star, Trophy } from "lucide-react";
import Link from "next/link";
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

/* ─── Card ─────────────────────────────────────────────────────────── */
function HonorCard({ entry }: { entry: RecognitionItem }) {
  const meta = CATEGORY_META[entry.category];
  const Icon = meta.icon;
  const categoryLabel =
    entry.category === "DOMAIN_SPECIFIC" && entry.domain
      ? entry.domain
      : meta.label;

  return (
    <Link
      href={`/wall-of-impact/${entry.slug || entry.id}`}
      className="group relative w-full text-left overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all duration-500 flex flex-col"
    >
      {/* Photo — grayscale → colour on hover, slow zoom */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        {entry.image ? (
          // biome-ignore lint/performance/noImgElement: remote cloudinary/portal avatar
          <img
            src={entry.image}
            alt={entry.name}
            className="absolute inset-0 h-full w-full object-cover object-top grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          /* Fallback — initials on dark bg */
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
            <span className="font-black text-5xl text-zinc-700 font-mono select-none">
              {entry.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Category badge — top left */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-sm border border-zinc-800 group-hover:border-zinc-600 transition-all duration-300 translate-y-0 group-hover:-translate-y-0.5">
          <Icon className={cn("w-3 h-3", meta.accent.split(" ")[0])} />
          <span className="font-mono text-[9px] uppercase tracking-widest text-white font-black">
            {categoryLabel}
          </span>
        </div>

        {/* Period badge — top right */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm border border-zinc-800 group-hover:border-zinc-600 transition-all duration-300 translate-y-0 group-hover:-translate-y-0.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-black">
            {entry.period}
          </span>
        </div>

        {/* Name block — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="inline-block bg-white px-3 py-1.5 mb-3 transform group-hover:translate-x-1 transition-transform duration-300">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] font-black text-black leading-none">
              {entry.awardName}
            </p>
          </div>
          <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-white leading-tight font-sans">
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
      <div className="px-4 py-3 border-t border-zinc-800 flex items-start justify-between gap-3 flex-1">
        <p className="text-zinc-500 font-mono text-[10px] leading-relaxed line-clamp-2 group-hover:text-zinc-400 transition-colors flex-1">
          {entry.impactSummary}
        </p>
        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-700 group-hover:text-zinc-400 transition-colors shrink-0 mt-0.5">
          View →
        </span>
      </div>
    </Link>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────── */
export function WallOfImpact() {
  const [items, setItems] = React.useState<RecognitionItem[]>([]);
  const [loading, setLoading] = React.useState(true);
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

  const visible =
    activeFilter === "ALL"
      ? items
      : items.filter((r) => r.category === activeFilter);

  return (
    <section className="w-full pb-24 bg-black font-sans">
      <Container className="px-4">
        {/* Filter row — matches mentorship toolbar style: sharp, mono, uppercase */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-[4/5] animate-pulse bg-zinc-900" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="border border-zinc-800 bg-zinc-950 py-24 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              No honorees in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {visible.map((entry) => (
              <HonorCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
