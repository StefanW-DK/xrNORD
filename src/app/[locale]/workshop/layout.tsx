import type { Metadata } from "next";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getPageMeta(locale as Locale, "workshop");
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/workshop`,
      languages: { en: `${BASE_URL}/en/workshop`, da: `${BASE_URL}/da/workshop`, "x-default": `${BASE_URL}/en/workshop` },
    },
    openGraph: { title: meta.title, description: meta.description, url: `${BASE_URL}/${locale}/workshop` },
  };
}

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  const da = locale === "da";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": da ? "AI Workshop" : "AI Workshop",
    "provider": { "@type": "Organization", "name": "xrNORD", "url": BASE_URL },
    "description": da
      ? "En fokuseret AI-workshop der hjælper virksomheder med at forstå hvad AI betyder for deres forretning, og hvad næste skridt bør være."
      : "A focused AI workshop that helps businesses understand what AI means for their operations and what steps to take next.",
    "areaServed": ["Denmark", "Sweden", "Norway", "Nordic"],
    "serviceType": da ? "AI Workshop" : "AI Workshop",
    "url": `${BASE_URL}/${locale}/workshop`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "xrNORD", "item": `${BASE_URL}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": da ? "AI Workshop" : "AI Workshop", "item": `${BASE_URL}/${locale}/workshop` },
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
