"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { DomainId, DOMAINS } from "@/utils/domainConfig";

export function usePageTransition() {
  const router = useRouter();

  const navigateToDomain = useCallback(
    (domainId: DomainId) => {
      const domain = DOMAINS[domainId];
      if (!domain) return;
      router.push(domain.route);
    },
    [router]
  );

  return { navigateToDomain };
}
