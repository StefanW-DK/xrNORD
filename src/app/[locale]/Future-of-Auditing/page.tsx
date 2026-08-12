"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { motion, animate, useInView } from "framer-motion";
import { useLocale } from "next-intl";

/* ─── Motion variants ──────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Counter — counts 0 → target when scrolled into view ──────────────── */
function Counter({
  to,
  duration = 2.2,
  format = "int",
  locale = "da",
}: {
  to: number;
  duration?: number;
  format?: "int" | "thousands";
  locale?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const rounded = Math.round(value);
  const display =
    format === "thousands"
      ? rounded.toLocaleString(locale === "da" ? "da-DK" : "en-US")
      : rounded.toString();

  return <span ref={ref}>{display}</span>;
}

/* ─── ProgressRing — animated circular progress (per-instance gradient) ── */
function ProgressRing({
  percent,
  size = 220,
  strokeWidth = 10,
  colors = ["#A855F7", "#818CF8", "#22D3EE"],
  glow = "rgba(168,85,247,0.45)",
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  colors?: [string, string, string];
  glow?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference * (1 - percent / 100);
  const [offset, setOffset] = useState(circumference);
  const uid = useId().replace(/:/g, "");
  const gradId = `ringGrad-${uid}`;

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setOffset(targetOffset), 60);
    return () => clearTimeout(t);
  }, [inView, targetOffset]);

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      style={{ display: "block", transform: "rotate(-90deg)" }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="50%" stopColor={colors[1]} />
          <stop offset="100%" stopColor={colors[2]} />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: "stroke-dashoffset 2.2s cubic-bezier(0.16, 1, 0.3, 1)",
          filter: `drop-shadow(0 0 12px ${glow})`,
        }}
      />
    </svg>
  );
}

/* ─── RangeBar — animated horizontal bar (with min/max markers) ────────── */
function RangeBar({
  from,
  to,
  max = 100,
  height = 14,
}: {
  from: number;
  to: number;
  max?: number;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const fromPct = (from / max) * 100;
  const toPct = (to / max) * 100;

  return (
    <div ref={ref} style={{ width: "100%" }}>
      {/* Track */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        {/* Gradient range fill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${fromPct}%`,
            width: inView ? `${toPct - fromPct}%` : 0,
            background: "linear-gradient(90deg, #A855F7, #818CF8, #22D3EE)",
            borderRadius: 999,
            transition: "width 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            boxShadow: "0 0 24px rgba(129,140,248,0.45)",
          }}
        />
        {/* Soft pre-range fill to show "we're already at 25%" */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: inView ? `${fromPct}%` : 0,
            background: "linear-gradient(90deg, rgba(168,85,247,0.18), rgba(129,140,248,0.18))",
            borderRadius: 999,
            transition: "width 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        />
      </div>
      {/* Scale */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.40)",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

/* ─── Shared CTA pair ──────────────────────────────────────────────────── */
function CtaPair({ locale }: { locale: string }) {
  const primaryLabel = locale === "da" ? "Find ud af hvad AI kan gøre for jer" : "Discover what AI can do for you";
  const secondaryLabel = locale === "da" ? "Deltag i vores AI workshop" : "Join our AI workshop";

  const primaryStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "16px 30px",
    borderRadius: 999,
    background: "linear-gradient(135deg, #A855F7, #818CF8)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    textDecoration: "none",
    fontFamily: "var(--font-geist), system-ui, sans-serif",
    boxShadow: "0 12px 36px rgba(124,111,212,0.35)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const secondaryStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "15px 28px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.95)",
    border: "1px solid rgba(255,255,255,0.22)",
    fontSize: 15,
    fontWeight: 500,
    textDecoration: "none",
    fontFamily: "var(--font-geist), system-ui, sans-serif",
    transition: "background 0.2s ease, transform 0.2s ease",
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
      <Link href={`/${locale}/contact`} style={primaryStyle}>
        {primaryLabel} <span aria-hidden>→</span>
      </Link>
      <Link href={`/${locale}/workshop`} style={secondaryStyle}>
        {secondaryLabel}
      </Link>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   HERO — Financial Auditing × AI
   Semantic structure (matches workshop/AI Roadmap pattern):
     • <h2> = visually dominant headline (design weight)
     • <h1> = SEO primary heading, styled as supporting subline
   ════════════════════════════════════════════════════════════════════════ */
function Hero({ locale }: { locale: string }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "clamp(120px, 14vw, 180px) clamp(24px, 6vw, 160px) clamp(80px, 10vw, 140px)",
        background: "linear-gradient(155deg, #04060F 0%, #080C1A 30%, #0F0D28 60%, #160D35 100%)",
        overflow: "hidden",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        display: "flex",
        alignItems: "center",
      }}
      className="fa-hero"
      aria-label={locale === "da" ? "Finansiel revision og AI - introduktion" : "Financial auditing and AI - introduction"}
    >
      {/* Background video — subtle, layered under dark overlay */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.65,
          pointerEvents: "none",
        }}
      >
        {/* TODO: swap to bespoke Kling video once delivered */}
        <source src="/assets/home/Workshop/workshop_hero_movie.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — keeps text sharp, adds deep purple tint */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(4,6,15,0.68) 0%, rgba(8,6,25,0.72) 50%, rgba(22,13,53,0.70) 100%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Bottom fade into next section */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
        background: "linear-gradient(0deg, rgba(4,6,15,0.98) 0%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Thin gradient top border */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.7) 30%, rgba(34,211,238,0.7) 70%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 2,
      }} />

      {/* Purple bloom — upper right */}
      <div aria-hidden style={{
        position: "absolute", top: "-25%", right: "-10%",
        width: "70%", height: "100%",
        background: "radial-gradient(ellipse at top right, rgba(168,85,247,0.28) 0%, rgba(99,102,241,0.10) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Teal bloom — lower left */}
      <div aria-hidden style={{
        position: "absolute", bottom: "-15%", left: "-8%",
        width: "55%", height: "65%",
        background: "radial-gradient(circle, rgba(34,211,238,0.20) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Pink accent — centre right */}
      <div aria-hidden style={{
        position: "absolute", top: "30%", right: "5%",
        width: "40%", height: "50%",
        background: "radial-gradient(ellipse, rgba(232,121,249,0.10) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Diagonal light ray */}
      <div aria-hidden style={{
        position: "absolute", top: "18%", left: "-10%",
        width: "120%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.12) 35%, rgba(34,211,238,0.12) 65%, transparent)",
        transform: "rotate(-6deg)",
        pointerEvents: "none",
      }} />

      {/* Grid lines */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 90% 70% at 55% 45%, black 20%, transparent 75%)",
        pointerEvents: "none",
      }} />

      {/* Grain texture */}
      <div aria-hidden className="fa-noise" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          position: "relative", zIndex: 3,
          width: "100%", margin: "0 auto",
          paddingLeft: "clamp(0px, 3vw, 80px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
          gap: "clamp(40px, 6vw, 120px)",
          alignItems: "center",
        }}
        className="fa-grid"
      >
        {/* ── Left: text column ── */}
        <div style={{ paddingLeft: "clamp(0px, 4vw, 100px)" }} className="fa-hero-left">
          {/* Eyebrow pill */}
          <motion.div variants={fadeUp} style={{ margin: "0 0 36px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.38)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
              textTransform: "uppercase" as const, color: "#C084FC",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#A855F7,#22D3EE)", display: "inline-block", flexShrink: 0 }} />
              {locale === "da" ? "Finansiel revision × AI" : "Financial auditing × AI"}
            </span>
          </motion.div>

          {/* Visual headline — H2 for design, SEO weight carried by H1 below */}
          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: "clamp(3rem, 5vw, 6rem)",
              fontWeight: 800, lineHeight: 1.0,
              letterSpacing: "-0.03em", color: "#fff", margin: "0 0 28px",
            }}
            className="fa-h2"
          >
            {locale === "da" ? "AI vil forvandle revision." : "AI will reshape auditing."}
            <br />
            <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.38)" }}>
              {locale === "da" ? "Lad det blive " : "Let it become "}
            </span>
            <span style={{
              background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              fontWeight: 800,
            }}>
              {locale === "da" ? "jeres styrke." : "your edge."}
            </span>
          </motion.h2>

          {/* Thin gradient rule */}
          <motion.div variants={fadeUp} style={{ margin: "0 0 28px" }}>
            <div style={{ width: 52, height: 1, background: "linear-gradient(90deg, #A855F7, #22D3EE)" }} />
          </motion.div>

          {/* H1 — SEO primary heading, styled as supporting subline */}
          <motion.h1
            variants={fadeUp}
            className="fa-h1-subline"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.88)",
              maxWidth: 650,
              margin: "0 0 52px",
              letterSpacing: 0,
            }}
          >
            {locale === "da"
              ? "Branchen står over for sin største transformation i en generation, kom med på rejsen og forbliv konkurrencedygtige om 5 år."
              : "The profession faces its greatest transformation in a generation, join the journey and stay competitive for the next 5 years."}
          </motion.h1>

          <motion.div variants={fadeUp}>
            <CtaPair locale={locale} />
          </motion.div>
        </div>

        {/* ── Right: stat column ── */}
        <motion.div
          variants={fadeUp}
          style={{ position: "relative", paddingLeft: 56 }}
          className="fa-stat-col"
        >
          {/* Vertical accent line */}
          <div aria-hidden style={{
            position: "absolute", left: 0, top: "5%", bottom: "5%", width: 1,
            background: "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.7) 25%, rgba(34,211,238,0.7) 75%, transparent 100%)",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* 1. Label */}
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase" as const, color: "rgba(255,255,255,0.50)", margin: "0 0 20px",
            }}>
              IDC · Februar 2026
            </p>

            {/* 2. Big 76% — the hero stat */}
            <p style={{
              fontSize: "clamp(7rem, 11.7vw, 14rem)",
              fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.06em",
              margin: "0 0 28px",
              background: "linear-gradient(135deg, rgba(168,85,247,0.95) 0%, rgba(129,140,248,0.90) 50%, rgba(34,211,238,0.88) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              76%
            </p>

            {/* 3. Description */}
            <p style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.6,
              color: "rgba(255,255,255,0.95)", maxWidth: 380, margin: "0 0 24px",
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
            }}>
              {locale === "da"
                ? "Af revisorer forventer, at AI fundamentalt vil forandre revision inden for de næste 10 år."
                : "Of auditors expect AI to fundamentally reshape audit within the next 10 years."}
            </p>

            {/* 4. Source */}
            <p style={{
              fontSize: 11, color: "rgba(255,255,255,0.40)", margin: 0, lineHeight: 1.6,
              fontFamily: "var(--font-inter), system-ui, sans-serif", letterSpacing: "0.02em",
              maxWidth: 380,
            }}>
              {locale === "da"
                ? "Kilde: IDC, The Future of Audit and Accounting in the AI Era, 2026"
                : "Source: IDC, The Future of Audit and Accounting in the AI Era, 2026"}
            </p>
          </div>
        </motion.div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
