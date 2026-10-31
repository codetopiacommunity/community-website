import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import logo from "@/assets/images/logos/codetopia-community.png";
import { Container } from "@/components/layout/Container";
import { SpotlightLinks } from "@/components/spotlight/SpotlightLinks";
import { SpotlightShare } from "@/components/spotlight/SpotlightShare";
import { getSpotlightByHandle, spotlightHandle } from "@/lib/spotlight";

export const revalidate = 60;

/**
 * Size for the faint name behind the page: up to 16vw or 260px, smaller for
 * long names so it always fits the width. Space Grotesk's capitals average
 * about 0.62em wide; 92vw leaves room for the page margins.
 */
function nameFontSize(name: string) {
  const fit = 92 / (Math.max(name.length, 1) * 0.62);
  return `min(16vw, 260px, ${fit.toFixed(2)}vw)`;
}

// Used to build absolute URLs for the share card.
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

  const url = `${SITE_URL}/spotlight/${spotlightHandle(spotlight)}`;
  const featuredOn = new Date(spotlight.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    // overflow-x-clip rather than overflow-hidden: it trims the oversized
    // name without becoming a scroll container, which would stop the photo
    // from sticking beside the story.
    <div className="relative flex-1 bg-black text-white min-h-screen overflow-x-clip">
      {/* Their name, huge and faint, across the top of the page, the same
          touch as the portal profile. Its lower half fades out under the
          start of the page, so it never sits under the story, and it is
          hidden from screen readers since the heading already says it. */}
      <p
        aria-hidden
        className="pointer-events-none select-none pt-6 sm:pt-8 -mb-[0.3em] px-4 text-center uppercase tracking-tighter font-bold font-sans leading-[0.85] whitespace-nowrap text-white/[0.06] [mask-image:linear-gradient(to_bottom,black_35%,transparent_90%)]"
        style={{ fontSize: nameFontSize(spotlight.name) }}
      >
        {spotlight.name}
      </p>
      {/* The person first. The home page crops the photo to a close-up to
          draw you in; here is where you meet them, so the photo is shown
          whole, with who they are and their story beside it. */}
      <section className="relative w-full pb-16 sm:pb-24">
        <Container className="px-4">
          <Link
            href="/spotlight"
            className="uppercase tracking-widest group inline-flex items-center gap-2 text-zinc-400 hover:text-white font-sans text-xs transition-colors duration-200 mb-8 sm:mb-10"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
            Spotlight archive
          </Link>

          {/* The photo whole, at its own shape, held beside the story while
              you read it. In one column it leads at full width, and the
              story follows. */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
            <div className="w-full md:col-span-5 md:sticky md:top-28 md:self-start">
              <Image
                src={spotlight.imageUrl}
                alt={`${spotlight.name}, ${spotlight.role}`}
                width={1200}
                height={1500}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="w-full h-auto md:max-h-[calc(100vh-9rem)] object-contain object-left-top"
                priority
              />
            </div>

            <article className="md:col-span-7 md:max-w-[65ch] flex flex-col gap-8">
              <header className="flex flex-col gap-5">
                <p className="uppercase tracking-widest text-zinc-400 font-sans text-xs">
                  Spotlight · {featuredOn}
                  {spotlight.featured && (
                    <span className="text-white"> · Currently featured</span>
                  )}
                </p>
                <h1 className="uppercase tracking-tighter font-bold leading-[0.9] font-sans break-words text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  {spotlight.name}
                </h1>
                <p className="uppercase tracking-widest text-zinc-300 font-sans text-xs md:text-sm break-words">
                  {spotlight.role}
                </p>
                <SpotlightLinks
                  links={spotlight.links}
                  name={spotlight.name}
                  size="md"
                />
              </header>

              {/* The teaser as a standfirst: larger and brighter than the
                  body, so the piece opens on the sentence that sums it up. */}
              <p className="border-t border-zinc-900 pt-8 text-white text-xl sm:text-2xl font-mono leading-relaxed break-words">
                {spotlight.contribution}
              </p>

              {/* Split on blank lines so paragraphing survives a plain
                  textarea: the copy is written by hand, not in a rich editor. */}
              {paragraphs.length > 0 && (
                <div className="flex flex-col gap-6 text-zinc-300 text-base sm:text-lg font-mono leading-relaxed break-words">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 60)}>{paragraph}</p>
                  ))}
                </div>
              )}

              <div className="border-t border-zinc-900 pt-6">
                <SpotlightShare url={url} name={spotlight.name} />
              </div>

              {/* Addressed to the person, not to the reader. The premise of
                  this section is work that has not had the attention it
                  deserves, so the page says the thing that usually goes
                  unsaid. */}
              <div className="mt-8 flex flex-col gap-5 sm:gap-6">
                <p className="uppercase tracking-tighter text-3xl sm:text-4xl font-bold leading-tight font-sans break-words">
                  Thank you, {firstName}.
                </p>
                <p className="text-zinc-400 text-base sm:text-lg font-mono leading-relaxed">
                  The tech space is a better one because of people like you,
                  doing the work long before anyone thinks to say thank you. We
                  noticed, and we are grateful. Someone starting out today will
                  get further because you did.
                </p>
                <Image
                  src={logo}
                  alt="Codetopia Community"
                  unoptimized
                  className="h-7 w-auto self-start opacity-90"
                />

                {/* A button rather than a grid of other people: the note is
                    the end of this page, and a shared feature should not
                    close on somebody else's face. */}
                <Link
                  href="/spotlight"
                  className="uppercase tracking-widest group w-full sm:w-auto self-stretch sm:self-start inline-flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-6 font-sans font-bold text-xs text-white border border-zinc-600 hover:border-white hover:bg-white hover:text-black px-8 py-4 text-center transition-colors duration-200"
                >
                  See everyone we have featured
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </div>
  );
}
