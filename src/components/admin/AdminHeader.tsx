"use client";

import { LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/assets/images/logos/codetopia-community.png";
import { Container } from "@/components/layout/Container";

export function AdminHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dummy user session data
  const dummyUser = {
    name: "Admin User",
    email: "admin@codetopia.community",
    role: "Super Admin",
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-grey-900 border-b border-grey-800 text-grey-50 font-sans">
      <Container className="flex h-20 items-center justify-between">
        {/* Logo and Admin Center Text */}
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex shrink-0 items-center">
            <Image
              src={logo}
              alt="Codetopia Admin"
              width={120}
              height={70}
              priority
              className="object-contain"
            />
          </Link>
          <div className="h-8 w-px bg-grey-800 hidden md:block"></div>
          <span className="text-xl font-bold tracking-tight text-white hidden md:block">
            Admin Center
          </span>
        </div>

        {/* Dummy User Session Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-grey-800/50 p-2 rounded-none transition-colors border border-transparent hover:border-grey-700 outline-none"
            type="button"
          >
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-semibold text-white">
                {dummyUser.name}
              </span>
              <span className="text-xs text-grey-400">{dummyUser.role}</span>
            </div>
            <div className="h-10 w-10 rounded-none bg-grey-800 flex items-center justify-center border border-grey-700">
              <User className="h-5 w-5 text-grey-300" />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-grey-900 rounded-none border border-grey-800 shadow-xl overflow-hidden animate-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-grey-800 md:hidden">
                <p className="text-sm font-medium text-white">
                  {dummyUser.name}
                </p>
                <p className="text-xs text-grey-400 truncate">
                  {dummyUser.email}
                </p>
              </div>
              <div className="py-1">
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-grey-300 hover:bg-grey-800 hover:text-white transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                  type="button"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
