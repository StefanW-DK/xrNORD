"use client";

import React, { useRef, useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import SmoothScroll from "@/components/motion/SmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Motion variants ──────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Shared CTA pair ──────────────────────────────────────────────────── */
function CtaPair({ locale, label }: { locale: string; label?: string }) {
  const primaryLabel = label ?? (locale === "da" ? "Udforsk Travel Companion" : "Explore the Travel Companion");

  const primaryStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "15px 30px",
    borderRadius: 999,
    background: "linear-gradient(135deg, rgba(168,85,247,0.40), rgba(129,140,248,0.40))",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    textDecoration: "none",
    fontFamily: "var(--font-geist), system-ui, sans-serif",
    border: "1px solid rgba(168,85,247,0.50)",
    boxShadow: "0 8px 26px rgba(124,111,212,0.20)",
    backdropFilter: "blur(6px)",
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
      <Link href={`/${locale}/contact`} style={primaryStyle} className="tr-cta">
        {primaryLabel} <span aria-hidden className="tr-cta-arrow">→</span>
      </Link>
      <style dangerouslySetInnerHTML={{ __html: `
        .tr-cta { transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
        .tr-cta .tr-cta-arrow { transition: transform 0.25s ease; display: inline-block; }
        .tr-cta:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, rgba(168,85,247,0.55), rgba(129,140,248,0.55));
          border-color: rgba(129,140,248,0.75);
          box-shadow: 0 12px 34px rgba(124,111,212,0.34);
        }
        .tr-cta:hover .tr-cta-arrow { transform: translateX(4px); }
      ` }} />
    </div>
  );
}

