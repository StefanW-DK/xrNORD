"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const ARTICLES = [
  {
    key: "pilot",
    category: "Implementation",
    categoryColor: "#DC2626",
    categoryBg: "rgba(220,38,38,0.08)",
    image: "/assets/home/articles/from-pilot-to-production.png",
    href: "#",
  },
  {
    key: "data",
    category: "Data Strategy",
    categoryColor: "#D97706",
    categoryBg: "rgba(217,119,6,0.08)",
    image: "/assets/home/articles/the-role-of-data.png",
    href: "#",
  },
  {
    key: "governance",
    category: "Governance",
    categoryColor: "#0891B2",
    categoryBg: "rgba(8,145,178,0.08)",
    image: "/assets/home/articles/ai-governance.png",
    href: "#",
  },
];

export default function Articles() {
  const t = useTranslations("articles");
  const locale = useLocale();

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        background: "#FFFFFF",
      }}
    >
      {/* Top separator */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.25) 40%, rgba(148,163,184,0.25) 60%, transparent 100%)",
        }}
      />

      {/* Very subtle warm tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-20">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-wrap items-end justify-between gap-10 mb-16"
        >
          <div className="flex-1 min-w-0" style={{ flexBasis: "min(100%, 500px)" }}>
            <p
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#7C3AED",
                marginBottom: "20px",
              }}
            >
              {t("label")}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(2.2rem, 4vw, 3.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                color: "#0A0F1E",
                marginBottom: "24px",
              }}
            >
              {t("headlineOne")}
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("headlineAccent")}
              </span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "#64748B",
                maxWidth: "520px",
              }}
            >
              {t("body")}
            </p>
          </div>

          {/* View all CTA */}
          <motion.a
            href={`/${locale}/why-ai/articles`}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#7C3AED",
              textDecoration: "none",
              letterSpacing: "0.01em",
              flexShrink: 0,
              paddingBottom: "4px",
            }}
          >
            {t("viewAll")}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Article cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {ARTICLES.map((article, i) => (
            <motion.a
              key={article.key}
              href={article.href}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -8 }}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#fff",
                border: "1px solid rgba(15,23,42,0.08)",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                textDecoration: "none",
                cursor: "pointer",
                transition: "box-shadow 0.35s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 20px 60px rgba(0,0,0,0.12), 0 6px 20px rgba(124,58,237,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)";
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  background: "#F1F5F9",
                }}
              >
                <Image
                  src={article.image}
                  alt={t(`${article.key}Title`)}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "28px 28px 32px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                {/* Category chip */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "5px 12px",
                    borderRadius: "40px",
                    background: article.categoryBg,
                    marginBottom: "16px",
                    alignSelf: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: article.categoryColor,
                    }}
                  >
                    {t(`${article.key}Category`)}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                    color: "#0A0F1E",
                    marginBottom: "12px",
                  }}
                >
                  {t(`${article.key}Title`)}
                </h3>

                {/* Excerpt */}
                <p
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    color: "#64748B",
                    flex: 1,
                    marginBottom: "24px",
                  }}
                >
                  {t(`${article.key}Excerpt`)}
                </p>

                {/* Read link */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#7C3AED",
                  }}
                >
                  {t("readMore")}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
