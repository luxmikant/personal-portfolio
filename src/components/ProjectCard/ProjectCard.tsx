"use client";

import { motion } from "framer-motion";
import { Project } from "@/utils/projectData";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="glass rounded-2xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Card top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, var(--domain-primary), var(--domain-secondary))`,
        }}
      />

      <div className="p-6 md:p-8">
        {/* Title + links */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-domain-primary transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-muted hover:text-domain-primary transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub ↗
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-muted hover:text-domain-primary transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                Live ↗
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm mb-5 leading-relaxed">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono rounded-md"
              style={{
                background: "var(--surface-light)",
                color: "var(--domain-primary)",
                border: "1px solid var(--border)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <ul className="space-y-1.5">
          {project.highlights.slice(0, 3).map((highlight, i) => (
            <li
              key={i}
              className="text-xs flex items-start gap-2"
              style={{ color: "var(--muted)" }}
            >
              <span style={{ color: "var(--domain-primary)" }}>▸</span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
