import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { HowtoRow } from "@/components/howtos/HowtoRow";
import {
  IndexCard,
  IndexCards,
  IndexStep,
  IndexSteps,
} from "@/components/howtos/IndexMdx";
import { HOWTO_MDX_COMPONENTS } from "@/components/howtos/mdxComponents";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  getAllHowtos,
  getCategoryInfo,
  getHowtosIntro,
  type HowtoCategory,
  type HowtoSummary,
  howtoHref,
  splitReadme,
} from "@/lib/howtos";
import { GuideSearch } from "./GuideSearch";

export const revalidate = 60;

const FIX_A_MISTAKE =
  "https://github.com/codetopiacommunity/community-howtos/blob/main/CONTRIBUTING.md";

/** "Together they take about 25 minutes" in the README -> "25". */
function minutesToJoin(readme: string): string | null {
  return readme.match(/about (\d+) minutes/)?.[1] ?? null;
}

export default async function HowtosPage() {
  let howtos: HowtoSummary[] = [];
  let readme = "";
  let categories: HowtoCategory[] = [];

  try {
    [howtos, readme, categories] = await Promise.all([
      getAllHowtos(),
      getHowtosIntro(),
      getCategoryInfo(),
    ]);
  } catch {
    // silently fall through to empty state
  }

  const { intro, creditedTo } = splitReadme(readme);

  // Each category with its guides, in page order. Empty folders are left out.
  const sections = categories
    .map((c) => ({ ...c, guides: howtos.filter((h) => h.category === c.name) }))
    .filter((c) => c.guides.length > 0);
  const titleOf = (name: string) =>
    categories.find((c) => c.name === name)?.title ?? name.replace(/-/g, " ");

  const guides = howtos.map((h) => ({
    title: h.meta.title ?? h.slug,
    description: h.meta.description,
    href: howtoHref(h),
    category: titleOf(h.category),
  }));

  const joinMinutes = minutesToJoin(intro);

  return (
    <div className="flex-1 bg-background text-foreground min-h-screen">
      {/* Header */}
      <section className="w-full">
        <Container className="px-4 pt-10 pb-4 md:pt-12">
          <div className="flex items-center justify-between gap-6 mb-12 md:mb-16">
            <span className="font-mono text-sm text-muted-foreground">
              How-Tos
            </span>
            <ThemeToggle />
          </div>
          <div className="max-w-3xl">
            <h1 className="font-sans text-4xl font-bold leading-tight tracking-tight md:text-6xl mb-5">
              New here? Start here.
            </h1>
            <p className="font-mono text-base leading-relaxed text-foreground/75 md:text-lg mb-8">
              Step-by-step guides for joining Codetopia Community and finding
              your way around, written for beginners.
            </p>
            {howtos[0] && (
              <Link
                href={howtoHref(howtos[0])}
                className="uppercase tracking-widest group inline-flex items-center gap-3 border border-foreground bg-foreground px-8 py-4 font-sans text-xs font-bold text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground"
              >
                Start step 1
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            )}
            <p className="mt-6 font-mono text-sm text-muted-foreground">
              {howtos.length} guides
              {joinMinutes && <> · {joinMinutes} minutes to join</>} · Free
              {creditedTo && (
                <>
                  {" · "}
                  <Link
                    href="/howtos/about"
                    className="underline underline-offset-4 transition-colors hover:text-foreground"
                  >
                    Who wrote these
                  </Link>
                </>
              )}
            </p>
          </div>
        </Container>
      </section>

      {/* README intro: the joining steps and what to do next */}
      {intro && (
        <section id="start-here" className="scroll-mt-20">
          <Container className="px-4 pt-8 pb-16 md:pb-24">
            <article
              className="prose dark:prose-invert max-w-3xl
              prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight
              prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-20 prose-h3:mb-3
              prose-p:font-mono prose-p:text-[17px] prose-p:leading-relaxed prose-p:text-foreground/80
              prose-strong:font-bold prose-strong:text-foreground
              prose-a:text-foreground prose-a:font-semibold prose-a:underline-offset-4
              [&>h3:first-of-type]:mt-16"
            >
              <MDXRemote
                source={intro}
                components={{
                  ...HOWTO_MDX_COMPONENTS,
                  Steps: IndexSteps,
                  Step: IndexStep,
                  Cards: IndexCards,
                  Card: IndexCard,
                  // The header already says what this page is.
                  h1: () => null,
                  h2: (props) => <h3 {...props} />,
                  h3: (props) => <h4 {...props} />,
                }}
              />
            </article>
          </Container>
        </section>
      )}

      {/* Every guide, grouped and in the order we suggest reading them */}
      <section id="all-guides" className="scroll-mt-20">
        <Container className="px-4 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <h2 className="font-sans text-2xl font-bold tracking-tight md:text-3xl mb-3">
              All guides
            </h2>
            <p className="font-mono text-[17px] leading-relaxed text-foreground/80 mb-6">
              {howtos.length} guides, in the order we suggest reading them.
            </p>
            <GuideSearch guides={guides} />
            <div className="mt-14 flex flex-col gap-16">
              {sections.map((section) => (
                <div
                  key={section.name}
                  id={section.name.toLowerCase()}
                  className="scroll-mt-20"
                >
                  <h3 className="font-sans text-xl font-bold tracking-tight mb-1">
                    {section.title}
                  </h3>
                  {section.description && (
                    <p className="font-mono text-[15px] text-foreground/70">
                      {section.description}
                    </p>
                  )}
                  <ul className="mt-8 grid list-none gap-x-14 gap-y-8 p-0 sm:grid-cols-2">
                    {section.guides.map((howto) => (
                      <HowtoRow
                        key={`${howto.category}/${howto.slug}`}
                        howto={howto}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <HelpStrip howtos={howtos} />
    </div>
  );
}

/** A quiet "stuck?" line at the foot of the page. Guides are linked only if they exist. */
function HelpStrip({ howtos }: { howtos: HowtoSummary[] }) {
  const find = (slug: string) => howtos.find((h) => h.slug === slug);
  const faq = find("faq");
  const safe = find("staying-safe");
  const link =
    "underline decoration-border underline-offset-4 transition-colors duration-200 hover:decoration-foreground text-foreground";
  return (
    <section>
      <Container className="px-4 pb-20">
        <div className="grid max-w-3xl gap-8 md:grid-cols-2">
          <p className="font-mono text-sm leading-relaxed text-muted-foreground max-w-xl">
            <span className="block font-sans font-bold text-foreground mb-1">
              Stuck?
            </span>
            Ask in #ask-for-help on Discord, and say what you were trying to do
            and what you saw instead. Nobody will think less of you.
            {faq && (
              <>
                {" "}
                The{" "}
                <Link href={howtoHref(faq)} className={link}>
                  FAQ
                </Link>{" "}
                answers the common questions
                {safe ? "," : "."}
              </>
            )}
            {safe && (
              <>
                {faq ? " and " : " "}
                <Link href={howtoHref(safe)} className={link}>
                  Staying safe
                </Link>{" "}
                covers what to do if someone makes you uncomfortable.
              </>
            )}
          </p>
          <p className="font-mono text-sm leading-relaxed text-muted-foreground max-w-xl">
            <span className="block font-sans font-bold text-foreground mb-1">
              Spotted a mistake?
            </span>
            If a guide is wrong or out of date,{" "}
            <a
              href={FIX_A_MISTAKE}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              here is how to fix it
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
