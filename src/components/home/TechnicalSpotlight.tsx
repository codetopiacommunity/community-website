import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SpotlightLinks } from "@/components/spotlight/SpotlightLinks";
import type { Spotlight } from "@/types";

export function TechnicalSpotlight({
  spotlight,
}: {
  spotlight: Spotlight | null;
}) {
  if (!spotlight) return null;

  return (
    <section className="w-full py-20 md:py-24 bg-black flex flex-col border-t border-zinc-900 overflow-hidden">
      <Container className="w-full font-sans">
        <div className="w-full mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none font-sans">
              Spot<span className="text-zinc-400">light</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl font-mono max-w-2xl">
              The people doing remarkable work that not enough people know
              about.
            </p>
          </div>
          {/* Without this the archive is unreachable: only the current
              feature ever renders, so every past one is invisible. */}
          <Link
            href="/spotlight"
            className="self-start md:self-end inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white border border-zinc-700 hover:border-white hover:bg-white hover:text-black px-6 py-3 transition-colors duration-200 group/all shrink-0"
          >
            Spotlight archive{" "}
            <ArrowRight className="w-3 h-3 transition-transform group-hover/all:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </div>

        {/*
          A teaser, not the feature itself. This block used to be 760px tall
          because it was the only place a spotlight existed anywhere on the
          site; now that /spotlight/[slug] holds the full thing, its job here
          is to say who is featured and send you there.
        */}
        {/* Same card as the featured entry on /spotlight: two of five columns
            at 680px, which makes the image box roughly 614x680 and close to
            the shape of a portrait photograph. Image width is set by the
            column share, so a portrait box needs this height -- anything
            shorter goes landscape and crops the subject's head. */}
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:h-[680px] border border-zinc-800 bg-zinc-900 gap-px overflow-hidden group">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:col-span-2 lg:h-full overflow-hidden bg-zinc-950">
            <Image
              src={spotlight.imageUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="lg:col-span-3 flex flex-col justify-center gap-6 bg-black p-8 md:p-12">
            <div className="flex flex-col gap-2">
              {/*
                An h3, not an h2: the section already has one, and the person's
                name is a level below the section that features them.
              */}
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9] font-sans">
                {spotlight.name}
              </h3>
              <p className="text-zinc-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-black">
                {spotlight.role}
              </p>
            </div>

            {/* Clamped: the whole contribution belongs on the feature page. */}
            <p className="text-zinc-400 text-base md:text-lg font-mono leading-relaxed line-clamp-2">
              {spotlight.contribution}
            </p>

            <SpotlightLinks
              links={spotlight.links}
              name={spotlight.name}
              size="md"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
