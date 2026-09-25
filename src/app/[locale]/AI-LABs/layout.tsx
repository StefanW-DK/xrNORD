import type { Metadata } from "next";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getPageMeta(locale as Locale, "ai-labs");
  const canonical = `${BASE_URL}/${locale}/AI-LABs`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical,
      languages: {
        en: `${BASE_URL}/en/AI-LABs`,
        da: `${BASE_URL}/da/AI-LABs`,
        "x-default": `${BASE_URL}/en/AI-LABs`,
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
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  const da = locale === "da";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": da ? "AI-LABs - Fortroligt AI-forum" : "AI-LABs - Confidential AI Forum",
    "provider": {
      "@type": "Organization",
      "name": "xrNORD",
      "url": BASE_URL,
    },
    "description": da
      ? "AI-LABs er et fortroligt forum for virksomheder inden for EU, der aktivt arbejder med AI, digital transformation og fremtiden for deres forretning. Deltagerne deler erfaringer med implementering, styring og drift af AI under NDA."
      : "AI-LABs is a confidential forum for organizations within the EU that are actively working with AI, digital transformation, and the future of their business. Members share experience with implementing, governing and operating AI under NDA.",
    "areaServed": ["Denmark", "Sweden", "Norway", "Nordic", "EU"],
    "serviceType": da ? "Fortroligt peer-forum om AI for virksomhedsledere" : "Confidential AI peer forum for business leaders",
    "url": `${BASE_URL}/${locale}/AI-LABs`,
    "audience": {
      "@type": "Audience",
      "audienceType": da ? "Ledere i virksomheder der arbejder aktivt med AI" : "Leaders of companies actively working with AI",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "xrNORD", "item": `${BASE_URL}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": "AI-LABs", "item": `${BASE_URL}/${locale}/AI-LABs` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
