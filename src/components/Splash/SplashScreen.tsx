"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">("enter");
  const isDone = phase === "done";

  const handleComplete = useCallback(() => {
    setPhase("done");
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("hold"), 800);
    const exitTimer = setTimeout(() => setPhase("exit"), 2800);
    const doneTimer = setTimeout(handleComplete, 4200);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [handleComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="splash-overlay"
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase === "exit" ? 0 : 1,
          }}
          transition={{
            opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#FAFAFA",
            pointerEvents: phase === "exit" ? "none" : "auto",
          }}
        >
          {/* Subtle ambient shapes */}
          <motion.div
            className="splash-ambient-shape splash-shape-1"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="splash-ambient-shape splash-shape-2"
            animate={{
              scale: [1.1, 0.9, 1.1],
              rotate: [0, -30, 0],
              opacity: [0.04, 0.07, 0.04],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main welcome text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: phase === "exit" ? 0 : 1,
              y: phase === "exit" ? -10 : 0,
            }}
            transition={{
              opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
              y: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            }}
            style={{ textAlign: "center", position: "relative", zIndex: 1 }}
          >
            <motion.p
              className="splash-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "enter" ? 0 : 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Welcome To
            </motion.p>

            <motion.h1
              className="splash-title"
              initial={{ opacity: 0, letterSpacing: "0.15em" }}
              animate={{
                opacity: 1,
                letterSpacing: "0.04em",
              }}
              transition={{
                opacity: { duration: 1, ease: [0.4, 0, 0.2, 1] },
                letterSpacing: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              Luxmikant&apos;s Portfolio
            </motion.h1>

            {/* Decorative line beneath */}
            <motion.div
              className="splash-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase === "exit" ? 0 : 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </motion.div>

          {/* Terminal-style init text at bottom */}
          <motion.div
            className="splash-terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "exit" ? 0 : 0.5 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <TerminalTyping />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TerminalTyping() {
  const [text, setText] = useState("");
  const fullText = "go run build_portfolio.go";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="splash-terminal-text">
      <span style={{ color: "#8B7355" }}>$</span> {text}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ color: "#C4956A" }}
      >
        ▊
      </motion.span>
    </span>
  );
}