/* ─── Reusable section header (eyebrow + h2 + subline, centered) ────────── */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  accent = "#22D3EE",
  isInView,
  maxWidth = 820,
  titleSize,
  subtitleMaxWidth = 720,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  accent?: string;
  isInView: boolean;
  maxWidth?: number;
  titleSize?: string;
  subtitleMaxWidth?: number;
}) {
  return (
    <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: "clamp(56px, 7vw, 92px)" }}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: 12.5, fontWeight: 700, letterSpacing: "0.22em",
          textTransform: "uppercase" as const, color: accent,
          marginBottom: 20, fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: titleSize || "clamp(2rem, 3.3vw, 4rem)",
          fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em",
          color: "#fff", margin: "0 auto 24px", maxWidth,
          fontFamily: "var(--font-geist), system-ui, sans-serif",
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.16 }}
          style={{
            fontSize: "clamp(1.05rem, 1.3vw, 1.18rem)", lineHeight: 1.65,
            color: "rgba(255,255,255,0.60)", maxWidth: subtitleMaxWidth, margin: "0 auto",
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   HERO — Tourism × AI
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
      className="tr-hero"
      aria-label={locale === "da" ? "Turisme og AI - introduktion" : "Tourism and AI - introduction"}
    >
      {/* Background video */}
      <video
        autoPlay muted loop playsInline aria-hidden
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.62, pointerEvents: "none",
        }}
      >
        <source src="/assets/home/industries/travel.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(4,6,15,0.70) 0%, rgba(8,6,25,0.74) 50%, rgba(22,13,53,0.72) 100%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Bottom fade */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
        background: "linear-gradient(0deg, rgba(4,6,15,0.98) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Thin gradient top border */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.7) 30%, rgba(34,211,238,0.7) 70%, transparent 100%)",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* Purple bloom */}
      <div aria-hidden style={{
        position: "absolute", top: "-25%", right: "-10%", width: "70%", height: "100%",
        background: "radial-gradient(ellipse at top right, rgba(168,85,247,0.28) 0%, rgba(99,102,241,0.10) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Teal bloom */}
      <div aria-hidden style={{
        position: "absolute", bottom: "-15%", left: "-8%", width: "55%", height: "65%",
        background: "radial-gradient(circle, rgba(34,211,238,0.20) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Pink accent */}
      <div aria-hidden style={{
        position: "absolute", top: "30%", right: "5%", width: "40%", height: "50%",
        background: "radial-gradient(ellipse, rgba(232,121,249,0.10) 0%, transparent 65%)",
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

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          position: "relative", zIndex: 3, width: "100%", margin: "0 auto",
          paddingLeft: "clamp(0px, 3vw, 80px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
          gap: "clamp(40px, 6vw, 120px)", alignItems: "center",
        }}
        className="tr-grid"
      >
        {/* Left: text column */}
        <div style={{ paddingLeft: "clamp(0px, 4vw, 100px)" }} className="tr-hero-left">
          {/* Intro headline */}
          <motion.h3 variants={fadeUp} style={{
            margin: "0 0 clamp(28px, 2.4vw, 48px)",
            fontSize: "clamp(1.25rem, 1.9vw, 1.7rem)",
            fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em",
            color: "rgba(255,255,255,0.98)",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
          }}>
            {locale === "da"
              ? "AI Travel Companion til destinationer"
              : "AI Travel Companion for Destinations"}
          </motion.h3>

          {/* Visual headline */}
          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: "clamp(3rem, 5vw, 6rem)",
              fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em",
              color: "#fff", margin: "0 0 28px",
            }}
            className="tr-h2"
          >
            <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.62)" }}>
              {locale === "da" ? "Få gæsten til at blive" : "Make the visitor stay"}
            </span>
            <br />
            <span style={{ fontWeight: 800, color: "#fff" }}>
              {locale === "da" ? "én " : "one "}
            </span>
            <span style={{
              background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              fontWeight: 800,
            }}>
              {locale === "da" ? "dag mere." : "more day."}
            </span>
          </motion.h2>

          {/* Gradient rule */}
          <motion.div variants={fadeUp} style={{ margin: "0 0 28px" }}>
            <div style={{ width: 52, height: 1, background: "linear-gradient(90deg, #A855F7, #22D3EE)" }} />
          </motion.div>

          {/* H1 subline */}
          <motion.h1
            variants={fadeUp}
            className="tr-h1-subline"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              fontWeight: 400, lineHeight: 1.7,
              color: "rgba(255,255,255,0.88)", maxWidth: 650,
              margin: "0 0 52px", letterSpacing: 0,
            }}
          >
            {locale === "da"
              ? "Enhver destination er fuld af bemærkelsesværdige oplevelser. Udfordringen er at hjælpe hver gæst med at opdage dem."
              : "Every destination is full of remarkable experiences. The challenge is helping every visitor discover them."}
          </motion.h1>

          <motion.div variants={fadeUp}>
            <CtaPair locale={locale} />
          </motion.div>
        </div>

        {/* Right: stat column */}
        <motion.div
          variants={fadeUp}
          style={{ position: "relative", paddingLeft: 56 }}
          className="tr-stat-col"
        >
          <div aria-hidden style={{
            position: "absolute", left: 0, top: "5%", bottom: "5%", width: 1,
            background: "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.7) 25%, rgba(34,211,238,0.7) 75%, transparent 100%)",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{
              fontSize: 14, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase" as const, color: "rgba(255,255,255,0.62)", margin: "0 0 20px",
            }}>
              {locale === "da" ? "Beslutningen der betyder mest" : "The decision that matters most"}
            </p>

            <p style={{
              fontSize: "clamp(4rem, 7vw, 8.5rem)",
              fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.05em",
              margin: "0 0 22px", padding: "0 0 0.08em", whiteSpace: "nowrap",
              background: "linear-gradient(135deg, rgba(168,85,247,0.95) 0%, rgba(129,140,248,0.90) 50%, rgba(34,211,238,0.88) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              {locale === "da" ? "+ 1 dag" : "+ 1 day"}
            </p>

            <p style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.6,
              color: "rgba(255,255,255,0.95)", maxWidth: 380, margin: "0 0 24px",
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
            }}>
              {locale === "da"
                ? "Gæsten, der bliver én dag mere, bruger mere, deler mere og vender oftere tilbage."
                : "The visitor who stays one more day spends more, shares more, and returns more often."}
            </p>

            <p style={{
              fontSize: 11, color: "rgba(255,255,255,0.40)", margin: 0, lineHeight: 1.6,
              fontFamily: "var(--font-inter), system-ui, sans-serif", letterSpacing: "0.02em",
              maxWidth: 380,
            }}>
              {locale === "da"
                ? "Kilde: Destination Fyn · Strategisk oplæg, One More Day"
                : "Source: Destination Fyn · Strategic proposal, One More Day"}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        >
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)" }} />
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
@media (max-width: 900px) {
  .tr-grid { grid-template-columns: 1fr !important; padding-left: 0 !important; }
  .tr-hero-left { padding-left: 0 !important; }
  .tr-stat-col { padding-left: 0 !important; padding-top: 48px !important; border-top: 1px solid rgba(168,85,247,0.3) !important; }
}
      ` }} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION — THE PROBLEM: WHY TOURISTS LEAVE TOO SOON (7 gaps)
   A cinematic full-presence headline, then a pinned scroll-scrubbed
   spotlight: one gap large and lit, six others small in a rail, the
   active one changing as the visitor scrolls through the section.
   ════════════════════════════════════════════════════════════════════════ */
function ProblemSection({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const pinWrapRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardFade = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  // Brand spectrum sampled across the 7 stages — pink → purple → indigo → cyan
  const accents = ["#E879F9", "#CB80F6", "#A855F7", "#8B7BF5", "#7098F3", "#4AB8F0", "#22D3EE"];

  const gaps = locale === "da"
    ? [
        { n: "01", title: "Orienterings-gabet", body: "På et ukendt sted ved gæster ikke, hvad de ikke ved. Kort viser nærhed, ikke mening. Anmeldelser viser det mest populære, sjældent det mest relevante." },
        { n: "02", title: "Unikheds-gabet", body: "Hver gæst er forskellig. Et par, en børnefamilie, en kulturrejsende, en vennegruppe, de har brug for hver sin version af destinationen. Alligevel behandles de ens." },
        { n: "03", title: "Den lokale histories gab", body: "Skiltet på væggen giver fakta. Den lokale, der har boet der i fyrre år, giver en fortælling. Det er fortællingen, der får folk til at føle noget." },
        { n: "04", title: "Opdagelses-gabet", body: "De bedste oplevelser opdages ofte ved en tilfældighed. De fleste gæster vandrer aldrig langt nok eller taler med nok lokale til at finde dem." },
        { n: "05", title: "De skjulte begivenheders gab", body: "Lokale skaber unikke events hver uge. De deles på en Facebook-side eller en lokal gruppe. Lokalsamfundet ser dem. Gæsten, som ikke er en del af netværket, gør ikke." },
        { n: "06", title: "Friktions-gabet", body: "Information findes, men at tilgå den, mens man står på en brostensbelagt plads, er udmattende. Friktionen bryder oplevelsen, før den begynder." },
        { n: "07", title: "Den passive informations gab", body: "Nuværende værktøjer er reaktive. Gæsten skal søge, finde, læse og fortolke. Det, der mangler, er proaktiv, kontekstuel intelligens." },
      ]
    : [
        { n: "01", title: "The Orientation Gap", body: "Arriving somewhere unfamiliar, visitors do not know what they do not know. Maps show proximity, not meaning. Review platforms return the most popular, rarely the most relevant." },
        { n: "02", title: "The Uniqueness Gap", body: "Every visitor is different. A couple, a family, a cultural traveller, a group of friends, they each need a completely different version of the destination. Yet the infrastructure treats them identically." },
        { n: "03", title: "The Local Story Gap", body: "The plaque on the wall gives facts. The local who has lived near it for forty years gives a story. It is narrative that makes people feel something, and want to share it." },
        { n: "04", title: "The Discovery Gap", body: "The best experiences are usually discovered by accident. Most visitors never wander far enough, or speak to enough locals, to find them." },
        { n: "05", title: "The Hidden Events Gap", body: "Local businesses create unique events every week, posted on a Facebook page or a community group. The local community sees them. The tourist, not part of that network, never does." },
        { n: "06", title: "The Friction Gap", body: "Information exists, but accessing it while standing on a cobblestone square, in the moment, is exhausting. The friction breaks the experience before it begins." },
        { n: "07", title: "The Passive Information Gap", body: "Current tools are reactive. The visitor must search, find, read, and interpret. What is missing is proactive, contextual intelligence." },
      ];

  // Drive activeIndex from scroll progress through the pinned wrapper.
  // Desktop only — matchMedia handles create/teardown across resizes.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const el = pinWrapRef.current;
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(gaps.length - 1, Math.floor(self.progress * gaps.length));
          setActiveIndex(idx);
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gaps.length]);

  const jumpTo = (i: number) => {
    const el = pinWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const target = scrollTop + rect.top + ((i + 0.5) / gaps.length) * rect.height;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(target, { duration: 1.1 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      style={{
        position: "relative", width: "100%",
        background: "linear-gradient(180deg, #0a0716 0%, #0e0a20 50%, #0b0819 100%)",
      }}
    >
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1, zIndex: 2,
        background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.25) 30%, rgba(34,211,238,0.25) 70%, transparent 100%)",
      }} />

      {/* ══════════ Challenge — headline, spotlight & rail as one pinned composition ══════════ */}
      <div ref={pinWrapRef} className="tr-ch-pin-wrap" style={{ position: "relative", height: "492.8vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          {/* Tinted ambient glow shifts with the active gap */}
          <motion.div
            aria-hidden
            animate={{ background: `radial-gradient(ellipse 120% 100% at 26% 48%, ${accents[activeIndex]}2b 0%, ${accents[activeIndex]}12 42%, transparent 78%)` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          />

          <div style={{
            position: "relative", zIndex: 1, height: "100%",
            padding: "clamp(90px, 11vh, 152px) clamp(24px, 6vw, 160px) clamp(52px, 7vh, 92px)",
            display: "flex", flexDirection: "column",
          }}>
            {/* ── 1. Headline anchor — top-left, full previous presence (−10%, shifted right) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: "min(72%, 810px)", flexShrink: 0, marginLeft: "clamp(20px, 5vw, 90px)" }}
            >
              <p style={{
                display: "inline-flex", alignItems: "center", gap: 13,
                fontSize: 13, fontWeight: 700, letterSpacing: "0.26em",
                textTransform: "uppercase" as const, color: "#E879F9",
                margin: "0 0 27px", fontFamily: "var(--font-inter), system-ui, sans-serif",
              }}>
                <span style={{ width: 40, height: 2, background: "linear-gradient(90deg,#E879F9,#818CF8)", display: "inline-block", flexShrink: 0 }} />
                {locale === "da" ? "Udfordringen" : "The Challenge"}
              </p>
              <h2 style={{
                fontSize: "clamp(3.24rem, 6.66vw, 8.55rem)", fontWeight: 800, lineHeight: 0.98,
                letterSpacing: "-0.04em", color: "#fff", margin: "0 0 clamp(25px, 3.06vw, 43px)",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
              }}>
                {locale === "da"
                  ? <>Hvorfor turister<br /><span style={{ whiteSpace: "nowrap" }}>rejser <span style={{ color: "rgba(255,255,255,0.40)", fontWeight: 300 }}>for tidligt</span></span></>
                  : <>Why tourists<br /><span style={{ whiteSpace: "nowrap" }}>leave <span style={{ color: "rgba(255,255,255,0.40)", fontWeight: 300 }}>too soon</span></span></>}
              </h2>
              <p style={{
                fontSize: "clamp(1.035rem, 1.53vw, 1.4rem)", lineHeight: 1.6,
                color: "rgba(255,255,255,0.66)", margin: 0,
                fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
              }}>
                {locale === "da"
                  ? "Ikke fordi destinationen løb tør for ting at tilbyde. Men fordi gæsten løb tør for måder at opdage dem på. Det er de syv gab, vi konsekvent ser."
                  : "Not because the destination ran out of things to offer. But because the visitor ran out of ways to discover them. These are the seven gaps we consistently see."}
              </p>
            </motion.div>

            {/* ── 2. Spotlight — cascades below the headline, centered in the remaining space ── */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
              <div style={{ maxWidth: "min(64%, 860px)", marginLeft: "clamp(0px, 3vw, 80px)", marginTop: "clamp(16px, 3vw, 48px)" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 1.6vw, 24px)" }}
                  >
                    <span style={{
                      fontSize: "clamp(3.4rem, 5.6vw, 7.2rem)", fontWeight: 800, lineHeight: 0.95,
                      letterSpacing: "-0.04em",
                      background: `linear-gradient(135deg, ${accents[activeIndex]}, #818CF8)`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                    }}>
                      {gaps[activeIndex].n}
                    </span>
                    <h3 style={{
                      fontSize: "clamp(2rem, 3.2vw, 3.8rem)", fontWeight: 800, lineHeight: 1.05,
                      color: "#fff", margin: 0, letterSpacing: "-0.025em",
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                    }}>
                      {gaps[activeIndex].title}
                    </h3>
                    <p style={{
                      fontSize: "clamp(0.95rem, 1.15vw, 1.2rem)", lineHeight: 1.6,
                      color: "rgba(255,255,255,0.68)", margin: 0, maxWidth: "52ch",
                      fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
                    }}>
                      {gaps[activeIndex].body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ── 3. Rail — the list, vertically centered on the right ── */}
            <div style={{ position: "absolute", right: "clamp(24px, 6vw, 160px)", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "clamp(6px, 0.9vw, 12px)" }}>
              {gaps.map((g, i) => (
                <motion.button
                  key={g.n}
                  onClick={() => jumpTo(i)}
                  animate={{
                    opacity: activeIndex === i ? 1 : 0.38,
                    scale: activeIndex === i ? 1 : 0.93,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    background: "none", cursor: "pointer", textAlign: "left",
                    padding: "9px 4px 9px 18px", transformOrigin: "right center",
                    borderLeft: `2px solid ${activeIndex === i ? accents[i] : "rgba(255,255,255,0.10)"}`,
                    transition: "border-color 0.35s ease",
                  }}
                >
                  <span style={{
                    fontSize: "clamp(0.95rem, 1.05vw, 1.1rem)", fontWeight: 800, minWidth: "2ch",
                    color: activeIndex === i ? accents[i] : "rgba(255,255,255,0.35)",
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    transition: "color 0.35s ease",
                  }}>
                    {g.n}
                  </span>
                  <span style={{
                    fontSize: "clamp(0.85rem, 0.95vw, 1rem)", lineHeight: 1.3,
                    fontWeight: activeIndex === i ? 600 : 400,
                    color: activeIndex === i ? "#fff" : "rgba(255,255,255,0.40)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    transition: "color 0.35s ease",
                  }}>
                    {g.title}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Progress line */}
            <div style={{
              position: "absolute", bottom: "clamp(24px, 4vh, 44px)",
              left: "clamp(24px, 6vw, 160px)", right: "clamp(24px, 6vw, 160px)",
              height: 2, borderRadius: 2, background: "rgba(255,255,255,0.08)", zIndex: 1,
            }}>
              <motion.div
                animate={{ width: `${((activeIndex + 1) / gaps.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg,#E879F9,#22D3EE)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ MOBILE — simple stacked fallback, no pin mechanic ══════════ */}
      <div className="tr-ch-mobile-list" style={{
        display: "none", position: "relative", zIndex: 1,
        flexDirection: "column",
        padding: "clamp(90px, 16vw, 130px) clamp(24px, 6vw, 160px) clamp(80px, 10vw, 120px)",
      }}>
        <div style={{ marginBottom: "clamp(28px, 7vw, 44px)" }}>
          <p style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            fontSize: 13.5, fontWeight: 700, letterSpacing: "0.24em",
            textTransform: "uppercase" as const, color: "#E879F9",
            margin: "0 0 18px", fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}>
            <span style={{ width: 34, height: 2, background: "linear-gradient(90deg,#E879F9,#818CF8)", display: "inline-block", flexShrink: 0 }} />
            {locale === "da" ? "Udfordringen" : "The Challenge"}
          </p>
          <h2 style={{
            fontSize: "clamp(2.2rem, 9vw, 3.4rem)", fontWeight: 800, lineHeight: 1.02,
            letterSpacing: "-0.03em", color: "#fff", margin: 0,
            fontFamily: "var(--font-geist), system-ui, sans-serif",
          }}>
            {locale === "da"
              ? <>Hvorfor turister rejser <span style={{ color: "rgba(255,255,255,0.40)", fontWeight: 300 }}>for tidligt</span></>
              : <>Why tourists leave <span style={{ color: "rgba(255,255,255,0.40)", fontWeight: 300 }}>too soon</span></>}
          </h2>
        </div>
        {gaps.map((g, i) => (
          <motion.div
            key={g.n}
            custom={i}
            variants={cardFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            style={{
              padding: "22px 0",
              borderTop: i === 0 ? "1px solid rgba(255,255,255,0.12)" : "none",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
              display: "flex", flexDirection: "column", gap: 8,
            }}
          >
            <span style={{
              fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.02em",
              background: `linear-gradient(135deg, ${accents[i]}, #818CF8)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              {g.n}
            </span>
            <h3 style={{
              fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.25,
              color: "#fff", margin: 0, letterSpacing: "-0.01em",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              {g.title}
            </h3>
            <p style={{
              fontSize: "0.96rem", lineHeight: 1.6,
              color: "rgba(255,255,255,0.60)", margin: 0,
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
            }}>
              {g.body}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 899px) {
          .tr-ch-pin-wrap { display: none !important; }
          .tr-ch-mobile-list { display: flex !important; }
          .tr-ch-ghost { display: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION — THE CHALLENGE
   Headline anchored top-left, spotlight right-weighted below it, and the
   7 gaps as a horizontal tab row along the bottom. Scroll-scrubbed.
   ════════════════════════════════════════════════════════════════════════ */
function ChallengeSectionVersionB({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const pinWrapRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const accents = ["#E879F9", "#CB80F6", "#A855F7", "#8B7BF5", "#7098F3", "#4AB8F0", "#22D3EE"];

  const cardFade = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  // "The Orientation Gap" -> The (grey) / Orientation (white) / Gap (grey)
  const renderGapTitle = (title: string) => {
    const match = title.match(/^The (.+) Gap$/);
    if (!match) return title;
    const greyStyle = { color: "rgba(255,255,255,0.42)", fontWeight: 300 };
    return (
      <>
        <span style={greyStyle}>The </span>
        {match[1]}
        <span style={greyStyle}> Gap</span>
      </>
    );
  };

  const gaps = locale === "da"
    ? [
        { n: "01", title: "Orienterings-gabet", body: "På et ukendt sted ved gæster ikke, hvad de ikke ved. Kort viser nærhed, ikke mening. Anmeldelser viser det mest populære, sjældent det mest relevante." },
        { n: "02", title: "Unikheds-gabet", body: "Hver gæst er forskellig. Et par, en børnefamilie, en kulturrejsende, en vennegruppe, de har brug for hver sin version af destinationen. Alligevel behandles de ens." },
        { n: "03", title: "Den lokale histories gab", body: "Skiltet på væggen giver fakta. Den lokale, der har boet der i fyrre år, giver en fortælling. Det er fortællingen, der får folk til at føle noget." },
        { n: "04", title: "Opdagelses-gabet", body: "De bedste oplevelser opdages ofte ved en tilfældighed. De fleste gæster vandrer aldrig langt nok eller taler med nok lokale til at finde dem." },
        { n: "05", title: "De skjulte begivenheders gab", body: "Lokale skaber unikke events hver uge. De deles på en Facebook-side eller en lokal gruppe. Lokalsamfundet ser dem. Gæsten, som ikke er en del af netværket, gør ikke." },
        { n: "06", title: "Friktions-gabet", body: "Information findes, men at tilgå den, mens man står på en brostensbelagt plads, er udmattende. Friktionen bryder oplevelsen, før den begynder." },
        { n: "07", title: "Den passive informations gab", body: "Nuværende værktøjer er reaktive. Gæsten skal søge, finde, læse og fortolke. Det, der mangler, er proaktiv, kontekstuel intelligens." },
      ]
    : [
        { n: "01", title: "The Orientation Gap", body: "Arriving somewhere unfamiliar, visitors do not know what they do not know. Maps show proximity, not meaning. Review platforms return the most popular, rarely the most relevant." },
        { n: "02", title: "The Uniqueness Gap", body: "Every visitor is different. A couple, a family, a cultural traveller, a group of friends, they each need a completely different version of the destination. Yet the infrastructure treats them identically." },
        { n: "03", title: "The Local Story Gap", body: "The plaque on the wall gives facts. The local who has lived near it for forty years gives a story. It is narrative that makes people feel something, and want to share it." },
        { n: "04", title: "The Discovery Gap", body: "The best experiences are usually discovered by accident. Most visitors never wander far enough, or speak to enough locals, to find them." },
        { n: "05", title: "The Hidden Events Gap", body: "Local businesses create unique events every week, posted on a Facebook page or a community group. The local community sees them. The tourist, not part of that network, never does." },
        { n: "06", title: "The Friction Gap", body: "Information exists, but accessing it while standing on a cobblestone square, in the moment, is exhausting. The friction breaks the experience before it begins." },
        { n: "07", title: "The Passive Information Gap", body: "Current tools are reactive. The visitor must search, find, read, and interpret. What is missing is proactive, contextual intelligence." },
      ];

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const el = pinWrapRef.current;
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(gaps.length - 1, Math.floor(self.progress * gaps.length));
          setActiveIndex(idx);
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gaps.length]);

  const jumpTo = (i: number) => {
    const el = pinWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const target = scrollTop + rect.top + ((i + 0.5) / gaps.length) * rect.height;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(target, { duration: 1.1 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      style={{
        position: "relative", width: "100%",
        background: "linear-gradient(180deg, #0a0716 0%, #0e0a20 50%, #0b0819 100%)",
      }}
    >
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1, zIndex: 2,
        background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.25) 30%, rgba(34,211,238,0.25) 70%, transparent 100%)",
      }} />

      <div ref={pinWrapRef} className="tr-chB-pin-wrap" style={{ position: "relative", height: "270vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          {/* Tinted ambient glow shifts with the active gap */}
          <motion.div
            aria-hidden
            animate={{ background: `radial-gradient(ellipse 120% 100% at 74% 48%, ${accents[activeIndex]}2b 0%, ${accents[activeIndex]}12 42%, transparent 78%)` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          />

          <div style={{
            position: "relative", zIndex: 1, height: "100%",
            padding: "clamp(90px, 11vh, 152px) clamp(24px, 6vw, 160px) clamp(120px, 16vh, 200px)",
            display: "flex", flexDirection: "column",
          }}>
            {/* ── 1. Headline anchor — top-left, unchanged ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: "min(72%, 810px)", flexShrink: 0, marginLeft: "clamp(20px, 5vw, 90px)" }}
            >
              <p style={{
                display: "inline-flex", alignItems: "center", gap: 13,
                fontSize: 13, fontWeight: 700, letterSpacing: "0.26em",
                textTransform: "uppercase" as const, color: "#E879F9",
                margin: "0 0 27px", fontFamily: "var(--font-inter), system-ui, sans-serif",
              }}>
                <span style={{ width: 40, height: 2, background: "linear-gradient(90deg,#E879F9,#818CF8)", display: "inline-block", flexShrink: 0 }} />
                {locale === "da" ? "Udfordringen" : "The Challenge"}
              </p>
              <h2 style={{
                fontSize: "clamp(3.24rem, 6.66vw, 8.55rem)", fontWeight: 800, lineHeight: 0.98,
                letterSpacing: "-0.04em", color: "#fff", margin: "0 0 clamp(25px, 3.06vw, 43px)",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
              }}>
                {locale === "da"
                  ? <>Hvorfor turister<br /><span style={{ whiteSpace: "nowrap" }}>rejser <span style={{ color: "rgba(255,255,255,0.40)", fontWeight: 300 }}>for tidligt</span></span></>
                  : <>Why tourists<br /><span style={{ whiteSpace: "nowrap" }}>leave <span style={{ color: "rgba(255,255,255,0.40)", fontWeight: 300 }}>too soon</span></span></>}
              </h2>
              <p style={{
                fontSize: "clamp(1.035rem, 1.53vw, 1.4rem)", lineHeight: 1.6,
                color: "rgba(255,255,255,0.66)", margin: 0,
                fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
              }}>
                {locale === "da"
                  ? "Ikke fordi destinationen løb tør for ting at tilbyde. Men fordi gæsten løb tør for måder at opdage dem på. Det er de syv gab, vi konsekvent ser."
                  : "Not because the destination ran out of things to offer. But because the visitor ran out of ways to discover them. These are the seven gaps we consistently see."}
              </p>
            </motion.div>

            {/* ── 2. Spotlight — swapped to the right side (where the list used to live) ── */}
            <div className="tr-chB-spotlight" style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "flex-end", minHeight: 0 }}>
              <div style={{ maxWidth: "min(58%, 760px)", marginRight: "clamp(10px, 5vw, 130px)", marginTop: "clamp(-70px, -3.5vw, -20px)" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 1.6vw, 24px)" }}
                  >
                    <span style={{
                      fontSize: "clamp(3.4rem, 5.6vw, 7.2rem)", fontWeight: 800, lineHeight: 0.95,
                      letterSpacing: "-0.04em",
                      background: `linear-gradient(135deg, ${accents[activeIndex]}, #818CF8)`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                    }}>
                      {gaps[activeIndex].n}
                    </span>
                    <h3 style={{
                      fontSize: "clamp(2rem, 3.2vw, 3.8rem)", fontWeight: 800, lineHeight: 1.05,
                      color: "#fff", margin: 0, letterSpacing: "-0.025em",
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                    }}>
                      {renderGapTitle(gaps[activeIndex].title)}
                    </h3>
                    <p style={{
                      fontSize: "clamp(0.95rem, 1.15vw, 1.2rem)", lineHeight: 1.6,
                      color: "rgba(255,255,255,0.68)", margin: 0, maxWidth: "52ch",
                      fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
                    }}>
                      {gaps[activeIndex].body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>


          </div>

          {/* ── 3. Tab row — absolutely pinned to bottom of sticky viewport ── */}
          <div style={{
            position: "absolute", bottom: "clamp(12px, 2vh, 24px)", left: "clamp(24px, 6vw, 160px)", right: "clamp(24px, 6vw, 160px)",
            zIndex: 2, display: "flex",
            gap: "clamp(8px, 1.2vw, 20px)",
          }}>
            {gaps.map((g, i) => (
              <motion.button
                key={g.n}
                onClick={() => jumpTo(i)}
                animate={{ opacity: activeIndex === i ? 1 : 0.38 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  flex: 1, minWidth: 0,
                  display: "flex", flexDirection: "column", gap: 9,
                  background: "none", cursor: "pointer", textAlign: "left",
                  padding: "14px 4px 0 0",
                  borderTop: `2px solid ${activeIndex === i ? accents[i] : "rgba(255,255,255,0.10)"}`,
                  transition: "border-color 0.35s ease",
                }}
              >
                <span style={{
                  fontSize: "clamp(0.85rem, 0.95vw, 1rem)", fontWeight: 800,
                  color: activeIndex === i ? accents[i] : "rgba(255,255,255,0.35)",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  transition: "color 0.35s ease",
                }}>
                  {g.n}
                </span>
                <span style={{
                  fontSize: "clamp(0.72rem, 0.82vw, 0.86rem)", lineHeight: 1.3,
                  fontWeight: activeIndex === i ? 600 : 400,
                  color: activeIndex === i ? "#fff" : "rgba(255,255,255,0.40)",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  transition: "color 0.35s ease",
                }}>
                  {g.title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ MOBILE/TABLET — simple stacked fallback, no pin mechanic ══════════ */}
      <div className="tr-chB-mobile-list" style={{
        display: "none", position: "relative", zIndex: 1,
        flexDirection: "column",
        padding: "clamp(90px, 16vw, 130px) clamp(24px, 6vw, 160px) clamp(80px, 10vw, 120px)",
      }}>
        <div style={{ marginBottom: "clamp(28px, 7vw, 44px)" }}>
          <p style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            fontSize: 13.5, fontWeight: 700, letterSpacing: "0.24em",
            textTransform: "uppercase" as const, color: "#E879F9",
            margin: "0 0 18px", fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}>
            <span style={{ width: 34, height: 2, background: "linear-gradient(90deg,#E879F9,#818CF8)", display: "inline-block", flexShrink: 0 }} />
            {locale === "da" ? "Udfordringen" : "The Challenge"}
          </p>
          <h2 style={{
            fontSize: "clamp(2.2rem, 9vw, 3.4rem)", fontWeight: 800, lineHeight: 1.02,
            letterSpacing: "-0.03em", color: "#fff", margin: "0 0 20px",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
          }}>
            {locale === "da"
              ? <>Hvorfor turister rejser <span style={{ color: "rgba(255,255,255,0.40)", fontWeight: 300 }}>for tidligt</span></>
              : <>Why tourists leave <span style={{ color: "rgba(255,255,255,0.40)", fontWeight: 300 }}>too soon</span></>}
          </h2>
          <p style={{
            fontSize: "clamp(1rem, 3.6vw, 1.15rem)", lineHeight: 1.6,
            color: "rgba(255,255,255,0.66)", margin: 0,
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
          }}>
            {locale === "da"
              ? "Ikke fordi destinationen løb tør for ting at tilbyde. Men fordi gæsten løb tør for måder at opdage dem på. Det er de syv gab, vi konsekvent ser."
              : "Not because the destination ran out of things to offer. But because the visitor ran out of ways to discover them. These are the seven gaps we consistently see."}
          </p>
        </div>
        {gaps.map((g, i) => (
          <motion.div
            key={g.n}
            custom={i}
            variants={cardFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            style={{
              padding: "22px 0",
              borderTop: i === 0 ? "1px solid rgba(255,255,255,0.12)" : "none",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
              display: "flex", flexDirection: "column", gap: 8,
            }}
          >
            <span style={{
              fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.02em",
              background: `linear-gradient(135deg, ${accents[i]}, #818CF8)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              {g.n}
            </span>
            <h3 style={{
              fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.25,
              color: "#fff", margin: 0, letterSpacing: "-0.01em",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              {renderGapTitle(g.title)}
            </h3>
            <p style={{
              fontSize: "0.96rem", lineHeight: 1.6,
              color: "rgba(255,255,255,0.60)", margin: 0,
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
            }}>
              {g.body}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 899px) {
          .tr-chB-pin-wrap { display: none !important; }
          .tr-chB-mobile-list { display: flex !important; }
        }
        @media (min-width: 900px) and (max-width: 1700px) {
          .tr-chB-spotlight > div { margin-top: 20px !important; }
          .tr-chB-pin-wrap [style*="flex-direction: column"] { padding-top: 60px !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION — THE THREE MOMENTS (v9)
   The decision to stay concentrates in three moments across the trip.
   The extension moment is the climax: the companion books it in-conversation.
   ════════════════════════════════════════════════════════════════════════ */
function MomentsSection({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });

  const moments = locale === "da"
    ? [
        { tag: "A", label: "Én forbundet destination", when: "De første timer", accent: "#22D3EE",
          body: "Information, services og partnersystemer bliver til ét forbundet økosystem, der gør det muligt for destinationen både at forstå gæsternes behov og hjælpe med at opfylde dem." },
        { tag: "B", label: "Optimerede arbejdsgange. Hurtigere oplevelser.", when: "Dag to, dag tre", accent: "#818CF8",
          body: "Information flyder automatisk fra medlemmer til gæster, og holder indhold aktuelt, flersproget og tilgængeligt, når det betyder mest." },
        { tag: "C", label: "En lærende destination", when: "Vundet tidligere, gradvist", accent: "#E879F9",
          body: "Hver gæsteinteraktion bliver til delt indsigt, der hjælper både destinationen og dens medlemmer med løbende at forbedre oplevelser over tid." },
      ]
    : [
        { tag: "A", label: "One connected destination", when: "The first hours", accent: "#22D3EE",
          body: "Information, services and partner systems become one connected ecosystem, allowing the destination to both understand visitor needs and help fulfill them." },
        { tag: "B", label: "Optimized workflows. Faster experiences.", when: "Day two, day three", accent: "#818CF8",
          body: "Information flows automatically from members to visitors, keeping content current, multilingual and available when it matters most." },
        { tag: "C", label: "A learning destination", when: "Won earlier, gradually", accent: "#E879F9",
          body: "Every visitor interaction becomes shared insight, helping both the destination and its members continuously improve experiences over time." },
      ];

  const cardFade = {
    hidden: { opacity: 0, y: 34 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.7, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section
      ref={ref}
      style={{
        position: "relative", width: "100%", overflow: "hidden",
        padding: "clamp(60px, 7vw, 110px) clamp(24px, 6vw, 160px) clamp(110px, 13vw, 190px)",
        background: "linear-gradient(180deg, #0b0819 0%, #0a0716 55%, #07050f 100%)",
      }}
    >
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1, zIndex: 2,
        background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.22) 30%, rgba(34,211,238,0.22) 70%, transparent 100%)",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "-8%", right: "-6%", width: "48vw", height: "48vw", maxWidth: 760, maxHeight: 760,
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(232,121,249,0.10) 0%, transparent 70%)",
      }} />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1160, marginBottom: "clamp(110px, 13vw, 170px)" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 14,
            fontSize: 14.5, fontWeight: 700, letterSpacing: "0.24em",
            textTransform: "uppercase" as const, color: "#E879F9",
            margin: "0 0 48px", fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          <span style={{ width: 40, height: 2, background: "linear-gradient(90deg,#E879F9,#818CF8)", display: "inline-block", flexShrink: 0 }} />
          {locale === "da" ? "AI Travel Companion er kun det halve af historien." : "The AI Travel Companion is only half the story."}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(2.8rem, 5.4vw, 6.4rem)", fontWeight: 800, lineHeight: 1.04,
            letterSpacing: "-0.035em", color: "#fff", margin: "0 0 52px",
            fontFamily: "var(--font-geist), system-ui, sans-serif", maxWidth: 1160,
          }}
        >
          {locale === "da"
            ? <><span style={{ color: "rgba(255,255,255,0.42)", fontWeight: 300 }}>Destinationen bliver</span><br />et levende økosystem.</>
            : <><span style={{ color: "rgba(255,255,255,0.42)", fontWeight: 300 }}>The destination becomes</span><br />a living ecosystem.</>}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18 }}
          style={{
            fontSize: "clamp(1.1rem, 1.35vw, 1.4rem)", lineHeight: 1.6,
            color: "rgba(255,255,255,0.66)", margin: 0, maxWidth: 720,
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
          }}
        >
          {locale === "da"
            ? "Bag AI Travel Companion er et levende økosystem, hvor information flyder automatisk, og hver gæsteinteraktion føder en løbende forbedringsløkke drevet af live data."
            : "Behind the AI Travel Companion is a living ecosystem where information flows automatically, and every visitor interaction feeds a continuous improvement loop powered by live data."}
        </motion.p>
      </div>

      {/* Three moments — connected timeline */}
      <div style={{ position: "relative", zIndex: 1, marginTop: "clamp(20px, 3vw, 44px)" }}>
        {/* Connecting gradient line (desktop) — draws from A to C as the section scrolls into view */}
        <motion.div
          aria-hidden
          className="tr-moments-line"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", top: 13, left: 14, right: "8%", height: 2,
            background: "linear-gradient(90deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
            opacity: 0.4, borderRadius: 2,
            transformOrigin: "left center",
          }}
        />
        <div className="tr-moments-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))",
          gap: "clamp(28px, 4vw, 72px)",
        }}>
          {moments.map((m, i) => (
            <motion.div
              key={m.tag}
              custom={i}
              variants={cardFade}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Node */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: "#07050f", border: `2px solid ${m.accent}`,
                  boxShadow: `0 0 20px ${m.accent}66`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800, color: m.accent,
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                }}>
                  {m.tag}
                </span>
              </div>
              <h3 style={{
                fontSize: "clamp(1.4rem, 1.9vw, 2rem)", fontWeight: 700, lineHeight: 1.14,
                color: "#fff", margin: 0, letterSpacing: "-0.02em",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
              }}>
                {m.label}
              </h3>
              <p style={{
                fontSize: "clamp(0.95rem, 1.05vw, 1.08rem)", lineHeight: 1.66,
                color: "rgba(255,255,255,0.62)", margin: 0,
                fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
              }}>
                {m.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Closing statement — words reveal one by one, left to right */}
      <div
        style={{
          position: "relative", zIndex: 1, textAlign: "center",
          marginTop: "clamp(120px, 13vw, 190px)",
        }}
      >
        <p style={{
          fontSize: "clamp(2.2rem, 3.6vw, 4.2rem)", fontWeight: 800, lineHeight: 1.15,
          letterSpacing: "-0.03em", margin: 0,
          fontFamily: "var(--font-geist), system-ui, sans-serif",
        }}>
          {(locale === "da"
            ? [
                { w: "Enhver", grad: false }, { w: "gæst", grad: false }, { w: "rejser.", grad: false },
                { w: "Deres", grad: true }, { w: "indsigt", grad: true }, { w: "gør", grad: true }, { w: "ikke.", grad: true },
              ]
            : [
                { w: "Every", grad: false }, { w: "visitor", grad: false }, { w: "leaves.", grad: false },
                { w: "Their", grad: true }, { w: "insight", grad: true }, { w: "doesn’t.", grad: true },
              ]
          ).map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "inline-block", marginRight: "0.32em",
                ...(item.grad
                  ? {
                      background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }
                  : { color: "rgba(255,255,255,0.42)", fontWeight: 300 }),
              }}
            >
              {item.w}
            </motion.span>
          ))}
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .tr-moments-grid { grid-template-columns: 1fr !important; }
          .tr-moments-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION — SEVEN DIFFERENT JOURNEYS (7 visitor profiles)
   ════════════════════════════════════════════════════════════════════════ */
function ProfilesSection({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const cardFade = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const profiles = locale === "da"
    ? [
        { who: "Det romantiske par", need: "Intimitet og opdagelse", body: "Ikke den bedst bedømte restaurant, men det stille havnebord, ingen andre kender, aftenturen med udsigt, den lokale vinoplevelse, der føles ægte deres." },
        { who: "Den kulturrejsende", need: "Dybde og fortælling", body: "Her for historie, kunst, arkitektur og lokalt håndværk. De læser skiltet, men vil have historien bag. Lagdelt, intelligent fortælling holder dem i dagevis." },
        { who: "Familien", need: "Fleksibilitet for alle aldre", body: "De har brug for oplevelser, der engagerer en tiårig og en fyrreårig på samme tid, og at vide hvad der er praktisk, når planen ændrer sig." },
        { who: "Vennernes weekend", need: "Energi og lokal adgang", body: "På jagt efter de steder, lokale faktisk går hen om fredagen. Bryggeriet, madmarkedet, spillestedet, der ikke står i nogen guidebog. Opdagelse, ikke kuration." },
        { who: "Solorejsende", need: "Tempo og serendipitet", body: "Bevæger sig i sin egen rytme, åben for at følge en tråd. Men tråden skal eksistere først. Uden kontekst forfalder selv den mest eventyrlystne til det velkendte." },
        { who: "Forretningsgæsten", need: "Kvalitet på kompakt tid", body: "Tre timer fri mellem møder i en ukendt by. Ingen tid til research. De vil have nogen til at fortælle præcist hvor de skal hen, matchet til hvem de er." },
        { who: "Den lokale beboer", need: "Genopdagelse", body: "Tror de kender destinationen. Bliver jævnligt overrasket over, at de ikke gør. Den beboer, der opdager et bemærkelsesværdigt sted, bliver en ambassadør." },
      ]
    : [
        { who: "The Romantic Couple", need: "Intimacy and discovery", body: "Not the top-rated restaurant, but the quiet harbour table nobody else knows about, the evening walk with a view, the local wine experience that feels genuinely theirs." },
        { who: "The Cultural Explorer", need: "Depth and narrative", body: "Here for history, art, architecture, and local craft. They will read the plaque, but they want the story behind it. Layered, intelligent narrative keeps them for days." },
        { who: "The Family", need: "Flexibility for all ages", body: "They need experiences that engage a ten-year-old and a forty-year-old at the same time, and to know what is practical when the plan changes." },
        { who: "The Friends' Weekend", need: "Energy and local access", body: "Looking for the places locals actually go on a Friday night. The craft brewery, the food market, the live music venue in no guidebook. Discovery, not curation." },
        { who: "The Solo Traveller", need: "Pace and serendipity", body: "Moving at their own rhythm, open to following a thread. But the thread has to exist first. Without context, even the most adventurous defaults to the familiar." },
        { who: "The Business Visitor", need: "Quality in compressed time", body: "Three hours free between meetings in an unfamiliar city. No time to research. They want someone to tell them precisely where to go, matched to who they are." },
        { who: "The Local Resident", need: "Rediscovery", body: "Thinks they know the destination. Is regularly surprised to find they do not. The resident who discovers a remarkable place becomes an ambassador." },
      ];

  return (
    <section
      ref={ref}
      style={{
        position: "relative", width: "100%",
        padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
        background: "linear-gradient(180deg, #070914 0%, #0B0A1E 55%, #100A26 100%)",
        overflow: "hidden",
      }}
    >
      <div aria-hidden style={{
        position: "absolute", top: "-5%", left: "-8%", width: "48vw", height: "48vw", maxWidth: 680, maxHeight: 680,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 70%)", pointerEvents: "none",
      }} />

      <SectionHeader
        eyebrow={locale === "da" ? "Én destination, syv rejser" : "One Destination, Seven Journeys"}
        accent="#A78BFA"
        isInView={isInView}
        title={locale === "da" ? <>Den samme destination.<br />Syv forskellige rejser.</> : <>The same destination.<br />Seven different journeys.</>}
        subtitle={locale === "da"
          ? "Turisten er ikke én person. Forskellige mennesker ankommer med fundamentalt forskellige behov, og hver sin grund til at blive én dag mere."
          : "The tourist is not one person. Different people arrive with fundamentally different needs, and a different reason to stay one more day."}
      />

      <div
        style={{
          position: "relative", zIndex: 1,
          display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "clamp(16px, 1.8vw, 24px)", width: "100%",
        }}
        className="tr-profiles-grid"
      >
        {profiles.map((p, i) => (
          <motion.div
            key={p.who}
            custom={i}
            variants={cardFade}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "relative", borderRadius: 18,
              padding: "clamp(26px, 2.6vw, 36px)",
              background: "linear-gradient(145deg, rgba(168,85,247,0.05) 0%, rgba(255,255,255,0.015) 100%)",
              border: "1px solid rgba(168,85,247,0.18)",
              display: "flex", flexDirection: "column", gap: 12,
            }}
          >
            <h3 style={{
              fontSize: "clamp(1.1rem, 1.35vw, 1.3rem)", fontWeight: 700, lineHeight: 1.2,
              color: "#fff", margin: 0, letterSpacing: "-0.01em",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              {p.who}
            </h3>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const,
              color: "#A78BFA", fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}>
              {locale === "da" ? "Behov · " : "Need · "}{p.need}
            </span>
            <p style={{
              fontSize: "clamp(0.9rem, 0.98vw, 1rem)", lineHeight: 1.65,
              color: "rgba(255,255,255,0.62)", margin: "4px 0 0",
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
            }}>
              {p.body}
            </p>
          </motion.div>
        ))}

        {/* Why this matters — spans the 8th cell */}
        <motion.div
          custom={7}
          variants={cardFade}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            position: "relative", borderRadius: 18,
            padding: "clamp(26px, 2.6vw, 36px)",
            background: "linear-gradient(145deg, rgba(34,211,238,0.10) 0%, rgba(129,140,248,0.06) 100%)",
            border: "1px solid rgba(34,211,238,0.28)",
            display: "flex", flexDirection: "column", gap: 12, justifyContent: "center",
          }}
        >
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const,
            color: "#22D3EE", fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}>
            {locale === "da" ? "Hvorfor det betyder noget" : "Why this matters"}
          </span>
          <p style={{
            fontSize: "clamp(0.95rem, 1.05vw, 1.08rem)", lineHeight: 1.6,
            color: "rgba(255,255,255,0.90)", margin: 0,
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
          }}>
            {locale === "da"
              ? "Den nuværende gæsteoplevelse er bygget til en gennemsnitsperson, der ikke findes. En companion, der betjener hver profil specifikt, skaber længere ophold og stærkere mund-til-mund."
              : "The current visitor experience is built for an average person who does not exist. A companion that serves each profile specifically generates longer stays and far stronger word-of-mouth."}
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1000px) { .tr-profiles-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; } }
        @media (max-width: 640px) { .tr-profiles-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   The AI Travel Companion, shown in the hand — phone mockup for The Solution
   ──────────────────────────────────────────────────────────────────────── */
function CompanionPhone({ isInView, locale }: { isInView: boolean; locale: string }) {
  const accentGrad = "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)";

  const lines = locale === "da"
    ? [
        "Du har allerede oplevet Odense og Egeskov.",
        "I morgen er det bedste vejr i hele dit ophold.",
        "Ærøs madfestival starter kl. 16:00, og der er stadig færgebilletter tilbage.",
        "Det er værd at blive én dag mere.",
        "Vil du have, at jeg flytter din hotelreservation og booker færgen?",
      ]
    : [
        "You’ve already experienced Odense and Egeskov.",
        "Tomorrow is the best weather of your stay.",
        "Ærø’s food festival starts at 16:00 and there are still ferry tickets available.",
        "It’s worth staying one more day.",
        "Would you like me to move your hotel reservation and book the ferry?",
      ];

  const confirms = locale === "da"
    ? ["Hotel forlænget", "Madfestival reserveret", "Cykeludlejning flyttet til i morgen"]
    : ["Hotel extended", "Food festival reserved", "Bike rental moved to tomorrow"];

  const questionEnd = 0.55 + lines.length * 0.18;
  const priceDelay = questionEnd + 0.2;
  const confirmBase = questionEnd + 0.85;

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative", flexShrink: 0 }}
      className="tr-companion-phone"
    >
      {/* Ambient glow behind the device */}
      <div aria-hidden style={{
        position: "absolute", inset: "-14% -12%", borderRadius: "50%", zIndex: 0,
        background: "radial-gradient(circle, rgba(129,140,248,0.28) 0%, rgba(34,211,238,0.12) 45%, transparent 72%)",
        filter: "blur(28px)", pointerEvents: "none",
      }} />

      {/* Device frame */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "clamp(300px, 22vw, 358px)", aspectRatio: "9 / 19.2",
        borderRadius: 54, padding: 12,
        background: "linear-gradient(160deg, #23232f 0%, #0a0a12 55%, #17171f 100%)",
        boxShadow: "0 50px 120px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 1px 2px rgba(255,255,255,0.14)",
      }}>
        {/* Screen */}
        <div style={{
          position: "relative", width: "100%", height: "100%",
          borderRadius: 44, overflow: "hidden",
          background: "linear-gradient(180deg, #0c0920 0%, #120b2a 55%, #0d0820 100%)",
          display: "flex", flexDirection: "column",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}>
          {/* Dynamic island */}
          <div aria-hidden style={{
            position: "absolute", top: 13, left: "50%", transform: "translateX(-50%)",
            width: 92, height: 25, borderRadius: 20, background: "#000", zIndex: 6,
          }} />

          {/* Status bar */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "15px 26px 0", fontSize: 12.5, fontWeight: 600, color: "#fff", height: 42,
          }}>
            <span>9:41</span>
            <span aria-hidden style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <svg width="17" height="11" viewBox="0 0 17 11" fill="#fff"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><path d="M8 10.2C8 10.2 1 4.6 1 4.6C4.9 1 11.1 1 15 4.6C15 4.6 8 10.2 8 10.2Z" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round"/></svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.6" y="0.6" width="21" height="10.8" rx="2.6" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.1"/><rect x="2.2" y="2.2" width="16" height="7.6" rx="1.4" fill="#fff"/><rect x="23" y="4" width="1.6" height="4" rx="0.8" fill="#fff" fillOpacity="0.6"/></svg>
            </span>
          </div>

          {/* App header */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 20px 15px", borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%", background: accentGrad,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              boxShadow: "0 6px 18px rgba(129,140,248,0.4)",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2.5l1.6 4.9a3 3 0 0 0 1.9 1.9l4.9 1.6-4.9 1.6a3 3 0 0 0-1.9 1.9L12 19.3l-1.6-4.9a3 3 0 0 0-1.9-1.9L3.6 10.9l4.9-1.6a3 3 0 0 0 1.9-1.9L12 2.5z" fill="#fff"/>
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ color: "#fff", fontWeight: 600, fontSize: 14.5, letterSpacing: "-0.01em" }}>
                {locale === "da" ? "Rejse-companion" : "Travel Companion"}
              </span>
              <span style={{ color: "#34D399", fontSize: 11, display: "flex", alignItems: "center", gap: 5, fontWeight: 500 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 6px #34D399" }} />
                {locale === "da" ? "Aktiv nu" : "Active now"}
              </span>
            </div>
          </div>

          {/* Conversation */}
          <div style={{
            flexGrow: 1, padding: "20px 18px", display: "flex", flexDirection: "column", gap: 14,
            overflow: "hidden",
          }}>
            {/* AI proactive message */}
            <div style={{
              alignSelf: "flex-start", maxWidth: "90%",
              padding: "15px 17px", borderRadius: "6px 20px 20px 20px",
              background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.09)",
              display: "flex", flexDirection: "column", gap: 9,
              backdropFilter: "blur(6px)",
            }}>
              {lines.map((l, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.55 + i * 0.18 }}
                  style={{
                    margin: 0, fontSize: 13.5, lineHeight: 1.42,
                    color: i === lines.length - 1 ? "#fff" : "rgba(255,255,255,0.82)",
                    fontWeight: i === lines.length - 1 ? 600 : 400,
                  }}
                >
                  {l}
                </motion.p>
              ))}
            </div>

            {/* Price + decision buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: priceDelay }}
              style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", gap: 11 }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "0 3px" }}>
                <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)" }}>
                  {locale === "da" ? "Én nat mere" : "One more night"}
                </span>
                <span style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                  134 <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>{locale === "da" ? "Euro" : "Euros"}</span>
                </span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{
                  flex: 1, height: 42, borderRadius: 13, background: accentGrad,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700, color: "#0c0920", letterSpacing: "-0.01em",
                  boxShadow: "0 8px 20px rgba(129,140,248,0.28)",
                }}>
                  {locale === "da" ? "Ja" : "Yes"}
                </div>
                <div style={{
                  flex: 1, height: 42, borderRadius: 13,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.16)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "-0.01em",
                }}>
                  {locale === "da" ? "Nej" : "No"}
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: confirmBase - 0.15 }}
              style={{
                height: 1, width: "100%", transformOrigin: "left center",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
              }}
            />

            {/* Confirmations */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: confirmBase }}
              style={{
                alignSelf: "stretch", marginTop: 22, padding: "13px 15px", borderRadius: 16,
                background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.22)",
                display: "flex", flexDirection: "column", gap: 11,
              }}
            >
              {confirms.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: confirmBase + 0.2 + i * 0.16 }}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span style={{
                    width: 19, height: 19, borderRadius: "50%", background: "#34D399", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 10px rgba(52,211,153,0.5)",
                  }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2l2.2 2.2 4.8-4.8" stroke="#07130d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{c}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Branded footer */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "13px 16px 22px", borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.38)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {locale === "da" ? "Drevet af" : "Powered by"}
            </span>
            <img src="/images/logos/logo-white.png" alt="xrNORD" style={{ height: 15, width: "auto", opacity: 0.85 }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION — THE SOLUTION: NOT A GUIDE. A COMPANION. (4 traits)
   ════════════════════════════════════════════════════════════════════════ */
function SolutionSection({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const cardFade = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const traits = locale === "da"
    ? [
        { index: "01", title: "Forstår gæsten", body: "Rejsestil, interesser, tempo, familiesituation og tidligere adfærd former, hvad der bliver relevant næste gang.", accent: "#22D3EE", glow: "rgba(34,211,238,0.15)", border: "rgba(34,211,238,0.25)" },
        { index: "02", title: "Kender destinationen", body: "Lokale historier, sæsonevents, skjulte steder, åbningstider, vejr, partnere og lokal viden samles til én levende forståelse af destinationen.", accent: "#818CF8", glow: "rgba(129,140,248,0.15)", border: "rgba(129,140,248,0.25)" },
        { index: "03", title: "Forbinder gæst med mulighed", body: "Den rette anbefaling. På det rette tidspunkt. I den rette kontekst. Uden at gæsten skal søge efter den.", accent: "#A855F7", glow: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.25)" },
        { index: "04", title: "Lærer løbende", body: "Hver interaktion gør fremtidige anbefalinger bedre, for den gæst og for enhver gæst, der følger efter.", accent: "#E879F9", glow: "rgba(232,121,249,0.15)", border: "rgba(232,121,249,0.25)" },
      ]
    : [
        { index: "01", title: "Understands the visitor", body: "Travel style, interests, pace, family situation and previous behaviour shape what becomes relevant next.", accent: "#22D3EE", glow: "rgba(34,211,238,0.15)", border: "rgba(34,211,238,0.25)" },
        { index: "02", title: "Knows the destination", body: "Local stories, seasonal events, hidden places, opening hours, weather, partners and community knowledge combine into one living understanding of the destination.", accent: "#818CF8", glow: "rgba(129,140,248,0.15)", border: "rgba(129,140,248,0.25)" },
        { index: "03", title: "Connects visitor with opportunity", body: "The right recommendation. At the right moment. In the right context. Without the visitor having to search.", accent: "#A855F7", glow: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.25)" },
        { index: "04", title: "Learns continuously", body: "Every interaction makes future recommendations better, for that visitor and for every visitor who follows.", accent: "#E879F9", glow: "rgba(232,121,249,0.15)", border: "rgba(232,121,249,0.25)" },
      ];

  return (
    <section
      ref={ref}
      style={{
        position: "relative", width: "100%", minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
        background: "linear-gradient(180deg, #0b0819 0%, #0e0a20 45%, #0b0819 100%)",
        overflow: "hidden",
      }}
    >
      {/* Subtle background photo — Funen coastline */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url('/assets/cases/Fyn 4.jpg')",
        backgroundSize: "cover", backgroundPosition: "center 55%",
        opacity: 0.4, filter: "saturate(0.55) brightness(0.9)",
        pointerEvents: "none",
      }} />
      {/* Gradient wash over the photo — solid at the seams, letting the photo show through mid-section */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(180deg, #0b0819 0%, rgba(14,10,32,0.35) 26%, rgba(14,10,32,0.32) 55%, rgba(11,8,25,0.4) 78%, #0b0819 100%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.20) 30%, rgba(168,85,247,0.20) 70%, transparent 100%)",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "0%", right: "5%", width: "45vw", height: "45vw", maxWidth: 600, maxHeight: 600,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)", pointerEvents: "none",
      }} />

      {/* Two-column hero: copy on the left, the companion in the hand on the right */}
      <div
        className="tr-solution-hero"
        style={{
          position: "relative", zIndex: 1, width: "100%", maxWidth: 1400, marginLeft: "auto", marginRight: "auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: "clamp(50px, 7vw, 120px)",
          marginBottom: "clamp(64px, 8vw, 110px)",
        }}
      >
        {/* Left — copy */}
        <div className="tr-solution-copy" style={{ maxWidth: 720 }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: 12.5, fontWeight: 700, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#22D3EE",
              marginBottom: 20, fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            {locale === "da" ? "Løsningen" : "The Solution"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(2.8rem, 4.4vw, 5.4rem)", fontWeight: 800,
              lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 26px",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}
          >
            {locale === "da"
              ? <>En personlig rejsecompanion,<br /><span style={{
                  background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>der hjælper hver gæst med at opleve mere.</span></>
              : <>A personal travel companion,<br /><span style={{
                  background: "linear-gradient(135deg, #22D3EE 0%, #818CF8 50%, #E879F9 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>Helping every visitor experience more.</span></>}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.16 }}
            style={{
              margin: 0, maxWidth: 620,
              color: "rgba(255,255,255,0.72)", fontSize: "clamp(1.05rem, 1.25vw, 1.22rem)", lineHeight: 1.7, fontWeight: 300, fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            {locale === "da"
              ? "Den hjælper proaktivt hver gæst med at opdage mere af destinationen ved at forstå, hvem de er, hvad destinationen tilbyder, og hvad der er mest relevant lige nu."
              : "It proactively helps every visitor discover more of the destination by understanding who they are, what the destination offers, and what is most relevant right now."}
          </motion.p>
        </div>

        {/* Right — phone mockup */}
        <div className="tr-solution-phone-col" style={{ display: "flex", justifyContent: "center" }}>
          <CompanionPhone isInView={isInView} locale={locale} />
        </div>
      </div>

      <div
        style={{
          position: "relative", zIndex: 1,
          display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "clamp(16px, 2vw, 28px)", width: "100%",
        }}
        className="tr-solution-grid"
      >
        {traits.map((p, i) => (
          <motion.div
            key={p.index}
            custom={i}
            variants={cardFade}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "relative", borderRadius: 20,
              padding: "clamp(28px, 3vw, 40px) clamp(24px, 2.5vw, 36px)",
              background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
              border: `1px solid ${p.border}`,
              boxShadow: `0 0 40px ${p.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
              backdropFilter: "blur(12px)",
              display: "flex", flexDirection: "column", gap: 18,
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: "15%", right: "15%", height: 2,
              borderRadius: "0 0 4px 4px",
              background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`,
            }} />
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              color: p.accent, fontFamily: "var(--font-inter), system-ui, sans-serif", opacity: 0.7,
            }}>
              {p.index}
            </span>
            <h3 style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", fontWeight: 700, lineHeight: 1.25,
              color: "#fff", margin: 0, letterSpacing: "-0.01em",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              {p.title}
            </h3>
            <p style={{
              fontSize: "clamp(0.9rem, 1vw, 1rem)", lineHeight: 1.65,
              color: "rgba(255,255,255,0.60)", margin: 0, flexGrow: 1,
              fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
            }}>
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (min-width: 1101px) and (max-width: 1700px) {
          .tr-solution-phone-col { margin-right: clamp(60px, 8vw, 120px) !important; }
        }
        @media (max-width: 1100px) {
          .tr-solution-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
          .tr-solution-hero { flex-direction: column !important; align-items: center !important; text-align: center; gap: clamp(48px, 8vw, 72px) !important; }
          .tr-solution-copy { max-width: 640px !important; }
          .tr-solution-copy p { margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 560px) { .tr-solution-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION — THE DATA & INPUTS THAT MAKE IT UNIQUE (5 pillars)
   ════════════════════════════════════════════════════════════════════════ */
function DataPillarsSection({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  const rowFade = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const pillars = locale === "da"
    ? [
        { n: "01", title: "Den levende videnbase", tag: "Fundamentet, companion'en bygges på", body: "Rig, struktureret viden om hver medlemsvirksomhed og deres events. Ikke blot navn og kategori, men karakteren: restaurantens historie, hotellets speciale, museets fokus, håndværket i den uafhængige butik. Det er det fundament, der gør intelligent matchning muligt." },
        { n: "02", title: "Personlige ruter over hele destinationen", tag: "Fra landskabsruter til intime lokale rejser", body: "Mange destinationer har allerede skabt kuraterede naturskønne ruter. Med videnbasen på plads bliver det samme landskab en helt anden rejse afhængigt af, hvem der oplever den. Ruten formes omkring personen, og skalerer ned til by- og kvarterniveau." },
        { n: "03", title: "Live tilgængelighed og booking", tag: "Fra anbefaling til reservation, uden at forlade samtalen", body: "En anbefaling, der ikke kan handles på, er kun det halve værd. Ved at forbinde direkte til tilgængelighedsdata bekræfter companion'en, ikke bare foreslår. Den ved, om bordet er ledigt i aften, og handler i øjeblikket, uden friktion." },
        { n: "04", title: "Business intelligence for destinationen", tag: "Gæsteadfærd omsat til strategisk indsigt for hele destinationens økosystem", body: "Hver interaktion genererer data: hvad de søgte, valgte, accepterede og sprang over. Over tid bliver det et præcist, realtidsbillede af, hvordan destinationen faktisk opleves, en indsigt, der i dag kræver dyre undersøgelser og forsinkede rapporter." },
        { n: "05", title: "Det understøttende intelligenslag", tag: "Den kontekstuelle data, der gør hvert forslag skarpere", body: "Vejr og sæson, transport og mobilitet, besøgsflow og indholdsfeeds fra destinationens store attraktioner. En companion, der ved, at torsdag eftermiddag bringer regn, foreslår den intime indendørs oplevelse, før gæsten bliver skuffet." },
      ]
    : [
        { n: "01", title: "The Living Knowledge Base", tag: "The foundation the companion is built on", body: "Rich, structured knowledge of every member business and their events. Not just name and category, but character: the story of the restaurant, the speciality of the hotel, the focus of the museum, the craft of the independent shop. This is the foundation that makes intelligent matching possible." },
        { n: "02", title: "Personalised Routes Across the Destination", tag: "From scenic regional routes to intimate local journeys", body: "Many destinations have already created curated scenic routes. With the knowledge base in place, the same landscape becomes a completely different journey depending on who is experiencing it. The route is shaped around the person, and scales down to city and neighbourhood level." },
        { n: "03", title: "Live Availability and Seamless Booking", tag: "From recommendation to reservation, without leaving the conversation", body: "A recommendation that cannot be acted on is only half-useful. By connecting directly to availability data, the companion confirms, not just suggests. It knows whether the table is available tonight, and it acts, in the moment, without friction." },
        { n: "04", title: "Business Intelligence for the Destination", tag: "Visitor behaviour turned into strategic insight for the whole destination ecosystem", body: "Every interaction generates data: what they searched for, chose, accepted, and skipped. Over time it becomes a precise, real-time picture of how the destination is actually experienced, the kind of intelligence that currently requires expensive research and delayed surveys." },
        { n: "05", title: "The Supporting Intelligence Layer", tag: "The contextual data that makes every suggestion sharper", body: "Weather and seasonality, transport and mobility, visitor flow, and content feeds from the destination's major attractions. A companion that knows Thursday afternoon will bring rain suggests the intimate indoor experience before the visitor is disappointed." },
      ];

  return (
    <section
      ref={ref}
      style={{
        position: "relative", width: "100%",
        padding: "clamp(100px, 12vw, 160px) clamp(24px, 6vw, 160px)",
        background: "linear-gradient(180deg, #0F2244 0%, #0A1730 55%, #070914 100%)",
        overflow: "hidden",
      }}
    >
      <div aria-hidden style={{
        position: "absolute", top: "8%", left: "-6%", width: "42vw", height: "42vw", maxWidth: 580, maxHeight: 580,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)", pointerEvents: "none",
      }} />

      <SectionHeader
        eyebrow={locale === "da" ? "Hvad gør det intelligent" : "What Makes It Intelligent"}
        accent="#818CF8"
        isInView={isInView}
        title={locale === "da" ? <>De data og input,<br />der gør det unikt</> : <>The data and inputs<br />that make it unique</>}
        subtitle={locale === "da"
          ? "En intelligent Travel Companion er kun så god som den viden, den bygges på. Fem sammenkoblede datasøjler definerer, hvad der gør systemet fundamentalt anderledes."
          : "An intelligent Travel Companion is only as good as the knowledge it is built on. Five interconnected data pillars define what makes this system genuinely different."}
        maxWidth={900}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(16px, 1.8vw, 22px)" }}>
        {pillars.map((p, i) => (
          <motion.div
            key={p.n}
            custom={i}
            variants={rowFade}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "relative", borderRadius: 18,
              padding: "clamp(26px, 2.6vw, 38px) clamp(26px, 3vw, 44px)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
              border: "1px solid rgba(129,140,248,0.18)",
              display: "grid", gridTemplateColumns: "auto 1fr", gap: "clamp(20px, 3vw, 44px)", alignItems: "start",
            }}
            className="tr-pillar-row"
          >
            <span style={{
              fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 800, lineHeight: 1,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #22D3EE, #818CF8, #A855F7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}>
              {p.n}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <h3 style={{
                fontSize: "clamp(1.2rem, 1.6vw, 1.5rem)", fontWeight: 700, lineHeight: 1.2,
                color: "#fff", margin: 0, letterSpacing: "-0.01em",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: "clamp(0.8rem, 0.92vw, 0.92rem)", fontWeight: 600, fontStyle: "italic",
                color: "#818CF8", margin: 0, letterSpacing: "0.01em",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
              }}>
                {p.tag}
              </p>
              <p style={{
                fontSize: "clamp(0.92rem, 1.02vw, 1.05rem)", lineHeight: 1.66,
                color: "rgba(255,255,255,0.64)", margin: "4px 0 0",
                fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
              }}>
                {p.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .tr-pillar-row { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION — CLOSING CTA
   ════════════════════════════════════════════════════════════════════════ */
function StrategyDocMockup({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{ flexShrink: 0, width: "clamp(340px, 32vw, 500px)", position: "relative" }}
      className="tr-closing-doc"
    >
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "130%", height: "120%",
        background: "radial-gradient(ellipse, rgba(129,140,248,0.18) 0%, rgba(168,85,247,0.1) 35%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "relative", zIndex: 1, borderRadius: 12, overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 80px rgba(129,140,248,0.12), 0 0 40px rgba(168,85,247,0.08)",
        border: "1px solid rgba(129,140,248,0.25)",
      }}>
        <img
          src="/assets/Tourism/Tourism Streategy Document.png"
          alt="One More Day - Strategic proposal for Destination Fyn"
          style={{
            width: "100%", height: "auto", display: "block",
          }}
        />
      </div>
    </motion.div>
  );
}

function ClosingSection({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative", width: "100%", minHeight: "100vh",
        padding: "clamp(110px, 13vw, 180px) clamp(24px, 6vw, 160px)",
        background: "linear-gradient(160deg, #100A26 0%, #0F0D28 45%, #04060F 100%)",
        overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center",
      }}
    >
      <div aria-hidden style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "70vw", height: "60vw", maxWidth: 900, maxHeight: 700,
        background: "radial-gradient(ellipse, rgba(168,85,247,0.14) 0%, rgba(34,211,238,0.06) 45%, transparent 72%)",
        pointerEvents: "none",
      }} />

      <div
        className="tr-closing-layout"
        style={{
          position: "relative", zIndex: 1, maxWidth: 1400,
          margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "clamp(40px, 5vw, 80px)",
        }}
      >
        {/* left: text + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: 1, minWidth: 0, maxWidth: 600 }}
        >
          <p style={{
            fontSize: 12.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const,
            color: "#22D3EE", marginBottom: 24, fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}>
            {locale === "da" ? "Lad os fortsætte samtalen" : "Let’s Continue the Conversation"}
          </p>
          <h2 style={{
            fontSize: "clamp(2rem, 3.6vw, 4.2rem)", fontWeight: 800, lineHeight: 1.08,
            letterSpacing: "-0.03em", color: "#fff", margin: "0 0 28px",
            fontFamily: "var(--font-geist), system-ui, sans-serif",
          }}>
            {locale === "da" ? "Kunne dette virke for jeres destination?" : "Could this work for your destination?"}
          </h2>
          <p style={{
            fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)", lineHeight: 1.65,
            color: "rgba(255,255,255,0.68)", maxWidth: 540, margin: "0 0 20px",
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300,
          }}>
            {locale === "da"
              ? "Vi har udarbejdet et omfattende strategipapir, der beskriver visionen, arkitekturen, implementeringstilgangen og forretningsmulighederne bag AI Travel Companion."
              : "We’ve prepared a comprehensive strategy paper describing the vision, architecture, implementation approach and business opportunities behind the AI Travel Companion."}
          </p>
          <p style={{
            fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)", lineHeight: 1.65,
            color: "rgba(255,255,255,0.92)", maxWidth: 540, margin: "0 0 44px",
            fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 400,
          }}>
            {locale === "da"
              ? "Kontakt os for at modtage strategibriefet og drøfte, hvordan det kunne se ud for jeres destination."
              : "Contact us to receive the strategy brief and discuss what it could look like for your destination."}
          </p>
          <div style={{ display: "flex" }}>
            <CtaPair locale={locale} label={locale === "da" ? "Anmod om strategibriefet" : "Request the Strategy Brief"} />
          </div>
        </motion.div>

        {/* right: strategy document mockup */}
        <StrategyDocMockup isInView={isInView} />
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .tr-closing-layout { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .tr-closing-layout > div:first-child { max-width: 640px !important; }
          .tr-closing-layout > div:first-child p,
          .tr-closing-layout > div:first-child h2 { max-width: 100% !important; }
          .tr-closing-layout > div:first-child > div:last-child { justify-content: center !important; }
          .tr-closing-doc { width: clamp(280px, 55vw, 380px) !important; }
        }
        @media (max-width: 560px) {
          .tr-closing-doc { width: clamp(260px, 80vw, 340px) !important; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION — PART 07 · NO COMPANION WITHOUT THE DATA (data foundation)
   ════════════════════════════════════════════════════════════════════════ */
function DataFoundationSection({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  const conditions = locale === "da"
    ? [
        { n: "01", t: "Struktureret og maskinlæsbar", b: "Fri tekst på en hjemmeside kan læses af et menneske, ikke pålideligt af et system. Åbningstider, priser, kapacitet og kategori skal findes som strukturerede felter." },
        { n: "02", t: "Én fælles datamodel", b: "Et hotel, et museum og en restaurant beskriver sig selv på helt forskellige måder i dag. Destinationen har brug for én fælles struktur, One Data, som alle aktørers information mapper ind i." },
        { n: "03", t: "Semantisk rig", b: "AI personaliserer på mening, ikke kategorier. 'Restaurant' er et tag; 'stille havnerestaurant med fisk, bedst ved solnedgang, egnet til par' er viden." },
        { n: "04", t: "Live og forbundet via API'er", b: "Tilgængelighed, events og åbningsstatus ændrer sig dagligt. Data leveret pr. mail eller opdateret kvartalsvis er forældet ved ankomst. Det skal forbindes via API'er eller data-scrape." },
        { n: "05", t: "Styret og aftalt", b: "Data tilhører de aktører, der skaber det. At dele det kræver klarhed om ejerskab, brug, samtykke og værdi, der flyder tilbage, formaliseret i underskrevne aftaler." },
      ]
    : [
        { n: "01", t: "Structured and machine-readable", b: "Free text on a website is readable by a human, not reliably by a system. Opening hours, prices, capacity, location, and category must exist as structured fields, not prose." },
        { n: "02", t: "One shared data model", b: "A hotel, a museum, and a restaurant describe themselves in completely different ways today. The destination needs one common structure, the One Data layer, that every actor's information maps into." },
        { n: "03", t: "Semantically rich", b: "AI personalises on meaning, not categories. 'Restaurant' is a tag; 'quiet harbour-side seafood restaurant, best at sunset, suited to couples' is knowledge." },
        { n: "04", t: "Live and connected through APIs", b: "Availability, events, and opening status change daily. Data delivered by email or updated quarterly is stale on arrival. It must be connected through APIs or data scrape." },
        { n: "05", t: "Governed and agreed", b: "Data belongs to the actors who create it. Sharing it requires clarity about ownership, usage, consent, and value flowing back to each actor, formalised in signed agreements." },
      ];

  const layers = locale === "da"
    ? [
        { t: "Indsigt & analyse", s: "Løbende intelligens og forbedringsrytme for VisitFyn og hver aktør", tone: "mid" },
        { t: "Visit Fyn Travel Companion", s: "Gæsteoplevelsen · anbefalinger, historier, ruter og agentisk booking", tone: "top" },
        { t: "One Data", s: "Det fælles, strukturerede, AI-klare datalag, som hver aktørs information mapper ind i", tone: "core" },
      ]
    : [
        { t: "Insight & Analysis", s: "Continuous intelligence and improvement rhythm for VisitFyn and every actor", tone: "mid" },
        { t: "Visit Fyn Travel Companion", s: "The visitor experience · recommendations, stories, routes, and agentic booking", tone: "top" },
        { t: "One Data", s: "The shared, structured, AI-ready data layer every actor's information maps into", tone: "core" },
      ];

  const actors = locale === "da"
    ? ["Hoteller", "Restauranter & butikker", "Museer, attraktioner & events"]
    : ["Hotels", "Restaurants & shops", "Museums & Attractions"];

  return (
    <section ref={ref} style={{
      position: "relative", width: "100%", overflow: "hidden",
      padding: "clamp(100px, 12vw, 170px) clamp(24px, 6vw, 160px)",
      background: "linear-gradient(180deg, #0b0819 0%, #0a0818 55%, #04060F 100%)",
    }}>
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(129,140,248,0.22) 30%, rgba(168,85,247,0.22) 70%, transparent 100%)" }} />
      <SectionHeader
        eyebrow={locale === "da" ? "Datafundamentet" : "The Data Foundation"}
        accent="#818CF8"
        isInView={isInView}
        maxWidth={960}
        title={locale === "da" ? <>Ingen companion<br />uden dataen.</> : <>No companion<br />without the data.</>}
        subtitle={locale === "da"
          ? "Alt i dette hviler på én betingelse: at destinationens data findes, er tilgængelig, og er struktureret på en måde, AI rent faktisk kan bruge. I dag er den spredt på tværs af systemer og organisationer. Det første leverance er ikke en funktion, det er fundamentet."
          : "Everything here rests on one condition: that the destination's data exists, is accessible, and is structured in a way AI can actually use. Today it is scattered across systems and organisations. The first deliverable is not a feature, it is the foundation."}
      />

      {/* One Data architecture diagram */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "stretch", gap: 0 }}
      >
        {layers.map((l, i) => (
          <React.Fragment key={l.t}>
            <div style={{
              borderRadius: 16, padding: "clamp(20px, 2.2vw, 28px) clamp(22px, 2.4vw, 34px)", textAlign: "center",
              background: l.tone === "top"
                ? "linear-gradient(135deg, #0f1120, #14162b)"
                : l.tone === "core"
                  ? "linear-gradient(135deg, rgba(168,85,247,0.18), rgba(129,140,248,0.12))"
                  : "linear-gradient(135deg, rgba(129,140,248,0.1), rgba(129,140,248,0.05))",
              border: l.tone === "top" ? "1px solid rgba(129,140,248,0.35)" : l.tone === "core" ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(129,140,248,0.22)",
            }}>
              <p style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.35rem)", fontWeight: 700, color: "#fff", margin: "0 0 6px", letterSpacing: "0.02em", fontFamily: "var(--font-geist), system-ui, sans-serif" }}>{l.t}</p>
              <p style={{ fontSize: "clamp(0.82rem, 0.95vw, 0.95rem)", color: "rgba(255,255,255,0.6)", margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300 }}>{l.s}</p>
              {l.tone === "core" && (
                <p style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#A855F7", margin: "10px 0 0", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  {locale === "da" ? "Website · SoMe · Booking Systemer - Events" : "Website · SoMe · Booking Systems - Events"}
                </p>
              )}
            </div>
            <div aria-hidden style={{ display: "flex", justifyContent: "center", padding: "8px 0", color: "rgba(129,140,248,0.6)", fontSize: 14 }}>▲</div>
          </React.Fragment>
        ))}
        {/* actor row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 12 }} className="tr-actor-row">
          {actors.map((a) => (
            <div key={a} style={{ borderRadius: 14, padding: "clamp(16px, 1.8vw, 22px)", textAlign: "center", background: "rgba(129,140,248,0.06)", border: "1px solid rgba(129,140,248,0.18)" }}>
              <p style={{ fontSize: "clamp(0.92rem, 1.05vw, 1.05rem)", fontWeight: 600, color: "#fff", margin: 0, fontFamily: "var(--font-geist), system-ui, sans-serif" }}>{a}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, borderRadius: 14, padding: "clamp(14px, 1.6vw, 20px)", textAlign: "center", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.55)", margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
            {locale === "da" ? "Drift · support · governance" : "Operations · support · governance"}
          </p>
        </div>
      </motion.div>

      {/* Five conditions */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "clamp(56px, 7vw, 96px) auto 0" }}>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.4rem)", fontWeight: 800, color: "#fff", margin: "0 0 clamp(28px, 3vw, 44px)", letterSpacing: "-0.02em", textAlign: "center", fontFamily: "var(--font-geist), system-ui, sans-serif" }}
        >
          {locale === "da" ? "Hvorfor AI kræver struktureret data." : "Why AI needs structured data."}
        </motion.h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(16px, 1.8vw, 24px)" }}>
          {conditions.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.35 + i * 0.08 }}
              style={{ borderRadius: 16, padding: "clamp(22px, 2.4vw, 30px)", background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)", border: "1px solid rgba(129,140,248,0.16)", display: "flex", flexDirection: "column", gap: 10 }}
            >
              <span style={{ fontSize: "clamp(1.4rem, 1.8vw, 1.9rem)", fontWeight: 800, background: "linear-gradient(135deg, #818CF8, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "var(--font-geist), system-ui, sans-serif" }}>{c.n}</span>
              <h4 style={{ fontSize: "clamp(1.02rem, 1.15vw, 1.2rem)", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2, letterSpacing: "-0.01em", fontFamily: "var(--font-geist), system-ui, sans-serif" }}>{c.t}</h4>
              <p style={{ fontSize: "clamp(0.88rem, 0.96vw, 0.98rem)", lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 300 }}>{c.b}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 620px){ .tr-actor-row { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default function TourismAIPage() {
  const locale = useLocale();

  return (
    <SmoothScroll>
      <main style={{ background: "#04060F" }}>
        <Navbar />
        <Hero locale={locale} />
        {/* Part 01 — the problem */}
        <ChallengeSectionVersionB locale={locale} />
        {/* Part 03 — the solution */}
        <SolutionSection locale={locale} />
        <MomentsSection locale={locale} />
        {/* Part 02 — the visitors */}
        <ProfilesSection locale={locale} />
        {/* Part 07 — the data foundation */}
        <DataFoundationSection locale={locale} />
        {/* Closing */}
        <ClosingSection locale={locale} />
      </main>
    </SmoothScroll>
  );
}
