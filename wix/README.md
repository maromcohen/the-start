# Wix Site Build — Cocktails & Dreams

שחזור מלא של אתר GitHub Pages (`docs/index.html`) בתוך Wix, באמצעות
**Custom Embeds** של Wix. הרעיון: להסתיר את כל התוכן ש-Wix מייצר (CSS)
ולהזריק במקומו את האתר השלם (HTML+JS) עם התמונות והווידאו האמיתיים.

> האתר המקורי ב-GitHub Pages (`docs/index.html`) נשאר כגיבוי ולא משתנה.

## פרטי האתר ב-Wix

- Site ID: `5cbc8cf0-ee52-496f-a749-2fcdeb4c794d`
- URL: `https://marom77770.wixsite.com/cocktails-dreams`

## ה-Embeds (לפי סדר טעינה)

| קובץ | מיקום | תפקיד | סטטוס |
|------|-------|-------|-------|
| `01-core-css.html` | HEAD | הסתרת תוכן Wix, פונטים, משתני צבע, nav, hero, marquee | ✅ חי (CD Core CSS) |
| `02-sections-css.html` | HEAD | pour, about, כרטיסים, תפריט, אירועים, גלריה, טופס, footer | ✅ חי (CD Sections CSS) |
| `06-effects-css.html` | HEAD | מסך טעינה קולנועי, בועות צפות, סקשן בונה קוקטיילים | ✅ חי (CD Effects CSS) |
| `03-content-js1.html` | BODY_END | מזריק: nav, hero+וידאו, marquee, pour studio+וידאו, about | ✅ חי (CD Content JS1) |
| `04-content-js2.html` | BODY_END | מזריק: כרטיסי קוקטיילים, תפריט מלא, אירועים | ✅ חי (CD Content JS2) |
| `05-content-js3.html` | BODY_END | מזריק: גלריה, טופס הזמנה, footer, וואטסאפ, scroll/reveal JS | ✅ חי (CD Content JS3) |
| `07-mixer-js.html` | BODY_END | מזריק: preloader, בועות אנימציה, בונה קוקטיילים אינטראקטיבי | ✅ חי (CD Mixer JS) |

**סטטוס: כל 7 ה-embeds חיים והאתר פורסם.** (יוני 2026)

כל embed מתחת למגבלת 15,000 התווים של Wix.

## העלאה (כשחיבור ה-Wix MCP פעיל)

לכל קובץ JS:
```
POST https://www.wixapis.com/embeds/v1/custom-embeds
{ "customEmbed": { "name": "...", "enabled": true, "loadOnce": true,
  "position": "BODY_END", "embedData": { "category": "FUNCTIONAL", "html": "<תוכן הקובץ>" } } }
```
ואז פרסום:
```
POST https://www.wixapis.com/site-publisher/v1/site/publish
```

## מדיה (Wix Media URLs)

- וידאו hero: `https://video.wixstatic.com/video/b47f77_7b635488056e4092a378cb8a29dc2b4d/file`
- וידאו מזיגה: `https://video.wixstatic.com/video/b47f77_778e0e316b98434990928a3abb8d24b7/file`
- תמונות: `https://static.wixstatic.com/media/b47f77_<id>~mv2.jpeg`
