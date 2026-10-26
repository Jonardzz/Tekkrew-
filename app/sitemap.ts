import type { MetadataRoute } from "next";

// Served at https://tekkrew.com/sitemap.xml. Submit it once in Google Search Console → Sitemaps.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tekkrew.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
