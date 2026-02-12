"use client";

import { motion } from "framer-motion";
import DomainHero from "@/components/Sections/DomainHero";
import ProjectShowcase from "@/components/Sections/ProjectShowcase";
import SkillsSection from "@/components/Sections/SkillsSection";
import DomainNavigator from "@/components/Sections/DomainNavigator";

export default function BackendPage() {
  return (
    <motion.div
      data-domain="backend"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <DomainHero domain="backend" />
      <ProjectShowcase domain="backend" />
      <SkillsSection domain="backend" />
      <DomainNavigator currentDomain="backend" />
    </motion.div>
  );
}
