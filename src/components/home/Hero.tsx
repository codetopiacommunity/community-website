"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import heroBg from "@/assets/images/django-girls.jpg";
import { Container } from "@/components/layout/Container";

const WORDS = ["Grow.", "Collaborate.", "Lead.", "Build.", "Ship.", "Connect."];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col bg-black overflow-hidden">
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
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[13vw] md:text-[10vw] lg:text-[8.5vw] xl:text-[7.5vw] font-black text-white tracking-tighter uppercase leading-[0.88] font-sans"
            >
              <span>Where</span>
              <br />
              <span className="text-white/40">Builders</span>
              <br />
              <span
                className="inline-block overflow-hidden"
                style={{ minHeight: "1.1em" }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={WORDS[index]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {WORDS[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>
          </div>

          {/* Description + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-10"
          >
            <p className="text-zinc-400 text-base md:text-lg font-mono leading-relaxed max-w-md">
              A community where developers and technologists learn together,
              collaborate, and grow through structured mentorship and real-world
              engineering.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <a
                href="https://discord.gg/nPmRWdTQAK"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-xs font-sans transition-all duration-300 hover:bg-zinc-100 border border-white"
              >
                Join Our Community
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300 font-mono text-xs uppercase tracking-[0.25em] group"
              >
                Our Story
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
