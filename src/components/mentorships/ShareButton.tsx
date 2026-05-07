"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  description: string;
}

export function ShareButton({ title, description }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url: window.location.href,
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-zinc-800 text-white hover:bg-zinc-900/50 transition-colors font-semibold"
    >
      <Share2 className="w-4 h-4" />
      Share
    </button>
  );
}
