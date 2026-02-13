# Development Tasks & Checklist

## Phase 1: Scaffolding & Setup (Days 1-2)

### Repository & Environment
- [x] Initialize Next.js 16 project with TypeScript
- [x] Set up folder structure (src/components, src/hooks, src/utils, src/app/)
- [x] Install core dependencies (Framer Motion, React Spring, Motion One, Lenis, Three.js)
- [x] Install additional deps (Barba.js, Lottie Web, Splide.js, AutoAnimate)
- [x] Configure Tailwind CSS v4 with custom @theme inline
- [x] Set up ESLint (eslint-config-next)
- [ ] Create .env.local for config variables *(not needed yet)*

### Base Layout & Navigation
- [x] Create root layout component (src/app/layout.tsx)
- [x] Set up page routes (Landing, Backend, Cloud, AI, Web3)
- [x] Create navigation component (domain-aware, animated active indicator)
- [x] Set up CSS globals (Geist fonts, resets, domain themes, 274 lines)
- [x] Implement domain theme system (CSS custom properties via data-domain)
- [x] Scaffold Barba.js page transition CSS classes

**Deliverable**: ✅ Scaffold compiles, pages load, 6 routes static-prerendered

---

## Phase 2: Avatar & 3D Model (Days 3-4)

### 3D Avatar Model
- [x] ~~Source 3D avatar model~~ → **Procedurally generated** geometric forms per domain
- [x] Create base form model (icosahedron + custom geometry per domain)
- [x] Create 5 domain variant models (landing + 4 main domains)
- [x] Optimize for web (MeshDistortMaterial + React Spring animations)

### Three.js Integration
- [x] Set up React Three Fiber (R3F) + Drei
- [x] Create Avatar component wrapper (AvatarScene, AvatarWrapper)
- [x] Configure lighting, camera, environment
- [x] Implement dynamic import with SSR-safe fallback
- [x] Tested on desktop (mobile to verify in Phase 5)

### Avatar Animations
- [x] Idle animation loop (breathing cycle 3s via sin() in useFrame)
- [x] Form transition animation (React Spring morphs color/distort/metalness per domain)
- [x] Glow effect (CSS + domain-specific colors)
- [x] Float animation (Drei Float component with per-domain intensity)
- [x] Mouse follow interaction (pointer tracking on hero pages)

### Orbital System
- [x] Create AvatarParticles component (orbital particles with per-domain counts)
- [x] Create AvatarRings component (rotating torus rings)
- [x] Integrate into loader (replaces gradient placeholder)

### Loader UI Component
- [x] Create dynamic Loader component
- [x] Build circular progress ring (SVG stroke-dasharray)
- [x] Implement progress counter (0-100%)
- [x] Avatar glow integrated inside ring
- [x] Create loading message variants per domain
- [x] Animate loader entrance/exit with AnimatePresence

**Deliverable**: ✅ Avatar displays with 5 domain-specific forms, loader shows 3D avatar, animations smooth

---

## Phase 3: Landing Page (Day 5)

### UI & Layout
- [x] Create hero section layout (DomainHero component)
- [x] Integrate avatar (3D AvatarWrapper, centered hero placement)
- [x] Add headline + subheading ("Engineer for the Edge")
- [x] Add domain overview cards section (4-column grid)
- [x] Style CTA button ("Begin Journey" with gradient + glow)

### Animations
- [x] Avatar idle animation on load (breathing + float)
- [x] Title fade-in + stagger (0.15s staggerChildren, 0.3s delay)
- [x] Subtitle slide-up (fadeInUp variant)
- [x] Button scale-in (fadeInUp variant)
- [x] Background radial gradient accent per domain

