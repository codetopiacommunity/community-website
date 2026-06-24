import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FaArrowLeft } from "react-icons/fa6";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { getHowtoRaw, type HowtoMeta } from "@/lib/howtos";

export const revalidate = 60;

export default async function HowtoPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const raw = await getHowtoRaw(category, slug).catch(() => null);
  if (!raw) notFound();

  const { content, data } = matter(raw);
  const meta = data as HowtoMeta;

  const formattedDate = meta.date
    ? new Date(meta.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex-1 bg-background text-foreground min-h-screen">
      <section className="pt-16 pb-8 border-b border-border">
        <Container className="px-4">
          <div className="max-w-4xl mx-auto px-2">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/howtos"
                className="inline-flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase tracking-widest hover:text-foreground transition-colors group"
              >
                <FaArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                How-tos
              </Link>
              <ThemeToggle />
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {category.replace(/-/g, " ")}
            </p>

            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none font-sans mb-8">
              {meta.title ?? slug}
            </h1>

            {(meta.author || formattedDate) && (
              <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {meta.author && <span>{meta.author}</span>}
                {formattedDate && <span>{formattedDate}</span>}
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="py-12 pb-32">
        <Container className="px-4">
          <div className="max-w-4xl mx-auto px-2">
            <article className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXRemote source={content} />
            </article>
          </div>
        </Container>
      </section>
    </div>
  );
}
