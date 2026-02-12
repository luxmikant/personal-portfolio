# Development Tasks & Checklist

## Phase 1: Scaffolding & Setup (Days 1-2)

### Repository & Environment
- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Set up folder structure (src/components, src/pages, src/styles, docs/)
- [ ] Install core dependencies (Framer Motion, React Spring, Motion One, Lenis, Three.js)
- [ ] Install additional deps (Barba.js, Lottie Web, Splide.js, AutoAnimate)
- [ ] Configure Tailwind CSS with custom theme
- [ ] Set up ESLint & Prettier
- [ ] Create .env.local for config variables

### Base Layout & Navigation
- [ ] Create root layout component (src/app/layout.tsx)
- [ ] Set up page routes (Landing, Backend, Cloud, AI, Web3)
- [ ] Create navigation component (subtle, accessible, domain-aware)
- [ ] Set up CSS globals (fonts, resets, base styles)
- [ ] Implement domain theme system (CSS variables per domain)
- [ ] Configure Barba.js for page transitions

**Deliverable**: Scaffold compiles, pages load, transitions work

---

## Phase 2: Avatar & 3D Model (Days 3-4)

### 3D Avatar Model
- [ ] Source 3D avatar model (GLTF/GLB format, < 500KB)
- [ ] Create base form model
- [ ] Create 4 domain variant models (or morph targets)
- [ ] Optimize models for web (compress, reduce polygons)

### Three.js Integration
- [ ] Set up React Three Fiber (R3F) + Drei
- [ ] Create Avatar component wrapper
- [ ] Configure lighting, camera, environment
- [ ] Implement model loading with suspense/fallback
- [ ] Test on desktop & mobile

### Avatar Animations
- [ ] Idle animation loop (breathing/floating, 3s cycle)
- [ ] Form transition animation (morph between domains, 1s)
- [ ] Hover glow effect (0.3s)
- [ ] Landing bounce animation (0.5s)
- [ ] Scroll parallax (minor movement)

### Loader UI Component
- [ ] Create Loader component
- [ ] Build circular progress ring (SVG stroke-dasharray)
- [ ] Implement progress counter (0-100%)
- [ ] Add pulsing glow effect
- [ ] Create loading message variants per domain
- [ ] Animate loader entrance/exit

**Deliverable**: Avatar displays, loader functional, animations smooth

---

## Phase 3: Landing Page (Day 5)

### UI & Layout
- [ ] Create hero section layout
- [ ] Integrate avatar (center/hero placement)
- [ ] Add headline + subheading ("Building for niche domains")
- [ ] Add philosophy statement
- [ ] Style CTA button ("Begin Journey")

### Animations
- [ ] Avatar idle animation on load
- [ ] Title fade-in + stagger (0.4s)
- [ ] Subtitle slide-up (0.3s)
- [ ] Button scale-in (0.3s)
- [ ] Background subtle animation (optional grid/particles)

### Styling & Responsiveness
- [ ] Apply base color scheme
- [ ] Mobile-first responsive layout
- [ ] Test on multiple screen sizes
- [ ] Accessibility (focus states, alt text)

**Deliverable**: Landing page complete, responsive, animations polished

---

## Phase 4: Domain Pages (Days 6-9)

### Per Domain (Repeat for Backend, Cloud, AI, Web3):

#### Hero Section
- [ ] Avatar display (3D model with domain form)
- [ ] Domain heading + subheading
- [ ] Domain description (2-3 sentences)
- [ ] Avatar minor animations active
- [ ] Staggered content reveal (1.5s)

#### Project Showcase
- [ ] Create ProjectCard component
- [ ] Build project grid layout
- [ ] Add project data (title, description, tech stack, links)
- [ ] Hover effects (lift, color shift)
- [ ] Staggered card entrance animation

#### Skills Section
- [ ] Create skill list with proficiency bars
- [ ] Progress bar count-up animation on scroll (1s)
- [ ] Skill category grouping
- [ ] Responsive layout (2-3 columns)

#### Interactive Demo (per domain)
- [ ] Backend: Animated system architecture diagram
- [ ] Cloud: K8s cluster visualization
- [ ] AI: Agent thought-loop flowchart
- [ ] Web3: Blockchain transaction simulator

#### Navigation CTAs
- [ ] "Next domain" button (transition trigger)
- [ ] Section skip nav (go to any domain)

**Deliverable**: All 4 domain pages complete with content & animations

---

## Phase 5: Animations & Polish (Days 10-12)

### Scroll Animations
- [ ] Integrate Lenis for smooth scroll
- [ ] Create scroll reveal animations (Motion One)
- [ ] Implement parallax effects (0.3x speed)
- [ ] Test animation performance (60 FPS target)

### Page Transitions
- [ ] Finalize Barba.js transitions (0.6s cross-fade)
- [ ] Implement loader before transitions
- [ ] Create avatar transition effects between domains
- [ ] Fine-tune animation timings

### Micro-Interactions
- [ ] Button hover states (Motion One)
- [ ] Link underlines (Framer Motion)
- [ ] Card hover effects (React Spring)
- [ ] Icon animations (Lottie)

### Performance Optimization
- [ ] Code splitting per page (Next.js dynamic imports)
- [ ] Image optimization (WebP, AVIF, responsive sizes)
- [ ] Three.js quality reduction on mobile
- [ ] Bundle analysis & tree-shaking
- [ ] Lighthouse audit & improvements

### Accessibility
- [ ] WCAG 2.1 AA audit
- [ ] Keyboard navigation test
- [ ] Screen reader testing
- [ ] Color contrast check
- [ ] Focus indicator visibility

**Deliverable**: Smooth 60fps animations, Lighthouse > 90, accessible

---

## Phase 6: Content & Deployment (Days 13-14)

### Content Population
- [ ] Add real project data (SharCRM, TraderLens-AI, Armory-Intelligence, etc.)
- [ ] Write project descriptions & case studies
- [ ] Add project screenshots/videos
- [ ] Input skills data per domain
- [ ] Write domain philosophy statements

### SEO & Meta
- [ ] Meta tags per page (title, description, OG tags)
- [ ] Create sitemap.xml
- [ ] Set up robots.txt
- [ ] Add structured data (Schema.org)
- [ ] Set canonical URLs
- [ ] OG images per domain

### Testing & QA
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS, Android)
- [ ] Responsive breakpoint testing
- [ ] Animation smoothness check
- [ ] Link verification
- [ ] 404 handling

### Deployment
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Deploy to production
- [ ] Custom domain setup (if applicable)
- [ ] Monitor for errors (Vercel Analytics)

**Deliverable**: Live portfolio, fully functional, SEO ready
