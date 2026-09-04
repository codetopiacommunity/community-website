import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import {
  getOtherSpotlights,
  getSpotlightByHandle,
  spotlightHandle,
} from "@/lib/spotlight";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spotlight = await getSpotlightByHandle(slug);
  if (!spotlight) return { title: "Spotlight — Codetopia Community" };

  return {
    title: `${spotlight.name} — Codetopia Community Spotlight`,
    description: spotlight.contribution,
    // A feature is worth little if the person cannot share it, so the card
    // carries their portrait and story rather than the site defaults.
    openGraph: {
      title: `${spotlight.name} — Codetopia Community Spotlight`,
      description: spotlight.contribution,
      images: [{ url: spotlight.imageUrl }],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${spotlight.name} — Codetopia Community Spotlight`,
      description: spotlight.contribution,
      images: [spotlight.imageUrl],
    },
  };
}

export default async function SpotlightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const spotlight = await getSpotlightByHandle(slug);
  if (!spotlight) notFound();

  const others = await getOtherSpotlights(spotlight.id);

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      <section className="w-full pt-32 pb-16">
        <Container className="px-4">
          <Link
            href="/spotlight"
            className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors duration-200 mb-14"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
            All spotlights
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 border border-zinc-800 bg-zinc-900 gap-px overflow-hidden">
            <div className="relative h-96 sm:h-[32rem] lg:h-auto lg:min-h-[620px] overflow-hidden bg-zinc-950">
              <Image
                src={spotlight.imageUrl}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col justify-center gap-10 bg-black p-8 md:p-12 lg:p-16">
              <div className="flex flex-col gap-3">
                {spotlight.featured && (
                  <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                    Currently featured
                  </p>
                )}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] font-sans">
                  {spotlight.name}
                </h1>
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

      {others.length > 0 && (
        <section className="w-full pb-32">
          <Container className="px-4">
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-10">
              More spotlights
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-900 border border-zinc-800">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/spotlight/${spotlightHandle(other)}`}
                  className="group flex flex-col bg-black hover:bg-zinc-900/40 transition-colors duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                    <Image
                      src={other.imageUrl}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 motion-reduce:transition-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-6">
                    <h2 className="text-2xl font-black uppercase tracking-tighter font-sans">
                      {other.name}
                    </h2>
                    <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.3em]">
                      {other.role}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
