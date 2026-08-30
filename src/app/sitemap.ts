import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blogs";
import { SITE_PATHS, SITE_URL } from "@/utils/siteConfig";

export const revalidate = 0;
export const output = "export";

const blogPaths = ["/blog", ...blogPosts.map((post) => `/blog/${post.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [...SITE_PATHS, ...blogPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
}
