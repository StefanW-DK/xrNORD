import type { Metadata } from "next";

type Props = { children: React.ReactNode };

// Private sales landing page — must NOT be indexed by search engines.
// Layered protection: noindex meta + excluded from sitemap.ts.
export const metadata: Metadata = {
  title: "Financial Auditing × AI | xrNORD",
  description:
    "A private briefing for Danish auditing firms on how AI will transform the profession — and how to capture the value first.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: { canonical: undefined },
};

export default function Layout({ children }: Props) {
  return children;
}
