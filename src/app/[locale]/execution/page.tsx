"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.14 } },
};

// ── Ecosystem convergence — multiple flows merging into one unified system ────
// Four input flows (left) representing different sources of AI and systems.
// They gradually converge toward center, then merge into a single strong line
// that represents "Your Company AI" — the unified destination.
// Visual narrative: fragmented sources → connecting transformation → owned AI.

function EcosystemPlaceholder({ da }: { da: boolean }) {
  // Three feathery contrail lines converging at (1140, 268)
  // Each rendered as 4 stacked layers: outer bloom → soft body → core → sharp edge
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1400 480"
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        {/* ── LINE GRADIENT ──
            Lavender at left → violet → pink → white at the convergence tip.
            gradientUnits="userSpaceOnUse" maps x=0–1140 directly to SVG coords. */}
        <linearGradient id="lc" x1="0" y1="0" x2="1140" y2="0"
          gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#C4B5FD" />
          <stop offset="52%"  stopColor="#A78BFA" />
          <stop offset="82%"  stopColor="#C084FC" />
          <stop offset="93%"  stopColor="#E879F9" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>

        {/* ── CONVERGENCE BLOOM — radial glow centred on (1140, 268) ── */}
        <radialGradient id="cg" cx="1140" cy="268" r="130"
          gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#FFFFFF"  stopOpacity="0.92" />
          <stop offset="13%"  stopColor="#F0E8FF"  stopOpacity="0.54" />
          <stop offset="36%"  stopColor="#C084FC"  stopOpacity="0.22" />
          <stop offset="72%"  stopColor="#A78BFA"  stopOpacity="0.06" />
          <stop offset="100%" stopColor="#A78BFA"  stopOpacity="0.00" />
        </radialGradient>

        {/* ── FEATHER FILTERS — userSpaceOnUse prevents bounding-box clipping ── */}
        {/* Outer halo blur */}
        <filter id="b14" filterUnits="userSpaceOnUse"
          x="-80" y="-80" width="1500" height="640">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        {/* Soft body blur */}
        <filter id="b5" filterUnits="userSpaceOnUse"
          x="-30" y="-30" width="1440" height="540">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        {/* Core body blur */}
        <filter id="b2" filterUnits="userSpaceOnUse"
          x="-10" y="-10" width="1410" height="500">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* ────────────────────────────────────────────────────────────────
          THREE FEATHERY CONTRAIL LINES — each 4 stacked layers:
            1. Outer halo   sw=52, blur=14, opacity=0.045
            2. Soft body    sw=20, blur=5,  opacity=0.10
            3. Core body    sw=7,  blur=2,  opacity=0.22
            4. Sharp edge   sw=1.2,         opacity=0.40
          All converge at (1140, 268).
          ──────────────────────────────────────────────────────────── */}

      {/* ── LINE 1 — SaaS / AI SaaS (top, sweeps down gently) ── */}
      <path d="M 0 108 C 520 115, 920 208, 1140 268"
        fill="none" stroke="url(#lc)" strokeWidth="52"
        filter="url(#b14)" opacity={0.045} strokeLinecap="round" />
      <path d="M 0 108 C 520 115, 920 208, 1140 268"
        fill="none" stroke="url(#lc)" strokeWidth="20"
        filter="url(#b5)" opacity={0.10} strokeLinecap="round" />
      <path d="M 0 108 C 520 115, 920 208, 1140 268"
        fill="none" stroke="url(#lc)" strokeWidth="7"
        filter="url(#b2)" opacity={0.22} strokeLinecap="round" />
      <path d="M 0 108 C 520 115, 920 208, 1140 268"
        fill="none" stroke="url(#lc)" strokeWidth="1.2"
        opacity={0.40} strokeLinecap="round" />

      {/* ── LINE 2 — Your Data / AI-ready Data (middle, nearly flat) ── */}
      <path d="M 0 258 C 520 258, 920 262, 1140 268"
        fill="none" stroke="url(#lc)" strokeWidth="52"
        filter="url(#b14)" opacity={0.045} strokeLinecap="round" />
      <path d="M 0 258 C 520 258, 920 262, 1140 268"
        fill="none" stroke="url(#lc)" strokeWidth="20"
        filter="url(#b5)" opacity={0.10} strokeLinecap="round" />
      <path d="M 0 258 C 520 258, 920 262, 1140 268"
        fill="none" stroke="url(#lc)" strokeWidth="7"
        filter="url(#b2)" opacity={0.22} strokeLinecap="round" />
      <path d="M 0 258 C 520 258, 920 262, 1140 268"
        fill="none" stroke="url(#lc)" strokeWidth="1.2"
        opacity={0.40} strokeLinecap="round" />

      {/* ── LINE 3 — Bespoke Systems / Your Bespoke AI (bottom, rises to tip) ── */}
      <path d="M 0 400 C 520 390, 920 334, 1140 268"
        fill="none" stroke="url(#lc)" strokeWidth="52"
        filter="url(#b14)" opacity={0.045} strokeLinecap="round" />
      <path d="M 0 400 C 520 390, 920 334, 1140 268"
        fill="none" stroke="url(#lc)" strokeWidth="20"
        filter="url(#b5)" opacity={0.10} strokeLinecap="round" />
      <path d="M 0 400 C 520 390, 920 334, 1140 268"
        fill="none" stroke="url(#lc)" strokeWidth="7"
        filter="url(#b2)" opacity={0.22} strokeLinecap="round" />
      <path d="M 0 400 C 520 390, 920 334, 1140 268"
        fill="none" stroke="url(#lc)" strokeWidth="1.2"
        opacity={0.40} strokeLinecap="round" />

      {/* ── CONVERGENCE BLOOM ── */}
      {/* Radial wash from the tip */}
      <rect x="840" y="100" width="560" height="336" fill="url(#cg)" />
      {/* Soft outer glow */}
      <circle cx={1140} cy={268} r={52} fill="#E9D5FF"
        opacity={0.22} filter="url(#b14)" />
      {/* Inner bloom */}
      <circle cx={1140} cy={268} r={24} fill="#FFFFFF"
        opacity={0.38} filter="url(#b5)" />
      {/* Crisp ring */}
      <circle cx={1140} cy={268} r={13} fill="none"
        stroke="#FFFFFF" strokeWidth="0.9" strokeOpacity={0.62} />
      {/* Core dot — gently pulses */}
      <motion.circle cx={1140} cy={268} r={6.5} fill="#FFFFFF" opacity={0.92}
        animate={{ opacity: [0.84, 0.97, 0.84] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />

      {/* ── LABELS ── floating near their lines, Inter font ── */}
      <g className="exec-flow-labels"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontWeight={400} fill="#1E1B4B">

        {/* Line 1 left — SaaS */}
        <text x={215} y={78} fontSize={17} fillOpacity={0.80}>
          SaaS
        </text>

        {/* Line 1 right — AI SaaS */}
        <text x={648} y={148} fontSize={17} fillOpacity={0.80}>
          AI SaaS
        </text>

        {/* Line 2 left — Your Data (two lines) */}
        <text x={142} y={230} fontSize={17} fillOpacity={0.80}>
          {da ? "Jeres" : "Your"}
        </text>
        <text x={142} y={252} fontSize={17} fillOpacity={0.80}>
          Data
        </text>

        {/* Line 2 right — AI-ready Data */}
        <text x={638} y={236} fontSize={17} fillOpacity={0.80}>
          {da ? "AI-klar Data" : "AI-ready Data"}
        </text>

        {/* Line 3 left — Bespoke Systems & Applications (two lines) */}
        <text x={78} y={372} fontSize={16} fillOpacity={0.76}>
          {da ? "Bespoke Systemer" : "Bespoke Systems"}
        </text>
        <text x={78} y={394} fontSize={16} fillOpacity={0.76}>
          {"& "}{da ? "Applikationer" : "Applications"}
        </text>

        {/* Line 3 right — Your Bespoke AI (two lines) */}
        <text x={576} y={308} fontSize={17} fillOpacity={0.80}>
          {da ? "Jeres Bespoke" : "Your Bespoke"}
        </text>
        <text x={576} y={330} fontSize={17} fillOpacity={0.80}>
          AI
        </text>

        {/* Destination — Your Company AI (large, right of bloom) */}
        <text x={1188} y={228} fontSize={24} fontWeight={400}
          fillOpacity={0.88} letterSpacing={0.3}>
          {da ? "Jeres Company AI" : "Your Company AI"}
        </text>
      </g>
    </svg>
  );
}

