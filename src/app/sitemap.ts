import { MetadataRoute } from "next";

const BASE_URL = "https://xrnord.com";

const ARTICLE_SLUGS = [
  "from-pilot-to-production",
  "ai-pipelines",
  "the-role-of-data",
  "choosing-the-right-ai",
  "ai-governance",
  "getting-started-ai",
  "application-of-ai",
  "key-types-of-ai",
  "what-is-ai",
  "backend-development-technologies-tools",
  "back-end-software-development-best-practices-cloud-future",
  "front-end-software-development-technologies-evolution",
  "virtual-software-dream-teams-change-your-game-locally",
  "history-of-software-development",
  "software-development-framework-definition-importance",
];

const STATIC_PAGES = [
  { path: "", priority: 1.0 },
  { path: "/workshop", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/ai-roadmap", priority: 0.8 },
  { path: "/ai-use-cases", priority: 0.8 },
  { path: "/why-ai/interviews", priority: 0.7 },
  { path: "/why-ai/articles", priority: 0.7 },
  { path: "/about", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages for both locales
  for (const locale of ["en", "da"] as const) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page.priority,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${page.path}`,
            da: `${BASE_URL}/da${page.path}`,
          },
        },
      });
    }
  }

  // Article pages for both locales
  for (const locale of ["en", "da"] as const) {
    for (const slug of ARTICLE_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${locale}/why-ai/articles/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.65,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/why-ai/articles/${slug}`,
            da: `${BASE_URL}/da/why-ai/articles/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}
