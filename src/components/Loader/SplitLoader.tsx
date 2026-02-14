"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DomainId, DOMAINS } from "@/utils/domainConfig";

interface SplitLoaderProps {
  domain: DomainId;
  isLoading: boolean;
  onComplete?: () => void;
  duration?: number;
}

export default function SplitLoader({
  domain,
  isLoading,
  onComplete,
  duration = 3000,
}: SplitLoaderProps) {
  const [phase, setPhase] = useState<"loading" | "splitting" | "done">(
    "loading"
  );
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const config = DOMAINS[domain];
  const messages = config.loaderMessages;

  const handleSplitComplete = useCallback(() => {
    setPhase("done");
    onComplete?.();
  }, [onComplete]);

  // Progress counter
  useEffect(() => {
    if (!isLoading || phase !== "loading") return;

    setProgress(0);
    setMessageIndex(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start split animation
          setTimeout(() => setPhase("splitting"), 200);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 55);

    return () => clearInterval(interval);
  }, [isLoading, duration, phase]);

  // Cycle loading messages
  useEffect(() => {
    if (!isLoading || phase !== "loading") return;

    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, duration / messages.length);

    return () => clearInterval(msgInterval);
  }, [isLoading, messages, duration, phase]);

  // After split animation completes
  useEffect(() => {
    if (phase === "splitting") {
      const timer = setTimeout(handleSplitComplete, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase, handleSplitComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {(phase === "loading" || phase === "splitting") && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* ===== LEFT DOOR ===== */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full"
            style={{ background: "var(--background)" }}
            animate={
              phase === "splitting"
                ? { x: "-100%", skewX: -3 }
                : { x: 0, skewX: 0 }
            }
            transition={{
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Left door inner edge glow */}
            <div
              className="absolute top-0 right-0 w-[2px] h-full"
              style={{
                background: `linear-gradient(to bottom, transparent, ${config.colors.primary}, ${config.colors.secondary}, transparent)`,
                boxShadow: `0 0 20px ${config.colors.glow}, 0 0 40px ${config.colors.glow}`,
              }}
            />

            {/* Scan line effect on left door */}
            <motion.div
              className="absolute left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${config.colors.primary}, transparent)`,
                boxShadow: `0 0 10px ${config.colors.glow}`,
              }}
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* ===== RIGHT DOOR ===== */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{ background: "var(--background)" }}
            animate={
              phase === "splitting"
                ? { x: "100%", skewX: 3 }
                : { x: 0, skewX: 0 }
            }
            transition={{
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Right door inner edge glow */}
            <div
              className="absolute top-0 left-0 w-[2px] h-full"
              style={{
                background: `linear-gradient(to bottom, transparent, ${config.colors.secondary}, ${config.colors.primary}, transparent)`,
                boxShadow: `0 0 20px ${config.colors.glow}, 0 0 40px ${config.colors.glow}`,
              }}
            />

            {/* Scan line effect on right door */}
            <motion.div
              className="absolute left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${config.colors.secondary}, transparent)`,
                boxShadow: `0 0 10px ${config.colors.glow}`,
              }}
              animate={{ top: ["100%", "0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* ===== CENTER CONTENT (on top of doors) ===== */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
            animate={
              phase === "splitting"
                ? { opacity: 0, scale: 1.2 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Logo / Name */}
            <motion.div
              className="mb-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Glowing orb behind text */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl opacity-30"
                style={{
                  background: `radial-gradient(circle, ${config.colors.primary}, transparent)`,
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <h1
                className="text-5xl md:text-7xl font-bold tracking-tight relative"
                style={{
                  background: `linear-gradient(135deg, ${config.colors.primary}, var(--foreground), ${config.colors.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Luxmikant
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-sm md:text-base font-mono tracking-[0.3em] uppercase mb-10"
              style={{ color: config.colors.primary }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {config.subtitle}
            </motion.p>

            {/* Progress bar (horizontal, sleek) */}
            <div className="w-64 md:w-80 relative">
              {/* Track */}
              <div
                className="h-[2px] w-full rounded-full overflow-hidden"
                style={{ background: "var(--border)" }}
              >
                {/* Fill */}
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${config.colors.primary}, ${config.colors.secondary})`,
                    boxShadow: `0 0 12px ${config.colors.glow}`,
                    width: `${progress}%`,
                    transition: "width 0.1s ease",
                  }}
                />
              </div>

              {/* Progress text */}
              <div className="flex justify-between mt-3">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={messageIndex}
                    className="text-xs font-mono"
                    style={{ color: "var(--muted)" }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {messages[messageIndex]}
                  </motion.span>
                </AnimatePresence>

                <span
                  className="text-xs font-mono tabular-nums"
                  style={{ color: config.colors.primary }}
                >
                  {progress}%
                </span>
              </div>
            </div>

            {/* Corner brackets */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 opacity-30" style={{ borderColor: config.colors.primary }} />
            <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 opacity-30" style={{ borderColor: config.colors.primary }} />
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 opacity-30" style={{ borderColor: config.colors.primary }} />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 opacity-30" style={{ borderColor: config.colors.primary }} />
          </motion.div>

          {/* Center line glow (the seam between doors) */}
          {phase === "loading" && (
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full z-[5]"
              style={{
                background: `linear-gradient(to bottom, transparent 10%, ${config.colors.primary}80, ${config.colors.secondary}80, transparent 90%)`,
                boxShadow: `0 0 8px ${config.colors.glow}, 0 0 16px ${config.colors.glow}`,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}

          {/* Flash effect when splitting */}
          {phase === "splitting" && (
            <motion.div
              className="absolute inset-0 z-[3]"
              style={{
                background: `radial-gradient(ellipse at center, ${config.colors.primary}30, transparent 70%)`,
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
