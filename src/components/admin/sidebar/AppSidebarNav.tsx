"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set(),
  );

  function toggleGroup(title: string) {
    setCollapsedGroups((current) => {
      const next = new Set(current);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }

  return (
    <SidebarContent className="px-3 py-6 bg-black no-scrollbar [scrollbar-width:thin] [scrollbar-color:#1f2937_#000000]">
      {adminNavData.navMain.map((group) => {
        const isCollapsed = collapsedGroups.has(group.title);
        return (
          <SidebarGroup key={group.title} className="mb-8 p-0">
            <SidebarGroupLabel asChild className="px-2 mb-1 h-auto">
              <button
                type="button"
                onClick={() => group.items && toggleGroup(group.title)}
                disabled={!group.items}
                className="flex w-full items-center justify-between font-mono text-xs font-semibold text-zinc-400 enabled:hover:text-zinc-200 transition-colors disabled:cursor-default"
              >
                {group.title}
                {group.items && (
                  <ChevronDown
                    className={`h-3 w-3 shrink-0 transition-transform duration-150 ${isCollapsed ? "-rotate-90" : ""}`}
                  />
                )}
              </button>
            </SidebarGroupLabel>
            {!isCollapsed && (
              <SidebarGroupContent>
                <SidebarMenu className="gap-0">
                  {group.items ? (
                    group.items.map((item) => {
                      const isActive =
                        pathname === item.url ||
                        pathname.startsWith(`${item.url}/`);
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            tooltip={item.title}
                            className="h-9 rounded-none transition-all duration-150 text-white hover:text-white hover:bg-zinc-900 data-[active=true]:!bg-white data-[active=true]:!text-black data-[active=true]:shadow-sm"
                          >
                            <Link
                              href={item.url}
                              className="flex items-center gap-3 px-3"
                            >
                              <item.icon className="h-4 w-4 shrink-0" />
                              <span className="font-mono text-sm font-medium">
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
                        className="h-9 rounded-none transition-all duration-150 text-white hover:text-white hover:bg-zinc-900 data-[active=true]:!bg-white data-[active=true]:!text-black data-[active=true]:shadow-sm"
                      >
                        <Link
                          href={group.url}
                          className="flex items-center gap-3 px-3"
                        >
                          <group.icon className="h-4 w-4 shrink-0" />
                          <span className="font-mono text-sm font-medium">
                            {group.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        );
      })}
    </SidebarContent>
  );
}
