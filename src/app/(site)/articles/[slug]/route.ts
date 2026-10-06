import { NextResponse } from "next/server";
import { prisma } from "@/../prisma/prisma";
import { hashnodeArticleUrl } from "@/lib/hashnode";

// Articles are read on Hashnode. Old links to /articles/<slug> on this site
// redirect there for good, so links people shared keep working.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  let host: string | undefined;
  try {
    const config = await prisma.articlesConfig.findUnique({ where: { id: 1 } });
    host = config?.hashnodeHost?.trim();
  } catch (error) {
    console.error("Article redirect: failed to fetch config", error);
  }

  // No blog configured (or the database is down): send people to the list
  // rather than a dead end. Temporary, so it is not cached as permanent.
  if (!host) {
    return NextResponse.redirect(new URL("/articles", request.url), 307);
  }

  return NextResponse.redirect(hashnodeArticleUrl(host, slug), 308);
}
