## Context

ClixData Dados & Infra needs a greenfield marketing website. The repo (`site`) is initialized and pushed to GitHub. There is no existing frontend code, framework, or design system. The deliverable is a static, fast-loading, single-page marketing site that is modern, interactive, responsive, and uses a Facebook/LinkedIn-inspired blue palette. The audience is potential B2B clients seeking data/BI services. Primary conversion goal: lead capture via a contact form.

## Goals / Non-Goals

**Goals:**
- A polished single-page site covering hero, services, about/expertise, and contact.
- BI dashboard development emphasized as the flagship service; SQL & Python highlighted.
- Modern interactivity: scroll-reveal animations, hover effects, animated hero, smooth scrolling, responsive nav.
- Facebook/LinkedIn blue brand palette with WCAG AA contrast and reduced-motion support.
- Easy to deploy to static hosting (GitHub Pages / Netlify / Vercel).
- Maintainable, dependency-light codebase.

**Non-Goals:**
- No CMS, blog, authentication, or client portal.
- No backend application server; the contact form uses a third-party form service or `mailto` fallback.
- No multi-page routing or i18n framework (content is primarily Portuguese).
- No e-commerce or payment integration.

## Decisions

### Decision 1: Vanilla HTML/CSS/JS (no heavy framework)
Build the site as a single `index.html` with modular CSS and a small `main.js`. 
- **Why**: The site is a static single-page brochure. Vanilla keeps the bundle tiny, removes build complexity, and deploys anywhere with zero config — ideal for fast load and simple maintenance.
- **Alternatives considered**: React/Vite (overkill for a static brochure, adds build + bundle weight); Astro (great fit, but adds tooling the client may not maintain). Vanilla wins for simplicity; the structure stays easy to migrate to a framework later if needed.

### Decision 2: Design system via CSS custom properties
Define brand tokens (`--fb-blue: #1877F2`, `--li-blue: #0A66C2`, neutrals, spacing, radius, shadows) in `:root`.
- **Why**: Centralizes the palette so the Facebook/LinkedIn blues are applied consistently and are easy to tweak. Supports AA contrast verification.
- **Alternative**: Hardcoded colors per element — rejected (inconsistent, hard to maintain).

### Decision 3: Scroll animations via IntersectionObserver + CSS, guarded by `prefers-reduced-motion`
- **Why**: Native, performant, dependency-free reveal animations. The media query disables non-essential motion for accessibility.
- **Alternative**: AOS/GSAP libraries — rejected to avoid dependencies for simple effects.

### Decision 4: Animated hero with CSS/SVG (data-themed visual)
A gradient hero with an animated data/dashboard-style SVG or CSS shapes (e.g., floating chart bars/lines).
- **Why**: Communicates the BI/data theme dynamically without large assets.

### Decision 5: Contact form via progressive enhancement
The form posts to a form-handling service (e.g., Formspree/Netlify Forms) with client-side validation; a `mailto:` link serves as a no-JS/no-service fallback. The endpoint is configurable via a single constant.
- **Why**: No backend to maintain; still captures leads reliably. Validation gives immediate feedback.
- **Alternative**: Custom backend — rejected as out of scope (Non-Goals).

### Decision 6: File structure
```
index.html
assets/
  css/styles.css
  js/main.js
  img/ (logo, icons or inline SVG)
README.md
```
- **Why**: Clear separation, simple to host, no build step.

## Risks / Trade-offs

- **No build step means no automatic asset optimization** → Keep assets small, use inline SVG and system/Google fonts loaded efficiently; defer non-critical JS.
- **Third-party form service dependency / spam** → Make endpoint configurable, add basic honeypot field; provide `mailto:` fallback if the service is unavailable.
- **Heavy animations could hurt performance on low-end devices** → Use CSS transforms/opacity only, throttle observers, respect reduced-motion.
- **Brand palette contrast** → Use darker LinkedIn blue (#0A66C2) for text-on-light and white text on blue buttons to satisfy WCAG AA; verify key combos.
- **SEO/accessibility for a JS-driven page** → Content is in static HTML (not JS-rendered), semantic landmarks, alt text, and meta tags included.

## Migration Plan

This is greenfield; no data migration. Deployment:
1. Implement files and validate locally (open `index.html` / simple static server).
2. Configure the contact form endpoint constant.
3. Commit and push to `main`.
4. Enable static hosting (GitHub Pages from `main`, or connect Netlify/Vercel).
Rollback: revert the commit; the site is static with no stateful dependencies.

## Open Questions

These were raised during a grilling/interview pass. The user was unavailable, so each
has been resolved with a documented default decision that can be revisited later.

- **Tech stack** → RESOLVED: Vanilla HTML/CSS/JS, no build step (see Decision 1). Best fit for a static brochure; easiest to host and maintain.
- **Contact email / form service** → RESOLVED: Use a configurable endpoint constant (e.g., Formspree) with a `mailto:` fallback to a placeholder address (`contato@clixdata.com.br`) until the real address/service is confirmed.
- **Logo asset** → RESOLVED: Use a text/SVG wordmark ("ClixData Dados & Infra") initially; swap in a real logo asset later if provided.
- **Contact channels** → RESOLVED: Feature email + LinkedIn placeholder links in the Contact section; add WhatsApp later if the client provides a number.
- **Language** → RESOLVED: Content in Portuguese (pt-BR), matching the company's market.
- **Hosting target** → RESOLVED: Default to GitHub Pages from `main` (repo already on GitHub); Netlify/Vercel remain compatible alternatives with no code changes.

Still genuinely pending real input (non-blocking placeholders used):
- Real contact email address, phone/WhatsApp number, and social profile URLs.
- Real logo asset, if one exists.
