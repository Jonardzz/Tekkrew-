import type { MetadataRoute } from "next";

// Served at https://tekkrew.com/robots.txt: lets every crawler in and points Google at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: "https://tekkrew.com/sitemap.xml",
    host: "https://tekkrew.com",
  };
}
