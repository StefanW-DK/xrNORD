"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Shared CTAs ──────────────────────────────────────────────────────── */
function CtaPair({ locale, theme }: { locale: string; theme: "light" | "dark" }) {
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
    background: theme === "light" ? "transparent" : "rgba(255,255,255,0.06)",
    color: theme === "light" ? "#0f1c24" : "rgba(255,255,255,0.95)",
    border: theme === "light" ? "1px solid rgba(15,28,36,0.22)" : "1px solid rgba(255,255,255,0.22)",
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

/* ─── Section label ribbon ─────────────────────────────────────────────── */
function VersionRibbon({ n, name, tone }: { n: number; name: string; tone: "light" | "dark" }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 50,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 14px",
        borderRadius: 999,
        background: tone === "light" ? "rgba(15,28,36,0.92)" : "rgba(255,255,255,0.92)",
        color: tone === "light" ? "#fff" : "#0f1c24",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        backdropFilter: "blur(8px)",
      }}
    >
      <span style={{ opacity: 0.6 }}>Version {n}</span>
      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "currentColor", opacity: 0.4 }} />
      <span>{name}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   VERSION 1 — EDITORIAL
   White, restrained, magazine-cover feel. Editorial gravitas + stat card.
   ════════════════════════════════════════════════════════════════════════ */
