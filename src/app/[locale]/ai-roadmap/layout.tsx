import type { Metadata } from "next";
import { getPageMeta, BASE_URL, type Locale } from "@/config/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getPageMeta(locale as Locale, "ai-roadmap");
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}/ai-roadmap`,
      languages: { en: `${BASE_URL}/en/ai-roadmap`, da: `${BASE_URL}/da/ai-roadmap`, "x-default": `${BASE_URL}/en/ai-roadmap` },
    },
    openGraph: { title: meta.title, description: meta.description, url: `${BASE_URL}/${locale}/ai-roadmap` },
  };
}

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  const da = locale === "da";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": da ? [
      {
        "@type": "Question",
        "name": "Hvorfor har virksomheder brug for en AI-strategi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mange organisationer starter deres AI-rejse med isolerede pilot-projekter eller eksperimenter. Disse skalerer sjældent eller skaber varig effekt uden en klar strategisk retning. En AI-strategi hjælper virksomheder med at identificere hvor AI kan skabe stærkest forretningsværdi, prioritere investeringer og forvandle AI fra isolerede forsøg til en koordineret transformation.",
        },
      },
      {
        "@type": "Question",
        "name": "Hvad er en AI-strategi for jeres forretning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En AI-strategi definerer, hvordan en virksomhed bruger kunstig intelligens til at forblive relevant og konkurrencedygtig. Den identificerer, hvor AI kan skabe reel værdi i dag, hvilke kapabiliteter der skal opbygges, og hvordan AI-initiativer bør prioriteres på tværs af organisationen. Når det gøres rigtigt, eksisterer en AI-strategi ikke ved siden af forretningsstrategien, men bliver en del af en samlet strategi.",
        },
      },
      {
        "@type": "Question",
        "name": "Hvad er forskellen på et AI roadmap og en AI-strategi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En AI-strategi definerer den overordnede retning for, hvordan kunstig intelligens skal styrke virksomhedens konkurrenceevne. Et AI roadmap oversætter denne strategiske retning til konkrete handlinger, initiativer, tidsplaner og afhængigheder. Strategien definerer hvorfor og hvor AI skaber værdi. Roadmap'et definerer hvad der skal implementeres og i hvilken rækkefølge.",
        },
      },
      {
        "@type": "Question",
        "name": "Hvad indeholder en AI-strategi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En stærk AI-strategi inkluderer typisk: identifikation af AI-muligheder med høj effekt på tværs af produkter og processer, vurdering af feasibility og forretningseffekt, prioritering af initiativer via et struktureret AI roadmap, vurdering af data og teknologikrav, organisatoriske kapabiliteter og governance, samt tilpasning til virksomhedens overordnede forretningsstrategi.",
        },
      },
      {
        "@type": "Question",
        "name": "Hvad koster AI-strategirådgivning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Omkostningerne ved at udvikle en AI-strategi varierer afhængigt af organisationens størrelse og kompleksitet. xrNORD kombinerer international AI-udviklingskompetence med lokale forretnings- og processpecialister, hvilket giver adgang til erfarne teams med en slankere struktur end traditionelle konsulentfirmaer. For mange virksomheder er det første skridt en fokuseret AI-workshop.",
        },
      },
    ] : [
      {
        "@type": "Question",
        "name": "Why do companies need an AI strategy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many organizations begin their AI journey through isolated pilots or experiments. While valuable, these rarely scale or create lasting impact without a clear strategic direction. An AI strategy helps companies identify where AI creates the strongest business value, prioritize investments, and turn AI from isolated experiments into a coordinated transformation.",
        },
      },
      {
        "@type": "Question",
        "name": "What is an AI strategy for your business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An AI strategy defines how a company uses artificial intelligence to remain relevant and competitive. It identifies where AI can create real value today, what capabilities must be built, and how AI initiatives should be prioritized across the organization. When done well, an AI strategy does not exist beside the business strategy, it becomes part of a unified strategy where technology, data, and business development evolve together.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the difference between an AI roadmap and an AI strategy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An AI strategy defines the overall direction for how artificial intelligence should strengthen the company's competitiveness. An AI roadmap translates this strategic direction into concrete actions, priorities, timelines, and dependencies. The AI strategy defines why AI matters and where it should create value. The AI roadmap defines what initiatives to implement and in which order.",
        },
      },
      {
        "@type": "Question",
        "name": "What does an AI strategy include?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A strong AI strategy typically includes: identification of high-impact AI opportunities across products and processes, evaluation of feasibility and business impact, prioritization of initiatives through a structured AI roadmap, assessment of data and technology requirements, organizational capabilities and governance, and alignment with the company's overall business strategy.",
        },
      },
      {
        "@type": "Question",
        "name": "What does AI strategy consulting cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The cost of developing an AI strategy varies depending on the size of the organization and the complexity of its operations. xrNORD combines international AI development expertise with local business and process specialists, allowing experienced teams to operate with a leaner structure than traditional consulting firms. For many companies, the first step is a focused AI workshop rather than a full strategy project.",
        },
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": da ? "AI Strategi og Roadmap" : "AI Strategy and Roadmap",
    "provider": { "@type": "Organization", "name": "xrNORD", "url": BASE_URL },
    "description": da
      ? "Vi definerer hvordan AI styrker jeres forretning, produkter og arbejdsgange gennem en klar og handlingsorienteret AI-strategi og roadmap."
      : "We define how AI strengthens your business, products, and workflows through a clear and actionable AI strategy and roadmap.",
    "areaServed": ["Denmark", "Sweden", "Norway", "Nordic"],
    "serviceType": da ? "AI Strategirådgivning" : "AI Strategy Consulting",
    "url": `${BASE_URL}/${locale}/ai-roadmap`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "xrNORD", "item": `${BASE_URL}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": da ? "AI Strategi & Roadmap" : "AI Strategy & Roadmap", "item": `${BASE_URL}/${locale}/ai-roadmap` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
