import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/images/django-girls.jpg";
import { Container } from "@/components/layout/Container";
import { JOIN_URL } from "@/lib/data/links";

/** The top of the home page: who we are in one line, and the two ways in. */
export function HomeIntro() {
  return (
    <section className="w-full bg-black">
      <Container className="px-4 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-20">
          <div className="max-w-2xl">
            <p className="mb-6 font-mono text-sm text-zinc-400">
              Based in Ghana, open to the world
            </p>
            <h1 className="mb-6 font-sans text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
              A tech community you can see working.
            </h1>
            <p className="mb-10 font-mono text-lg leading-relaxed text-zinc-300">
              People in tech doing real work together, from complete beginners
              to people who have done it for years. Everything members do goes
              on their record. Below is what has been happening lately.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href={JOIN_URL}
                className="bg-white px-6 py-3 font-sans text-sm font-bold text-black transition-colors duration-200 hover:bg-zinc-200"
              >
                Join the community
              </Link>
              <Link
                href="/howtos"
                className="font-sans text-base font-bold text-white underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] duration-200 hover:decoration-2"
              >
                New here? Start with the guides
              </Link>
            </div>
          </div>
          <Image
            src={heroImage}
            alt="Members at a Codetopia workshop"
            priority
            sizes="(min-width: 1024px) 26rem, 100vw"
            className="aspect-[4/5] w-full object-cover grayscale"
          />
        </div>
      </Container>
    </section>
  );
}
