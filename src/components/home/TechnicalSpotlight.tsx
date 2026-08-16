import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import type { Spotlight } from "@/types";

export function TechnicalSpotlight({
  spotlight,
}: {
  spotlight: Spotlight | null;
}) {
  if (!spotlight) return null;

  return (
    <section className="w-full py-24 md:py-32 bg-black flex flex-col border-t border-zinc-900 overflow-hidden">
      <Container className="w-full font-sans">
        <div className="w-full mb-14 flex flex-col gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
            In the spotlight
          </p>
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none font-sans">
            Spot<span className="text-zinc-400">light</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-mono max-w-2xl">
            The people moving technology and science forward. Sometimes one of
            our own, sometimes a name the whole industry knows.
          </p>
        </div>

        {/*
          A fixed row height rather than an aspect ratio: at half of a wide
          container a 4:5 portrait would be over 800px tall on its own, which
          is what made this section run to most of a page.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[760px] border border-zinc-800 bg-zinc-900 gap-px overflow-hidden group">
          <div className="relative h-96 sm:h-[32rem] lg:h-full overflow-hidden bg-zinc-950">
            <Image
              src={spotlight.imageUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              priority
            />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center gap-10 bg-black p-8 md:p-12 lg:p-16">
            <div className="flex flex-col gap-3">
              {/*
                An h3, not an h2: the section already has one, and the person's
                name is a level below the section that features them. Sized
                under the section heading for the same reason.
              */}
              <h3 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85] font-sans">
                {spotlight.name}
              </h3>
              <p className="text-zinc-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-black">
                {spotlight.role}
              </p>
            </div>

            <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed">
              {spotlight.contribution}
            </p>

            {spotlight.links.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-zinc-800 pt-6">
                {spotlight.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest hover:text-zinc-400 transition-colors duration-200"
                  >
                    {link.label}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
