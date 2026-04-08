import { getLocale } from "next-intl/server";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${GeistSans.variable} ${inter.variable}`}
    >
      <body className="antialiased bg-white text-gray-900">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
