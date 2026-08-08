import { useEffect, useRef } from 'react';

/**
 * 參考影格的字母場：整面黑底散著字母，其中一部分聚成當下的數字。
 *
 * 作法是「把字形當成一張遮罩」：先把 4:54 這種字串畫進一張離屏 canvas，
 * 讀回像素，有墨的地方就是字母該站的位置。剩下的字母平均撒在整個畫面上，
 * 讓數字是「浮出來」的而不是貼上去的。
 *
 * 三件事決定它看起來像不像：
 *   1. 字母要是當下這個數字念出來的字。英文拼字加中文寫法一起用，
 *      台下看到的是「四分五十四秒」跟 FOUR FIFTY FOUR 混在一起，
 *      而不是一堆無意義的符號。
 *   2. 秒數跳動時字母是「飄過去」而不是瞬移。每顆粒子留著自己的位置與速度，
 *      每秒只換目標點，再用臨界阻尼彈簧收過去，所以不會抖也不會過頭。
 *   3. 停下來的時候也要有呼吸。每顆粒子帶一個慢速的正弦偏移，
 *      整片字母會緩緩浮動，不會像一張靜止的圖。
 *
 * 這一頁每秒都會換一次數字，所以「每秒要做的事」要壓到最低，否則每一秒
 * 都會頓一下。三個地方都做了處理：
 *   烘字母圖與掃遮罩像素都有快取，同一個字母表與同一組數字只算第一次；
 *   換目標點時直接寫進粒子，不另外配一整個陣列；
 *   粒子依透明度排序後才畫，globalAlpha 從每顆一次降到每幀十幾次。
 *
 * 這個檔案不要匯出元件以外的東西，否則 Vite 的 Fast Refresh 會整包失效，
 * 開發時每改一次就整頁重載。
 */

const SHAPE_COUNT = 1000;  // 聚成數字的字母數。太密會糊成一團，太疏就讀不出數字
const FIELD_COUNT = 460;   // 散在背景的字母數
const OMEGA = 6.5;         // 彈簧的自然頻率，越大收得越快
const MASK_H = 150;        // 遮罩取樣高度，夠細就好，不用跟畫面同解析度
const ALPHA_STEP = 0.04;   // 透明度量化階距，決定一幀要切幾次 globalAlpha

const ONES = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE',
  'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN',
  'EIGHTEEN', 'NINETEEN'];
const TENS = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
const ZH = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

function spellEn(n: number): string {
  if (n < 20) return ONES[n];
  const r = n % 10;
  return r === 0 ? TENS[Math.floor(n / 10)] : `${TENS[Math.floor(n / 10)]}${ONES[r]}`;
}

function spellZh(n: number): string {
  if (n < 10) return ZH[n];
  const t = Math.floor(n / 10);
  const r = n % 10;
  return `${t === 1 ? '' : ZH[t]}十${r === 0 ? '' : ZH[r]}`;
}

/** 這一秒要用的字。中英各念一次，去掉重複的字元 */
function alphabetFor(totalSeconds: number): string[] {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  const en = m === 0 ? spellEn(s) : `${spellEn(m)}${spellEn(s)}`;
  const zh = m === 0 ? `${spellZh(s)}秒` : `${spellZh(m)}分${spellZh(s)}秒`;
  return Array.from(new Set((en + zh).split('')));
}

/** 畫面正中央那組數字。超過一分鐘顯示 M:SS，否則只顯示秒數 */
function faceFor(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return m === 0 ? String(s) : `${m}:${String(s).padStart(2, '0')}`;
}

type Particle = {
  x: number; y: number;    // 目前位置
  vx: number; vy: number;  // 目前速度，彈簧靠它才不會抖
  tx: number; ty: number;  // 目標位置
  ch: number;              // 在字母圖集裡的索引
  alpha: number;
  speed: number;           // 每顆快慢略有差異，抵達時間錯開才像一群東西在飄
  phase: number;           // 呼吸用的相位
  amp: number;             // 呼吸幅度
  shape: boolean;
  slot: number;            // 在自己這一組裡的編號。排序之後不能再用陣列索引推
};

/** 一組數字的遮罩取樣結果。存的是遮罩座標，跟畫面大小無關，換視窗尺寸也不必重算 */
type MaskInfo = {
  hits: Int32Array;
  maskW: number;
  minX: number; minY: number;
  inkW: number; inkH: number;
};

