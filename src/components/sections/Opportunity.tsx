"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback, useRef } from "react";

/* ── State definitions ─────────────────────────────────── */
const STATES = [
  {
    // "Increase productivity" — Integration + Challenge emphasis
    emphasis: [0, 3],
    centerScale: 1.0,
    centerGlow: "rgba(59,130,246,0.18)",
    ambientHue: "rgba(8,145,178,0.06)",
  },
  {
    // "Build better products" — Solutions emphasis
    emphasis: [2],
    centerScale: 1.0,
    centerGlow: "rgba(13,148,136,0.22)",
    ambientHue: "rgba(13,148,136,0.06)",
  },
  {
    // "Strengthen your position" — Roadmap + center emphasis
    emphasis: [1],
    centerScale: 1.05,
    centerGlow: "rgba(124,58,237,0.25)",
    ambientHue: "rgba(124,58,237,0.05)",
  },
];

const CYCLE_MS = 4500;

/* ── Subtle drift hook ─────────────────────────────────── */
function useDrift(seed: number) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      frame.current += 0.003;
      setOffset({
        x: Math.sin(frame.current + seed) * 5,
        y: Math.cos(frame.current * 0.7 + seed * 2) * 4,
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [seed]);

  return offset;
}

/* ── Living Orbit ──────────────────────────────────────── */
function LivingOrbit({
  t,
  activeState,
}: {
  t: (key: string) => string;
  activeState: number;
}) {
  const size = 720;
  const cx = size / 2;
  const cy = size / 2;
  const orbitR = 248;
  const nodeR = 66;
  const centerR = 96;

  // Slightly irregular angles — break perfect symmetry
  const nodes = [
    { label: t("diagramChallenge"),   angle: 222, color: "#3B82F6", rgb: "59,130,246",   seed: 0 },
    { label: t("diagramRoadmap"),     angle: 318, color: "#7C3AED", rgb: "124,58,237",   seed: 1.5 },
    { label: t("diagramSolutions"),   angle: 48,  color: "#10B981", rgb: "16,185,129",   seed: 3 },
    { label: t("diagramIntegration"), angle: 138, color: "#0891B2", rgb: "8,145,178",    seed: 4.5 },
  ];

  const state = STATES[activeState];

  return (
    <div className="relative" style={{ width: size, height: size }}>

      {/* Ambient field — shifts with state */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ background: `radial-gradient(circle at 50% 50%, ${state.ambientHue} 0%, transparent 65%)` }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ inset: -100, borderRadius: "50%", filter: "blur(70px)" }}
      />

      {/* SVG layer — energy paths + particles */}
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${size} ${size}`}
        style={{ width: size, height: size }}
      >
        <defs>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="orbRing">
            <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Orbit rings — very subtle */}
        <circle cx={cx} cy={cy} r={orbitR - 15} fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={orbitR + 15} fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />

        {/* Energy arcs between nodes — soft, not dashed */}
        {nodes.map((node, i) => {
          const next = nodes[(i + 1) % 4];
          const a1 = ((node.angle - 90) * Math.PI) / 180;
          const a2 = ((next.angle - 90) * Math.PI) / 180;
          const arcR = orbitR;
          const gap = 0.38;
          const sA = a1 + gap;
          const eA = i < 3 ? a2 - gap : a2 + Math.PI * 2 - gap;
          const x1 = cx + arcR * Math.cos(sA);
          const y1 = cy + arcR * Math.sin(sA);
          const x2 = cx + arcR * Math.cos(eA);
          const y2 = cy + arcR * Math.sin(eA);

          const emphasized = state.emphasis.includes(i) || state.emphasis.includes((i + 1) % 4);

          return (
            <motion.path
              key={`arc-${i}`}
              d={`M${x1},${y1} A${arcR},${arcR} 0 0,1 ${x2},${y2}`}
              fill="none"
              animate={{
                stroke: emphasized ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.03)",
                strokeWidth: emphasized ? 1.2 : 0.8,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          );
        })}

        {/* Flowing particles along paths to emphasized nodes */}
        {state.emphasis.map((idx) => {
          const node = nodes[idx];
          const rad = ((node.angle - 90) * Math.PI) / 180;
          return (
            <motion.circle
              key={`flow-${idx}-${activeState}`}
              r={2.5}
              fill={node.color}
              filter="url(#softGlow)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.7, 0],
                cx: [cx + orbitR * 0.15 * Math.cos(rad), cx + orbitR * 0.6 * Math.cos(rad), cx + orbitR * 0.9 * Math.cos(rad)],
                cy: [cy + orbitR * 0.15 * Math.sin(rad), cy + orbitR * 0.6 * Math.sin(rad), cy + orbitR * 0.9 * Math.sin(rad)],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.6 }}
            />
          );
        })}
      </svg>

      {/* Center node — "Company Data" */}
      <CenterNode cx={cx} cy={cy} r={centerR} state={state} label={t("diagramCenter")} />

      {/* Outer nodes with drift */}
      {nodes.map((node, i) => (
        <OrbitNode
          key={node.label}
          node={node}
          i={i}
          cx={cx}
          cy={cy}
          orbitR={orbitR}
          nodeR={nodeR}
          isEmphasized={state.emphasis.includes(i)}
        />
      ))}
    </div>
  );
}

/* ── Center node ───────────────────────────────────────── */
function CenterNode({
  cx, cy, r, state, label,
}: {
  cx: number; cy: number; r: number;
  state: typeof STATES[number]; label: string;
}) {
  const drift = useDrift(10);

  return (
    <motion.div
      className="absolute rounded-full flex items-center justify-center text-center"
      animate={{
        scale: [state.centerScale, state.centerScale * 1.03, state.centerScale],
        boxShadow: [
          `0 0 70px ${state.centerGlow}, 0 0 140px ${state.centerGlow}`,
          `0 0 90px ${state.centerGlow}, 0 0 160px ${state.centerGlow}`,
          `0 0 70px ${state.centerGlow}, 0 0 140px ${state.centerGlow}`,
        ],
        x: drift.x * 0.5,
        y: drift.y * 0.5,
      }}
      transition={{
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 2, ease: "easeInOut" },
        y: { duration: 2, ease: "easeInOut" },
      }}
      style={{
        width: r * 2,
        height: r * 2,
        top: cy - r,
        left: cx - r,
        background: "radial-gradient(circle, rgba(20,35,65,0.95) 0%, rgba(10,18,35,0.98) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist), system-ui, sans-serif",
          fontSize: "1.2rem",
          fontWeight: 600,
          color: "#CBD5E1",
          lineHeight: 1.3,
          whiteSpace: "pre-line",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ── Orbit node with natural drift ─────────────────────── */
function OrbitNode({
  node, i, cx, cy, orbitR, nodeR, isEmphasized,
}: {
  node: { label: string; angle: number; color: string; rgb: string; seed: number };
  i: number; cx: number; cy: number; orbitR: number; nodeR: number;
  isEmphasized: boolean;
}) {
  const drift = useDrift(node.seed);
  const rad = ((node.angle - 90) * Math.PI) / 180;
  const baseX = cx + orbitR * Math.cos(rad) - nodeR;
  const baseY = cy + orbitR * Math.sin(rad) - nodeR;

  return (
    <motion.div
      className="absolute rounded-full flex items-center justify-center text-center"
      animate={{
        x: drift.x,
        y: drift.y,
        scale: isEmphasized ? 1.12 : 0.92,
        opacity: isEmphasized ? 1 : 0.5,
        boxShadow: isEmphasized
          ? `0 0 40px rgba(${node.rgb},0.35), 0 0 80px rgba(${node.rgb},0.12)`
          : `0 0 15px rgba(${node.rgb},0.06)`,
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        width: nodeR * 2,
        height: nodeR * 2,
        left: baseX,
        top: baseY,
        background: isEmphasized
          ? `radial-gradient(circle, rgba(${node.rgb},0.18) 0%, rgba(${node.rgb},0.06) 100%)`
          : `radial-gradient(circle, rgba(${node.rgb},0.08) 0%, rgba(${node.rgb},0.02) 100%)`,
        border: `1px solid rgba(${node.rgb},${isEmphasized ? 0.35 : 0.15})`,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist), system-ui, sans-serif",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: node.color,
          letterSpacing: "0.01em",
          opacity: isEmphasized ? 1 : 0.7,
        }}
      >
        {node.label}
      </span>
    </motion.div>
  );
}

/* ── Main Section ───────────────────────────────────────── */
export default function Opportunity() {
  const t = useTranslations("opportunity");
  const [activeState, setActiveState] = useState(0);

  const cycleState = useCallback(() => {
    setActiveState((prev) => (prev + 1) % 3);
  }, []);

  useEffect(() => {
    const interval = setInterval(cycleState, CYCLE_MS);
    return () => clearInterval(interval);
  }, [cycleState]);

  const statements = [t("statementOne"), t("statementTwo"), t("statementThree")];

  // Statement accent colors per state
  const statementColors = ["#60A5FA", "#34D399", "#A78BFA"];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(165deg, #060a14 0%, #0b1424 35%, #091020 70%, #060c18 100%)",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        padding: "100px 0",
      }}
    >
      {/* Ambient background layers */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 65% 45%, rgba(59,130,246,0.04) 0%, transparent 55%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 25% 60%, rgba(124,58,237,0.025) 0%, transparent 50%)",
      }} />
      {/* Subtle grain texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      <div className="opportunity-grid relative z-10">

        {/* ── LEFT: Text — intentionally higher */}
        <div style={{ maxWidth: "580px", marginTop: "-60px" }}>

          {/* Micro label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase" as const,
              color: "#3B82F6",
              marginBottom: "44px",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            }}
          >
            {t("label")}
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08 }}
            style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(2.6rem, 5vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#F1F5F9",
              marginBottom: "28px",
            }}
          >
            {t("headlinePre")}
            <br />
            <span style={{
              backgroundImage: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {t("headlineHighlight")}
            </span>
          </motion.h2>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.14 }}
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.15rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.45)",
              marginBottom: "56px",
              maxWidth: "480px",
            }}
          >
            {t("topText")}
          </motion.p>

          {/* Intro line — no colon */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.05rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "16px",
              letterSpacing: "0.01em",
            }}
          >
            {t("belowHeadline")}
          </motion.p>

          {/* Dynamic cycling statement — prominent with glow */}
          <div style={{ height: "72px", position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeState}
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.75, ease: [0.22, 0.1, 0.25, 1] }}
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: "#F8FAFC",
                  textShadow: `0 0 40px ${statementColors[activeState]}66, 0 0 80px ${statementColors[activeState]}33`,
                }}
              >
                {statements[activeState]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress indicators */}
          <div className="flex gap-2" style={{ marginTop: "28px" }}>
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setActiveState(i)}
                className="relative overflow-hidden"
                style={{
                  width: 36,
                  height: 2,
                  background: "rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "1px",
                }}
              >
                {activeState === i && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                    style={{
                      background: statementColors[i],
                      borderRadius: "1px",
                      boxShadow: `0 0 8px ${statementColors[i]}66`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA — premium minimal button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginTop: "48px" }}
          >
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.02em",
                textDecoration: "none",
                padding: "12px 28px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                transition: "all 0.35s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(59,130,246,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {t("cta")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-5.25-5.25M19.5 12l-5.25 5.25" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: Living orbit ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.25, ease: "easeOut" }}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            paddingTop: "120px",
            marginRight: "-120px",
            overflow: "visible",
          }}
        >
          <LivingOrbit t={t} activeState={activeState} />
        </motion.div>

      </div>
    </section>
  );
}
