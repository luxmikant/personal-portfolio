"use client";

import { motion } from "framer-motion";
import { DomainId, DOMAINS, DOMAIN_ORDER } from "@/utils/domainConfig";
import { fadeInUp } from "@/utils/animationConfig";
import Link from "next/link";

interface DomainNavigatorProps {
  currentDomain: DomainId;
}

export default function DomainNavigator({
  currentDomain,
}: DomainNavigatorProps) {
  const currentIndex = DOMAIN_ORDER.indexOf(currentDomain);
  const prevDomain =
    currentIndex > 1 ? DOMAIN_ORDER[currentIndex - 1] : null;
  const nextDomain =
    currentIndex < DOMAIN_ORDER.length - 1
      ? DOMAIN_ORDER[currentIndex + 1]
      : null;

  return (
    <motion.section
      className="py-16 px-6 border-t"
      style={{ borderColor: "var(--border)" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Previous */}
        {prevDomain ? (
          <Link
            href={DOMAINS[prevDomain].route}
            className="link-underline group flex flex-col items-start gap-1 transition-opacity hover:opacity-80"
          >
            <span className="text-xs text-muted">← Previous</span>
            <span
              className="text-sm font-medium"
              style={{ color: DOMAINS[prevDomain].colors.primary }}
            >
              {DOMAINS[prevDomain].title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {/* Domain dots */}
        <div className="flex items-center gap-2">
          {DOMAIN_ORDER.filter((id) => id !== "landing").map((id) => (
            <Link key={id} href={DOMAINS[id].route}>
              <motion.div
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  background:
                    id === currentDomain
                      ? DOMAINS[id].colors.primary
                      : "var(--border)",
                  boxShadow:
                    id === currentDomain
                      ? `0 0 10px ${DOMAINS[id].colors.glow}`
                      : "none",
                }}
                whileHover={{ scale: 1.5 }}
              />
            </Link>
          ))}
        </div>

        {/* Next */}
        {nextDomain ? (
          <Link
            href={DOMAINS[nextDomain].route}
            className="link-underline group flex flex-col items-end gap-1 transition-opacity hover:opacity-80"
          >
            <span className="text-xs text-muted">Next →</span>
            <span
              className="text-sm font-medium"
              style={{ color: DOMAINS[nextDomain].colors.primary }}
            >
              {DOMAINS[nextDomain].title}
            </span>
          </Link>
        ) : (
          <Link
            href="/"
            className="link-underline group flex flex-col items-end gap-1 transition-opacity hover:opacity-80"
          >
            <span className="text-xs text-muted">Back to →</span>
            <span className="text-sm font-medium gradient-text">Home</span>
          </Link>
        )}
      </div>
    </motion.section>
  );
}
