"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DomainId } from "@/utils/domainConfig";

const PARTICLE_CONFIGS = {
  landing: { count: 40, radius: 2.5, size: 0.025, color: "#7c5cfc", speed: 0.3, opacity: 0.6 },
  backend: { count: 30, radius: 2.8, size: 0.03, color: "#818cf8", speed: 0.4, opacity: 0.7 },
  cloud: { count: 80, radius: 3.0, size: 0.02, color: "#22d3ee", speed: 0.6, opacity: 0.5 },
  ai: { count: 60, radius: 2.6, size: 0.028, color: "#10b981", speed: 0.5, opacity: 0.65 },
  web3: { count: 35, radius: 2.8, size: 0.035, color: "#a855f7", speed: 0.35, opacity: 0.75 },
};

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

interface AvatarParticlesProps {
  domain: DomainId;
  reducedQuality?: boolean;
}

export default function AvatarParticles({
  domain,
  reducedQuality = false,
}: AvatarParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const config = PARTICLE_CONFIGS[domain];
  const effectiveCount = reducedQuality
    ? Math.max(16, Math.round(config.count * 0.55))
    : config.count;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(effectiveCount * 3);
    const vel = new Float32Array(effectiveCount * 3);

    for (let i = 0; i < effectiveCount; i++) {
      const seed = i + config.radius * 100;
      const theta = pseudoRandom(seed + 1) * Math.PI * 2;
      const phi = Math.acos(2 * pseudoRandom(seed + 2) - 1);
      const r = config.radius * (0.6 + pseudoRandom(seed + 3) * 0.4);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      vel[i * 3] = (pseudoRandom(seed + 4) - 0.5) * 0.01;
      vel[i * 3 + 1] = (pseudoRandom(seed + 5) - 0.5) * 0.01;
      vel[i * 3 + 2] = (pseudoRandom(seed + 6) - 0.5) * 0.01;
    }

    return { positions: pos, velocities: vel };
  }, [effectiveCount, config.radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positionAttr = pointsRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime * config.speed;

    for (let i = 0; i < effectiveCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      const angle = time * (0.5 + velocities[i3] * 10);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      positionAttr.setXYZ(
        i,
        x * cos - z * sin,
        y + Math.sin(time + i * 0.1) * 0.15,
        x * sin + z * cos
      );
    }

    positionAttr.needsUpdate = true;
    pointsRef.current.rotation.y += 0.001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={config.size}
        color={config.color}
        transparent
        opacity={reducedQuality ? config.opacity * 0.9 : config.opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
