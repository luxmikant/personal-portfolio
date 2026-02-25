"use client";

import { motion } from "framer-motion";
import { parallaxReveal, staggerContainer, fadeInUp } from "@/utils/animationConfig";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6" data-domain="landing">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span
              className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest rounded-full border"
              style={{
                color: "var(--domain-primary)",
                borderColor: "var(--domain-primary)",
                background: "var(--domain-bg-accent)",
              }}
            >
              About
            </span>
          </motion.div>

          <motion.h2
            variants={parallaxReveal}
            className="mb-8"
          >
            Building at the{" "}
            <span className="gradient-text">intersection</span> of
            systems & intelligence
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.p variants={fadeInUp} className="text-base md:text-lg leading-relaxed">
              I&apos;m Luxmikant — an engineer who thrives in the space where backend
              architecture meets emerging tech. I build production-grade systems across
              four domains: scalable APIs, cloud-native infrastructure, AI-powered tooling,
              and blockchain experiments.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-base md:text-lg leading-relaxed">
              Every project below is a real system — designed, built, and (where possible)
              deployed. I believe in clean architecture, thoughtful abstraction, and code
              that tells a story. Scroll down to explore my work across each domain.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
}
