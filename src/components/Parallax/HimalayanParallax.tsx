"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Multi-layer parallax Himalayan landscape background.
 * Layers (back to front): sky gradient → clouds → snow peak → far mountains →
 * mid mountains → near mountains → mist → pine trees (foreground).
 * Each layer scrolls at a different speed for depth.
 * Mouse movement adds subtle lateral parallax.
 */
export default function HimalayanParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-based parallax — foreground fast, background slow
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 300]);  // trees
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 200]);  // near hills
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 120]);  // mid mountains
  const layer4Y = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 70]);   // far mountains
  const layer5Y = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 30]);   // snow peak
  const cloudsY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 15]);   // clouds

  // Mouse tracking
  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMouse = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2);  // -1 to 1
      setMouseY((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [shouldReduceMotion]);

  return (
    <div ref={containerRef} className="parallax-container">
      {/* ---- SKY GRADIENT ---- */}
      <div className="parallax-sky" />

      {/* ---- LAYER 6: CLOUDS (barely moves) ---- */}
      <motion.div
        className="parallax-layer parallax-clouds"
        style={{
          y: cloudsY,
          x: mouseX * -2,
        }}
      >
        <svg viewBox="0 0 1600 200" preserveAspectRatio="none" className="parallax-svg">
          {/* Cloud shapes */}
          <path d="M0,120 Q80,80 160,110 Q240,70 320,100 Q400,60 480,95 Q560,75 640,105 Q720,65 800,90 Q880,55 960,85 Q1040,70 1120,95 Q1200,60 1280,88 Q1360,72 1440,100 Q1520,80 1600,110 L1600,0 L0,0 Z" fill="rgba(200,220,215,0.25)" />
          <path d="M0,140 Q100,100 200,130 Q350,90 450,120 Q550,85 700,115 Q800,80 900,110 Q1050,90 1150,125 Q1300,85 1400,115 Q1500,95 1600,130 L1600,0 L0,0 Z" fill="rgba(210,230,225,0.2)" />
          {/* Small floating clouds */}
          <ellipse cx="300" cy="60" rx="80" ry="20" fill="rgba(230,245,240,0.35)" />
          <ellipse cx="900" cy="45" rx="100" ry="22" fill="rgba(225,240,235,0.3)" />
          <ellipse cx="1300" cy="70" rx="65" ry="18" fill="rgba(230,245,240,0.25)" />
        </svg>
      </motion.div>

      {/* ---- LAYER 5: SNOW-CAPPED PEAK (slowest scroll) ---- */}
      <motion.div
        className="parallax-layer parallax-snow-peak"
        style={{
          y: layer5Y,
          x: mouseX * -3,
        }}
      >
        <svg viewBox="0 0 1600 600" preserveAspectRatio="none" className="parallax-svg">
          <defs>
            <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8f4f0" />
              <stop offset="40%" stopColor="#d5ebe4" />
              <stop offset="100%" stopColor="#b8d8ce" />
            </linearGradient>
          </defs>
          {/* Main snow peak */}
          <path
            d="M500,600 L620,280 L680,320 L740,200 L780,180 L840,160 L900,170 L950,200 L1000,240 L1040,280 L1100,600 Z"
            fill="url(#snowGrad)"
            opacity="0.85"
          />
          {/* Snow details */}
          <path
            d="M700,260 L740,200 L780,180 L840,160 L900,170 L920,210 L860,230 L800,250 L750,245 Z"
            fill="#ecf7f3"
            opacity="0.7"
          />
          {/* Ridge shadow */}
          <path
            d="M840,160 L900,170 L950,200 L1000,240 L1040,280 L980,320 L920,280 L880,230 Z"
            fill="rgba(120,160,148,0.2)"
          />
        </svg>
      </motion.div>

      {/* ---- LAYER 4: FAR MOUNTAINS ---- */}
      <motion.div
        className="parallax-layer parallax-far-mountains"
        style={{
          y: layer4Y,
          x: mouseX * -6,
        }}
      >
        <svg viewBox="0 0 1600 600" preserveAspectRatio="none" className="parallax-svg">
          <defs>
            <linearGradient id="farMtnGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8cb8aa" />
              <stop offset="100%" stopColor="#9dc4b6" />
            </linearGradient>
          </defs>
          {/* Far mountain range — left side */}
          <path
            d="M0,600 L0,380 L80,340 L160,360 L240,300 L320,320 L400,280 L460,350 L500,600 Z"
            fill="url(#farMtnGrad)"
            opacity="0.6"
          />
          {/* Far mountain range — right side */}
          <path
            d="M1100,600 L1120,340 L1200,300 L1280,330 L1360,280 L1440,310 L1520,350 L1600,330 L1600,600 Z"
            fill="url(#farMtnGrad)"
            opacity="0.55"
          />
          {/* Small distant peaks */}
          <path
            d="M350,600 L380,350 L420,330 L460,350 L500,600 Z"
            fill="#95bfb0"
            opacity="0.4"
          />
        </svg>
      </motion.div>

      {/* ---- LAYER 3: MID MOUNTAINS ---- */}
      <motion.div
        className="parallax-layer parallax-mid-mountains"
        style={{
          y: layer3Y,
          x: mouseX * -10,
        }}
      >
        <svg viewBox="0 0 1600 600" preserveAspectRatio="none" className="parallax-svg">
          <defs>
            <linearGradient id="midMtnGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6a9e8e" />
              <stop offset="100%" stopColor="#7bab9c" />
            </linearGradient>
          </defs>
          <path
            d="M0,600 L0,420 L60,400 L140,380 L220,360 L300,390 L380,350 L460,370 L540,340 L620,380 L700,420 L780,400 L860,430 L940,380 L1020,400 L1100,360 L1180,390 L1260,370 L1340,400 L1420,380 L1500,410 L1600,390 L1600,600 Z"
            fill="url(#midMtnGrad)"
            opacity="0.65"
          />
        </svg>
      </motion.div>

      {/* ---- LAYER 2: NEAR HILLS + MIST ---- */}
      <motion.div
        className="parallax-layer parallax-near-hills"
        style={{
          y: layer2Y,
          x: mouseX * -15,
        }}
      >
        <svg viewBox="0 0 1600 600" preserveAspectRatio="none" className="parallax-svg">
          <defs>
            <linearGradient id="nearHillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4d8878" />
              <stop offset="100%" stopColor="#5a9585" />
            </linearGradient>
            {/* Mist overlay */}
            <linearGradient id="mistGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(200,225,218,0)" />
              <stop offset="40%" stopColor="rgba(200,225,218,0.25)" />
              <stop offset="100%" stopColor="rgba(200,225,218,0)" />
            </linearGradient>
          </defs>
          {/* Rolling hills */}
          <path
            d="M0,600 L0,460 L80,440 L180,450 L280,420 L380,440 L480,410 L580,440 L680,420 L780,450 L880,430 L980,460 L1080,440 L1180,450 L1280,430 L1380,460 L1480,440 L1600,455 L1600,600 Z"
            fill="url(#nearHillGrad)"
            opacity="0.7"
          />
          {/* Mist band */}
          <rect x="0" y="390" width="1600" height="120" fill="url(#mistGrad)" opacity="0.6" />
        </svg>
      </motion.div>

      {/* ---- LAYER 1: FOREGROUND PINE TREES (fastest scroll) ---- */}
      <motion.div
        className="parallax-layer parallax-trees"
        style={{
          y: layer1Y,
          x: mouseX * -20,
        }}
      >
        <svg viewBox="0 0 1600 600" preserveAspectRatio="none" className="parallax-svg">
          <defs>
            <linearGradient id="treeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a3a30" />
              <stop offset="100%" stopColor="#0d1f1a" />
            </linearGradient>
          </defs>
          {/* Tree line — left cluster */}
          <PineTreeGroup x={0} baseY={600} />
          <PineTreeGroup x={200} baseY={600} />
          <PineTreeGroup x={400} baseY={600} />
          <PineTreeGroup x={600} baseY={600} />
          <PineTreeGroup x={800} baseY={600} />
          <PineTreeGroup x={1000} baseY={600} />
          <PineTreeGroup x={1200} baseY={600} />
          <PineTreeGroup x={1400} baseY={600} />
          {/* Ground fill below trees */}
          <rect x="0" y="520" width="1600" height="80" fill="#0d1f1a" />
        </svg>
      </motion.div>

      {/* ---- Mist effect between trees and content ---- */}
      <motion.div
        className="parallax-layer parallax-foreground-mist"
        style={{ y: layer1Y }}
      >
        <div className="parallax-mist-gradient" />
      </motion.div>
    </div>
  );
}

