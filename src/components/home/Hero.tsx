"use client";

import { MoveRight } from "lucide-react";
import heroBg from "@/assets/images/django-girls.jpg";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/ui/cta-button";

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
    </section>
  );
}
