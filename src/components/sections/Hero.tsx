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
      <div className="absolute inset-0 bg-ct-bg-dark/50 md:bg-ct-bg-dark/70 z-10"></div>

      {/* Gradient at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-ct-bg-dark/80 via-ct-bg-dark/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-grow w-full px-4 mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-ct-primary text-center uppercase tracking-wide max-w-5xl leading-tight">
          Building A Community <br /> For The Future
        </h1>
        <p className="mt-8 text-lg md:text-xl text-ct-primary/90 text-center max-w-2xl font-light">
          A thriving tech community where tech enthusiasts come <br className="hidden md:block" /> together to learn, share, and grow
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mt-12">
          <Link
            href=""
            className="bg-ct-inverse text-ct-primary px-8 py-3 text-xs font-bold uppercase tracking-widest border border-transparent shadow-ct-hero-btn hover:shadow-none transition-shadow duration-300 ease-in-out"
          >
            JOIN OUR COMMUNITY
          </Link>

          <Link
            href=""
            className="group flex items-center justify-center gap-2 bg-transparent text-ct-primary px-8 py-3 text-xs font-bold uppercase tracking-widest border border-ct-primary shadow-ct-hero-btn hover:shadow-none transition-shadow duration-300 ease-in-out"
          >
            LEARN MORE
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      {/* Partners carousel - Bottom */}
      <div className="absolute bottom-0 md:bottom-10 left-0 right-0 z-20 w-full pb-8 md:pb-12 px-4 pt-8">
        <Carousel
          className="w-full max-w-6xl mx-auto"
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent className="flex items-center">
            {partnerLogos.map((logo, index) => (
              <CarouselItem key={index} className="basis-1/3 md:basis-1/5 lg:basis-1/6 flex justify-center">
                <div className="relative w-32 h-10 opacity-70 hover:opacity-100 transition-opacity">
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
    </section>
  );
}
