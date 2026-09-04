import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SpotlightCard } from "@/components/spotlight/SpotlightCard";
import { spotlightHandle } from "@/lib/spotlight";
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

        {/* Full width: it is the feature, and a spotlight that sits in a
            quarter of the page is not one. */}
        <SpotlightCard spotlight={spotlight} size="lg" />

        <div className="mt-8 flex flex-col gap-5 max-w-3xl">
          <Link
            href={`/spotlight/${spotlightHandle(spotlight)}`}
            className="group/read self-start inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white border-b border-zinc-700 hover:border-white pb-1 transition-colors duration-200"
          >
            Read the feature
            <ArrowRight className="w-4 h-4 transition-transform group-hover/read:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
