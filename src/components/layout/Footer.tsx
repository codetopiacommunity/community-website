import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaMastodon,
  FaThreads,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SiBluesky } from "react-icons/si";
import logo from "@/assets/images/logos/codetopia-community.png";
import { CTA } from "@/components/home/CTA";
import { Newsletter } from "@/components/home/Newsletter";
import { Container } from "@/components/layout/Container";

const communityLinks = [
  { name: "Code of Conduct", href: "/code-of-conduct" },
  { name: "Become a Sponsor", href: "#" },
  { name: "Become a Volunteer", href: "#" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "The Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Articles", href: "/articles" },
  { name: "How-tos", href: "/howtos" },
  { name: "Gallery", href: "/gallery" },
];

const socialIcons = [
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/@codetopiacommunity",
    label: "YouTube",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/codetopiacommunity",
    label: "LinkedIn",
  },
  { icon: FaXTwitter, href: "https://x.com/codetopiacomm", label: "X" },
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/codetopiacommunity",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/codetopiacommunity/",
    label: "Instagram",
  },
  {
    icon: FaThreads,
    href: "http://www.threads.com/codetopiacommunity/",
    label: "Threads",
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@codetopiacommunity",
    label: "TikTok",
  },
  {
    icon: SiBluesky,
    href: "https://bsky.app/profile/codetopiacommunity.bsky.social",
    label: "Bluesky",
  },
  {
    icon: FaMastodon,
    href: "https://mastodon.social/@codetopiacommunity",
    label: "Mastodon",
  },
  {
    icon: FaWhatsapp,
    href: "https://whatsapp.com/channel/0029VaFHtkR8KMqpEVu24v2o",
    label: "WhatsApp",
  },
  {
    icon: FaGithub,
    href: "https://github.com/codetopiacommunity",
    label: "GitHub",
  },
];

export function Footer() {
  return (
    <footer className="w-full flex flex-col bg-black text-white border-t border-zinc-900">
      <Newsletter />
      <CTA />

      <div className="border-t border-zinc-900">
        <Container className="py-24 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-20 lg:gap-32">
            {/* Brand */}
            <div className="flex flex-col gap-12">
              <Link href="/" className="inline-block">
                <Image
                  src={logo}
                  alt="Codetopia Community"
                  width={160}
                  height={90}
                  className="object-contain grayscale brightness-200"
                />
              </Link>
              <p className="font-mono text-sm text-zinc-400 max-w-xs leading-relaxed">
                A community where developers learn together, collaborate, and
                grow. Based in Ghana, open to the world.
              </p>
              <div className="flex flex-wrap gap-5">
                {socialIcons.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16">
              {/* Community */}
              <div className="flex flex-col gap-6">
                <p className="font-sans font-black text-white uppercase tracking-tighter text-sm">
                  Community
                </p>
                <nav className="flex flex-col gap-3">
                  {communityLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="font-mono text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Pages */}
              <div className="flex flex-col gap-6">
                <p className="font-sans font-black text-white uppercase tracking-tighter text-sm">
                  Pages
                </p>
                <nav className="flex flex-col gap-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="font-mono text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-6">
                <p className="font-sans font-black text-white uppercase tracking-tighter text-sm">
                  Contact
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:hello@codetopia.org"
                    className="font-mono text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    hello@codetopia.org
                  </a>
                  <span className="font-mono text-sm text-zinc-400">
                    Accra, Ghana
                  </span>
                  <a
                    href="https://github.com/codetopiacommunity/community-website"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-sm text-zinc-400 hover:text-white transition-colors group"
                  >
                    Contribute on GitHub
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Bottom bar */}
        <div className="border-t border-zinc-900">
          <Container className="px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              suppressHydrationWarning
              className="font-mono text-xs text-zinc-400"
            >
              &copy; {new Date().getFullYear()} Codetopia. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <p className="font-sans font-black text-xs text-zinc-400 uppercase tracking-widest">
                A{" "}
                <a
                  href="https://codetopia.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Codetopia
                </a>{" "}
                Initiative
              </p>
              <Link
                href="/privacy"
                className="font-mono text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}
