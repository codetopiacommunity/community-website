"use client";

import type { ReactNode } from "react";
import { ContentThemeProvider } from "@/components/layout/ThemeProvider";

export default function HowtosLayout({ children }: { children: ReactNode }) {
  return <ContentThemeProvider>{children}</ContentThemeProvider>;
}
