"use client";

import Link from "next/link";
import { spaceGrotesk } from "../../fonts/fonts";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Event & Activities", href: "/events" },
  { label: "Articles", href: "/articles" },
  { label: "Gallery", href: "/gallery" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Desktop menu */}
      <ul className={`uppercase gap-15 ${spaceGrotesk.className} hidden md:flex`}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:border-b-4">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile full-screen menu */}
      {isOpen && (
        <ul
          className={`fixed inset-x-0 top-[55px] uppercase ${spaceGrotesk.className}
          flex flex-col gap-6 bg-black text-white p-7 z-50 md:hidden`}
        >
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
