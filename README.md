# Luxmikant Portfolio

Interactive single-page portfolio focused on Backend, Cloud, AI, and Web3.
Built with a storytelling scroll flow, cinematic motion, and a scroll-linked 3D avatar.

## Highlights

- Single-page storytelling flow: Hero -> About -> Domains -> Projects -> Skills -> Philosophy -> Contact
- Scroll-linked 3D avatar that morphs by domain
- Canvas-based GlowingGrid background for better performance
- Warm light visual theme with domain-aware color accents
- Smooth scrolling and section-aware navigation
- SEO metadata, `robots.txt`, and sitemap support

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion + React Spring
- Three.js + React Three Fiber + Drei
- Lenis smooth scrolling

## Project Structure

```text
src/
	app/
		LandingPage.tsx
		page.tsx
		layout.tsx
	components/
		Avatar3D/
		GlowingGrid/
		Navigation/
		ProjectCard/
		Sections/
	utils/
		animationConfig.ts
		domainConfig.ts
		projectData.ts
		siteConfig.ts
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build and Verify

```bash
npm run build
npm run start
```

## Configuration Notes

- Site metadata and canonical base URL: `src/utils/siteConfig.ts`
- Domain colors and order: `src/utils/domainConfig.ts`
- Project content: `src/utils/projectData.ts`
- Contact CTA (Typeform): `src/components/Sections/FooterSection.tsx`

## Documentation

Project planning and progress notes are available in `docs/`:

- `docs/PLAN.md`
- `docs/REQUIREMENTS.md`
- `docs/TASKS.md`
- `docs/TECHNICAL_DECISIONS.md`
- `docs/DEV_LOGS.md`
- `docs/PROGRESS.md`
