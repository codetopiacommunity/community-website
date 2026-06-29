"use client";

import DOMPurify, { type Config } from "dompurify";
import { useMemo } from "react";

interface ArticleContentProps {
  html: string;
}

// Allow iframes so embedded videos (YouTube, Vimeo, etc.) from Hashnode
// articles are preserved after client-side sanitization.
const PURIFY_CONFIG: Config = {
  ADD_TAGS: ["iframe"],
  ADD_ATTR: ["allowfullscreen", "frameborder"],
};

export default function ArticleContent({ html }: ArticleContentProps) {
  const safeHtml = useMemo(
    () =>
      typeof window === "undefined"
        ? html
        : DOMPurify.sanitize(html, PURIFY_CONFIG),
    [html],
  );

  return (
    <div
      className="prose dark:prose-invert max-w-none prose-headings:font-sans prose-headings:uppercase prose-headings:tracking-tighter prose-headings:scroll-mt-24 prose-a:text-foreground prose-a:underline prose-img:rounded-none prose-code:font-mono"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized with DOMPurify
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
