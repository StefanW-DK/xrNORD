import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "xrNORD — AI Strategy for Business",
  description:
    "We help companies move from knowing AI matters to making it real — with strategy, roadmaps, and solutions built for how your business works.",
  keywords: ["AI strategy", "AI implementation", "Scandinavian AI", "AI roadmap", "AI workshop"],
  openGraph: {
    title: "xrNORD — AI Strategy for Business",
    description:
      "We help companies move from knowing AI matters to making it real.",
    url: "https://xrnord.com",
    siteName: "xrNORD",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${inter.variable}`}>
      <body className="antialiased bg-white text-gray-900">{children}</body>
    </html>
  );
}
