"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false });

  useEffect(() => {
    const consent = localStorage.getItem("xrnord_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("xrnord_cookie_consent", JSON.stringify({ all: true }));
    setVisible(false);
  }

  function saveSettings() {
    localStorage.setItem("xrnord_cookie_consent", JSON.stringify(prefs));
    setVisible(false);
  }

  function dismiss() {
    localStorage.setItem("xrnord_cookie_consent", "dismissed");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 80, opacity: 0, x: "-50%" }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            width: "calc(100% - 48px)",
            maxWidth: "900px",
            zIndex: 9999,
            borderRadius: "16px",
            background: "rgba(10,15,30,0.96)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)",
            overflow: "hidden",
          }}
        >
          {/* Top accent line */}
          <div style={{
            height: "2px",
            background: "linear-gradient(90deg, #06B6D4, #8B5CF6, #3B82F6)",
          }} />

          {!showSettings ? (
            /* ── Default banner ────────────────────── */
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              padding: "18px 24px",
              flexWrap: "wrap" as const,
            }}>
              {/* Text */}
              <p style={{
                flex: 1,
                minWidth: "240px",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.84rem",
                lineHeight: 1.6,
                color: "rgba(148,163,184,0.85)",
              }}>
                {t("message")}{" "}
                <Link href="/privacy" style={{ color: "#06B6D4", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  {t("privacyPolicy")}
                </Link>
              </p>

              {/* Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                <button
                  onClick={() => setShowSettings(true)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "rgba(148,163,184,0.8)",
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.color = "#F1F5F9";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(148,163,184,0.8)";
                  }}
                >
                  {t("settings")}
                </button>

                <button
                  onClick={accept}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "8px",
                    border: "none",
                    background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
                    color: "#fff",
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(6,182,212,0.25)",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  {t("acceptAll")}
                </button>

                <button
                  onClick={dismiss}
                  aria-label="Dismiss"
                  style={{
                    width: "32px", height: "32px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "transparent",
                    color: "rgba(148,163,184,0.5)",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", lineHeight: 1,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#F1F5F9";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(148,163,184,0.5)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            /* ── Settings panel ────────────────────── */
            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <h3 style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "0.95rem", fontWeight: 700,
                  color: "#F1F5F9", letterSpacing: "-0.01em",
                }}>
                  {t("preferencesTitle")}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  style={{
                    background: "transparent", border: "none",
                    color: "rgba(148,163,184,0.5)", cursor: "pointer",
                    fontSize: "18px", lineHeight: 1, padding: "4px",
                  }}
                >✕</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column" as const, gap: "14px", marginBottom: "20px" }}>
                {/* Necessary — always on */}
                <ToggleRow
                  label={t("necessary")}
                  desc={t("necessaryDesc")}
                  checked={true}
                  disabled
                  onChange={() => {}}
                />
                <ToggleRow
                  label={t("analytics")}
                  desc={t("analyticsDesc")}
                  checked={prefs.analytics}
                  onChange={v => setPrefs(p => ({ ...p, analytics: v }))}
                />
                <ToggleRow
                  label={t("marketing")}
                  desc={t("marketingDesc")}
                  checked={prefs.marketing}
                  onChange={v => setPrefs(p => ({ ...p, marketing: v }))}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  onClick={saveSettings}
                  style={{
                    padding: "9px 20px", borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "rgba(148,163,184,0.8)",
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "0.82rem", fontWeight: 500, cursor: "pointer",
                  }}
                >
                  {t("savePreferences")}
                </button>
                <button
                  onClick={accept}
                  style={{
                    padding: "9px 20px", borderRadius: "8px", border: "none",
                    background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
                    color: "#fff",
                    fontFamily: "var(--font-geist), system-ui, sans-serif",
                    fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
                  }}
                >
                  {t("acceptAll")}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Toggle row ────────────────────────────────────────── */
function ToggleRow({
  label, desc, checked, disabled, onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", justifyContent: "space-between",
      gap: "16px", padding: "12px 14px", borderRadius: "10px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div>
        <p style={{
          fontFamily: "var(--font-geist), system-ui, sans-serif",
          fontSize: "0.85rem", fontWeight: 600, color: "#F1F5F9", marginBottom: "2px",
        }}>{label}</p>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "0.78rem", color: "rgba(148,163,184,0.6)", lineHeight: 1.5,
        }}>{desc}</p>
      </div>
      <button
        onClick={() => !disabled && onChange(!checked)}
        style={{
          flexShrink: 0,
          width: "40px", height: "22px", borderRadius: "11px",
          border: "none", cursor: disabled ? "not-allowed" : "pointer",
          background: checked
            ? "linear-gradient(135deg, #06B6D4, #3B82F6)"
            : "rgba(255,255,255,0.08)",
          position: "relative",
          transition: "background 0.3s ease",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <span style={{
          position: "absolute",
          top: "3px",
          left: checked ? "21px" : "3px",
          width: "16px", height: "16px",
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.3s ease",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }} />
      </button>
    </div>
  );
}
