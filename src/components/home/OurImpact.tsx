"use client";

import {
  Calendar,
  Image as ImageIcon,
  MapPin,
  MoveRight,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import codetopiaLogoTw from "@/assets/images/logos/Codetopia-Logo-TW.png";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/ui/cta-button";
import { impactStories } from "@/lib/data/impact-stories";

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
    <div className="flex items-center gap-1.5 text-white opacity-80 group-hover:opacity-100 transition-opacity">
      <Image
        src={logo}
        alt={alt}
        width={60}
        height={60}
        unoptimized
        className="w-15 h-15 object-contain brightness-0 invert"
      />
    </div>
  );
}

export function OurImpact() {
  const [selectedStory, setSelectedStory] = useState<
    (typeof impactStories)[0] | null
  >(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

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
      <section className="w-full py-24 md:py-32 bg-[#09090b] flex flex-col items-center justify-center border-t border-zinc-900 overflow-hidden">
        <Container className="flex flex-col items-center w-full px-4 font-sans max-w-6xl">
          <div className="flex flex-col items-center flex-1 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider mb-4">
              Our Impact
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl font-mono mb-16">
              We don't just work with industry leaders; we actively empower the
              next generation of developers across schools, bootcamps, and local
              hubs.
            </p>
          </div>

          {/* Impact Cards Carousel */}
          <h3 className="text-zinc-500 text-sm font-bold tracking-[0.2em] mb-12 uppercase text-center font-sans relative z-20">
            Places We Empower
          </h3>
        </Container>

        <div className="w-full relative flex flex-col items-center pb-4 overflow-hidden px-4 md:px-8">
          {/* The Brutalist Vertical Impact Log Container */}
          <div className="w-full max-w-7xl">
            <div className="h-[80vh] overflow-y-auto overflow-x-hidden scroll-smooth pr-4 md:pr-8 [&::-webkit-scrollbar]:w-5 md:[&::-webkit-scrollbar]:w-6 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:border-2 [&::-webkit-scrollbar-track]:border-zinc-800 [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-[#09090b] hover:[&::-webkit-scrollbar-thumb]:bg-zinc-200 active:[&::-webkit-scrollbar-thumb]:bg-zinc-400 [&::-webkit-scrollbar-thumb]:rounded-none">
              <div className="flex flex-col border-2 border-zinc-800 bg-[#09090b]">
                {impactStories.map((story) => (
                  <button
                    type="button"
                    key={story.id}
                    onClick={() => setSelectedStory(story)}
                    className="group relative flex flex-col w-full shrink-0 h-auto min-h-[300px] lg:min-h-[400px] border-b-2 border-zinc-800 last:border-b-0 bg-[#09090b] overflow-hidden cursor-pointer [direction:ltr] text-left"
                  >
                    {/* Background Panoramic Image Layer */}
                    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        unoptimized
                        className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out z-0 opacity-40 group-hover:opacity-100"
                      />
                      {/* Dark scrim to guarantee text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/90 to-black/20 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-transparent transition-colors duration-500 z-10" />
                    </div>

                    {/* Logo watermark top-right */}
                    <div className="absolute top-5 right-5 z-20 opacity-40 group-hover:opacity-90 transition-opacity duration-500 text-white hidden md:block">
                      <div className="absolute inset-0 bg-black/40 blur-xl scale-150 rounded-full z-0" />
                      <div className="relative z-10 scale-[80%] origin-top-right">
                        <StoryLogoWatermark
                          logo={story.logo}
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
          </div>
          {/* Global CTA */}
          <Container className="w-full flex justify-center mt-6">
            <CtaButton
              className="bg-white text-black hover:bg-zinc-200 !px-8 text-sm"
              offsetClassName="bg-zinc-700"
            >
              <span className="flex items-center">
                INVITE US TO YOUR CAMPUS OR HUB
                <MoveRight
                  className="ml-2 w-4 h-4"
                  strokeWidth={2.5}
                  size={2}
                />
              </span>
            </CtaButton>
          </Container>
        </div>
      </section>

      {/* Centered Brutalist Modal Card */}
      {selectedStory && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop does not need keyboard interaction
        // biome-ignore lint/a11y/noStaticElementInteractions: Backdrop is a presentational element
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 md:p-8 cursor-[url('/close-cursor.svg'),_pointer]"
          style={{ height: "100dvh" }}
          onClick={() => setSelectedStory(null)}
        >
          {/* Codetopia Logo — top-left, mirrors close button */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 md:top-8 md:left-8 z-[110] flex items-center justify-center">
            <Image
              src={codetopiaLogoTw}
              alt="Codetopia"
              width={40}
              height={40}
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain brightness-0 invert opacity-70"
            />
          </div>

          {/* Global Screen-Fixed Close Button */}
          <button
            type="button"
            onClick={() => setSelectedStory(null)}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-8 md:right-8 z-[110] text-white opacity-70 hover:opacity-100 transition-all bg-[#09090b] hover:bg-white hover:text-black p-2.5 md:p-4 rounded-full border-2 border-zinc-700 hover:border-white shadow-2xl flex items-center justify-center cursor-pointer group"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:rotate-90 transition-transform duration-300"
            >
              <title>Close Dialog</title>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Modal card — scrollable on all breakpoints, max 92dvh tall */}
          <div
            className="relative w-full max-w-7xl bg-[#09090b] border-2 border-white shadow-2xl flex flex-col lg:flex-row cursor-default overflow-y-auto max-h-[92dvh]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Left Data Column */}
            <div className="w-full lg:w-[35%] flex flex-col justify-center p-5 sm:p-8 lg:p-12 xl:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-zinc-800 relative z-20 bg-[#09090b] shrink-0">
              <div className="flex items-center gap-2 font-mono text-zinc-500 tracking-[0.2em] uppercase mb-3 md:mb-6 text-xs sm:text-sm md:text-base">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                {selectedStory.date}
              </div>
              <div className="flex items-start gap-2 font-sans font-black text-white text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase tracking-tighter leading-[1.1] break-words">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 shrink-0 mt-1 md:mt-2" />
                {selectedStory.location}
              </div>
            </div>

            {/* Right Panoramic View Column */}
            <div className="w-full lg:w-[65%] relative flex flex-col justify-end p-5 sm:p-8 lg:p-12 xl:p-16 min-h-[55vw] sm:min-h-[420px] lg:min-h-0 lg:flex-1">
              {isPlayingVideo && selectedStory.link ? (
                <div className="absolute inset-0 z-30 bg-black flex flex-col animate-in fade-in duration-300">
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(false)}
                    className="absolute top-4 left-4 sm:top-6 sm:left-6 z-40 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white border border-white/60 px-3 py-1 sm:px-4 sm:py-2 bg-black/60 hover:bg-white hover:text-black hover:border-white transition-colors backdrop-blur-sm flex items-center gap-2 group cursor-pointer"
                  >
                    ← BACK TO POST
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
                  {/* Background Image */}
                  <Image
                    src={selectedStory.image as string}
                    alt={selectedStory.title as string}
                    fill
                    unoptimized
                    className="object-cover"
                  />

                  {/* Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/95 via-black/80 to-transparent z-10" />

                  {/* Story Logo Watermark */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-20 opacity-80 text-white">
                    <div className="absolute inset-0 bg-black/60 blur-xl scale-150 rounded-full z-0" />
                    <div className="relative z-10">
                      <StoryLogoWatermark
                        logo={selectedStory.logo}
                        alt={selectedStory.title}
                      />
                    </div>
                  </div>

                  {/* Event Title & Impact Report */}
                  <div className="relative z-20 max-w-3xl mt-auto pt-12 sm:pt-16">
                    <h4 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-3 md:mb-6 border-b-2 border-white pb-2 md:pb-4 inline-block drop-shadow-lg font-sans">
                      {selectedStory.title}
                    </h4>
                    <div className="bg-black/80 border border-white backdrop-blur-md drop-shadow-2xl flex flex-col">
                      <span className="font-mono text-zinc-400 uppercase tracking-[0.2em] text-[10px] md:text-xs lg:text-sm pt-3 px-3 sm:pt-5 sm:px-5 lg:pt-7 lg:px-7 pb-2 sm:pb-3 border-b border-zinc-800">
                        Impact Report
                      </span>
                      <p className="block text-white text-sm md:text-base lg:text-lg font-mono leading-relaxed px-3 sm:px-5 lg:px-7 pb-3 sm:pb-5 lg:pb-7 pt-3 sm:pt-5">
                        {selectedStory.impact}
                      </p>
                      {selectedStory.link && (
                        <div className="px-3 sm:px-5 lg:px-7 pb-4 sm:pb-6 lg:pb-8">
                          <button
                            type="button"
                            onClick={() => setIsPlayingVideo(true)}
                            className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold uppercase tracking-widest text-xs sm:text-sm px-5 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-4 hover:bg-zinc-200 transition-colors w-fit group/btn shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-pointer"
                          >
                            <PlayCircle className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:scale-110 transition-transform" />
                            Watch Video
                          </button>
                        </div>
                      )}
                      {selectedStory.galleryLink && (
                        <div className="px-3 sm:px-5 lg:px-7 pb-4 sm:pb-6 lg:pb-8">
                          <a
                            href={selectedStory.galleryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white font-bold uppercase tracking-widest text-xs sm:text-sm px-5 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-4 hover:bg-white hover:text-black transition-colors w-fit group/btn shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] cursor-pointer"
                          >
                            <ImageIcon className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:scale-110 transition-transform" />
                            View Gallery
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
