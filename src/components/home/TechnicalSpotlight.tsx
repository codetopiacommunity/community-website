import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SpotlightFeature } from "@/components/spotlight/SpotlightCard";
import type { Spotlight } from "@/types";

export function TechnicalSpotlight({
  spotlight,
}: {
  spotlight: Spotlight | null;
}) {
  if (!spotlight) return null;

  return (
    <section className="w-full py-20 md:py-24 bg-black flex flex-col overflow-hidden">
      <Container className="w-full font-sans">
        <div className="w-full mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="uppercase tracking-tighter text-5xl md:text-8xl font-bold text-white leading-none font-sans">
              Spotlight
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
            className="self-start md:self-end inline-flex items-center gap-3 font-sans font-bold text-xs uppercase tracking-widest text-white border border-zinc-600 hover:border-white hover:bg-white hover:text-black px-8 py-4 transition-colors duration-200 group/all shrink-0"
          >
            Spotlight archive{" "}
            <ArrowRight className="w-3 h-3 transition-transform group-hover/all:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </div>

        <SpotlightFeature spotlight={spotlight} />
      </Container>
    </section>
  );
}
