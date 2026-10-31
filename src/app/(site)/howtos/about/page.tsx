import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FaArrowLeft } from "react-icons/fa6";
import { HOWTO_MDX_COMPONENTS } from "@/components/howtos/mdxComponents";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { getHowtosIntro, splitReadme } from "@/lib/howtos";

export const revalidate = 60;

export const metadata = {
  title: "About these guides",
};

/** Who started the How-Tos and how to fix a mistake, from the howtos README. */
export default async function AboutHowtosPage() {
  const readme = await getHowtosIntro().catch(() => "");
  const { about } = splitReadme(readme);

  return (
    <div className="flex-1 bg-background text-foreground min-h-screen">
      <Container className="px-4 pt-12 pb-32 md:pt-16">
        <div className="max-w-3xl">
          <div className="flex items-center justify-between gap-4 mb-10">
            <Link
              href="/howtos"
              className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              <FaArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
              How-Tos
            </Link>
            <ThemeToggle />
          </div>

          <h1 className="font-sans text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl mb-12">
            About these guides
          </h1>

          <article
            className="prose dark:prose-invert max-w-none
            prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-14 prose-h2:mb-4 [&>h2:first-child]:mt-0
            prose-p:font-mono prose-p:text-[17px] prose-p:leading-relaxed
            prose-li:font-mono prose-li:text-[17px]
            prose-a:text-foreground prose-a:font-semibold prose-a:underline-offset-4"
          >
            <MDXRemote source={about} components={HOWTO_MDX_COMPONENTS} />
          </article>
        </div>
      </Container>
    </div>
  );
}
