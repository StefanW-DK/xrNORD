import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/en/book-workshop", "/da/book-workshop"],
      },
    ],
    sitemap: "https://xrnord.com/sitemap.xml",
  };
}