.fa-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
@media (max-width: 900px) {
  .fa-grid { grid-template-columns: 1fr !important; padding-left: 0 !important; }
  .fa-hero-left { padding-left: 0 !important; }
  .fa-stat-col { padding-left: 0 !important; padding-top: 48px !important; border-top: 1px solid rgba(168,85,247,0.3) !important; }
}
      ` }} />
    </section>
  );
}

/* ─── MetricColumn — editorial column (index ↓ ring+number ↓ statement) ── */
function MetricColumn({
  index,
  percent,
  ringColors,
  ringGlow,
  numberGradient,
  accent,
  statement,
  delay = 0,
}: {
  index: string;
  percent: number;
  ringColors: [string, string, string];
  ringGlow: string;
  numberGradient: string;
  accent: string;
  statement: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "clamp(24px, 3vw, 40px) clamp(8px, 1.5vw, 20px)",
      }}
      className="fa-metric-col"
    >
      {/* Soft column-specific glow behind the ring */}
      <div aria-hidden style={{
        position: "absolute",
        top: "8%", left: "50%", transform: "translateX(-50%)",
        width: "85%", height: "55%",
        background: `radial-gradient(circle at center, ${ringGlow} 0%, transparent 65%)`,
        opacity: 0.35, filter: "blur(50px)",
        pointerEvents: "none",
      }} />

      {/* Editorial index row */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", alignItems: "center", gap: 14,
        marginBottom: 32,
        fontFamily: "var(--font-geist), system-ui, sans-serif",
      }}>
        <span aria-hidden style={{
          width: 28, height: 1,
          background: `linear-gradient(90deg, transparent, ${accent})`,
        }} />
        <span style={{
          fontSize: 12, fontWeight: 700, letterSpacing: "0.28em",
          color: accent,
        }}>
          {index}
        </span>
        <span aria-hidden style={{
          width: 28, height: 1,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }} />
      </div>

      {/* Ring with big animated number centred inside */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: 32 }}>
        <ProgressRing percent={percent} size={220} strokeWidth={9} colors={ringColors} glow={ringGlow} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            fontSize: "clamp(2.5rem, 3.3vw, 4rem)",
            fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1,
            background: numberGradient,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
          }}>
            <Counter to={percent} duration={2.2} />%
          </span>
        </div>
      </div>

      {/* Statement — left-aligned block, centered horizontally in column,
          with a small left padding so it visually aligns under the ring's centre */}
      <p style={{
        position: "relative", zIndex: 1,
        fontSize: "clamp(0.98rem, 1.15vw, 1.1rem)", lineHeight: 1.6,
        color: "rgba(255,255,255,0.82)",
        margin: "0 auto",
        textAlign: "left",
        fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
        maxWidth: 380,
        paddingLeft: "clamp(16px, 1.6vw, 28px)",
        boxSizing: "border-box",
      }}>
        {statement}
      </p>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION 2 — RAPPORTEN I TAL
   Three stacked metric rows from the IDC report. Each row: animated
   progress ring + percentage + statement + (rows 2-3) supporting quotes.
   Source: IDC's Future of Audit and Accounting in the AI Era Survey, Dec 2025.
   ════════════════════════════════════════════════════════════════════════ */
function ReportMetrics({ locale }: { locale: string }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
        background: "linear-gradient(180deg, #04060F 0%, #070A1F 50%, #04060F 100%)",
        overflow: "hidden",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
      }}
      className="fa-metrics"
      aria-label={locale === "da" ? "Rapporten i tal" : "The report in numbers"}
    >
      {/* Subtle background glows */}
      <div aria-hidden style={{
        position: "absolute", top: "10%", left: "-10%", width: "50%", height: "60%",
        background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "5%", right: "-10%", width: "50%", height: "60%",
        background: "radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      {/* Top hairline */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 10%, rgba(168,85,247,0.40) 50%, transparent 90%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* Header — centered */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            maxWidth: 980,
            marginBottom: "clamp(60px, 8vw, 100px)",
            marginLeft: "auto", marginRight: "auto",
            textAlign: "center",
          }}
        >

          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: "-0.03em", color: "#fff", margin: "0 0 24px",
            }}
          >
            <span style={{ color: "#fff" }}>
              {locale === "da" ? "Tallene er tydelige" : "The numbers are clear"}
            </span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              {locale === "da" ? "Jeres konkurrenter er igang" : "Your competitors are already moving"}
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.65,
              color: "rgba(255,255,255,0.65)", maxWidth: 1000,
              margin: "0 auto",
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
            }}
          >
            {locale === "da" ? (
              <>
                IDC har spurgt 1.005 revisorer globalt. Konklusionen efterlader ingen tvivl om,
                <br className="fa-lead-break" />
                {" "}at branchen står foran en fundamental forandring, og at{" "}
                <span style={{ color: "#fff", fontWeight: 500 }}>vinduet for at handle er nu.</span>
              </>
            ) : (
              <>
                IDC surveyed 1,005 auditors globally. The conclusion leaves no doubt:
                <br className="fa-lead-break" />
                {" "}the profession faces fundamental change, and{" "}
                <span style={{ color: "#fff", fontWeight: 500 }}>the window to act is now.</span>
              </>
            )}
          </motion.p>
        </motion.div>

        {/* Editorial 3-column grid — index → ring(num) → statement ↓ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(20px, 2.5vw, 48px)",
            alignItems: "start",
            position: "relative",
          }}
          className="fa-metric-grid"
        >
          {/* Thin vertical dividers between columns */}
          <div aria-hidden style={{
            position: "absolute", left: "33.33%", top: "8%", bottom: "8%", width: 1,
            background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)",
          }} className="fa-metric-divider" />
          <div aria-hidden style={{
            position: "absolute", left: "66.66%", top: "8%", bottom: "8%", width: 1,
            background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)",
          }} className="fa-metric-divider" />

          {/* ── 01 · 66% — AI initiatives underway ── */}
          <MetricColumn
            index="01"
            percent={66}
            ringColors={["#A855F7", "#818CF8", "#22D3EE"]}
            ringGlow="rgba(168,85,247,0.55)"
            numberGradient="linear-gradient(135deg, #A855F7, #818CF8, #22D3EE)"
            accent="#C084FC"
            statement={
              locale === "da"
                ? "Har allerede AI-initiativer i gang, hvad enten det er pilotprojekter, bred funktionsanvendelse eller AI indlejret i den overordnede strategi."
                : "Already have AI initiatives underway, whether pilot projects, broad functional use, or AI embedded in their overall strategy."
            }
            delay={0}
          />

          {/* ── 02 · 67% — profession needs fundamental rethink ── */}
          <MetricColumn
            index="02"
            percent={67}
            ringColors={["#818CF8", "#22D3EE", "#7DD3FC"]}
            ringGlow="rgba(129,140,248,0.55)"
            numberGradient="linear-gradient(135deg, #818CF8, #22D3EE, #7DD3FC)"
            accent="#7DD3FC"
            statement={
              locale === "da"
                ? "Mener, at professionen har brug for en fundamental gentænkning af, hvordan arbejdet udføres i en AI-drevet verden."
                : "Believe the profession needs a fundamental rethink of how work is done in an AI-driven world."
            }
            delay={0.1}
          />

          {/* ── 03 · 28% — feel fully prepared ── */}
          <MetricColumn
            index="03"
            percent={28}
            ringColors={["#E879F9", "#A855F7", "#7C3AED"]}
            ringGlow="rgba(232,121,249,0.55)"
            numberGradient="linear-gradient(135deg, #E879F9, #A855F7, #7C3AED)"
            accent="#F0ABFC"
            statement={
              locale === "da"
                ? "Føler sig fuldt forberedte på AI-transformationen. Det efterlader 3 ud af 4 revisorer i uvished om fremtiden."
                : "Feel fully prepared for the AI transformation. That leaves 3 in 4 auditors uncertain about what comes next."
            }
            delay={0.2}
          />
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
@media (max-width: 900px) {
  .fa-metric-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  .fa-metric-divider { display: none !important; }
  .fa-lead-break { display: none !important; }
}
      ` }} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION — BARRIERER (WIP — placed at end, order TBD)
   De største barrierer for AI-adoption i Revisionsbranchen
   ════════════════════════════════════════════════════════════════════════ */
