"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CtaButton } from "@/components/ui/cta-button";

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

const impactStories = [
  {
    id: 1,
    title: "University Hackathon",
    impact:
      "Mentored 150+ students in building full-stack applications over a 48-hour intense coding weekend.",
    image:
      "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Local High School",
    impact:
      "Introduced Python and basic web concepts to 40 seniors, resulting in a 30% increase in CS majors.",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Django Girls Bootcamp",
    impact:
      "Partnered to teach web fundamentals. Helped over 60 women deploy their first working application online.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Developer Hub Accra",
    impact:
      "Refactored legacy codebases alongside junior developers, accelerating their transition into mid-level engineering roles.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
];

export function OurImpact() {
  return (
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

      <div className="w-full max-w-[95vw] sm:max-w-4xl lg:max-w-6xl relative flex flex-col items-center pb-4 mx-auto px-4 sm:px-12">
        <Carousel
          opts={{
            loop: true,
            align: "center",
          }}
          className="w-full mb-8 relative"
        >
          <CarouselContent className="flex cursor-grab active:cursor-grabbing">
            {impactStories.map((story) => (
              <CarouselItem
                key={story.id}
                className="pl-4 sm:pl-6 basis-[100%] md:basis-[90%] lg:basis-[95%] flex"
              >
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden group border border-zinc-800 bg-zinc-900 flex flex-col">
                  {/* Background Image */}
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/50 opacity-100 transition-opacity duration-300" />

                  {/* Content Container */}
                  <div className="relative z-10 flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-between h-full">
                    {/* Top Content: Title & Impact Text */}
                    <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0 max-w-2xl">
                      <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                        {story.title}
                      </h4>
                      <p className="text-zinc-300 text-base md:text-lg lg:text-xl font-mono leading-relaxed line-clamp-3">
                        {story.impact}
                      </p>
                    </div>

                    {/* Bottom Right: Logo */}
                    <div className="self-end mt-4">
                      <LogoIpsum />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Fading Edge Overlays */}
          <div className="hidden md:block absolute top-0 bottom-0 left-0 w-6 md:w-10 lg:w-16 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
          <div className="hidden md:block absolute top-0 bottom-0 right-0 w-6 md:w-10 lg:w-16 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

          <CarouselPrevious className="hidden sm:flex h-12 w-12 rounded-none border-2 border-zinc-700 bg-black text-white hover:bg-white hover:text-black hover:border-white transition-all -left-6 md:-left-12 lg:-left-20 z-20" />
          <CarouselNext className="hidden sm:flex h-12 w-12 rounded-none border-2 border-zinc-700 bg-black text-white hover:bg-white hover:text-black hover:border-white transition-all -right-6 md:-right-12 lg:-right-20 z-20" />
        </Carousel>

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
  );
}
