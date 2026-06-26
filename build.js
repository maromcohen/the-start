const fs = require('fs');
const path = require('path');

const DOCS = path.join(__dirname, 'docs');
const PUBLIC = path.join(__dirname, 'public');
const CONTENT = path.join(__dirname, 'content');
const ADMIN = path.join(__dirname, 'admin');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.name === 'wix-import.html') continue;
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function loadContent(name) {
  const file = path.join(CONTENT, name + '.json');
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildHTML() {
  let html = fs.readFileSync(path.join(DOCS, 'index.html'), 'utf8');

  const hero = loadContent('hero');
  const about = loadContent('about');
  const cocktails = loadContent('cocktails');
  const events = loadContent('events');
  const contact = loadContent('contact');

  if (hero) {
    html = html.replace(
      /(<span class="eyebrow">)בר קוקטיילים נייד · תל אביב(<\/span>)/,
      `$1${esc(hero.eyebrow)}$2`
    );
    html = html.replace(
      /(<p class="tag">)שני ברמנים, בר אחד שמגיע אליכם — <b>וקוקטייל שנמזג לאט מול האורחים\.<\/b>(<\/p>)/,
      `$1${esc(hero.subtitle)} <b>${esc(hero.subtitle_bold)}</b>$2`
    );
    html = html.replace(
      /(<a class="cta magnetic" href="#book">)הזמינו אירוע(<\/a>)/,
      `$1${esc(hero.cta_text)}$2`
    );
  }

  if (about) {
    html = html.replace(
      /(<h2 class="head" style="margin-top:18px">)אנחנו מביאים את הבר\. <em>אתם נשארים עם האורחים\.<\/em>(<\/h2>)/,
      `$1${esc(about.title)} <em>${esc(about.title_em)}</em>$2`
    );
    html = html.replace(
      /<p>התחלנו כשני ברמנים שאוהבים את הרגע שבו מוזגים את הכוס הראשונה[^<]*<\/p>/,
      `<p>${esc(about.paragraph1)}</p>`
    );
    html = html.replace(
      /<p>אנחנו לא מגישים תפריט מהמדף[^<]*<\/p>/,
      `<p>${esc(about.paragraph2)}</p>`
    );
    html = html.replace(
      /<div class="s"><b data-count="250">0<\/b><span>אירועים<\/span><\/div>/,
      `<div class="s"><b data-count="${esc(about.stat_events)}">0</b><span>${esc(about.stat_events_label)}</span></div>`
    );
    html = html.replace(
      /<div class="s"><b data-count="40">0<\/b><span>קוקטיילים בתפריט<\/span><\/div>/,
      `<div class="s"><b data-count="${esc(about.stat_cocktails)}">0</b><span>${esc(about.stat_cocktails_label)}</span></div>`
    );
    html = html.replace(
      /<div class="s"><b>100%<\/b><span>מזיגה חיה<\/span><\/div>/,
      `<div class="s"><b>${esc(about.stat_live)}</b><span>${esc(about.stat_live_label)}</span></div>`
    );
    html = html.replace(
      /<span class="badge">TEL AVIV · ROOFTOP<\/span>/,
      `<span class="badge">${esc(about.badge)}</span>`
    );
  }

  if (cocktails) {
    html = html.replace(
      /(<h2 class="head" style="margin-top:18px">)הקוקטיילים <em>שלנו<\/em>(<\/h2>)/,
      `$1${esc(cocktails.title)} <em>${esc(cocktails.title_em)}</em>$2`
    );
    html = html.replace(
      /(<p class="lead" style="margin-top:18px">)תפריט חתימה שמשתנה לפי האירוע[^<]*(<\/p>)/,
      `$1${esc(cocktails.lead)}$2`
    );
    const menuItems = cocktails.menu.map(item => {
      const favClass = item.favorite ? ' fav' : '';
      const star = item.favorite ? '<span class="star">★ הכי אהוב</span>' : '';
      return `<div class="mitem${favClass}"><div class="top"><span class="nm">${esc(item.name)}</span>${star}</div><p class="ds">${esc(item.description)}</p></div>`;
    }).join('\n      ');
    html = html.replace(
      /<div class="menu-list stagger">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*<!-- FIND YOUR DRINK/,
      `<div class="menu-list stagger">\n      ${menuItems}\n    </div>\n  </div>\n</section>\n\n<!-- FIND YOUR DRINK`
    );
  }

  if (events) {
    html = html.replace(
      /(<h2 class="head" style="margin-top:18px">)בנויים <em>לכל אירוע<\/em>(<\/h2>)/,
      `$1${esc(events.title)} <em>${esc(events.title_em)}</em>$2`
    );
    const eventCards = events.items.map(item =>
      `<div class="xcard glow"><div class="ic">${esc(item.number)}</div><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p></div>`
    ).join('\n      ');
    html = html.replace(
      /<div class="xgrid stagger r3d">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*<!-- GALLERY/,
      `<div class="xgrid stagger r3d">\n      ${eventCards}\n    </div>\n  </div>\n</section>\n\n<!-- GALLERY`
    );
  }

  if (contact) {
    html = html.replace(
      /(<h2 class="head" style="margin-top:18px">)בואו נתכנן את <em>הבר שלכם<\/em>(<\/h2>)/,
      `$1${esc(contact.title)} <em>${esc(contact.title_em)}</em>$2`
    );
    html = html.replace(
      /(<p class="lead" style="margin-top:18px">)ספרו לנו על האירוע ונחזור אליכם עם הצעה מותאמת אישית\.(<\/p>)/,
      `$1${esc(contact.lead)}$2`
    );
    const waLink = `https://wa.me/${contact.whatsapp_number}?text=${encodeURIComponent(contact.whatsapp_text)}`;
    html = html.replace(
      /<a class="wa magnetic" href="https:\/\/wa\.me\/972544930095\?text=[^"]*"/,
      `<a class="wa magnetic" href="${waLink}"`
    );
    html = html.replace(
      /<a class="wafloat" href="https:\/\/wa\.me\/972544930095\?text=[^"]*"/,
      `<a class="wafloat" href="${waLink}"`
    );
  }

  // Add Netlify Identity widget for CMS auth
  html = html.replace('</head>', '  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>\n</head>');

  // Add cookie consent banner + identity redirect before </body>
  html = html.replace('</head>',
    `<style>
  .cookie-banner{position:fixed;bottom:0;inset-inline:0;z-index:8000;background:rgba(10,7,8,.96);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-top:1px solid rgba(217,179,130,.25);padding:18px 24px;display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;transform:translateY(100%);transition:transform .5s cubic-bezier(.16,1,.3,1);direction:rtl}
  .cookie-banner.show{transform:none}
  .cookie-banner p{color:#a99b97;font-size:.88rem;max-width:600px;line-height:1.6;margin:0}
  .cookie-banner a{color:#d9b382;text-decoration:underline}
  .cookie-btn{font-family:'Marcellus',serif;letter-spacing:.1em;font-size:.75rem;padding:10px 22px;border-radius:100px;cursor:pointer;transition:all .3s;border:none}
  .cookie-accept{background:#d9b382;color:#1a0f12}.cookie-accept:hover{background:#f0d9b5}
  .cookie-decline{background:transparent;color:#a99b97;border:1px solid rgba(169,155,151,.3)}.cookie-decline:hover{border-color:#d9b382;color:#d9b382}
</style>
</head>`);

  html = html.replace('</body>',
    `<div class="cookie-banner" id="cookieBanner" role="dialog" aria-label="הסכמה לעוגיות">
  <p>אתר זה משתמש בעוגיות (Cookies) לצורך שיפור חוויית הגלישה ולמטרות סטטיסטיות. לפרטים נוספים ראו את <a href="#" data-modal="m-privacy">מדיניות הפרטיות</a>.</p>
  <button class="cookie-btn cookie-accept" id="cookieAccept">מאשר</button>
  <button class="cookie-btn cookie-decline" id="cookieDecline">דוחה</button>
</div>
<script>
(function(){
  if(!localStorage.getItem('cookie-consent')){
    var b=document.getElementById('cookieBanner');
    setTimeout(function(){b.classList.add('show')},1500);
    document.getElementById('cookieAccept').addEventListener('click',function(){localStorage.setItem('cookie-consent','accepted');b.classList.remove('show')});
    document.getElementById('cookieDecline').addEventListener('click',function(){localStorage.setItem('cookie-consent','declined');b.classList.remove('show')});
  }
})();
</script>
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", function(user) {
      if (!user) {
        window.netlifyIdentity.on("login", function() {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
</body>`);

  return html;
}

