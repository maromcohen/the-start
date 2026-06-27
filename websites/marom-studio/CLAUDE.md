# CLAUDE.md — MAROM Digital Studio

## Project Overview

Portfolio website for MAROM Digital Studio — boutique premium web design & development studio, Tel Aviv.

## Tech Stack

- Single HTML file (`index.html` at repo root) — no build system
- GSAP 3.12.5 + ScrollTrigger from CDN (cdnjs.cloudflare.com) — NEVER use local asset files
- Google Fonts: Inter (100-700) + Marcellus
- Vanilla JavaScript, CSS custom properties
- GitHub Pages for hosting (main branch, root directory)

## Design Language

- **Style:** Apple-like minimalist, Active Theory inspired
- **Background:** #fafafa | **Text:** #111 | **Muted:** #888
- **Font:** Inter (100-700), Marcellus for serif
- **Easing:** cubic-bezier(.32,.72,0,1)
- Custom circle cursor (desktop), film grain overlay (opacity .025)

## Site Sections (in order)

1. **Particle Intro** — Dark overlay, 280 particles form "M", text fades in, particles disperse to float throughout site
2. **Hero** — Full viewport, "MAROM" headline, scroll indicator
3. **About** (#about) — Split: monogram left, text right
4. **Services** (#services) — 3 cards: Web Design, Development, Brand Identity
5. **Work** (#work) — Portfolio grid (Cocktails & Dreams + 2 placeholders)
6. **Process** (#process) — 4 steps: Discovery, Design, Develop, Launch
7. **Contact** (#contact) — WhatsApp CTA, email, phone
8. **Footer** — Legal modals (Accessibility, Privacy, Terms)

## Particle System Details

- 280 particles, phases: forming → holding → dispersing → floating
- Off-screen canvas renders "M" for pixel positions
- Mouse repulsion 150px, connection lines <8000px², scroll parallax 0.1x
- Respects `prefers-reduced-motion`

## Contact Info (used in legal docs & CTA)

- Marom Cohen | marom7777@icloud.com | 053-274-8125
- WhatsApp: wa.me/972532748125 | Tel Aviv, Israel

## Deployment

- GitHub Pages from `main` branch, root `/`
- No build step — index.html is the final output
- GSAP from CDN only (never local files)

## Pending

- Replace placeholder portfolio items with real screenshots
- Add Hebrew language version
- Add case study pages
- Connect custom domain
- Further animation polish
