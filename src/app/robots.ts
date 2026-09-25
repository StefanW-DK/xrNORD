import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/SkæringTriByWerge",
          "/Sk%C3%A6ringTriByWerge",
          "/skaring-internal",
        ],
      },
    ],
    sitemap: "https://www.xrnord.com/sitemap.xml",
  };
}
