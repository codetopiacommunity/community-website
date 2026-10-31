import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const DEFAULT_SITE_URL = "https://codetopia.community";

/** The site's address, falling back rather than crashing every page if the
 * env value is malformed. */
function siteUrl() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export const metadata: Metadata = {
  // Share images are linked by absolute URL, and without a base Next.js
  // points them at localhost or a preview deployment.
  metadataBase: siteUrl(),
  title: "Codetopia Community",
  description:
    "An open community where people in tech do real work together, reviewed by people who know the craft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased min-h-screen bg-black text-white flex flex-col overflow-x-hidden`}
      >
        <Toaster position="top-center" richColors theme="dark" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
