import type { Metadata } from "next";
import {
  geistSans,
  geistMono,
  spaceGrotesk,
  archivo,
  inter,
} from "@/fonts/fonts";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codetopia Community",
  description: "A utopia for tech enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${archivo.variable} ${inter.variable} antialiased m-auto overflow-x-hidden`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
