// Generates a cinematic placeholder image sequence: a gold "MAROM M" monogram
// formed from particles that converge then rotate in pseudo-3D, on near-black.
// Rendered headlessly via Chromium (offscreen canvas) -> JPEG frames.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const W = 1200, H = 675;
const FRAMES = 72;
const OUT = path.join(__dirname, 'public', 'sequence');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });
  const page = await browser.newPage({ viewport: { width: W, height: H } });

  await page.setContent('<canvas id="c" width="'+W+'" height="'+H+'"></canvas>');

  // Build particle targets (sample the letter "M") once inside the page.
  await page.evaluate(({W,H}) => {
    const off = document.createElement('canvas'); off.width=W; off.height=H;
    const o = off.getContext('2d');
    o.fillStyle='#fff'; o.textAlign='center'; o.textBaseline='middle';
    o.font='900 '+Math.floor(H*0.74)+'px Georgia, serif';
    o.fillText('M', W/2, H/2 + H*0.02);
    const data = o.getImageData(0,0,W,H).data;
    const pts = [];
    for(let y=0; y<H; y+=5){
      for(let x=0; x<W; x+=5){
        if(data[(y*W+x)*4+3] > 128) pts.push({x,y});
      }
    }
    // shuffle
    for(let i=pts.length-1;i>0;i--){const j=Math.random()*i|0;[pts[i],pts[j]]=[pts[j],pts[i]];}
    const N = Math.min(1500, pts.length);
    window.__P = [];
    for(let i=0;i<N;i++){
      const t = pts[i % pts.length];
      window.__P.push({
        tx: t.x, ty: t.y,
        sx: W/2 + (Math.random()-0.5)*W*1.6,
        sy: H/2 + (Math.random()-0.5)*H*1.6,
        size: 0.6 + Math.random()*1.7,
        depth: Math.random(),         // for pseudo-3D
        phase: Math.random()*Math.PI*2
      });
    }
    window.__W=W; window.__H=H;
  }, {W,H});

  for(let f=0; f<FRAMES; f++){
    const prog = f/(FRAMES-1);                 // 0..1
    const dataUrl = await page.evaluate((prog) => {
      const W=window.__W, H=window.__H, P=window.__P;
      const c=document.getElementById('c'), g=c.getContext('2d');
      // bg
      g.fillStyle='#080608'; g.fillRect(0,0,W,H);
      // vignette + gold bloom
      let bloom=g.createRadialGradient(W/2,H*0.46,0,W/2,H*0.46,W*0.55);
      bloom.addColorStop(0,'rgba(201,169,110,0.10)');
      bloom.addColorStop(0.4,'rgba(160,90,70,0.05)');
      bloom.addColorStop(1,'rgba(0,0,0,0)');
      g.fillStyle=bloom; g.fillRect(0,0,W,H);

      const form = Math.min(1, prog/0.55);          // 0..1 formation
      const ease = 1-Math.pow(1-form,3);            // easeOutCubic
      const rot = Math.max(0,(prog-0.5)/0.5)*Math.PI*0.22; // gentle 3D turn (~40deg max), stays readable
      const cosR=Math.cos(rot), t=prog;

      // positions
      const pos=[];
      for(let i=0;i<P.length;i++){
        const p=P[i];
        let x = p.sx + (p.tx-p.sx)*ease;
        let y = p.sy + (p.ty-p.sy)*ease;
        // pseudo-3D Y rotation about center
        const dx = x - W/2;
        const persp = 1 + (p.depth-0.5)*0.35;
        x = W/2 + dx*cosR*persp;
        y = y + Math.sin(t*Math.PI*2 + p.phase)*1.2; // gentle float
        const alpha = (0.25 + p.depth*0.75) * (0.3+0.7*ease);
        pos.push({x,y,a:alpha,s:p.size*persp,d:p.depth});
      }
      // connection lines (AT signature)
      g.lineWidth=0.5;
      for(let i=0;i<pos.length;i+=3){
        for(let j=i+1;j<Math.min(i+9,pos.length);j++){
          const a=pos[i], b=pos[j];
          const dd=(a.x-b.x)**2+(a.y-b.y)**2;
          if(dd<520){
            g.strokeStyle='rgba(201,169,110,'+(0.05*(1-dd/520))+')';
            g.beginPath(); g.moveTo(a.x,a.y); g.lineTo(b.x,b.y); g.stroke();
          }
        }
      }
      // particles
      for(const p of pos){
        const col = p.d>0.5 ? '230,200,150' : '201,169,110';
        g.beginPath(); g.arc(p.x,p.y,p.s,0,Math.PI*2);
        g.fillStyle='rgba('+col+','+p.a+')'; g.fill();
      }
      // film grain
      g.globalAlpha=0.04;
      for(let i=0;i<1200;i++){
        g.fillStyle = Math.random()>0.5?'#fff':'#000';
        g.fillRect(Math.random()*W, Math.random()*H, 1, 1);
      }
      g.globalAlpha=1;
      return c.toDataURL('image/jpeg', 0.82);
    }, prog);

    const b64 = dataUrl.split(',')[1];
    const name = 'frame_' + String(f+1).padStart(3,'0') + '.jpg';
    fs.writeFileSync(path.join(OUT, name), Buffer.from(b64,'base64'));
  }
  await browser.close();
  const files = fs.readdirSync(OUT);
  console.log('generated', files.length, 'frames ->', OUT);
  let total=0; files.forEach(f=>total+=fs.statSync(path.join(OUT,f)).size);
  console.log('total size:', (total/1024/1024).toFixed(2), 'MB');
})();
