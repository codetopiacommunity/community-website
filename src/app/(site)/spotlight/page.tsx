import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SpotlightLinks } from "@/components/spotlight/SpotlightLinks";
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
          {/* This page is the only place a spotlight appears now, so the
              current feature gets the full cover treatment here; the archive
              below it is a quieter grid. */}
          <section className="w-full pb-20">
            <Container className="px-4">
              <div className="group grid grid-cols-1 lg:grid-cols-5 lg:h-[680px] border border-zinc-800 bg-zinc-900 gap-px overflow-hidden">
                {/* Two of five columns, not half. At half the width this box
                    is landscape (768x560), so a portrait photograph fills the
                    width and spills hundreds of pixels past the top and
                    bottom -- the head being what goes first. A narrower,
                    taller box is close to the shape of the photo itself, so
                    the crop barely takes anything. */}
                <Link
                  href={`/spotlight/${spotlightHandle(current)}`}
                  className="relative aspect-[4/5] lg:aspect-auto lg:col-span-2 lg:h-full overflow-hidden bg-zinc-950 block"
                >
                  <Image
                    src={current.imageUrl}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    priority
                  />
                </Link>

                <div className="lg:col-span-3 flex flex-col justify-center gap-8 bg-black p-8 md:p-12">
                  <div className="flex flex-col gap-3">
                    {current.featured && (
                      <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                        Currently featured
                      </p>
                    )}
                    <Link
                      href={`/spotlight/${spotlightHandle(current)}`}
                      className="hover:text-zinc-400 transition-colors duration-200"
                    >
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] font-sans">
                        {current.name}
                      </h2>
                    </Link>
                    <p className="text-zinc-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-black">
                      {current.role}
                    </p>
                  </div>
                  <p className="text-zinc-400 text-lg font-mono leading-relaxed">
                    {current.contribution}
                  </p>
                  <SpotlightLinks
                    links={current.links}
                    name={current.name}
                    size="md"
                  />
                </div>
              </div>
            </Container>
          </section>

          {rest.length > 0 && (
            <section className="w-full pb-32">
              <Container className="px-4">
                <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-10">
                  Previously featured
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-800">
                  {/* The card is a div, not a link: the social icons are
                      links themselves, and an anchor inside an anchor is
                      invalid and breaks hydration. The photo and the name
                      carry the navigation instead. */}
                  {rest.map((spotlight) => (
                    <div
                      key={spotlight.id}
                      className="group flex flex-col bg-black hover:bg-zinc-900/40 transition-colors duration-300"
                    >
                      {/* Portrait, not landscape: these are photographs of
                          people, and a 4:3 box crops the head off one shot in
                          two. `object-top` keeps the face when the crop still
                          has to take something. */}
                      <Link
                        href={`/spotlight/${spotlightHandle(spotlight)}`}
                        className="relative aspect-[4/5] overflow-hidden bg-zinc-950 block"
                      >
                        <Image
                          src={spotlight.imageUrl}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 motion-reduce:transition-none"
                        />
                      </Link>
                      <div className="flex flex-col gap-3 p-6">
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/spotlight/${spotlightHandle(spotlight)}`}
                            className="text-2xl font-black uppercase tracking-tighter font-sans hover:text-zinc-400 transition-colors duration-200"
                          >
                            <h3>{spotlight.name}</h3>
                          </Link>
                          <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.3em]">
                            {spotlight.role}
                          </p>
                        </div>
                        <SpotlightLinks
                          links={spotlight.links}
                          name={spotlight.name}
                        />
                      </div>
                    </div>
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
