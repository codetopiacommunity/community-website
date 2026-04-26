"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { adminNavData } from "@/lib/data/admin-nav";

export function AppSidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarContent className="px-3 py-6 bg-black no-scrollbar [scrollbar-width:thin] [scrollbar-color:#1f2937_#000000]">
      {adminNavData.navMain.map((group) => (
        <SidebarGroup key={group.title} className="mb-8 p-0">
          <SidebarGroupLabel className="px-2 mb-1 h-auto font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
            {group.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0">
              {group.items ? (
                group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className="h-9 rounded-none transition-all duration-150 text-zinc-400 hover:text-white hover:bg-zinc-900 data-[active=true]:!bg-white data-[active=true]:!text-black data-[active=true]:shadow-sm"
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-3 px-3"
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span className="font-mono text-[11px] uppercase tracking-wider">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === group.url}
                    tooltip={group.title}
                    className="h-9 rounded-none transition-all duration-150 text-zinc-400 hover:text-white hover:bg-zinc-900 data-[active=true]:!bg-white data-[active=true]:!text-black data-[active=true]:shadow-sm"
                  >
                    <Link
                      href={group.url}
                      className="flex items-center gap-3 px-3"
                    >
                      <group.icon className="h-4 w-4 shrink-0" />
                      <span className="font-mono text-[11px] uppercase tracking-wider">
                        {group.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
