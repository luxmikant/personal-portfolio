"use client";

import { useEffect, useRef, useCallback } from "react";

interface GlowingGridProps {
  /** Grid cell size in pixels */
  cellSize?: number;
  /** Glow color — CSS color string (hex) */
  glowColor?: string;
  /** Secondary glow color for gradient effect */
  glowColorSecondary?: string;
  /** Fade-out duration in seconds */
  fadeDuration?: number;
  /** Whether to show the grid */
  active?: boolean;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ];
}

interface ActiveCell {
  col: number;
  row: number;
  alpha: number;
  startTime: number;
}

export default function GlowingGrid({
  cellSize = 38,
  glowColor = "#7c6cf0",
  glowColorSecondary = "#b4a0fa",
  fadeDuration = 1.8,
  active = true,
}: GlowingGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeCellsRef = useRef<Map<string, ActiveCell>>(new Map());
  const animFrameRef = useRef<number>(0);
  const mousePos = useRef<{ x: number; y: number }>({ x: -1, y: -1 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);
    const now = performance.now();
    const rgb = hexToRgb(glowColor);
    const rgb2 = hexToRgb(glowColorSecondary);

    ctx.clearRect(0, 0, width, height);

    // Draw base grid lines (very subtle)
    ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellSize, 0);
      ctx.lineTo(c * cellSize, height);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellSize);
      ctx.lineTo(width, r * cellSize);
      ctx.stroke();
    }

    // Add mouse-hover cell
    if (mousePos.current.x >= 0 && mousePos.current.y >= 0) {
      const col = Math.floor(mousePos.current.x / cellSize);
      const row = Math.floor(mousePos.current.y / cellSize);
      const key = `${col}-${row}`;
      activeCellsRef.current.set(key, { col, row, alpha: 1, startTime: now });

      // Also light neighbors at lower intensity
      for (const [dc, dr] of [[-1,0],[1,0],[0,-1],[0,1]]) {
        const nc = col + dc;
        const nr = row + dr;
        if (nc >= 0 && nc < cols && nr >= 0 && nr < rows) {
          const nkey = `${nc}-${nr}`;
          const existing = activeCellsRef.current.get(nkey);
          if (!existing || existing.alpha < 0.4) {
            activeCellsRef.current.set(nkey, { col: nc, row: nr, alpha: 0.4, startTime: now });
          }
        }
      }
    }

    // Draw active (glowing) cells
    activeCellsRef.current.forEach((cell, key) => {
      const elapsed = (now - cell.startTime) / 1000;
      const fadeAlpha = Math.max(0, cell.alpha - (elapsed / fadeDuration) * cell.alpha);

      if (fadeAlpha <= 0.01) {
        activeCellsRef.current.delete(key);
        return;
      }

      const x = cell.col * cellSize;
      const y = cell.row * cellSize;

      // Cell fill with glow
      const gradient = ctx.createRadialGradient(
        x + cellSize / 2, y + cellSize / 2, 0,
        x + cellSize / 2, y + cellSize / 2, cellSize * 0.8
      );
      gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${fadeAlpha * 0.3})`);
      gradient.addColorStop(0.6, `rgba(${rgb2[0]}, ${rgb2[1]}, ${rgb2[2]}, ${fadeAlpha * 0.15})`);
      gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, cellSize, cellSize);

      // Bright border for active cell
      ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${fadeAlpha * 0.25})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cellSize, cellSize);
    });

    // Radial vignette overlay for readability
    const vignette = ctx.createRadialGradient(
      width / 2, height / 2, Math.min(width, height) * 0.25,
      width / 2, height / 2, Math.max(width, height) * 0.55
    );
    vignette.addColorStop(0, "rgba(250, 249, 247, 0)");
    vignette.addColorStop(1, "rgba(250, 249, 247, 0.85)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    animFrameRef.current = requestAnimationFrame(draw);
  }, [cellSize, glowColor, glowColorSecondary, fadeDuration]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = parent.offsetWidth * dpr;
      canvas.height = parent.offsetHeight * dpr;
      canvas.style.width = `${parent.offsetWidth}px`;
      canvas.style.height = `${parent.offsetHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mousePos.current = { x: -1, y: -1 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [active, draw]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: "crosshair" }}
      />
    </div>
  );
}
