"use client";
import { useState, useEffect } from "react";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/ui/cta-button";
import { impactStories } from "@/lib/data/impact-stories";

// Reusable placeholder logo for now
function LogoIpsum() {
  return (
    <div className="flex items-center gap-1.5 text-white opacity-80 group-hover:opacity-100 transition-opacity">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Logo Ipsum</title>
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-bold text-lg tracking-tight hidden sm:block">
        logoipsum
      </span>
    </div>
  );
}



export function OurImpact() {
  const [selectedStory, setSelectedStory] = useState<typeof impactStories[0] | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
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
              We don't just partner with industry leaders; we actively empower the
              next generation of developers across schools, bootcamps, and local
              hubs.
            </p>
          </div>

          {/* Impact Cards Carousel */}
          <h3 className="text-zinc-500 text-sm font-bold tracking-[0.2em] mb-12 uppercase text-center font-sans relative z-20">
            Places We Empower
          </h3>
        </Container>

        <div className="w-full relative flex flex-col items-center pb-4 overflow-hidden">
          {/* The Brutalist Vertical Impact Log Container */}
          <div className="w-full max-w-7xl border-2 border-zinc-800">
            <div className="h-[80vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-600 hover:scrollbar-thumb-white scroll-smooth">
              {impactStories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => setSelectedStory(story)}
                  className="group flex flex-col lg:flex-row w-full shrink-0 h-[220px] border-b-2 border-zinc-800 bg-[#09090b] transition-colors duration-0 hover:bg-white overflow-hidden cursor-crosshair [direction:ltr]"
                >
                  {/* Left Data Column (Date & Location) */}
                  <div className="w-full lg:w-[35%] h-full flex flex-col justify-center p-6 md:p-8 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-zinc-800 group-hover:border-zinc-300 relative z-20 bg-[#09090b] group-hover:bg-white transition-colors duration-0 shrink-0">
                    <div className="font-mono text-zinc-500 group-hover:text-zinc-800 text-sm md:text-base tracking-[0.2em] uppercase mb-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {story.date}
                    </div>
                    <div className="font-sans font-black text-white group-hover:text-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter leading-[1.1] break-words translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                      {story.location}
                    </div>
                  </div>

                  {/* Right Panoramic View Column */}
                  <div className="w-full lg:w-[65%] relative h-full overflow-hidden">

                    {/* Background Image: grayscale → color on hover */}
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      unoptimized
                      className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out z-0"
                    />

                    {/* Dark scrim fades on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent group-hover:from-black/60 group-hover:via-black/20 z-10 transition-all duration-500" />

                    {/* Bottom gradient for title legibility */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 to-transparent z-10" />

                    {/* Logo watermark top-right */}
                    <div className="absolute top-5 right-5 z-20 opacity-40 group-hover:opacity-90 transition-opacity duration-500 text-white">
                      <div className="absolute inset-0 bg-black/40 blur-xl scale-150 rounded-full z-0" />
                      <div className="relative z-10"><LogoIpsum /></div>
                    </div>

                    {/* Title slides up from bottom on hover */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-7 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="font-black text-white uppercase tracking-tighter text-xl md:text-2xl truncate drop-shadow-lg">
                        {story.title}
                      </h4>
                    </div>

                    {/* Expand badge — slides in from right on hover */}
                    <div className="absolute top-5 left-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white border border-white/60 px-3 py-1 bg-black/60 backdrop-blur-sm">
                        EXPAND ↗
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
                <MoveRight className="ml-2 w-4 h-4" strokeWidth={2.5} size={2} />
              </span>
            </CtaButton>
          </Container>
        </div>
      </section>

      {/* Centered Brutalist Modal Card */}
      {selectedStory && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8 cursor-[url('/close-cursor.svg'),_pointer]"
          onClick={() => setSelectedStory(null)}
        >
          {/* Global Screen-Fixed Close Button */}
          <button
            onClick={() => setSelectedStory(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] text-white opacity-70 hover:opacity-100 transition-all bg-[#09090b] hover:bg-white hover:text-black p-3 md:p-4 rounded-full border-2 border-zinc-700 hover:border-white shadow-2xl flex items-center justify-center cursor-pointer group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-7xl bg-[#09090b] border-2 border-white shadow-2xl flex flex-col lg:flex-row cursor-default overflow-y-auto lg:overflow-hidden max-h-[95vh] lg:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Data Column (Date & Location) - EXACT TWIN OF ROW */}
            <div className="w-full lg:w-[35%] flex flex-col justify-center p-6 md:p-10 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-zinc-800 relative z-20 bg-[#09090b] shrink-0">
              <div className="font-mono text-zinc-500 tracking-[0.2em] uppercase mb-4 md:mb-6 text-sm md:text-base">
                {selectedStory.date}
              </div>
              <div className="font-sans font-black text-white text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[1.1] break-words">
                {selectedStory.location}
              </div>
            </div>

            {/* Right Panoramic View Column (Image & Event Proof) - EXACT TWIN OF ROW */}
            <div className="w-full lg:w-[65%] relative flex flex-col justify-end p-6 md:p-10 lg:p-16 min-h-[450px] md:min-h-[500px] lg:min-h-[600px]">

              {/* Background Image (Full Color Always) */}
              <Image
                src={selectedStory.image as string}
                alt={selectedStory.title as string}
                fill
                unoptimized
                className="object-cover"
              />

              {/* Scrim for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/95 via-black/80 to-transparent z-10" />

              {/* Top Right Logo Watermark with Protective Scrim */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 opacity-80 text-white">
                <div className="absolute inset-0 bg-black/60 blur-xl scale-150 rounded-full z-0" />
                <div className="relative z-10">
                  <LogoIpsum />
                </div>
              </div>

              {/* Event Title & Impact Action (Un-truncated Text Block) */}
              <div className="relative z-20 max-w-3xl mt-auto pt-16">
                <h4 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4 md:mb-6 border-b-2 border-white pb-3 md:pb-4 inline-block drop-shadow-lg">
                  {selectedStory.title}
                </h4>
                <div className="bg-black/80 border border-white backdrop-blur-md drop-shadow-2xl flex flex-col">
                  <span className="font-mono text-zinc-400 uppercase tracking-[0.2em] text-[10px] md:text-xs lg:text-sm pt-4 px-4 md:pt-6 md:px-6 lg:pt-8 lg:px-8 pb-3 border-b border-zinc-800">
                    Impact Report
                  </span>
                  <p className="block text-white text-sm md:text-lg lg:text-xl font-mono leading-relaxed px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 pt-4 md:pt-6">
                    {selectedStory.impact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
