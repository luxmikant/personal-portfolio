"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { DomainId } from "@/utils/domainConfig";
import AvatarCore from "./AvatarCore";
import AvatarParticles from "./AvatarParticles";
import AvatarRings from "./AvatarRings";

interface AvatarSceneProps {
  domain: DomainId;
  size?: "sm" | "md" | "lg";
  className?: string;
  interactive?: boolean;
}

export default function AvatarScene({
  domain,
  size = "md",
  className = "",
  interactive = true,
}: AvatarSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLowPerfMode =
    typeof window !== "undefined" &&
    (window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const sizeMap = {
    sm: "w-[180px] h-[180px] md:w-[220px] md:h-[220px]",
    md: "w-[280px] h-[280px] md:w-[380px] md:h-[380px]",
    lg: "w-[350px] h-[350px] md:w-[500px] md:h-[500px]",
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${sizeMap[size]} ${className}`}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={isLowPerfMode ? [1, 1.25] : [1, 2]}
        gl={{ alpha: true, antialias: !isLowPerfMode }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -5]} intensity={0.4} color="#7c5cfc" />

          <AvatarCore domain={domain} interactive={interactive} />
          <AvatarRings domain={domain} reducedQuality={isLowPerfMode} />
          <AvatarParticles domain={domain} reducedQuality={isLowPerfMode} />

          <Preload all />
        </Suspense>
      </Canvas>

      {/* Glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full opacity-30 blur-3xl"
        style={{
          background: `radial-gradient(circle, var(--domain-primary) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
