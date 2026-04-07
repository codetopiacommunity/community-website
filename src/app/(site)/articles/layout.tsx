"use client";

import { ContentThemeProvider } from "@/components/layout/ThemeProvider";
import type { ReactNode } from "react";

export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return <ContentThemeProvider>{children}</ContentThemeProvider>;
}
