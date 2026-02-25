"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DOMAINS, DOMAIN_ORDER, DomainId } from "@/utils/domainConfig";

const NAV_SECTIONS: { id: DomainId; label: string; anchor: string }[] = [
  { id: "backend", label: "Backend", anchor: "#backend" },
  { id: "cloud", label: "Cloud", anchor: "#cloud" },
  { id: "ai", label: "AI", anchor: "#ai" },
  { id: "web3", label: "Web3", anchor: "#web3" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<DomainId>("landing");
  const { scrollYProgress } = useScroll();

  // Scroll progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as DomainId;
            if (DOMAIN_ORDER.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    // Observe all domain sections
    const sectionIds = ["hero", "backend", "cloud", "ai", "web3"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((anchor: string) => {
    const id = anchor.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Home — scrolls to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              <span className="gradient-text">LM</span>
            </button>

            {/* Section links */}
            <div className="flex items-center gap-1 sm:gap-2">
              {NAV_SECTIONS.map(({ id, label, anchor }) => {
                const domain = DOMAINS[id];
                const isActive = activeSection === id;

                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(anchor)}
                    className="relative px-3 py-2 text-xs sm:text-sm font-medium transition-colors rounded-lg"
                    style={{
                      color: isActive ? domain.colors.primary : "var(--muted)",
                    }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: `${domain.colors.primary}10`,
                          border: `1px solid ${domain.colors.primary}25`,
                        }}
                        layoutId="activeNav"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ width: progressWidth }}
      />
    </>
  );
}
