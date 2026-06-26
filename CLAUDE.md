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

## Communication

All communication with this user should be in Hebrew.
