"use client";

import { motion } from "framer-motion";
import DomainHero from "@/components/Sections/DomainHero";
import ProjectShowcase from "@/components/Sections/ProjectShowcase";
import SkillsSection from "@/components/Sections/SkillsSection";
import DomainNavigator from "@/components/Sections/DomainNavigator";

export default function AIPage() {
  return (
    <motion.div
      data-domain="ai"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <DomainHero domain="ai" />
      <ProjectShowcase domain="ai" />
      <SkillsSection domain="ai" />
      <DomainNavigator currentDomain="ai" />
    </motion.div>
  );
}
