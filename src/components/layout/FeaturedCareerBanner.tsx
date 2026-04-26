"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Career } from "@/lib/careers";

export function FeaturedCareerBanner() {
  const [featuredCareers, setFeaturedCareers] = useState<Career[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/careers");
        const data: Career[] = await res.json();
        const featured = data.filter((c) => c.isFeatured);
        if (featured.length > 0) {
          setFeaturedCareers(featured);
          setIsVisible(true);
        }
      } catch {
        // silently fail — banner is non-critical
      }
    }
    fetchFeatured();
  }, []);

  useEffect(() => {
    if (featuredCareers.length <= 1 || !isVisible || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredCareers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredCareers, isVisible, isPaused]);

  if (!isVisible || featuredCareers.length === 0) return null;

  const career = featuredCareers[currentIndex];
  const hasMultiple = featuredCareers.length > 1;

  const prev = () =>
    setCurrentIndex(
      (i) => (i - 1 + featuredCareers.length) % featuredCareers.length,
    );
  const next = () => setCurrentIndex((i) => (i + 1) % featuredCareers.length);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: pause-on-hover is a progressive enhancement
    <div
      className="relative w-full bg-black border-b border-zinc-800 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle animated gradient sweep */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      </div>

      <div className="relative z-20 flex items-center h-11 px-4 md:px-8 gap-4">
        {/* Left: icon + label */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="h-6 w-6 bg-white rounded flex items-center justify-center shrink-0">
            <Briefcase className="h-3.5 w-3.5 text-black" />
          </div>
          <span className="hidden sm:block font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 whitespace-nowrap">
            We&apos;re Hiring
          </span>
          <span className="hidden sm:block text-zinc-800 text-xs">|</span>
        </div>

        {/* Center: animated job info */}
        <div className="flex-1 overflow-hidden flex items-center min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-3 min-w-0 w-full"
            >
              {/* Featured badge */}
              <span className="hidden md:inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.2em] bg-yellow-400 text-black px-1.5 py-0.5 shrink-0 font-black">
                <Star className="h-2 w-2 fill-current" />
                Featured
              </span>

              {/* Title */}
              <span className="font-sans font-black text-white text-sm uppercase tracking-tight truncate">
                {career.title}
              </span>

              {/* Divider */}
              <span className="hidden sm:block text-zinc-700 shrink-0">·</span>

              {/* Type */}
              <span className="hidden sm:block font-mono text-[10px] text-zinc-400 uppercase tracking-widest shrink-0">
                {career.type}
              </span>

              {/* Location */}
              {career.location && (
                <>
                  <span className="hidden md:block text-zinc-700 shrink-0">
                    ·
                  </span>
                  <span className="hidden md:flex items-center gap-1 font-mono text-[10px] text-zinc-500 uppercase tracking-widest shrink-0">
                    <MapPin className="h-2.5 w-2.5" />
                    {career.location}
                  </span>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: counter + nav + CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Pagination dots / counter */}
          {hasMultiple && (
            <div className="hidden sm:flex items-center gap-1.5">
              {featuredCareers.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-4 bg-white"
                      : "w-1 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                  aria-label={`Go to job ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Prev / Next */}
          {hasMultiple && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prev}
                className="h-6 w-6 flex items-center justify-center text-zinc-600 hover:text-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="h-6 w-6 flex items-center justify-center text-zinc-600 hover:text-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* CTA */}
          <Link
            href={career.link ?? "/careers"}
            target={career.link ? "_blank" : undefined}
            rel={career.link ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] font-black text-black bg-white px-3 h-6 hover:bg-zinc-200 transition-colors whitespace-nowrap"
          >
            Apply
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      {hasMultiple && (
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-zinc-900">
          <motion.div
            key={`${currentIndex}-${isPaused}`}
            initial={{ width: "0%" }}
            animate={{ width: isPaused ? undefined : "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-zinc-600"
          />
        </div>
      )}
    </div>
  );
}
