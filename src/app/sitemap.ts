import type { MetadataRoute } from "next";
import { SITE_PATHS, SITE_URL } from "@/utils/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return SITE_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
