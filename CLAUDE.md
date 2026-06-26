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

Every website built in this project (and by this user) MUST include full Israeli legal compliance. This is a permanent requirement:

1. **Accessibility Widget** — Interactive accessibility panel with options: font size increase, high contrast, link highlighting, grayscale mode, readable font, animation stop. Professional SVG accessibility icon (universal person-with-arms symbol in circle), never use ♿ emoji.

2. **Accessibility Statement** — Full Hebrew accessibility statement per Israeli Standard 5568 (based on WCAG 2.0 Level AA). Include compliance level, assistive technology support, contact details for accessibility coordinator.

3. **Privacy Policy** — Complete Hebrew privacy policy covering: data collection, cookies, third-party services, data storage, user rights, contact information. Must comply with Israeli Privacy Protection Law (1981).

4. **Terms of Service** — Full Hebrew terms of service covering: service description, user obligations, intellectual property, liability limitations, dispute resolution under Israeli law.

5. **Cookie Consent Banner** — RTL animated banner with accept/decline buttons. Must appear on first visit, store user preference in localStorage, match site design theme.

6. **SSL/HTTPS** — Site must be served over HTTPS (handled by Netlify automatically).

7. **18+ Notice** — Where relevant (alcohol-related content), include appropriate age verification or notice.

8. **All Legal Texts in Hebrew** — Every legal document, notice, and UI element must be in Hebrew.

## Communication

All communication with this user should be in Hebrew.
