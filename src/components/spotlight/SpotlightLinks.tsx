import { Globe } from "lucide-react";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaMastodon,
  FaThreads,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SiBluesky } from "react-icons/si";
import type { SpotlightLink } from "@/types";

/**
 * Matched on the host rather than the label, because labels are typed by hand
 * in the admin and arrive as "GITHUB", "Github", "My code" and so on. The host
 * is the one part of a link that cannot be phrased differently.
 */
const HOSTS: [RegExp, IconType, string][] = [
  [/(^|\.)github\.com$/, FaGithub, "GitHub"],
  [/(^|\.)linkedin\.com$/, FaLinkedinIn, "LinkedIn"],
  [/(^|\.)(x|twitter)\.com$/, FaXTwitter, "X"],
  [/(^|\.)youtube\.com$|(^|\.)youtu\.be$/, FaYoutube, "YouTube"],
  [/(^|\.)instagram\.com$/, FaInstagram, "Instagram"],
  [/(^|\.)tiktok\.com$/, FaTiktok, "TikTok"],
  [/(^|\.)threads\.(net|com)$/, FaThreads, "Threads"],
  [/(^|\.)facebook\.com$/, FaFacebookF, "Facebook"],
  [/(^|\.)bsky\.app$/, SiBluesky, "Bluesky"],
  [/(^|\.)mastodon\./, FaMastodon, "Mastodon"],
];

/** Labels are the fallback signal when the URL will not parse or is a
 *  shortener. Ordered so "twitter" is not caught by a looser rule first. */
const LABELS: [RegExp, IconType, string][] = [
  [/github/i, FaGithub, "GitHub"],
  [/linked ?in/i, FaLinkedinIn, "LinkedIn"],
  [/twitter|(^|\W)x(\W|$)/i, FaXTwitter, "X"],
  [/you ?tube/i, FaYoutube, "YouTube"],
  [/insta/i, FaInstagram, "Instagram"],
  [/tik ?tok/i, FaTiktok, "TikTok"],
  [/threads/i, FaThreads, "Threads"],
  [/facebook/i, FaFacebookF, "Facebook"],
  [/bluesky|bsky/i, SiBluesky, "Bluesky"],
  [/mastodon/i, FaMastodon, "Mastodon"],
];

/**
 * Links are typed by hand in the admin, so plenty arrive as
 * "github.com/someone" with no scheme. Left alone that is a broken relative
 * href, and it also fails URL parsing, which would drop every icon back to
 * the generic globe.
 */
export function normalizeUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function iconFor(link: SpotlightLink): [IconType, string] {
  try {
    const host = new URL(normalizeUrl(link.url)).hostname.toLowerCase();
    const match = HOSTS.find(([pattern]) => pattern.test(host));
    if (match) return [match[1], match[2]];
  } catch {
    // Unparseable even after normalising, so the label is all that is left.
  }

  const byLabel = LABELS.find(([pattern]) => pattern.test(link.label ?? ""));
  if (byLabel) return [byLabel[1], byLabel[2]];

  // The label still names the destination for screen readers even when the
  // icon is the generic one.
  return [Globe, link.label || "Website"];
}

export function SpotlightLinks({
  links,
  name,
  size = "sm",
}: {
  links: SpotlightLink[];
  /** Whose links these are, so each icon reads as more than "GitHub". */
  name: string;
  size?: "sm" | "md";
}) {
  if (links.length === 0) return null;

  const box = size === "md" ? "w-9 h-9" : "w-8 h-8";
  const glyph = size === "md" ? "w-5 h-5" : "w-4 h-4";

  return (
    // Negative left margin pulls the first glyph back to the text's left
    // edge: the boxes have padding the surrounding copy does not.
    <div className="flex flex-wrap items-center gap-1 -ml-2">
      {links.map((link) => {
        const [Icon, platform] = iconFor(link);
        return (
          <a
            key={`${link.label}-${link.url}`}
            href={normalizeUrl(link.url)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on ${platform}`}
            title={platform}
            // No border or box: just the glyph. The sized, centred wrapper
            // stays so the tap target is still a comfortable square.
            className={`${box} inline-flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-200`}
          >
            <Icon className={glyph} aria-hidden />
          </a>
        );
      })}
    </div>
  );
}
