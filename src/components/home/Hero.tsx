"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { MoveRight } from "lucide-react";
import heroBg from "@/assets/images/django-girls.jpg";
import { Container } from "@/components/layout/Container";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CtaButton } from "@/components/ui/cta-button";
import { partners } from "@/lib/data/partners";


export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${heroBg.src}')` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#09090b]/70" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center text-center pt-12 pb-16">
        <Container className="flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold text-white tracking-tight uppercase max-w-5xl 2xl:max-w-6xl leading-tight font-sans">
            BUILDING A COMMUNITY <br className="hidden md:block" /> FOR THE
            FUTURE
          </h1>
          <p className="mt-6 text-lg md:text-xl xl:text-2xl text-zinc-300 max-w-2xl xl:max-w-3xl font-medium font-mono">
            A thriving tech community where tech enthusiast come together to
            learn, share, and grow
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-8 md:gap-6 w-full sm:w-auto">
            <CtaButton
              className="bg-white text-black hover:bg-zinc-200"
              offsetClassName="border-white"
            >
              JOIN OUR COMMUNITY
            </CtaButton>
            <CtaButton
              className="bg-transparent border-white text-white hover:bg-white/10 border"
              offsetClassName="border-white mix-blend-overlay"
            >
              LEARN MORE{" "}
              <MoveRight className="ml-2 w-5 h-5" strokeWidth={2.5} />
            </CtaButton>
          </div>
        </Container>
      </div>

      {/* Sponsors/Logos Strip at the bottom - Now in normal flow */}
      <div className="relative z-10 w-full pt-9 pb-12 bg-gradient-to-t from-[#09090b] to-transparent mt-auto border-b-4 border-zinc-800">
        <div className="w-full overflow-hidden flex flex-col items-center">
          <h2 className="text-white text-xl font-bold tracking-[0.2em] mb-8 uppercase text-center font-sans md:text-2xl">
            Communities We’ve Worked <br className="md:hidden" /> With & Partners
          </h2>
          <Carousel
            opts={{
              loop: true,
              align: "start",
              dragFree: true,
            }}
            plugins={[
              AutoScroll({
                speed: 1.5,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-8 flex items-center ">
              {[...partners, ...partners].map((partner, i) => (
                <CarouselItem
                  // biome-ignore lint/suspicious/noArrayIndexKey: Carousel needs duplicates for smooth infinite scroll
                  key={`${partner.id}-${i}`}
                  className="pl-4 md:pl-8 basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 flex justify-center items-center"
                >
                  <div className="group/logo relative flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer p-4">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={140}
                      height={60}
                      className="max-h-12 w-auto object-contain"
                      unoptimized
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
