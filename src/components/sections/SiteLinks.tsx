import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

/**
 * SiteLinks — visually hidden nav for search engine sitelinks signal.
 * Fully present in HTML (crawlable), invisible to users.
 * Uses the standard SR-only / visually-hidden pattern (not display:none).
 */
export default async function SiteLinks() {
  const locale = await getLocale();
  const t = await getTranslations("siteLinks");

  const links = [
    { href: `/${locale}/workshop`,      label: t("workshopLabel"),  description: t("workshopDesc") },
    { href: `/${locale}/ai-roadmap`,    label: t("roadmapLabel"),   description: t("roadmapDesc") },
    { href: `/${locale}/execution`,     label: t("executionLabel"), description: t("executionDesc") },
    { href: `/${locale}/ai-use-cases`,  label: t("useCasesLabel"),  description: t("useCasesDesc") },
    { href: `/${locale}/about`,         label: t("aboutLabel"),     description: t("aboutDesc") },
    { href: `/${locale}/contact`,       label: t("contactLabel"),   description: t("contactDesc") },
  ];

  return (
    <nav
      aria-label={t("navAriaLabel")}
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>
              {l.label} — {l.description}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
