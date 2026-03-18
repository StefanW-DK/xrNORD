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
    "We develop and integrate AI into your business, products, and processes — helping you discover new ways to operate, create value, and compete.",
  keywords: [
    "AI strategy",
    "AI implementation",
    "Scandinavian AI",
    "AI roadmap",
    "AI workshop",
  ],
  openGraph: {
    title: "xrNORD — AI Strategy for Business",
    description:
      "We develop and integrate AI into your business, products, and processes.",
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
    <html className={`${GeistSans.variable} ${inter.variable}`}>
      <body className="antialiased bg-white text-gray-900">{children}</body>
    </html>
  );
}
