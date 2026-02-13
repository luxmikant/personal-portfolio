"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { DomainId, DOMAINS, getNextDomain } from "@/utils/domainConfig";
import { staggerContainer, fadeInUp } from "@/utils/animationConfig";
import AvatarWrapper from "@/components/Avatar3D/AvatarWrapper";
import Link from "next/link";

interface DomainHeroProps {
  domain: DomainId;
}

export default function DomainHero({ domain }: DomainHeroProps) {
  const config = DOMAINS[domain];
  const nextDomain = getNextDomain(domain);
  const isLanding = domain === "landing";
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const avatarY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -90]
  );

  return (
    <section
      ref={sectionRef}
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

      <div
        className={`relative z-10 w-full max-w-6xl mx-auto ${
          isLanding
            ? "text-center"
            : "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        }`}
      >
        {/* Text content */}
        <motion.div
          className={isLanding ? "" : "order-1"}
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
            className={`text-lg md:text-xl mb-10 ${
              isLanding ? "max-w-2xl mx-auto" : "max-w-lg"
            }`}
          >
            {config.description}
          </motion.p>

          {/* CTA */}
          {isLanding ? (
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

        {/* 3D Avatar */}
        <motion.div
          className={`flex justify-center ${isLanding ? "mt-8" : "order-2"}`}
          style={{ y: avatarY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <AvatarWrapper
            domain={domain}
            size={isLanding ? "lg" : "md"}
            interactive
          />
        </motion.div>
      </div>
    </section>
  );
}