function HeroV1({ locale }: { locale: string }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "clamp(120px, 14vw, 180px) clamp(24px, 6vw, 80px) clamp(80px, 10vw, 140px)",
        background: "#ffffff",
        overflow: "hidden",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
      }}
    >
      <VersionRibbon n={1} name="Editorial" tone="light" />

      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "8%",
          right: "-12%",
          width: 720,
          height: 720,
          background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: 560,
          height: 560,
          background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 1fr)",
          gap: "clamp(40px, 5vw, 80px)",
          alignItems: "center",
        }}
        className="hv1-grid"
      >
        {/* Left — text column */}
        <div>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#A855F7",
              margin: "0 0 28px",
            }}
          >
            {locale === "da" ? "Finansiel revision × AI" : "Financial auditing × AI"}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(2.6rem, 5.6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              color: "#0f1c24",
              margin: "0 0 28px",
            }}
            className="hv1-h1"
          >
            {locale === "da" ? "Revision står over for sin " : "Auditing faces its "}
            <span
              style={{
                background: "linear-gradient(135deg, #A855F7, #818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {locale === "da" ? "største transformation" : "biggest transformation"}
            </span>
            {locale === "da" ? " i en generation." : " in a generation."}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
              lineHeight: 1.6,
              color: "rgba(15,28,36,0.62)",
              maxWidth: 620,
              margin: "0 0 44px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 300,
            }}
          >
            {locale === "da"
              ? "AI vil ændre kerneydelser fra specialviden til standardvare. Spørgsmålet er ikke om — men hvem der ejer den nye værdi."
              : "AI is turning core audit services from specialist expertise into commodity. The question is no longer if — but who will own the new value."}
          </motion.p>

          <motion.div variants={fadeUp}>
            <CtaPair locale={locale} theme="light" />
          </motion.div>
        </div>

        {/* Right — IDC stat card */}
        <motion.aside
          variants={fadeUp}
          style={{
            position: "relative",
            background: "linear-gradient(180deg, #0B0F1A 0%, #141829 100%)",
            color: "#fff",
            padding: "44px 40px",
            borderRadius: 24,
            boxShadow: "0 30px 80px rgba(15,28,36,0.18)",
            overflow: "hidden",
          }}
          className="hv1-stat"
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 240,
              height: 240,
              background: "radial-gradient(circle, rgba(168,85,247,0.32) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 28px" }}>
            IDC · Februar 2026
          </p>
          <p
            style={{
              fontSize: "clamp(4rem, 7vw, 6.5rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              margin: "0 0 18px",
              background: "linear-gradient(135deg, #22D3EE, #818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            76%
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.85)",
              margin: "0 0 22px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 400,
            }}
          >
            {locale === "da"
              ? "af revisorer mener AI vil fundamentalt forvandle revision indenfor 10 år."
              : "of auditors believe AI will fundamentally transform audit within 10 years."}
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
            {locale === "da" ? "Kilde: IDC, The Future of Audit and Accounting in the AI Era, 2026 · n=1.005" : "Source: IDC, The Future of Audit and Accounting in the AI Era, 2026 · n=1,005"}
          </p>
        </motion.aside>
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (max-width: 900px) {
  .hv1-grid { grid-template-columns: 1fr !important; }
  .hv1-stat { padding: 36px 30px !important; }
}
          `,
        }}
      />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   VERSION 2 — CINEMATIC
   Dark gradient, centred, premium "Apple keynote" feel.
   ════════════════════════════════════════════════════════════════════════ */
function HeroV2({ locale }: { locale: string }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "clamp(120px, 14vw, 180px) clamp(24px, 6vw, 80px) clamp(80px, 10vw, 140px)",
        background: "linear-gradient(160deg, #04060F 0%, #0A0E1E 35%, #14132E 70%, #1D1644 100%)",
        overflow: "hidden",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <VersionRibbon n={2} name="Cinematic" tone="dark" />

      {/* Ambient mesh */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120%",
          height: "70%",
          background: "radial-gradient(ellipse at center top, rgba(168,85,247,0.22) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "60%",
          height: "60%",
          background: "radial-gradient(circle, rgba(34,211,238,0.16) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative grid lines */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ position: "relative", zIndex: 1, maxWidth: 980, textAlign: "center" }}
      >
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            margin: "0 0 32px",
          }}
        >
          {locale === "da" ? "For danske revisionshuse" : "For Nordic audit firms"}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          style={{
            fontSize: "clamp(2.8rem, 6.5vw, 6rem)",
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "#fff",
            margin: "0 0 32px",
          }}
          className="hv2-h1"
        >
          {locale === "da" ? "AI vil forvandle revision." : "AI will reshape auditing."}
          <br />
          <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.55)" }}>
            {locale === "da" ? "Lad det blive " : "Let it become "}
          </span>
          <span
            style={{
              background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 800,
            }}
          >
            {locale === "da" ? "jeres styrke." : "your edge."}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.62)",
            maxWidth: 700,
            margin: "0 auto 48px",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 300,
          }}
        >
          {locale === "da"
            ? "25–40% af jeres tid kan automatiseres. Vi viser jer, hvordan I bruger den frigjorte kapacitet til at åbne nye markeder — uden at afskedige en eneste medarbejder."
            : "25–40% of your team's time can be automated. We show you how to redeploy that freed capacity into new markets — without letting anyone go."}
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center" }}>
          <CtaPair locale={locale} theme="dark" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   VERSION 3 — PROVOCATION
   Split layout. Headline + CTAs on left, giant number anchor on right.
   ════════════════════════════════════════════════════════════════════════ */
function HeroV3({ locale }: { locale: string }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "clamp(120px, 14vw, 180px) clamp(24px, 6vw, 80px) clamp(80px, 10vw, 140px)",
        background: "#0B0F1A",
        overflow: "hidden",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
      }}
    >
      <VersionRibbon n={3} name="Provocation" tone="dark" />

      {/* Background gradient sweep */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(125deg, #0B0F1A 0%, #141829 45%, #1A1040 75%, #2A1255 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: "55%",
          height: "70%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(232,121,249,0.22) 0%, rgba(168,85,247,0.10) 35%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
          gap: "clamp(40px, 6vw, 100px)",
          alignItems: "center",
        }}
        className="hv3-grid"
      >
        {/* Left — text + CTAs */}
        <div>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#E879F9",
              margin: "0 0 28px",
            }}
          >
            {locale === "da" ? "En case fra virkeligheden" : "A real-world case"}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#fff",
              margin: "0 0 28px",
            }}
            className="hv3-h1"
          >
            {locale === "da" ? "AI kan reducere det til " : "AI can cut it down to "}
            <span
              style={{
                background: "linear-gradient(135deg, #E879F9, #A855F7, #818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              30 {locale === "da" ? "timer" : "hours"}.
            </span>
            <br />
            <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.7)" }}>
              {locale === "da" ? "Resten bliver til ny indtjening." : "The rest becomes new revenue."}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.62)",
              maxWidth: 560,
              margin: "0 0 44px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 300,
            }}
          >
            {locale === "da"
              ? "Det er ikke fremtid. Det er det, vi bygger sammen med danske revisionshuse i dag."
              : "This isn't a future promise. It's what we're already building with Nordic auditing firms today."}
          </motion.p>

          <motion.div variants={fadeUp}>
            <CtaPair locale={locale} theme="dark" />
          </motion.div>
        </div>

        {/* Right — giant number anchor */}
        <motion.div
          variants={fadeUp}
          style={{ position: "relative", textAlign: "right" }}
          className="hv3-anchor"
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              margin: "0 0 16px",
            }}
          >
            {locale === "da" ? "Stikprøver — årligt" : "Sampling — annually"}
          </p>
          <p
            style={{
              fontSize: "clamp(6rem, 13vw, 13rem)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.06em",
              margin: "0 0 24px",
              background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.35) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}
          >
            3.450
          </p>
          <p
            style={{
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 360,
              marginLeft: "auto",
              margin: "0 0 0 auto",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 300,
            }}
          >
            {locale === "da"
              ? "timer om året bruger jeres revisorer på stikprøver — alene."
              : "hours per year your auditors spend on sampling alone."}
          </p>
        </motion.div>
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (max-width: 900px) {
  .hv3-grid { grid-template-columns: 1fr !important; }
  .hv3-anchor { text-align: left !important; }
  .hv3-anchor p:last-child { margin-left: 0 !important; max-width: none !important; }
}
          `,
        }}
      />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   VERSION 4 — HYBRID
   V1 layout (text left, stat card right) + V2 headline + updated subtext.
   ════════════════════════════════════════════════════════════════════════ */
