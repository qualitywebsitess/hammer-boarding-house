# Hammer Boarding House — Project Instructions

This file is the permanent instruction and context file for this project. Read it before doing any work.

## Project Overview

**Name:** Hammer Boarding House
**Type:** Student boarding house website

**Purpose:** A professional, modern, student-friendly website that helps Hammer Boarding House attract prospective tenants, communicate important information, show room availability, and allow interested students to contact management through WhatsApp.

**Priorities:**
- Student-friendly design
- Affordable and welcoming feeling
- Professional visual quality
- Excellent mobile experience
- Fast performance
- Accessibility
- SEO
- Easy maintenance
- Simple deployment
- Clear calls to action
- Room availability
- WhatsApp enquiries

## Design Direction

The website should feel: student-friendly, affordable, welcoming, safe, comfortable, clean, modern, trustworthy.

It should **not** feel like: an expensive luxury hotel, a corporate website, a generic AI-generated template, or an overly complicated booking platform.

The final result should look like a professionally designed commercial website that could realistically be presented to a paying client.

## Development Principles

1. Do not invent business information.
2. Do not assume missing information.
3. If information is ambiguous, flag it rather than guessing.
4. Prefer simple solutions over unnecessary complexity.
5. Avoid unnecessary dependencies.
6. Do not add a database, authentication, payment system, admin dashboard, or backend unless genuinely required.
7. Do not over-engineer the project.
8. Build reusable components where appropriate.
9. Keep the code clean and maintainable.
10. Mobile-first responsive design is required.
11. Accessibility should be considered throughout development.
12. SEO should be considered throughout development.
13. Optimize images and performance.
14. Avoid excessive animations and visual effects.
15. Do not create fake testimonials, reviews, awards, statistics, photographs, addresses, amenities, prices, or policies.
16. Never modify unrelated parts of the project when fixing a specific issue.
17. Before major implementation, inspect the existing project and understand its structure.
18. For major features, plan before implementing.
19. After implementation, verify that the build works and check for errors.
20. Prefer one complete, coherent implementation over many small experimental changes.

## Claude Code Usage Principles

- Minimize unnecessary exploration.
- Do not repeatedly summarize information already contained in this file.
- Do not create unnecessary sub-agents.
- Do not install packages without a clear reason.
- Do not rebuild working features unnecessarily.
- Combine related tasks when practical.
- Make decisions based on the complete project context rather than asking unnecessary questions.
- When information is genuinely missing and affects correctness, ask for clarification rather than inventing it.

## Current Status

Built as a static Astro site (single landing page, no backend). The UI implements the approved Google Stitch design, project **Hammer Boarding House Student Portal**, screen **Hammer Boarding House - Landing Page** — that screen is the visual source of truth.

**Stack:** Astro + `@astrojs/sitemap` + self-hosted Inter (`@fontsource-variable/inter`). No CSS framework, no icon library, no JS framework.

**Design system:** `src/styles/global.css` holds every token (terracotta `#9f402d` primary on warm off-white `#fbf9f8`, Inter throughout, Stitch spacing/radius/shadow scale). Restyle from tokens there rather than editing components.

**Content rule:** all real-world facts come from `src/data/site.ts`, which mirrors `CLIENT_REQUIREMENTS.md`. The Stitch screen contains placeholder content that is *not* client-verified (a "Single Room" tab, a per-room "K2,000/mo" price, "Book Now", Privacy/Terms links). That content was deliberately not implemented — the no-invention rules above take precedence over the design mock.

**Images:** every image is a named slot in `src/data/images.ts`. Dropping a correctly named file into `src/assets/images/` (or `src/assets/images/gallery/`) replaces the "Photography coming soon" placeholder with an optimised image. No code changes needed.

**Before publishing:** resolve the outstanding client clarifications listed at the end of `CLIENT_REQUIREMENTS.md`, and set the real domain in `astro.config.mjs` (currently a placeholder).