export function LetterField({
  seconds,
  paused = false,
  className = '',
}: {
  /** 剩餘秒數 */
  seconds: number;
  /** 暫停時字母停止呼吸、亮度降下來 */
  paused?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 目標值放進 ref，秒數變動時不重建整個 canvas 與粒子池
  const targetRef = useRef({ seconds, paused });
  targetRef.current = { seconds, paused };

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    let w = 0;
    let h = 0;
    let raf = 0;
    let bright: HTMLCanvasElement[] = [];
    let dim: HTMLCanvasElement[] = [];
    let glyphChars = '';
    let lastFace = '';
    let lastAlphabet = '';
    /** 只有真正第一次進場才從畫面外收進來。改視窗大小時重算位置，但不要整個重來 */
    let spawned = false;

    // 一堂課會出現的字母表與數字都只有幾十種，全部留著也不佔多少記憶體
    const glyphCache = new Map<string, { bright: HTMLCanvasElement[]; dim: HTMLCanvasElement[] }>();
    const maskCache = new Map<string, MaskInfo | null>();

    const particles: Particle[] = [];
    for (let i = 0; i < SHAPE_COUNT + FIELD_COUNT; i++) {
      const shape = i < SHAPE_COUNT;
      const raw = shape ? 0.88 + Math.random() * 0.12 : 0.16 + Math.random() * 0.26;
      particles.push({
        x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, ch: 0, shape,
        slot: shape ? i : i - SHAPE_COUNT,
        // 量化到固定階距，等一下排序後同一階的可以共用一次 globalAlpha
        alpha: Math.round(raw / ALPHA_STEP) * ALPHA_STEP,
        speed: 0.7 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        amp: shape ? 1.5 + Math.random() * 2.5 : 5 + Math.random() * 9,
      });
    }
    // 背景先畫、數字後畫，數字才會壓在上面；同一組內再依透明度排，好讓相鄰的共用設定
    particles.sort((a, b) => (a.shape === b.shape ? a.alpha - b.alpha : (a.shape ? 1 : -1)));

    /** 把字母表烘成兩組小圖：數字用的（大、帶光暈）與背景用的（小、乾淨） */
    const bakeGlyphs = (chars: string[]) => {
      const joined = chars.join('');
      glyphChars = joined;
      const base = Math.max(11, Math.min(20, Math.round(h / 46)));
      const key = `${joined}|${base}`;
      const cached = glyphCache.get(key);
      if (cached) {
        bright = cached.bright;
        dim = cached.dim;
        return;
      }

      const bake = (size: number, glow: number) => chars.map((ch) => {
        const g = document.createElement('canvas');
        const box = size + Math.ceil(size * 0.9) + glow * 2;
        g.width = Math.ceil(box * dpr);
        g.height = Math.ceil(box * dpr);
        const gc = g.getContext('2d');
        if (!gc) return g;
        gc.scale(dpr, dpr);
        gc.font = `700 ${size}px ui-sans-serif, system-ui, "PingFang TC", "Noto Sans TC", sans-serif`;
        gc.textAlign = 'center';
        gc.textBaseline = 'middle';
        if (glow > 0) {
          gc.shadowColor = 'rgba(255,255,255,0.55)';
          gc.shadowBlur = glow;
        }
        gc.fillStyle = '#ffffff';
        gc.fillText(ch, box / 2, box / 2);
        return g;
      });

      // 光暈只給數字那組，而且要克制：糊掉的話字母就疊成一團看不出形狀
      bright = bake(base, 4);
      dim = bake(Math.round(base * 0.78), 0);
      glyphCache.set(key, { bright, dim });
    };

    /** 把 face 這串字畫進離屏 canvas，抽出有墨的像素。同一組數字只掃一次 */
    const maskFor = (face: string): MaskInfo | null => {
      const cached = maskCache.get(face);
      if (cached !== undefined) return cached;

      const mask = document.createElement('canvas');
      const mctx = mask.getContext('2d', { willReadFrequently: true });
      if (!mctx) return null;

      // 字重與字距是這一頁最關鍵的兩個數字。900 的數字有五成六的面積是實心，
      // 字母鋪上去之後 8 的中空、4 的缺口、字與字的間隙全被填滿，就變成一坨。
      // 降到 600 再把字距拉開，實心面積掉到不到四成，形狀才看得出來。
      const font = `600 ${MASK_H}px ui-sans-serif, system-ui, sans-serif`;
      const spacing = `${Math.round(MASK_H * 0.12)}px`;
      const setup = () => {
        mctx.font = font;
        // 舊瀏覽器沒有這個屬性，設不上去就只是沒有額外字距，不會壞
        mctx.letterSpacing = spacing;
      };

      setup();
      mask.width = Math.ceil(mctx.measureText(face).width) + 40;
      mask.height = Math.ceil(MASK_H * 1.3);

      // 改過 width/height 之後 context 會重置，字型要重設一次
      setup();
      mctx.fillStyle = '#fff';
      mctx.textAlign = 'center';
      mctx.textBaseline = 'middle';
      mctx.fillText(face, mask.width / 2, mask.height / 2);

      const data = mctx.getImageData(0, 0, mask.width, mask.height).data;
      const hits: number[] = [];
      let minX = mask.width, maxX = 0, minY = mask.height, maxY = 0;
      for (let y = 0; y < mask.height; y++) {
        for (let x = 0; x < mask.width; x++) {
          if (data[(y * mask.width + x) * 4 + 3] > 128) {
            hits.push(y * mask.width + x);
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      const info: MaskInfo | null = hits.length === 0 ? null : {
        hits: Int32Array.from(hits),
        maskW: mask.width,
        minX,
        minY,
        inkW: maxX - minX + 1,
        inkH: maxY - minY + 1,
      };
      maskCache.set(face, info);
      return info;
    };

    /** 換一組目標點。直接寫進粒子，不另外配陣列，這是每秒都會跑的路徑 */
    const retarget = (face: string, chars: string[]) => {
      const mask = maskFor(face);
      const firstRun = !spawned;
      const joined = chars.join('');
      const alphabetChanged = joined !== lastAlphabet;

      // 縮放要照「真的有墨的範圍」算，不是照畫布大小。字型的行高留白很多，
      // 拿畫布高度去算會讓數字只有預期的三分之二大
      let scale = 0, ox = 0, oy = 0;
      if (mask) {
        // 數字要夠大，字母之間才拉得開；擠在一起就糊成一團，讀不出是幾分幾秒
        scale = Math.min((h * 0.56) / mask.inkH, (w * 0.7) / mask.inkW);
        ox = (w - mask.inkW * scale) / 2;
        oy = (h - mask.inkH * scale) / 2;
      }
      // 背景字母切成格子再各自抖動，避免純亂數擠成一團一團
      const cols = Math.max(1, Math.ceil(Math.sqrt((FIELD_COUNT * w) / h)));
      const rows = Math.ceil(FIELD_COUNT / cols);

      for (const p of particles) {
        if (p.shape) {
          if (!mask) continue;
          const idx = mask.hits[(Math.random() * mask.hits.length) | 0];
          p.tx = ox + ((idx % mask.maskW) - mask.minX + Math.random()) * scale;
          p.ty = oy + (((idx / mask.maskW) | 0) - mask.minY + Math.random()) * scale;
        } else {
          p.tx = (((p.slot % cols) + 0.1 + Math.random() * 0.8) / cols) * w;
          p.ty = ((((p.slot / cols) | 0) + 0.1 + Math.random() * 0.8) / rows) * h;
        }
        if (firstRun) {
          // 開場從畫面外圍收進來，不要憑空出現
          const a = Math.random() * Math.PI * 2;
          const d = Math.max(w, h) * (0.6 + Math.random() * 0.4);
          p.x = w / 2 + Math.cos(a) * d;
          p.y = h / 2 + Math.sin(a) * d;
          p.vx = 0;
          p.vy = 0;
        }
        if (alphabetChanged || firstRun) {
          p.ch = (Math.random() * chars.length) | 0;
        }
      }
      spawned = true;
      lastAlphabet = joined;
    };

    const resize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bakeGlyphs(glyphChars ? glyphChars.split('') : alphabetFor(targetRef.current.seconds));
      lastFace = ''; // 逼下一幀依新尺寸重算目標點
    };

    resize();

    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (w === 0 || h === 0) return;

      // 夾住 dt：切回分頁時會累積出很大的一步，不夾會讓整片字母瞬移
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;

      const { seconds: sec, paused: isPaused } = targetRef.current;
      const face = faceFor(sec);
      if (face !== lastFace) {
        const chars = alphabetFor(sec);
        if (chars.join('') !== glyphChars) bakeGlyphs(chars);
        retarget(face, chars);
        lastFace = face;
      }

      const t = now / 1000;
      const breath = isPaused || prefersReduced ? 0 : 1;
      // 暫停時只稍微收一點亮度。壓太暗的話講者停下來講話時整片畫面等於黑掉
      const alphaMul = isPaused ? 0.7 : 1;
      ctx.clearRect(0, 0, w, h);

      let curAlpha = -1;
      for (const p of particles) {
        // 呼吸：目標點自己慢慢晃，整片字母才不會像一張靜止的圖
        const tx = p.tx + Math.cos(t * 0.35 + p.phase) * p.amp * breath;
        const ty = p.ty + Math.sin(t * 0.28 + p.phase * 1.3) * p.amp * breath;

        if (prefersReduced) {
          p.x = tx;
          p.y = ty;
        } else {
          // 臨界阻尼彈簧的隱式解。不會過頭、不會抖，而且跟畫面更新率無關
          const omega = OMEGA * p.speed * (isPaused ? 0.5 : 1);
          const f = 1 + 2 * dt * omega;
          const hoo = dt * omega * omega;
          const hhoo = dt * hoo;
          const detInv = 1 / (f + hhoo);
          const nvx = (p.vx + hoo * (tx - p.x)) * detInv;
          const nvy = (p.vy + hoo * (ty - p.y)) * detInv;
          p.x = (f * p.x + dt * p.vx + hhoo * tx) * detInv;
          p.y = (f * p.y + dt * p.vy + hhoo * ty) * detInv;
          p.vx = nvx;
          p.vy = nvy;
        }

        const atlas = p.shape ? bright : dim;
        const g = atlas[p.ch % atlas.length];
        if (!g) continue;
        const a = p.alpha * alphaMul;
        if (a !== curAlpha) {
          ctx.globalAlpha = a;
          curAlpha = a;
        }
        const gw = g.width / dpr;
        const gh = g.height / dpr;
        ctx.drawImage(g, p.x - gw / 2, p.y - gh / 2, gw, gh);
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(loop);

    const observer = new ResizeObserver(resize);
    observer.observe(parent);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
}
