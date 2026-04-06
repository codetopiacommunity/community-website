"use client";

import { Calendar, Image as ImageIcon, MapPin, PlayCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/assets/images/logos/codetopia-community.png";
import type { ImpactStory } from "@/types";

function getYouTubeEmbedUrl(url: string) {
  if (!url) return "";
  const match = url.match(/[?&]v=([^&]+)/);
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
  }
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
  }
  return url;
}

function StoryLogoWatermark({ logo, alt }: { logo: string; alt: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Image
        src={logo}
        alt={alt}
        width={80}
        height={80}
        unoptimized
        className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.95)]"
      />
    </div>
  );
}

interface ImpactStoryModalProps {
  story: ImpactStory | null;
  onClose: () => void;
}

export function ImpactStoryModal({ story, onClose }: ImpactStoryModalProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: story prop change intentionally resets video state
  useEffect(() => {
    setIsPlayingVideo(false);
  }, [story]);

  if (!story) return null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop does not need keyboard interaction
    // biome-ignore lint/a11y/noStaticElementInteractions: Backdrop is a presentational element
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black cursor-[url('/close-cursor.svg'),_pointer]"
      style={{ height: "100dvh" }}
      onClick={onClose}
    >
      <div
        className="relative w-full h-full bg-black cursor-default overflow-hidden animate-in fade-in duration-300"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {isPlayingVideo && story.link ? (
          <div className="absolute inset-0 z-30 bg-black flex flex-col">
            <button
              type="button"
              onClick={() => setIsPlayingVideo(false)}
              className="absolute top-4 left-4 z-40 font-mono text-xs tracking-[0.25em] uppercase text-white border border-white/60 px-4 py-2 bg-black/60 hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              ← BACK
            </button>
            <iframe
              src={getYouTubeEmbedUrl(story.link)}
              title={story.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <>
            {/* Full-bleed background image */}
            <Image
              src={story.imageUrl}
              alt={story.title}
              fill
              unoptimized
              className="object-cover"
            />
            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 z-10" />

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5">
              <Image
                src={logo}
                alt="Codetopia"
                width={80}
                height={80}
                className="w-28 h-28 object-contain brightness-0 invert opacity-90"
              />
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-xs tracking-[0.2em] uppercase text-white border border-zinc-700 hover:border-white hover:bg-white hover:text-black px-4 py-2 transition-colors cursor-pointer"
              >
                CLOSE ✕
              </button>
            </div>

            {/* Story logo watermark */}
            <div className="absolute top-6 right-6 z-20 mt-20">
              <StoryLogoWatermark logo={story.logoUrl} alt={story.title} />
            </div>

            {/* Content overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8 lg:p-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              {/* Left: title + meta */}
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-4 font-mono text-zinc-400 text-xs uppercase tracking-[0.3em]">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {story.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {story.location}
                  </span>
                </div>
                <h4 className="font-black text-white uppercase tracking-tighter text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-none font-sans drop-shadow-2xl mb-6">
                  {story.title}
                </h4>
                <p className="font-mono text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl">
                  {story.impact}
                </p>
              </div>

              {/* Right: action buttons */}
              <div className="flex flex-row lg:flex-col gap-3 shrink-0">
                {story.link && (
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(true)}
                    className="flex items-center gap-3 bg-white text-black font-black uppercase tracking-widest text-xs px-6 py-4 hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4" /> Watch Video
                  </button>
                )}
                {story.galleryLink && (
                  <a
                    href={story.galleryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 border border-white text-white font-black uppercase tracking-widest text-xs px-6 py-4 hover:bg-white hover:text-black transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" /> View Gallery
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
