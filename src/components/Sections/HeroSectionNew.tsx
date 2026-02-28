"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import HimalayanParallax from "@/components/Parallax/HimalayanParallax";

const ROLES = [
  "Backend Engineer",
  "System Thinker",
  "Tool Builder",
  "Relentless Learner",
  "Chess Player",
];

export default function HeroSectionNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -80]);

  // Role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for chess accent
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-section"
    >
      {/* Multi-layer parallax Himalayan landscape */}
      <HimalayanParallax />

      {/* Content overlay */}
      <motion.div
        className="hero-content"
        style={{ y: textY }}
      >
        {/* Small intro line */}
        <motion.div
          className="hero-intro-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="hero-badge-dot" />
          <span>Kullu, Himachal — India</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          I&apos;m <span className="hero-name-accent">Luxmikant</span>
        </motion.h1>

        {/* Rotating role */}
        <motion.div
          className="hero-role-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="hero-role-prefix">A</span>
          <div className="hero-role-slider">
            <motion.span
              key={roleIndex}
              className="hero-role-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {ROLES[roleIndex]}
            </motion.span>
          </div>
        </motion.div>

        {/* Short description */}
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          I build systems that scale, tools that matter, and I take full
          ownership of every line of code I write. I don&apos;t just use
          tools — I find the right one, master it, and push it to its limits.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <a href="#projects" className="hero-cta-primary">
            View My Work
            <span className="hero-cta-arrow">→</span>
          </a>
          <a href="#connect" className="hero-cta-secondary">
            Let&apos;s Connect
          </a>
        </motion.div>

        {/* Chess-inspired decorative element */}
        <motion.div
          className="hero-chess-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          }}
        >
          ♞
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">scroll</span>
      </motion.div>
    </section>
  );
}