### Styling & Responsiveness
- [x] Apply dark color scheme (#0a0a0f + domain accents)
- [x] Responsive layout (grid 1-col → 2-col → 4-col)
- [ ] Test on multiple screen sizes *(deferred to Phase 5)*
- [ ] Accessibility audit (focus states, alt text) *(deferred to Phase 5)*

### Additional Landing Features
- [x] Loader with progress ring + 3D avatar on first visit
- [x] Session-based loader skip (sessionStorage)
- [x] Contact CTA section (GitHub + email links)
- [x] Domain card hover effects (y: -8, "Explore →" reveal)

**Deliverable**: ✅ Landing page complete with loader, avatar, domain cards, CTA

---

## Phase 4: Domain Pages (Days 6-9)

### Per Domain (Backend, Cloud, AI, Web3):

#### Hero Section
- [x] Avatar display (3D AvatarWrapper with domain-specific form, side-by-side layout)
- [x] Domain heading + subheading (gradient-text title + badge)
- [x] Domain description (from domainConfig.ts)
- [x] Avatar animations active (breathing, float, mouse follow)
- [x] Staggered content reveal (staggerContainer + fadeInUp variants)

#### Project Showcase
- [x] Create ProjectCard component (glass card with tech tags, highlights)
- [x] Build project grid layout (ProjectShowcase component)
- [x] Add real project data (7 projects from GitHub: SharCRM, TraderLens-AI, etc.)
- [x] Hover effects (y: -8 lift + border color shift)
- [x] Staggered card entrance animation (cardStaggerContainer)

#### Skills Section
- [x] Create SkillsSection with proficiency bars
- [x] Progress bar count-up animation on scroll (1s, IntersectionObserver)
- [x] Per-domain skill data (language-specific skills)
- [x] Responsive layout

#### Interactive Demo (per domain)
- [ ] Backend: Animated system architecture diagram
- [ ] Cloud: K8s cluster visualization
- [ ] AI: Agent thought-loop flowchart
- [ ] Web3: Blockchain transaction simulator
> *Note: Interactive demos deferred to future enhancement. Current version uses project showcase + skills as primary content.*

#### Navigation CTAs
- [x] "Next domain" button (DomainHero CTA → next domain page)
- [x] DomainNavigator component (prev/next links + dot pagination)

**Deliverable**: ✅ All 4 domain pages complete with avatar, projects, skills, navigation

---

## Phase 5: Animations & Polish (Days 10-12)

### Scroll Animations
- [x] Integrate Lenis for smooth scroll (SmoothScrollProvider + useSmoothScroll hook)
- [x] Create scroll reveal animations (useScrollAnimation hook, IntersectionObserver)
- [ ] Implement parallax effects (avatar 0.3x speed on scroll)
- [ ] Test animation performance (60 FPS target on desktop + mobile)

### Page Transitions
- [ ] Finalize Barba.js transitions (0.6s cross-fade between domains)
- [ ] Implement loader overlay before domain transitions
- [ ] Create avatar morph effect during page change
- [ ] Fine-tune animation timings

### Micro-Interactions
- [x] Button hover states (scale 1.05 + glow)
- [x] Card hover effects (y: -8 lift, border color)
- [x] Nav active indicator (layoutId spring animation)
- [ ] Link underline animations
- [ ] Icon animations (Lottie)

### Performance Optimization
- [x] Code splitting per page (Next.js static prerendering)
- [x] Dynamic import for Three.js canvas (SSR-safe)
- [ ] Image optimization (WebP, AVIF, responsive sizes)
- [ ] Three.js quality reduction on mobile (lower DPR, fewer particles)
- [ ] Bundle analysis & tree-shaking
- [ ] Lighthouse audit & improvements (target > 90)

### Accessibility
- [ ] WCAG 2.1 AA audit
- [ ] Keyboard navigation test
- [ ] Screen reader testing
- [ ] Color contrast check (domain colors vs dark background)
- [ ] Focus indicator visibility
- [ ] prefers-reduced-motion support for animations

**Deliverable**: Smooth 60fps animations, Lighthouse > 90, accessible

---

## Phase 6: Content & Deployment (Days 13-14)

### Content Population
- [x] Add real project data (SharCRM, TraderLens-AI, Armory-Intelligence, ANPR-YOLOv8, specchain-pro, Connect4, Blockchain-Crypto-Exchange)
- [x] Write project descriptions & highlights (in projectData.ts)
- [ ] Add project screenshots/videos
- [x] Input skills data per domain (in SkillsSection.tsx)
- [x] Write domain descriptions (in domainConfig.ts)

### SEO & Meta
- [x] Basic meta tags per page (title, description via Next.js metadata)
- [ ] Create sitemap.xml
- [ ] Set up robots.txt
- [ ] Add structured data (Schema.org — Person, CreativeWork)
- [ ] Set canonical URLs
- [ ] Create OG images per domain

### Testing & QA
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Responsive breakpoint testing (320px, 768px, 1024px, 1440px)
- [ ] Animation smoothness check (60fps on mid-tier devices)
- [ ] Link verification (all GitHub/project links)
- [ ] 404 handling (custom not-found page)

### Deployment
- [x] Push to GitHub (luxmikant/personal-portfolio)
- [x] Connect to Vercel (auto-deploy from master)
- [x] Deploy to production (live on Vercel)
- [ ] Custom domain setup (optional)
- [ ] Vercel Analytics setup

**Deliverable**: Portfolio live, content complete, SEO optimized

---

## Summary — What's Done vs Remaining

### ✅ Completed (Phases 1-4 + partial 5-6)
- Full Next.js 16 scaffold with TypeScript, Tailwind v4
- 5 domain-specific color themes (CSS custom properties)
- Procedural 3D avatar system (5 forms, particles, rings)
- Loader with 3D avatar + progress ring
- Landing page (hero, domain cards, CTA)
- 4 domain pages (hero + avatar, project showcase, skills, navigation)
- 7 real GitHub projects with tech stacks
- Smooth scroll (Lenis), scroll reveal animations
- Deployed to Vercel (live)

### 🔲 Remaining Work
- Page transition animations (Barba.js integration)
- Parallax scroll effects
- Mobile-specific Three.js optimizations
- Project screenshots/videos
- SEO (sitemap, robots.txt, OG images, structured data)
- Accessibility audit (WCAG 2.1 AA)
- Performance audit (Lighthouse > 90)
- Cross-browser & mobile QA
- Interactive domain demos (stretch goal)
- Custom domain (optional)
- [ ] Custom domain setup (if applicable)
- [ ] Monitor for errors (Vercel Analytics)

**Deliverable**: Live portfolio, fully functional, SEO ready
