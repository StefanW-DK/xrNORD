"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    label: "Why AI",
    href: "/why-ai",
    dropdown: ["Interviews", "Articles", "Reinvent"],
  },
  { label: "Workshop", href: "/workshop" },
  { label: "AI Roadmap", href: "/ai-roadmap" },
  { label: "AI Use Cases", href: "/ai-use-cases" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
          boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.04)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src={
                  scrolled
                    ? "/images/logo-dark.png"
                    : "/images/logo-white.png"
                }
                alt="xrNORD"
                width={130}
                height={28}
                priority
                className="h-7 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.dropdown ? setActiveDropdown(item.label) : null
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                    style={{
                      color: scrolled
                        ? "rgba(55,65,81,1)"
                        : "rgba(255,255,255,0.85)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = scrolled
                        ? "rgba(17,24,39,1)"
                        : "rgba(255,255,255,1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = scrolled
                        ? "rgba(55,65,81,1)"
                        : "rgba(255,255,255,0.85)";
                    }}
                  >
                    {item.label}
                    {item.dropdown && (
                      <svg
                        className="w-3 h-3 opacity-60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl py-1.5 overflow-hidden"
                        style={{
                          boxShadow:
                            "0 10px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)",
                        }}
                      >
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub}
                            href={`${item.href}/${sub.toLowerCase()}`}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-5">
              <button
                className="text-sm font-medium transition-colors"
                style={{
                  letterSpacing: "0.04em",
                  color: scrolled
                    ? "rgba(156,163,175,1)"
                    : "rgba(255,255,255,0.55)",
                }}
              >
                EN / DA
              </button>
              <Link
                href="/workshop"
                className="text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: scrolled ? "#111827" : "#ffffff",
                  color: scrolled ? "#ffffff" : "#111827",
                }}
              >
                Book Workshop
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: scrolled ? "#111827" : "#ffffff" }}
            >
              {mobileOpen ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-1 mt-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-lg font-medium text-gray-900"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub}
                          href={`${item.href}/${sub.toLowerCase()}`}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-gray-500"
                          style={{
                            borderBottom: "1px solid rgba(0,0,0,0.03)",
                          }}
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-6 flex flex-col gap-3 pb-8">
                <button className="text-sm text-gray-400 text-left">
                  EN / DA
                </button>
                <Link
                  href="/workshop"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-3.5 bg-gray-900 text-white rounded-full font-medium text-sm"
                >
                  Book Workshop
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
