import type { Metadata } from "next";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getPageMeta(locale as Locale, "future-of-auditing");
  const canonical = `${BASE_URL}/${locale}/Future-of-Auditing`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical,
      languages: {
        en: `${BASE_URL}/en/Future-of-Auditing`,
        da: `${BASE_URL}/da/Future-of-Auditing`,
        "x-default": `${BASE_URL}/en/Future-of-Auditing`,
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
    "name": da ? "AI til finansiel revision - xrNORD" : "AI for Financial Auditing - xrNORD",
    "provider": {
      "@type": "Organization",
      "name": "xrNORD",
      "url": BASE_URL,
    },
    "description": da
      ? "xrNORD hjælper revisionshuse med at forstå, hvordan AI fundamentalt omformer revisionsbranchen, og guider dem igennem AI-strategi, workshops og implementering."
      : "xrNORD helps audit firms understand how AI fundamentally reshapes the auditing profession, guiding them through AI strategy, workshops, and implementation.",
    "areaServed": ["Denmark", "Sweden", "Norway", "Nordic"],
    "serviceType": da ? "AI-strategi og implementering for revisionshuse" : "AI Strategy and Implementation for Audit Firms",
    "url": `${BASE_URL}/${locale}/Future-of-Auditing`,
    "audience": {
      "@type": "Audience",
      "audienceType": da ? "Revisionshuse og regnskabsprofessionelle" : "Financial audit firms, accounting professionals",
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
        "name": da ? "AI til revision" : "AI for Auditing",
        "item": `${BASE_URL}/${locale}/Future-of-Auditing`,
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
            "name": "Hvordan påvirker AI revisionsbranchen?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ifølge IDC forventer 76 % af revisorer globalt, at AI fundamentalt vil forandre revision inden for de næste 10 år. 66 % har allerede AI-initiativer i gang, og 67 % mener, at professionen kræver en grundlæggende gentænkning af, hvordan arbejdet udføres.",
            },
          },
          {
            "@type": "Question",
            "name": "Hvad tilbyder xrNORD revisionsbranchen?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "xrNORD tilbyder AI-strategi og roadmap, AI workshop og træning, implementering og integration samt løbende AI-acceleration til revisionshuse der ønsker at tage førertrøjen i AI-transformationen.",
            },
          },
        ]
      : [
          {
            "@type": "Question",
            "name": "How is AI impacting the auditing profession?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "According to IDC, 76% of auditors globally expect AI to fundamentally reshape audit within the next 10 years. 66% already have AI initiatives underway, and 67% believe the profession needs a fundamental rethink of how work is done.",
            },
          },
          {
            "@type": "Question",
            "name": "What does xrNORD offer audit firms?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "xrNORD offers AI strategy and roadmap, AI workshop and training, implementation and integration, and ongoing AI acceleration for audit firms that want to lead the AI transformation rather than follow it.",
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
