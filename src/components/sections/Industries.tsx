"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

/* ── Types ──────────────────────────────────────────────── */
interface IndustryBlockProps {
  title: string;
  metric: string;
  videoSrc: string;
  tintRgb: string;
  delay: number;
  dominant?: boolean;
  style?: React.CSSProperties;
}

/* ── Industry Block ─────────────────────────────────────── */
function IndustryBlock({ title, metric, videoSrc, tintRgb, delay, dominant, style }: IndustryBlockProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.72, delay, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        background: `rgba(${tintRgb}, 0.04)`,
        border: `1px solid rgba(${tintRgb}, ${hovered ? 0.24 : 0.12})`,
        boxShadow: hovered
          ? `0 28px 64px rgba(0,0,0,${dominant ? 0.16 : 0.13}), 0 10px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.5)`
          : `0 ${dominant ? "16px 48px" : "12px 40px"} rgba(0,0,0,${dominant ? 0.10 : 0.07}), 0 4px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.4)`,
        transition: "box-shadow 0.5s ease, transform 0.5s ease, border-color 0.5s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        ...style,
      }}
    >
      {/* Background video — real environment behind glass */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `grayscale(65%) contrast(1.05) brightness(${dominant ? 0.90 : 0.86})`,
          opacity: hovered ? 0.78 : (dominant ? 0.68 : 0.62),
          transition: "opacity 0.6s ease",
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Minimal text-area gradient only — not a full wash */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "55%",
          background: `linear-gradient(to top, rgba(248,250,252,0.95) 0%, rgba(248,250,252,0.7) 40%, transparent 100%)`,
        }}
      />

      {/* Tinted corner accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "40%",
          height: "40%",
          background: `radial-gradient(ellipse at 0% 100%, rgba(${tintRgb}, 0.12) 0%, transparent 70%)`,
        }}
      />

      {/* Top-edge glass highlight */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: dominant ? "32px 30px 28px" : "28px 26px 24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: dominant ? "1.25rem" : "1.12rem",
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            color: "#0A0F1E",
            marginBottom: "8px",
            textShadow: "0 1px 3px rgba(255,255,255,0.7)",
          }}
        >
          {title}
        </h3>

        <motion.p
          animate={{ opacity: hovered ? 1 : 0.92 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: dominant ? "0.88rem" : "0.84rem",
            fontWeight: 700,
            color: `rgb(${tintRgb})`,
            letterSpacing: "0.01em",
            textShadow: "0 1px 2px rgba(255,255,255,0.5)",
          }}
        >
          {metric}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ── Headline gradient — soft violet/lavender ────────── */
const headlineGradient = {
  backgroundImage: "linear-gradient(135deg, #8B5CF6, #A78BFA, #7C3AED)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

/* ── Main Section ───────────────────────────────────────── */
export default function Industries() {
  return (
    <section
      style={{
        background: "linear-gradient(162deg, #F8FAFC 0%, #F0F4F8 60%, #F8FAFC 100%)",
        padding: "140px 0 160px",
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
          background: "linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.2) 40%, rgba(148,163,184,0.2) 60%, transparent 100%)",
        }}
      />

      {/* Faint dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* Ambient violet wash */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "50%",
          height: "60%",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="industries-grid">

        {/* ── LEFT: Text block ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ maxWidth: "440px", paddingTop: "40px", marginRight: "auto" }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              color: "#8B5CF6",
              marginBottom: "36px",
            }}
          >
            Across Industries
          </p>

          <h2
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(2.5rem, 4.2vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.034em",
              color: "#0F172A",
              marginBottom: "36px",
            }}
          >
            <span style={headlineGradient}>Real Impact.</span>
            <br />
            Started Simply
          </h2>

          <div
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.82,
              color: "#64748B",
              marginBottom: "40px",
            }}
          >
            <p style={{ marginBottom: "18px" }}>
              We&apos;ve done this across industries.
            </p>
            <p style={{ marginBottom: "18px" }}>
              Some journeys start with proven standards.
              <br />
              Others become something entirely your own.
            </p>
            <p style={{ marginBottom: "18px" }}>
              You don&apos;t need to see the full picture.
              <br />
              It doesn&apos;t need to be complex.
            </p>
            <p style={{ fontWeight: 600, color: "#1E293B", letterSpacing: "-0.01em" }}>
              We start where you are.
            </p>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/usecases"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "1.15rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "#6D28D9",
                textDecoration: "none",
                padding: "12px 0",
              }}
            >
              Explore AI Use Cases
              <svg
                width="20"
                height="20"
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
            </Link>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Asymmetric video cluster ──────────────────────────────── */}
        <div
          style={{
            position: "relative",
            maxWidth: "620px",
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Row 1 — Education dominant, anchored left */}
          <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: "16px" }}>
            <IndustryBlock
              title="Education & Knowledge"
              metric="+20% pass rate"
              videoSrc="/assets/home/industries/education.mp4"
              tintRgb="59, 130, 246"
              delay={0.1}
              dominant
              style={{ width: "440px", minHeight: "232px" }}
            />
          </div>

          {/* Row 2 — Accounting + Software, asymmetric widths */}
          <div style={{ display: "flex", gap: "16px" }}>
            <IndustryBlock
              title="Accounting & Finance"
              metric="3,500+ hours saved"
              videoSrc="/assets/home/industries/accounting.mp4"
              tintRgb="124, 58, 237"
              delay={0.18}
              style={{ width: "272px", minHeight: "232px", flexShrink: 0 }}
            />
            <IndustryBlock
              title="Revitalizing Apps & Software"
              metric="Extended product lifecycle"
              videoSrc="/assets/home/industries/software.mp4"
              tintRgb="6, 182, 212"
              delay={0.26}
              style={{ flex: 1, minHeight: "232px" }}
            />
          </div>

          {/* Row 3 — Travel, offset right */}
          <div style={{ display: "flex", justifyContent: "center", paddingLeft: "56px" }}>
            <IndustryBlock
              title="Travel & Leisure"
              metric="+15% increase in visitors"
              videoSrc="/assets/home/industries/travel.mp4"
              tintRgb="20, 184, 166"
              delay={0.34}
              style={{ width: "400px", minHeight: "210px" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
