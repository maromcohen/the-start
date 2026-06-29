# MAROM — Image Sequence Sketch (Active Theory style)

דף נחיתה לסטודיו בסגנון Active Theory, עם מנוע **image-sequence מבוסס-גלילה** (הטכניקה
של Apple/AirPods): קנבס שמצייר frame-by-frame לפי מיקום הגלילה.

## הפעלה
פותחים את `index.html` בדפדפן (או מגישים את התיקייה דרך שרת סטטי). זהו — בלי build.

## איך זה עובד
- `sequence/frame_001.jpg … frame_072.jpg` — 72 פריימים (כרגע placeholder: מונוגרמת "M" זהובה
  נוצרת מחלקיקים ומסתובבת קלות).
- מקטע `.seq` בגובה `420vh` עם קנבס `sticky` — הגלילה דרכו מתורגמת ל-0..1 → אינדקס פריים.
- הציור עושה **lerp** לעבר פריים היעד (`*0.18`) → תחושת חמאה.
- pixel-ratio מוגבל ל-2 (כלל ביצועים של Active Theory).
- כותרות (`.seq-cap`) נדלקות/כבות לפי טווחי התקדמות (`data-from` / `data-to`).

## שתי גרסאות בתיקייה הזו

- **`index.html`** — גרסת **image-sequence** (72 פריימי JPG, נסרקים לפי גלילה). חלקה במיוחד
  במובייל. כרגע עם פריימים זמניים (מ-`frame-gen.js`).
- **`index-video.html`** — גרסת **scroll-scrub video**: סורקת לפי גלילה את **הסרטון האמיתי
  שנוצר ב-Higgsfield** (זהב נוזלי יוצר את האות M). מצביעה ישירות ל-URL של ה-CDN — נפתחת
  ועובדת בכל דפדפן עם אינטרנט. זו הגרסה עם התוכן האמיתי.

### הסרטון האמיתי מ-Higgsfield
- מודל: `kling3_0_turbo`, 5 שניות, 1280×720
- URL: `https://d8j0ntlcm91z4.cloudfront.net/user_3FiJmqy12NASFK67PFaBPuFwpXv/hf_20260629_172800_0d55a5e0-92a4-446a-8c5d-bfad0a7b910d.mp4`

### להמיר את הסרטון לפריימי JPG (לגרסת image-sequence — אופציונלי)
סביבת ה-build כאן חוסמת גישה ל-CDN, אז ההמרה צריכה לרוץ מהמחשב שלך:
```bash
curl -L -o higgsfield.mp4 "<ה-URL למעלה>"
ffmpeg -i higgsfield.mp4 -vf "fps=24,scale=1200:-1" sequence/frame_%03d.jpg
```
ואז לעדכן `FRAME_COUNT` ב-`index.html` למספר הפריימים שיצאו.

> טיפ: 48–96 פריימים זה המתוק. רוחב 1200px ו-JPEG ~0.82 שומר על איכות מול משקל.

## מבנה
```
sequence-sketch/
├── index.html        ← גרסת image-sequence (פריימי JPG)
├── index-video.html  ← גרסת scroll-scrub של הסרטון האמיתי מ-Higgsfield
├── sequence/         ← 72 פריימים זמניים
├── frame-gen.js      ← מחדש את הפריימים הזמניים
├── verify.js         ← צילומי אימות בדפדפן
└── README.md
```