// Hero accent — purple → pink
const accentStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #7A5AF8, #DA4ACB)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// Section 1 accent — cyan → indigo (evolution / forward motion)
// Different family from hero; "AI" intentionally stays black
const accentS1Style: React.CSSProperties = {
  background: "linear-gradient(90deg, #0EA5E9, #6D28D9)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// ── Page ────────────────────────────────────────────────────────────────────
export default function ExecutionPage() {
  const locale = useLocale();
  const da = locale === "da";

  return (
    <main style={{ fontFamily: "var(--font-geist), sans-serif", background: "#FAF8F4" }}>

      <style>{`
        /* ════════════════════════════════════════════════════
           ARCHITECTURE
           exec-wrapper  — positioning context for flow field
           exec-hero-section  — locked hero, full viewport
           exec-flow          — absolute field between sections
           exec-s1-section    — Section 1, bottom-right reveal
           ════════════════════════════════════════════════════ */

        /* Wrapper holds both sections + the flow as one context */
        .exec-wrapper {
          position: relative;
          overflow-x: clip;
          background: linear-gradient(180deg, #FAF8F4 0%, #F6F3EE 55%, #F2EFE7 100%);
        }

        /* ── HERO SECTION ── */
        .exec-hero-section {
          min-height: 100vh;
          position: relative;
          z-index: 2;
        }
        .exec-hero-inner {
          width: 100%;
          padding: clamp(160px, 18vw, 240px) clamp(40px, 6.5vw, 120px) clamp(80px, 10vw, 140px);
        }
        .exec-hero-col {
          max-width: 70%;
          margin-left: clamp(0px, 12vw, 200px);
        }

        /* ── FLOW — POSITION LOCKED ──────────────────────────────────
           top: viewport-relative (vh) so position scales with screen height.
           height: 34.3vw = SVG's exact natural aspect ratio (480 ÷ 1400 × 100vw).
           This eliminates all letterboxing — SVG fills the container perfectly
           at every viewport width, first line appears right at the div top.
           z-index 0 sits behind both text sections (hero z-index 2).
           Integration point for Prompt 2 graphic system.
           ─────────────────────────────────────────────────────────── */
        .exec-flow {
          position: absolute;
          top: 29vh;          /* LOCKED — desktop (1024–1440px) */
          height: 34.3vw;     /* = SVG aspect ratio, no letterboxing */
          left: 0;
          right: 0;
          z-index: 0;
          pointer-events: none;
        }

        /* ── SECTION 1 — pulled up under graphics, right-anchored ──
           Negative margin-top closes the gap between graphic end (~63vh)
           and section start (100vh). Padding-top fine-tunes final position.
           Right padding tightened to push column closer to right edge. */
        .exec-s1-section {
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          position: relative;
          z-index: 2;
          margin-top: -14vh;
        }
        .exec-s1-inner {
          width: 100%;
          padding: clamp(16px, 2vw, 32px) clamp(40px, 5.5vw, 96px) clamp(80px, 10vw, 140px) clamp(40px, 6.5vw, 120px);
        }
        /* Right-anchored — narrower col = larger auto left margin = further right */
        .exec-s1-col {
          max-width: 50%;
          margin-left: auto;
        }

        /* ── Monitor (≥1440px) ── */
        @media (min-width: 1440px) {
          .exec-flow { top: 30vh; }
        }

        /* ── Desktop (1025–1439px) ── */
        @media (min-width: 1025px) and (max-width: 1439px) {
          .exec-hero-col {
            max-width: 70%;
            margin-left: clamp(60px, 8vw, 140px);
          }
          .exec-s1-section { margin-top: -12vh; }
          .exec-s1-col     { max-width: 50%; }
        }

        /* ── Tablet (≤1024px) ── */
        @media (max-width: 1024px) {
          .exec-hero-col   { max-width: 86%; margin-left: clamp(0px, 4vw, 48px); }
          .exec-s1-section { margin-top: -16vh; }
          .exec-s1-col     { max-width: 76%; }
          .exec-flow       { top: 25vh; }
        }

        /* ── Mobile (≤767px) — stack: hero → flow → section 1 ── */
        @media (max-width: 767px) {
          .exec-hero-section { min-height: auto; }
          .exec-hero-inner   { padding-top: 108px; padding-bottom: 48px; padding-left: 24px; padding-right: 24px; }
          .exec-hero-col     { max-width: 100%; }

          /* Flow reverts to in-flow — sits between sections in DOM order */
          .exec-flow {
            position: relative;
            top: auto; left: auto; right: auto;
            height: 200px;
            z-index: 0;
          }
          /* Labels hidden on mobile — unreadable at reduced SVG scale.
             Section body text carries the meaning instead. */
          .exec-flow-labels { display: none; }

          .exec-s1-section {
            min-height: auto;
            align-items: flex-start;
            margin-top: 0;
          }
          .exec-s1-col {
            max-width: 100%;
            margin-left: 0;
          }
          .exec-s1-inner {
            padding-top: 32px;
            padding-bottom: 72px;
            padding-left: 24px;
            padding-right: 24px;
          }
        }
      `}</style>

      <Navbar />

      {/* ════════════════════════════════════════════════════════════════
          WRAPPER — hero + flow + section 1 as one continuous composition
          ════════════════════════════════════════════════════════════════ */}
      <div className="exec-wrapper">

        {/* Ambient tonal washes — barely perceptible atmosphere */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          background:
            "radial-gradient(ellipse 72% 42% at 18% 22%, rgba(124,58,237,0.032), transparent 55%), " +
            "radial-gradient(ellipse 60% 44% at 85% 82%, rgba(139,92,246,0.022), transparent 60%)",
        }} />

        {/* ── HERO SECTION — locked ── */}
        <section className="exec-hero-section">
          <div className="exec-hero-inner">
            <motion.div
              className="exec-hero-col"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {/* Eyebrow */}
              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "#6D28D9",
                  marginBottom: "24px",
                  opacity: 0.85,
                }}
              >
                {da ? "Jeres fremtidige differentiator" : "Your Future Differentiator"}
              </motion.p>

              {/* Visual headline — H2 for design, SEO weight carried by H1 below */}
              <motion.h2
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "clamp(3rem, 5.5vw, 7rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.97,
                  color: "#1A1814",
                  marginBottom: "36px",
                }}
              >
                {da ? (
                  <>
                    <span style={accentStyle}>AI</span>
                    {" Er Ikke en Løsning."}
                    <br />
                    {"Det "}
                    <span style={accentStyle}>Bliver Jeres</span>
                    <br />
                    <span style={accentStyle}>{"Ecosystem"}</span>
                  </>
                ) : (
                  <>
                    <span style={accentStyle}>AI</span>
                    {" Is Not a Solution."}
                    <br />
                    {"It "}
                    <span style={accentStyle}>Becomes Your</span>
                    <br />
                    <span style={accentStyle}>{"Ecosystem"}</span>
                  </>
                )}
              </motion.h2>

              {/* Body — first paragraph tagged H1 for SEO */}
              <motion.div
                variants={fadeUp}
                style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "580px" }}
              >
                {(da ? [
                  "De fleste virksomheder bruger AI som et værktøj eller en løsning.",
                  "Men reel effekt opstår gennem implementering af AI ved at forbinde systemer, data og arbejdsgange på tværs af jeres forretning, så de virker sammen.",
                  "Over tid udvikler dette sig til jeres eget Company AI, bygget til den måde I opererer på.",
                ] : [
                  "Most companies approach AI as a tool or a solution.",
                  "But real impact comes from AI implementation, connecting systems, data, and workflows across your business so they work together.",
                  "Over time, this evolves into your own Company AI, built around how you operate.",
                ]).map((para, i) => {
                  const Tag = i === 0 ? "h1" : "p";
                  return (
                    <Tag
                      key={i}
                      style={{
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontSize: "clamp(0.93rem, 1.05vw, 1.06rem)",
                        fontWeight: 400,
                        lineHeight: 1.85,
                        color: "#4A4640",
                        margin: 0,
                      }}
                    >
                      {para}
                    </Tag>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FLOW — absolute on desktop, in-flow on mobile ──
            Bridges hero (from 44vh down) through Section 1.
            z-index 0 sits behind both text sections. */}
        <motion.div
          className="exec-flow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
          aria-hidden="true"
        >
          <EcosystemPlaceholder da={da} />
        </motion.div>

        {/* ── SECTION 1 — below hero, bottom-right reveal ── */}
        <section className="exec-s1-section">
          <div className="exec-s1-inner">
            <div className="exec-s1-col">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={stagger}
              >
                {/* Thin vertical accent — emerges from the flow above */}
                <motion.div
                  variants={fadeUp}
                  style={{
                    width: "1.5px",
                    height: "40px",
                    background: "linear-gradient(180deg, #6D28D9 0%, transparent 100%)",
                    marginBottom: "24px",
                    opacity: 0.5,
                  }}
                />

                {/* H2 — identical typographic scale to Hero H1 */}
                <motion.h2
                  variants={fadeUp}
                  style={{
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "clamp(3rem, 5.5vw, 7rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    lineHeight: 0.97,
                    color: "#1A1814",
                    marginBottom: "36px",
                  }}
                >
                  {da ? (
                    <>
                      <span style={accentS1Style}>{"Jeres Company "}</span>
                      {"AI"}
                      <br />
                      <span style={accentS1Style}>{"Udvikler Sig Over Tid"}</span>
                    </>
                  ) : (
                    <>
                      <span style={accentS1Style}>{"Your Company "}</span>
                      {"AI"}
                      <br />
                      <span style={accentS1Style}>{"Evolves Over Time"}</span>
                    </>
                  )}
                </motion.h2>

                {/* Body — same style as hero body */}
                <motion.div
                  variants={fadeUp}
                  style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  {(da ? [
                    { text: "Det starter ikke som et komplet system.", accent: false },
                    { text: "Det begynder med det I allerede bruger. Generel AI, eksterne værktøjer og eksisterende systemer.", accent: false },
                    { text: "Efterhånden som disse forbindes med jeres forretning, opstår nye muligheder. Data bliver brugbart. Arbejdsgange ændres.", accent: false },
                    { text: "Over tid sker der et skifte. Fra at bruge AI til at bygge jeres eget Company AI, skræddersyet til den måde I opererer på.", accent: false },
                    { text: "Det er den evolution vi designer og bygger med jer.", accent: true },
                  ] : [
                    { text: "It does not start as a complete system.", accent: false },
                    { text: "It begins with what you already use, general AI, external tools, and existing systems.", accent: false },
                    { text: "As these are connected to your business, new capabilities emerge. Data becomes usable. Workflows change.", accent: false },
                    { text: "Over time, this shifts. From using AI to building your own Company AI, tailored to how you operate.", accent: false },
                    { text: "That is the evolution we design and build with you.", accent: true },
                  ]).map((item, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontSize: "clamp(0.93rem, 1.05vw, 1.06rem)",
                        lineHeight: 1.85,
                        color: item.accent ? "#5B4B8A" : "#4A4640",
                        fontWeight: item.accent ? 500 : 400,
                        margin: 0,
                      }}
                    >
                      {item.text}
                    </p>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

      </div>{/* end exec-wrapper */}

      {/* ════════════════════════════════════════════════════════════════
          CTA — minimal, confident
          ════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#FAF8F4",
          padding: "clamp(80px, 10vw, 140px) clamp(40px, 6.5vw, 120px)",
          borderTop: "1px solid rgba(26,24,20,0.06)",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#6D28D9",
              marginBottom: "18px",
              opacity: 0.85,
            }}
          >
            {da ? "Lad os bygge det" : "Let's build it"}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(1.75rem, 2.6vw, 2.9rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
              color: "#1A1814",
              marginBottom: "18px",
            }}
          >
            {da
              ? "Klar til at starte jeres AI ecosystem?"
              : "Ready to start your AI ecosystem?"}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "clamp(0.93rem, 1vw, 1.06rem)",
              lineHeight: 1.8,
              color: "#6B665C",
              marginBottom: "36px",
            }}
          >
            {da
              ? "Lad os tage en samtale om jeres forretning og hvad AI kan gøre for jer."
              : "Let's have a conversation about your business and what AI can do for you."}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              href={`/${locale}/contact`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#1A1814",
                color: "#fff",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "0.88rem",
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: "100px",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {da ? "Start samtalen" : "Start the conversation"}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}