console.log('Building Cocktails & Dreams...');

// 1. Copy docs/ to public/ (skip wix-import.html)
copyDir(DOCS, PUBLIC);

// 2. Generate HTML from template + content
const html = buildHTML();
fs.writeFileSync(path.join(PUBLIC, 'index.html'), html, 'utf8');

// 3. Copy admin/ to public/admin/
copyDir(ADMIN, path.join(PUBLIC, 'admin'));

// 4. Add Netlify form detection attribute
let finalHTML = fs.readFileSync(path.join(PUBLIC, 'index.html'), 'utf8');
finalHTML = finalHTML.replace(
  '<form class="bk reveal" id="bkForm">',
  '<form class="bk reveal" id="bkForm" name="booking" method="POST" data-netlify="true" netlify-honeypot="bot-field">'
);
finalHTML = finalHTML.replace(
  '<form class="bk reveal" id="bkForm" name="booking" method="POST" data-netlify="true" netlify-honeypot="bot-field">',
  '<form class="bk reveal" id="bkForm" name="booking" method="POST" data-netlify="true" netlify-honeypot="bot-field">\n      <input type="hidden" name="form-name" value="booking" />\n      <p class="hidden" style="display:none"><label>Don\'t fill this out: <input name="bot-field" /></label></p>'
);
fs.writeFileSync(path.join(PUBLIC, 'index.html'), finalHTML, 'utf8');

console.log('Build complete! Output in public/');
