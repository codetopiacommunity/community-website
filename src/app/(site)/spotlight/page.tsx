import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  SpotlightCard,
  SpotlightFeature,
} from "@/components/spotlight/SpotlightCard";
import { getSpotlights } from "@/lib/spotlight";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Spotlight · Codetopia Community",
  description:
    "The people doing remarkable work that not enough people know about.",
};

export default async function SpotlightArchivePage() {
  const spotlights = await getSpotlights();
  const [current, ...rest] = spotlights;

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      <PageHeader title="Spotlight">
        The people doing remarkable work that not enough people know about. One
        at a time, and everyone we feature stays here.
      </PageHeader>

      {spotlights.length === 0 ? (
        <section className="w-full pb-32">
          <Container className="px-4">
            <p className="text-zinc-400 font-mono text-base px-2">
              No spotlights yet. Check back soon.
            </p>
          </Container>
        </section>
      ) : (
        <>
          <section className="w-full pb-20">
            <Container className="px-4">
              <SpotlightFeature spotlight={current} priority />
            </Container>
          </section>

          {rest.length > 0 && (
            <section className="w-full pb-32">
              <Container className="px-4">
                <p className="uppercase tracking-widest text-zinc-400 font-sans text-sm mb-10">
                  Previously featured
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px">
                  {rest.map((spotlight) => (
                    <SpotlightCard key={spotlight.id} spotlight={spotlight} />
                  ))}
                </div>
              </Container>
            </section>
          )}
        </>
      )}
    </div>
  );
}
