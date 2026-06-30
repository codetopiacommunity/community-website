"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import logo from "@/assets/images/logos/codetopia-community.png";
import { Container } from "./Container";
import { FeaturedCareerBanner } from "./FeaturedCareerBanner";

type NavLink = {
  label: string;
  href: string;
  description?: string;
};

type StandaloneNavItem = {
  type: "link";
  label: string;
  href: string;
};

type MegaMenuNavItem = {
  type: "megamenu";
  label: string;
  children: NavLink[];
};

type NavItem = StandaloneNavItem | MegaMenuNavItem;

const NAV_ITEMS: NavItem[] = [
  { type: "link", label: "Mentorships", href: "/mentorships" },
  { type: "link", label: "Careers", href: "/careers" },
  {
    type: "megamenu",
    label: "Events",
    children: [
      {
        label: "Events & Activities",
        href: "/events",
        description: "Upcoming and past community events",
      },
      {
        label: "Gallery",
        href: "/gallery",
        description: "Photos from our community moments",
      },
    ],
  },
  {
    type: "megamenu",
    label: "Resources",
    children: [
      {
        label: "Articles",
        href: "/articles",
        description: "Tutorials, guides, and community writing",
      },
      {
        label: "How-tos",
        href: "/howtos",
        description: "Practical step-by-step guides from the community",
      },
      {
        label: "Wall of Impact",
        href: "/wall-of-impact",
        description: "Stories of community impact",
      },
      {
        label: "Code of Conduct",
        href: "/code-of-conduct",
        description: "Our community standards and values",
      },
    ],
  },
  {
    type: "megamenu",
    label: "About",
    children: [
      {
        label: "About Us",
        href: "/about",
        description: "Our mission, vision, and story",
      },
      {
        label: "The Team",
        href: "/team",
        description: "Meet the people behind Codetopia",
      },
    ],
  },
];

function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (item.type === "link") {
    return pathname === item.href;
  }
  return item.children.some((child) => pathname === child.href);
}

function DesktopNav({
  pathname,
  activeItem,
  onMegaMenuEnter,
  onMegaMenuLeave,
}: {
  pathname: string;
  activeItem: string | null;
  onMegaMenuEnter: (label: string) => void;
  onMegaMenuLeave: () => void;
}) {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden lg:flex items-center gap-1"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = isNavItemActive(item, pathname);

        if (item.type === "link") {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                isActive ? "text-white" : "text-zinc-500 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <button
            key={item.label}
            type="button"
            onMouseEnter={() => onMegaMenuEnter(item.label)}
            onMouseLeave={onMegaMenuLeave}
            className={`flex items-center gap-1.5 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
              isActive ? "text-white" : "text-zinc-500 hover:text-white"
            }`}
          >
            {item.label}
            <ChevronDown
              className={`h-3 w-3 transition-transform duration-200 ${activeItem === item.label ? "rotate-180" : ""}`}
            />
          </button>
        );
      })}
    </nav>
  );
}

function MobileMenu({
  expandedMobileItem,
  setExpandedMobileItem,
  onClose,
  pathname,
}: {
  expandedMobileItem: string | null;
  setExpandedMobileItem: (label: string | null) => void;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <div
      id="mobile-menu"
      className="lg:hidden absolute top-full left-0 w-full bg-black border-b border-zinc-900 animate-in slide-in-from-top-2"
    >
      <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-6">
        {NAV_ITEMS.map((item) => {
          const isActive = isNavItemActive(item, pathname);

          if (item.type === "link") {
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`w-full font-mono text-sm uppercase tracking-widest py-4 border-b border-zinc-900 last:border-none transition-colors ${
                  isActive ? "text-white" : "text-zinc-500 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          }

          const isExpanded = expandedMobileItem === item.label;

          return (
            <div
              key={item.label}
              className="border-b border-zinc-900 last:border-none"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedMobileItem(isExpanded ? null : item.label)
                }
                className={`w-full flex items-center justify-between font-mono text-sm uppercase tracking-widest py-4 transition-colors ${
                  isActive ? "text-white" : "text-zinc-500 hover:text-white"
                }`}
              >
                {item.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>
              {isExpanded && (
                <div className="flex flex-col pb-4 animate-in slide-in-from-top-1 duration-150">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="block pl-4 py-2.5 font-mono text-xs uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <Link
          href="/howtos/Getting-Started/01-join-the-communtiy"
          className="mt-6 w-full bg-white text-black font-sans font-black text-xs uppercase tracking-widest px-6 py-4 text-center transition-colors hover:bg-zinc-200"
        >
          Join the Community
        </Link>
      </nav>
    </div>
  );
}

function MobileMenuToggle({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      onClick={onToggle}
      className="lg:hidden p-2 text-zinc-500 hover:text-white transition-colors outline-none"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(
    null,
  );
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveNavItem(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveNavItem(null), 100);
  };

  return (
    <>
      <FeaturedCareerBanner />
      <div className="sticky top-0 z-50 w-full relative">
        <header className="w-full bg-black/95 backdrop-blur-sm text-white border-b border-zinc-900">
          <Container className="flex h-20 items-center justify-between px-4 md:px-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center hover:opacity-80 transition-opacity"
            >
              <Image
                src={logo}
                alt="Codetopia"
                width={150}
                height={90}
                priority
                className="object-contain grayscale brightness-200"
              />
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-6">
              <DesktopNav
                pathname={pathname}
                activeItem={activeNavItem}
                onMegaMenuEnter={handleMouseEnter}
                onMegaMenuLeave={handleMouseLeave}
              />
              <MobileMenuToggle
                isOpen={isMobileMenuOpen}
                onToggle={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setExpandedMobileItem(null);
                }}
              />
            </div>
          </Container>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <MobileMenu
              expandedMobileItem={expandedMobileItem}
              setExpandedMobileItem={setExpandedMobileItem}
              onClose={() => setIsMobileMenuOpen(false)}
              pathname={pathname}
            />
          )}
        </header>

        {/* Desktop Mega Menu Panel */}
        {activeNavItem !== null && (
          <section
            aria-label="Expanded navigation menu"
            onMouseEnter={() => {
              if (closeTimer.current) clearTimeout(closeTimer.current);
            }}
            onMouseLeave={handleMouseLeave}
            className="absolute top-full left-0 hidden lg:block w-full bg-black border-b border-zinc-900 shadow-2xl animate-in slide-in-from-top-2 fade-in-0 duration-200"
          >
            <Container>
              <div className="grid grid-cols-3 gap-12 py-10 px-4 md:px-6">
                {NAV_ITEMS.map((item) => {
                  if (item.type === "link") return null;

                  return (
                    <div key={item.label} className="flex flex-col gap-4">
                      <p className="font-sans font-black text-white text-xs uppercase tracking-tighter">
                        {item.label}
                      </p>
                      <div className="flex flex-col gap-1 border-l border-zinc-900">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setActiveNavItem(null)}
                            className="group flex flex-col px-4 py-3 hover:bg-zinc-900/60 transition-colors"
                          >
                            <span className="font-mono text-sm text-zinc-300 group-hover:text-white transition-colors">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="font-mono text-xs text-zinc-600 mt-0.5">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>
          </section>
        )}
      </div>
    </>
  );
}
