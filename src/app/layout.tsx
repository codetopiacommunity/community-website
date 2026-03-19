import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ContributionBanner } from "@/components/layout/ContributionBanner";
import { Footer } from "@/components/layout/Footer"; // Added import for Footer
import { Header } from "@/components/layout/Header";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codetopia Community",
  description: "Codetopia Community Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased min-h-screen bg-black text-white flex flex-col`}
      >
        <ContributionBanner />
        <Header />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer /> {/* Added Footer component */}
      </body>
    </html>
  );
}
