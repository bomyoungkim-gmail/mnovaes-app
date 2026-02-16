import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

import { Providers } from "@/components/providers";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";

import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "M.Novaes",
  description: "Luxury e-commerce experience"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <MobileTabBar />
        </Providers>
      </body>
    </html>
  );
}
