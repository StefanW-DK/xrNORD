"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const LINKEDIN_URL =
  "https://www.linkedin.com/posts/first-coffee-aps_ai-digitaltransformation-turismedanmark-activity-7429496854247006208-yvGI?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAA-ZoYB-Zq8sch97Yo_udqm9GnCuEUr3ro";

export default function News() {
  const t = useTranslations("news");

  return (
    <section
      style={{
        background: "linear-gradient(160deg, #F0FDF4 0%, #F8FAFC 50%, #ECFDF5 100%)",
        padding: "120px 0 140px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top separator */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.2) 40%, rgba(16,185,129,0.2) 60%, transparent 100%)",
        }}
      />

      {/* Faint dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(16,185,129,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* Ambient green glow top-left */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "45%",
          height: "70%",
          background:
            "radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 80px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ marginBottom: "56px" }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#10B981",
              marginBottom: "16px",
            }}
          >
            {t("label")}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#0F172A",
            }}
          >
            {t("headline")}
          </h2>
        </motion.div>

        {/* Card */}
        <motion.a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ y: -6 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderRadius: "24px",
            overflow: "hidden",
            background: "#fff",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
            border: "1px solid rgba(16,185,129,0.15)",
            textDecoration: "none",
            cursor: "pointer",
            transition: "box-shadow 0.4s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 32px 80px rgba(0,0,0,0.12), 0 12px 32px rgba(16,185,129,0.1), inset 0 1px 0 rgba(255,255,255,0.9)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 20px 60px rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)";
          }}
        >
          {/* Left — text content */}
          <div
            style={{
              padding: "52px 52px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #10B981, #06B6D4)",
                borderRadius: "0 0 0 0",
              }}
            />

            <div>
              {/* Partner badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 14px",
                  borderRadius: "40px",
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#10B981",
                    flexShrink: 0,
                    boxShadow: "0 0 6px rgba(16,185,129,0.6)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#059669",
                    letterSpacing: "0.01em",
                  }}
                >
                  {t("badge")}
                </span>
              </div>

              {/* Headline */}
              <h3
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "clamp(1.3rem, 2vw, 1.65rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.25,
                  color: "#0F172A",
                  marginBottom: "20px",
                }}
              >
                {t("cardHeadline")}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "#475569",
                  marginBottom: "40px",
                }}
              >
                {t("cardBody")}
              </p>
            </div>

            {/* CTA row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "32px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#059669",
                }}
              >
                {t("cta")}
                <svg
                  width="16"
                  height="16"
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
              </span>

              {/* First Coffee logo */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: 0.45,
                }}
              >
                <Image
                  src="/assets/home/news/first-coffee-logo.png"
                  alt="First Coffee"
                  width={100}
                  height={36}
                  style={{ objectFit: "contain", objectPosition: "left" }}
                />
              </div>
            </div>
          </div>

          {/* Right — photo */}
          <div
            style={{
              position: "relative",
              minHeight: "380px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f5f5f5",
            }}
          >
            <Image
              src="/assets/home/news/first-coffee-photo.png"
              alt="First Coffee & xrNORD partnership"
              width={800}
              height={800}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </motion.a>
      </div>
    </section>
  );
}
