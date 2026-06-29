const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });
  const page = await browser.newPage({ viewport:{width:1280,height:720} });
  const url = 'file://' + path.join(__dirname,'public','index.html');
  await page.goto(url, { waitUntil:'load' });

  // wait for loader to vanish (frames preloaded)
  await page.waitForFunction(() => {
    const l=document.getElementById('loader'); return l && l.classList.contains('gone');
  }, { timeout: 20000 }).catch(()=>console.log('loader timeout'));
  await page.waitForTimeout(600);
  await page.screenshot({ path:'shot-1-hero.png' });

  // scroll into the seq section at several progress points
  const seqInfo = await page.evaluate(() => {
    const s=document.getElementById('work');
    return { top: s.offsetTop, height: s.offsetHeight, vh: window.innerHeight };
  });
  const scrollable = seqInfo.height - seqInfo.vh;
  const points = [0.12, 0.45, 0.85];
  for (let i=0;i<points.length;i++){
    const y = seqInfo.top + scrollable*points[i];
    await page.evaluate(yy => window.scrollTo(0, yy), y);
    await page.waitForTimeout(700);
    await page.screenshot({ path:`shot-${i+2}-seq-${Math.round(points[i]*100)}.png` });
  }
  console.log('OK — screenshots written');
  await browser.close();
})();
