"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";

interface GlowingGridProps {
  /** Grid cell size in pixels */
  cellSize?: number;
  /** Glow color — CSS color string */
  glowColor?: string;
  /** Secondary glow color for gradient effect */
  glowColorSecondary?: string;
  /** Fade-out duration in seconds */
  fadeDuration?: number;
  /** Whether to show the grid */
  active?: boolean;
}

export default function GlowingGrid({
  cellSize = 60,
  glowColor = "var(--domain-primary)",
  glowColorSecondary = "var(--domain-secondary)",
  fadeDuration = 1.8,
  active = true,
}: GlowingGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cells, setCells] = useState<number>(0);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);

  // Calculate grid dimensions
  const updateGrid = useCallback(() => {
    if (!containerRef.current) return;
    const { offsetWidth, offsetHeight } = containerRef.current;
    const c = Math.ceil(offsetWidth / cellSize);
    const r = Math.ceil(offsetHeight / cellSize);
    setCols(c);
    setRows(r);
    setCells(c * r);
  }, [cellSize]);

  useEffect(() => {
    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, [updateGrid]);

  // Mouse enter handler for each cell
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const cell = e.currentTarget;
      // Instant light up
      cell.style.transition = "none";
      cell.style.backgroundColor = glowColor;
      cell.style.boxShadow = `0 0 15px ${glowColor}, 0 0 30px ${glowColor}, inset 0 0 10px ${glowColorSecondary}`;
      cell.style.borderColor = glowColor;
    },
    [glowColor, glowColorSecondary]
  );

  // Mouse leave handler — slow fade
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const cell = e.currentTarget;
      cell.style.transition = `background-color ${fadeDuration}s ease, box-shadow ${fadeDuration}s ease, border-color ${fadeDuration}s ease`;
      cell.style.backgroundColor = "transparent";
      cell.style.boxShadow = "none";
      cell.style.borderColor = "rgba(255,255,255,0.03)";
    },
    [fadeDuration]
  );

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      style={{ zIndex: 0 }}
    >
      {/* Grid container */}
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: 0,
        }}
      >
        {Array.from({ length: cells }).map((_, i) => (
          <div
            key={i}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,0.03)",
              transition: `background-color ${fadeDuration}s ease, box-shadow ${fadeDuration}s ease`,
              cursor: "crosshair",
            }}
          />
        ))}
      </div>

      {/* Subtle gradient overlay so content above reads clearly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, transparent 30%, var(--background) 80%)
          `,
        }}
      />
    </div>
  );
}
