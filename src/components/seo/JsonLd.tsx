import { BASE_URL } from "@/config/metadata";

// Organisation schema — tells Google/Bing who xrNORD is
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "xrNORD",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logos/logo-dark.png`,
  sameAs: [
    "https://www.linkedin.com/company/xrnord/",
    "https://twitter.com/xrNord",
    "https://www.youtube.com/channel/UCv64WHqJ2P7Ck5MmhfZth8Q",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+45-23654283",
    contactType: "customer service",
    email: "info@xrNORD.com",
    areaServed: ["DK", "SE", "NO", "FI"],
    availableLanguage: ["en", "da"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hægvej 11",
    addressLocality: "Egå",
    postalCode: "8250",
    addressCountry: "DK",
  },
};

// WebSite schema — enables Google sitelinks search box
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "xrNORD",
  url: BASE_URL,
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}
