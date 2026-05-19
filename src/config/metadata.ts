// Centralised per-locale metadata config.
// Add new pages by extending PageMetaKey and siteMetadata.pages.

export const BASE_URL = "https://www.xrnord.com";

export type Locale = "en" | "da";

interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
}

type PageMetaKey = "home" | "workshop" | "ai-roadmap" | "execution" | "ai-use-cases" | "why-ai" | "why-ai-interviews" | "why-ai-articles" | "about" | "contact" | "privacy-policy" | "cookie-policy" | "terms-of-use";

const siteMetadata: Record<Locale, { siteName: string; pages: Record<PageMetaKey, PageMeta> }> = {
  en: {
    siteName: "xrNORD",
    pages: {
      home: {
        title: "Build AI Into Your Business | Stay Competitive | xrNORD",
        description:
          "Build AI into your business operations, products, and workflows. xrNORD helps companies turn AI into real competitive advantage.",
        keywords: ["AI strategy", "AI implementation", "Scandinavian AI", "AI roadmap", "AI workshop", "Nordic AI"],
      },
      workshop: {
        title: "AI Workshop | Understand AI in Your Business | xrNORD",
        description:
          "Understand what AI means for your business, where it creates value, and what your next steps should be.",
        keywords: ["AI workshop", "AI kickstarter", "AI for business", "AI strategy workshop"],
      },
      "ai-roadmap": {
        title: "AI Strategy & Roadmap | Define Your New Future | xrNORD",
        description:
          "Define how AI strengthens your business, products, and operations through a clear and actionable AI Strategy.",
        keywords: ["AI roadmap", "AI strategy", "AI adoption", "business AI roadmap"],
      },
      "execution": {
        title: "AI Execution | Implement AI Across Your Business | xrNORD",
        description:
          "We design and implement connected AI systems across workflows, data, and operations to build your AI ecosystem.",
        keywords: ["AI execution", "AI ecosystem", "company AI", "AI implementation", "AI integration", "Nordic AI"],
      },
      "ai-use-cases": {
        title: "AI Use Cases | Real AI Value in Business | xrNORD",
        description:
          "Explore how businesses use AI across sales, marketing, education, finance, and operations to create real value.",
        keywords: ["AI use cases", "AI examples", "AI business applications", "AI ROI"],
      },
      "why-ai": {
        title: "Why AI Matters | Business & AI Leaders | xrNORD",
        description:
          "Hear how business leaders and AI experts think about AI, business transformation, and the future of operations.",
        keywords: ["why AI", "AI insights", "AI interviews", "AI articles", "AI business"],
      },
      "why-ai-interviews": {
        title: "Why AI Matters | Business & AI Leaders | xrNORD",
        description:
          "Hear how business leaders and AI experts think about AI, business transformation, and the future of operations.",
        keywords: ["AI interviews", "AI leaders", "AI insights", "business AI", "AI perspectives"],
      },
      "why-ai-articles": {
        title: "Articles & Insights on AI in Practice | xrNORD",
        description:
          "Explore practical insights on AI strategy, implementation, operations, and how businesses create value with AI.",
        keywords: ["AI articles", "AI insights", "AI strategy", "AI implementation", "AI in practice"],
      },
      about: {
        title: "About xrNORD | We Build Companies That Win with AI",
        description:
          "xrNORD helps Nordic companies integrate AI into operations, products, and workflows to strengthen competitiveness.",
        keywords: ["xrNORD", "Nordic AI company", "Scandinavian AI", "AI consultancy Denmark"],
      },
      contact: {
        title: "AI in Your Business | Start the Conversation | xrNORD",
        description:
          "Talk with xrNORD about how AI can strengthen your business, operations, products, and future competitiveness.",
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
        title: "Styrk konkurrencekraften | AI i jeres forretning | xrNORD",
        description:
          "Gør AI til en del af jeres arbejdsgange, produkter og processer. xrNORD hjælper virksomheder med at styrke konkurrencekraften.",
        keywords: ["AI strategi", "AI implementering", "Skandinavisk AI", "AI roadmap", "AI workshop", "Nordisk AI"],
      },
      workshop: {
        title: "AI Workshop | Forstå AI i jeres forretning | xrNORD",
        description:
          "Få klarhed over hvad AI betyder for jeres forretning, hvor det skaber værdi, og hvad næste skridt bør være.",
        keywords: ["AI workshop", "AI kickstarter", "AI til forretningen", "AI strategi workshop"],
      },
      "ai-roadmap": {
        title: "AI Strategi & Roadmap | Styrk jeres forretning | xrNORD",
        description:
          "Definér hvordan AI styrker jeres forretning, produkter og arbejdsgange gennem en klar og handlingsorienteret strategi.",
        keywords: ["AI roadmap", "AI strategi", "AI adoption", "forretnings AI roadmap"],
      },
      "execution": {
        title: "AI Execution | Implementer AI i jeres forretning | xrNORD",
        description:
          "Vi designer og implementerer forbundne AI-systemer på tværs af data, arbejdsgange og processer — og bygger det over tid til jeres eget Company AI.",
        keywords: ["AI execution", "AI ecosystem", "company AI", "AI implementering", "AI integration", "Nordisk AI"],
      },
      "ai-use-cases": {
        title: "AI Use Cases | AI-værdi i virksomheder | xrNORD",
        description:
          "Se hvordan virksomheder bruger AI i salg, marketing, undervisning og økonomi til at skabe reel værdi.",
        keywords: ["AI use cases", "AI eksempler", "AI i forretningen", "AI ROI"],
      },
      "why-ai": {
        title: "Hvorfor AI betyder noget | Ledere & AI eksperter | xrNORD",
        description:
          "Hør hvordan ledere og AI eksperter arbejder med AI, forretning og fremtidens arbejdsgange.",
        keywords: ["hvorfor AI", "AI indsigt", "AI interviews", "AI artikler", "AI forretning"],
      },
      "why-ai-interviews": {
        title: "Hvorfor AI betyder noget | Ledere & AI eksperter | xrNORD",
        description:
          "Hør hvordan ledere og AI eksperter arbejder med AI, forretning og fremtidens arbejdsgange.",
        keywords: ["AI interviews", "AI ledere", "AI indsigt", "erhvervs AI", "AI perspektiver"],
      },
      "why-ai-articles": {
        title: "AI-viden og artikler fra virkeligheden | xrNORD",
        description:
          "Få indsigt i hvordan virksomheder arbejder med AI i praksis gennem konkrete erfaringer, modeller og perspektiver.",
        keywords: ["AI artikler", "AI indsigt", "AI strategi", "AI implementering", "AI i praksis"],
      },
      about: {
        title: "Om xrNORD | Vi bygger virksomheder der vinder med AI",
        description:
          "xrNORD hjælper nordiske virksomheder med at integrere AI i arbejdsgange, produkter og processer.",
        keywords: ["xrNORD", "Nordisk AI virksomhed", "Skandinavisk AI", "AI rådgivning Danmark"],
      },
      contact: {
        title: "AI i jeres forretning | Lad os tage en snak | xrNORD",
        description:
          "Lad os tage en snak om hvordan AI kan styrke jeres forretning, produkter og fremtidige konkurrencekraft.",
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
