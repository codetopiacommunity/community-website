"use client";

import { Check, Copy } from "lucide-react";
import { type ComponentPropsWithoutRef, useRef, useState } from "react";

type CodeBlockProps = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

const COPIED_RESET_MS = 1500;

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language = props["data-language"];

  async function handleCopy() {
    const text = preRef.current?.textContent ?? "";
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_RESET_MS);
  }

  return (
    <div className="group/code relative">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        {language && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 group-hover/code:opacity-100 transition-opacity">
            {language}
          </span>
        )}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="p-1.5 border border-border bg-background text-muted-foreground opacity-0 transition-opacity hover:border-foreground hover:text-foreground focus-visible:opacity-100 group-hover/code:opacity-100"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
