import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SpotlightLinks } from "@/components/spotlight/SpotlightLinks";
import { getSpotlightByHandle, spotlightHandle } from "@/lib/spotlight";

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
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: spotlight.contribution,
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

          {/* Two columns: who they are on the left, what they did on the
              right. The left rail sticks while the feature scrolls, so the
              face and the socials stay with you through a long read. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950 border border-zinc-900">
                <Image
                  src={spotlight.imageUrl}
                  alt={`${spotlight.name}, ${spotlight.role}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-top"
                  priority
                />
              </div>

              <div className="flex flex-col gap-3">
                {/* Names the page for anyone arriving from a shared link. An
                    eyebrow rather than a heading: the person is the subject
                    here, and a masthead would push them down the page. */}
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                  Spotlight
                  {spotlight.featured && (
                    <span className="text-zinc-600"> · Currently featured</span>
                  )}
                </p>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] font-sans">
                  {spotlight.name}
                </h1>
                <p className="text-zinc-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
                  {spotlight.role}
                </p>
              </div>

              <SpotlightLinks
                links={spotlight.links}
                name={spotlight.name}
                size="md"
              />
            </aside>

            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* The teaser as a standfirst: larger and lighter than the body,
                  so the piece opens on the sentence that summarises it. */}
              <p className="text-white text-xl md:text-2xl font-mono leading-relaxed">
                {spotlight.contribution}
              </p>

              {/* The feature itself. Split on blank lines so paragraphing
                  survives a plain textarea: the copy is written by hand, not
                  authored in a rich editor. */}
              {paragraphs.length > 0 && (
                <div className="flex flex-col gap-6 text-zinc-400 text-lg font-mono leading-relaxed">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 60)}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

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

            {/* A button rather than a grid of other people: the note is the
                end of this page, and a shared feature should not close on
                somebody else's face. Same control as the home page uses, so
                it reads as the way onward rather than as more small print. */}
            <Link
              href="/spotlight"
              className="group self-start inline-flex items-center gap-2 mt-6 font-mono text-xs uppercase tracking-[0.25em] text-white border border-zinc-700 hover:border-white hover:bg-white hover:text-black px-6 py-3 transition-colors duration-200"
            >
              See everyone we have featured
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
