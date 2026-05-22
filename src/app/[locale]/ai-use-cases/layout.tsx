import type { Metadata } from "next";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getPageMeta(locale as Locale, "ai-use-cases");
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/ai-use-cases`,
      languages: { en: `${BASE_URL}/en/ai-use-cases`, da: `${BASE_URL}/da/ai-use-cases`, "x-default": `${BASE_URL}/en/ai-use-cases` },
    },
    openGraph: { title: meta.title, description: meta.description, url: `${BASE_URL}/${locale}/ai-use-cases` },
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
      { "@type": "ListItem", "position": 2, "name": da ? "AI Use Cases" : "AI Use Cases", "item": `${BASE_URL}/${locale}/ai-use-cases` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
