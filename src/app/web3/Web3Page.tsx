"use client";

import { motion } from "framer-motion";
import DomainHero from "@/components/Sections/DomainHero";
import ProjectShowcase from "@/components/Sections/ProjectShowcase";
import SkillsSection from "@/components/Sections/SkillsSection";
import DomainNavigator from "@/components/Sections/DomainNavigator";

export default function Web3Page() {
  return (
    <motion.div
      data-domain="web3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <DomainHero domain="web3" />
      <ProjectShowcase domain="web3" />
      <SkillsSection domain="web3" />
      <DomainNavigator currentDomain="web3" />
    </motion.div>
  );
}
