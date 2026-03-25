"use client";

import type * as React from "react";
import { Sidebar, SidebarRail } from "@/components/ui/sidebar";
import { AppSidebarFooter } from "./sidebar/AppSidebarFooter";
import { AppSidebarHeader } from "./sidebar/AppSidebarHeader";
import { AppSidebarNav } from "./sidebar/AppSidebarNav";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-grey-800 bg-black text-white"
      {...props}
    >
      <AppSidebarHeader />
      <AppSidebarNav />
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
