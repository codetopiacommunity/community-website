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
    <SidebarContent className="py-4 bg-black overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-grey-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-grey-700 [scrollbar-width:thin] [scrollbar-color:#1f2937_#000000]">
      {adminNavData.navMain.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel className="text-grey-500 font-bold uppercase tracking-wider text-[10px]">
            {group.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items ? (
                group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className="text-grey-300 hover:text-white hover:bg-grey-800 transition-colors data-[active=true]:bg-white data-[active=true]:text-black"
                      >
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
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
                    className="text-grey-300 hover:text-white hover:bg-grey-800 transition-colors data-[active=true]:bg-white data-[active=true]:text-black"
                  >
                    <Link href={group.url}>
                      <group.icon className="h-4 w-4" />
                      <span>{group.title}</span>
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
