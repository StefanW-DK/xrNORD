import type { Metadata } from "next";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getPageMeta(locale as Locale, "one-more-day");
  const canonical = `${BASE_URL}/${locale}/One-More-Day`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical,
      languages: {
        en: `${BASE_URL}/en/One-More-Day`,
        da: `${BASE_URL}/da/One-More-Day`,
        "x-default": `${BASE_URL}/en/One-More-Day`,
      },
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
    "name": da ? "One More Day - AI Travel Companion til destinationer" : "One More Day - AI Travel Companion for Destinations",
    "provider": {
      "@type": "Organization",
      "name": "xrNORD",
      "url": BASE_URL,
    },
    "description": da
      ? "En intelligent AI Travel Companion der hjælper turismerelaterede destinationer med at forlænge gæsters ophold, øge forbrug og tiltrække tilbagevendende besøgende. Bygget til destinationer, hoteller, restauranter, museer og attraktioner."
      : "An intelligent AI Travel Companion that helps tourism destinations extend visitor stays, increase spending, and drive return visits. Built for destinations, hotels, restaurants, museums, and attractions.",
    "areaServed": ["Denmark", "Scandinavia", "Nordic", "Europe"],
    "serviceType": da ? "AI Travel Companion til turismesektoren" : "AI Travel Companion for the Tourism Sector",
    "url": `${BASE_URL}/${locale}/One-More-Day`,
    "audience": {
      "@type": "Audience",
      "audienceType": da
        ? "Turistorganisationer, destinationsselskaber, hoteller, restauranter, museer og attraktioner"
        : "Tourism organisations, destination management organisations, hotels, restaurants, museums, and attractions",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "xrNORD", "item": `${BASE_URL}/${locale}` },
      {
        "@type": "ListItem",
        "position": 2,
        "name": da ? "One More Day - AI til turisme" : "One More Day - AI for Tourism",
        "item": `${BASE_URL}/${locale}/One-More-Day`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": da
      ? [
          {
            "@type": "Question",
            "name": "Hvad er en AI Travel Companion til destinationer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "En AI Travel Companion er et intelligent digitalt system, der hjælper turister med at opdage skjulte perler, lokale begivenheder og personlige oplevelser på en destination i realtid. Den forbinder information fra hoteller, restauranter, museer og lokale partnere til én sammenhængende oplevelse for gæsten.",
            },
          },
          {
            "@type": "Question",
            "name": "Hvordan hjælper One More Day med at forlænge gæsters ophold?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "One More Day adresserer syv kendte gab i turistoplevelsen: orienteringsgabet, unikhedsgabet, den lokale histories gab, opdagelsesgabet, de skjulte begivenheders gab, friktionsgabet og det passive informationsgab. Ved at lukke disse gab opdager gæsterne mere, bruger mere og vender oftere tilbage.",
            },
          },
        ]
      : [
          {
            "@type": "Question",
            "name": "What is an AI Travel Companion for destinations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An AI Travel Companion is an intelligent digital system that helps tourists discover hidden gems, local events, and personalised experiences at a destination in real time. It connects information from hotels, restaurants, museums, and local partners into one coherent experience for the visitor.",
            },
          },
          {
            "@type": "Question",
            "name": "How does One More Day help extend visitor stays?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "One More Day addresses seven known gaps in the tourist experience: the Orientation Gap, the Uniqueness Gap, the Local Story Gap, the Discovery Gap, the Hidden Events Gap, the Friction Gap, and the Passive Information Gap. By closing these gaps, visitors discover more, spend more, and return more often.",
            },
          },
        ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
