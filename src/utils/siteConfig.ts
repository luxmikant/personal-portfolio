const fallbackSiteUrl = "https://luxmikant.dev";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || fallbackSiteUrl;

export const SITE_NAME = "Luxmikant Portfolio";
export const SITE_TITLE = "Luxmikant | Backend · Cloud · AI · Web3";
export const SITE_DESCRIPTION =
  "Interactive portfolio showcasing backend engineering, cloud-native systems, AI tools, and Web3 expertise.";

export const SITE_PATHS = ["/", "/backend", "/cloud", "/ai", "/web3"] as const;
