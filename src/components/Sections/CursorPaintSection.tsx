"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";

/* ─── Constants ─────────────────────────────────────────────────────────── */

/** Each pixel-art "block" in px */
const GRID = 22;

/** Portfolio accent palette  violet → teal → amber → purple → violet */
const PALETTE: [number, number, number][] = [
  [248, 81, 62],   // Violet  #7c6cf0
  [160, 62, 44],   // Teal    #2bb58e
  [30,  80, 56],   // Amber   #e88c3a
  [268, 81, 69],   // Purple  #9b6ef0
  [248, 81, 62],   // Violet  (closes the loop)
];

const HIDDEN_TEXT = ["Code is the brush.", "Systems are the canvas."];
const SECTION_BG = "#0f0f1a";

/* ─── Colour helper ──────────────────────────────────────────────────────── */
function lerpHsl(t: number): string {
  const n = PALETTE.length - 1;
  const i = Math.min(Math.floor(t * n), n - 1);
  const f = t * n - i;
  const [h1, s1, l1] = PALETTE[i];
  const [h2, s2, l2] = PALETTE[i + 1];
  return `hsl(${h1 + (h2 - h1) * f},${(s1 + (s2 - s1) * f).toFixed(1)}%,${(l1 + (l2 - l1) * f).toFixed(1)}%)`;
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function CursorPaintSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  const progressRef = useRef(0);
  const lastRef     = useRef<{ x: number; y: number } | null>(null);

  const [hasStarted, setHasStarted] = useState(false);

  /* Draw the hidden-message mask on top of whatever is on the canvas.
     The text is filled with SECTION_BG colour → on painted blocks it
     appears as a dark cut-out; on the transparent canvas it's invisible. */
  const drawTextMask = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.save();
      ctx.fillStyle = SECTION_BG;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const fontSize = Math.max(26, Math.min(68, w * 0.058));
      ctx.font = `bold ${fontSize}px 'Geist Sans', 'Inter', system-ui, sans-serif`;

      const lineH   = fontSize * 1.4;
      const totalH  = HIDDEN_TEXT.length * lineH;
      const startY  = h / 2 - totalH / 2 + lineH / 2;

      HIDDEN_TEXT.forEach((line, i) => {
        ctx.fillText(line, w / 2, startY + i * lineH);
      });
      ctx.restore();
    },
    []
  );

  /* Paint one pixelated block and re-stamp the text mask on top */
  const paintAt = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const gx = Math.floor(x / GRID) * GRID;
      const gy = Math.floor(y / GRID) * GRID;

      ctx.fillStyle = lerpHsl(progressRef.current % 1);
      ctx.fillRect(gx, gy, GRID - 1, GRID - 1);

      drawTextMask(ctx, canvas.width, canvas.height);
      progressRef.current += 0.0022;
    },
    [drawTextMask]
  );

  /* Interpolate from last position to current (fills gaps at high speed) */
  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx   = clientX - rect.left;
      const cy   = clientY - rect.top;

      if (cx < 0 || cy < 0 || cx > canvas.width || cy > canvas.height) {
        lastRef.current = null;
        return;
      }

      if (!hasStarted) setHasStarted(true);

      const last = lastRef.current;
      if (last) {
        const dist  = Math.hypot(cx - last.x, cy - last.y);
        const steps = Math.max(1, Math.ceil(dist / (GRID / 2)));
        for (let k = 0; k <= steps; k++) {
          paintAt(
            last.x + (cx - last.x) * (k / steps),
            last.y + (cy - last.y) * (k / steps)
          );
        }
      } else {
        paintAt(cx, cy);
      }

      lastRef.current = { x: cx, y: cy };
    },
    [paintAt, hasStarted]
  );

  /* Canvas resize + event wiring */
  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const syncSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width  = Math.round(width);
      canvas.height = Math.round(height);
    };

    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);

    const onMouseMove  = (e: MouseEvent)     => handleMove(e.clientX, e.clientY);
    const onMouseLeave = ()                  => { lastRef.current = null; };
    const onTouchMove  = (e: TouchEvent)     => {
      e.preventDefault();
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd   = ()                  => { lastRef.current = null; };

    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove",  onTouchMove, { passive: false });
    canvas.addEventListener("touchend",   onTouchEnd);

    return () => {
      ro.disconnect();
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove",  onTouchMove);
      canvas.removeEventListener("touchend",   onTouchEnd);
    };
  }, [handleMove]);

  return (
    <section
      ref={sectionRef}
      id="canvas-art"
      className="relative overflow-hidden"
      data-domain="landing"
      style={{ background: SECTION_BG }}
    >
      {/* ── Section badge ── */}
      <motion.div
        className="absolute top-7 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <span
          className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest rounded-full border"
          style={{
            color: "var(--domain-primary)",
            borderColor: "var(--domain-primary)",
            background: "rgba(124, 108, 240, 0.12)",
          }}
        >
          Interactive
        </span>
      </motion.div>

      {/* ── Instruction overlay (fades out once painting starts) ── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 pointer-events-none select-none"
        animate={{ opacity: hasStarted ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-sm font-mono tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.40)" }}
        >
          Move your cursor to paint
        </p>

        {/* Animated cursor dot */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
             className="animate-bounce" style={{ animationDuration: "1.6s" }}>
          <circle cx="16" cy="16" r="12" stroke="rgba(124,108,240,0.45)" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="4"  fill ="rgba(124,108,240,0.65)" />
        </svg>

        <p
          className="text-xs font-mono"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          A message is hidden inside
        </p>
      </motion.div>

      {/* ── Bottom label (always visible) ── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none text-center"
      >
        <p
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          Luxmikant · 2025
        </p>
      </div>

      {/* ── The canvas ── */}
      <canvas
        ref={canvasRef}
        className="block w-full"
        style={{
          height: "clamp(360px, 50vh, 520px)",
          cursor: "crosshair",
          touchAction: "none",
          display: "block",
        }}
      />
    </section>
  );
}
