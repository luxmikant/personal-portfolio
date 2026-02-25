"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { DomainId } from "@/utils/domainConfig";

const AVATAR_CONFIGS = {
  landing: {
    geometry: "icosahedron" as const,
    args: [1.2, 4] as [number, number],
    color: "#7c6cf0",
    emissive: "#7c6cf0",
    emissiveIntensity: 0.3,
    distort: 0.4,
    speed: 2,
    roughness: 0.2,
    metalness: 0.8,
    floatSpeed: 1,
    floatIntensity: 0.6,
    rotationSpeed: 0.003,
    wireframe: false,
  },
  backend: {
    geometry: "octahedron" as const,
    args: [1.3, 0] as [number, number],
    color: "#7c6cf0",
    emissive: "#7c6cf0",
    emissiveIntensity: 0.4,
    distort: 0.15,
    speed: 1.5,
    roughness: 0.1,
    metalness: 0.9,
    floatSpeed: 1.2,
    floatIntensity: 0.5,
    rotationSpeed: 0.004,
    wireframe: false,
  },
  cloud: {
    geometry: "icosahedron" as const,
    args: [1.2, 2] as [number, number],
    color: "#e88c3a",
    emissive: "#e88c3a",
    emissiveIntensity: 0.35,
    distort: 0.5,
    speed: 3,
    roughness: 0.3,
    metalness: 0.7,
    floatSpeed: 1.5,
    floatIntensity: 0.8,
    rotationSpeed: 0.002,
    wireframe: true,
  },
  ai: {
    geometry: "dodecahedron" as const,
    args: [1.2, 1] as [number, number],
    color: "#2bb58e",
    emissive: "#e07cad",
    emissiveIntensity: 0.5,
    distort: 0.35,
    speed: 4,
    roughness: 0.15,
    metalness: 0.85,
    floatSpeed: 1.3,
    floatIntensity: 0.7,
    rotationSpeed: 0.005,
    wireframe: false,
  },
  web3: {
    geometry: "octahedron" as const,
    args: [1.3, 2] as [number, number],
    color: "#9b6ef0",
    emissive: "#e5a820",
    emissiveIntensity: 0.4,
    distort: 0.2,
    speed: 2,
    roughness: 0.05,
    metalness: 0.95,
    floatSpeed: 1.1,
    floatIntensity: 0.5,
    rotationSpeed: 0.003,
    wireframe: false,
  },
};

interface AvatarCoreProps {
  domain: DomainId;
  interactive?: boolean;
}

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

export default function AvatarCore({ domain, interactive }: AvatarCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const config = AVATAR_CONFIGS[domain];

  const springs = useSpring({
    color: config.color,
    emissive: config.emissive,
    emissiveIntensity: config.emissiveIntensity,
    distort: config.distort,
    speed: config.speed,
    roughness: config.roughness,
    metalness: config.metalness,
    config: { mass: 2, tension: 80, friction: 30 },
  });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += config.rotationSpeed;
    meshRef.current.rotation.x += config.rotationSpeed * 0.5;

    const breathe = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    meshRef.current.scale.setScalar(1 + breathe);

    if (interactive) {
      const mouseX = state.pointer.x * 0.15;
      const mouseY = state.pointer.y * 0.15;
      meshRef.current.rotation.y +=
        (mouseX - meshRef.current.rotation.y * 0.1) * delta;
      meshRef.current.rotation.x +=
        (-mouseY - meshRef.current.rotation.x * 0.1) * delta;
    }
  });

  const geometry = useMemo(() => {
    const [radius, detail] = config.args;
    switch (config.geometry) {
      case "octahedron":
        return new THREE.OctahedronGeometry(radius, detail);
      case "dodecahedron":
        return new THREE.DodecahedronGeometry(radius, detail);
      case "icosahedron":
      default:
        return new THREE.IcosahedronGeometry(radius, detail);
    }
  }, [config.geometry, config.args]);

  return (
    <Float
      speed={config.floatSpeed}
      rotationIntensity={0.2}
      floatIntensity={config.floatIntensity}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} geometry={geometry}>
        <AnimatedMeshDistortMaterial
          color={springs.color}
          emissive={springs.emissive}
          emissiveIntensity={springs.emissiveIntensity}
          distort={springs.distort}
          speed={springs.speed}
          roughness={springs.roughness}
          metalness={springs.metalness}
          wireframe={config.wireframe}
          transparent
          opacity={config.wireframe ? 0.8 : 1}
        />
      </mesh>

      <mesh scale={0.7}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={config.color} transparent opacity={0.08} />
      </mesh>
    </Float>
  );
}
