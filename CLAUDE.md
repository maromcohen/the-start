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
- **Required:** Full Israeli-standard accessibility widget (see section below) + professional SVG icon (never ♿ emoji)
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

## Israeli Accessibility Widget — Full Implementation Standard

Every website MUST include a professional accessibility widget matching Israeli industry standard (accessiBe, EqualWeb, NagishLi level). The widget must have **all 17 features** below, organized in categorized sections with icons.

### Widget Structure
- Fixed position button (bottom-left for RTL sites) with professional SVG accessibility icon (never ♿ emoji)
- Panel: `role="dialog"`, `aria-label="הגדרות נגישות"`, `max-height` with `overflow-y:auto`
- Button must use `aria-expanded` + `aria-controls`
- Click-outside to close must use `fab.contains(e.target)` (not `e.target !== fab`) because SVG child elements don't match the button itself
- State persisted in `localStorage` key `a11y`, restored on page load

### Required Features (17 buttons in 4 categories)

**גודל תצוגה (Display Size) — 4 buttons:**
1. **הגדל טקסט (A+)** — `html.a11y-fs1{font-size:115%}`, `html.a11y-fs2{font-size:130%}` (two levels)
2. **הקטן טקסט (A-)** — reverse of above
3. **מרווח שורות (☰)** — `html.a11y-spacing,html.a11y-spacing *{line-height:2.2!important}`
4. **מרווח אותיות (a‥b)** — `html.a11y-letters *{letter-spacing:.14em!important;word-spacing:.2em!important}`

**צבעים ותצוגה (Colors & Display) — 4 buttons:**
5. **ניגודיות גבוהה (◑)** — `html.a11y-contrast{filter:contrast(1.6) saturate(1.2)}` + override backgrounds/colors
6. **גווני אפור (◐)** — `html.a11y-gray{filter:grayscale(100%)}`
7. **היפוך צבעים (◕)** — `html.a11y-invert{filter:invert(100%) hue-rotate(180deg)}` + counter-invert on images/video
8. **הסתרת תמונות (⊘)** — `html.a11y-noimages img,video,.bgfx{opacity:0!important}`

**ניווט וקריאה (Navigation & Reading) — 8 buttons:**
9. **הדגשת קישורים (🔗)** — `html.a11y-links a{outline:2px solid!important;text-decoration:underline!important}`
10. **הדגשת כותרות (H)** — `html.a11y-headings h1,h2,h3,h4{outline:3px solid var(--gold)!important;outline-offset:4px}`
11. **הדגשת פוקוס (⊡)** — `html.a11y-focus *:focus{outline:4px solid #ff0!important;outline-offset:4px!important}`
12. **קו הנחיה לקריאה (─)** — fixed horizontal bar following mouse Y position (`mousemove` listener, `position:fixed;height:4px;background:var(--gold)`)
13. **סמן גדול (↖)** — `html.a11y-bigcur,html.a11y-bigcur *{cursor:url("data:image/svg+xml,...")!important}` (40x40 SVG cursor)
14. **גופן קריא (Aa)** — `html.a11y-readable *{font-family:Arial,sans-serif!important}`
15. **גופן לדיסלקטים (Dy)** — `html.a11y-dyslexia *{font-family:'OpenDyslexic','Comic Sans MS',Arial,sans-serif!important}`
16. **עצירת אנימציות (⏸)** — `html.a11y-stop *{animation:none!important;transition:none!important}` + pause all `<video>` elements

**איפוס — 1 button (full width):**
17. **איפוס כל ההגדרות (↺)** — clear state object, remove all classes, hide reading guide

