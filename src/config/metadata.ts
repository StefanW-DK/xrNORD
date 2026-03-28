// Centralised per-locale metadata config.
// Add new pages by extending PageMetaKey and siteMetadata.pages.

export const BASE_URL = "https://xrnord.com";

export type Locale = "en" | "da";

interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
}

type PageMetaKey = "home" | "workshop" | "ai-roadmap" | "ai-use-cases" | "why-ai" | "why-ai-interviews" | "why-ai-articles" | "about" | "contact" | "privacy-policy" | "cookie-policy" | "terms-of-use";

const siteMetadata: Record<Locale, { siteName: string; pages: Record<PageMetaKey, PageMeta> }> = {
  en: {
    siteName: "xrNORD",
    pages: {
      home: {
        title: "Stay Competitive | We Build AI Into Your Business | xrNORD",
        description:
          "Stay competitive by making AI part of how your business operates. We build and integrate AI into your products, processes, and daily workflows.",
        keywords: ["AI strategy", "AI implementation", "Scandinavian AI", "AI roadmap", "AI workshop", "Nordic AI"],
      },
      workshop: {
        title: "AI Workshop | How will AI transform your business | xrNORD",
        description:
          "Understand how AI will impact your business. Get clarity on where it creates value and what your next steps should be.",
        keywords: ["AI workshop", "AI kickstarter", "AI for business", "AI strategy workshop"],
      },
      "ai-roadmap": {
        title: "AI Roadmap | Challenge & Reshape Your Business to Win | xrNORD",
        description:
          "We combine a deep understanding of AI and your business to strengthen your competitiveness and optimize how you operate, guided by a clear, actionable roadmap.",
        keywords: ["AI roadmap", "AI strategy", "AI adoption", "business AI roadmap"],
      },
      "ai-use-cases": {
        title: "AI Use Cases | How AI Creates Value in Real Businesses | xrNORD",
        description:
          "Explore how AI is used across sales, media, education, and accounting. See concrete examples of how companies create value with AI in practice.",
        keywords: ["AI use cases", "AI examples", "AI business applications", "AI ROI"],
      },
      "why-ai": {
        title: "Why AI Matters | Insights from Business & AI Leaders | xrNORD",
        description:
          "Hear how business and AI leaders think about AI today. Understand what matters, what works, and what it means for your business.",
        keywords: ["why AI", "AI insights", "AI interviews", "AI articles", "AI business"],
      },
      "why-ai-interviews": {
        title: "Why AI Matters | Insights from Business & AI Leaders | xrNORD",
        description:
          "Hear how business and AI leaders think about AI today. Understand what matters, what works, and what it means for your business.",
        keywords: ["AI interviews", "AI leaders", "AI insights", "business AI", "AI perspectives"],
      },
      "why-ai-articles": {
        title: "Articles & Insights on AI in Practice | xrNORD",
        description:
          "From strategy and data to implementation and scaling. Gain insight into how companies work with AI and what it takes to succeed.",
        keywords: ["AI articles", "AI insights", "AI strategy", "AI implementation", "AI in practice"],
      },
      about: {
        title: "About | We Build Companies That Win with AI",
        description:
          "Most companies explore AI. Very few build it into how they operate. xrNORD helps you become AI-first and turn AI into real business advantage.",
        keywords: ["xrNORD", "Nordic AI company", "Scandinavian AI", "AI consultancy Denmark"],
      },
      contact: {
        title: "AI in Your Business | Start the Conversation | xrNORD",
        description:
          "Talk to xrNORD about your business and AI. A focused conversation on where it creates value and what your next steps are.",
        keywords: ["contact xrNORD", "AI consultancy contact", "start AI journey"],
      },
      "privacy-policy": {
        title: "Privacy Policy — xrNORD",
        description:
          "Our Privacy Policy explains how xrNORD collects, uses, and protects your personal data in compliance with GDPR and international standards.",
        keywords: ["privacy policy", "data protection", "GDPR", "personal data", "privacy"],
      },
      "cookie-policy": {
        title: "Cookie Policy — xrNORD",
        description:
          "Learn how xrNORD uses cookies on its website, including necessary, analytics, and marketing cookies, and how to manage your preferences.",
        keywords: ["cookie policy", "cookies", "tracking", "analytics", "GDPR cookies"],
      },
      "terms-of-use": {
        title: "Terms of Use — xrNORD",
        description:
          "The Terms of Use for xrnord.com. By using our website, you agree to these terms governing intellectual property, acceptable use, and liability.",
        keywords: ["terms of use", "terms and conditions", "legal", "website terms"],
      },
    },
  },
  da: {
    siteName: "xrNORD",
    pages: {
      home: {
        title: "Styrk jeres konkurrencekraft | Vi gør AI til en del af jeres forretning | xrNORD",
        description:
          "Styrk jeres konkurrencekraft ved at gøre AI til en del af jeres måde at arbejde på. Vi bygger og integrerer AI i jeres produkter, processer og daglige arbejdsgange.",
        keywords: ["AI strategi", "AI implementering", "Skandinavisk AI", "AI roadmap", "AI workshop", "Nordisk AI"],
      },
      workshop: {
        title: "AI Workshop | Hvad kan AI betyde for jeres forretning | xrNORD",
        description:
          "Forstå hvad AI betyder for jeres forretning. Få klarhed over hvor det skaber værdi og hvad næste skridt er.",
        keywords: ["AI workshop", "AI kickstarter", "AI til forretningen", "AI strategi workshop"],
      },
      "ai-roadmap": {
        title: "AI Roadmap | Gentænk og styrk jeres forretning | xrNORD",
        description:
          "En klar retning for hvordan AI styrker jeres forretning og konkurrencekraft, omsat til en konkret handlingsplan.",
        keywords: ["AI roadmap", "AI strategi", "AI adoption", "forretnings AI roadmap"],
      },
      "ai-use-cases": {
        title: "AI Use Cases | Sådan skaber AI værdi i virksomheder | xrNORD",
        description:
          "Se hvordan AI bruges i salg, marketing, undervisning og økonomi. Få konkrete eksempler på hvordan virksomheder skaber reel værdi med AI.",
        keywords: ["AI use cases", "AI eksempler", "AI i forretningen", "AI ROI"],
      },
      "why-ai": {
        title: "Hvorfor AI betyder noget | Lyt til erhvervs- og AI-ledere | xrNORD",
        description:
          "Hør erhvervs- og AI-lederes erfaringer med AI i praksis, og hvorfor det er afgørende at tage teknologien seriøst.",
        keywords: ["hvorfor AI", "AI indsigt", "AI interviews", "AI artikler", "AI forretning"],
      },
      "why-ai-interviews": {
        title: "Hvorfor AI betyder noget | Lyt til erhvervs- og AI-ledere | xrNORD",
        description:
          "Hør erhvervs- og AI-lederes erfaringer med AI i praksis, og hvorfor det er afgørende at tage teknologien seriøst.",
        keywords: ["AI interviews", "AI ledere", "AI indsigt", "erhvervs AI", "AI perspektiver"],
      },
      "why-ai-articles": {
        title: "Artikler og indsigter om AI i praksis | xrNORD",
        description:
          "Fra strategi og data til implementering og skalering. Få indsigt i hvordan virksomheder arbejder med AI og hvad det kræver at lykkes.",
        keywords: ["AI artikler", "AI indsigt", "AI strategi", "AI implementering", "AI i praksis"],
      },
      about: {
        title: "Om | Vi hjælper virksomheder med at vinde med AI",
        description:
          "De fleste arbejder med AI. De færreste bygger det ind i deres forretning. xrNORD hjælper jer med at blive AI-first og skabe reel konkurrencekraft.",
        keywords: ["xrNORD", "Nordisk AI virksomhed", "Skandinavisk AI", "AI rådgivning Danmark"],
      },
      contact: {
        title: "AI i jeres forretning | Lad os tage en snak | xrNORD",
        description:
          "Klar til at udforske potentialet og sikre jeres fremtid? Lad os starte med en snak.",
        keywords: ["kontakt xrNORD", "AI rådgivning kontakt", "start AI-rejse"],
      },
      "privacy-policy": {
        title: "Privatlivspolitik — xrNORD",
        description:
          "Vores privatlivspolitik forklarer, hvordan xrNORD indsamler, bruger og beskytter dine personlige data i overensstemmelse med GDPR og internationale standarder.",
        keywords: ["privatlivspolitik", "databeskyttelse", "GDPR", "personlige data", "privatliv"],
      },
      "cookie-policy": {
        title: "Cookiepolitik — xrNORD",
        description:
          "Lær hvordan xrNORD bruger cookies på sit website, herunder nødvendige, analytiske og marketingcookies, samt hvordan du administrerer dine præferencer.",
        keywords: ["cookiepolitik", "cookies", "sporing", "analyse", "GDPR cookies"],
      },
      "terms-of-use": {
        title: "Vilkår for brug — xrNORD",
        description:
          "Vilkårene for brug af xrnord.com. Ved at bruge vores website accepterer du disse vilkår for intellektuel ejendomsret, acceptabel brug og ansvar.",
        keywords: ["vilkår for brug", "betingelser", "juridisk", "webstedsvilkår"],
      },
    },
  },
};

export function getPageMeta(locale: Locale, page: PageMetaKey): PageMeta & { siteName: string } {
  return {
    siteName: siteMetadata[locale].siteName,
    ...siteMetadata[locale].pages[page],
  };
}
