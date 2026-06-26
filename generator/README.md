# Cinematic Site Generator

Turn a short business config into a finished, deployable premium one-page site —
the same cinematic design we built for Cocktails & Dreams, re-skinned per client.

The heavy design lives **once** in `template.html`. Each new business is just a
`config.json` + their assets, so generating a site is fast and cheap (few/no AI
tokens needed for the build itself).

## Usage

```bash
node build.mjs [config.json] [outputDir]
# default:  node build.mjs ./config.json ./output
```

It writes `outputDir/index.html` and copies the assets. Deploy that folder to
GitHub Pages / Netlify / Vercel and you have a live site.

### Example: a different business in one command

```bash
node build.mjs demo.json demo-output     # -> "Vino & Co", purple theme, wine menu
```

## What the config controls today (MVP)

| Field | Effect |
|-------|--------|
| `brand.name` / `brand.sub` | Title, nav, intro, hero title, footer, sharing — every visible form (incl. UPPERCASE + hero split markup) |
| `theme.*` (9 hex colors) | Full palette re-skin (bg, ink, blush, rose, gold…) — including the loading-intro liquid |
| `contact.whatsapp` | WhatsApp button / booking / floating button (its own token) |
| `contact.people[]` | Names + phone numbers + `tel:` links (independent of WhatsApp) |
| `contact.igUser` | Instagram links + handle |
| `contact.area` | Service-area line |
| `menu[]` | Rebuilds the full "תפריט" list (name, desc, `fav` star) |

Per-business **assets** (logo, photos, videos) are swapped by replacing the files
in `output/assets/` — no code change.

## Roadmap (next data-driven blocks)

Same pattern (`<!--LIST:name-->` markers + config arrays):

- `cocktailsFeatured[]` — the 3 flip cards
- `carousel[]` — the 3D coverflow items
- `gallery[]` — masonry images/videos
- `instagram[]` — the IG tiles
- `events[]` — the "what we bring" cards
- `mixer` — the "find your drink" chips + recommendations
- `hero` / `about` copy, `meta` (SEO), and a per-business logo/poster pipeline
- **Auto-deploy**: create repo + push + enable the Pages Actions workflow → live link

## How it works

`build.mjs` injects the config into `template.html` by:
1. Replacing the palette hex values (global).
2. Replacing contact literals (phone digits before WhatsApp token so they stay independent).
3. Replacing the brand name in all its forms.
4. Expanding `<!--LIST:x-->…<!--/LIST:x-->` regions from config arrays.

To add a new dynamic block: wrap it in the template with `<!--LIST:name-->` markers
and add an `expandList('name', …)` call in `build.mjs`.
