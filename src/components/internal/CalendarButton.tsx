"use client";

import { useState, useEffect, useRef } from "react";

const GOOGLE_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Sk%C3%A6ring+Tri+%26+Hygge" +
  "&dates=20260815T060000Z%2F20260815T200000Z" +
  "&details=Triatlondag+med+familie+og+venner.+Sv%C3%B8mning+800m+%C2%B7+Cykling+30km+p%C3%A5+Djursland+%C2%B7+L%C3%B8b+5km.+Efterf%C3%B8lgende+hygge%2C+grill+og+Kal%C3%B8vig+Havnefest." +
  "&location=Sk%C3%A6ring%2C+Aarhus%2C+Danmark";

export default function CalendarButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", marginTop: "36px" }}>
      {/* Main button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 28px",
          background: "linear-gradient(120deg, rgba(0,212,255,0.12) 0%, rgba(123,95,255,0.12) 100%)",
          border: "1px solid rgba(0,212,255,0.28)",
          borderRadius: "100px",
          color: "rgba(255,255,255,0.90)",
          fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
          fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(120deg, rgba(0,212,255,0.20) 0%, rgba(123,95,255,0.20) 100%)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,212,255,0.50)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(0,212,255,0.12)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(120deg, rgba(0,212,255,0.12) 0%, rgba(123,95,255,0.12) 100%)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,212,255,0.28)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        }}
      >
        {/* Calendar icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Tilføj til Kalender
        {/* Chevron */}
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          left: 0,
          background: "rgba(18,22,38,0.95)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "16px",
          backdropFilter: "blur(16px)",
          padding: "8px",
          minWidth: "220px",
          boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
          zIndex: 50,
        }}>
          {/* Google Calendar */}
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "10px",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.18s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {/* Google icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google Kalender
          </a>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "4px 8px" }} />

          {/* Apple / Outlook ICS */}
          <a
            href="/assets/internal/skaring-tri-2026.ics"
            download="Skæring-Tri-Hygge-2026.ics"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "10px",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "var(--font-geist), 'Geist', system-ui, sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.18s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {/* Apple-style calendar icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Apple / Outlook (.ics)
          </a>
        </div>
      )}
    </div>
  );
}
