import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { getAllHowtos, getHowtosIntro, type HowtoSummary } from "@/lib/howtos";

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

  return (
    <div className="flex-1 bg-background text-foreground min-h-screen">
      {/* Hero */}
      <section className="w-full pt-32 pb-16 bg-background">
        <Container className="px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 px-2">
            <div className="flex-1">
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
                HOW-TOS
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl font-mono leading-relaxed max-w-2xl">
                Practical guides and walkthroughs from the Codetopia community.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </Container>
      </section>

      {/* Intro from README */}
      {intro && (
        <section className="border-t border-border">
          <Container className="px-4 py-16">
            <article
              className="prose dark:prose-invert max-w-4xl mx-auto px-2
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
                  h1: (props) => <h2 {...props} />,
                  h2: (props) => <h3 {...props} />,
                  h3: (props) => <h4 {...props} />,
                }}
              />
            </article>
          </Container>
        </section>
      )}

      {/* Guides grid */}
      {howtos.length === 0 ? (
        <section className="py-16 border-t border-border pb-32">
          <Container className="px-4">
            <div className="flex flex-col items-center justify-center py-32 gap-6 select-none">
              <div className="w-24 h-24 border border-border flex items-center justify-center">
                <span className="font-mono text-muted-foreground text-3xl font-black">
                  {"//"}
                </span>
              </div>
              <div className="text-center space-y-2">
                <p className="text-foreground font-black uppercase tracking-tighter text-2xl font-sans">
                  Nothing here yet
                </p>
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest max-w-xs">
                  How-tos will appear here once they are published to the
                  community-howtos repo.
                </p>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <section className="border-t border-border pb-32">
          <Container className="px-4 py-16">
            <div className="max-w-4xl mx-auto px-2 space-y-12">
              {Object.entries(byCategory).map(([category, items]) => (
                <div key={category}>
                  <h2 className="font-black uppercase tracking-tighter text-2xl md:text-3xl font-sans mb-4">
                    {category.replace(/-/g, " ")}
                  </h2>
                  <ul className="flex flex-col border-t border-border">
                    {items.map((howto) => (
                      <li
                        key={`${howto.category}/${howto.slug}`}
                        className="border-b border-border"
                      >
                        <Link
                          href={`/howtos/${howto.category}/${howto.slug}`}
                          className="group flex items-start justify-between gap-6 py-4 hover:text-foreground transition-colors"
                        >
                          <span className="font-sans font-semibold tracking-tight text-base group-hover:underline underline-offset-4">
                            {howto.meta.title ?? howto.slug}
                          </span>
                          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground pt-1">
                            {howto.meta.author ?? ""}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
