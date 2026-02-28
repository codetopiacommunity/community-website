import { Mail, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaMastodon,
  FaSnapchat,
  FaThreads,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SiBluesky } from "react-icons/si";
import footerBg from "@/assets/images/footer-bg.png";
import logo from "@/assets/images/logos/Codetopia-Logo-TW.png";
import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="relative w-full text-white pt-20 pb-8 mt-auto bg-black overflow-hidden">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${footerBg.src}')` }}
      />

      <Container className="relative z-10">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex shrink-0 items-center">
              <Image
                src={logo}
                alt="Codetopia"
                width={80}
                height={48}
                priority
                className="object-contain"
              />
            </Link>
            <p className="text-zinc-400 text-sm font-mono">
              A utopia for tech enthusiasts
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Link
                href="#"
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <span className="sr-only">Discord</span>
                <FaDiscord className="w-4 h-4 text-zinc-300" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <FaYoutube className="w-4 h-4 text-zinc-300" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <FaLinkedinIn className="w-4 h-4 text-zinc-300" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <span className="sr-only">X (Twitter)</span>
                <FaXTwitter className="w-4 h-4 text-zinc-300" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <FaInstagram className="w-4 h-4 text-zinc-300" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <span className="sr-only">Threads</span>
                <FaThreads className="w-4 h-4 text-zinc-300" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <span className="sr-only">TikTok</span>
                <FaTiktok className="w-4 h-4 text-zinc-300" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <span className="sr-only">Bluesky</span>
                <SiBluesky className="w-4 h-4 text-zinc-300" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <span className="sr-only">Mastodon</span>
                <FaMastodon className="w-4 h-4 text-zinc-300" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <span className="sr-only">Snapchat</span>
                <FaSnapchat className="w-4 h-4 text-zinc-300" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <span className="sr-only">WhatsApp</span>
                <FaWhatsapp className="w-4 h-4 text-zinc-300" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <FaGithub className="w-4 h-4 text-zinc-300" />
              </Link>
            </div>
          </div>

          {/* Column 2: Community */}
          <div className="flex flex-col gap-4 font-sans">
            <h3 className="font-bold text-lg mb-2">Community</h3>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Code of Conduct
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Become a Sponsor
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Become a Volunteer
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Join Our Discord Server
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Join Our WhatsApp Community
            </Link>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-4 font-sans">
            <h3 className="font-bold text-lg mb-2">Contact</h3>
            <div className="flex items-start md:items-center gap-3 text-zinc-400 text-sm">
              <Mail className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5 md:mt-0" />
              codetopiancommunity@gmail.com
            </div>
            <div className="flex items-start md:items-center gap-3 text-zinc-400 text-sm">
              <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5 md:mt-0" />{" "}
              Accra, Ghana
            </div>
            <div className="flex items-start md:items-center gap-3 text-zinc-400 text-sm">
              <PhoneCall className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5 md:mt-0" />{" "}
              (+233) 53 264 6232
            </div>
          </div>

          {/* Column 4: Quick Links */}
          <div className="flex flex-col gap-4 font-sans">
            <h3 className="font-bold text-lg mb-2">Quick Links</h3>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Events
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Articles
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Gallery
            </Link>

            <div className="mt-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <p className="text-zinc-400 text-sm mb-3">
                Found a bug or want to improve this site?
              </p>
              <Link
                href="https://github.com/codetopiacommunity/community-website"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-zinc-300 font-medium text-sm transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                <span>Contribute on GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
          <p className="text-zinc-500 text-xs text-center md:text-left">
            © 2025 Codetopia Community. All rights reserved.
          </p>
          <p className="text-zinc-500 text-xs text-center md:text-left">
            Built with ❤️ by Codetopia Community | Open Source
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-zinc-500 hover:text-white transition-colors text-xs"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-zinc-500 hover:text-white transition-colors text-xs"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-zinc-500 hover:text-white transition-colors text-xs"
            >
              Cookies Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
