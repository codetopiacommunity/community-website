"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  { type: "link", label: "Mentorship", href: "/mentorship" },
  { type: "link", label: "Careers", href: "/opportunities" },
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
        label: "Impact",
        href: "/impact",
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
  isNavOpen,
  setIsNavOpen,
  pathname,
}: {
  isNavOpen: boolean;
  setIsNavOpen: (open: boolean) => void;
  pathname: string;
}) {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden lg:flex items-center gap-8"
      onMouseEnter={() => setIsNavOpen(true)}
      onMouseLeave={() => setIsNavOpen(false)}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = isNavItemActive(item, pathname);

        if (item.type === "link") {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm lg:text-base font-bold tracking-wider transition-colors ${
                isActive ? "text-grey-50" : "text-grey-300 hover:text-grey-50"
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
            onClick={() => setIsNavOpen(!isNavOpen)}
            className={`flex items-center gap-1 text-sm lg:text-base font-bold tracking-wider transition-colors ${
              isActive ? "text-grey-50" : "text-grey-300 hover:text-grey-50"
            }`}
          >
            {item.label}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-400 ${isNavOpen ? "rotate-180" : ""}`}
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
      className="lg:hidden absolute top-full left-0 w-full bg-grey-900 border-b border-grey-800 animate-in slide-in-from-top-2"
    >
      <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = isNavItemActive(item, pathname);

          if (item.type === "link") {
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`w-full text-base font-bold tracking-wider py-3 border-b border-grey-800/50 last:border-none transition-colors ${
                  isActive ? "text-grey-50" : "text-grey-300 hover:text-grey-50"
                }`}
              >
                {item.label}
              </Link>
            );
          }

          // type === "megamenu"
          const isExpanded = expandedMobileItem === item.label;

          return (
            <div
              key={item.label}
              className="border-b border-grey-800/50 last:border-none"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedMobileItem(isExpanded ? null : item.label)
                }
                className={`w-full flex items-center justify-between text-base font-bold tracking-wider py-3 transition-colors ${
                  isActive ? "text-grey-50" : "text-grey-300 hover:text-grey-50"
                }`}
              >
                {item.label}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>
              {isExpanded && (
                <div className="flex flex-col pb-2 animate-in slide-in-from-top-1 duration-150">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="block pl-4 py-2 text-sm text-grey-400 hover:text-grey-50 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
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
      className="lg:hidden p-2 text-grey-300 hover:text-grey-50 outline-none"
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(
    null,
  );

  return (
    <>
      <FeaturedCareerBanner />
      <header className="sticky top-0 z-50 w-full bg-grey-900 text-grey-50 font-sans border-b border-grey-800/50">
        <Container className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src={logo}
              alt="Codetopia"
              width={150}
              height={90}
              priority
              className="object-contain"
            />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <DesktopNav
              isNavOpen={isNavOpen}
              setIsNavOpen={setIsNavOpen}
              pathname={pathname}
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

      {/* Desktop Expanded Nav Panel */}
      {isNavOpen && (
        // biome-ignore lint/a11y/useSemanticElements: div is kept for styling and layout control
        <div
          role="region"
          aria-label="Expanded navigation menu"
          className="sticky top-20 z-40 hidden lg:block w-full bg-grey-900/98 border-b border-grey-800 backdrop-blur animate-slide-down-smooth"
          onMouseEnter={() => setIsNavOpen(true)}
          onMouseLeave={() => setIsNavOpen(false)}
        >
          <Container>
            <div className="grid grid-cols-3 gap-8 py-8">
              {NAV_ITEMS.map((item) => {
                if (item.type === "link") {
                  return null;
                }

                return (
                  <div key={item.label} className="space-y-3">
                    <h3 className="font-bold text-grey-50 text-sm uppercase tracking-wider">
                      {item.label}
                    </h3>
                    <div className="space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsNavOpen(false)}
                          className="block px-3 py-2 rounded-md hover:bg-zinc-800/60 transition-colors group"
                        >
                          <span className="text-sm text-grey-100 group-hover:text-grey-50 transition-colors">
                            {child.label}
                          </span>
                          {child.description && (
                            <p className="text-xs text-grey-400 mt-0.5">
                              {child.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
