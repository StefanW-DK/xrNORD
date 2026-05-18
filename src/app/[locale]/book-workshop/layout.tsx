import type { Metadata } from "next";
import { BASE_URL, type Locale } from "@/config/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isDA = locale === "da";

  const title = isDA
    ? "Book AI Workshop | Én dag der afklarer, hvad AI betyder for jer | xrNORD"
    : "Book AI Workshop | One Day to Clarify How AI Creates Value | xrNORD";
  const description = isDA
    ? "Anmod om et AI Workshop med xrNORD. Vi tager udgangspunkt i jeres forretning og kortlægger konkret, hvor AI skaber størst værdi."
    : "Request an AI Workshop with xrNORD. One focused day where we map exactly where AI creates value in your specific business.";

  return {
    title,
    description,
    keywords: isDA
      ? ["book AI workshop", "AI workshop Danmark", "AI workshop virksomheder", "AI strategi workshop"]
      : ["book AI workshop", "AI workshop Denmark", "AI workshop for business", "AI strategy session"],
    alternates: {
      // Canonical points to /workshop so Google shows that page in organic
      // results — but /book-workshop remains crawlable for Google Ads quality scoring
      canonical: `${BASE_URL}/${locale}/workshop`,
      languages: {
        en: `${BASE_URL}/en/workshop`,
        da: `${BASE_URL}/da/workshop`,
        "x-default": `${BASE_URL}/en/workshop`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/book-workshop`,
      siteName: "xrNORD",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
