"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ContentRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right" | "random";
}

/**
 * Content reveal with a colored wipe that has organic, random edges.
 * The wipe sweeps across, revealing content underneath.
 */
export default function ContentReveal({
  children,
  delay = 0,
  direction = "random",
}: ContentRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [clipPath, setClipPath] = useState("");

  const dir =
    direction === "random" ? (Math.random() > 0.5 ? "left" : "right") : direction;

  // Generate organic random edge clip path
  useEffect(() => {
    const points = 12;
    const edgePoints: string[] = [];

    if (dir === "left") {
      // Sweep from left to right
      // Bottom-left
      edgePoints.push("0% 100%");
      // Top-left
      edgePoints.push("0% 0%");
      // Generate jagged right edge
      for (let i = 0; i <= points; i++) {
        const y = (i / points) * 100;
        const xVariation = 5 + Math.random() * 15; // random 5-20% jag
        edgePoints.push(`${100 - xVariation}% ${y}%`);
      }
    } else {
      // Sweep from right to left
      // Top-right
      edgePoints.push("100% 0%");
      // Bottom-right
      edgePoints.push("100% 100%");
      // Generate jagged left edge
      for (let i = points; i >= 0; i--) {
        const y = (i / points) * 100;
        const xVariation = 5 + Math.random() * 15;
        edgePoints.push(`${xVariation}% ${y}%`);
      }
    }

    setClipPath(`polygon(${edgePoints.join(", ")})`);
  }, [dir]);

  return (
    <div ref={ref} className="content-reveal-wrapper">
      {/* The colored wipe overlay */}
      <motion.div
        className="content-reveal-wipe"
        initial={{
          x: dir === "left" ? "-105%" : "105%",
        }}
        animate={
          isInView
            ? { x: [dir === "left" ? "-105%" : "105%", "0%", dir === "left" ? "105%" : "-105%"] }
            : {}
        }
        transition={
          isInView
            ? { x: { duration: 1.1, delay, ease: [0.76, 0, 0.24, 1], times: [0, 0.5, 1] } }
            : undefined
        }
        style={{
          clipPath: clipPath || undefined,
        }}
      />

      {/* Content - hidden until wipe passes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.01, delay: delay + 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
