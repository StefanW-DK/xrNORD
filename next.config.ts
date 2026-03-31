import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── General pages EN ────────────────────────────────────────────────────
      { source: "/whyai",                 destination: "/en/why-ai/interviews", permanent: true },
      { source: "/ai-strategy",           destination: "/en/ai-roadmap",        permanent: true },
      { source: "/ai-workshop",           destination: "/en/workshop",           permanent: true },
      { source: "/ai-workshop-booking",   destination: "/en/book-workshop",     permanent: true },
      { source: "/usecases",              destination: "/en/ai-use-cases",      permanent: true },
      { source: "/blog",                  destination: "/en/why-ai/articles",   permanent: true },
      { source: "/about",                 destination: "/en/about",             permanent: true },
      { source: "/contact",               destination: "/en/contact",           permanent: true },

      // ── Extra EN pages found in Search Console ──────────────────────────────
      { source: "/reinvent",              destination: "/en/ai-roadmap",        permanent: true },
      { source: "/the3steps",             destination: "/en/ai-roadmap",        permanent: true },
      { source: "/blog/tags/ai-adoption", destination: "/en/why-ai/articles",  permanent: true },
      { source: "/post/how-to-choose-the-right-ai-technology-for-your-business", destination: "/en/why-ai/articles/choosing-the-right-ai", permanent: true },

      // ── General pages DA ────────────────────────────────────────────────────
      { source: "/da/whyai",              destination: "/da/why-ai/interviews", permanent: true },
      { source: "/da/ai-strategy",        destination: "/da/ai-roadmap",        permanent: true },
      { source: "/da/ai-workshop",        destination: "/da/workshop",           permanent: true },
      { source: "/da/ai-workshop-booking",destination: "/da/book-workshop",     permanent: true },
      { source: "/da/usecases",           destination: "/da/ai-use-cases",      permanent: true },
      { source: "/da/blog",               destination: "/da/why-ai/articles",   permanent: true },
      { source: "/da/about",              destination: "/da/about",             permanent: true },
      { source: "/da/contact",            destination: "/da/contact",           permanent: true },

      // ── Extra DA pages found in Search Console ──────────────────────────────
      { source: "/da/reinvent",           destination: "/da/ai-roadmap",        permanent: true },
      { source: "/da/the3steps",          destination: "/da/ai-roadmap",        permanent: true },
      { source: "/da/ai-financialauditing", destination: "/da/ai-use-cases",   permanent: true },
      { source: "/da/mainold",            destination: "/da",                   permanent: true },

      // ── Article posts EN ────────────────────────────────────────────────────
      { source: "/post/scaling-ai-from-pilot-to-production",                          destination: "/en/why-ai/articles/from-pilot-to-production",                            permanent: true },
      { source: "/post/ai-data-pipelines-etl-invisible-infrastructure",                destination: "/en/why-ai/articles/ai-pipelines",                                       permanent: true },
      { source: "/post/role-of-data-in-intelligent-systems",                          destination: "/en/why-ai/articles/the-role-of-data",                                    permanent: true },
      { source: "/post/choose-right-ai-technology-business",                          destination: "/en/why-ai/articles/choosing-the-right-ai",                              permanent: true },
      { source: "/post/governance-legal-compliance-in-ai-projects",                   destination: "/en/why-ai/articles/ai-governance",                                      permanent: true },
      { source: "/post/ai-in-your-company-where-and-how-to-begin",                    destination: "/en/why-ai/articles/getting-started-ai",                                 permanent: true },
      { source: "/post/how-ai-is-used-today-real-ai-applications-value",              destination: "/en/why-ai/articles/application-of-ai",                                  permanent: true },
      { source: "/post/key-types-of-ai-artificial-intelligence",                      destination: "/en/why-ai/articles/key-types-of-ai",                                    permanent: true },
      { source: "/post/what-is-ai-introduction-artificial-intelligence",              destination: "/en/why-ai/articles/what-is-ai",                                         permanent: true },
      { source: "/post/back-end-technologies-tools-frameworks-evolution",             destination: "/en/why-ai/articles/backend-development-technologies-tools",              permanent: true },
      { source: "/post/back-end-software-development-best-practices-cloud-future",   destination: "/en/why-ai/articles/back-end-software-development-best-practices-cloud-future", permanent: true },
      { source: "/post/front-end-software-development-technologies-evolution",        destination: "/en/why-ai/articles/front-end-software-development-technologies-evolution", permanent: true },
      { source: "/post/virtual-software-dream-teams-change-your-game-locally",        destination: "/en/why-ai/articles/virtual-software-dream-teams-change-your-game-locally", permanent: true },
      { source: "/post/history-of-software-development",                              destination: "/en/why-ai/articles/history-of-software-development",                    permanent: true },
      { source: "/post/software-development-framework-definition-importance",         destination: "/en/why-ai/articles/software-development-framework-definition-importance", permanent: true },

      // ── Article posts DA ────────────────────────────────────────────────────
      { source: "/da/post/fra-pilot-til-produktion-ai-skalering-i-praksis",           destination: "/da/why-ai/articles/from-pilot-to-production",                           permanent: true },
      { source: "/da/post/ai-datapipelines-etl-fundament-skalerbar-ai",              destination: "/da/why-ai/articles/ai-pipelines",                                       permanent: true },
      { source: "/da/post/ai-klar-data-fundament",                                   destination: "/da/why-ai/articles/the-role-of-data",                                    permanent: true },
      { source: "/da/post/vaelg-ai-teknologi-virksomhed",                             destination: "/da/why-ai/articles/choosing-the-right-ai",                              permanent: true },
      { source: "/da/post/ai-og-jura-ansvarlig-brug",                                destination: "/da/why-ai/articles/ai-governance",                                      permanent: true },
      { source: "/da/post/ai-i-jeres-virksomhed-hvor-hvordan-starte",                destination: "/da/why-ai/articles/getting-started-ai",                                 permanent: true },
      { source: "/da/post/saadan-bruges-ai-i-virkeligheden",                          destination: "/da/why-ai/articles/application-of-ai",                                  permanent: true },
      { source: "/da/post/typer-af-ai-kunstig-intelligens",                           destination: "/da/why-ai/articles/key-types-of-ai",                                    permanent: true },
      { source: "/da/post/hvad-er-ai-introduktion-kunstig-intelligens",              destination: "/da/why-ai/articles/what-is-ai",                                         permanent: true },
      { source: "/da/post/softwareudviklingsmodeller",                                destination: "/da/why-ai/articles/software-development-framework-definition-importance", permanent: true },
      { source: "/da/post/backend-teknologier-vaerktoejer-frameworks-udvikling",     destination: "/da/why-ai/articles/backend-development-technologies-tools",              permanent: true },
      { source: "/da/post/back-end-softwareudvikling-best-practices-cloud-fremtiden",destination: "/da/why-ai/articles/back-end-software-development-best-practices-cloud-future", permanent: true },
      { source: "/da/post/front-end-softwareudvikling-teknologier-udvikling",        destination: "/da/why-ai/articles/front-end-software-development-technologies-evolution", permanent: true },
      { source: "/da/post/virtuelle-remote-softwareteams-arbejdsform",               destination: "/da/why-ai/articles/history-of-software-development",                    permanent: true },
      { source: "/da/post/softwareudviklingens-historie-fra-start-til-nutidens-metoder", destination: "/da/why-ai/articles/history-of-software-development",                 permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
