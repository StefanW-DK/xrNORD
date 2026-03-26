"use client";

import Navbar from "@/components/layout/Navbar";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function CookiePolicy() {
  const t = useTranslations("cookiePolicy");

  const sections = [
    { id: "introduction", title: t("intro.title"), content: t("intro.content") },
    { id: "what-are-cookies", title: t("whatAreCookies.title"), content: t("whatAreCookies.content") },
    { id: "necessary", title: t("necessary.title"), content: t("necessary.content") },
    { id: "analytics", title: t("analytics.title"), content: t("analytics.content") },
    { id: "marketing", title: t("marketing.title"), content: t("marketing.content") },
    { id: "manage", title: t("manage.title"), content: t("manage.content") },
    { id: "thirdparty", title: t("thirdparty.title"), content: t("thirdparty.content") },
    { id: "changes", title: t("changes.title"), content: t("changes.content") },
    { id: "contact", title: t("contact.title"), content: t("contact.content") },
  ];

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #060B14 0%, #0f1423 100%)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "120px",
        paddingBottom: "80px",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 80px", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#06B6D4",
              marginBottom: "16px",
            }}>
              {t("eyebrow")}
            </p>
            <h1 style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              color: "#F1F5F9",
              marginBottom: "20px",
            }}>
              {t("title")}
            </h1>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              lineHeight: 1.6,
              color: "rgba(148,163,184,0.7)",
              maxWidth: "700px",
            }}>
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px" }}>
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
              marginBottom: "60px",
              paddingBottom: "40px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
            id={section.id}
          >
            <h2 style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              marginBottom: "20px",
              background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {section.title}
            </h2>
            <div style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(148,163,184,0.8)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}>
              {section.content}
            </div>
          </motion.section>
        ))}

        {/* Last Updated */}
        <div style={{
          marginTop: "60px",
          padding: "24px",
          borderRadius: "14px",
          background: "rgba(6,182,212,0.05)",
          border: "1px solid rgba(6,182,212,0.1)",
        }}>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.9rem",
            color: "rgba(148,163,184,0.6)",
            margin: 0,
          }}>
            {t("lastUpdated")}: <span style={{ color: "rgba(148,163,184,0.8)", fontWeight: 500 }}>March 2025</span>
          </p>
        </div>
      </div>
    </main>
  );
}
