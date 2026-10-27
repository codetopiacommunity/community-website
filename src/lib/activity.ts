import { prisma } from "@/../prisma/prisma";
import { fetchArticles } from "@/lib/hashnode";
import { fetchPortalRecognitions, isPortalConfigured } from "@/lib/portal";
import { spotlightHandle } from "@/lib/spotlight";

/**
 * One line in the home page log: something that happened in the community,
 * with a date, what it was, and where to see it.
 */
export interface ActivityEntry {
  date: Date;
  kind: "Event" | "Article" | "Photos" | "Spotlight" | "Thank you";
  title: string;
  /** Who did it, when there is one person to name. */
  who?: string;
  href: string;
  /** True for links that leave the site, like articles on Hashnode. */
  external?: boolean;
}

/**
 * Recent real activity from every source the site already has, newest
 * first. Each source fails on its own, so one being down only shortens the
 * list. Upcoming events are left out: the log is a record of what happened.
 */
export async function getRecentActivity(limit = 10): Promise<ActivityEntry[]> {
  const now = new Date();

  const sources: Promise<ActivityEntry[]>[] = [
    prisma.event
      .findMany({
        where: { startDate: { lte: now } },
        orderBy: { startDate: "desc" },
        take: limit,
      })
      .then((rows) =>
        rows.map((e) => ({
          date: e.startDate,
          kind: "Event" as const,
          title: e.title,
          href: "/events",
        })),
      ),

    prisma.articlesConfig
      .findUnique({ where: { id: 1 } })
      .then((config) =>
        config?.hashnodeHost ? fetchArticles(config.hashnodeHost) : [],
      )
      .then((articles) =>
        articles.slice(0, limit).map((a) => ({
          date: new Date(a.publishedAt),
          kind: "Article" as const,
          title: a.title,
          who: a.author?.name,
          href: a.url,
          external: true,
        })),
      ),

    prisma.galleryAlbum
      .findMany({ orderBy: { createdAt: "desc" }, take: limit })
      .then((rows) =>
        rows.map((a) => ({
          date: a.createdAt,
          kind: "Photos" as const,
          title: a.title,
          href: `/gallery/${a.slug}`,
        })),
      ),

    prisma.spotlight
      .findMany({ orderBy: { createdAt: "desc" }, take: limit })
      .then((rows) =>
        rows.map((s) => ({
          date: s.createdAt,
          kind: "Spotlight" as const,
          title: s.contribution,
          who: s.name,
          href: `/spotlight/${spotlightHandle(s)}`,
        })),
      ),

    isPortalConfigured()
      ? fetchPortalRecognitions({ limit }).then((rows) =>
          rows
            .filter((r) => r.publishedAt)
            .map((r) => ({
              date: new Date(r.publishedAt as string),
              kind: "Thank you" as const,
              title: r.awardName || r.impactSummary,
              who: r.fullName,
              href: `/wall-of-impact/${r.slug}`,
            })),
        )
      : Promise.resolve([]),
  ];

  const results = await Promise.allSettled(sources);
  return results
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .filter((e) => !Number.isNaN(e.date.getTime()) && e.date <= now)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
}
