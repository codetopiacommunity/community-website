"use client";

interface ArticleContentProps {
  html: string;
}

export default function ArticleContent({ html }: ArticleContentProps) {
  return (
    <div
      className="prose dark:prose-invert max-w-none prose-headings:font-sans prose-headings:uppercase prose-headings:tracking-tighter prose-headings:scroll-mt-24 prose-a:text-foreground prose-a:underline prose-img:rounded-none prose-code:font-mono"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized server-side
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
