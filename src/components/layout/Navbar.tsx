"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    {
      label: t("whyAi"),
      href: `/${locale}/why-ai`,
      dropdown: [
        { label: t("interviews"), href: `/${locale}/why-ai/interviews` },
        { label: t("articles"), href: `/${locale}/why-ai/articles` },
        { label: t("reinvent"), href: `/${locale}/why-ai/reinvent` },
      ],
    },
    { label: t("workshop"), href: `/${locale}/workshop` },
    { label: t("aiRoadmap"), href: `/${locale}/ai-roadmap` },
    { label: t("aiUseCases"), href: `/${locale}/ai-use-cases` },
    { label: t("about"), href: `/${locale}/about` },
    { label: t("contact"), href: `/${locale}/contact` },
  ];

  const switchLocale = () => {
    const newLocale = locale === "en" ? "da" : "en";
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

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
          <div className="flex items-center justify-between h-24 lg:h-28">
            {/* Logo */}
            <Link href={`/${locale}`} className="shrink-0">
              <Image
                src={
                  scrolled
                    ? "/images/logos/logo-dark.png"
                    : "/images/logos/logo-white.png"
                }
                alt="xrNORD"
                width={140}
                height={30}
                priority
                className="h-9 w-auto"
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
                    className="text-[15px] font-medium transition-colors duration-200 flex items-center gap-1"
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
                            key={sub.label}
                            href={sub.href}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                          >
                            {sub.label}
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
              {/* Language switcher */}
              <button
                onClick={switchLocale}
                className="text-sm font-medium transition-colors cursor-pointer"
                style={{
                  letterSpacing: "0.04em",
                  color: scrolled
                    ? "rgba(156,163,175,1)"
                    : "rgba(255,255,255,0.55)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = scrolled
                    ? "rgba(55,65,81,1)"
                    : "rgba(255,255,255,1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled
                    ? "rgba(156,163,175,1)"
                    : "rgba(255,255,255,0.55)";
                }}
              >
                <span
                  style={{
                    fontWeight: locale === "en" ? 700 : 400,
                    opacity: locale === "en" ? 1 : 0.6,
                  }}
                >
                  EN
                </span>
                <span style={{ opacity: 0.3, margin: "0 4px" }}>/</span>
                <span
                  style={{
                    fontWeight: locale === "da" ? 700 : 400,
                    opacity: locale === "da" ? 1 : 0.6,
                  }}
                >
                  DA
                </span>
              </button>

              <Link
                href={`/${locale}/workshop`}
                className="text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: scrolled ? "#111827" : "#ffffff",
                  color: scrolled ? "#ffffff" : "#111827",
                }}
              >
                {t("bookWorkshop")}
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
            className="fixed inset-0 z-40 bg-white pt-28 px-6 lg:hidden overflow-y-auto"
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
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-gray-500"
                          style={{
                            borderBottom: "1px solid rgba(0,0,0,0.03)",
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-10 flex flex-col gap-8 pb-8">
                <button
                  onClick={() => {
                    switchLocale();
                    setMobileOpen(false);
                  }}
                  className="text-sm text-gray-400 text-left"
                >
                  {locale === "en"
                    ? "Skift til Dansk"
                    : "Switch to English"}
                </button>
                <Link
                  href={`/${locale}/workshop`}
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-3.5 bg-gray-900 text-white rounded-full font-medium text-sm"
                >
                  {t("bookWorkshop")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
