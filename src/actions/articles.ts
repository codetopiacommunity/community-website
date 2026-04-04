"use server";

import type { HashnodeArticle } from "@/lib/hashnode";
import { fetchArticles } from "@/lib/hashnode";

export async function getHashnodeArticles(
  host: string,
): Promise<HashnodeArticle[]> {
  return fetchArticles(host);
}
