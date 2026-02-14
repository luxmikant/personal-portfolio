"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Project } from "@/utils/projectData";
import {
  slideInLeft,
  slideInRight,
  scaleRotate,
  expandIn,
} from "@/utils/animationConfig";
import { useRef } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll-based parallax effect
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Cycle through different animation variants
  const getAnimationVariant = () => {
    const variants = [slideInLeft, slideInRight, scaleRotate, expandIn];
    return variants[index % variants.length];
  };

  const animationVariant = getAnimationVariant();

  return (
    <motion.div
      ref={cardRef}
      className="glass rounded-2xl overflow-hidden group cursor-pointer relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={animationVariant}
      whileHover={{
        y: -12,
        scale: 1.02,
        rotateZ: index % 2 === 0 ? 1 : -1,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Animated glow effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            "radial-gradient(circle at 50% 0%, var(--domain-glow), transparent 70%)",
        }}
      />

      {/* Card top accent bar with animated gradient */}
      <motion.div
        className="h-1 w-full relative overflow-hidden"
        style={{
          background: `linear-gradient(90deg, var(--domain-primary), var(--domain-secondary))`,
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, var(--foreground), transparent)`,
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3,
          }}
        />
      </motion.div>

      <div className="p-6 md:p-8 relative">
        {/* Title + links */}
        <div className="flex items-start justify-between mb-4">
          <motion.h3
            className="text-xl font-bold text-foreground group-hover:text-domain-primary transition-colors"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {project.title}
          </motion.h3>
          <div className="flex gap-2">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-muted hover:text-domain-primary transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                GitHub ↗
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-muted hover:text-domain-primary transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                Live ↗
              </motion.a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm mb-5 leading-relaxed">{project.description}</p>

        {/* Tech stack with stagger animation */}
        <motion.div
          className="flex flex-wrap gap-2 mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {project.techStack.map((tech, i) => (
            <motion.span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono rounded-md"
              style={{
                background: "var(--surface-light)",
                color: "var(--domain-primary)",
                border: "1px solid var(--border)",
              }}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "var(--domain-primary)",
                color: "var(--background)",
                transition: { duration: 0.2 },
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Highlights with reveal animation */}
        <motion.ul
          className="space-y-1.5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {project.highlights.slice(0, 3).map((highlight, i) => (
            <motion.li
              key={i}
              className="text-xs flex items-start gap-2"
              style={{ color: "var(--muted)" }}
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <motion.span
                style={{ color: "var(--domain-primary)" }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                ▸
              </motion.span>
              {highlight}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}
