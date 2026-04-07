"use client";

import type { ReactNode } from "react";
import { ContentThemeProvider } from "@/components/layout/ThemeProvider";

export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return <ContentThemeProvider>{children}</ContentThemeProvider>;
}
