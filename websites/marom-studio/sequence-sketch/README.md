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

## להחליף את הפריימים ב-Higgsfield (כשה-MCP יחזור)
1. ב-Higgsfield: `generate_video` עם prompt קולנועי (למשל "slow cinematic gold liquid forming
   the letter M, dark luxury, particles, 4k") → סרטון של ~3 שניות.
2. לחלץ פריימים מהסרטון (ffmpeg זמין):
   ```bash
   ffmpeg -i higgsfield.mp4 -vf "fps=24,scale=1200:-1" sequence/frame_%03d.jpg
   ```
3. לעדכן `FRAME_COUNT` ב-`index.html` למספר הפריימים שיצאו.
4. (אופציונלי) להתאים את טקסטי הכותרות וטווחי ה-`data-from/to`.

> טיפ: 48–96 פריימים זה המתוק. פחות מדי = קפיצתי; יותר מדי = preload כבד. רוחב 1200px
> ו-JPEG ~0.82 שומר על איכות מול משקל.

## מבנה
```
public/
├── index.html        ← הדף + מנוע הרצף
├── sequence/         ← 72 פריימים (להחליף בפלט Higgsfield)
└── README.md
```
