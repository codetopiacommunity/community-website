"use client";

import { Bell, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/admin/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const getPageTitle = (path: string) => {
    if (!path || path === "/admin") return "Dashboard";
    const pathName = path.replace("/admin/", "").replace(/-/g, " ");
    return pathName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-sans overflow-hidden">
        {children}
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          // Override sidebar colors specifically for the admin section
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
      <div className="flex min-h-screen w-full bg-white text-black font-sans">
        <AppSidebar />
        <SidebarInset className="flex flex-col bg-white">
          {/* Top Bar / Header within the workspace */}
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-grey-100 bg-white px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-2 hover:bg-grey-100 text-grey-600" />
              <div className="h-4 w-px bg-grey-200" />
              <div className="flex items-center gap-2 text-sm text-grey-500 font-medium whitespace-nowrap overflow-hidden">
                <span className="hidden sm:inline">Admin Center</span>
                <span className="hidden sm:inline">/</span>
                <span className="text-black font-semibold">
                  {getPageTitle(pathname)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-grey-400" />
                <input
                  type="search"
                  placeholder="Search anything..."
                  className="h-9 w-64 rounded-lg bg-grey-50 pl-9 pr-4 text-sm outline-none border border-transparent focus:border-grey-200 transition-all font-mono"
                />
              </div>
              <button
                type="button"
                className="p-2 text-grey-500 hover:text-black border border-transparent hover:border-grey-100 rounded-lg transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
              </button>
              <div className="h-8 w-8 rounded-full bg-grey-100 border border-grey-200 flex items-center justify-center cursor-pointer hover:bg-grey-200 transition-colors">
                <User className="h-4 w-4 text-grey-600" />
              </div>
            </div>
          </header>

          <main className="flex-1 w-full p-6 lg:p-10">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
