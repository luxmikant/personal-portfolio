"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { DomainId, DOMAIN_ORDER } from "@/utils/domainConfig";

const AvatarScene = dynamic(
  () => import("@/components/Avatar3D/AvatarScene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="w-16 h-16 rounded-full animate-pulse-glow"
          style={{
            background: `radial-gradient(circle, var(--domain-primary) 0%, transparent 70%)`,
            opacity: 0.3,
          }}
        />
      </div>
    ),
  }
);

// Maps scroll ranges to domains
const SCROLL_DOMAIN_RANGES: { domain: DomainId; start: number; end: number }[] = [
  { domain: "landing", start: 0, end: 0.15 },
  { domain: "backend", start: 0.15, end: 0.35 },
  { domain: "cloud", start: 0.35, end: 0.55 },
  { domain: "ai", start: 0.55, end: 0.75 },
  { domain: "web3", start: 0.75, end: 1.0 },
];

function getDomainFromScroll(progress: number): DomainId {
  for (const range of SCROLL_DOMAIN_RANGES) {
    if (progress >= range.start && progress < range.end) {
      return range.domain;
    }
  }
  return "web3";
}

export default function ScrollAvatar() {
  const [currentDomain, setCurrentDomain] = useState<DomainId>("landing");
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  // Derive avatar size from scroll — large in hero, smaller as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 0.7, 0.65]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.98, 1], [1, 1, 0.9, 0.9, 0]);

  // Track scroll progress to update domain
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const newDomain = getDomainFromScroll(v);
      setCurrentDomain(newDomain);
      setIsVisible(v < 0.98);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Hide on mobile for performance
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (shouldReduceMotion || !isVisible) return null;

  // On mobile, don't show the floating avatar (only hero has it)
  if (isMobile) return null;

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-1/2 right-8 -translate-y-1/2 z-30 pointer-events-none"
      style={{ scale, opacity }}
      data-domain={currentDomain}
    >
      <div className="w-[280px] h-[280px] xl:w-[320px] xl:h-[320px]">
        <AvatarScene
          domain={currentDomain}
          size="md"
          interactive={false}
        />
      </div>

      {/* Domain label */}
      <motion.div
        key={currentDomain}
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest text-center"
        style={{ color: "var(--domain-primary)", opacity: 0.6 }}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {currentDomain === "landing" ? "" : currentDomain}
      </motion.div>
    </motion.div>
  );
}
