"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SplashScreen from "@/components/Splash/SplashScreen";
import HeroSectionNew from "@/components/Sections/HeroSectionNew";
import AboutSectionNew from "@/components/Sections/AboutSectionNew";
import ProjectsSection from "@/components/Sections/ProjectsSection";
import HackathonsSection from "@/components/Sections/HackathonsSection";
import ConnectSection from "@/components/Sections/ConnectSection";

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("portfolio_visited") === "true";
    if (hasVisited) {
      setShowSplash(false);
      setShowContent(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowContent(true);
    sessionStorage.setItem("portfolio_visited", "true");
  };

  return (
    <div>
      {/* Phase 1-3: Splash screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Main content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* 1. Hero */}
          <HeroSectionNew />

          {/* 2. About Me */}
          <AboutSectionNew />

          {/* Divider */}
          <div className="section-divider" />

          {/* 3. Projects */}
          <ProjectsSection />

          {/* 4. Hackathons */}
          <HackathonsSection />

          {/* Divider */}
          <div className="section-divider" />

          {/* 5. Connect / Work With Me */}
          <ConnectSection />
        </motion.div>
      )}
    </div>
  );
}
