"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";

/* ── Data ──────────────────────────────────────────────── */
interface Cap {
  title: string;
  desc: string;
  hex: string;
  rgb: string;
  icon: React.ReactNode;
  area: string;
}

/* ── Card component ────────────────────────────────────── */
function Card({ cap, index }: { cap: Cap; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: 0.06 * index, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridArea: cap.area,
        position: "relative",
        padding: "28px 28px 24px",
        borderRadius: "16px",
        background: hovered
          ? `rgba(${cap.rgb}, 0.04)`
          : "rgba(255,255,255,0.03)",
        border: `1px solid rgba(${cap.rgb}, ${hovered ? 0.22 : 0.06})`,
        cursor: "default",
        transition: "all 0.4s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.2), 0 0 24px rgba(${cap.rgb}, 0.08)`
          : "0 2px 16px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: "20px", right: "20px", height: "1px",
        background: `linear-gradient(90deg, transparent, rgba(${cap.rgb}, ${hovered ? 0.4 : 0.15}), transparent)`,
        transition: "background 0.4s ease",
      }} />

      {/* Icon */}
      <div style={{
        width: "44px", height: "44px", borderRadius: "12px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `rgba(${cap.rgb}, ${hovered ? 0.15 : 0.08})`,
        border: `1px solid rgba(${cap.rgb}, ${hovered ? 0.3 : 0.12})`,
        color: cap.hex, marginBottom: "20px",
        transition: "all 0.4s ease",
      }}>
        {cap.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em",
        color: "#F1F5F9", marginBottom: "8px",
      }}>
        {cap.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.88rem", lineHeight: 1.65,
        color: "rgba(148,163,184,0.75)",
      }}>
        {cap.desc}
      </p>
    </motion.div>
  );
}

/* ── Headline gradient ─────────────────────────────────── */
const headlineGradient = {
  backgroundImage: "linear-gradient(135deg, #60A5FA 0%, #818CF8 40%, #A78BFA 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

/* ── Main Section ──────────────────────────────────────── */
export default function Capabilities() {
  const t = useTranslations("capabilities");

  const caps: Cap[] = [
    {
      title: t("strategyTitle"),
      desc: t("strategyDesc"),
      hex: "#06B6D4", rgb: "6,182,212", area: "strategy",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      title: t("bespokeTitle"),
      desc: t("bespokeDesc"),
      hex: "#8B5CF6", rgb: "139,92,246", area: "bespoke",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      ),
    },
    {
      title: t("protoTitle"),
      desc: t("protoDesc"),
      hex: "#3B82F6", rgb: "59,130,246", area: "proto",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      title: t("dataTitle"),
      desc: t("dataDesc"),
      hex: "#10B981", rgb: "16,185,129", area: "data",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" /><line x1="3" y1="20" x2="21" y2="20" />
        </svg>
      ),
    },
    {
      title: t("implTitle"),
      desc: t("implDesc"),
      hex: "#0891B2", rgb: "8,145,178", area: "impl",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="5" rx="1.5" /><rect x="2" y="13" width="20" height="5" rx="1.5" />
          <path d="M6 9v4" /><path d="M18 9v4" />
        </svg>
      ),
    },
    {
      title: t("roiTitle"),
      desc: t("roiDesc"),
      hex: "#F43F5E", rgb: "244,63,94", area: "roi",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <section style={{
      background: "linear-gradient(180deg, #0A0F1E 0%, #0D1520 40%, #0F1A2A 70%, #0A0F1E 100%)",
      padding: "120px 0 140px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.04) 1px, transparent 1px)",
        backgroundSize: "56px 56px", pointerEvents: "none",
      }} />

      {/* Top separator */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.15) 40%, rgba(148,163,184,0.15) 60%, transparent 100%)",
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 64px", padding: "0 24px" }}
      >
        <p style={{
          fontFamily: "var(--font-geist), system-ui, sans-serif",
          fontSize: "11px", fontWeight: 600, letterSpacing: "0.35em",
          textTransform: "uppercase" as const, color: "#06B6D4", marginBottom: "32px",
        }}>{t("eyebrow")}</p>

        <h2 style={{
          fontFamily: "var(--font-geist), system-ui, sans-serif",
          fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 700,
          lineHeight: 1.08, letterSpacing: "-0.035em",
          color: "#F1F5F9", marginBottom: "28px",
        }}>
          {t("headline")}<br />
          <span style={headlineGradient}>{t("headlineAccent")}</span>
        </h2>

        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "1.1rem", lineHeight: 1.7,
          color: "rgba(148,163,184,0.7)", maxWidth: "560px", margin: "0 auto",
        }}>
          {t("body")}
        </p>
      </motion.div>

      {/* Asymmetric card grid */}
      <div className="capabilities-grid">
        {caps.map((cap, i) => (
          <Card key={cap.title} cap={cap} index={i} />
        ))}
      </div>
    </section>
  );
}
