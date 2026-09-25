import type { Metadata } from "next";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";

// Shared metadata + JSON-LD for the legal pages (privacy, cookie, terms).
// Each page gets its own canonical and hreflang instead of inheriting the
// homepage's from the locale layout.

type LegalKey = "privacy-policy" | "cookie-policy" | "terms-of-use";

export function legalPageMetadata(locale: string, key: LegalKey): Metadata {
  const meta = getPageMeta(locale as Locale, key);
  const canonical = `${BASE_URL}/${locale}/${key}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical,
      languages: {
        en: `${BASE_URL}/en/${key}`,
        da: `${BASE_URL}/da/${key}`,
        "x-default": `${BASE_URL}/en/${key}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: "xrNORD",
      type: "website",
      locale: locale === "da" ? "da_DK" : "en_US",
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
  };
}

export function LegalPageSchema({ locale, legalKey }: { locale: string; legalKey: LegalKey }) {
  const meta = getPageMeta(locale as Locale, legalKey);
  const url = `${BASE_URL}/${locale}/${legalKey}`;
  const name = meta.title.replace(/ - xrNORD$/, "");

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": meta.description,
    "url": url,
    "inLanguage": locale === "da" ? "da-DK" : "en-US",
    "isPartOf": { "@type": "WebSite", "name": "xrNORD", "url": BASE_URL },
    "publisher": { "@type": "Organization", "name": "xrNORD", "url": BASE_URL },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "xrNORD", "item": `${BASE_URL}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": name, "item": url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
