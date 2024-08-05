import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google"
import "./globals.css";

import { cn } from "@/lib/utils"
import NavBar from "@/components/navigation/nav-bar";
import Providers from "@/components/providers";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Auction Lots",
  description: "Auction Lots is a platform that allows users to create and bid on lots for their auctions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
 
}>) {
  return (
    <html lang="en" className={`${fontSans.className} scroll-smooth`} suppressHydrationWarning>
      <body className={fontSans.className}>
     {children}
      </body>
    </html>
  );
}
