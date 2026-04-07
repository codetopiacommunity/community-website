import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden`}
      >
        <ThemeProvider>
          <Toaster position="top-center" richColors theme="dark" />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
