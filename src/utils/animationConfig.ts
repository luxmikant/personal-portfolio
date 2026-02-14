// Animation configuration — centralized timing and easing values
export const ANIMATION = {
  // Page transitions
  pageTransition: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1] as const, // ease-out-expo
  },

  // Domain transitions (loader + morph)
  domainTransition: {
    loaderDuration: 2.5, // seconds
    morphDuration: 1.2,
    totalDuration: 3.7,
  },

  // Hero section stagger
  heroReveal: {
    staggerChildren: 0.15,
    delayChildren: 0.3,
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1] as const,
  },

  // Project cards
  cardReveal: {
    staggerChildren: 0.1,
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1] as const,
  },

  // Scroll animations
  scrollReveal: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1] as const,
    threshold: 0.1, // trigger when 10% visible
  },

  // Avatar animations
  avatar: {
    idleDuration: 3, // breathing cycle
    hoverGlowDuration: 0.3,
    landingBounceDuration: 0.5,
    parallaxFactor: 0.15,
  },

  // Micro-interactions
  micro: {
    buttonHover: { scale: 1.05, duration: 0.2 },
    cardHover: { y: -8, duration: 0.3 },
    linkUnderline: { duration: 0.3 },
  },
} as const;

// Framer Motion variants (reusable)
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION.heroReveal.duration,
      ease: ANIMATION.heroReveal.ease,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION.heroReveal.staggerChildren,
      delayChildren: ANIMATION.heroReveal.delayChildren,
    },
  },
};

export const cardStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION.cardReveal.staggerChildren,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: ANIMATION.heroReveal.ease,
    },
  },
};

// Advanced scroll animations for project cards
export const slideInLeft = {
  hidden: { opacity: 0, x: -60, rotate: -3 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60, rotate: 3 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const scaleRotate = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const flipIn = {
  hidden: { opacity: 0, rotateY: 90, scale: 0.9 },
  visible: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const expandIn = {
  hidden: { opacity: 0, scaleX: 0.5, scaleY: 0.8 },
  visible: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};
