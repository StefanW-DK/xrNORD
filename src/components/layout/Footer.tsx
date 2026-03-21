"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ── Social icons ──────────────────────────────────────── */
const LinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YouTube = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0A0F1E"/>
  </svg>
);

/* ── Newsletter form ───────────────────────────────────── */
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "16px 24px", borderRadius: "14px",
          background: "rgba(16,185,129,0.08)",
          border: "1px solid rgba(16,185,129,0.2)",
        }}
      >
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "0.9rem", color: "rgba(16,185,129,0.9)",
        }}>
          You&apos;re on the list. We&apos;ll be in touch.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", maxWidth: "480px" }}>
      <div style={{
        flex: 1, position: "relative",
        borderRadius: "12px", overflow: "hidden",
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${focused ? "rgba(6,182,212,0.35)" : "rgba(255,255,255,0.08)"}`,
        transition: "border-color 0.3s ease",
        boxShadow: focused ? "0 0 0 3px rgba(6,182,212,0.06)" : "none",
      }}>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required
          style={{
            width: "100%", padding: "13px 16px",
            background: "transparent", border: "none", outline: "none",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.88rem", color: "#F1F5F9",
            caretColor: "#06B6D4",
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "13px 22px", borderRadius: "12px", border: "none",
          background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
          color: "#fff", cursor: "pointer", flexShrink: 0,
          fontFamily: "var(--font-geist), system-ui, sans-serif",
          fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.01em",
          boxShadow: "0 4px 16px rgba(6,182,212,0.25)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        Subscribe
      </button>
    </form>
  );
}

/* ── Footer ────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer style={{
      background: "#060B14",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px", pointerEvents: "none",
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "60%", height: "300px",
        background: "radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Newsletter band ─────────────────────────── */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        padding: "64px 0",
        position: "relative",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto", padding: "0 80px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "48px", flexWrap: "wrap" as const,
        }}>
          <div style={{ maxWidth: "460px" }}>
            <p style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em",
              textTransform: "uppercase" as const, color: "#06B6D4",
              marginBottom: "16px",
            }}>Stay Updated</p>
            <h3 style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700,
              letterSpacing: "-0.025em", lineHeight: 1.2,
              color: "#F1F5F9", marginBottom: "8px",
            }}>
              Be the First to Receive the Latest Articles & AI Interviews
            </h3>
          </div>
          <div style={{ flex: 1, minWidth: "280px", maxWidth: "480px" }}>
            <NewsletterForm />
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.75rem", color: "rgba(148,163,184,0.4)",
              marginTop: "10px",
            }}>
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main footer columns ─────────────────────── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 80px 48px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
          gap: "48px",
          marginBottom: "56px",
        }}>

          {/* Col 1: Brand */}
          <div>
            <Link href="/en" style={{ textDecoration: "none", display: "inline-block", marginBottom: "20px" }}>
              <span style={{
                fontFamily: "var(--font-geist), system-ui, sans-serif",
                fontSize: "1.4rem", fontWeight: 800,
                letterSpacing: "-0.04em", color: "#F1F5F9",
              }}>
                xr<span style={{ fontWeight: 900 }}>NORD</span>
              </span>
            </Link>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.84rem", lineHeight: 1.7,
              color: "rgba(148,163,184,0.55)",
              maxWidth: "280px",
            }}>
              We help businesses integrate AI to drive real results — from pinpointing AI opportunities to delivering tailored solutions that unlock hidden efficiencies and accelerate growth.
            </p>
          </div>

          {/* Col 2: Contact */}
          <div>
            <p style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.2em",
              textTransform: "uppercase" as const, color: "rgba(148,163,184,0.5)",
              marginBottom: "20px",
            }}>Contact</p>
            <div style={{
              display: "flex", flexDirection: "column" as const, gap: "10px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.84rem", lineHeight: 1.5,
              color: "rgba(148,163,184,0.7)",
            }}>
              <span>Hægvej 11</span>
              <span>8250 Egå, Denmark</span>
              <a href="mailto:info@xrNORD.com" style={{
                color: "#06B6D4", textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                info@xrNORD.com
              </a>
              <a href="tel:+4523654283" style={{
                color: "rgba(148,163,184,0.7)", textDecoration: "none",
              }}>
                +45 23654283
              </a>
            </div>
          </div>

          {/* Col 3: Legal */}
          <div>
            <p style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.2em",
              textTransform: "uppercase" as const, color: "rgba(148,163,184,0.5)",
              marginBottom: "20px",
            }}>Legal</p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
              {["Privacy Policy", "Cookie Policy", "Terms of Use"].map(item => (
                <Link key={item} href="#" style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.84rem", color: "rgba(148,163,184,0.7)",
                  textDecoration: "none", transition: "color 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F1F5F9")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(148,163,184,0.7)")}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Social */}
          <div>
            <p style={{
              fontFamily: "var(--font-geist), system-ui, sans-serif",
              fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.2em",
              textTransform: "uppercase" as const, color: "rgba(148,163,184,0.5)",
              marginBottom: "20px",
            }}>Social</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { href: "https://linkedin.com", icon: <LinkedIn />, label: "LinkedIn", color: "0,119,181" },
                { href: "https://x.com", icon: <XIcon />, label: "X", color: "255,255,255" },
                { href: "https://youtube.com", icon: <YouTube />, label: "YouTube", color: "255,0,0" },
              ].map(({ href, icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "40px", height: "40px", borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(148,163,184,0.65)",
                    transition: "all 0.25s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `rgba(${color},0.12)`;
                    e.currentTarget.style.borderColor = `rgba(${color},0.25)`;
                    e.currentTarget.style.color = "#F1F5F9";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "rgba(148,163,184,0.65)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────── */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          paddingTop: "24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "16px", flexWrap: "wrap" as const,
        }}>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.78rem", color: "rgba(148,163,184,0.35)",
          }}>
            © 2025 xrNORD · CVR: 43396323
          </p>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "0.78rem", color: "rgba(148,163,184,0.25)",
          }}>
            Scandinavian AI Strategy & Development
          </p>
        </div>
      </div>
    </footer>
  );
}
