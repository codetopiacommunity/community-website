import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { HOWTO_MDX_COMPONENTS } from "@/components/howtos/mdxComponents";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  getAllHowtos,
  getHowtosIntro,
  type HowtoSummary,
  howtoHref,
} from "@/lib/howtos";
import { HowtosClient } from "./HowtosClient";

export const revalidate = 60;

export default async function HowtosPage() {
  let howtos: HowtoSummary[] = [];
  let intro = "";

  try {
    [howtos, intro] = await Promise.all([getAllHowtos(), getHowtosIntro()]);
  } catch {
    // silently fall through to empty state
  }

  const byCategory = howtos.reduce<Record<string, HowtoSummary[]>>((acc, h) => {
    if (!acc[h.category]) acc[h.category] = [];
    acc[h.category].push(h);
    return acc;
  }, {});

  const categories = Object.keys(byCategory);

  return (
    <div className="flex-1 bg-background text-foreground min-h-screen">
      {/* Hero */}
      <section className="w-full pt-32 pb-24 md:pt-40 md:pb-32 border-b border-border">
        <Container className="px-4">
          <div className="flex items-start justify-between gap-6 mb-10">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
              Knowledge Base
            </span>
            <ThemeToggle />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-sans mb-10">
            How-Tos
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-mono leading-relaxed max-w-2xl">
            Step-by-step guides to join Codetopia Community, find your way
            around and help out. Written for complete beginners.
          </p>
        </Container>
      </section>

      {/* README intro */}
      {intro && (
        <section className="border-b border-border">
          <Container className="px-4 py-16">
            <article
              className="prose dark:prose-invert max-w-4xl
              prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-sans
              prose-h1:text-3xl prose-h1:md:text-4xl
              prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-p:font-mono prose-p:leading-relaxed
              prose-li:font-mono
              prose-strong:font-black
              prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:not-italic prose-blockquote:font-mono
              prose-hr:border-border prose-hr:my-10
              prose-a:text-foreground prose-a:font-semibold hover:prose-a:underline
              prose-code:font-mono prose-img:rounded-none"
            >
              <MDXRemote
                source={intro}
                components={{
                  ...HOWTO_MDX_COMPONENTS,
                  h1: (props) => <h2 {...props} />,
                  h2: (props) => <h3 {...props} />,
                  h3: (props) => <h4 {...props} />,
                }}
              />
            </article>
          </Container>
        </section>
      )}

      <HowtosClient howtos={howtos} categories={categories} />

      <HelpStrip howtos={howtos} />
    </div>
  );
}

/** "Stuck?" links at the foot of the page. Guides are linked only if they exist. */
function HelpStrip({ howtos }: { howtos: HowtoSummary[] }) {
  const find = (slug: string) => howtos.find((h) => h.slug === slug);
  const links = [find("faq"), find("staying-safe")].filter(
    (h): h is HowtoSummary => Boolean(h),
  );
  return (
    <section className="border-t border-border">
      <Container className="px-4 py-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
          Stuck?
        </p>
        <p className="font-sans font-black uppercase tracking-tighter text-2xl md:text-3xl mb-6">
          Ask in #ask-for-help on Discord.
        </p>
        <p className="font-mono text-sm text-muted-foreground max-w-2xl mb-8">
          Say what you were trying to do and what you saw instead. Nobody will
          think less of you.
        </p>
        {links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {links.map((h) => (
              <Link
                key={h.slug}
                href={howtoHref(h)}
                className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:border-foreground"
              >
                {h.meta.title ?? h.slug}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
