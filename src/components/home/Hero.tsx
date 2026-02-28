"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { MoveRight } from "lucide-react";
import heroBg from "@/assets/images/django-girls.jpg";
import { Container } from "@/components/layout/Container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CtaButton } from "@/components/ui/cta-button";

function LogoIpsum() {
  return (
    <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer">
      <svg
        width="44"
        height="44"
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
      <span className="font-medium text-2xl tracking-tight">logoipsum</span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${heroBg.src}')` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
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
            <CtaButton>JOIN OUR COMMUNITY</CtaButton>
            <CtaButton
              className="border-white text-white hover:bg-white/10 !bg-transparent border-2 border-solid !px-10"
              offsetClassName="border-white translate-x-[5px] translate-y-[5px] !bg-transparent border-2 border-solid"
            >
              LEARN MORE{" "}
              <MoveRight className="ml-2 w-5 h-5" strokeWidth={2.5} />
            </CtaButton>
          </div>
        </Container>
      </div>

      {/* Sponsors/Logos Strip at the bottom - Now in normal flow */}
      <div className="relative z-10 w-full pt-9 pb-12 bg-gradient-to-t from-black/90 to-transparent mt-auto">
        <div className="w-full overflow-hidden flex flex-col items-center">
          <h2 className="text-white text-xl font-bold tracking-[0.2em] mb-8 uppercase text-center font-sans md:text-2xl">
            Our Partners <br className="md:hidden" /> & Collaborators
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
            <CarouselContent className="-ml-4 md:-ml-8 flex gap-10">
              {Array.from({ length: 12 }).map((_, i) => {
                return (
                  <CarouselItem
                    // biome-ignore lint/suspicious/noArrayIndexKey: This is a static repeating array of the same logo
                    key={i}
                    className="pl-4 md:pl-8 basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-[12%] flex justify-center"
                  >
                    <div className="opacity-80 hover:opacity-100 transition-opacity">
                      <LogoIpsum />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
