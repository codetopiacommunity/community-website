import { prisma } from "@/../prisma/prisma";
import type { Spotlight } from "@/types";

type RawSpotlight = Awaited<
  ReturnType<typeof prisma.spotlight.findFirst>
> extends infer T
  ? NonNullable<T>
  : never;

function toSpotlight(raw: RawSpotlight): Spotlight {
  return {
    ...raw,
    links: raw.links as unknown as Spotlight["links"],
    createdAt: raw.createdAt.toISOString(),
    updatedAt: raw.updatedAt.toISOString(),
  };
}

/**
 * The public handle for a spotlight. `slug` is nullable in the schema, so
 * entries created before slugs existed fall back to their id — a feature
 * nobody can link to is the problem this page set out to fix, so every
 * entry has to be addressable, slug or not.
 */
export function spotlightHandle(spotlight: Pick<Spotlight, "id" | "slug">) {
  return spotlight.slug ?? String(spotlight.id);
}

/** Featured first, then newest. The current feature leads the archive. */
export async function getSpotlights(): Promise<Spotlight[]> {
  try {
    const rows = await prisma.spotlight.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    return rows.map(toSpotlight);
  } catch (error) {
    console.error("Spotlight: failed to list", error);
    return [];
  }
}

export async function getSpotlightByHandle(
  handle: string,
): Promise<Spotlight | null> {
  try {
    const bySlug = await prisma.spotlight.findFirst({
      where: { slug: handle },
    });
    if (bySlug) return toSpotlight(bySlug);

    // Only fall back to an id lookup for handles that are entirely digits,
    // so a slug like "2026-cohort" never gets parsed into an id.
    if (!/^\d+$/.test(handle)) return null;

    const byId = await prisma.spotlight.findUnique({
      where: { id: Number(handle) },
    });
    return byId ? toSpotlight(byId) : null;
  } catch (error) {
    console.error("Spotlight: failed to load", handle, error);
    return null;
  }
}

/** Up to `limit` other spotlights, for the links at the foot of a feature. */
export async function getOtherSpotlights(
  currentId: number,
  limit = 3,
): Promise<Spotlight[]> {
  try {
    const rows = await prisma.spotlight.findMany({
      where: { id: { not: currentId } },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: limit,
    });
    return rows.map(toSpotlight);
  } catch (error) {
    console.error("Spotlight: failed to load siblings", error);
    return [];
  }
}
