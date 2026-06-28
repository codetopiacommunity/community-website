import { ArrowUpRight } from "lucide-react";
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
            Practical guides and walkthroughs written by Codetopia members.
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
                  h1: (props) => <h2 {...props} />,
                  h2: (props) => <h3 {...props} />,
                  h3: (props) => <h4 {...props} />,
                }}
              />
            </article>
          </Container>
        </section>
      )}

      {/* Categories */}
      {howtos.length === 0 ? (
        <section className="py-32">
          <Container className="px-4">
            <div className="flex flex-col items-center justify-center py-32 gap-6 select-none">
              <div className="w-24 h-24 border border-border flex items-center justify-center">
                <span className="font-mono text-muted-foreground text-3xl font-black">
                  {"//"}
                </span>
              </div>
              <div className="text-center space-y-3">
                <p className="text-foreground font-black uppercase tracking-tighter text-2xl font-sans">
                  Nothing here yet
                </p>
                <p className="text-muted-foreground font-mono text-sm max-w-xs">
                  How-tos will appear here once they are published to the
                  community-howtos repo.
                </p>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <section className="pb-32">
          <Container className="px-4">
            {Object.entries(byCategory).map(([category, items]) => (
              <div key={category} className="border-b border-border pt-12 pb-2">
                {/* Category header */}
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {items.length} {items.length === 1 ? "guide" : "guides"}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter font-sans mb-6">
                  {category.replace(/-/g, " ")}
                </h2>

                {/* Guides */}
                {items.map((howto) => (
                  <Link
                    key={`${howto.category}/${howto.slug}`}
                    href={`/howtos/${howto.category}/${howto.slug}`}
                    className="group flex items-center justify-between gap-6 py-5 border-t border-border -mx-4 px-4 md:mx-0 md:px-0 hover:bg-foreground/[0.03] transition-colors"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-sans font-black text-lg md:text-xl uppercase tracking-tighter">
                        {howto.meta.title ?? howto.slug}
                      </span>
                      {howto.meta.author && (
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                          {howto.meta.author}
                        </span>
                      )}
                    </div>
                    <ArrowUpRight className="shrink-0 w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            ))}
          </Container>
        </section>
      )}
    </div>
  );
}
