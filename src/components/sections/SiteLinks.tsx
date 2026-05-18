"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

export default function SiteLinks() {
  const locale = useLocale();

  const links = locale === "da" ? [
    { label: "AI Workshop",    href: `/${locale}/workshop`,      desc: "Forstå hvad AI betyder for jeres forretning" },
    { label: "AI Roadmap",     href: `/${locale}/ai-roadmap`,    desc: "En klar handlingsplan for AI i jeres forretning" },
    { label: "AI Execution",   href: `/${locale}/execution`,     desc: "Byg jeres eget AI ecosystem" },
    { label: "AI Use Cases",   href: `/${locale}/ai-use-cases`,  desc: "Se konkrete eksempler på AI i praksis" },
    { label: "Om xrNORD",      href: `/${locale}/about`,         desc: "Hvem vi er og hvad vi gør" },
    { label: "Kontakt",        href: `/${locale}/contact`,       desc: "Lad os starte en snak" },
  ] : [
    { label: "AI Workshop",    href: `/${locale}/workshop`,      desc: "Understand how AI will transform your business" },
    { label: "AI Roadmap",     href: `/${locale}/ai-roadmap`,    desc: "A clear action plan for AI in your business" },
    { label: "AI Execution",   href: `/${locale}/execution`,     desc: "Build your own Company AI ecosystem" },
    { label: "AI Use Cases",   href: `/${locale}/ai-use-cases`,  desc: "See concrete examples of AI in practice" },
    { label: "About xrNORD",   href: `/${locale}/about`,         desc: "Who we are and what we do" },
    { label: "Contact",        href: `/${locale}/contact`,       desc: "Let's start a conversation" },
  ];

  return (
    <section
      aria-label="Site navigation"
      style={{
        background: "#F8F9FB",
        borderTop: "1px solid rgba(15,23,42,0.06)",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
        padding: "48px 32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "24px",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: "12px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(15,23,42,0.07)",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124,58,237,0.25)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(124,58,237,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(15,23,42,0.07)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#0A0F1E",
                  }}>
                    {link.label}
                  </span>
                  <span style={{ color: "#7C3AED" }}><ArrowRight /></span>
                </div>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.8rem",
                  color: "#64748B",
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {link.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
