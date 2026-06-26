# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Cocktails & Dreams — a professional, cinematic cocktail bar website. Hebrew RTL, dark/gold theme, deployed on Netlify with Decap CMS for visual content editing.

## Build System

- `node build.js` — reads `docs/index.html` as template + `content/*.json` → generates `public/index.html`
- `docs/index.html` is the source template and GitHub Pages backup — **NEVER modify or delete it**
- Content is edited via JSON files in `content/` or through the CMS at `/admin`
- Netlify deploys from `public/` directory

## Israeli Legal Compliance (Required for Every Website Build)

Every website built in this project (and by this user) MUST include full Israeli legal compliance. This is a permanent requirement — no lawyer needed, use the standard templates below.

### 1. Accessibility (נגישות) — MANDATORY
- **Law:** חוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח‑1998 + תקנות התשע"ג‑2013
- **Standard:** Israeli Standard IS 5568 = WCAG 2.0 Level AA
- **Penalty:** Up to NIS 50,000 per violation, no need to prove damage
- **Required:** Interactive accessibility widget (font size, contrast, link highlighting, readable font, animation stop) + professional SVG icon (never ♿ emoji)
- **Accessibility Statement must include:** compliance declaration referencing IS 5568 + WCAG 2.0 AA, list of accessibility features, known limitations, accessibility coordinator name + phone + email, invitation to report issues, last update date

### 2. Privacy Policy (מדיניות פרטיות) — MANDATORY
- **Law:** חוק הגנת הפרטיות, התשמ"א‑1981 + תיקון מס' 13 (August 2025)
- **Penalty:** Up to 5% of annual turnover
- **Must include:** types of data collected (voluntary vs automatic), purpose of collection, consequences of not providing data, controller identity + contact, data recipients, data security measures, data retention policy, cookie disclosure (essential vs analytics vs marketing), data subject rights (access, correction, deletion, objection), how to exercise rights, policy update mechanism

### 3. Terms of Service (תקנון שימוש) — MANDATORY for commercial sites
- **Law:** חוק הגנת הצרכן התשמ"א‑1981 + חוק החוזים האחידים התשמ"ג‑1982
- **Must include:** business identity + contact, service description, age restriction (18+ for alcohol per חוק הגבלת פרסום אלכוהול התשע"ב‑2012), intellectual property (חוק זכות יוצרים התשס"ח‑2007), user obligations, liability limitations (must be reasonable per Standard Contracts Law), external links disclaimer, modification clause, governing law (Israeli law), exclusive jurisdiction (Tel Aviv district), contact information

### 4. Cookie Consent Banner — DE FACTO MANDATORY
- **Law:** PPA guidance (February 2026) under Privacy Protection Law
- **Required:** RTL banner with accept/decline buttons (no dark patterns), must appear on first visit, store preference in localStorage, do not fire non-essential cookies before consent, link to privacy policy

### 5. SSL/HTTPS — MANDATORY
- Implied by Amendment 13 security requirements. Handled automatically by Netlify/hosting.

### 6. 18+ Notice — REQUIRED for alcohol content
- **Law:** חוק הגבלת פרסום והפצה של משקאות אלכוהוליים, התשע"ב‑2012
- Display prominently on alcohol-related pages. Include statement that content is for 18+ only.

### 7. All Legal Texts in Hebrew
- Every legal document, notice, and UI element must be in Hebrew for Israeli audience.

## Israeli Legal Compliance Audit (Run After Every Build)

After building any website, run a compliance audit to catch issues that could trigger lawsuits (up to NIS 50,000 per accessibility violation). Check every item below:

### Accessibility Audit (IS 5568 / WCAG 2.0 AA)
1. **Images:** Every `<img>` with content must have descriptive `alt` text in Hebrew. Only purely decorative images may use `alt=""` with `role="presentation"`. Search for `alt=""` and verify each is truly decorative.
2. **Videos:** Every `<video>` must have `aria-label` describing the content. Ideally should have `<track>` captions.
3. **Interactive elements:** All clickable elements must be `<button>` or `<a>`, never `<div>` or `<span>` with click handlers. Check burger menus, tabs, toggles, accordions.
4. **ARIA attributes:** Toggleable elements (menus, panels, modals) must have `aria-expanded`, `aria-controls`, `aria-modal` as appropriate.
5. **Skip link:** Must have a "דלג לתוכן הראשי" skip-to-content link as first focusable element.
6. **Focus visible:** Must have `:focus-visible` styles with clear outline (3px+ solid, contrasting color).
7. **Keyboard navigation:** All interactive elements must be reachable and operable via Tab/Enter/Escape.
8. **Color contrast:** Text must have 4.5:1 ratio against background (3:1 for large text).
9. **Heading hierarchy:** Must have logical h1→h2→h3 structure, no skipped levels.
10. **Form labels:** Every input/select/textarea must be inside `<label>` or linked via `for`/`id`.
11. **Accessibility widget:** Must have interactive panel with font size, contrast, link highlighting, readable font, animation stop options. SVG icon (never ♿ emoji).
12. **Click handlers on SVG buttons:** When a `<button>` contains SVG, the click-outside handler must use `fab.contains(e.target)` not `e.target !== fab` — clicks on SVG child elements (circle, path) won't match the button itself.

### Legal Text Audit
13. **Accessibility statement:** Must reference חוק שוויון זכויות התשנ"ח, תקנות התשע"ג-2013, IS 5568, WCAG 2.0 AA. Must include coordinator name + phone, commitment to respond within 7 business days, last update date. Must accurately describe actual site features (don't mention ♿ if using SVG).
14. **Privacy policy:** Must reference חוק הגנת הפרטיות התשמ"א-1981 + תיקון 13. Must include: data types, purposes, third parties, security, retention, cookies, data subject rights (access/correction/deletion/objection), contact info.
15. **Terms of service:** Must have numbered sections. Must reference: חוק הגנת הצרכן, חוק החוזים האחידים, חוק זכות יוצרים. Must include: business identity, 18+ for alcohol, IP, liability, Israeli law jurisdiction.
16. **No "template" disclaimers:** Legal texts must NOT contain phrases like "תבנית כללית", "מומלץ לאשר מול עו"ד" — these signal the texts aren't final and undermine legal standing.

### Cookie & Privacy Audit
17. **Cookie banner:** Must appear on first visit with accept/decline buttons. Must store preference in localStorage. Must not use dark patterns.
18. **No tracking without consent:** Verify no Google Analytics, Facebook Pixel, or other trackers fire before cookie consent is given.

### Automated Check (Playwright)
Run these checks programmatically after build:
```javascript
// Empty alt on content images (should be 0)
document.querySelectorAll('img[alt=""]').filter(i => !i.getAttribute('role'))
// Non-button interactive elements (should be 0)
document.querySelectorAll('div[aria-label], span[aria-label]').filter(el => el.onclick || el.getAttribute('role')==='button')
// Videos without labels (should be 0)
document.querySelectorAll('video:not([aria-label])')
// Modals without aria-modal (should be 0)
document.querySelectorAll('.modal:not([aria-modal])')
// Forms inputs without labels (should be 0)
document.querySelectorAll('input:not([type="hidden"]), select, textarea').filter(el => !el.closest('label') && !el.id)
```

## Communication

All communication with this user should be in Hebrew.
