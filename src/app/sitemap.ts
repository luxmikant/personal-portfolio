import type { MetadataRoute } from "next";
import { SITE_PATHS, SITE_URL } from "@/utils/siteConfig";

export const revalidate = 0;
export const output = "export";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return SITE_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  }));
}
