"use client";

import {
  Check,
  Copy,
  Facebook,
  Link2,
  Linkedin,
  Share2,
  Twitter,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ShareButtonProps {
  title: string;
  description: string;
}

export function ShareButton({ title, description }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const getUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const shareLinks = [
    {
      label: "Twitter / X",
      icon: Twitter,
      href: () =>
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getUrl())}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: () =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`,
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: () =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`,
    },
    {
      label: "WhatsApp",
      icon: Link2,
      href: () =>
        `https://wa.me/?text=${encodeURIComponent(`${title} — ${getUrl()}`)}`,
    },
  ];

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title, text: description, url: getUrl() });
    } else {
      setOpen((v) => !v);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={handleNativeShare}
        onContextMenu={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
        className="group flex items-center justify-between w-full px-6 py-4 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 font-mono text-[10px] uppercase tracking-[0.2em] font-black transition-colors"
      >
        Share This Program
        <Share2 className="w-3.5 h-3.5" />
      </button>

      {/* Manual share sheet — shown when native share unavailable or right-clicked */}
      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-1 z-50 bg-zinc-950 border border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="p-4 flex flex-col gap-1">
            <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em] px-2 pb-2 border-b border-zinc-800 mb-1">
              Share via
            </p>

            {shareLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  {label}
                </span>
              </a>
            ))}

            <div className="border-t border-zinc-800 mt-1 pt-1">
              <button
                type="button"
                onClick={copyLink}
                className="flex items-center gap-3 w-full px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 shrink-0" />
                )}
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  {copied ? "Copied!" : "Copy Link"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
