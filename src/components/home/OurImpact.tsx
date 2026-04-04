"use client";

import {
  Calendar,
  Image as ImageIcon,
  MapPin,
  // MoveRight,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/assets/images/logos/codetopia-community.png";
import { Container } from "@/components/layout/Container";

// import { CtaButton } from "@/components/ui/cta-button";

interface ImpactStory {
  id: number;
  title: string;
  impact: string;
  imageUrl: string;
  logoUrl: string;
  date: string;
  location: string;
  link?: string | null;
  galleryLink?: string | null;
}

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

// Story Logo Watermark
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

export function OurImpact() {
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [impactStories, setImpactStories] = useState<ImpactStory[]>([]);

  useEffect(() => {
    fetch("/api/impact")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setImpactStories(data);
      })
      .catch(() => {});
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsPlayingVideo(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedStory]);

  return (
    <>
      <section className="w-full py-32 bg-black flex flex-col border-t border-zinc-900 overflow-hidden">
        <Container className="w-full px-4 font-sans relative z-10">
          <div className="w-full mb-24 text-left">
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter mb-6 leading-none font-sans">
              THE <span className="text-zinc-600">IMPACT</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl font-mono max-w-2xl">
              We don&apos;t just work with industry leaders; we actively empower
              the next generation of developers across schools, bootcamps, and
              local hubs.
            </p>
          </div>
        </Container>

        <div className="w-full relative flex flex-col items-center pb-4 overflow-hidden">
          {/* The Brutalist Vertical Impact Log Container */}
          <Container className="w-full px-6 lg:px-12">
            {impactStories.length === 0 ? (
              <div className="border-2 border-zinc-800 bg-black flex flex-col items-center justify-center py-32 px-8 text-center gap-8">
                <div className="flex flex-col items-center gap-6">
                  <div className="border border-zinc-800 p-6">
                    <div className="grid grid-cols-3 gap-1.5">
                      {(
                        [
                          "g0",
                          "g1",
                          "g2",
                          "g3",
                          "g4",
                          "g5",
                          "g6",
                          "g7",
                          "g8",
                        ] as const
                      ).map((key, i) => (
                        <div
                          key={key}
                          className={`h-3 w-3 ${i % 3 === 1 || i === 4 ? "bg-zinc-700" : "bg-zinc-900"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-700">
                      — LOG EMPTY —
                    </p>
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-800 leading-none font-sans">
                      NO IMPACT <br /> RECORDED YET
                    </h3>
                    <p className="text-zinc-600 font-mono text-xs leading-relaxed max-w-sm">
                      The community impact log is currently empty. Stories will
                      appear here as Codetopia continues to grow and make its
                      mark.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-zinc-800 font-mono text-[9px] uppercase tracking-[0.4em]">
                    <span className="h-px w-12 bg-zinc-800" />A CODETOPIA
                    INITIATIVE
                    <span className="h-px w-12 bg-zinc-800" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-h-[1200px] lg:max-h-[1650px] overflow-y-auto overflow-x-hidden scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white hover:[&::-webkit-scrollbar-thumb]:bg-zinc-200 active:[&::-webkit-scrollbar-thumb]:bg-zinc-400 [&::-webkit-scrollbar-thumb]:rounded-none">
                <div className="flex flex-col border-2 border-zinc-800 bg-black">
                  {impactStories.map((story) => (
                    <button
                      type="button"
                      key={story.id}
                      onClick={() => setSelectedStory(story)}
                      className="group relative flex flex-col w-full shrink-0 h-auto min-h-[400px] lg:min-h-[550px] border-b-2 border-zinc-800 last:border-b-0 bg-black overflow-hidden cursor-pointer [direction:ltr] text-left"
                    >
                      {/* Background Panoramic Image Layer */}
                      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                        <Image
                          src={story.imageUrl}
                          alt={story.title}
                          fill
                          unoptimized
                          className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out z-0 opacity-40 group-hover:opacity-100"
                        />
                        {/* Dark scrim to guarantee text legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/90 to-black/20 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-transparent transition-colors duration-500 z-10" />
                      </div>

                      {/* Logo watermark top-right */}
                      <div className="absolute top-5 right-5 z-30 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="relative z-10 scale-[100%] origin-top-right">
                          <StoryLogoWatermark
                            logo={story.logoUrl}
                            alt={story.title}
                          />
                        </div>
                      </div>

                      {/* Content Overlay */}
                      <div className="relative z-20 w-full lg:w-[60%] flex flex-col justify-center px-6 py-8 md:p-8 lg:p-12 h-full flex-grow">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4 md:mb-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          {story.link && (
                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black border-2 border-black px-2 py-1 bg-white flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              <PlayCircle className="w-3 h-3" /> VIDEO
                            </span>
                          )}
                          {story.galleryLink && (
                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black border-2 border-black px-2 py-1 bg-white flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              <ImageIcon className="w-3 h-3" /> GALLERY
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="font-black text-white uppercase tracking-tighter text-4xl md:text-5xl lg:text-6xl leading-[1.1] translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75 mb-6 lg:mb-8 max-w-4xl drop-shadow-lg font-sans">
                          {story.title}
                        </h4>

                        {/* Meta Info */}
                        <div className="flex flex-col gap-3 font-mono text-zinc-300 group-hover:text-zinc-200 text-sm md:text-base tracking-[0.15em] uppercase translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-150 drop-shadow-md font-mono">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                            {story.date}
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
                            <span>{story.location}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </div>
      </section>

      {/* Modal */}
      {selectedStory && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop does not need keyboard interaction
        // biome-ignore lint/a11y/noStaticElementInteractions: Backdrop is a presentational element
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black cursor-[url('/close-cursor.svg'),_pointer]"
          style={{ height: "100dvh" }}
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="relative w-full h-full bg-black cursor-default overflow-hidden animate-in fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {isPlayingVideo && selectedStory.link ? (
              <div className="absolute inset-0 z-30 bg-black flex flex-col">
                <button
                  type="button"
                  onClick={() => setIsPlayingVideo(false)}
                  className="absolute top-4 left-4 z-40 font-mono text-xs tracking-[0.25em] uppercase text-white border border-white/60 px-4 py-2 bg-black/60 hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  ← BACK
                </button>
                <iframe
                  src={getYouTubeEmbedUrl(selectedStory.link)}
                  title={selectedStory.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <>
                {/* Full-bleed background image */}
                <Image
                  src={selectedStory.imageUrl}
                  alt={selectedStory.title}
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
                    onClick={() => setSelectedStory(null)}
                    className="font-mono text-xs tracking-[0.2em] uppercase text-white border border-zinc-700 hover:border-white hover:bg-white hover:text-black px-4 py-2 transition-colors cursor-pointer"
                  >
                    CLOSE ✕
                  </button>
                </div>

                {/* Story logo watermark */}
                <div className="absolute top-6 right-6 z-20 mt-20">
                  <StoryLogoWatermark
                    logo={selectedStory.logoUrl}
                    alt={selectedStory.title}
                  />
                </div>

                {/* Content overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 lg:p-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                  {/* Left: title + meta */}
                  <div className="flex-1">
                    <div className="flex items-center gap-6 mb-4 font-mono text-zinc-400 text-xs uppercase tracking-[0.3em]">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {selectedStory.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {selectedStory.location}
                      </span>
                    </div>
                    <h4 className="font-black text-white uppercase tracking-tighter text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-none font-sans drop-shadow-2xl mb-6">
                      {selectedStory.title}
                    </h4>
                    <p className="font-mono text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl">
                      {selectedStory.impact}
                    </p>
                  </div>

                  {/* Right: action buttons */}
                  <div className="flex flex-row lg:flex-col gap-3 shrink-0">
                    {selectedStory.link && (
                      <button
                        type="button"
                        onClick={() => setIsPlayingVideo(true)}
                        className="flex items-center gap-3 bg-white text-black font-black uppercase tracking-widest text-xs px-6 py-4 hover:bg-zinc-200 transition-colors cursor-pointer"
                      >
                        <PlayCircle className="w-4 h-4" /> Watch Video
                      </button>
                    )}
                    {selectedStory.galleryLink && (
                      <a
                        href={selectedStory.galleryLink}
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
      )}
    </>
  );
}
