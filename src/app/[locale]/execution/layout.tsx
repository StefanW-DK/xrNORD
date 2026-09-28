import type { Metadata } from "next";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getPageMeta(locale as Locale, "execution");
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/execution`,
      languages: {
        en: `${BASE_URL}/en/execution`,
        da: `${BASE_URL}/da/execution`,
        "x-default": `${BASE_URL}/en/execution`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}/execution`,
    },
    // Not finished yet: keep out of search results but crawlable, and reachable by direct link.
    // Both keys are set so the locale layout's index/googleBot values are fully overridden.
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
  };
}

export default function Layout({ children }: Props) {
  return children;
}
