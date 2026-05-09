const fallbackSiteUrl = "https://luxmikant.dev";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || fallbackSiteUrl;

export const SITE_NAME = "Luxmikant Portfolio";
export const SITE_TITLE = "Luxmikant | Computer Science Graduate · Backend + Cloud + AI Engineer";
export const SITE_DESCRIPTION =
  "Interactive portfolio showcasing backend architectures, AI integration, and cloud-native solutions.";

export const SITE_PATHS = ["/"] as const;