/** A group of pine trees at a given x position */
function PineTreeGroup({ x, baseY }: { x: number; baseY: number }) {
  // Generate a few trees at varying heights
  const trees = [
    { dx: 0, h: 120, w: 28 },
    { dx: 35, h: 150, w: 32 },
    { dx: 70, h: 100, w: 24 },
    { dx: 100, h: 160, w: 34 },
    { dx: 140, h: 130, w: 30 },
    { dx: 170, h: 110, w: 26 },
  ];

  return (
    <g>
      {trees.map((tree, i) => {
        const tx = x + tree.dx;
        const top = baseY - tree.h - 60; // Trees emerge from ground
        const mid = baseY - 60;
        return (
          <g key={i}>
            {/* Trunk */}
            <rect
              x={tx + tree.w / 2 - 2}
              y={mid - 10}
              width={4}
              height={30}
              fill="#0d1f1a"
            />
            {/* Tree shape — stacked triangles */}
            <polygon
              points={`${tx + tree.w / 2},${top} ${tx},${top + tree.h * 0.65} ${tx + tree.w},${top + tree.h * 0.65}`}
              fill="#1a3a30"
            />
            <polygon
              points={`${tx + tree.w / 2},${top + tree.h * 0.2} ${tx - 4},${top + tree.h * 0.85} ${tx + tree.w + 4},${top + tree.h * 0.85}`}
              fill="#152e26"
            />
            <polygon
              points={`${tx + tree.w / 2},${top + tree.h * 0.4} ${tx - 8},${mid} ${tx + tree.w + 8},${mid}`}
              fill="#0d1f1a"
            />
          </g>
        );
      })}
    </g>
  );
}
