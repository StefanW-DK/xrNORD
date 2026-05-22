import type { Metadata } from "next";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getPageMeta(locale as Locale, "why-ai-interviews");
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/why-ai/interviews`,
      languages: { en: `${BASE_URL}/en/why-ai/interviews`, da: `${BASE_URL}/da/why-ai/interviews`, "x-default": `${BASE_URL}/en/why-ai/interviews` },
    },
    openGraph: { title: meta.title, description: meta.description, url: `${BASE_URL}/${locale}/why-ai/interviews` },
  };
}

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  const da = locale === "da";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "xrNORD", "item": `${BASE_URL}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": da ? "Hvorfor AI" : "Why AI", "item": `${BASE_URL}/${locale}/why-ai` },
      { "@type": "ListItem", "position": 3, "name": da ? "Interviews" : "Interviews", "item": `${BASE_URL}/${locale}/why-ai/interviews` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
