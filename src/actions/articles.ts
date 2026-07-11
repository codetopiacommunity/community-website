"use server";

import { getSession } from "@/lib/auth/auth";
import type { HashnodeArticle } from "@/lib/hashnode";
import { fetchArticles } from "@/lib/hashnode";

export async function getHashnodeArticles(
  host: string,
): Promise<HashnodeArticle[]> {
  const session = await getSession();
  if (!session) return [];
  return fetchArticles(host);
}
