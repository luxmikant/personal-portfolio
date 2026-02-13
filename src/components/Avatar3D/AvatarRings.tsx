"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DomainId } from "@/utils/domainConfig";

const RING_CONFIGS = {
  landing: { count: 2, color: "#7c5cfc", opacity: 0.15, speed: 0.3 },
  backend: { count: 3, color: "#6366f1", opacity: 0.2, speed: 0.4 },
  cloud: { count: 2, color: "#06b6d4", opacity: 0.15, speed: 0.5 },
  ai: { count: 3, color: "#10b981", opacity: 0.18, speed: 0.35 },
  web3: { count: 3, color: "#a855f7", opacity: 0.2, speed: 0.25 },
};

interface AvatarRingsProps {
  domain: DomainId;
  reducedQuality?: boolean;
}

export default function AvatarRings({
  domain,
  reducedQuality = false,
}: AvatarRingsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const config = RING_CONFIGS[domain];
  const ringCount = reducedQuality
    ? Math.max(1, config.count - 1)
    : config.count;

  const rings = useMemo(() => {
    return Array.from({ length: ringCount }, (_, i) => ({
      radius: 1.8 + i * 0.5,
      rotation: [
        (Math.PI / 4) * (i + 1) * 0.7,
        (Math.PI / 3) * i,
        0,
      ] as [number, number, number],
      speed: config.speed * (1 - i * 0.15),
    }));
  }, [ringCount, config.speed]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      if (rings[i]) {
        child.rotation.z = t * rings[i].speed;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={ring.rotation}>
          <torusGeometry args={[ring.radius, 0.008, 16, 100]} />
          <meshBasicMaterial
            color={config.color}
            transparent
            opacity={config.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
