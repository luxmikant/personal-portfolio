"use client";

import { motion } from "framer-motion";
import { DomainId, DOMAINS, getNextDomain } from "@/utils/domainConfig";
import { staggerContainer, fadeInUp } from "@/utils/animationConfig";
import Link from "next/link";

interface DomainHeroProps {
  domain: DomainId;
}

export default function DomainHero({ domain }: DomainHeroProps) {
  const config = DOMAINS[domain];
  const nextDomain = getNextDomain(domain);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      data-domain={domain}
    >
      {/* Background gradient accent */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${config.colors.glow} 0%, transparent 60%)`,
        }}
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Domain badge */}
        <motion.div variants={fadeInUp} className="mb-6">
          <span
            className="inline-block px-4 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full border"
            style={{
              color: config.colors.primary,
              borderColor: `${config.colors.primary}40`,
              background: `${config.colors.primary}10`,
            }}
          >
            {config.subtitle}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={fadeInUp} className="mb-6">
          <span className="gradient-text">{config.title}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          {config.description}
        </motion.p>

        {/* CTA */}
        {domain === "landing" ? (
          <motion.div variants={fadeInUp}>
            <Link
              href="/backend"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${config.colors.primary}, ${config.colors.secondary})`,
                color: "#fff",
                boxShadow: `0 0 30px ${config.colors.glow}`,
              }}
            >
              Begin Journey
              <span className="text-xl">→</span>
            </Link>
          </motion.div>
        ) : nextDomain ? (
          <motion.div variants={fadeInUp}>
            <Link
              href={DOMAINS[nextDomain].route}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border transition-all duration-300 hover:scale-105"
              style={{
                borderColor: `${config.colors.primary}40`,
                color: config.colors.primary,
                background: `${config.colors.primary}08`,
              }}
            >
              Next: {DOMAINS[nextDomain].title}
              <span>→</span>
            </Link>
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
