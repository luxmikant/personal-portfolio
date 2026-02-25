"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { DOMAINS } from "@/utils/domainConfig";
import { staggerContainer, fadeInUp } from "@/utils/animationConfig";
import AvatarWrapper from "@/components/Avatar3D/AvatarWrapper";
import GlowingGrid from "@/components/GlowingGrid";

export default function HeroSection() {
  const config = DOMAINS.landing;
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -60]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
      data-domain="landing"
    >
      {/* Interactive Glowing Grid Background */}
      {!shouldReduceMotion && (
        <GlowingGrid
          cellSize={38}
          glowColor={config.colors.primary}
          glowColorSecondary={config.colors.secondary}
          fadeDuration={1.8}
        />
      )}

      {/* Background gradient accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          background: `radial-gradient(ellipse at 50% 40%, ${config.colors.glow} 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Subtitle badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span
              className="inline-block px-4 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full border"
              style={{
                color: config.colors.primary,
                borderColor: `${config.colors.primary}30`,
                background: `${config.colors.primary}08`,
              }}
            >
              {config.subtitle}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="mb-6"
            style={{ y: textY }}
          >
            <span className="gradient-text">{config.title}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            {config.description}
          </motion.p>

          {/* CTA — scroll down */}
          <motion.div variants={fadeInUp}>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${config.colors.primary}, ${config.colors.secondary})`,
                color: "#fff",
                boxShadow: `0 4px 20px ${config.colors.glow}`,
              }}
            >
              Explore My Work
              <span className="text-xl">↓</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Avatar — visible on mobile only (desktop uses ScrollAvatar) */}
        <motion.div
          className="mt-12 flex justify-center lg:hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <AvatarWrapper domain="landing" size="md" interactive />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
          style={{ borderColor: `${config.colors.primary}40` }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: config.colors.primary }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
