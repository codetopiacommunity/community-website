"use client";

interface ArticleContentProps {
  html: string;
}

export default function ArticleContent({ html }: ArticleContentProps) {
  const props = {
    dangerouslySetInnerHTML: { __html: html },
  };

  return (
    <div
      className="prose prose-invert max-w-none prose-headings:font-sans prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-white prose-a:underline prose-img:rounded-none prose-code:font-mono"
      {...props}
    />
  );
}
