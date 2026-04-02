"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const LINKEDIN_URL =
  "https://www.linkedin.com/posts/first-coffee-aps_ai-digitaltransformation-turismedanmark-activity-7429496854247006208-yvGI?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAA-ZoYB-Zq8sch97Yo_udqm9GnCuEUr3ro";

const headlineGradient = {
  backgroundImage:
    "linear-gradient(135deg, #22D3EE 0%, #38BDF8 50%, #818CF8 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

export default function News() {
  const t = useTranslations("news");

  return (
    <section
      aria-label="Latest xrNORD news"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "clamp(600px, 68vh, 800px)",
        display: "flex",
        alignItems: "center",
        /* Layered dark base — not flat black */
        background:
          "linear-gradient(168deg, #060A16 0%, #080D1A 35%, #0A1020 65%, #070C18 100%)",
      }}
    >
      {/* ── Ambient radial glow behind text zone ────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "-8%",
          width: "50%",
          height: "80%",
          background:
            "radial-gradient(ellipse at 40% 50%, rgba(6,182,212,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Image container — right 58%, preserves proportions ──────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "58%",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <Image
          src="/assets/home/news/first-coffee-photo.png"
          alt="First Coffee & xrNORD partnership"
          fill
          priority={false}
          style={{
            objectFit: "cover",
            objectPosition: "center 15%",
            filter:
              "grayscale(50%) brightness(0.6) contrast(1.06) saturate(0.75)",
          }}
        />

        {/* Layer 1 — Left dissolve into section background (wide, smooth) */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #070C18 0%, rgba(7,12,24,0.96) 6%, rgba(7,12,24,0.88) 13%, rgba(7,12,24,0.72) 22%, rgba(7,12,24,0.48) 32%, rgba(7,12,24,0.26) 42%, rgba(7,12,24,0.1) 52%, transparent 65%)",
          }}
        />

        {/* Layer 2 — Top / bottom edge vignette */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(6,10,22,0.55) 0%, transparent 18%, transparent 78%, rgba(6,10,22,0.6) 100%)",
          }}
        />

        {/* Layer 3 — Radial vignette centered on face area */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 55% 35%, transparent 30%, rgba(6,10,22,0.35) 80%)",
          }}
        />

        {/* Layer 4 — xrNORD deep-navy / faint violet tint cast */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(150deg, rgba(8,20,50,0.22) 0%, rgba(88,80,160,0.04) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* (seam removed — clean transition) */}

      {/* ── Top hairline ────────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.1) 30%, rgba(148,163,184,0.1) 70%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* ── Bottom hairline ─────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.07) 35%, rgba(148,163,184,0.07) 65%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* ════════════════════════════════════════════════════════════════
          Text — positioned over the dark left portion
      ════════════════════════════════════════════════════════════════ */}
      <div className="news-text-col" style={{ position: "relative", zIndex: 3 }}>
        {/* ── Section header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 0.03, 0.26, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(1.75rem, 3.4vw, 3.1rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              ...headlineGradient,
            }}
          >
            {t("headline")}
          </h2>
        </motion.div>

        {/* ── Featured announcement ──────────────────────────────── */}
        <motion.a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: [0.22, 0.03, 0.26, 1],
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(20px, 2.2vw, 28px)",
            textDecoration: "none",
            cursor: "pointer",
          }}
          className="news-announcement-link"
        >
          {/* Badge — quiet, structural */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#10B981",
                flexShrink: 0,
                boxShadow: "0 0 6px rgba(16,185,129,0.5)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(0.7rem, 0.7vw, 0.85rem)",
                fontWeight: 600,
                color: "rgba(16,185,129,0.8)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {t("badge")}
            </span>
          </div>

          {/* Headline */}
          <h3
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(1.25rem, 2.2vw, 1.9rem)",
              fontWeight: 650,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              color: "#E2E8F0",
            }}
          >
            {t("cardHeadline")}
          </h3>

          {/* Body */}
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "clamp(0.94rem, 1.05vw, 1.1rem)",
              lineHeight: 1.7,
              color: "rgba(148,163,184,0.65)",
              maxWidth: "40ch",
            }}
          >
            {t("cardBody")}
          </p>

          {/* CTA row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
              paddingTop: "6px",
            }}
          >
            <span
              className="news-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "clamp(0.75rem, 0.75vw, 0.88rem)",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#06B6D4",
              }}
            >
              {t("cta")}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>

            {/* Partner mark */}
            <div style={{ opacity: 0.25, filter: "brightness(10) grayscale(1)" }}>
              <Image
                src="/assets/home/news/first-coffee-logo.png"
                alt="First Coffee"
                width={100}
                height={36}
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
