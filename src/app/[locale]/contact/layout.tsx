import type { Metadata } from "next";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getPageMeta(locale as Locale, "contact");
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: { en: `${BASE_URL}/en/contact`, da: `${BASE_URL}/da/contact`, "x-default": `${BASE_URL}/en/contact` },
    },
    openGraph: { title: meta.title, description: meta.description, url: `${BASE_URL}/${locale}/contact` },
  };
}

export default function Layout({ children }: Props) {
  return children;
}
