import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import RouteChangeTracker from "@/components/analytics/RouteChangeTracker";
import "../globals.css";

const GA_ID = "G-KZBPLJL8VK";

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
    <>
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
              gtag('config', '${GA_ID}', { 'send_page_view': true });
              try {
                var c = localStorage.getItem('xrnord_cookie_consent');
                if (c && c !== 'dismissed') {
                  var p = JSON.parse(c);
                  gtag('consent', 'update', {
                    'analytics_storage': (p.all || p.analytics) ? 'granted' : 'denied',
                    'ad_storage': (p.all || p.marketing) ? 'granted' : 'denied',
                    'ad_user_data': (p.all || p.marketing) ? 'granted' : 'denied',
                    'ad_personalization': (p.all || p.marketing) ? 'granted' : 'denied'
                  });
                }
              } catch(e) {}
            `}
          </Script>
        </>
      )}
      <NextIntlClientProvider messages={messages}>
        <RouteChangeTracker />
        {children}
        <Footer />
        <CookieBanner />
      </NextIntlClientProvider>
    </>
  );
}
