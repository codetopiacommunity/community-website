import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FaDiscord,
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

export function Footer() {
  const communityLinks = [
    { name: "Code of Conduct", href: "/code-of-conduct" },
    { name: "Become a Sponsor", href: "#" },
    { name: "Become a Volunteer", href: "#" },
    { name: "Join Our Discord Server", href: "https://discord.gg/nPmRWdTQAK" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "The Team", href: "/team" },
    // { name: "The Wall", href: "/impact" },
    { name: "Events", href: "/events" },
    { name: "Articles", href: "/articles" },
    { name: "Gallery", href: "/gallery" },
  ];

  const socialIcons = [
    {
      icon: FaDiscord,
      href: "https://discord.gg/nPmRWdTQAK",
      label: "Discord",
    },
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
    {
      icon: FaXTwitter,
      href: "https://x.com/codetopiacom",
      label: "X (Twitter)",
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

  return (
    <footer className="w-full flex flex-col bg-black text-white border-t border-zinc-900 gap-24 md:gap-32 pb-24">
      <Newsletter />
      <CTA />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-10">
            <Link href="/" className="inline-block">
              <Image
                src={logo}
                alt="Codetopia"
                width={180}
                height={100}
                className="object-contain grayscale brightness-200"
              />
            </Link>
            <div className="space-y-4">
              <p className="text-zinc-400 font-sans text-sm italic leading-relaxed font-normal">
                A utopia for tech enthusiasts
              </p>
              <p className="text-zinc-700 font-sans text-xs uppercase tracking-[0.3em] font-normal">
                — A CODETOPIA INITIATIVE
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              {socialIcons.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="text-zinc-500 hover:text-white transition-all hover:scale-110 active:scale-95"
                >
                  <span className="sr-only">{social.label}</span>
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Community */}
          <div className="flex flex-col gap-10">
            <h4 className="text-white font-black uppercase tracking-tighter text-2xl font-sans">
              Community
            </h4>
            <nav className="flex flex-col gap-4">
              {communityLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-zinc-500 hover:text-white transition-colors font-sans text-sm font-normal"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-10">
            <h4 className="text-white font-black uppercase tracking-tighter text-2xl font-sans">
              Contact
            </h4>
            <div className="flex flex-col gap-6">
              <a
                href="mailto:codetopiancommunity@gmail.com"
                className="flex items-center gap-5 text-zinc-500 hover:text-white transition-colors group"
              >
                <Mail className="w-6 h-6 shrink-0 transition-transform group-hover:scale-110" />
                <span className="font-sans text-sm break-all font-normal">
                  hello@codetopia.org
                </span>
              </a>
              <div className="flex items-center gap-5 text-zinc-500">
                <MapPin className="w-6 h-6 shrink-0" />
                <span className="font-sans text-sm font-normal">
                  Accra, Ghana
                </span>
              </div>
              <a
                href="tel:+233532646232"
                className="flex items-center gap-5 text-zinc-500 hover:text-white transition-colors group"
              >
                <Phone className="w-6 h-6 shrink-0 transition-transform group-hover:scale-110" />
                <span className="font-sans text-sm font-normal">
                  (+233) 53 264 6232
                </span>
              </a>
            </div>
          </div>

          {/* Column 4: Quick Links + Bug Section */}
          <div className="flex flex-col gap-10">
            <h4 className="text-white font-black uppercase tracking-tighter text-2xl font-sans">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-4 mb-8">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-zinc-500 hover:text-white transition-colors font-sans text-sm font-normal"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="p-8 bg-zinc-950 border border-zinc-900 relative group overflow-hidden">
              <div className="relative z-10">
                <p className="text-zinc-500 font-sans text-xs mb-6 font-normal">
                  Found a bug or want to improve this site?
                </p>
                <a
                  href="https://github.com/codetopiacommunity/community-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white font-black uppercase tracking-tighter text-lg hover:text-zinc-300 transition-colors"
                >
                  <FaGithub className="w-6 h-6" />
                  Contribute
                </a>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-32 pt-12 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Side: Copyright + Build Info */}
          <div className="flex flex-col md:flex-row items-center gap-8 order-3 md:order-1">
            <p className="text-zinc-700 font-sans text-[10px] uppercase tracking-[0.2em] text-center md:text-left font-normal">
              &copy; {new Date().getFullYear()} Codetopia.
            </p>
            <span className="hidden md:inline text-zinc-900">/</span>
            <div className="flex items-center gap-6">
              <p className="text-zinc-800 font-sans text-[10px] uppercase tracking-[0.3em] whitespace-nowrap text-center font-normal">
                Built by{" "}
                <span className="text-zinc-600 font-normal">
                  Codetopia Community
                </span>
              </p>
              <span className="hidden md:inline text-zinc-900">/</span>
              <p className="text-zinc-800 font-sans text-[10px] uppercase tracking-[0.3em] whitespace-nowrap text-center font-normal">
                Open Source
              </p>
            </div>
          </div>

          {/* Right Side: Legal Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-10 gap-y-4 order-1 md:order-2">
            {[{ label: "Privacy", href: "/privacy" }].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-zinc-700 hover:text-white transition-colors font-sans text-[10px] uppercase tracking-[0.1em] whitespace-nowrap font-normal"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
