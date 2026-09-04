import { prisma } from "@/../prisma/prisma";
import { slugify } from "@/lib/utils";
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
 * entries created before slugs existed fall back to their id. A feature
 * nobody can link to is the problem this page set out to fix, so every
 * entry has to be addressable, slug or not.
 */
export function spotlightHandle(spotlight: Pick<Spotlight, "id" | "slug">) {
  return spotlight.slug ?? String(spotlight.id);
}

const CLOUDINARY_HOST = "res.cloudinary.com";

/**
 * Ask Cloudinary for a face-aware fill at the given size.
 *
 * Spotlight photos are uploaded square or portrait, and every box they have
 * to sit in is wider than that: the feature card on the site, and the 1200x630
 * share card. Cropping to fit takes the crop from the centre, which is where
 * the face is, so ask Cloudinary for a face-aware fill from the same original
 * instead. Anything not served by Cloudinary, or already carrying a
 * transform, is left alone.
 */
export function cloudinaryFill(url: string, width: number, height: number) {
  // Parse and compare the host exactly. A substring test would also accept
  // https://evil.example/res.cloudinary.com/... and
  // https://res.cloudinary.com.evil.example/..., letting an attacker-chosen
  // host through as if it were Cloudinary.
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }
  if (parsed.protocol !== "https:" || parsed.hostname !== CLOUDINARY_HOST) {
    return url;
  }

  const marker = "/image/upload/";
  const at = parsed.pathname.indexOf(marker);
  if (at === -1) return url;

  const head = parsed.pathname.slice(0, at + marker.length);
  const rest = parsed.pathname.slice(at + marker.length);
  // A transform segment is "key_value" pairs; a version segment is "v123456".
  if (/^[a-z]{1,3}_[^/]+\//.test(rest)) return url;

  parsed.pathname = `${head}c_fill,g_face,w_${width},h_${height}/${rest}`;
  return parsed.toString();
}

/**
 * A slug that is free to use. `slug` is UNIQUE, so two people with the same
 * name would otherwise collide and fail the insert; the second becomes
 * "ada-lovelace-2". Pass `excludeId` when renaming an existing entry so it
 * does not collide with itself.
 */
export async function uniqueSpotlightSlug(name: string, excludeId?: number) {
  const base = slugify(name) || "spotlight";
  let candidate = base;
  for (let n = 2; ; n += 1) {
    const clash = await prisma.spotlight.findFirst({
      where: {
        slug: candidate,
        ...(excludeId === undefined ? {} : { id: { not: excludeId } }),
      },
      select: { id: true },
    });
    if (!clash) return candidate;
    candidate = `${base}-${n}`;
  }
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

/**
 * The current feature. Deliberately the same ordering as getSpotlights, so
 * the home page teaser and the entry leading the archive can never disagree
 * about who is being featured. Falls back to the newest entry when nothing
 * carries the flag, rather than showing nothing.
 */
export async function getFeaturedSpotlight(): Promise<Spotlight | null> {
  try {
    const row = await prisma.spotlight.findFirst({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    return row ? toSpotlight(row) : null;
  } catch (error) {
    console.error("Spotlight: failed to load featured", error);
    return null;
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
