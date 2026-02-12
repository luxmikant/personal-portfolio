import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";
import SmoothScrollProvider from "@/components/Providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxmikant | Backend · Cloud · AI · Web3",
  description:
    "Interactive portfolio showcasing backend engineering, cloud-native systems, AI tools, and Web3 expertise. Building scalable systems in niche domains.",
  openGraph: {
    title: "Luxmikant | Backend · Cloud · AI · Web3",
    description:
      "Interactive portfolio with storytelling-driven experience. Backend systems, cloud infrastructure, AI agents, and blockchain architecture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrollProvider>
          <Navigation />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
