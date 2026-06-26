#!/usr/bin/env node
/**
 * Cinematic site generator — MVP
 *
 *   node build.mjs [config.json] [outputDir]
 *
 * Reads a business config and injects it into template.html to produce a
 * finished, deployable site. The heavy design is built once (template.html);
 * each new business is just a config + assets, so generation is fast & cheap.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const cfgPath = process.argv[2] || path.join(here, 'config.json');
const outDir  = process.argv[3] || path.join(here, 'output');

const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
let html  = fs.readFileSync(path.join(here, 'template.html'), 'utf8');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rep = (from, to) => { html = html.split(from).join(to); };

/* ---- defaults: the literal values baked into template.html ---- */
const D = {
  brandName: 'Cocktails & Dreams', brandSub: 'MOBILE BAR',
  whatsapp: '972544930095', igUser: 'cocktail.dreams_',
  area: 'תל אביב והמרכז · בכל הארץ בתיאום',
  people: [
    { name: 'עידן הרמן', phone: '054-493-0095', digits: '972544930095' },
    { name: 'אופיר לרנר', phone: '052-463-7076', digits: '972524637076' }
  ],
  colors: { bg:'#0a0708', bg2:'#120c0e', ink:'#f4ece9', muted:'#a99b97',
            blush:'#f4a9b8', blushD:'#e07b91', rose:'#c84d63', gold:'#d9b382', goldL:'#f0d9b5' }
};

/* ---- 1) theme colours (longest-unique hex, global) ---- */
for (const k of Object.keys(D.colors)) {
  if (cfg.theme?.[k]) rep(D.colors[k], cfg.theme[k]);
}

/* ---- 2) contact: phone digits FIRST (they appear inside wa.me/tel links) ---- */
D.people.forEach((p, i) => {
  const np = cfg.contact?.people?.[i];
  if (!np) return;
  if (np.digits) rep(p.digits, np.digits);
  if (np.phone)  rep(p.phone,  np.phone);
  if (np.name)   rep(p.name,   np.name);
});
rep('{{WHATSAPP}}', cfg.contact?.whatsapp || D.people[0].digits);   /* WhatsApp button has its own token */
if (cfg.contact?.igUser)   rep(D.igUser,   cfg.contact.igUser);
if (cfg.contact?.area)     rep(D.area,     cfg.contact.area);

/* ---- 3) brand name — handle every form it appears in ---- */
if (cfg.brand?.name) {
  const name = cfg.brand.name, up = name.toUpperCase();
  // hero title uses split markup: "Cocktails <span class='amp'>&amp;</span> Dreams"
  const heroOld = 'Cocktails <span class="amp">&amp;</span> Dreams';
  const heroNew = name.includes('&')
    ? `${esc(name.split('&')[0].trim())} <span class="amp">&amp;</span> ${esc(name.split('&').slice(1).join('&').trim())}`
    : esc(name);
  rep(heroOld, heroNew);
  // UPPERCASE displays (nav, intro) — must run before the title-case pass
  rep('COCKTAILS &amp; DREAMS', esc(up));
  rep('COCKTAILS & DREAMS', up);
  // title-case (title tag, meta, footer, alt, modals)
  rep(esc(D.brandName), esc(name));
  rep(D.brandName, name);
}
if (cfg.brand?.sub) rep(D.brandSub, cfg.brand.sub);

/* ---- 4) data-driven lists ---- */
function expandList(name, itemsHtml) {
  const re = new RegExp(`<!--LIST:${name}-->[\\s\\S]*?<!--/LIST:${name}-->`);
  html = html.replace(re, `<!--LIST:${name}-->\n${itemsHtml}\n      <!--/LIST:${name}-->`);
}
if (Array.isArray(cfg.menu)) {
  const items = cfg.menu.map(m =>
    `      <div class="mitem${m.fav ? ' fav' : ''}"><div class="top"><span class="nm">${esc(m.name)}</span>` +
    (m.fav ? '<span class="star">★ הכי אהוב</span>' : '') +
    `</div><p class="ds">${esc(m.desc)}</p></div>`
  ).join('\n');
  expandList('menu', items);
}

/* ---- write output + copy assets ---- */
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html);
const srcAssets = path.join(here, '..', 'docs', 'assets');
if (fs.existsSync(srcAssets)) fs.cpSync(srcAssets, path.join(outDir, 'assets'), { recursive: true });

console.log(`✓ Generated "${cfg.brand?.name || 'site'}" → ${path.relative(process.cwd(), outDir)}/index.html`);
console.log(`  menu items: ${cfg.menu?.length || 0} · theme: ${cfg.theme?.gold || 'default'}`);
