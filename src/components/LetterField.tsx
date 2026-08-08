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
 * 效能：fillText 每幀上千次會卡，所以每個字母先烘成小圖，之後只做 drawImage。
 * 亮的那組（數字）跟暗的那組（背景）各烘一份，差別在字級與外光暈。
 */

const SHAPE_COUNT = 1100;  // 聚成數字的字母數。要夠密，數字才讀得出來
const FIELD_COUNT = 460;   // 散在背景的字母數
const OMEGA = 6.5;         // 彈簧的自然頻率，越大收得越快
const MASK_H = 150;        // 遮罩取樣高度，夠細就好，不用跟畫面同解析度

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
export function alphabetFor(totalSeconds: number): string[] {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  const en = m === 0 ? spellEn(s) : `${spellEn(m)}${spellEn(s)}`;
  const zh = m === 0 ? `${spellZh(s)}秒` : `${spellZh(m)}分${spellZh(s)}秒`;
  return Array.from(new Set((en + zh).split('')));
}

/** 畫面正中央那組數字。超過一分鐘顯示 M:SS，否則只顯示秒數 */
export function faceFor(totalSeconds: number): string {
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
    let glyphChars: string[] = [];
    let lastFace = '';
    let lastAlphabet = '';
    /** 只有真正第一次進場才從畫面外收進來。改視窗大小時重算位置，但不要整個重來 */
    let spawned = false;

    const particles: Particle[] = [];
    for (let i = 0; i < SHAPE_COUNT + FIELD_COUNT; i++) {
      const shape = i < SHAPE_COUNT;
      particles.push({
        x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, ch: 0, shape,
        alpha: shape ? 0.88 + Math.random() * 0.12 : 0.16 + Math.random() * 0.26,
        speed: 0.7 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        amp: shape ? 1.5 + Math.random() * 2.5 : 5 + Math.random() * 9,
      });
    }

    /** 把字母表烘成兩組小圖：數字用的（大、帶光暈）與背景用的（小、乾淨） */
    const bakeGlyphs = (chars: string[]) => {
      glyphChars = chars;
      const bake = (size: number, glow: number) => chars.map((ch) => {
        const g = document.createElement('canvas');
        const pad = Math.ceil(size * 0.9) + glow * 2;
        const box = size + pad;
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

      const base = Math.max(12, Math.min(22, Math.round(h / 38)));
      // 光暈只給數字那組，而且要克制：糊掉的話字母就疊成一團看不出形狀
      bright = bake(base, 4);
      dim = bake(Math.round(base * 0.78), 0);
    };

    /** 把 face 這串字畫進離屏 canvas，抽出有墨的點（已換算成畫面座標） */
    const sampleFace = (face: string): { x: number; y: number }[] => {
      const mask = document.createElement('canvas');
      const mctx = mask.getContext('2d', { willReadFrequently: true });
      if (!mctx) return [];

      const font = `900 ${MASK_H}px ui-sans-serif, system-ui, sans-serif`;
      mctx.font = font;
      mask.width = Math.ceil(mctx.measureText(face).width) + 8;
      mask.height = Math.ceil(MASK_H * 1.3);

      // 改過 width/height 之後 context 會重置，字型要重設一次
      mctx.font = font;
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
      if (hits.length === 0) return [];

      // 縮放要照「真的有墨的範圍」算，不是照畫布大小。字型的行高留白很多，
      // 拿畫布高度去算會讓數字只有預期的三分之二大
      const inkW = maxX - minX + 1;
      const inkH = maxY - minY + 1;
      // 數字要夠大，字母之間才拉得開；擠在一起就糊成一團，讀不出是幾分幾秒
      const scale = Math.min((h * 0.5) / inkH, (w * 0.6) / inkW);
      const ox = (w - inkW * scale) / 2;
      const oy = (h - inkH * scale) / 2;

      const picked: { x: number; y: number }[] = [];
      for (let i = 0; i < SHAPE_COUNT; i++) {
        const idx = hits[(Math.random() * hits.length) | 0];
        picked.push({
          x: ox + ((idx % mask.width) - minX + Math.random()) * scale,
          y: oy + (Math.floor(idx / mask.width) - minY + Math.random()) * scale,
        });
      }
      return picked;
    };

    /** 背景字母：切成格子再各自抖動，避免純亂數擠成一團一團 */
    const scatterField = (): { x: number; y: number }[] => {
      const cols = Math.max(1, Math.ceil(Math.sqrt((FIELD_COUNT * w) / h)));
      const rows = Math.ceil(FIELD_COUNT / cols);
      const out: { x: number; y: number }[] = [];
      for (let i = 0; i < FIELD_COUNT; i++) {
        out.push({
          x: (((i % cols) + 0.1 + Math.random() * 0.8) / cols) * w,
          y: ((Math.floor(i / cols) + 0.1 + Math.random() * 0.8) / rows) * h,
        });
      }
      return out;
    };

    const retarget = (face: string, chars: string[]) => {
      const shapePts = sampleFace(face);
      const fieldPts = scatterField();
      const alphabetChanged = chars.join('') !== lastAlphabet;
      const firstRun = !spawned;
      spawned = true;

      particles.forEach((p, i) => {
        const pt = p.shape ? shapePts[i] : fieldPts[i - SHAPE_COUNT];
        if (!pt) return;
        p.tx = pt.x;
        p.ty = pt.y;
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
      });
      lastAlphabet = chars.join('');
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
      bakeGlyphs(glyphChars.length ? glyphChars : alphabetFor(targetRef.current.seconds));
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
        if (chars.join('') !== glyphChars.join('')) bakeGlyphs(chars);
        retarget(face, chars);
        lastFace = face;
      }

      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // 呼吸：目標點自己慢慢晃，整片字母才不會像一張靜止的圖
        const breath = isPaused || prefersReduced ? 0 : 1;
        const tx = p.tx + Math.cos(t * 0.35 + p.phase) * p.amp * breath;
        const ty = p.ty + Math.sin(t * 0.28 + p.phase * 1.3) * p.amp * breath;

        if (prefersReduced) {
          p.x = tx;
          p.y = ty;
        } else {
          // 臨界阻尼彈簧的隱式解。不會過頭、不會抖，而且跟畫面更新率無關
          const omega = OMEGA * p.speed * (isPaused ? 0.5 : 1);
          const f = 1 + 2 * dt * omega;
          const oo = omega * omega;
          const hoo = dt * oo;
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
        const gw = g.width / dpr;
        const gh = g.height / dpr;
        ctx.globalAlpha = isPaused ? p.alpha * 0.4 : p.alpha;
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
