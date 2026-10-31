"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";
import { FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

/**
 * Share a feature. A spotlight is the page people most want to post, so the
 * common places are one tap away; the page's preview image does the rest.
 */
export function SpotlightShare({ url, name }: { url: string; name: string }) {
  const [copied, setCopied] = useState(false);
  const text = `${name}, featured in the Codetopia Community Spotlight`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const targets = [
    {
      label: "X",
      icon: FaXTwitter,
      href: `https://x.com/intent/post?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      label: "LinkedIn",
      icon: FaLinkedinIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the share links still work.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <span className="uppercase tracking-widest font-sans text-xs text-zinc-400">
        Share
      </span>
      <button
        type="button"
        onClick={copy}
        className="uppercase tracking-widest inline-flex items-center gap-2 font-sans font-bold text-xs text-white hover:text-zinc-300 transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4" aria-hidden />
        ) : (
          <Link2 className="w-4 h-4" aria-hidden />
        )}
        <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
      </button>
      <div className="flex items-center gap-1 -ml-2">
        {targets.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label} (opens in a new tab)`}
            title={label}
            className="w-9 h-9 inline-flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-200"
          >
            <Icon className="w-4 h-4" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}
