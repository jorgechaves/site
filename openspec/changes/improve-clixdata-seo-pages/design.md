## Context

The current ClixData site is a static pt-BR marketing site served from the repository root. It has one homepage with service cards, lead capture, brand imagery, JavaScript enhancements, and Vercel configuration for clean URLs. This change expands the static site into a small SEO landing-page set while preserving the existing lightweight architecture.

The main constraint is that the site should remain simple to host and maintain. The implementation should avoid adding a framework unless static HTML duplication becomes unmanageable. Service pages must use truthful ClixData content and must not invent testimonials, clients, case metrics, awards, or performance claims.

## Goals / Non-Goals

**Goals:**
- Create crawlable service URLs for `/business-intelligence`, `/banco-de-dados`, `/etl-elt`, and `/infraestrutura-de-dados`.
- Give each URL unique title, meta description, H1, canonical URL, Open Graph metadata, structured data, FAQ content, and service-specific copy.
- Preserve the existing homepage as the main brand entry point and link it clearly to each service page.
- Add `robots.txt`, `sitemap.xml`, and branded social preview image support.
- Improve performance and accessibility of logo/social image usage.

**Non-Goals:**
- No blog, CMS, or database-backed content management.
- No fabricated case studies, client logos, testimonials, star ratings, or numerical claims.
- No paid-search landing-page tracking or analytics setup unless requested separately.
- No redesign of the whole brand beyond SEO-driven content and page structure changes.

## Decisions

1. Use static HTML service pages with clean URLs.
   - Rationale: The existing project is static and already supports clean URLs through hosting configuration. Static pages keep deployment simple and fast.
   - Alternative considered: Introduce a framework or templating build step. Rejected for this change because the page count is small and the extra build complexity is not needed.

2. Keep homepage content concise and use service pages for deeper keyword targeting.
   - Rationale: The homepage should stay focused on brand, value proposition, service overview, trust content, and conversion. Dedicated pages can target long-tail commercial queries without making the homepage overly dense.
   - Alternative considered: Put all SEO copy in expanded homepage sections. Rejected because it weakens URL-level keyword relevance.

3. Use unique metadata and JSON-LD per page.
   - Rationale: Each service should have its own search snippet, canonical URL, social card metadata, and Service schema describing that offering.
   - Alternative considered: Use the same metadata across pages. Rejected because duplicate metadata reduces SEO clarity and share quality.

4. Add one branded Open Graph image asset shared by all pages initially.
   - Rationale: A single strong branded image improves link previews quickly and avoids maintaining multiple graphics. It can later be expanded into service-specific OG images.
   - Alternative considered: Create one OG image per service now. Deferred because content structure is the higher-value first step.

5. Generate or hand-author `sitemap.xml` and `robots.txt` as static files.
   - Rationale: The site is small and static, so static crawl files are reliable and easy to verify.
   - Alternative considered: Generate sitemap dynamically. Rejected because there is no runtime routing layer.

## Risks / Trade-offs

- Duplicate service page markup can drift over time -> Keep shared layout patterns consistent and limit page-specific differences to content, metadata, schema, and active navigation.
- Keyword stuffing can reduce quality -> Use natural pt-BR copy that answers visitor questions and avoids repetitive forced keywords.
- Static sitemap can become stale when new pages are added -> Include sitemap updates in the implementation checklist for any new SEO page.
- Clean URL behavior can differ locally vs hosted -> Validate both direct file access where practical and hosted/static-server clean URL behavior before release.
- Social preview image text can become outdated -> Keep OG image generic to ClixData's core offer rather than naming a single service.

## Migration Plan

1. Add service pages and update homepage links without removing existing homepage anchors.
2. Add metadata, schema, sitemap, robots, and image assets.
3. Validate local navigation, metadata presence, no broken images, and sitemap URL list.
4. Deploy normally after verification.
5. Rollback by reverting the static pages, metadata additions, and crawl files if search/social behavior regresses.

## Open Questions

- What production canonical domain should be used if it differs from `https://clixdata.com.br/`?
- Should the first OG image use the existing logo only, or a more polished dashboard-style social card?
- Does ClixData want to expose email-only contact on service pages or add WhatsApp/LinkedIn links once official URLs are confirmed?
