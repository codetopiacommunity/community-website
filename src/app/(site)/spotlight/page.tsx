import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SpotlightCard } from "@/components/spotlight/SpotlightCard";
import { getSpotlights, spotlightHandle } from "@/lib/spotlight";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Spotlight · Codetopia Community",
  description:
    "The people doing remarkable work that not enough people know about.",
};

export default async function SpotlightArchivePage() {
  const spotlights = await getSpotlights();
  const [current, ...rest] = spotlights;

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      <section className="w-full pt-32 pb-16 bg-black">
        <Container className="px-4">
          <div className="flex flex-col gap-6 px-2">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none font-sans">
              Spot<span className="text-zinc-400">light</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed max-w-2xl">
              The people doing remarkable work that not enough people know
              about. One at a time, and everyone we feature stays here.
            </p>
          </div>
        </Container>
      </section>

      {spotlights.length === 0 ? (
        <section className="w-full pb-32">
          <Container className="px-4">
            <p className="text-zinc-500 font-mono text-base px-2">
              No spotlights yet. Check back soon.
            </p>
          </Container>
        </section>
      ) : (
        <>
          <section className="w-full pb-20">
            <Container className="px-4">
              <SpotlightCard spotlight={current} size="lg" priority />
              <div className="mt-8 flex flex-col gap-5 max-w-3xl">
                {/* The card carries the face and the name; this is the only
                    place on the page that says what the person actually did,
                    and it is the reason to click through. */}
                <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed">
                  {current.contribution}
                </p>

                <Link
                  href={`/spotlight/${spotlightHandle(current)}`}
                  className="group/read self-start inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white border-b border-zinc-700 hover:border-white pb-1 transition-colors duration-200"
                >
                  Read the feature
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/read:translate-x-1 motion-reduce:transition-none" />
                </Link>
              </div>
            </Container>
          </section>

          {rest.length > 0 && (
            <section className="w-full pb-32">
              <Container className="px-4">
                <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-10">
                  Previously featured
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {rest.map((spotlight) => (
                    <SpotlightCard key={spotlight.id} spotlight={spotlight} />
                  ))}
                </div>
              </Container>
            </section>
          )}
        </>
      )}
    </div>
  );
}
