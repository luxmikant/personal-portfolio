"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DomainId, DOMAINS } from "@/utils/domainConfig";

interface LoaderProps {
  domain: DomainId;
  isLoading: boolean;
  onComplete?: () => void;
  duration?: number;
}

export default function Loader({
  domain,
  isLoading,
  onComplete,
  duration = 2500,
}: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const config = DOMAINS[domain];
  const messages = config.loaderMessages;

  // Progress counter
  useEffect(() => {
    if (!isLoading) return;

    setProgress(0);
    setMessageIndex(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [isLoading, duration, onComplete]);

  // Cycle loading messages
  useEffect(() => {
    if (!isLoading) return;

    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, duration / messages.length);

    return () => clearInterval(msgInterval);
  }, [isLoading, messages, duration]);

  // SVG progress ring values
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loader-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Progress Ring */}
            <div className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]">
              <svg
                className="w-full h-full -rotate-90"
                viewBox="0 0 200 200"
              >
                {/* Background ring */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="3"
                />
                {/* Progress ring */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="var(--domain-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: "stroke-dashoffset 0.1s ease" }}
                />
              </svg>

              {/* Center avatar placeholder with glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full"
                  style={{
                    background: `radial-gradient(circle, var(--domain-primary) 0%, transparent 70%)`,
                    opacity: 0.6,
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-2xl md:text-3xl font-mono font-bold"
                  style={{ color: "var(--domain-primary)" }}
                >
                  {progress}%
                </span>
              </div>
            </div>

            {/* Loading message */}
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                className="text-sm md:text-base font-mono tracking-wide"
                style={{ color: "var(--muted)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {messages[messageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
