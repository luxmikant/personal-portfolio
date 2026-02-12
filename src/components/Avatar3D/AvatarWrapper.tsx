"use client";

import dynamic from "next/dynamic";
import { DomainId } from "@/utils/domainConfig";

const AvatarScene = dynamic(
  () => import("@/components/Avatar3D/AvatarScene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="w-20 h-20 rounded-full animate-pulse-glow"
          style={{
            background: `radial-gradient(circle, var(--domain-primary) 0%, transparent 70%)`,
            opacity: 0.4,
          }}
        />
      </div>
    ),
  }
);

interface AvatarWrapperProps {
  domain: DomainId;
  size?: "sm" | "md" | "lg";
  className?: string;
  interactive?: boolean;
}

export default function AvatarWrapper(props: AvatarWrapperProps) {
  return <AvatarScene {...props} />;
}
