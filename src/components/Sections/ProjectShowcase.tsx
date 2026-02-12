"use client";

import { motion } from "framer-motion";
import { DomainId } from "@/utils/domainConfig";
import { getProjectsByDomain } from "@/utils/projectData";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { fadeInUp } from "@/utils/animationConfig";

interface ProjectShowcaseProps {
  domain: DomainId;
}

export default function ProjectShowcase({ domain }: ProjectShowcaseProps) {
  const projects = getProjectsByDomain(domain);

  if (projects.length === 0) return null;

  return (
    <section className="py-20 px-6" data-domain={domain}>
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-foreground mb-3">Featured Projects</h2>
          <p className="text-base max-w-xl mx-auto">
            Real-world systems I&apos;ve designed and built.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
