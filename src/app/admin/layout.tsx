"use client";

import { ChevronRight, Home, LogOut, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { CommandPalette } from "@/components/admin/CommandPalette";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const routeLabels: Record<string, string> = {
  admin: "Admin",
  articles: "Articles",
  events: "Events",
  gallery: "Gallery",
  impact: "Impact",
  newsletter: "Newsletter",
  spotlight: "Spotlight",
  careers: "Careers",
  new: "New",
  edit: "Edit",
  preview: "Preview",
};

function resolveLabel(seg: string): string {
  return (
    routeLabels[seg] ??
    seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

function Breadcrumbs({ pathname }: { pathname: string }) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) {
    return (
      <div className="flex items-center gap-1.5">
        <Home className="w-3 h-3 text-zinc-400" />
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900">
          Dashboard
        </span>
      </div>
    );
  }

  const crumbs = segments.map((seg, idx) => {
    const href = `/${segments.slice(0, idx + 1).join("/")}`;
    const label = resolveLabel(seg);
    const isLast = idx === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <div className="flex items-center gap-1.5">
      <Link
        href="/admin"
        className="text-zinc-400 hover:text-zinc-900 transition-colors"
      >
        <Home className="w-3 h-3" />
      </Link>
      {crumbs.slice(1).map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 text-zinc-300" />
          {crumb.isLast ? (
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900">
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [adminUser, setAdminUser] = useState({
    name: "Admin",
    email: "",
    avatarUrl: "",
    roles: [] as string[],
  });

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data) setAdminUser(data);
      })
      .catch((error) => console.error("Failed to fetch admin:", error));
  }, []);

  useEffect(() => {
    function closeProfile(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) document.addEventListener("mousedown", closeProfile);
    return () => document.removeEventListener("mousedown", closeProfile);
  }, [profileOpen]);

  async function exitAdminCenter() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/";
  }

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono overflow-hidden">
        {children}
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar": "#000000",
          "--sidebar-foreground": "#f3f4f6",
          "--sidebar-primary": "#ffffff",
          "--sidebar-primary-foreground": "#000000",
          "--sidebar-accent": "#1f2937",
          "--sidebar-accent-foreground": "#f3f4f6",
          "--sidebar-border": "#1f2937",
          "--sidebar-ring": "#d1d5db",
        } as React.CSSProperties
      }
    >
      <div className="flex min-h-screen w-full bg-white text-zinc-900 selection:bg-black selection:text-white font-mono overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col min-w-0 w-full bg-[#f9fafb] relative h-screen overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 relative z-40 shrink-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-zinc-500 hover:text-zinc-900 transition-colors" />
              <Breadcrumbs pathname={pathname} />
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                <button
                  type="button"
                  onClick={() => setPaletteOpen(true)}
                  className="h-9 w-64 bg-zinc-50 pl-9 pr-4 text-sm text-zinc-400 font-mono border border-transparent hover:border-zinc-200 transition-all text-left flex items-center"
                >
                  Search anything...
                  <kbd className="ml-auto text-[10px] px-1.5 py-0.5 border border-zinc-200 text-zinc-400">
                    ⌘K
                  </kbd>
                </button>
              </div>

              <div ref={profileRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-label="Open account menu"
                  className={`h-8 w-8 overflow-hidden border bg-white flex items-center justify-center transition-colors ${profileOpen ? "border-zinc-900" : "border-zinc-200 hover:border-zinc-400"}`}
                >
                  {adminUser.avatarUrl ? (
                    // biome-ignore lint/performance/noImgElement: remote portal avatar
                    <img
                      src={adminUser.avatarUrl}
                      alt={adminUser.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-mono text-xs font-bold text-zinc-700">
                      {adminUser.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 border border-zinc-200 bg-white shadow-lg">
                    <div className="border-b border-zinc-100 px-4 py-3">
                      <p className="truncate font-mono text-sm font-bold text-zinc-900">
                        {adminUser.name}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-xs text-zinc-400">
                        {adminUser.email}
                      </p>
                      <span className="mt-2 inline-flex border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                        {adminUser.roles[0] || "Admin"}
                      </span>
                    </div>
                    <div className="p-1">
                      <button
                        type="button"
                        onClick={exitAdminCenter}
                        className="flex w-full items-center gap-3 px-3 py-2.5 font-mono text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Exit Admin Center
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <CommandPalette
            open={paletteOpen}
            onClose={() => setPaletteOpen(false)}
          />

          {/* Scrollable content area with grid overlay */}
          <div className="flex-1 overflow-y-auto relative min-h-0 w-full">
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
            <main className="relative z-10 flex flex-col min-h-full w-full">
              <div className="p-6 lg:p-10 w-full max-w-none">{children}</div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
