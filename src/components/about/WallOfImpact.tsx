import {
  Activity,
  ArrowUpRight,
  Award,
  type LucideIcon,
  Shield,
  Star,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { Container } from "@/components/layout/Container";
import { type RecognitionCategory, recognitions } from "@/lib/data/recognition";
import { cn } from "@/lib/utils";

const categoryIcons: Record<RecognitionCategory, LucideIcon> = {
  MEMBER: Star,
  VOLUNTEER: Shield,
  AMBASSADOR: Award,
  CORE_TEAM: Trophy,
  DOMAIN_SPECIFIC: Activity,
};

export function WallOfImpact() {
  const [activeFilter, setActiveFilter] = React.useState<
    RecognitionCategory | "ALL"
  >("ALL");
  const [selectedEntry, setSelectedEntry] = React.useState<
    (typeof recognitions)[0] | null
  >(null);

  React.useEffect(() => {
    if (selectedEntry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedEntry]);

  const filteredRecognitions =
    activeFilter === "ALL"
      ? recognitions
      : recognitions.filter((r) => r.category === activeFilter);

  return (
    <section className="w-full pb-24 bg-black font-sans">
      <Container className="max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-12 px-2">
          <div className="flex flex-wrap gap-2 p-1 bg-zinc-950 border border-zinc-900">
            <button
              type="button"
              onClick={() => setActiveFilter("ALL")}
              className={cn(
                "px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest transition-all",
                activeFilter === "ALL"
                  ? "bg-white text-black"
                  : "text-zinc-600 hover:text-zinc-300",
              )}
            >
              ALL RECOGNITION
            </button>
            {(Object.keys(categoryIcons) as RecognitionCategory[]).map(
              (cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={cn(
                    "px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest transition-all",
                    activeFilter === cat
                      ? "bg-white text-black"
                      : "text-zinc-600 hover:text-zinc-300",
                  )}
                >
                  {cat.replace("_", " ")}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-950 border border-zinc-950 overflow-hidden">
          {filteredRecognitions.map((entry) => {
            const Icon = categoryIcons[entry.category];
            return (
              <button
                type="button"
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedEntry(entry);
                  }
                }}
                className="group relative bg-black flex flex-col hover:bg-zinc-950 transition-all border-b border-zinc-900 lg:border-0 cursor-pointer overflow-hidden text-left w-full"
              >
                {/* Visual Asset: Grayscale Image */}
                <div className="relative aspect-[4/5] overflow-hidden w-full">
                  <Image
                    src={entry.image}
                    alt={entry.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  {/* Category Badge Overlay */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm border border-zinc-800 translate-y-0 group-hover:-translate-y-1 transition-transform">
                    <Icon className="w-3.5 h-3.5 text-white" />
                    <span className="text-[9px] font-mono text-white uppercase tracking-widest font-black">
                      {entry.category.replace("_", " ")}
                    </span>
                  </div>

                  {/* Period Stamp */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-black/80 backdrop-blur-sm border border-zinc-800 px-3 py-1.5 text-white font-mono text-[9px] uppercase tracking-widest font-black translate-y-0 group-hover:-translate-y-1 transition-transform">
                      {entry.period}
                    </div>
                  </div>

                  {/* Award Bar Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="inline-block px-4 py-2 bg-white mb-4 transform group-hover:translate-x-2 transition-transform">
                      <p className="text-black font-mono text-[10px] uppercase tracking-[0.2em] font-black leading-none text-left">
                        {entry.awardName}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-white leading-tight font-sans">
                        {entry.name}
                      </h3>
                      <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.3em] mt-1">
                        {entry.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Impact Summary Snippet */}
                <div className="p-8 md:p-10 flex flex-col justify-between flex-1 border-t border-zinc-900 w-full">
                  <div className="space-y-4">
                    <p className="text-zinc-400 font-mono text-xs leading-relaxed line-clamp-2">
                      {entry.impactSummary}
                    </p>
                    <div className="flex items-center gap-2 text-white font-mono text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      VIEW PERFORMANCE DETAILS{" "}
                      <ArrowUpRight className="w-3 h-3 animate-pulse" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Container>

      {/* Impact Deep-Dive Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Overlay - Clickable Background */}
          <button
            type="button"
            className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-default w-full h-full"
            onClick={() => setSelectedEntry(null)}
            aria-label="Close modal"
          />

          {/* Modal Content */}
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-6xl bg-black border border-white/20 shadow-2xl flex flex-col lg:flex-row max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedEntry(null)}
              className="absolute top-6 right-6 z-50 text-white hover:rotate-90 transition-transform p-2 bg-black border border-zinc-800"
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
              <Image
                src={selectedEntry.image}
                alt={selectedEntry.name}
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="absolute bottom-12 left-12 right-12">
                <div className="inline-block px-4 py-2 bg-white text-black font-mono text-xs uppercase tracking-[0.3em] font-black mb-6">
                  {selectedEntry.awardName}
                </div>
                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none font-sans mb-4">
                  {selectedEntry.name}
                </h3>
                <p className="text-zinc-500 font-mono text-sm md:text-base uppercase tracking-[0.3em]">
                  {selectedEntry.role}
                </p>
              </div>
            </div>

            {/* Data/Impact Column */}
            <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 overflow-y-auto bg-black no-scrollbar text-left font-sans">
              <div className="space-y-16">
                {/* Impact Statement */}
                <div>
                  <div className="flex items-center gap-4 mb-8 text-zinc-800">
                    <span className="h-[1px] w-12 bg-current" />
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                      THE IMPACT
                    </h4>
                  </div>
                  <p className="text-white text-xl md:text-2xl font-mono leading-relaxed italic">
                    "{selectedEntry.impactSummary}"
                  </p>
                </div>

                {/* Legacy Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-zinc-900">
                  <div>
                    <h5 className="text-zinc-700 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">
                      COMMUNITY ROLE
                    </h5>
                    <p className="text-white font-mono text-sm uppercase tracking-widest">
                      {selectedEntry.role}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-zinc-700 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">
                      HONOR DATE
                    </h5>
                    <p className="text-white font-mono text-sm uppercase tracking-widest">
                      {selectedEntry.period}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Stamps */}
              <div className="mt-20 pt-8 border-t border-zinc-900 flex justify-between items-center opacity-30">
                <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.5em]">
                  A CODETOPIA INITIATIVE
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
