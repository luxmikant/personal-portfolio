"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { DOMAINS, DOMAIN_ORDER, DomainId } from "@/utils/domainConfig";

export default function Navigation() {
  const pathname = usePathname();

  // Determine active domain from route
  const activeDomain: DomainId =
    DOMAIN_ORDER.find((id) => {
      if (id === "landing") return pathname === "/";
      return pathname === DOMAINS[id].route;
    }) ?? "landing";

  // Navigation items (skip landing — it's the home page)
  const navItems = DOMAIN_ORDER.filter((id) => id !== "landing");

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Home link */}
          <Link
            href="/"
            className="link-underline text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="gradient-text">LM</span>
          </Link>

          {/* Domain links */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((id) => {
              const domain = DOMAINS[id];
              const isActive = activeDomain === id;

              return (
                <Link
                  key={id}
                  href={domain.route}
                  className="link-underline relative px-3 py-2 text-xs sm:text-sm font-medium transition-colors rounded-lg"
                  style={{
                    color: isActive
                      ? domain.colors.primary
                      : "var(--muted)",
                  }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `${domain.colors.primary}10`,
                        border: `1px solid ${domain.colors.primary}30`,
                      }}
                      layoutId="activeNav"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{domain.title.split(" ")[0]}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
