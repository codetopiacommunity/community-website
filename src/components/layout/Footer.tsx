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
import { Newsletter } from "@/components/home/Newsletter";
import { Container } from "@/components/layout/Container";

const linkColumns = [
  {
    title: "Get started",
    links: [
      { name: "How-Tos", href: "/howtos" },
      {
        name: "Join the community",
        href: "/howtos/getting-started/join-the-community",
      },
      { name: "Help out", href: "/howtos/contributing/help-out" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Events", href: "/events" },
      { name: "Gallery", href: "/gallery" },
      { name: "The team", href: "/team" },
      { name: "Spotlight", href: "/spotlight" },
      { name: "Wall of Impact", href: "/wall-of-impact" },
      { name: "Articles", href: "/articles" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "About us", href: "/about" },
      { name: "Code of conduct", href: "/code-of-conduct" },
      { name: "Work with us", href: "/work-with-us" },
      { name: "Careers", href: "/careers" },
      { name: "Verify a certificate", href: "/verify" },
    ],
  },
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
    <footer className="w-full bg-black text-white border-t border-zinc-900">
      <Container className="px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_auto] lg:gap-24">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <Image
                src={logo}
                alt="Codetopia Community"
                width={150}
                height={90}
                className="object-contain grayscale brightness-200"
              />
            </Link>
            <p className="font-mono text-sm text-zinc-400 max-w-xs leading-relaxed">
              An open community where people in tech do real work together.
              Based in Ghana, open to the world.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links, grouped like the menu */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-14">
            {linkColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <p className="font-sans text-sm font-black text-white uppercase tracking-tighter">
                  {column.title}
                </p>
                <nav
                  aria-label={column.title}
                  className="flex flex-col gap-2.5"
                >
                  {column.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-mono text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}

            <div className="flex flex-col gap-4">
              <p className="font-sans text-sm font-black text-white uppercase tracking-tighter">
                Contact
              </p>
              <div className="flex flex-col gap-2.5">
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

        <div className="mt-14 border-t border-zinc-900 pt-10">
          <Newsletter />
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-zinc-900">
        <Container className="px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            suppressHydrationWarning
            className="font-mono text-xs text-zinc-400 uppercase tracking-widest"
          >
            &copy; {new Date().getFullYear()} Codetopia. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              A{" "}
              <a
                href="https://codetopia.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Codetopia
              </a>{" "}
              initiative
            </p>
            <Link
              href="/privacy"
              className="font-mono text-xs text-zinc-400 uppercase tracking-widest hover:text-white transition-colors"
            >
              Privacy
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
