"use client";

import { useEffect, useState } from "react";
import { spaceGrotesk } from "../../fonts/fonts";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type HeroProps = {
  backgroundImage?: string;
};

// Partner logos
const partnerLogos = [
  "/images/partners/Logo.png",
  "/images/partners/Logo1.png",
  "/images/partners/Logo2.png",
  "/images/partners/Logo.png",
  "/images/partners/Logo1.png",
  "/images/partners/Logo2.png",
  "/images/partners/Logo.png",
  "/images/partners/Logo1.png",
  "/images/partners/Logo2.png",
  "/images/partners/Logo2.png",
  "/images/partners/Logo.png",
  "/images/partners/Logo1.png",
  "/images/partners/Logo2.png",
  "/images/partners/Logo.png",
  "/images/partners/Logo1.png",
  "/images/partners/Logo2.png",
];

export default function Hero({ backgroundImage }: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className={`relative min-h-[500px] md:min-h-screen bg-center bg-cover flex flex-col items-center justify-center text-center ${spaceGrotesk.className}`}
      style={{
        backgroundImage: `url(${backgroundImage || "/images/hero-background.jpg"})`,
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/70 z-10"></div>

      {/* Gradient at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 lg:max-w-[80%]">
        <h1 className="text-4xl md:text-7xl font-bold text-white max-w-md md:max-w-7xl mx-auto pt-20">
          Building A Community for the Future
        </h1>
        <p className="mt-5 text-2xl text-white max-w-3xl mx-auto">
          A thriving community where tech enthusiasts come together to learn,
          share and grow
        </p>
        <div className="flex flex-col md:flex-row gap-8 mt-10 justify-center items-center">
          <Link
            href=""
            className="bg-black text-white px-4 py-3 shadow-[4px_4px_0_0.05rem_rgba(255,255,255,0.4)] transition-all duration-200 ease-out hover:shadow-[2px_2px_0_0.05rem_rgba(255,255,255,0.4)] hover:-translate-x-[1px] hover:-translate-y-[1px]"
          >
            JOIN OUR COMMUNITY
          </Link>
          <Link
            href=""
            className="flex gap-4 bg-transparent outline outline-white text-white px-4 py-3 shadow-[4px_4px_0_0.05rem_rgba(255,255,255,0.4)] transition-all duration-200 ease-out hover:shadow-[2px_2px_0_0.05rem_rgba(255,255,255,0.4)] hover:-translate-x-[1px] hover:-translate-y-[1px]"
          >
            LEARN MORE
            <ArrowRight />
          </Link>
        </div>
      </div>

      {/* Partners carousel */}
      <div className="mt-30 capitalize z-20 relative">
        <h2 className="text-xl text-white border-b-3 border-white pb-2 mb-6 inline-block font-medium uppercase">
          Our Partners & Collaborators
        </h2>
        <div className="w-screen -mx-4 mt-10 mb-10">
          <Carousel
            className="w-full"
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent className="flex gap-6">
              {partnerLogos.map((logo, index) => (
                <CarouselItem key={index} className="basis-1/4 md:basis-1/8">
                  <div className="relative w-full h-16">
                    <Image
                      src={logo}
                      alt={`Partner ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
