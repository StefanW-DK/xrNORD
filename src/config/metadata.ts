// Centralised per-locale metadata config.
// Add new pages by extending PageMetaKey and siteMetadata.pages.

export const BASE_URL = "https://xrnord.com";

export type Locale = "en" | "da";

interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
}

type PageMetaKey = "home" | "workshop" | "ai-roadmap" | "ai-use-cases" | "why-ai" | "about" | "contact" | "privacy-policy" | "cookie-policy" | "terms-of-use";

const siteMetadata: Record<Locale, { siteName: string; pages: Record<PageMetaKey, PageMeta> }> = {
  en: {
    siteName: "xrNORD",
    pages: {
      home: {
        title: "AI Advisory & Solutions Built for Your Business | xrNORD",
        description:
          "AI solutions designed for your business. We help companies identify AI opportunities, build strategies, and implement solutions that create real business value.",
        keywords: ["AI strategy", "AI implementation", "Scandinavian AI", "AI roadmap", "AI workshop", "Nordic AI"],
      },
      workshop: {
        title: "AI Workshop — xrNORD",
        description:
          "One powerful day to kickstart your AI journey. We demystify AI, analyse your key processes, and identify where AI can deliver the most value for your business.",
        keywords: ["AI workshop", "AI kickstarter", "AI for business", "AI strategy workshop"],
      },
      "ai-roadmap": {
        title: "AI Roadmap — xrNORD",
        description:
          "A structured AI roadmap that combines your business challenges, opportunities, and strategy with the right AI technologies. Built for real results.",
        keywords: ["AI roadmap", "AI strategy", "AI adoption", "business AI roadmap"],
      },
      "ai-use-cases": {
        title: "AI Use Cases — xrNORD",
        description:
          "Explore real-world AI applications across industries. Discover how companies are turning AI potential into measurable business impact.",
        keywords: ["AI use cases", "AI examples", "AI business applications", "AI ROI"],
      },
      "why-ai": {
        title: "Why AI — xrNORD",
        description:
          "Interviews, articles, and insights from business leaders and AI experts on why AI matters now — and how to act on it.",
        keywords: ["why AI", "AI insights", "AI interviews", "AI articles", "AI business"],
      },
      about: {
        title: "About xrNORD — The Nordic Edge in AI",
        description:
          "xrNORD is a Scandinavian AI strategy and development company. We help businesses understand, plan, and implement AI in a structured and meaningful way.",
        keywords: ["xrNORD", "Nordic AI company", "Scandinavian AI", "AI consultancy Denmark"],
      },
      contact: {
        title: "Contact xrNORD — Start Your AI Journey",
        description:
          "Ready to explore what AI can do for your business? Get in touch with xrNORD. One conversation is all it takes.",
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
        title: "AI-rådgivning & løsninger skabt til jeres virksomhed | xrNORD",
        description:
          "AI skabt til jeres virksomhed. Vi hjælper virksomheder med at identificere AI-muligheder, udvikle strategier og implementere løsninger der skaber reel forretningsværdi.",
        keywords: ["AI strategi", "AI implementering", "Skandinavisk AI", "AI roadmap", "AI workshop", "Nordisk AI"],
      },
      workshop: {
        title: "AI Workshop — xrNORD",
        description:
          "Én stærk dag til at kickstarte jeres AI-rejse. Vi afmystificerer AI, analyserer jeres nøgleprocesser og identificerer, hvor AI skaber mest værdi.",
        keywords: ["AI workshop", "AI kickstarter", "AI til forretningen", "AI strategi workshop"],
      },
      "ai-roadmap": {
        title: "AI Roadmap — xrNORD",
        description:
          "Et struktureret AI roadmap, der kombinerer jeres forretningsudfordringer, muligheder og strategi med de rette AI-teknologier.",
        keywords: ["AI roadmap", "AI strategi", "AI adoption", "forretnings AI roadmap"],
      },
      "ai-use-cases": {
        title: "AI Use Cases — xrNORD",
        description:
          "Udforsk AI-anvendelser på tværs af brancher. Se hvordan virksomheder omsætter AI-potentiale til målbare forretningsresultater.",
        keywords: ["AI use cases", "AI eksempler", "AI i forretningen", "AI ROI"],
      },
      "why-ai": {
        title: "Hvorfor AI — xrNORD",
        description:
          "Interviews, artikler og indsigt fra erhvervsledere og AI-eksperter om, hvorfor AI er vigtig nu — og hvordan I handler på det.",
        keywords: ["hvorfor AI", "AI indsigt", "AI interviews", "AI artikler", "AI forretning"],
      },
      about: {
        title: "Om xrNORD — Det Nordiske Forspring med AI",
        description:
          "xrNORD er en skandinavisk AI-strategi og udviklingsvirksomhed. Vi hjælper virksomheder med at forstå, planlægge og implementere AI på en struktureret måde.",
        keywords: ["xrNORD", "Nordisk AI virksomhed", "Skandinavisk AI", "AI rådgivning Danmark"],
      },
      contact: {
        title: "Kontakt xrNORD — Start jeres AI-rejse",
        description:
          "Klar til at udforske, hvad AI kan gøre for jeres forretning? Kontakt xrNORD. Én samtale er alt, der skal til.",
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
