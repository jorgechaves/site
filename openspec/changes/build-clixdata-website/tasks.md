## 1. Project Scaffolding

- [x] 1.1 Create directory structure: `assets/css/`, `assets/js/`, `assets/img/`
- [x] 1.2 Create `index.html` with semantic HTML5 skeleton (head meta, viewport, title, lang="pt-BR", landmarks: header/nav, main, footer)
- [x] 1.3 Add SEO/social meta tags (description, Open Graph, theme-color) for ClixData Dados & Infra
- [x] 1.4 Link `assets/css/styles.css` and `assets/js/main.js` (defer JS)

## 2. Design System & Layout

- [x] 2.1 Define CSS custom properties in `:root` (Facebook #1877F2, LinkedIn #0A66C2, neutrals, spacing, radius, shadows, fonts)
- [x] 2.2 Add base/reset styles, typography scale, and container utilities
- [x] 2.3 Implement responsive breakpoints (mobile <768px, tablet, desktop ≥1024px)
- [x] 2.4 Add `prefers-reduced-motion` media query to disable non-essential animations

## 3. Navigation Header

- [x] 3.1 Build sticky top nav with ClixData wordmark/logo and links (Serviços, Sobre, Contato)
- [x] 3.2 Implement smooth anchor scrolling to sections
- [x] 3.3 Implement mobile hamburger toggle menu with open/close behavior

## 4. Hero Section

- [x] 4.1 Build hero with headline, subheadline (value proposition), and primary CTA ("Fale Conosco")
- [x] 4.2 Wire CTA to scroll to the Contact section
- [x] 4.3 Add animated data/dashboard-themed hero visual (CSS/SVG, gradient background)

## 5. Services Showcase

- [x] 5.1 Build Services section with four cards: Administração de Banco de Dados, Desenvolvimento de Dashboards de BI, ETL/ELT, Administração de Infraestrutura de Dados
- [x] 5.2 Add title, description, and icon (inline SVG) to each service card
- [x] 5.3 Visually emphasize BI Dashboard Development as the flagship/featured service
- [x] 5.4 Add hover effects to service cards

## 6. About / Expertise Section

- [x] 6.1 Build About section with short company description
- [x] 6.2 Highlight SQL and Python as core competencies (skill badges/cards)

## 7. Contact / Lead Capture

- [x] 7.1 Build Contact section with form fields: name, email, message (required)
- [x] 7.2 Add client-side validation (required fields + email format) with inline error messages
- [x] 7.3 Configure submission endpoint constant (form service) with honeypot anti-spam field and `mailto:` fallback
- [x] 7.4 Show success confirmation message on successful submission
- [x] 7.5 Display company contact details / professional links alongside the form

## 8. Footer & Polish

- [x] 8.1 Add footer with company name and dynamic current-year copyright
- [x] 8.2 Implement scroll-reveal animations via IntersectionObserver for sections
- [x] 8.3 Verify WCAG AA contrast for key text/background and button combinations

## 9. Verification & Deployment

- [x] 9.1 Test responsiveness across mobile/tablet/desktop viewports
- [x] 9.2 Test form validation (success and error paths) and reduced-motion behavior
- [x] 9.3 Validate HTML and check for console errors; serve locally to confirm
- [x] 9.4 Update `README.md` with project overview and local-run/deploy instructions
- [x] 9.5 Commit and push to `main`; document static hosting setup (GitHub Pages/Netlify/Vercel)
