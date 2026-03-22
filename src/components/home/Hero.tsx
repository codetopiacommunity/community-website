"use client";

import { MoveRight } from "lucide-react";
import Link from "next/link";
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
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center text-center pt-20 pb-24">
        <Container className="flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase max-w-4xl lg:max-w-6xl xl:max-w-7xl leading-[0.95] font-sans">
            WHERE BUILDERS <br className="hidden md:block" />{" "}
            <span className="text-zinc-500">GROW, COLLABORATE,</span>{" "}
            <br className="hidden md:block" /> AND LEAD
          </h1>
          <p className="mt-8 text-lg md:text-xl xl:text-2xl text-zinc-400 max-w-3xl font-mono leading-relaxed px-4">
            A community where developers and technologists learn together,
            collaborate, and grow.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-8 md:gap-6 w-full sm:w-auto">
            <CtaButton
              asChild
              className="bg-white text-black hover:bg-zinc-200"
              offsetClassName="border-white"
            >
              <a
                href="https://discord.gg/3nBFMfdNmB"
                target="_blank"
                rel="noreferrer"
              >
                JOIN OUR COMMUNITY
              </a>
            </CtaButton>
            <CtaButton
              asChild
              className="bg-transparent border-white text-white hover:bg-white/10 border"
              offsetClassName="border-white mix-blend-overlay"
            >
              <Link href="/about">
                LEARN MORE{" "}
                <MoveRight className="ml-2 w-5 h-5" strokeWidth={2.5} />
              </Link>
            </CtaButton>
          </div>
        </Container>
      </div>
    </section>
  );
}