### HTML Structure Template
```html
<button class="a11y-fab" id="a11yFab" aria-label="תפריט נגישות" aria-expanded="false" aria-controls="a11yPanel">
  <svg><!-- professional accessibility SVG icon --></svg>
</button>
<div class="a11y-panel" id="a11yPanel" role="dialog" aria-label="הגדרות נגישות">
  <h4>תפריט נגישות</h4>
  <h5>גודל תצוגה</h5>
  <div class="a11y-grid">
    <button type="button" data-a11y="fontUp"><span class="a11y-ico">A+</span>הגדל טקסט</button>
    <button type="button" data-a11y="fontDown"><span class="a11y-ico">A-</span>הקטן טקסט</button>
    <button type="button" data-a11y="spacing"><span class="a11y-ico">☰</span>מרווח שורות</button>
    <button type="button" data-a11y="letters"><span class="a11y-ico">a‥b</span>מרווח אותיות</button>
  </div>
  <h5>צבעים ותצוגה</h5>
  <div class="a11y-grid">
    <button type="button" data-a11y="contrast"><span class="a11y-ico">◑</span>ניגודיות גבוהה</button>
    <button type="button" data-a11y="gray"><span class="a11y-ico">◐</span>גווני אפור</button>
    <button type="button" data-a11y="invert"><span class="a11y-ico">◕</span>היפוך צבעים</button>
    <button type="button" data-a11y="noimages"><span class="a11y-ico">⊘</span>הסתרת תמונות</button>
  </div>
  <h5>ניווט וקריאה</h5>
  <div class="a11y-grid">
    <button type="button" data-a11y="links"><span class="a11y-ico">🔗</span>הדגשת קישורים</button>
    <button type="button" data-a11y="headings"><span class="a11y-ico">H</span>הדגשת כותרות</button>
    <button type="button" data-a11y="focus"><span class="a11y-ico">⊡</span>הדגשת פוקוס</button>
    <button type="button" data-a11y="guide"><span class="a11y-ico">─</span>קו הנחיה לקריאה</button>
    <button type="button" data-a11y="bigcur"><span class="a11y-ico">↖</span>סמן גדול</button>
    <button type="button" data-a11y="readable"><span class="a11y-ico">Aa</span>גופן קריא</button>
    <button type="button" data-a11y="dyslexia"><span class="a11y-ico">Dy</span>גופן לדיסלקטים</button>
    <button type="button" data-a11y="stop"><span class="a11y-ico">⏸</span>עצירת אנימציות</button>
  </div>
  <div class="a11y-grid" style="margin-top:10px">
    <button type="button" class="a11y-reset" data-a11y="reset"><span class="a11y-ico">↺</span>איפוס כל ההגדרות</button>
  </div>
</div>
<div class="a11y-reading-guide" id="a11yGuide"></div>
```

### JS Logic Pattern
```javascript
var toggles=['contrast','gray','invert','links','headings','focus','bigcur','readable','dyslexia','stop','spacing','letters','noimages','guide'];
var state=JSON.parse(localStorage.getItem('a11y')||'{}');
function apply(){
  root.classList.toggle('a11y-fs1',state.fs===1);
  root.classList.toggle('a11y-fs2',state.fs===2);
  toggles.forEach(function(k){root.classList.toggle('a11y-'+k,!!state[k]);});
  guide.style.display=state.guide?'block':'none';
  // pause/resume videos for stop-animations
  document.querySelectorAll('video').forEach(function(v){
    state.stop?v.pause():(v.autoplay&&v.play().catch(function(){}));
  });
  // update button .on states
  panel.querySelectorAll('[data-a11y]').forEach(function(b){
    var k=b.getAttribute('data-a11y');
    if(k==='fontUp'||k==='fontDown')b.classList.toggle('on',state.fs>0);
    else if(k==='reset')return;
    else b.classList.toggle('on',!!state[k]);
  });
  localStorage.setItem('a11y',JSON.stringify(state));
}
// reading guide follows mouse
if(state.guide){document.addEventListener('mousemove',function(e){guide.style.top=e.clientY+'px';});}
```

### CSS Requirements
- Panel: `width:320px`, `max-height:calc(100vh - 200px)`, `overflow-y:auto`
- Grid: `grid-template-columns:1fr 1fr`, `gap:8px`
- Icons: `.a11y-ico{display:block;font-size:1.1rem;margin-bottom:3px}`
- Active state: `.a11y-grid button.on{background:var(--gold);color:#1a0f12;border-color:var(--gold)}`
- Reset button: `grid-column:1/-1` (full width)
- Reading guide: `position:fixed;inset-inline:0;height:4px;background:var(--gold);z-index:9998;pointer-events:none;display:none`
- NEVER use `cursor:none` anywhere — always `cursor:pointer` for interactive elements

### Additional Accessibility Requirements (Not Widget)
- `<main>` landmark wrapping the main content area
- `<button>` for all interactive elements (never `<div>` or `<span>` with click handlers)
- Burger menu: `<button type="button" aria-expanded="false" aria-controls="nav">`
- Focus trap on modals: intercept Tab/Shift+Tab keydown, cycle focus within modal's focusable elements
- Color contrast minimum 4.5:1 for normal text, 3:1 for large text
- Descriptive `alt` text in Hebrew for all content images
- `aria-label` on all `<video>` elements

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
11. **Accessibility widget:** Must have full 17-feature Israeli-standard widget (see "Israeli Accessibility Widget" section). SVG icon (never ♿ emoji). All 4 categories present: display size (4), colors (4), navigation (8), reset (1).
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
