"use client";

import { Loader2, LogOut, Settings, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SidebarFooter } from "@/components/ui/sidebar";

export function AppSidebarFooter() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [adminUser, setAdminUser] = React.useState<{
    name: string;
    email: string;
  }>({
    name: "Admin",
    email: "admin@codetopia.community",
  });

  React.useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const data = await res.json();
          setAdminUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch admin:", error);
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <SidebarFooter className="border-t border-grey-800 p-4 bg-black">
      <div className="group-data-[collapsible=icon]:hidden space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="h-10 w-10 rounded-none bg-grey-900 border border-grey-800 flex items-center justify-center shrink-0">
            <Users className="h-5 w-5 text-grey-400" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-white truncate leading-none mb-1">
              {adminUser.name}
            </span>
            <span className="text-[11px] text-grey-500 truncate">
              {adminUser.email}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href="/admin/settings"
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-grey-400 hover:text-white hover:bg-grey-800 rounded-none transition-all border border-transparent hover:border-grey-700"
          >
            <Settings className="h-4 w-4" />
            <span>Account Settings</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center justify-center gap-2.5 w-full mt-2 px-3 py-2.5 text-sm font-bold text-red-100 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-none transition-all group/logout disabled:opacity-50"
          >
            {isLoggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin text-red-400" />
            ) : (
              <LogOut className="h-4 w-4 text-red-400 group-hover/logout:text-red-300" />
            )}
            <span>Log out</span>
          </button>
        </div>
      </div>

      <div className="hidden group-data-[collapsible=icon]:flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          title="Log out"
          className="p-2.5 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 hover:border-red-500/30 rounded-none transition-all disabled:opacity-50"
        >
          {isLoggingOut ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
        </button>
      </div>
    </SidebarFooter>
  );
}
