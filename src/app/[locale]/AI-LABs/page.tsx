"use client";

import React, { useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
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

/* ════════════════════════════════════════════════════════════════════════
   HERO — AI-LABs
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
      className="lab-hero"
      aria-label="AI-LABs — confidential AI forum"
    >
      {/* Background video */}
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
        <source src="/assets/home/Workshop/workshop_hero_movie.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(4,6,15,0.68) 0%, rgba(8,6,25,0.72) 50%, rgba(22,13,53,0.70) 100%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Bottom fade */}
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
      <div aria-hidden className="lab-noise" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

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
        className="lab-grid"
      >
        {/* ── Left: text column ── */}
        <div style={{ paddingLeft: "clamp(0px, 4vw, 100px)", paddingTop: "clamp(20px, 3vw, 48px)" }} className="lab-hero-left">

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
              AI-LABs
            </span>
          </motion.div>

          {/* H1 — dominant visual headline */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(3rem, 4.4vw, 5.4rem)",
              fontWeight: 800, lineHeight: 1.15,
              letterSpacing: "-0.03em", color: "#fff", margin: "0 0 28px",
              maxWidth: 800,
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}
          >
            {locale === "da" ? (
              <>
                De virksomheder,
                <br />
                <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.38)" }}>
                  der lærer sammen,{" "}
                </span>
                <span style={{
                  background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  fontWeight: 800,
                }}>
                  vinder sammen.
                </span>
              </>
            ) : (
              <>
                The Companies
                <br />
                <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.38)" }}>
                  That Learn Together.{" "}
                </span>
                <br />
                <span style={{
                  background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  fontWeight: 800,
                }}>
                  Will Win Together.
                </span>
              </>
            )}
          </motion.h1>

          {/* Thin gradient rule */}
          <motion.div variants={fadeUp} style={{ margin: "0 0 28px" }}>
            <div style={{ width: 52, height: 1, background: "linear-gradient(90deg, #A855F7, #22D3EE)" }} />
          </motion.div>

          {/* Sub text */}
          <motion.p
            variants={fadeUp}
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
              ? "AI-LABs er et fortroligt forum for virksomheder inden for EU, der aktivt arbejder med AI, digital transformation og fremtiden for deres forretning."
              : "AI-LABs is a confidential forum for organizations within the EU that are actively working with AI, digital transformation, and the future of their business."}
          </motion.p>

          {/* Single CTA */}
          <motion.div variants={fadeUp}>
            <Link
              href={`/${locale}/contact`}
              className="lab-cta-btn"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "16px 30px", borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(255,255,255,0.22)",
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                transition: "background 0.22s ease, border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease",
              }}
            >
              {locale === "da" ? "Anmod om deltagelse" : "Request to join"} <span aria-hidden>→</span>
            </Link>
          </motion.div>

        </div>

        {/* ── Right: stat column ── */}
        <motion.div
          variants={fadeUp}
          style={{ position: "relative", paddingLeft: 56 }}
          className="lab-stat-col"
        >
          {/* Vertical accent line */}
          <div aria-hidden style={{
            position: "absolute", left: 0, top: "5%", bottom: "5%", width: 1,
            background: "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.7) 25%, rgba(34,211,238,0.7) 75%, transparent 100%)",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Label */}
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase" as const, color: "rgba(255,255,255,0.50)", margin: "0 0 20px",
            }}>
              {locale === "da" ? "Eksklusivt · Fortroligt" : "Exclusive · Confidential"}
            </p>

            {/* Big stat */}
            <p style={{
              fontSize: "clamp(4rem, 6.5vw, 8rem)",
              fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em",
              margin: "0 0 28px",
              background: "linear-gradient(135deg, rgba(168,85,247,0.95) 0%, rgba(129,140,248,0.90) 50%, rgba(34,211,238,0.88) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              5 Seats
            </p>

            {/* Description */}
            <p style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.6,
              color: "rgba(255,255,255,0.95)", maxWidth: 380, margin: "0 0 24px",
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
            }}>
              {locale === "da"
                ? "Kom ind i rummet, hvor de førende virksomheder finder ud af, hvordan AI vil omforme deres forretning."
                : "Get inside the room where leading companies are figuring out how AI will reshape their business."}
            </p>

            {/* Hosted by logos */}
            <div style={{ marginTop: "clamp(32px, 3.5vw, 52px)", display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "clamp(0.72rem, 0.8vw, 0.82rem)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.04em",
              }}>
                {locale === "da" ? "Hostet af" : "Hosted by"}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 0.6vw, 10px)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logos/logo-white.png"
                  alt="xrNORD"
                  style={{ height: "auto", width: "clamp(64px, 6vw, 88px)", opacity: 0.80 }}
                />
                <span style={{
                  color: "rgba(255,255,255,0.40)",
                  fontSize: "clamp(1rem, 1.2vw, 1.4rem)",
                  fontWeight: 300,
                  lineHeight: 1,
                }}>
                  &amp;
                </span>
                <a href="https://www.nomtek.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/AILABs/Nomtek_logo.png"
                    alt="Nomtek"
                    style={{ height: "auto", width: "clamp(64px, 6vw, 88px)", opacity: 0.80 }}
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{
          position: "absolute", bottom: "clamp(20px, 3vw, 40px)", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        >
          <div
            aria-hidden
            style={{
              width: 1, height: 40,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
            }}
          />
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            style={{ color: "rgba(255,255,255,0.3)" }}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
.lab-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
.lab-cta-btn:hover {
  background: rgba(255,255,255,0.12) !important;
  border-color: rgba(255,255,255,0.45) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 24px rgba(168,85,247,0.20) !important;
}
@media (max-width: 1024px) {
  .lab-grid { gap: clamp(32px, 4vw, 60px) !important; }
}
@media (max-width: 900px) {
  .lab-grid { grid-template-columns: 1fr !important; padding-left: 0 !important; }
  .lab-hero-left { padding-left: 0 !important; }
  .lab-stat-col { padding-left: 0 !important; padding-top: 48px !important; border-top: 1px solid rgba(168,85,247,0.3) !important; }
}
      ` }} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FUTURE USPs — animated 4-curve graph
   ════════════════════════════════════════════════════════════════════════ */
function FutureUsps({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  const curves = [
    {
      key: "data",
      d: "M 60 540 C 240 520, 460 490, 760 430",
      gradId: "usp-grad-data",
      gradStops: [
        { offset: "0%",   color: "#FBBF24" },
        { offset: "100%", color: "#F97316" },
      ],
      glow: "#F97316",
      delay: 0.35,
    },
    {
      key: "cap",
      d: "M 60 540 C 240 480, 460 380, 760 280",
      gradId: "usp-grad-cap",
      gradStops: [
        { offset: "0%",   color: "#818CF8" },
        { offset: "100%", color: "#818CF8" },
      ],
      glow: "#818CF8",
      delay: 0.55,
    },
    {
      key: "opt",
      d: "M 60 540 C 220 510, 320 280, 420 250 C 540 220, 640 320, 760 360",
      gradId: "usp-grad-opt",
      gradStops: [
        { offset: "0%",   color: "#818CF8" },
        { offset: "50%",  color: "#A855F7" },
        { offset: "100%", color: "#E879F9" },
      ],
      glow: "#A855F7",
      delay: 0.75,
    },
    {
      key: "usp",
      d: "M 60 540 C 320 530, 540 410, 760 80",
      gradId: "usp-grad-usp",
      gradStops: [
        { offset: "0%",   color: "#A855F7" },
        { offset: "60%",  color: "#E879F9" },
        { offset: "100%", color: "#EC4899" },
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
        /* Top edge matches section 3's bottom (#0C0A24) so the seam disappears,
           then settles into its own deep navy */
        background: "linear-gradient(168deg, #0C0A24 0%, #070815 16%, #04060F 38%)",
        color: "#F5F5F7",
        overflow: "hidden",
        isolation: "isolate",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      {/* Top-left purple bloom — flows from section 3's bottom-left purple */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 55% at 4% 0%, rgba(168,85,247,0.18) 0%, rgba(99,102,241,0.07) 42%, transparent 70%)",
      }} />

      {/* Top-right purple/indigo bloom — receives transition from section 3's right side */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 96% 0%, rgba(99,102,241,0.14) 0%, rgba(168,85,247,0.08) 35%, transparent 70%)",
      }} />

      {/* Top-center indigo bloom — bridges the middle transition from section 3 */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(99,102,241,0.12) 0%, rgba(129,140,248,0.06) 40%, transparent 70%)",
      }} />

      {/* Bottom-right cyan bloom — mirrors section 2's cyan, anchors the section */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 50% at 96% 100%, rgba(34,211,238,0.16) 0%, rgba(129,140,248,0.07) 45%, transparent 72%)",
      }} />

      {/* Bottom-left indigo bloom — flows into section 5's top-left indigo for smooth seam */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 65% 60% at 4% 100%, rgba(99,102,241,0.14) 0%, rgba(129,140,248,0.06) 40%, transparent 70%)",
      }} />

      {/* Bottom-center indigo bloom — bridges middle transition to section 5 */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 55% at 50% 100%, rgba(99,102,241,0.12) 0%, rgba(129,140,248,0.06) 40%, transparent 70%)",
      }} />

      {/* Stage-light ambience */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background:
          "radial-gradient(ellipse 60% 55% at 60% 55%, rgba(168,85,247,0.10) 0%, rgba(99,102,241,0.06) 35%, transparent 70%)," +
          "radial-gradient(ellipse 35% 35% at 80% 25%, rgba(232,121,249,0.05) 0%, transparent 70%)",
      }} />

      {/* Micro grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 70% 60% at 60% 50%, black 30%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 60% 50%, black 30%, transparent 90%)",
      }} />

      {/* ── Centered headline ── */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", textAlign: "center", marginBottom: "clamp(48px, 6vw, 96px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "clamp(16px, 2vw, 24px)" }}
        >
          <span style={{
            fontSize: 12, fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}>
            {locale === "da" ? "Sammen kan Europa vinde" : "Together Europe Can Win"}
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(2.4rem, 4vw, 4.8rem)",
            fontWeight: 800, lineHeight: 1.04,
            letterSpacing: "-0.035em",
            color: "#F5F5F7",
            margin: "0 auto",
            maxWidth: "clamp(320px, 88vw, 1300px)",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
          }}
        >
          {(() => {
            const g = { background: "linear-gradient(135deg, #6366F1 0%, #818CF8 40%, #A855F7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } as const;
            return locale === "da" ? (
              <>
                <span style={g}>Udfordringen</span> er så <span style={g}>kompleks og hurtig</span>, at selv{" "}
                <span style={g}>jeres organisation</span> har brug for et{" "}
                <span style={g}>forum som dette</span>
              </>
            ) : (
              <>
                <span style={g}>The challenge</span> is so <span style={g}>complex and fast</span> that even{" "}
                <span style={g}>your organization</span> needs a{" "}
                <span style={g}>forum like this</span>
              </>
            );
          })()}
        </motion.h2>
      </div>

      <div
        className="lab-usp-layout"
        style={{
          position: "relative", zIndex: 1, width: "100%",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.15fr)",
          gap: "clamp(48px, 6vw, 100px)",
          alignItems: "start",
        }}
      >
        {/* ── Left: text ── */}
        <div
          className="lab-usp-text"
          style={{
            paddingLeft: "clamp(80px, 14vw, 260px)",
            paddingTop: "clamp(16px, 2vw, 32px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(1rem, 1.15vw, 1.1rem)",
              lineHeight: 1.8,
              color: "rgba(245,245,247,0.65)",
              maxWidth: 520,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 300,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 1.8vw, 24px)",
            }}
          >
            {locale === "da" ? (
              <>
                <p style={{ margin: 0, color: "#F5F5F7", fontWeight: 400 }}>
                  Virksomheder udforsker i øjeblikket de samme muligheder.
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    "Hvordan man bliver mere effektiv.",
                    "Hvordan man frigiver mere værdi fra data.",
                    "Hvordan man bygger AI ind i produkter, services og daglig drift.",
                    "Og i sidste ende, hvordan man skaber den næste generation af konkurrencefordele.",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10 }}>
                      <span style={{ opacity: 0.4, flexShrink: 0 }}>-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ margin: 0, color: "#F5F5F7", fontWeight: 400 }}>
                  Udfordringen er, at alt dette sker samtidigt.
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    "Ingen virksomhed kan eksperimentere med alt.",
                    "Intet ledelsesteam kan se alle muligheder.",
                    "Og ingen organisation har et komplet playbook.",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10 }}>
                      <span style={{ opacity: 0.4, flexShrink: 0 }}>-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ margin: 0, color: "#F5F5F7", fontWeight: 400 }}>
                  Derfor er deling af erfaringer, lærte lektioner og perspektiver med andre fremsynede virksomheder blevet en af de hurtigste måder at accelerere fremskridt.
                </p>
              </>
            ) : (
              <>
                <div className="lab-usp-intro">
                  <p style={{ margin: 0, color: "#F5F5F7", fontWeight: 400 }}>
                    Companies are currently exploring the same opportunities.
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                    {[
                      "How to become more efficient.",
                      "How to unlock more value from data.",
                      "How to build AI into products, services, and daily operations.",
                      "And ultimately, how to create the next generation of competitive advantage.",
                    ].map((item) => (
                      <li key={item} style={{ display: "flex", gap: 10 }}>
                        <span style={{ opacity: 0.4, flexShrink: 0 }}>-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p style={{ margin: 0, color: "#F5F5F7", fontWeight: 400 }}>
                    The challenge is that all of this is happening simultaneously.
                  </p>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    "No company can experiment with everything.",
                    "No leadership team can see every opportunity.",
                    "And no organization has a complete playbook.",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10 }}>
                      <span style={{ opacity: 0.4, flexShrink: 0 }}>-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ margin: 0, color: "#F5F5F7", fontWeight: 400 }}>
                  That is why sharing experiences, lessons learned, and perspectives with other forward-thinking companies has become one of the fastest ways to accelerate progress.
                </p>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: "clamp(28px, 3.5vw, 48px)" }}
            className="lab-usp-cta-wrap"
          >
            <Link
              href={`/${locale}/ai-labs-apply`}
              className="lab-usp-cta"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "17px 44px", borderRadius: 999,
                background: "rgba(99,102,241,0.12)",
                color: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(129,140,248,0.45)",
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                boxShadow: "0 0 28px rgba(99,102,241,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
                transition: "background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
              }}
            >
              {locale === "da" ? "Bliv en del af det!" : "Become part of it!"}
              <span aria-hidden> →</span>
            </Link>
          </motion.div>

        </div>

        {/* ── Right: animated 4-curve graph ── */}
        <div className="lab-usp-graph" style={{ position: "relative", width: "100%", display: "flex", justifyContent: "flex-start", alignSelf: "start", marginTop: "clamp(-40px, -4vw, -80px)", marginLeft: "clamp(-120px, -12vw, -220px)" }}>
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

            <motion.text
              x="725" y="68"
              textAnchor="end"
              fill="#EC4899"
              fontSize="12"
              fontWeight="600"
              fontFamily="var(--font-inter), system-ui, sans-serif"
              style={{ letterSpacing: "0.04em", filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.70))" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 3.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {locale === "da" ? "Fremtidens USP'er" : "Your future USP´s"}
            </motion.text>

            <motion.text
              x="430" y="218"
              textAnchor="middle"
              fill="#A855F7"
              fontSize="12"
              fontWeight="600"
              fontFamily="var(--font-inter), system-ui, sans-serif"
              style={{ letterSpacing: "0.04em", filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.70))" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 3.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {locale === "da" ? "Optimering & Automatisering" : "Optimization & Automation"}
            </motion.text>

            <motion.text
              x="590" y="440"
              textAnchor="middle"
              fill="#F97316"
              fontSize="12"
              fontWeight="600"
              fontFamily="var(--font-inter), system-ui, sans-serif"
              style={{ letterSpacing: "0.04em", filter: "drop-shadow(0 0 8px rgba(249, 115, 22, 0.70))" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {locale === "da" ? "Jeres AI Data" : "Your AI Data"}
            </motion.text>

            <motion.text
              x="850" y="255"
              textAnchor="end"
              fill="#818CF8"
              fontSize="12"
              fontWeight="600"
              fontFamily="var(--font-inter), system-ui, sans-serif"
              style={{ letterSpacing: "0.04em", filter: "drop-shadow(0 0 8px rgba(129, 140, 248, 0.70))" }}
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
        .lab-usp-cta:hover {
          background: rgba(99,102,241,0.24) !important;
          border-color: rgba(129,140,248,0.70) !important;
          box-shadow: 0 0 40px rgba(99,102,241,0.30), 0 0 12px rgba(168,85,247,0.18), inset 0 1px 0 rgba(255,255,255,0.12) !important;
          transform: translateY(-2px);
        }
        /* Desktop (≤1700px) — ease the graph's negative pull so it no longer
           overlaps the body text. Monitor (1920) keeps the base -120px. */
        @media (max-width: 1700px) {
          .lab-usp-graph { margin-left: clamp(-80px, -3vw, -40px) !important; }
          .lab-usp-text { padding-left: clamp(60px, 11vw, 175px) !important; }
          .lab-usp-intro { display: none !important; }
          .lab-usp-cta-wrap { margin-top: clamp(48px, 6vw, 80px) !important; }
        }
        @media (max-width: 1100px) {
          .lab-usp-text { padding-left: clamp(24px, 6vw, 80px) !important; }
        }
        @media (max-width: 900px) {
          .lab-usp-layout {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .lab-usp-text { padding-left: 0 !important; }
          .lab-usp-graph { margin-left: 0 !important; margin-top: 0 !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════════════════════
   PURPOSE — What's in it for us
   ════════════════════════════════════════════════════════════════════════ */
/* 5-node pentagon network diagram */
function RoundTableSVG({ isInView }: { isInView: boolean }) {
  // Pentagon nodes: 5 seats arranged around a central hub
  // Angles starting from top, going clockwise every 72°
  const cx = 200, cy = 200, r = 130;
  const nodes = Array.from({ length: 5 }, (_, i) => {
    const angle = (-90 + i * 72) * (Math.PI / 180);
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  // All 10 connections between nodes
  const connections: [number, number][] = [];
  for (let a = 0; a < 5; a++)
    for (let b = a + 1; b < 5; b++)
      connections.push([a, b]);

  return (
    <svg viewBox="0 0 400 400" style={{ width: "100%", height: "auto", maxWidth: 460, display: "block", overflow: "visible" }} aria-hidden>
      <defs>
        <radialGradient id="hub-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="node-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
        <filter id="node-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ambient glow behind hub */}
      <circle cx={cx} cy={cy} r={160} fill="url(#hub-grad)" />

      {/* Pentagon ring */}
      <motion.polygon
        points={nodes.map(n => `${n.x},${n.y}`).join(" ")}
        fill="none"
        stroke="rgba(34,211,238,0.12)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* Connection lines between all nodes */}
      {connections.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="url(#line-grad)"
          strokeWidth="0.8"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Spoke lines: each node → center */}
      {nodes.map((n, i) => (
        <motion.line
          key={`spoke-${i}`}
          x1={n.x} y1={n.y}
          x2={cx} y2={cy}
          stroke="rgba(129,140,248,0.20)"
          strokeWidth="0.8"
          strokeDasharray="3 4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 + i * 0.1 }}
        />
      ))}

      {/* Central hub — "table" */}
      <motion.circle
        cx={cx} cy={cy} r={38}
        fill="rgba(8,12,26,0.90)"
        stroke="rgba(34,211,238,0.30)"
        strokeWidth="1.2"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        filter="url(#node-glow)"
      />
      <motion.text
        x={cx} y={cy + 5}
        textAnchor="middle"
        fill="#22D3EE"
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--font-geist), system-ui, sans-serif"
        letterSpacing="0.12em"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        AI-LABs
      </motion.text>

      {/* The 5 seat nodes — each with a unique brand colour */}
      {[
        "#22D3EE", // cyan
        "#818CF8", // indigo
        "#A855F7", // purple
        "#E879F9", // magenta
        "#EC4899", // pink
      ].map((color, i) => {
        const n = nodes[i];
        return (
          <g key={`node-${i}`}>
            {/* Outer glow ring */}
            <motion.circle
              cx={n.x} cy={n.y} r={22}
              fill={`${color}0D`}
              stroke={`${color}30`}
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
            {/* Inner filled node */}
            <motion.circle
              cx={n.x} cy={n.y} r={13}
              fill={`${color}1A`}
              stroke={color}
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              filter="url(#node-glow)"
            />
          </g>
        );
      })}

      {/* Animated pulse rings on hub */}
      {[0, 0.6, 1.2].map((delay, i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={cx} cy={cy} r={38}
          fill="none"
          stroke="rgba(34,211,238,0.18)"
          strokeWidth="1"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={isInView ? { scale: [1, 2.2], opacity: [0.35, 0] } : {}}
          transition={{ duration: 2.4, delay: 1.5 + delay, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
    </svg>
  );
}

function Purpose({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const bullets = locale === "da"
    ? [
        "Lær af virkelige AI-initiativer",
        "Forstå hvad der virker, og hvad der ikke gør",
        "Udforsk hvordan organisationer udvikler sig",
        "Benchmarket jeres egen AI-rejse",
        "Opbyg et betroet netværk af ligesindede",
        "Modtag de nyeste AI-teknologiopdateringer",
      ]
    : [
        "Learn From Real-World AI Initiatives",
        "Understand What Is Working And What Isn't",
        "Explore How Organizations Are Evolving",
        "Benchmark Your Own Journey",
        "Build A Trusted Network Of Peers",
        "Receive Newest AI Tech Updates",
      ];

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        padding: "clamp(80px, 10vw, 140px) clamp(24px, 6vw, 160px)",
        background: "linear-gradient(168deg, #04060F 0%, #070815 30%, #0A0820 100%)",
        color: "#F5F5F7",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Purple bloom bottom-right — exact copy of section 5's bottom-right */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 95% 100%, rgba(168,85,247,0.14) 0%, rgba(99,102,241,0.06) 50%, transparent 72%)",
      }} />

      {/* Purple bloom bottom-left — exact copy of section 5's bottom-left */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 55% at 4% 100%, rgba(168,85,247,0.14) 0%, rgba(99,102,241,0.06) 45%, transparent 70%)",
      }} />

      {/* Indigo bloom bottom-center — exact copy of section 5's bottom-center */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 55% at 50% 100%, rgba(99,102,241,0.10) 0%, rgba(129,140,248,0.05) 40%, transparent 70%)",
      }} />

      {/* Hairline top border */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.35) 30%, rgba(129,140,248,0.35) 70%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>

        {/* ── Top row: headline + network graphic ── */}
        <div
          className="lab-purpose-top"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "clamp(48px, 6vw, 100px)",
            alignItems: "center",
            marginBottom: "clamp(56px, 7vw, 100px)",
          }}
        >
          {/* Left: eyebrow + H2 + body */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ paddingLeft: "clamp(0px, 7vw, 180px)" }}
          >
            {/* Eyebrow pill */}
            <div style={{ marginBottom: "clamp(20px, 2.5vw, 32px)" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                padding: "7px 16px", borderRadius: 999,
                background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.28)",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
                textTransform: "uppercase" as const, color: "#22D3EE",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#22D3EE,#818CF8)", display: "inline-block", flexShrink: 0 }} />
                {locale === "da" ? "Formål" : "Purpose"}
              </span>
            </div>

            <h2 style={{
              fontSize: "clamp(2.2rem, 3.5vw, 4.2rem)",
              fontWeight: 800, lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#F5F5F7",
              margin: "0 0 clamp(20px, 2.5vw, 36px)",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              {locale === "da"
                ? <>Hvad får vi ud af det<br /><span style={{ background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Hvorfor bruge tiden?</span></>
                : <>{"What's in it for us"}<br /><span style={{ background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Why spend the time?</span></>
              }
            </h2>

            {/* Thin divider */}
            <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, #22D3EE, #818CF8)", marginBottom: "clamp(20px, 2.5vw, 32px)" }} />

            <p style={{
              fontSize: "clamp(1rem, 1.1vw, 1.1rem)",
              lineHeight: 1.75,
              margin: "0 0 18px",
              maxWidth: 580,
              color: "rgba(245,245,247,0.90)",
              fontWeight: 400,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}>
              {locale === "da"
                ? "AI-LABs er skabt for at hjælpe organisationer med at komme videre end AI-præsentationer, leverandørpitches og isolerede pilotprojekter."
                : "AI-LABs exists to help organizations move beyond AI presentations, vendor pitches, and isolated pilot projects."}
            </p>
            <p style={{
              fontSize: "clamp(1rem, 1.1vw, 1.1rem)",
              lineHeight: 1.75,
              color: "rgba(245,245,247,0.65)",
              margin: 0,
              maxWidth: 580,
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
            }}>
              {locale === "da"
                ? "Formålet er at skabe et fortroligt, praksisorienteret miljø, hvor seniorledere åbent kan diskutere, hvordan AI faktisk implementeres, styres og operationaliseres i rigtige organisationer."
                : "The purpose is to create a confidential, practice-oriented environment where senior leaders can openly discuss how AI is actually being implemented, governed, and operationalized inside real organizations."}
            </p>
          </motion.div>

          {/* Right: 5-seat network diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <RoundTableSVG isInView={isInView} />
          </motion.div>
        </div>

        {/* ── Bottom row: 6 bullet cards ── */}
        <div
          className="lab-purpose-bullets"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(12px, 1.5vw, 20px)",
            paddingLeft: "clamp(0px, 7vw, 180px)",
          }}
        >
          {bullets.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "clamp(14px, 1.5vw, 20px) clamp(16px, 1.8vw, 24px)",
                borderRadius: 12,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(34,211,238,0.10)",
              }}
            >
              <span style={{
                flexShrink: 0, marginTop: 2,
                width: 22, height: 22, borderRadius: "50%",
                background: "rgba(34,211,238,0.08)",
                border: "1px solid rgba(34,211,238,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#22D3EE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "clamp(0.88rem, 0.95vw, 0.95rem)",
                fontWeight: 500,
                color: "rgba(245,245,247,0.85)",
                lineHeight: 1.45,
              }}>
                {text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .lab-purpose-top { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .lab-purpose-bullets { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   TERMS — Cost & Confidentiality (organic diagonal composition)
   ════════════════════════════════════════════════════════════════════════ */
function Terms({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "clamp(700px, 72vw, 960px)",
        /* Top edge matches section 2's bottom (#0A0820) so the seam disappears,
           then settles into the deep navy below */
        background: "linear-gradient(168deg, #0A0820 0%, #070815 40%, #04060F 100%)",
        color: "#F5F5F7",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >

      {/* Bottom-left purple bloom — EXACT mirror of section 4's top-left purple,
          so the colour is continuous across the seam (no dark gap). */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 55% at 4% 100%, rgba(168,85,247,0.18) 0%, rgba(99,102,241,0.07) 42%, transparent 70%)",
      }} />

      {/* Bottom-right bloom — EXACT mirror of section 4's top-right bloom. */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 96% 100%, rgba(99,102,241,0.14) 0%, rgba(168,85,247,0.08) 35%, transparent 70%)",
      }} />

      {/* Bottom-center indigo bloom — EXACT mirror of section 4's top-center,
          bridges the middle of the seam. */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 55% at 50% 100%, rgba(99,102,241,0.12) 0%, rgba(129,140,248,0.06) 40%, transparent 70%)",
      }} />

      {/* Purple bloom top-left — exact copy of section 6's top-left */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 55% at 4% 0%, rgba(168,85,247,0.14) 0%, rgba(99,102,241,0.06) 45%, transparent 70%)",
      }} />

      {/* Purple bloom top-right — exact copy of section 6's top-right */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 95% 0%, rgba(168,85,247,0.14) 0%, rgba(99,102,241,0.06) 50%, transparent 72%)",
      }} />

      {/* Indigo bloom top-center — exact copy of section 6's top-center */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(99,102,241,0.10) 0%, rgba(129,140,248,0.05) 40%, transparent 70%)",
      }} />

      {/* Subtle grid — same language as hero */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 100% 90% at 50% 50%, black 10%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(ellipse 100% 90% at 50% 50%, black 10%, transparent 85%)",
      }} />

      {/* Diagonal light ray — same accent as hero */}
      <div aria-hidden style={{
        position: "absolute", top: "22%", left: "-5%",
        width: "110%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.10) 40%, rgba(34,211,238,0.10) 60%, transparent)",
        transform: "rotate(-5deg)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Grain texture */}
      <div aria-hidden className="lab-noise" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.8 }} />

      {/* Ghost "TIME" — anchored bottom-left (echoes left content position) */}
      <div aria-hidden style={{
        position: "absolute",
        bottom: "-5%", left: "-1%",
        fontSize: "clamp(110px, 17vw, 210px)",
        fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(168,85,247,0.09)",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        letterSpacing: "-0.05em",
        pointerEvents: "none", userSelect: "none" as const, whiteSpace: "nowrap" as const,
        zIndex: 0,
      }}>
        {locale === "da" ? "TID" : "TIME"}
      </div>

      {/* Ghost "NDA" — anchored top-right (echoes right content position) */}
      <div aria-hidden style={{
        position: "absolute",
        top: "-5%", right: "-1%",
        fontSize: "clamp(110px, 17vw, 210px)",
        fontWeight: 900, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(34,211,238,0.07)",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        letterSpacing: "-0.05em",
        pointerEvents: "none", userSelect: "none" as const, whiteSpace: "nowrap" as const,
        zIndex: 0,
      }}>
        NDA
      </div>

      {/* ── Three columns: DIAGONAL composition ───────────────────────────
           Right:  content at TOP    → eye enters top-right
           Middle: content at CENTER → eye passes through midpoint
           Left:   content at BOTTOM → eye exits bottom-left
           Creates a sweeping diagonal reading flow across the section      */}
      <div
        className="lab-terms-cols"
        style={{
          position: "relative", zIndex: 2,
          width: "100%",
          display: "flex",
          minHeight: "clamp(700px, 72vw, 960px)",
        }}
      >

        {/* ══ LEFT: Investment — anchored to BOTTOM ══ */}
        <div
          className="lab-terms-left"
          style={{
            flex: "0 0 33.333%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "clamp(60px, 6vw, 100px) clamp(20px, 2vw, 36px) clamp(80px, 10vw, 140px) clamp(60px, 11vw, 200px)",
          }}
        >
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.20 }}
            style={{ marginBottom: "clamp(22px, 2.5vw, 36px)" }}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(168,85,247,0.10)", border: "1px solid rgba(168,85,247,0.28)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
              textTransform: "uppercase" as const, color: "#C084FC",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#A855F7,#E879F9)", display: "inline-block", flexShrink: 0 }} />
              {locale === "da" ? "Investering" : "Investment"}
            </span>
          </motion.div>

          {/* H2 */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.30 }}
            style={{
              fontSize: "clamp(2.6rem, 3.8vw, 4.8rem)",
              fontWeight: 800, lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: "#F5F5F7",
              margin: "0 0 clamp(26px, 2.8vw, 40px)",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}
          >
            {locale === "da" ? (
              <>
                Jeres omkostning er<br />
                <span style={{ background: "linear-gradient(135deg, #A855F7 0%, #E879F9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  jeres tid
                </span>
              </>
            ) : (
              <>
                Your Cost is<br />
                <span style={{ background: "linear-gradient(135deg, #A855F7 0%, #E879F9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Your Time
                </span>
              </>
            )}
          </motion.h2>

          {/* Divider rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.42 }}
            style={{ width: 44, height: 1, background: "linear-gradient(90deg, #A855F7, #E879F9)", marginBottom: "clamp(20px, 2.2vw, 32px)", transformOrigin: "left" }}
          />

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.50 }}
            style={{
              fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
              lineHeight: 1.78,
              color: "rgba(245,245,247,0.50)",
              margin: 0, maxWidth: 400,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 300,
            }}
          >
            {locale === "da"
              ? "Intet monetært kontingent. Din forpligtelse er tre ting: møde op forberedt, dele din reelle erfaring åbent og beskytte fortroligheden for alle andre deltagere i rummet."
              : "No financial membership fee. Your commitment is three things: showing up prepared, sharing your real experience openly, and protecting the confidentiality of every other member in the room."}
          </motion.p>
        </div>

        {/* ══ MIDDLE: No direct competition — anchored to CENTER ══ */}
        <div
          className="lab-terms-middle"
          style={{
            flex: "0 0 33.333%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(60px, 6vw, 100px) clamp(20px, 2vw, 36px) clamp(60px, 6vw, 100px) clamp(40px, 6vw, 100px)",
          }}
        >
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            style={{ marginBottom: "clamp(22px, 2.5vw, 36px)" }}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.28)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
              textTransform: "uppercase" as const, color: "#818CF8",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#818CF8,#A855F7)", display: "inline-block", flexShrink: 0 }} />
              {locale === "da" ? "Deltagere" : "Members"}
            </span>
          </motion.div>

          {/* H2 */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.24 }}
            style={{
              fontSize: "clamp(2.6rem, 3.8vw, 4.8rem)",
              fontWeight: 800, lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: "#F5F5F7",
              margin: "0 0 clamp(26px, 2.8vw, 40px)",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}
          >
            {locale === "da" ? (
              <>
                Ingen direkte{" "}
                <span style={{ background: "linear-gradient(135deg, #818CF8 0%, #A855F7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  konkurrence
                </span>
              </>
            ) : (
              <>
                No direct{" "}
                <span style={{ background: "linear-gradient(135deg, #818CF8 0%, #A855F7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  competition
                </span>
              </>
            )}
          </motion.h2>

          {/* Divider rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.36 }}
            style={{ width: 44, height: 1, background: "linear-gradient(90deg, #818CF8, #A855F7)", marginBottom: "clamp(20px, 2.2vw, 32px)", transformOrigin: "left" }}
          />

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.44 }}
            style={{
              fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
              lineHeight: 1.78,
              color: "rgba(245,245,247,0.50)",
              margin: 0, maxWidth: 400,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 300,
            }}
          >
            {locale === "da"
              ? "Vi sikrer, at deltagerne ikke er i direkte konkurrence med hinanden."
              : "We are ensuring that the participants are not in direct competition with each other."}
          </motion.p>
        </div>

        {/* ══ RIGHT: Confidentiality — anchored to TOP ══ */}
        <div
          className="lab-terms-right"
          style={{
            flex: "0 0 33.333%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "clamp(80px, 10vw, 140px) clamp(40px, 7vw, 140px) clamp(60px, 6vw, 100px) clamp(20px, 2vw, 36px)",
          }}
        >
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.10 }}
            style={{ marginBottom: "clamp(22px, 2.5vw, 36px)" }}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px", borderRadius: 999,
              background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.28)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.20em",
              textTransform: "uppercase" as const, color: "#22D3EE",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg,#22D3EE,#818CF8)", display: "inline-block", flexShrink: 0 }} />
              {locale === "da" ? "Fortrolighed" : "Confidentiality"}
            </span>
          </motion.div>

          {/* H2 */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.18 }}
            style={{
              fontSize: "clamp(2.6rem, 3.8vw, 4.8rem)",
              fontWeight: 800, lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: "#F5F5F7",
              margin: "0 0 clamp(26px, 2.8vw, 40px)",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}
          >
            {locale === "da" ? (
              <>
                Fortrolighed sikres<br />
                ved{" "}
                <span style={{ background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  NDA
                </span>
              </>
            ) : (
              <>
                Confidentiality<br />
                enforced by{" "}
                <span style={{ background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  NDA
                </span>
              </>
            )}
          </motion.h2>

          {/* Divider rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.30 }}
            style={{ width: 44, height: 1, background: "linear-gradient(90deg, #22D3EE, #818CF8)", marginBottom: "clamp(20px, 2.2vw, 32px)", transformOrigin: "left" }}
          />

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.38 }}
            style={{
              fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
              lineHeight: 1.78,
              color: "rgba(245,245,247,0.50)",
              margin: 0, maxWidth: 400,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 300,
            }}
          >
            {locale === "da"
              ? "Alle deltagere underskriver en NDA inden første session. Det, der siges i AI-LABs, forbliver i AI-LABs. Det er det, der gør samtalerne reelle."
              : "Every member signs an NDA before their first session. What is said in AI-LABs stays in AI-LABs. This is what makes the conversations real."}
          </motion.p>
        </div>
      </div>

      <style>{`
        /* Desktop (901–1700px, e.g. 1440) — slightly smaller column headings.
           Monitor (>1700) keeps the base clamp(2.6rem,3.8vw,4.8rem). */
        @media (min-width: 901px) and (max-width: 1700px) {
          .lab-terms-cols h2 { font-size: clamp(2.3rem, 3.4vw, 4.2rem) !important; }
        }
        @media (max-width: 900px) {
          .lab-terms-cols { flex-direction: column !important; min-height: auto !important; }
          .lab-terms-left, .lab-terms-middle, .lab-terms-right {
            flex: none !important; width: 100% !important;
            justify-content: flex-start !important;
            padding: clamp(60px, 8vw, 100px) clamp(24px, 6vw, 48px) clamp(48px, 6vw, 80px) !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   HOW, WHEN & WHERE — Low barrier forum
   ════════════════════════════════════════════════════════════════════════ */
function HowWhenWhere({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "80vh",
        padding: "clamp(80px, 10vw, 140px) clamp(24px, 6vw, 160px)",
        background: "linear-gradient(168deg, #04060F 0%, #070815 30%, #0A0820 100%)",
        color: "#F5F5F7",
        overflow: "hidden",
        isolation: "isolate",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Indigo bloom top-left — flows from section 4 */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 50% at 5% 0%, rgba(99,102,241,0.16) 0%, rgba(129,140,248,0.06) 45%, transparent 70%)",
      }} />

      {/* Indigo bloom top-center — bridges middle transition from section 4 */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(99,102,241,0.12) 0%, rgba(129,140,248,0.06) 40%, transparent 70%)",
      }} />

      {/* Cyan bloom top-right — receives transition from section 4's bottom-right */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 50% at 96% 0%, rgba(34,211,238,0.14) 0%, rgba(129,140,248,0.06) 40%, transparent 70%)",
      }} />

      {/* Purple bloom bottom-right — mirrors section 6's top-right at the seam */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 95% 100%, rgba(168,85,247,0.14) 0%, rgba(99,102,241,0.06) 50%, transparent 72%)",
      }} />

      {/* Purple bloom bottom-left — mirrors section 6's top-left at the seam */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 55% at 4% 100%, rgba(168,85,247,0.14) 0%, rgba(99,102,241,0.06) 45%, transparent 70%)",
      }} />

      {/* Indigo bloom bottom-center — mirrors section 6's top-center, bridges the middle of the seam */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 55% at 50% 100%, rgba(99,102,241,0.10) 0%, rgba(129,140,248,0.05) 40%, transparent 70%)",
      }} />

      {/* Micro grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 85%)",
      }} />

      {/* Grain */}
      <div aria-hidden className="lab-noise" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.7 }} />

      {/* ── Content: two columns ── */}
      <div className="lab-hww-layout" style={{
        position: "relative", zIndex: 1, width: "100%",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
        gap: "clamp(48px, 7vw, 120px)",
        alignItems: "center",
      }}>

        {/* ── LEFT: eyebrow + H2 + body ── */}
        <div className="lab-hww-text" style={{ paddingLeft: "clamp(200px, 22vw, 400px)" }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: "clamp(16px, 2vw, 24px)" }}
          >
            <span style={{
              fontSize: 12, fontWeight: 700, letterSpacing: "0.20em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}>
              {locale === "da" ? "Hvordan, Hvornår & Hvor" : "How, When & Where"}
            </span>
          </motion.div>

          {/* H2 */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(2.8rem, 5vw, 6rem)",
              fontWeight: 800, lineHeight: 1.04,
              letterSpacing: "-0.035em",
              color: "#F5F5F7",
              margin: "0 0 clamp(24px, 3vw, 40px)",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}
          >
            {locale === "da" ? (
              <>
                Et forum med{" "}
                <span style={{
                  background: "linear-gradient(135deg, #6366F1 0%, #818CF8 40%, #A855F7 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  lav barriere
                </span>
              </>
            ) : (
              <>
                A{" "}
                <span style={{
                  background: "linear-gradient(135deg, #6366F1 0%, #818CF8 40%, #A855F7 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  low barrier
                </span>
                {" "}forum
              </>
            )}
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(1rem, 1.15vw, 1.15rem)",
              lineHeight: 1.75,
              color: "rgba(245,245,247,0.60)",
              margin: 0,
              maxWidth: 520,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 300,
            }}
          >
            {locale === "da"
              ? "Forummet er designet til at have en lav barriere med maksimalt udbytte. Ingen rejse. Dine udgifter er din tid og forberedelse."
              : "The forum is designed to be a low barrier setup with maximum output. No travel. Your expenses are your time and preparation."}
          </motion.p>
        </div>

        {/* ── RIGHT: stats ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3vw, 40px)" }}>
          {[
            { value: locale === "da" ? "4 gange om året" : "4 Times a Year", sub: locale === "da" ? "Regelmæssige sessioner" : "Regular sessions" },
            { value: locale === "da" ? "Ingen rejse" : "No Travel", sub: locale === "da" ? "100% online format" : "100% online format" },
            { value: "2-3 hours", sub: locale === "da" ? "Pr. session" : "Per session" },
          ].map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.20 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderLeft: "2px solid rgba(129,140,248,0.35)",
                paddingLeft: "clamp(20px, 2.5vw, 32px)",
              }}
            >
              <div style={{
                fontSize: "clamp(1.6rem, 2.5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                background: "linear-gradient(135deg, #6366F1 0%, #818CF8 40%, #A855F7 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: "clamp(0.82rem, 0.9vw, 0.9rem)",
                color: "rgba(245,245,247,0.45)",
                fontWeight: 400,
                letterSpacing: "0.04em",
                marginTop: 4,
                fontFamily: "var(--font-inter), system-ui, sans-serif",
              }}>
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        /* Desktop (≤1700px, e.g. 1440) — pull the heading left so it aligns
           with section 4's body text edge and the empty band shrinks.
           Monitor (1920) keeps the base clamp(200px,22vw,400px). */
        @media (max-width: 1700px) {
          .lab-hww-text { padding-left: clamp(80px, 11vw, 175px) !important; }
        }
        @media (max-width: 1200px) {
          .lab-hww-text { padding-left: clamp(60px, 8vw, 140px) !important; }
        }
        @media (max-width: 900px) {
          .lab-hww-layout { grid-template-columns: 1fr !important; }
          .lab-hww-text { padding-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   CLOSING — Looking forward to meeting you
   ════════════════════════════════════════════════════════════════════════ */
function Closing({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <section
      ref={ref}
      className="lab-closing-section"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "80vh",
        padding: "clamp(20px, 3vw, 60px) clamp(24px, 6vw, 160px)",
        background: "linear-gradient(168deg, #0A0820 0%, #070815 40%, #04060F 100%)",
        color: "#F5F5F7",
        overflow: "hidden",
        isolation: "isolate",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Purple bloom top-left — mirrors section 5's bottom-left at the seam */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 55% at 4% 0%, rgba(168,85,247,0.14) 0%, rgba(99,102,241,0.06) 45%, transparent 70%)",
      }} />

      {/* Purple bloom top-right — mirrors section 5's bottom-right at the seam */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 55% 50% at 95% 0%, rgba(168,85,247,0.14) 0%, rgba(99,102,241,0.06) 50%, transparent 72%)",
      }} />

      {/* Indigo bloom top-center — mirrors section 5's bottom-center, bridges the middle of the seam */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(99,102,241,0.10) 0%, rgba(129,140,248,0.05) 40%, transparent 70%)",
      }} />

      {/* Cyan bloom bottom-right */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 50% 45% at 96% 90%, rgba(34,211,238,0.10) 0%, rgba(129,140,248,0.05) 50%, transparent 72%)",
      }} />

      {/* Grain */}
      <div aria-hidden className="lab-noise" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.7 }} />

      {/* ── Two columns ── */}
      <div
        className="lab-closing-layout"
        style={{
          position: "relative", zIndex: 1, width: "100%",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "clamp(48px, 7vw, 120px)",
          alignItems: "center",
        }}
      >
        {/* ── LEFT: H2 ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lab-closing-text"
          style={{ paddingLeft: "clamp(200px, 22vw, 400px)" }}
        >
          <h2 style={{
            fontSize: "clamp(2.6rem, 4.5vw, 5.5rem)",
            fontWeight: 800, lineHeight: 1.06,
            letterSpacing: "-0.035em",
            color: "#F5F5F7",
            margin: 0,
            fontFamily: "var(--font-geist), system-ui, sans-serif",
          }}>
            {locale === "da" ? (
              <>
                Vi ser frem til at{" "}
                <span style={{
                  background: "linear-gradient(135deg, #6366F1 0%, #818CF8 40%, #A855F7 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  møde dig
                </span>
              </>
            ) : (
              <>
                We are looking forward to{" "}
                <span style={{
                  background: "linear-gradient(135deg, #6366F1 0%, #818CF8 40%, #A855F7 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  meeting you
                </span>
              </>
            )}
          </h2>
        </motion.div>

        {/* ── RIGHT: two photos side by side ── */}
        <div className="lab-closing-photos" style={{ display: "flex", gap: "clamp(12px, 1.8vw, 24px)", alignItems: "flex-end", maxWidth: "clamp(280px, 36vw, 540px)" }}>

          {/* Stefan */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}
          >
            <div style={{
              borderRadius: "clamp(12px, 1.5vw, 20px)",
              overflow: "hidden",
              aspectRatio: "3/4",
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(129,140,248,0.15)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.40)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/about/Stefan.png"
                alt="Stefan Werge"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
              <div style={{ fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)", color: "rgba(245,245,247,0.85)", fontWeight: 500 }}>
                Stefan Werge
              </div>
              <div style={{ fontSize: "clamp(0.75rem, 0.82vw, 0.82rem)", color: "rgba(245,245,247,0.40)", fontWeight: 400, marginTop: 2 }}>
                CEO xrNORD
              </div>
            </div>
          </motion.div>

          {/* Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginBottom: "clamp(20px, 3vw, 48px)" }}
          >
            <div style={{
              borderRadius: "clamp(12px, 1.5vw, 20px)",
              overflow: "hidden",
              aspectRatio: "3/4",
              background: "rgba(168,85,247,0.06)",
              border: "1px solid rgba(168,85,247,0.15)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.40)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/AILABs/Krzysztof.jpg"
                alt="Krzysztof"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
              <div style={{ fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)", color: "rgba(245,245,247,0.85)", fontWeight: 500 }}>
                Krzysztof
              </div>
              <div style={{ fontSize: "clamp(0.75rem, 0.82vw, 0.82rem)", color: "rgba(245,245,247,0.40)", fontWeight: 400, marginTop: 2 }}>
                CEO Nomtek
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        /* Desktop (≤1700px, e.g. 1440) — widen the heading column and pull the
           H2 left so "We are looking forward to meeting you" wraps to a few
           clean lines instead of one word per line.
           Monitor (1920) keeps the base 1fr 1fr + clamp(200px,22vw,400px). */
        @media (max-width: 1700px) {
          .lab-closing-section { padding-left: clamp(16px, 3vw, 50px) !important; }
          .lab-closing-layout { grid-template-columns: 1fr 1fr !important; }
          .lab-closing-text { padding-left: clamp(60px, 8vw, 130px) !important; }
          .lab-closing-photos { margin-right: auto !important; }
        }
        @media (max-width: 1200px) {
          .lab-closing-layout { grid-template-columns: 1.2fr 0.8fr !important; }
          .lab-closing-text { padding-left: clamp(60px, 8vw, 140px) !important; }
        }
        @media (max-width: 900px) {
          .lab-closing-layout { grid-template-columns: 1fr !important; }
          .lab-closing-text { padding-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}

export default function AILabsPage() {
  const locale = useLocale();

  return (
    <main style={{ background: "#04060F" }}>
      <Navbar />
      <Hero locale={locale} />
      <Purpose locale={locale} />
      <Terms locale={locale} />
      <FutureUsps locale={locale} />
      <HowWhenWhere locale={locale} />
      <Closing locale={locale} />
    </main>
  );
}
