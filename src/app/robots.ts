import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://reuben.inc";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/operator/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
