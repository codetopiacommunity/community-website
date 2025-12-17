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

// Import partner images from public folder
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
      style={{
        backgroundImage: !isMobile
          ? `url(${backgroundImage || "/images/hero-background.jpg"})`
          : "none",
      }}
      className={`md:min-h-screen bg-center bg-cover md:flex flex-col items-center justify-center relative text-center ${spaceGrotesk.className}`}
    >
      {!isMobile && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        ></div>
      )}

      <div className="lg:max-w-[80%] z-10">
        <h1 className="text-4xl font-bold max-w-md mx-auto pt-20 md:max-w-7xl md:text-7xl text-white">
          Building A Community for the future
        </h1>
        <p className="mt-5 max-w-3xl mx-auto text-white text-2xl">
          A thriving community where tech enthusiasts come together to learn,
          share and grow
        </p>
        <div className="flex items-center justify-center gap-8 flex-col md:flex-row mt-10">
          <Link
            href=""
            className="
              bg-black text-white px-4 py-3
              shadow-[4px_4px_0_0.05rem_rgba(255,255,255,0.4)]
              transition-all duration-200 ease-out
              hover:shadow-[2px_2px_0_0.05rem_rgba(255,255,255,0.4)]
              hover:-translate-x-[1px]
              hover:-translate-y-[1px]
            "
          >
            JOIN OUR COMMUNITY
          </Link>
          <Link
            href=""
            className="
              flex gap-4 bg-transparent outline outline-white text-white px-4 py-3
              shadow-[4px_4px_0_0.05rem_rgba(255,255,255,0.4)]
              transition-all duration-200 ease-out
              hover:shadow-[2px_2px_0_0.05rem_rgba(255,255,255,0.4)]
              hover:-translate-x-[1px]
              hover:-translate-y-[1px]
            "
          >
            LEARN MORE
            <ArrowRight />
          </Link>
        </div>
      </div>

      <div className="mt-30 capitalize z-10">
        <h2 className="text-2xl text-white border-b-3  border-white pb-2 mb-6 inline-block font-medium">
          Our Partners & Collaborators
        </h2>
        <div className="w-screen -mx-4 mt-10">
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
