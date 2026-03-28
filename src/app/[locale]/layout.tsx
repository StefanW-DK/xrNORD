import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";
import JsonLd from "@/components/seo/JsonLd";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import "../globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// ─── Metadata (title tags, descriptions, hreflang) ───────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) notFound();

  const meta = getPageMeta(locale as Locale, "home");

  // hreflang alternate URLs — critical for multilingual SEO
  const alternates = {
    canonical: `${BASE_URL}/${locale}`,
    languages: {
      en: `${BASE_URL}/en`,
      da: `${BASE_URL}/da`,
      "x-default": `${BASE_URL}/en`,
    },
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}`,
      siteName: meta.siteName,
      locale: locale === "da" ? "da_DK" : "en_US",
      alternateLocale: locale === "da" ? "en_US" : "da_DK",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/logos/logo-dark.png`,
          width: 1200,
          height: 630,
          alt: "xrNORD — The Nordic Edge in AI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@xrNord",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    metadataBase: new URL(BASE_URL),
  };
}

// ─── Locale list for static generation ───────────────────────────────────────
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${GeistSans.variable} ${inter.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="antialiased bg-white text-gray-900">
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <NextIntlClientProvider messages={messages}>
          {children}
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
