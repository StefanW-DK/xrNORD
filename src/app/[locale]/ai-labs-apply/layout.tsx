import type { Metadata } from "next";
import { getPageMeta, type Locale } from "@/config/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

// Application form: never in search results. Title/description only, for the
// browser tab and shared links.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getPageMeta(locale as Locale, "ai-labs-apply");

  return {
    title: meta.title,
    description: meta.description,
    // Override the locale layout, which would otherwise leak the homepage's
    // keywords, canonical and hreflang onto this page.
    keywords: null,
    alternates: {},
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
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

export default function Layout({ children }: Props) {
  return children;
}
