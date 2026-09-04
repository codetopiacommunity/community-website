import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SpotlightLinks } from "@/components/spotlight/SpotlightLinks";
import {
  getOtherSpotlights,
  getSpotlightByHandle,
  SHARE_IMAGE_HEIGHT,
  SHARE_IMAGE_WIDTH,
  shareImageUrl,
  spotlightHandle,
} from "@/lib/spotlight";

export const revalidate = 60;

// Same source and fallback as the mentorship detail page, so both produce
// consistent absolute URLs in their share cards.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://codetopia.community";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spotlight = await getSpotlightByHandle(slug);
  if (!spotlight) return { title: "Spotlight · Codetopia Community" };

  const title = `${spotlight.name} · Codetopia Community Spotlight`;
  const url = `${SITE_URL}/spotlight/${spotlightHandle(spotlight)}`;
  const image = {
    url: shareImageUrl(spotlight.imageUrl),
    width: SHARE_IMAGE_WIDTH,
    height: SHARE_IMAGE_HEIGHT,
    alt: `${spotlight.name}, ${spotlight.role}`,
  };

  return {
    title,
    description: spotlight.contribution,
    alternates: { canonical: url },
    // A feature is worth little if the person cannot share it, so the card
    // carries their portrait and story rather than the site defaults.
    openGraph: {
      title,
      description: spotlight.contribution,
      url,
      siteName: "Codetopia Community",
      images: [image],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: spotlight.contribution,
      images: [image],
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

  // First name where there is one, otherwise the whole name: a mononym or a
  // team name should not be truncated by a naive split.
  const firstName = spotlight.name.trim().split(/\s+/)[0] || spotlight.name;

  const paragraphs = (spotlight.body ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      <section className="w-full pt-32 pb-16">
        <Container className="px-4">
          <Link
            href="/spotlight"
            className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors duration-200 mb-14"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
            Spotlight archive
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 border border-zinc-800 bg-zinc-900 gap-px overflow-hidden">
            {/* Two of five columns: a half-width box is landscape, which
                crops the head off a portrait. See the archive page. */}
            <div className="relative aspect-[4/5] lg:aspect-auto lg:col-span-2 lg:h-auto lg:min-h-[680px] overflow-hidden bg-zinc-950">
              <Image
                src={spotlight.imageUrl}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-3 flex flex-col justify-center gap-10 bg-black p-8 md:p-12 lg:p-16">
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

              <SpotlightLinks
                links={spotlight.links}
                name={spotlight.name}
                size="md"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* The feature itself. Without this the page is the card at a larger
          size, which gives a reader no reason to have clicked. Split on blank
          lines so paragraphing survives a plain textarea -- the copy is
          written by hand, not authored in a rich editor. */}
      {paragraphs.length > 0 && (
        <section className="w-full pb-24">
          <Container className="px-4">
            <div className="flex flex-col gap-6 max-w-3xl text-zinc-300 text-lg md:text-xl font-mono leading-relaxed">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 60)}>{paragraph}</p>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Addressed to the person, not to the reader. The premise of this
          section is work that has not had the attention it deserves, so the
          page should say the thing that usually goes unsaid. */}
      <section className="w-full pb-24">
        <Container className="px-4">
          <div className="max-w-3xl flex flex-col gap-6">
            <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight font-sans">
              Thank you, {firstName}.
            </p>
            <p className="text-zinc-400 text-lg font-mono leading-relaxed">
              The tech space is a better one because of people like you, doing
              the work long before anyone thinks to say thank you. We noticed,
              and we are grateful. Someone starting out today will get further
              because you did.
            </p>
            {/* A signature, so it sits quietly under the note rather than
                competing with it. */}
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">
              Codetopia Community
            </p>
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
              {/* A div, not a link: the social icons inside are anchors, and
                  nesting anchors is invalid. Photo and name navigate. */}
              {others.map((other) => (
                <div
                  key={other.id}
                  className="group flex flex-col bg-black hover:bg-zinc-900/40 transition-colors duration-300"
                >
                  <Link
                    href={`/spotlight/${spotlightHandle(other)}`}
                    className="relative aspect-[4/5] overflow-hidden bg-zinc-950 block"
                  >
                    <Image
                      src={other.imageUrl}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 motion-reduce:transition-none"
                    />
                  </Link>
                  <div className="flex flex-col gap-3 p-6">
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/spotlight/${spotlightHandle(other)}`}
                        className="text-2xl font-black uppercase tracking-tighter font-sans hover:text-zinc-400 transition-colors duration-200"
                      >
                        <h2>{other.name}</h2>
                      </Link>
                      <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.3em]">
                        {other.role}
                      </p>
                    </div>
                    <SpotlightLinks links={other.links} name={other.name} />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
