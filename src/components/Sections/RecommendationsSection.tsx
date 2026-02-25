"use client";

import { motion } from "framer-motion";
import {
  staggerContainer,
  fadeInUp,
  parallaxReveal,
} from "@/utils/animationConfig";

const MANIFESTO = [
  {
    heading: "What I Believe In",
    body: "Software should be built to last — designed with intention, tested with rigor, and architected so the next engineer can understand it at a glance. I believe the best code reads like a well-edited essay: every line earns its place.",
  },
  {
    heading: "What Excites Me",
    body: "The intersection of backend depth and frontier tech. Multi-agent orchestration, distributed systems that scale gracefully, infrastructure-as-code that actually works — these are the puzzles I lose sleep over. I'm drawn to problems where the right abstraction unlocks an order-of-magnitude improvement.",
  },
  {
    heading: "How I Work",
    body: "I start with constraints, not features. Understanding the limits — latency budgets, cost ceilings, team capacity — shapes better architecture than any whiteboard session. Then I prototype fast, test relentlessly, and refine until the system feels inevitable rather than engineered.",
  },
];

export default function RecommendationsSection() {
  return (
    <section id="philosophy" className="py-28 px-6" data-domain="landing">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-xs font-mono uppercase tracking-widest mb-4"
            style={{ color: "var(--domain-primary)" }}
          >
            Philosophy
          </motion.span>
          <motion.h2 variants={parallaxReveal} className="text-foreground">
            Engineering Principles
          </motion.h2>
        </motion.div>

        {/* Manifesto cards */}
        <div className="space-y-10">
          {MANIFESTO.map((item, i) => (
            <motion.article
              key={item.heading}
              className="relative pl-8 border-l-2"
              style={{ borderColor: "var(--domain-primary)" }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Accent dot */}
              <div
                className="absolute -left-[7px] top-1 w-3 h-3 rounded-full"
                style={{
                  background: "var(--domain-primary)",
                  boxShadow: "0 0 8px var(--domain-glow)",
                }}
              />

              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--domain-primary)" }}
              >
                {item.heading}
              </h3>
              <p className="text-base leading-relaxed max-w-2xl">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="section-divider mt-28" />
    </section>
  );
}
