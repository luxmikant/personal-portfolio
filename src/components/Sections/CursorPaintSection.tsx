"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";

/* ─── Constants ─────────────────────────────────────────────────────────── */

/** Soft-blob brush radius in px */
const RADIUS = 52;

/** Step distance between interpolated blobs (smaller = denser trail) */
const STEP = 10;

/** Portfolio accent palette:  violet → teal → amber → purple → violet */
const PALETTE: [number, number, number][] = [
  [248, 76, 62],   // Violet  #7c6cf0
  [162, 62, 44],   // Teal    #2bb58e
  [30,  80, 58],   // Amber   #e88c3a
  [268, 76, 66],   // Purple  #9b6ef0
  [248, 76, 62],   // Violet  (loop close)
];

const HIDDEN_TEXT = ["Code is the brush.", "Systems are the canvas."];

/** Matches the portfolio warm off-white */
const SECTION_BG = "#faf9f7";

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function lerpHsla(t: number, alpha: number): string {
  const n = PALETTE.length - 1;
  const i = Math.min(Math.floor(t * n), n - 1);
  const f = t * n - i;
  const [h1, s1, l1] = PALETTE[i];
  const [h2, s2, l2] = PALETTE[i + 1];
  const h = h1 + (h2 - h1) * f;
  const s = s1 + (s2 - s1) * f;
  const l = l1 + (l2 - l1) * f;
  return `hsla(${h.toFixed(1)},${s.toFixed(1)}%,${l.toFixed(1)}%,${alpha})`;
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function CursorPaintSection() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const lastRef     = useRef<{ x: number; y: number } | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  /* Re-stamp the hidden text in SECTION_BG over painted areas so the glyphs
     appear as negative-space cutouts inside the color trail. */
  const drawTextMask = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.save();
      ctx.globalAlpha  = 1;
      ctx.fillStyle    = SECTION_BG;
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";

      const fontSize = Math.max(28, Math.min(72, w * 0.06));
      ctx.font = `bold ${fontSize}px 'Geist Sans', 'Inter', system-ui, sans-serif`;

      const lineH  = fontSize * 1.45;
      const totalH = HIDDEN_TEXT.length * lineH;
      const startY = h / 2 - totalH / 2 + lineH / 2;

      HIDDEN_TEXT.forEach((line, i) => ctx.fillText(line, w / 2, startY + i * lineH));
      ctx.restore();
    },
    []
  );

  /* Paint a single soft radial blob at (x, y). */
  const paintAt = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const t = progressRef.current % 1;

      // Radial gradient: vivid opaque centre → fully transparent edge
      const grad = ctx.createRadialGradient(x, y, 0, x, y, RADIUS);
      grad.addColorStop(0,    lerpHsla(t, 0.82));
      grad.addColorStop(0.45, lerpHsla(t, 0.60));
      grad.addColorStop(0.80, lerpHsla(t, 0.22));
      grad.addColorStop(1,    lerpHsla(t, 0));

      ctx.beginPath();
      ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Re-stamp text mask so text always punches through the color
      drawTextMask(ctx, canvas.width, canvas.height);

      progressRef.current += 0.002;
    },
    [drawTextMask]
  );

  /* Smooth interpolation between cursor positions. */
  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect   = canvas.getBoundingClientRect();
      // Account for device-pixel-ratio scaling
      const scaleX = canvas.width  / rect.width;
      const scaleY = canvas.height / rect.height;
      const cx = (clientX - rect.left) * scaleX;
      const cy = (clientY - rect.top)  * scaleY;

      if (cx < 0 || cy < 0 || cx > canvas.width || cy > canvas.height) {
        lastRef.current = null;
        return;
      }

      if (!hasStarted) setHasStarted(true);

      const last = lastRef.current;
      if (last) {
        const dist  = Math.hypot(cx - last.x, cy - last.y);
        const steps = Math.max(1, Math.ceil(dist / STEP));
        for (let k = 1; k <= steps; k++) {
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

  /* Canvas size sync + event wiring. */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      const dpr  = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width  = Math.round(rect.width  * dpr);
      canvas.height = Math.round(rect.height * dpr);
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
            color:       "var(--domain-primary)",
            borderColor: "var(--domain-primary)",
            background:  "var(--domain-bg-accent)",
          }}
        >
          Interactive
        </span>
      </motion.div>

      {/* Instruction overlay — fades out when painting starts */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 pointer-events-none select-none"
        animate={{ opacity: hasStarted ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-sm font-mono tracking-widest uppercase"
          style={{ color: "var(--muted)" }}
        >
          Move your cursor to paint
        </p>

        {/* Pulsing cursor ring */}
        <svg
          width="34" height="34" viewBox="0 0 34 34" fill="none"
          className="animate-bounce" style={{ animationDuration: "1.6s" }}
        >
          <circle cx="17" cy="17" r="13" stroke="var(--domain-primary)" strokeOpacity="0.4" strokeWidth="1.5" />
          <circle cx="17" cy="17" r="4"  fill="var(--domain-primary)" fillOpacity="0.7" />
        </svg>

        <p
          className="text-xs font-mono"
          style={{ color: "var(--border)" }}
        >
          A message is hidden inside
        </p>
      </motion.div>

      {/* Bottom label */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none text-center">
        <p
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "var(--border)" }}
        >
          Luxmikant · 2025
        </p>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full"
        style={{
          height:      "clamp(360px, 50vh, 520px)",
          cursor:      "crosshair",
          touchAction: "none",
          display:     "block",
        }}
      />
    </section>
  );
}
