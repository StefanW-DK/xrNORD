import type { Metadata } from "next";
import { legalPageMetadata, LegalPageSchema } from "@/components/seo/LegalPage";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return legalPageMetadata(locale, "privacy-policy");
}

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  return (
    <>
      <LegalPageSchema locale={locale} legalKey="privacy-policy" />
      {children}
    </>
  );
}
