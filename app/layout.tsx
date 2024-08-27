import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google"
import "./globals.css";
import ToasterComponent from "@/components/toaster-component";
import { cn } from "@/lib/utils"
import NavBar from "@/components/navigation/nav-bar";
import Providers from "@/components/providers";
import NavHeader from "@/components/navigation/nav-header";

 
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
        <NavHeader />
      <ToasterComponent />
      <Providers>
      {children}
      </Providers>
      
      </body>
    </html>
  );
}