function HeroV4({ locale }: { locale: string }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "clamp(120px, 14vw, 180px) clamp(24px, 6vw, 80px) clamp(80px, 10vw, 140px)",
        background: "linear-gradient(155deg, #04060F 0%, #080C1A 30%, #0F0D28 60%, #160D35 100%)",
        overflow: "hidden",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        display: "flex",
        alignItems: "center",
      }}
      className="hv4-section"
    >
      <VersionRibbon n={4} name="Hybrid" tone="dark" />

      {/* Thin gradient top border */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.7) 30%, rgba(34,211,238,0.7) 70%, transparent 100%)",
        pointerEvents: "none",
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
      <div aria-hidden className="hv4-noise" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: 1400, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
          gap: "clamp(40px, 6vw, 120px)",
          alignItems: "center",
        }}
        className="hv4-grid"
      >
        {/* ── Left: text column ── */}
        <div>
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

          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(3rem, 6.8vw, 6rem)",
              fontWeight: 800, lineHeight: 1.0,
              letterSpacing: "-0.03em", color: "#fff", margin: "0 0 28px",
            }}
            className="hv4-h1"
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
          </motion.h1>

          {/* Thin gradient rule */}
          <motion.div variants={fadeUp} style={{ margin: "0 0 28px" }}>
            <div style={{ width: 52, height: 1, background: "linear-gradient(90deg, #A855F7, #22D3EE)" }} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.7,
              color: "rgba(255,255,255,0.52)", maxWidth: 520, margin: "0 0 52px",
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
            }}
          >
            {locale === "da"
              ? "Revision står over for sin største transformation i en generation — kom med på rejsen og forbliv konkurrencedygtige om 5 år."
              : "Auditing faces its greatest transformation in a generation — join the journey and stay competitive for the next 5 years."}
          </motion.p>

          <motion.div variants={fadeUp}>
            <CtaPair locale={locale} theme="dark" />
          </motion.div>
        </div>

        {/* ── Right: 76% as raw typographic element — no box ── */}
        <motion.div
          variants={fadeUp}
          style={{ position: "relative", paddingLeft: 44 }}
          className="hv4-stat-col"
        >
          {/* Vertical accent line */}
          <div style={{
            position: "absolute", left: 0, top: "5%", bottom: "5%", width: 1,
            background: "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.7) 25%, rgba(34,211,238,0.7) 75%, transparent 100%)",
          }} />

          {/* Ghost 76% — huge background graphic */}
          <div aria-hidden style={{
            position: "absolute",
            top: "50%", left: "42%",
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(10rem, 18vw, 17rem)",
            fontWeight: 800, lineHeight: 1, letterSpacing: "-0.06em",
            background: "linear-gradient(155deg, rgba(168,85,247,0.14) 0%, rgba(34,211,238,0.10) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            userSelect: "none", whiteSpace: "nowrap", pointerEvents: "none",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
          }}>76%</div>

          {/* Foreground stat text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase" as const, color: "rgba(255,255,255,0.38)", margin: "0 0 16px",
            }}>
              IDC · Februar 2026
            </p>
            <p style={{
              fontSize: "clamp(4rem, 7.5vw, 6.5rem)",
              fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", margin: "0 0 20px",
              background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 55%, #E879F9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              76%
            </p>
            <p style={{
              fontSize: "1.0rem", lineHeight: 1.6, color: "rgba(255,255,255,0.72)",
              maxWidth: 280, margin: "0 0 28px",
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
            }}>
              {locale === "da"
                ? "af revisorer mener AI vil fundamentalt forvandle revision indenfor 10 år."
                : "of auditors believe AI will fundamentally transform audit within 10 years."}
            </p>
            <p style={{
              fontSize: 11, color: "rgba(255,255,255,0.28)", margin: 0, lineHeight: 1.5,
              fontFamily: "var(--font-inter), system-ui, sans-serif", letterSpacing: "0.01em",
            }}>
              {locale === "da"
                ? "Kilde: IDC, The Future of Audit\nand Accounting in the AI Era,\n2026 · n=1.005"
                : "Source: IDC, The Future of Audit\nand Accounting in the AI Era,\n2026 · n=1,005"}
            </p>
          </div>
        </motion.div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
.hv4-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
@media (max-width: 900px) {
  .hv4-grid { grid-template-columns: 1fr !important; }
  .hv4-stat-col { padding-left: 0 !important; padding-top: 48px !important; border-top: 1px solid rgba(168,85,247,0.3) !important; }
}
      ` }} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PAGE — Four hero versions stacked for comparison
   ════════════════════════════════════════════════════════════════════════ */
export default function FinancialAuditingAIPage() {
  const locale = useLocale();

  return (
    <main style={{ background: "#fff" }}>
      <Navbar />

      {/* Internal note banner — strip before going public */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "linear-gradient(90deg, #0B0F1A, #1A1040)",
          color: "#fff",
          padding: "12px 24px",
          fontFamily: "var(--font-geist), system-ui, sans-serif",
          fontSize: 13,
          textAlign: "center",
          letterSpacing: "0.02em",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <strong style={{ color: "#E879F9" }}>Intern designsammenligning</strong>
        <span style={{ opacity: 0.7, margin: "0 12px" }}>·</span>
        <span style={{ opacity: 0.85 }}>4 hero-versioner stacked nedenfor — vælg én retning</span>
      </div>

      <HeroV1 locale={locale} />
      <HeroV2 locale={locale} />
      <HeroV3 locale={locale} />
      <HeroV4 locale={locale} />
    </main>
  );
}
