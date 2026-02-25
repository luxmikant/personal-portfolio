"use client";

import { motion } from "framer-motion";
import { DomainId, DOMAINS } from "@/utils/domainConfig";
import { getProjectsByDomain } from "@/utils/projectData";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { fadeInUp, staggerContainer, parallaxReveal } from "@/utils/animationConfig";

interface DomainProjectsSectionProps {
  domain: DomainId;
}

export default function DomainProjectsSection({ domain }: DomainProjectsSectionProps) {
  const projects = getProjectsByDomain(domain);
  const config = DOMAINS[domain];

  if (projects.length === 0) return null;

  return (
    <section
      id={domain}
      className="py-24 px-6 scroll-mt-20"
      data-domain={domain}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: config.colors.primary,
                boxShadow: `0 0 8px ${config.colors.glow}`,
              }}
            />
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: config.colors.primary }}
            >
              {config.subtitle}
            </span>
          </motion.div>

          <motion.h2 variants={parallaxReveal}>
            <span style={{ color: config.colors.primary }}>{config.title}</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-base md:text-lg mt-3 max-w-2xl">
            {config.description}
          </motion.p>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
}
