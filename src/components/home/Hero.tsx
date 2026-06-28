import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import heroBg from "@/assets/images/django-girls.jpg";
import { Container } from "@/components/layout/Container";

const WORDS = ["Grow.", "Collaborate.", "Lead.", "Build.", "Ship.", "Connect."];

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100svh-80px)] flex flex-col bg-black">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale opacity-55"
        style={{ backgroundImage: `url('${heroBg.src}')` }}
      />
      <div className="absolute inset-0 z-0 bg-black/50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, black 100%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-0 pt-16 pb-24">
        <Container className="flex flex-col gap-16">
          {/* Headline */}
          <div className="text-[13vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[7.5vw] font-black text-white tracking-tighter uppercase leading-[0.88] font-sans">
            <span>Where</span>
            <br />
            <span className="text-white/40">Builders</span>
            <br />
            {/*
              CSS grid stacking: all words occupy the same grid cell (1/1),
              so the container sizes to the widest word and they layer on top of
              each other. CSS animation with staggered delays cycles visibility.
              No JS needed — works identically on every device.
            */}
            <span style={{ display: "inline-grid" }}>
              {WORDS.map((word, i) => (
                <span
                  key={word}
                  style={{
                    gridArea: "1 / 1",
                    opacity: 0,
                    animation: "hero-word-cycle 12s ease-in-out infinite",
                    animationDelay: `${i * 2}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </span>
          </div>

          {/* Description + CTA */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <p className="text-zinc-400 text-base md:text-lg font-mono leading-relaxed max-w-md">
              A community where developers and technologists learn together,
              collaborate, and grow through structured mentorship and real-world
              engineering.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link
                href="/howtos/Getting-Started/01-join-the-communtiy"
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-xs font-sans transition-all duration-300 hover:bg-zinc-100 border border-white"
              >
                Join the Community
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
