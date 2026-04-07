"use client";

import { ContributionBanner } from "@/components/layout/ContributionBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ContentThemeProvider } from "@/components/layout/ThemeProvider";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContentThemeProvider>
      <ContributionBanner />
      <Header />
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <Footer />
    </ContentThemeProvider>
  );
}
