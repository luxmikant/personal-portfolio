"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SplitLoader from "@/components/Loader/SplitLoader";
import HeroSection from "@/components/Sections/HeroSection";
import AboutSection from "@/components/Sections/AboutSection";
import DomainsOverview from "@/components/Sections/DomainsOverview";
import DomainProjectsSection from "@/components/Sections/DomainProjectsSection";
import SkillsSection from "@/components/Sections/SkillsSection";
import RecommendationsSection from "@/components/Sections/RecommendationsSection";
import FooterSection from "@/components/Sections/FooterSection";
import ScrollAvatar from "@/components/Avatar3D/ScrollAvatar";

export default function LandingPage() {
  // Fix hydration: read sessionStorage only in useEffect
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("portfolio_visited") === "true";
    if (hasVisited) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setShowContent(true);
    sessionStorage.setItem("portfolio_visited", "true");
  };

  return (
    <div data-domain="landing">
      <SplitLoader
        domain="landing"
        isLoading={isLoading}
        onComplete={handleLoaderComplete}
        duration={3000}
      />

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Scroll-linked floating avatar (desktop) */}
          <ScrollAvatar />

          {/* ===== Storytelling flow ===== */}

          {/* 1. Hero */}
          <HeroSection />

          {/* 2. About */}
          <AboutSection />

          {/* 3. Domains Overview */}
          <DomainsOverview />

          {/* 4. Domain Project Sections */}
          <DomainProjectsSection domain="backend" />
          <DomainProjectsSection domain="cloud" />
          <DomainProjectsSection domain="ai" />
          <DomainProjectsSection domain="web3" />

          {/* 5. Skills */}
          <SkillsSection />

          {/* 6. Engineering Philosophy */}
          <RecommendationsSection />

          {/* 7. Footer / Contact */}
          <FooterSection />
        </motion.div>
      )}
    </div>
  );
}
