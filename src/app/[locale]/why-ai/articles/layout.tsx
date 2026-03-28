import type { Metadata } from "next";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getPageMeta(locale as Locale, "why-ai-articles");
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/why-ai/articles`,
      languages: { en: `${BASE_URL}/en/why-ai/articles`, da: `${BASE_URL}/da/why-ai/articles`, "x-default": `${BASE_URL}/en/why-ai/articles` },
    },
    openGraph: { title: meta.title, description: meta.description, url: `${BASE_URL}/${locale}/why-ai/articles` },
  };
}

export default function Layout({ children }: Props) {
  return children;
}