function BarriersSection({ locale }: { locale: string }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
        background: "#04060F",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Soft atmospheric glows */}
      <div aria-hidden style={{
        position: "absolute", top: "5%", left: "5%",
        width: "40%", height: "55%",
        background: "radial-gradient(ellipse at center, rgba(168,85,247,0.12) 0%, transparent 65%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "5%", right: "5%",
        width: "45%", height: "60%",
        background: "radial-gradient(ellipse at center, rgba(34,211,238,0.10) 0%, transparent 65%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ maxWidth: 1000, marginBottom: "clamp(80px, 10vw, 120px)" }}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(168,85,247,0.10)", border: "1px solid rgba(168,85,247,0.35)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
              textTransform: "uppercase" as const, color: "#C4B5FD",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#A78BFA,#E879F9)", display: "inline-block", flexShrink: 0 }} />
              {locale === "da" ? "En ærlig vurdering" : "An honest assessment"}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: "clamp(1.8rem, 2.8vw, 3.4rem)",
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: "-0.03em", color: "#fff", margin: 0,
              maxWidth: 920,
            }}
          >
            {locale === "da" ? (
              <>
                De største barrierer for AI-adoption i{" "}
                <span style={{
                  background: "linear-gradient(135deg, #A78BFA, #818CF8, #22D3EE)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>Revisionsbranchen</span>
              </>
            ) : (
              <>
                The greatest barriers to AI adoption in the{" "}
                <span style={{
                  background: "linear-gradient(135deg, #A78BFA, #818CF8, #22D3EE)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>audit industry</span>
              </>
            )}
          </motion.h2>
        </motion.div>

        {/* Two big metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 5vw, 80px)",
            alignItems: "start",
            position: "relative",
            marginBottom: "clamp(120px, 15vw, 180px)",
          }}
          className="fa-barriers-stats"
        >
          <div aria-hidden />
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 7vw, 88px)" }}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
              <p style={{
                fontSize: "clamp(4rem, 5.8vw, 7rem)",
                fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.05em", margin: "0 0 20px",
                background: "linear-gradient(135deg, #818CF8, #22D3EE, #7DD3FC)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
              }}>
                <Counter to={34} duration={2.0} />%
              </p>
              <p style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.45rem)", fontWeight: 700, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.01em" }}>
                {locale === "da" ? "Implementeringsomkostninger" : "Cost of implementation"}
              </p>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "rgba(255,255,255,0.62)", margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300, fontStyle: "italic", maxWidth: 480 }}>
                {locale === "da"
                  ? "“Høje implementeringsomkostninger kan gøre det udfordrende for firmaer at omfavne AI fuldt ud.”"
                  : "“High implementation costs can make it challenging for firms to fully embrace AI.”"}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.12 }}>
              <p style={{
                fontSize: "clamp(4rem, 5.8vw, 7rem)",
                fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.05em", margin: "0 0 20px",
                background: "linear-gradient(135deg, #22D3EE, #7DD3FC, #A5F3FC)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
              }}>
                <Counter to={30} duration={2.0} />%
              </p>
              <p style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.45rem)", fontWeight: 700, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.01em" }}>
                {locale === "da" ? "Mangel på teknisk talent" : "Lack of technical talent"}
              </p>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "rgba(255,255,255,0.62)", margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300, fontStyle: "italic", maxWidth: 480 }}>
                {locale === "da"
                  ? "“At sikre at folk har færdighederne og selvtilliden til at arbejde sammen med AI. Uden det rette talent-mindset vil adoptionen halte, uanset hvor god teknologien er.”"
                  : "“Ensuring that people have the skills and confidence to work alongside AI. Without the right talent mindset, adoption will lag no matter how good the technology is.”"}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Three challenges */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(40px, 5vw, 80px)",
            alignItems: "start",
            position: "relative",
          }}
          className="fa-challenges-grid"
        >
          <div aria-hidden style={{ position: "absolute", left: "33.33%", top: "4%", bottom: "4%", width: 1, background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }} className="fa-challenges-divider" />
          <div aria-hidden style={{ position: "absolute", left: "66.66%", top: "4%", bottom: "4%", width: 1, background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }} className="fa-challenges-divider" />

          {([
            {
              title: locale === "da" ? "Det juridiske vakuum" : "The legal vacuum",
              quote: locale === "da" ? "Om AI-output vil kunne holde stand juridisk eller under et regulatorisk eftersyn." : "Whether AI outputs would hold up legally or during a regulatory review.",
              accent: "#A78BFA",
            },
            {
              title: locale === "da" ? "Den manglende køreplan" : "The missing roadmap",
              quote: locale === "da" ? "Mangel på en klar køreplan for hvordan AI passer ind i den langsigtede revisionsstrategi." : "Lack of a clear road map for how AI fits into the long-term audit strategy.",
              accent: "#818CF8",
            },
            {
              title: locale === "da" ? "Compliance & følsom data" : "Compliance & sensitive data",
              quote: locale === "da" ? "Regulatoriske, compliance- og privatlivsmæssige overvejelser, der komplicerer AI-adoption, især når workflows involverer følsomme data." : "Regulatory, compliance and privacy considerations that complicate AI adoption, especially when workflows involve sensitive data.",
              accent: "#22D3EE",
            },
          ]).map((c, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.1 }}
              style={{ position: "relative", paddingLeft: i === 0 ? 0 : "clamp(0px, 1.5vw, 28px)", paddingRight: i === 2 ? 0 : "clamp(0px, 1.5vw, 28px)" }}
            >
              <div aria-hidden style={{ width: 32, height: 2, background: c.accent, marginBottom: 24, borderRadius: 999 }} />
              <h3 style={{ fontSize: "clamp(1.25rem, 1.7vw, 1.5rem)", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.015em", color: "#fff", margin: "0 0 20px" }}>
                {c.title}
              </h3>
              <p style={{ fontSize: "0.96rem", lineHeight: 1.7, color: "rgba(255,255,255,0.70)", margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 400, fontStyle: "italic" }}>
                &ldquo;{c.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          style={{ marginTop: "clamp(80px, 10vw, 140px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}
        >
          <div aria-hidden style={{ width: 64, height: 1, background: "linear-gradient(90deg, transparent, #A855F7, #22D3EE, transparent)" }} />
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", margin: 0 }}>
            {locale === "da" ? "Næste skridt" : "Next step"}
          </p>
          <Link href={`/${locale}/contact`} style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            padding: "20px 42px", borderRadius: 999,
            background: "linear-gradient(135deg, #A855F7, #818CF8)",
            color: "#fff", fontSize: 16, fontWeight: 600,
            textDecoration: "none",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            boxShadow: "0 12px 40px rgba(124,111,212,0.40)",
            marginTop: 8,
          }}>
            {locale === "da" ? "Vi kan hjælpe jer til en succesfuld AI-rejse" : "We can help you on a successful AI journey"}
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: "clamp(60px, 8vw, 100px) 0 0", textAlign: "right", fontStyle: "italic", fontFamily: "var(--font-inter), system-ui, sans-serif", letterSpacing: "0.02em" }}>
          {locale === "da" ? "Kilde: IDC's Future of Audit and Accounting in the AI Era Survey, december 2025" : "Source: IDC's Future of Audit and Accounting in the AI Era Survey, December 2025"}
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
@media (max-width: 900px) {
  .fa-barriers-stats { grid-template-columns: 1fr !important; gap: 0 !important; }
  .fa-barriers-stats > div[aria-hidden] { display: none !important; }
  .fa-challenges-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
  .fa-challenges-divider { display: none !important; }
}
      ` }} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION 3 — EN CASE FRA VIRKELIGHEDEN (placeholder)
   Houses the 3.450-hours card (previously in Section 2). Full case-study
   narrative will be built around this anchor in a future iteration.
   ════════════════════════════════════════════════════════════════════════ */
function CaseStudy({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
        background: "linear-gradient(180deg, #04060F 0%, #0B0820 50%, #04060F 100%)",
        overflow: "hidden",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
      }}
      className="fa-case"
      aria-label={locale === "da" ? "En case fra virkeligheden" : "A real-world case"}
    >
      {/* Subtle background glows */}
      <div aria-hidden style={{
        position: "absolute", top: "-10%", right: "-10%", width: "55%", height: "70%",
        background: "radial-gradient(ellipse, rgba(232,121,249,0.10) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "-10%", left: "-5%", width: "45%", height: "60%",
        background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      {/* Top hairline */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 10%, rgba(232,121,249,0.40) 50%, transparent 90%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* Two-column layout: header text left, pyramid right — aligned at top */}
        <div
          className="fa-case-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
            gap: "clamp(40px, 5vw, 80px)",
            alignItems: "start",
          }}
        >
          {/* ── Left: section header (eyebrow + H2 + subtext) ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ paddingLeft: "clamp(0px, 7vw, 180px)" }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: "clamp(28px, 3.5vw, 48px)" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                padding: "7px 16px", borderRadius: 999,
                background: "rgba(232,121,249,0.10)", border: "1px solid rgba(232,121,249,0.35)",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
                textTransform: "uppercase" as const, color: "#F0ABFC",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#E879F9,#A855F7)", display: "inline-block", flexShrink: 0 }} />
                {locale === "da" ? "En case fra virkeligheden" : "A real-world case"}
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: "clamp(2.4rem, 4vw, 4.8rem)",
                fontWeight: 800, lineHeight: 1.1,
                letterSpacing: "-0.03em", color: "#fff", margin: "0 0 clamp(28px, 3.5vw, 48px)",
                maxWidth: 540,
              }}
            >
              {locale === "da" ? (
                <>
                  Giv det væk, tjen på det nye<br />
                  <span style={{
                    background: "linear-gradient(135deg, #E879F9 0%, #A855F7 50%, #818CF8 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    - forbliv relevante
                  </span>
                </>
              ) : (
                <>
                  Give it away, profit from the new{" "}
                  <span style={{
                    background: "linear-gradient(135deg, #E879F9 0%, #A855F7 50%, #818CF8 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    - stay relevant
                  </span>
                </>
              )}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.65,
                color: "rgba(255,255,255,0.65)", margin: 0, maxWidth: 560,
                fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
              }}
            >
              {locale === "da"
                ? "Stikprøvekontrol er blot ét eksempel på en proces, hvor AI kan flytte tusindvis af timer fra operationelt arbejde til nye muligheder. Forestil jer effekten, når den samme udvikling rammer resten af virksomheden."
                : "Sampling control is just one example of a process where AI can shift thousands of hours from operational work to new opportunities. Imagine the impact when the same shift hits the rest of the business."}
            </motion.p>

            <motion.div variants={fadeUp} style={{ marginTop: "clamp(28px, 3vw, 44px)" }}>
              <Link
                href={`/${locale}/contact`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "14px 26px", borderRadius: 999,
                  background: "linear-gradient(135deg, #E879F9 0%, #A855F7 50%, #818CF8 100%)",
                  color: "#fff", fontWeight: 600,
                  fontSize: "clamp(0.9rem, 1vw, 1rem)",
                  letterSpacing: "-0.005em",
                  textDecoration: "none",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  boxShadow: "0 10px 32px rgba(168,85,247,0.30)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                {locale === "da"
                  ? "Lad os mødes hos jer - find jeres nye kerne"
                  : "Let's meet at your place - find your new core"}
                <span style={{ fontSize: "1.1em" }}>→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* RIGHT COLUMN — Pyramid with annotated labels + insight line   */}
          {/* ════════════════════════════════════════════════════════════ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="fa-case-right"
            style={{ paddingTop: 0, marginTop: 60, paddingLeft: "clamp(0px, 8vw, 160px)" }}
          >
            {/* Title */}
            <h3 style={{
              fontSize: "clamp(1.6rem, 2.8vw, 3.2rem)",
              fontWeight: 800, lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "#fff", margin: "0 0 14px",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              {locale === "da" ? "Én proces - " : "One process - "}
              <span style={{
                background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                {locale === "da" ? "3.450 timer om året." : "3,450 hours a year."}
              </span>
            </h3>
            <p style={{
              fontSize: "clamp(1rem, 1.2vw, 1.15rem)", fontWeight: 600, letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.55)", margin: "0 0 36px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}>
              {locale === "da" ? "Case: Stikprøver" : "Case: Sampling"}
            </p>

            {/* Pyramid SVG with annotated labels */}
            <svg
              viewBox="0 0 720 540"
              overflow="visible"
              style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
              aria-label={locale === "da" ? "Pyramide over timefordeling" : "Pyramid of hour breakdown"}
            >
              <defs>
                {/* Tier 1 — apex (150) — cyan */}
                <linearGradient id="pyr-tier1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </linearGradient>
                {/* Tier 2 — middle (300) — indigo */}
                <linearGradient id="pyr-tier2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
                {/* Tier 3 — base (3000) — purple→magenta */}
                <linearGradient id="pyr-tier3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#E879F9" />
                </linearGradient>
                {/* Highlight stroke on top edges for 3D feel */}
                <linearGradient id="pyr-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.45)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>

              {/* ── Tier 3 — base (3000 timer) ── */}
              <motion.polygon
                points="100,490 380,490 332,340 148,340"
                fill="url(#pyr-tier3)"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.95 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ filter: "drop-shadow(0 4px 24px rgba(232,121,249,0.30))", transformOrigin: "240px 415px" }}
              />
              {/* Top highlight edge */}
              <motion.line
                x1="148" y1="340" x2="332" y2="340"
                stroke="url(#pyr-highlight)" strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />

              {/* ── Tier 2 — middle (300 timer) ── */}
              <motion.polygon
                points="158,325 322,325 285,200 195,200"
                fill="url(#pyr-tier2)"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.95 }}
                transition={{ duration: 0.7, delay: 0.40, ease: [0.22, 1, 0.36, 1] }}
                style={{ filter: "drop-shadow(0 4px 20px rgba(129,140,248,0.30))", transformOrigin: "240px 262px" }}
              />
              <motion.line
                x1="195" y1="200" x2="285" y2="200"
                stroke="url(#pyr-highlight)" strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
              />

              {/* ── Tier 1 — apex (150 timer) ── */}
              <motion.polygon
                points="205,185 275,185 240,60"
                fill="url(#pyr-tier1)"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.95 }}
                transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ filter: "drop-shadow(0 4px 18px rgba(34,211,238,0.35))", transformOrigin: "240px 122px" }}
              />

              {/* ════ Connection lines + numbered callouts + labels ════ */}

              {/* Callout 1 — Tier 1 (150 timer) */}
              <motion.line
                x1="265" y1="120" x2="430" y2="120"
                stroke="rgba(255,255,255,0.30)" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: "430px 120px" }}
              >
                <circle cx="430" cy="120" r="14" fill="#0EA5E9" stroke="#22D3EE" strokeWidth="1.5" />
                <text x="430" y="125" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700"
                  fontFamily="var(--font-geist), system-ui, sans-serif">
                  1
                </text>
              </motion.g>
              <motion.g
                initial={{ opacity: 0, x: 8 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                transition={{ duration: 0.5, delay: 1.55 }}
              >
                <text x="455" y="115" fill="#fff" fontSize="22" fontWeight="800" letterSpacing="-0.02em"
                  fontFamily="var(--font-geist), system-ui, sans-serif">
                  150 {locale === "da" ? "timer" : "hours"}
                </text>
                <text x="455" y="140" fill="rgba(255,255,255,0.62)" fontSize="13"
                  fontFamily="var(--font-inter), system-ui, sans-serif">
                  {locale === "da" ? "Ekstern kvalitetskontrol" : "External quality control"}
                </text>
              </motion.g>

              {/* Callout 2 — Tier 2 (300 timer) */}
              <motion.line
                x1="310" y1="262" x2="430" y2="262"
                stroke="rgba(255,255,255,0.30)" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: 1.55, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: "430px 262px" }}
              >
                <circle cx="430" cy="262" r="14" fill="#6366F1" stroke="#818CF8" strokeWidth="1.5" />
                <text x="430" y="267" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700"
                  fontFamily="var(--font-geist), system-ui, sans-serif">
                  2
                </text>
              </motion.g>
              <motion.g
                initial={{ opacity: 0, x: 8 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                <text x="455" y="257" fill="#fff" fontSize="22" fontWeight="800" letterSpacing="-0.02em"
                  fontFamily="var(--font-geist), system-ui, sans-serif">
                  300 {locale === "da" ? "timer" : "hours"}
                </text>
                <text x="455" y="282" fill="rgba(255,255,255,0.62)" fontSize="13"
                  fontFamily="var(--font-inter), system-ui, sans-serif">
                  {locale === "da" ? "Stikprøve planlægning" : "Sample planning"}
                </text>
                <text x="455" y="299" fill="rgba(255,255,255,0.62)" fontSize="13"
                  fontFamily="var(--font-inter), system-ui, sans-serif">
                  {locale === "da" ? "& evaluering" : "& evaluation"}
                </text>
              </motion.g>

              {/* Callout 3 — Tier 3 (3000 timer) */}
              <motion.line
                x1="360" y1="415" x2="430" y2="415"
                stroke="rgba(255,255,255,0.30)" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.7, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: 1.7, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: "430px 415px" }}
              >
                <circle cx="430" cy="415" r="14" fill="#A855F7" stroke="#E879F9" strokeWidth="1.5" />
                <text x="430" y="420" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700"
                  fontFamily="var(--font-geist), system-ui, sans-serif">
                  3
                </text>
              </motion.g>
              <motion.g
                initial={{ opacity: 0, x: 8 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                transition={{ duration: 0.5, delay: 1.85 }}
              >
                <text x="455" y="410" fill="#fff" fontSize="22" fontWeight="800" letterSpacing="-0.02em"
                  fontFamily="var(--font-geist), system-ui, sans-serif">
                  3.000 {locale === "da" ? "timer" : "hours"}
                </text>
                <text x="455" y="435" fill="rgba(255,255,255,0.62)" fontSize="13"
                  fontFamily="var(--font-inter), system-ui, sans-serif">
                  {locale === "da" ? "Operationel stikprøvekontrol" : "Operational sampling control"}
                </text>
                <text x="455" y="452" fill="rgba(255,255,255,0.62)" fontSize="13"
                  fontFamily="var(--font-inter), system-ui, sans-serif">
                  {locale === "da" ? "ved kunder over 89 mio." : "for clients over 89M"}
                </text>
                <text x="455" y="476" fill="rgba(255,255,255,0.42)" fontSize="11" fontStyle="italic"
                  fontFamily="var(--font-inter), system-ui, sans-serif">
                  {locale === "da" ? "Ca. 30 timer × 100 kunder" : "~30 hours × 100 clients"}
                </text>
              </motion.g>
            </svg>

            {/* Bottom insight line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 2.0 }}
              style={{
                marginTop: 32, paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", gap: 12,
              }}
            >
              <span aria-hidden style={{
                width: 24, height: 1, flexShrink: 0,
                background: "linear-gradient(90deg, #E879F9, #22D3EE)",
              }} />
              <p style={{
                fontSize: "0.92rem", lineHeight: 1.55,
                color: "rgba(255,255,255,0.65)", margin: 0,
                fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
                fontStyle: "italic",
              }}>
                {locale === "da"
                  ? <>Den operationelle kontrol slår de andre med <span style={{ color: "#E879F9", fontWeight: 600, fontStyle: "normal" }}>20×</span> — og det er præcis dér, AI flytter mest værdi.</>
                  : <>Operational control outweighs the rest by <span style={{ color: "#E879F9", fontWeight: 600, fontStyle: "normal" }}>20×</span> — and that's exactly where AI moves the most value.</>}
              </p>
            </motion.div>
          </motion.div>

        </div>

        <style dangerouslySetInnerHTML={{ __html: `
@media (max-width: 900px) {
  .fa-case-grid { grid-template-columns: 1fr !important; }
  .fa-case-right { margin-top: 0 !important; }
}
        ` }} />
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PAGE — Financial Auditing × AI
   Private sales landing page — noindex via layout.tsx.
   Subsequent sections (pain points, urgency, offering, vision, CTA) will
   be added below the hero in future iterations.
   ════════════════════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════════════════════
   SECTION 3 — HVAD VI GØR FOR JER
   xrNORD offering — 4 pillars. Lighter navy tone bridges from S2's dark violet.
   ════════════════════════════════════════════════════════════════════════ */
function XrNordOffering({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const pillars = locale === "da"
    ? [
        {
          index: "01",
          title: "AI-strategi & Roadmap",
          body: "Vi kortlægger præcist, hvor AI skaber mest værdi i jeres revisionshus. I får en konkret handlingsplan, ikke en generisk rapport.",
          accent: "#22D3EE",
          glow: "rgba(34,211,238,0.15)",
          border: "rgba(34,211,238,0.25)",
          icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M4 22L10 14L16 18L24 6" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="6" r="2.5" fill="#22D3EE" fillOpacity="0.3" stroke="#22D3EE" strokeWidth="1.5"/>
              <circle cx="4" cy="22" r="2.5" fill="#22D3EE" fillOpacity="0.3" stroke="#22D3EE" strokeWidth="1.5"/>
            </svg>
          ),
        },
        {
          index: "02",
          title: "AI Workshop & Træning",
          body: "Hands-on forløb, der giver jeres team den forståelse og tillid, der skal til, for at bruge AI korrekt og med sikkerhed i dagligdagen.",
          accent: "#818CF8",
          glow: "rgba(129,140,248,0.15)",
          border: "rgba(129,140,248,0.25)",
          icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="3" y="5" width="22" height="14" rx="2.5" stroke="#818CF8" strokeWidth="2"/>
              <path d="M10 23h8M14 19v4" stroke="#818CF8" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 12l3 3 7-7" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
        },
        {
          index: "03",
          title: "Implementering & Integration",
          body: "Vi bygger og integrerer AI-værktøjer direkte i jeres eksisterende arbejdsgange. Ingen forstyrrelser, ingen unødvendig kompleksitet.",
          accent: "#A855F7",
          glow: "rgba(168,85,247,0.15)",
          border: "rgba(168,85,247,0.25)",
          icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M7 14h14M14 7l7 7-7 7" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="14" r="3" stroke="#A855F7" strokeWidth="1.8"/>
            </svg>
          ),
        },
        {
          index: "04",
          title: "Løbende Partnerskab",
          body: "Vi bliver hos jer. Løbende optimering, ny teknologi og en fast AI-partner, der forstår revisionsbranchen indefra.",
          accent: "#E879F9",
          glow: "rgba(232,121,249,0.15)",
          border: "rgba(232,121,249,0.25)",
          icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10" stroke="#E879F9" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 4l5 5-5 5" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="14" cy="14" r="3" fill="#E879F9" fillOpacity="0.25" stroke="#E879F9" strokeWidth="1.5"/>
            </svg>
          ),
        },
      ]
    : [
        {
          index: "01",
          title: "AI Strategy & Roadmap",
          body: "We map exactly where AI creates the most value in your firm. You get a concrete action plan, not a generic report.",
          accent: "#22D3EE",
          glow: "rgba(34,211,238,0.15)",
          border: "rgba(34,211,238,0.25)",
          icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M4 22L10 14L16 18L24 6" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="6" r="2.5" fill="#22D3EE" fillOpacity="0.3" stroke="#22D3EE" strokeWidth="1.5"/>
              <circle cx="4" cy="22" r="2.5" fill="#22D3EE" fillOpacity="0.3" stroke="#22D3EE" strokeWidth="1.5"/>
            </svg>
          ),
        },
        {
          index: "02",
          title: "AI Workshop & Training",
          body: "Hands-on sessions that give your team the understanding and confidence to use AI correctly and securely in day-to-day work.",
          accent: "#818CF8",
          glow: "rgba(129,140,248,0.15)",
          border: "rgba(129,140,248,0.25)",
          icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="3" y="5" width="22" height="14" rx="2.5" stroke="#818CF8" strokeWidth="2"/>
              <path d="M10 23h8M14 19v4" stroke="#818CF8" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 12l3 3 7-7" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
        },
        {
          index: "03",
          title: "Implementation & Integration",
          body: "We build and integrate AI tools directly into your existing workflows. No disruption, no unnecessary complexity.",
          accent: "#A855F7",
          glow: "rgba(168,85,247,0.15)",
          border: "rgba(168,85,247,0.25)",
          icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M7 14h14M14 7l7 7-7 7" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="14" r="3" stroke="#A855F7" strokeWidth="1.8"/>
            </svg>
          ),
        },
        {
          index: "04",
          title: "Ongoing Partnership",
          body: "We stay with you. Continuous optimisation, emerging technology and a dedicated AI partner who understands the audit profession from the inside.",
          accent: "#E879F9",
          glow: "rgba(232,121,249,0.15)",
          border: "rgba(232,121,249,0.25)",
          icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10" stroke="#E879F9" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 4l5 5-5 5" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="14" cy="14" r="3" fill="#E879F9" fillOpacity="0.25" stroke="#E879F9" strokeWidth="1.5"/>
            </svg>
          ),
        },
      ];

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
        background: "linear-gradient(180deg, #0A1628 0%, #0D1F3C 60%, #0F2244 100%)",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glow blobs */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
      }}>
        <div style={{
          position: "absolute", top: "-10%", left: "5%",
          width: "50vw", height: "50vw", maxWidth: 700, maxHeight: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "0%", right: "5%",
          width: "45vw", height: "45vw", maxWidth: 600, maxHeight: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
        }} />
        {/* Subtle top edge line — transition from S2 */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.20) 30%, rgba(168,85,247,0.20) 70%, transparent 100%)",
        }} />
      </div>

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: "clamp(64px, 8vw, 100px)" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase" as const,
            color: "#22D3EE",
            marginBottom: 20,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          {locale === "da" ? "Hvad vi gør for jer" : "What we do for you"}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(2rem, 3.3vw, 4rem)",
            fontWeight: 800, lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#fff",
            margin: "0 auto 24px",
            maxWidth: 820,
          }}
        >
          {locale === "da"
            ? <>Vi tager jer sikkert<br />igennem AI-transformationen</>
            : <>We guide you safely<br />through the AI transformation</>}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.16 }}
          style={{
            fontSize: "clamp(1.05rem, 1.3vw, 1.18rem)", lineHeight: 1.65,
            color: "rgba(255,255,255,0.60)",
            maxWidth: 680, margin: "0 auto",
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
          }}
        >
          {locale === "da"
            ? "Ikke som en teknologileverandør. Som en strategisk partner, der forstår revision og ved, hvordan AI omsættes til reel forretningsværdi."
            : "Not as a technology vendor. As a strategic partner who understands auditing and knows how AI translates into real business value."}
        </motion.p>
      </div>

      {/* 4-pillar grid */}
      <div
        style={{
          position: "relative", zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "clamp(16px, 2vw, 28px)",
          width: "100%",
        }}
        className="fa-offering-grid"
      >
        {pillars.map((p, i) => (
          <motion.div
            key={p.index}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "relative",
              borderRadius: 20,
              padding: "clamp(28px, 3vw, 40px) clamp(24px, 2.5vw, 36px)",
              background: `linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)`,
              border: `1px solid ${p.border}`,
              boxShadow: `0 0 40px ${p.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column" as const,
              gap: 20,
              transition: "box-shadow 0.3s ease",
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: "absolute", top: 0, left: "15%", right: "15%", height: 2,
              borderRadius: "0 0 4px 4px",
              background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`,
            }} />

            {/* Index + icon row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
                color: p.accent, fontFamily: "var(--font-inter), system-ui, sans-serif",
                opacity: 0.7,
              }}>
                {p.index}
              </span>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: p.glow,
                border: `1px solid ${p.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {p.icon}
              </div>
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
              fontWeight: 700, lineHeight: 1.25,
              color: "#fff", margin: 0,
              letterSpacing: "-0.01em",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              {p.title}
            </h3>

            {/* Body */}
            <p style={{
              fontSize: "clamp(0.9rem, 1vw, 1rem)", lineHeight: 1.65,
              color: "rgba(255,255,255,0.60)",
              margin: 0, flexGrow: 1,
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
            }}>
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA nudge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.55 }}
        style={{
          position: "relative", zIndex: 1,
          textAlign: "center", marginTop: "clamp(56px, 7vw, 88px)",
        }}
      >
        <Link
          href={locale === "da" ? "/da/kontakt" : "/en/contact"}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "16px 36px", borderRadius: 999,
            background: "linear-gradient(135deg, #22D3EE, #818CF8, #A855F7)",
            color: "#fff", fontWeight: 700,
            fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
            letterSpacing: "-0.01em",
            textDecoration: "none",
            boxShadow: "0 0 40px rgba(129,140,248,0.35)",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
          }}
        >
          {locale === "da" ? "Book en uforpligtende samtale" : "Book a no-obligation call"}
          <span style={{ fontSize: "1.1em" }}>→</span>
        </Link>
      </motion.div>

      <style>{`
        @media (max-width: 1100px) {
          .fa-offering-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 600px) {
          .fa-offering-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION — FUTURE USPs
   Broken-white background. Headline left + animated 4-curve graph right.
   Curves unfold from origin (0,0) left → right over ~2.5s.
   ════════════════════════════════════════════════════════════════════════ */
function FutureUsps({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  // Each curve gets its own gradient pulled from the hero/brand palette,
  // plus a soft glow that gives it a fluorescent feel on the broken-white bg.
  const curves = [
    {
      key: "data",
      d: "M 60 540 C 240 520, 460 490, 760 430",
      gradId: "usp-grad-data",
      gradStops: [
        { offset: "0%",   color: "#FBBF24" }, // warm yellow
        { offset: "100%", color: "#F97316" }, // orange
      ],
      glow: "#F97316",
      delay: 0.35,
    },
    {
      key: "cap",
      d: "M 60 540 C 240 480, 460 380, 760 280",
      gradId: "usp-grad-cap",
      gradStops: [
        { offset: "0%",   color: "#818CF8" }, // indigo
        { offset: "100%", color: "#818CF8" }, // same indigo — solid colour all the way
      ],
      glow: "#818CF8",
      delay: 0.55,
    },
    {
      key: "opt",
      d: "M 60 540 C 220 510, 320 280, 420 250 C 540 220, 640 320, 760 360",
      gradId: "usp-grad-opt",
      gradStops: [
        { offset: "0%",   color: "#818CF8" }, // indigo
        { offset: "50%",  color: "#A855F7" }, // purple
        { offset: "100%", color: "#E879F9" }, // magenta
      ],
      glow: "#A855F7",
      delay: 0.75,
    },
    {
      key: "usp",
      d: "M 60 540 C 320 530, 540 410, 760 80",
      gradId: "usp-grad-usp",
      gradStops: [
        { offset: "0%",   color: "#A855F7" }, // purple
        { offset: "60%",  color: "#E879F9" }, // magenta
        { offset: "100%", color: "#EC4899" }, // hot pink
      ],
      glow: "#E879F9",
      delay: 0.95,
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        padding: "clamp(80px, 10vw, 140px) clamp(24px, 6vw, 160px)",
        background: "#04060F",
        color: "#F5F5F7",
        overflow: "hidden",
        isolation: "isolate",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {/* Stage-light ambience — soft radial bloom behind the curves */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background:
          // primary spotlight — warm purple/indigo bloom, centered slightly right
          "radial-gradient(ellipse 60% 55% at 60% 55%, rgba(168,85,247,0.10) 0%, rgba(99,102,241,0.06) 35%, transparent 70%)," +
          // accent — soft cyan wash from bottom-left
          "radial-gradient(ellipse 45% 40% at 25% 75%, rgba(34,211,238,0.06) 0%, transparent 65%)," +
          // accent — magenta breath from top-right
          "radial-gradient(ellipse 35% 35% at 80% 25%, rgba(232,121,249,0.05) 0%, transparent 70%)",
      }} />

      {/* Hairline top gradient — subtle transition from section above */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.45) 30%, rgba(34,211,238,0.45) 70%, transparent 100%)",
        boxShadow: "0 0 12px 1px rgba(168,85,247,0.18)",
        zIndex: 0,
      }} />

      {/* Very faint micro grid — adds depth without being noisy */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 70% 60% at 60% 50%, black 30%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 60% 50%, black 30%, transparent 90%)",
      }} />

      <div
        className="fa-usp-layout"
        style={{
          position: "relative", zIndex: 1, width: "100%",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)",
          gap: "clamp(40px, 5vw, 96px)",
          alignItems: "start",
        }}
      >
        {/* ── Left: H2 + supporting text (placeholder — to be written) ── */}
        <div
          className="fa-usp-text"
          style={{
            paddingTop: "clamp(0px, 2vw, 24px)",
            paddingLeft: "clamp(0px, 7vw, 180px)", // aligns with Hero's text block (fa-grid + fa-hero-left combined)
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(2.4rem, 4vw, 4.8rem)",
              fontWeight: 800, lineHeight: 1.04,
              letterSpacing: "-0.035em",
              color: "#F5F5F7",
              margin: "0 0 32px",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}
          >
            {locale === "da" ? (
              <>
                AI vil ændre, hvad{" "}
                <span style={{
                  background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 35%, #A855F7 70%, #EC4899 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  jeres kunder
                </span>
                {" "}er villige til at{" "}
                <span style={{
                  background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 35%, #A855F7 70%, #EC4899 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  betale for
                </span>
              </>
            ) : (
              <>
                AI will change what{" "}
                <span style={{
                  background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 35%, #A855F7 70%, #EC4899 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  your customers
                </span>
                {" "}are willing to{" "}
                <span style={{
                  background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 35%, #A855F7 70%, #EC4899 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  pay for
                </span>
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(1rem, 1.15vw, 1.1rem)",
              lineHeight: 1.7,
              color: "rgba(245,245,247,0.65)",
              margin: 0, maxWidth: 520,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 300,
            }}
          >
            {locale === "da"
              ? "Fremtidens revisionsfirmaer bliver ikke defineret af, hvor meget AI de anvender. De bliver defineret af, hvordan de omsætter AI til nye kompetencer, stærkere rådgivning og services, som kunderne ikke kan få andre steder."
              : "The audit firms of the future won't be defined by how much AI they use. They will be defined by how they translate AI into new capabilities, stronger advisory and services clients can't get anywhere else."}
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(1.2rem, 1.6vw, 1.6rem)",
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              color: "#F5F5F7",
              margin: "32px 0 0",
              maxWidth: 520,
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}
          >
            {locale === "da"
              ? "Jeres fremtid skabes ikke tilfældigt. Den kræver en plan"
              : "Your future isn't created by chance. It requires a plan"}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: "clamp(28px, 3.5vw, 56px)" }}
          >
            <Link
              href={`/${locale}/ai-roadmap`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                padding: "16px 30px", borderRadius: 999,
                background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 35%, #A855F7 70%, #EC4899 100%)",
                color: "#fff", fontWeight: 600,
                fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                letterSpacing: "-0.005em",
                textDecoration: "none",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                boxShadow: "0 12px 40px rgba(168,85,247,0.30), 0 0 24px rgba(34,211,238,0.20)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              {locale === "da"
                ? "Start jeres AI-rejse med jeres plan"
                : "Start your AI journey with your plan"}
              <span style={{ fontSize: "1.1em" }}>→</span>
            </Link>
          </motion.div>
        </div>

        {/* ── Right: animated 4-curve graph ── */}
        <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
          overflow="visible"
          style={{ width: "100%", height: "auto", maxWidth: 1000, display: "block", overflow: "visible" }}
          aria-label={locale === "da" ? "Graf over fremtidige USP'er" : "Future USPs chart"}
        >
          <defs>
            {curves.map((c) => (
              <linearGradient
                key={c.gradId}
                id={c.gradId}
                gradientUnits="userSpaceOnUse"
                x1="60"  y1="540"
                x2="760" y2="60"
              >
                {c.gradStops.map((s, idx) => (
                  <stop key={idx} offset={s.offset} stopColor={s.color} />
                ))}
              </linearGradient>
            ))}
          </defs>

          {curves.map((c) => (
            <g key={c.key}>
              {/* Soft glow underlay — wider, more transparent */}
              <motion.path
                d={c.d}
                stroke={c.glow}
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                opacity="0.13"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: c.delay }}
                style={{ filter: `blur(5px)` }}
              />
              {/* Main stroke — gradient */}
              <motion.path
                d={c.d}
                stroke={`url(#${c.gradId})`}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: c.delay }}
                style={{ filter: `drop-shadow(0 0 3px ${c.glow}55)` }}
              />
            </g>
          ))}

          {/* ── Label: Your future USP's (pink line) ── */}
          <motion.text
            x="725" y="68"
            textAnchor="end"
            fill="#EC4899"
            fontSize="12"
            fontWeight="600"
            fontFamily="var(--font-inter), system-ui, sans-serif"
            style={{
              letterSpacing: "0.04em",
              filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.70))",
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 3.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {locale === "da" ? "Fremtidens USP'er" : "Your future USP´s"}
          </motion.text>

          {/* ── Label: AI Optimized & Automized (purple bell-curve) ── */}
          <motion.text
            x="430" y="218"
            textAnchor="middle"
            fill="#A855F7"
            fontSize="12"
            fontWeight="600"
            fontFamily="var(--font-inter), system-ui, sans-serif"
            style={{
              letterSpacing: "0.04em",
              filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.70))",
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 3.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {locale === "da" ? "Optimering & Automatisering" : "Optimization & Automation"}
          </motion.text>

          {/* ── Label: AI Ready Data (yellow/orange line) ── */}
          <motion.text
            x="590" y="440"
            textAnchor="middle"
            fill="#F97316"
            fontSize="12"
            fontWeight="600"
            fontFamily="var(--font-inter), system-ui, sans-serif"
            style={{
              letterSpacing: "0.04em",
              filter: "drop-shadow(0 0 8px rgba(249, 115, 22, 0.70))",
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {locale === "da" ? "Jeres AI Data" : "Your AI Data"}
          </motion.text>

          {/* ── Label: AI Capabilities (blue/indigo line) ── */}
          <motion.text
            x="850" y="255"
            textAnchor="end"
            fill="#818CF8"
            fontSize="12"
            fontWeight="600"
            fontFamily="var(--font-inter), system-ui, sans-serif"
            style={{
              letterSpacing: "0.04em",
              filter: "drop-shadow(0 0 8px rgba(129, 140, 248, 0.70))",
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 3.0, ease: [0.22, 1, 0.36, 1] }}
          >
            {locale === "da" ? "Jeres AI Systemer & Viden" : "Your AI Systems & Knowledge"}
          </motion.text>
        </svg>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .fa-usp-layout {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default function FinancialAuditingAIPage() {
  const locale = useLocale();

  return (
    <main style={{ background: "#04060F" }}>
      <Navbar />
      <Hero locale={locale} />
      <ReportMetrics locale={locale} />
      <FutureUsps locale={locale} />
      <CaseStudy locale={locale} />
      <XrNordOffering locale={locale} />
      {/* WIP sections — order TBD */}
      <BarriersSection locale={locale} />
    </main>
  );
}
