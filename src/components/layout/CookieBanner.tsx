"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "xrnord_cookie_consent";
const OPEN_SETTINGS_EVENT = "xrnord:open-cookie-settings";

type ConsentPrefs = { analytics: boolean; marketing: boolean };
const DENIED: ConsentPrefs = { analytics: false, marketing: false };

/**
 * Read the stored consent choice. Returns null when nothing valid is stored.
 * Formats: { all: true } (Accept all), { analytics, marketing } (saved settings),
 * "dismissed" (banner closed without a choice, treated as denied).
 */
function readStoredConsent(): ConsentPrefs | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (raw === null) return null;
    if (raw === "dismissed") return DENIED;
    const p = JSON.parse(raw);
    if (p && p.all === true) return { analytics: true, marketing: true };
    if (p && typeof p.analytics === "boolean" && typeof p.marketing === "boolean") {
      return { analytics: p.analytics, marketing: p.marketing };
    }
  } catch {}
  return null;
}

// Latest choice made during this page load. It survives client-side navigation and
// remounts, and takes precedence over localStorage, so a stale stored value can never
// be restored in the same page load if saving the new choice failed.
let sessionConsent: ConsentPrefs | null = null;

type SaveError = "removed" | "failed";
// Last storage failure this page load, shown again when the panel is reopened
let sessionSaveError: SaveError | null = null;

function currentConsent(): ConsentPrefs | null {
  return sessionConsent ?? readStoredConsent();
}

type SaveResult = "saved" | "removed" | "failed";

/**
 * Store the choice. If it cannot be written, try to remove only the old consent value,
 * so an outdated choice is not restored on the next page load. No other data is touched.
 */
function persistConsent(value: string): SaveResult {
  try {
    localStorage.setItem(CONSENT_KEY, value);
    return "saved";
  } catch {}
  try {
    localStorage.removeItem(CONSENT_KEY);
    if (localStorage.getItem(CONSENT_KEY) === null) return "removed";
  } catch {}
  return "failed";
}

/** Reopen the cookie settings panel from anywhere (e.g. the footer). */
export function openCookieSettings(opener?: HTMLElement) {
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT, { detail: { opener } }));
}

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>(DENIED);
  // True when a choice exists (stored or made this page load); closing must then leave it untouched
  const [hasChoice, setHasChoice] = useState(false);
  const [saveError, setSaveError] = useState<SaveError | null>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const focusSettingsButton = useRef(false);

  useEffect(() => {
    if (!currentConsent()) setVisible(true);

    function handleOpen(e: Event) {
      const opener = (e as CustomEvent<{ opener?: HTMLElement }>).detail?.opener;
      openerRef.current = opener ?? (document.activeElement as HTMLElement | null);
      const current = currentConsent();
      setPrefs(current ?? DENIED);
      setHasChoice(current !== null);
      setSaveError(sessionSaveError);
      setShowSettings(true);
      setVisible(true);
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpen);
  }, []);

  // Move keyboard focus into the settings panel when it opens
  useEffect(() => {
    if (visible && showSettings) settingsRef.current?.focus();
  }, [visible, showSettings]);

  // Returning from the settings panel to the first-visit banner: focus its Settings button
  useEffect(() => {
    if (!showSettings && focusSettingsButton.current) {
      focusSettingsButton.current = false;
      settingsButtonRef.current?.focus();
    }
  }, [showSettings]);

  // After the close animation, return focus to the element that opened the panel
  function handleExitComplete() {
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener && opener.isConnected) opener.focus();
  }

  function updateGtagConsent(analytics: boolean, marketing: boolean) {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: analytics ? "granted" : "denied",
        ad_storage: marketing ? "granted" : "denied",
        ad_user_data: marketing ? "granted" : "denied",
        ad_personalization: marketing ? "granted" : "denied",
      });
    }
  }

  // Apply the choice immediately, then try to store it. On a storage failure the
  // choice still applies for this page load and the panel stays open with an error.
  function applyChoice(next: ConsentPrefs, storedValue: string) {
    sessionConsent = next;
    updateGtagConsent(next.analytics, next.marketing);
    setPrefs(next);
    setHasChoice(true);
    const result = persistConsent(storedValue);
    sessionSaveError = result === "saved" ? null : result;
    setSaveError(sessionSaveError);
    if (result === "saved") setVisible(false);
  }

  function accept() {
    applyChoice({ analytics: true, marketing: true }, JSON.stringify({ all: true }));
  }

  function saveSettings() {
    applyChoice(prefs, JSON.stringify(prefs));
  }

  function dismiss() {
    // Only a first-time close records "dismissed" (consent stays denied, no gtag update needed).
    // An existing choice is never overwritten by closing. A failed write is harmless here:
    // nothing valid was stored, so the next page load starts denied and asks again.
    if (!hasChoice) {
      sessionConsent = DENIED;
      persistConsent("dismissed");
    }
    setHasChoice(true);
    setSaveError(null);
    setVisible(false);
  }

  function closeSettings() {
    if (hasChoice) {
      // Close without saving, discard unsaved toggles
      setPrefs(currentConsent() ?? DENIED);
      setSaveError(null);
      setVisible(false);
    } else {
      focusSettingsButton.current = true;
      setShowSettings(false);
    }
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
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

          {saveError && (
            <p
              role="alert"
              style={{
                margin: "16px 24px 0",
                padding: "10px 14px",
                borderRadius: "8px",
                background: "rgba(248,113,113,0.1)",
                border: "1px solid rgba(248,113,113,0.35)",
                color: "#FCA5A5",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.8rem",
                lineHeight: 1.5,
              }}
            >
              {t(saveError === "removed" ? "saveErrorRemoved" : "saveErrorFailed")}
            </p>
          )}

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
                <Link href={`/${locale}/cookie-policy`} style={{ color: "#06B6D4", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  {t("privacyPolicy")}
                </Link>
              </p>

              {/* Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                <button
                  ref={settingsButtonRef}
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
            <div
              ref={settingsRef}
              tabIndex={-1}
              role="dialog"
              aria-labelledby="cookie-settings-title"
              onKeyDown={e => {
                // Escape behaves exactly like the close button: nothing is saved
                if (e.key === "Escape") {
                  e.stopPropagation();
                  closeSettings();
                }
              }}
              style={{ padding: "24px", outline: "none" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <h3 id="cookie-settings-title" style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: "0.95rem", fontWeight: 700,
                  color: "#F1F5F9", letterSpacing: "-0.01em",
                }}>
                  {t("preferencesTitle")}
                </h3>
                <button
                  onClick={closeSettings}
                  aria-label={t("close")}
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
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        aria-disabled={disabled || undefined}
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
