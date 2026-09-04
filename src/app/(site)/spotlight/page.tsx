import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getSpotlights, spotlightHandle } from "@/lib/spotlight";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Spotlight — Codetopia Community",
  description:
    "The people moving technology and science forward. Sometimes one of our own, sometimes a name the whole industry knows.",
};

export default async function SpotlightArchivePage() {
  const spotlights = await getSpotlights();
  const [current, ...rest] = spotlights;

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      <section className="w-full pt-32 pb-16 bg-black">
        <Container className="px-4">
          <div className="flex flex-col gap-6 px-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
              In the spotlight
            </p>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none font-sans">
              Spot<span className="text-zinc-400">light</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed max-w-2xl">
              The people moving technology and science forward. Sometimes one of
              our own, sometimes a name the whole industry knows. Everyone we
              have featured stays here.
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
          {/* The current feature keeps the cover treatment it gets on the
              home page; the archive below is a quieter grid. */}
          <section className="w-full pb-20">
            <Container className="px-4">
              <Link
                href={`/spotlight/${spotlightHandle(current)}`}
                className="group grid grid-cols-1 lg:grid-cols-2 lg:h-[560px] border border-zinc-800 bg-zinc-900 gap-px overflow-hidden"
              >
                <div className="relative h-80 sm:h-[26rem] lg:h-full overflow-hidden bg-zinc-950">
                  <Image
                    src={current.imageUrl}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    priority
                  />
                </div>

                <div className="flex flex-col justify-center gap-8 bg-black p-8 md:p-12">
                  <div className="flex flex-col gap-3">
                    {current.featured && (
                      <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                        Currently featured
                      </p>
                    )}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] font-sans">
                      {current.name}
                    </h2>
                    <p className="text-zinc-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-black">
                      {current.role}
                    </p>
                  </div>
                  <p className="text-zinc-400 text-lg font-mono leading-relaxed">
                    {current.contribution}
                  </p>
                </div>
              </Link>
            </Container>
          </section>

          {rest.length > 0 && (
            <section className="w-full pb-32">
              <Container className="px-4">
                <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-10">
                  Previously featured
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-800">
                  {rest.map((spotlight) => (
                    <Link
                      key={spotlight.id}
                      href={`/spotlight/${spotlightHandle(spotlight)}`}
                      className="group flex flex-col bg-black hover:bg-zinc-900/40 transition-colors duration-300"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                        <Image
                          src={spotlight.imageUrl}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 motion-reduce:transition-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2 p-6">
                        <h3 className="text-2xl font-black uppercase tracking-tighter font-sans">
                          {spotlight.name}
                        </h3>
                        <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.3em]">
                          {spotlight.role}
                        </p>
                      </div>
                    </Link>
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
