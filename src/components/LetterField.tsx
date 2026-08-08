import { useEffect, useRef } from 'react';

/**
 * 參考影格的字母場：整面黑底散著字母，其中一部分聚成當下的數字。
 *
 * 作法是「把字形當成一張遮罩」：把數字畫進離屏 canvas，讀回像素，
 * 有墨的地方就是字母該站的位置。剩下的字母平均撒在整個畫面上，
 * 讓數字是「浮出來」的而不是貼上去的。
 *
 * 四件事決定它看起來像不像：
 *
 * 1. 一位數字是一個格子，格子各自獨立。4:41 走到 4:40 只有個位那一格重排，
 *    前面兩位連字母都不換。整組一起重抽的話，畫面每秒大範圍翻動一次，
 *    看久了很吵，數字也永遠停不下來讓人讀。
 *    為了讓格子真的獨立，版面用等寬排：每一位數字都佔一樣寬的格子，
 *    寬度取十個數字裡最寬的那個。否則 1 換成 8 會把後面整排推開。
 *
 * 2. 每一格的字母是那一位數字自己的名字，中英各一份。4 那格由 F/O/U/R/四
 *    組成，1 那格是 O/N/E/一。用整串時間的念法（FORTY ONE）也可以，但那樣
 *    個位一變，前面幾格的字母也得跟著換，就破壞了第 1 點。
 *
 * 3. 字重與字距是這裡最關鍵的兩個數字。900 的數字有五成六的面積是實心，
 *    字母鋪上去之後 8 的中空、4 的缺口全被填滿，就變成一坨。降到 600
 *    再把字距拉開，實心面積掉到四成以下，形狀才看得出來。
 *
 * 4. 字母是飄過去而不是瞬移。每顆粒子留著自己的位置與速度，用臨界阻尼
 *    彈簧收向目標，快慢還各自有差異。停著的時候帶一個慢速正弦在浮動。
 *
 * 效能：每秒要做的事都壓到最低。遮罩與字母圖都按「單一個字」快取，
 * 全部加起來只有十幾個字，算一次就夠用一整堂課。粒子直接記著自己要畫的
 * 那張圖，每幀不查表；粒子依透明度排序後才畫，globalAlpha 從每顆一次
 * 降到每幀十幾次。
 *
 * 這個檔案不要匯出元件以外的東西，否則 Vite 的 Fast Refresh 會整包失效，
 * 開發時每改一次就整頁重載。
 */

const SHAPE_COUNT = 1400;   // 聚成數字的字母數。分給每一格之後才是那一位數字的密度
const FIELD_COUNT = 460;    // 散在背景的字母數
const OMEGA = 6.5;          // 彈簧的自然頻率，越大收得越快
const MASK_H = 150;         // 遮罩字級
const MASK_W = 210;         // 遮罩畫布寬，放得下一個 150px 的字就夠
const MASK_ROWS = 200;      // 遮罩畫布高
const TRACKING = 26;        // 格子之間的間隙，遮罩座標
const COLON_SHARE = 0.3;    // 冒號那一格分到的粒子量，相對一位數字
const ALPHA_STEP = 0.04;    // 透明度量化階距，決定一幀要切幾次 globalAlpha
const FIELD_SWAP = 0.05;    // 每秒有多少比例的背景字母換一個字
const GLOW = 4;             // 數字那組的外光暈。再大就會糊掉筆畫之間的縫

const DIGITS = '0123456789';

/** 每一個字自己的名字。中英各念一次 */
const WORDS: Record<string, string> = {
  '0': 'ZERO零', '1': 'ONE一', '2': 'TWO二', '3': 'THREE三', '4': 'FOUR四',
  '5': 'FIVE五', '6': 'SIX六', '7': 'SEVEN七', '8': 'EIGHT八', '9': 'NINE九',
  ':': '分秒',
};

/** 畫面正中央那組數字。超過一分鐘顯示 M:SS，最後一分鐘只留秒數，讓它變大 */
function faceFor(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return m === 0 ? String(s) : `${m}:${String(s).padStart(2, '0')}`;
}

function lettersOf(ch: string): string[] {
  return Array.from(new Set(WORDS[ch] ?? ch));
}

function pick<T>(list: T[]): T {
  return list[(Math.random() * list.length) | 0];
}

// --- 單一個字的遮罩。只跟字有關，跟畫面大小無關，所以可以一直留著 ---

type CharMask = {
  hits: Int32Array;
  minX: number; maxX: number; minY: number; maxY: number;
};

const EMPTY_MASK: CharMask = { hits: new Int32Array(0), minX: 0, maxX: 0, minY: 0, maxY: 0 };
const maskCache = new Map<string, CharMask>();

function maskFor(ch: string): CharMask {
  const cached = maskCache.get(ch);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = MASK_W;
  canvas.height = MASK_ROWS;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return EMPTY_MASK;

  ctx.font = `600 ${MASK_H}px ui-sans-serif, system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText(ch, MASK_W / 2, MASK_ROWS / 2);

  const data = ctx.getImageData(0, 0, MASK_W, MASK_ROWS).data;
  const hits: number[] = [];
  let minX = MASK_W, maxX = 0, minY = MASK_ROWS, maxY = 0;
  for (let y = 0; y < MASK_ROWS; y++) {
    for (let x = 0; x < MASK_W; x++) {
      if (data[(y * MASK_W + x) * 4 + 3] > 128) {
        hits.push(y * MASK_W + x);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (hits.length === 0) return EMPTY_MASK;

  const mask: CharMask = { hits: Int32Array.from(hits), minX, maxX, minY, maxY };
  maskCache.set(ch, mask);
  return mask;
}

/** 十個數字共用的度量。等寬排版與垂直對齊都靠它 */
let metrics: { cellW: number; top: number; bottom: number; maxInk: number } | null = null;

function digitMetrics() {
  if (metrics) return metrics;
  let cellW = 0, top = MASK_ROWS, bottom = 0, maxInk = 0;
  for (const d of DIGITS) {
    const m = maskFor(d);
    cellW = Math.max(cellW, m.maxX - m.minX + 1);
    top = Math.min(top, m.minY);
    bottom = Math.max(bottom, m.maxY);
    maxInk = Math.max(maxInk, m.hits.length);
  }
  metrics = { cellW, top, bottom, maxInk };
  return metrics;
}

// --- 字母的小圖。每個字每個尺寸烘一次就好 ---

const spriteCache = new Map<string, HTMLCanvasElement>();

function spriteFor(ch: string, size: number, glow: number, dpr: number) {
  const key = `${ch}|${size}|${glow}|${dpr}`;
  const cached = spriteCache.get(key);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  const box = size + Math.ceil(size * 0.9) + glow * 2;
  canvas.width = Math.ceil(box * dpr);
  canvas.height = Math.ceil(box * dpr);
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
    ctx.font = `700 ${size}px ui-sans-serif, system-ui, "PingFang TC", "Noto Sans TC", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (glow > 0) {
      ctx.shadowColor = 'rgba(255,255,255,0.55)';
      ctx.shadowBlur = glow;
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillText(ch, box / 2, box / 2);
  }
  spriteCache.set(key, canvas);
  return canvas;
}

type Particle = {
  x: number; y: number;    // 目前位置
  vx: number; vy: number;  // 目前速度，彈簧靠它才不會抖
  tx: number; ty: number;  // 目標位置
  char: string;
  img: HTMLCanvasElement | null;  // 直接記著要畫的圖，每幀不查表
  alpha: number;
  speed: number;           // 每顆快慢略有差異，抵達時間錯開才像一群東西在飄
  phase: number;           // 呼吸用的相位
  amp: number;             // 呼吸幅度
  shape: boolean;
  active: boolean;         // 細的數字用不到整格的粒子，多的就收起來不畫
};

/** 一位數字（或冒號）佔的一格。from/size 是它固定分到的那一段粒子 */
type Slot = { ch: string; cellX: number; cellW: number; from: number; size: number };

export function LetterField({
  seconds,
  paused = false,
  className = '',
}: {
  /** 剩餘秒數 */
  seconds: number;
  /** 暫停時字母停止呼吸、亮度收一點 */
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
    let brightSize = 16;
    let dimSize = 13;
    let lastFace = '';
    let spawned = false;
    /** 改過視窗大小之後版面要整個重算，不能只補變動的那一格 */
    let geometryStale = true;

    let slots: Slot[] = [];
    let pattern = '';
    let scale = 1;
    let originX = 0;
    let originY = 0;

    const particles: Particle[] = [];
    for (let i = 0; i < SHAPE_COUNT + FIELD_COUNT; i++) {
      const shape = i < SHAPE_COUNT;
      const raw = shape ? 0.88 + Math.random() * 0.12 : 0.16 + Math.random() * 0.26;
      particles.push({
        x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0,
        char: '0', img: null, shape, active: !shape,
        // 量化到固定階距，排序後同一階的可以共用一次 globalAlpha
        alpha: Math.round(raw / ALPHA_STEP) * ALPHA_STEP,
        speed: 0.7 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        amp: shape ? 1.5 + Math.random() * 2.5 : 5 + Math.random() * 9,
      });
    }
    // 背景先畫、數字後畫，數字才會壓在上面；同一組內再依透明度排，好共用設定
    particles.sort((a, b) => (a.shape === b.shape ? a.alpha - b.alpha : (a.shape ? 1 : -1)));
    const shapePool = particles.filter((p) => p.shape);
    const fieldPool = particles.filter((p) => !p.shape);

    const setChar = (p: Particle, ch: string) => {
      p.char = ch;
      p.img = spriteFor(ch, p.shape ? brightSize : dimSize, p.shape ? GLOW : 0, dpr);
    };

    const spawnFromRing = (p: Particle) => {
      const a = Math.random() * Math.PI * 2;
      const d = Math.max(w, h) * (0.6 + Math.random() * 0.4);
      p.x = w / 2 + Math.cos(a) * d;
      p.y = h / 2 + Math.sin(a) * d;
      p.vx = 0;
      p.vy = 0;
    };

    /**
     * 依 face 的樣式（哪幾格是數字、哪一格是冒號）算版面。
     * 刻意只看樣式不看數字，這樣 4:41 與 4:40 的格子位置與粒子分配完全一樣。
     */
    const layOut = (face: string) => {
      const met = digitMetrics();
      const chars = face.split('');
      const colon = maskFor(':');
      const widths = chars.map((c) => (c === ':' ? colon.maxX - colon.minX + 1 : met.cellW));
      const totalW = widths.reduce((a, b) => a + b, 0) + TRACKING * (chars.length - 1);
      const totalH = met.bottom - met.top + 1;

      // 數字要夠大，字母之間才拉得開；擠在一起就糊成一團，讀不出是幾分幾秒
      scale = Math.min((h * 0.56) / totalH, (w * 0.7) / totalW);
      originX = (w - totalW * scale) / 2;
      originY = (h - totalH * scale) / 2;

      const weights = chars.map((c) => (c === ':' ? COLON_SHARE : 1));
      const weightSum = weights.reduce((a, b) => a + b, 0);
      let cursorX = 0;
      let cursorP = 0;
      slots = chars.map((c, i) => {
        const size = i === chars.length - 1
          ? SHAPE_COUNT - cursorP
          : Math.round((SHAPE_COUNT * weights[i]) / weightSum);
        const slot: Slot = { ch: c, cellX: cursorX, cellW: widths[i], from: cursorP, size };
        cursorX += widths[i] + TRACKING;
        cursorP += size;
        return slot;
      });
      pattern = chars.map((c) => (c === ':' ? ':' : '#')).join('');
    };

    /** 把一格的粒子放到那個字的筆畫上。只有這一格會動 */
    const placeSlot = (slot: Slot, ring: boolean) => {
      const met = digitMetrics();
      const mask = maskFor(slot.ch);
      if (mask.hits.length === 0) return;

      const inkW = mask.maxX - mask.minX + 1;
      // 字在自己格子裡置中。等寬排版下 1 比 8 窄，不置中會看起來偏左
      const dx = slot.cellX + (slot.cellW - inkW) / 2 - mask.minX;
      const letters = lettersOf(slot.ch);

      // 細的字（1）墨少，用滿整格會比粗的字（8）密上三倍。按墨量收，密度才一致
      const ratio = slot.ch === ':' ? 1 : mask.hits.length / met.maxInk;
      const live = Math.max(8, Math.min(slot.size, Math.round(slot.size * ratio)));

      for (let k = 0; k < slot.size; k++) {
        const p = shapePool[slot.from + k];
        if (!p) break;
        if (k >= live) {
          p.active = false;
          continue;
        }
        const idx = mask.hits[(Math.random() * mask.hits.length) | 0];
        p.active = true;
        p.tx = originX + (dx + (idx % MASK_W) + Math.random()) * scale;
        p.ty = originY + (((idx / MASK_W) | 0) - met.top + Math.random()) * scale;
        setChar(p, pick(letters));
        if (ring) spawnFromRing(p);
      }
    };

    /** 背景字母。位置只在開場與改視窗大小時重撒，平常靠呼吸就夠了 */
    const placeField = (letters: string[], ring: boolean) => {
      const cols = Math.max(1, Math.ceil(Math.sqrt((FIELD_COUNT * w) / h)));
      const rows = Math.ceil(FIELD_COUNT / cols);
      fieldPool.forEach((p, i) => {
        p.tx = (((i % cols) + 0.1 + Math.random() * 0.8) / cols) * w;
        p.ty = ((((i / cols) | 0) + 0.1 + Math.random() * 0.8) / rows) * h;
        setChar(p, pick(letters));
        if (ring) spawnFromRing(p);
      });
    };

    const applyFace = (face: string) => {
      const chars = face.split('');
      const nextPattern = chars.map((c) => (c === ':' ? ':' : '#')).join('');
      const rebuild = geometryStale || nextPattern !== pattern || slots.length !== chars.length;
      const firstRun = !spawned;
      const letters = Array.from(new Set(chars.flatMap(lettersOf)));

      if (rebuild) {
        layOut(face);
        for (const slot of slots) placeSlot(slot, firstRun);
        placeField(letters, firstRun);
        geometryStale = false;
      } else {
        // 這是常走的那條路：一秒過去，通常只有個位變了
        slots.forEach((slot, i) => {
          if (slot.ch === chars[i]) return;
          slot.ch = chars[i];
          placeSlot(slot, false);
        });
        // 背景不重排，只讓少數幾個字母悄悄換一個字，整片才不會跟著閃
        for (const p of fieldPool) {
          if (Math.random() < FIELD_SWAP) setChar(p, pick(letters));
        }
      }
      spawned = true;
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

      brightSize = Math.max(11, Math.min(20, Math.round(h / 46)));
      dimSize = Math.max(9, Math.round(brightSize * 0.78));
      for (const p of particles) setChar(p, p.char);

      geometryStale = true;
      lastFace = ''; // 逼下一幀依新尺寸重算版面
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
        applyFace(face);
        lastFace = face;
      }

      const t = now / 1000;
      const breath = isPaused || prefersReduced ? 0 : 1;
      // 暫停時只稍微收一點亮度。壓太暗的話講者停下來講話時整片畫面等於黑掉
      const alphaMul = isPaused ? 0.7 : 1;
      ctx.clearRect(0, 0, w, h);

      let curAlpha = -1;
      for (const p of particles) {
        if (!p.active || !p.img) continue;

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

        const a = p.alpha * alphaMul;
        if (a !== curAlpha) {
          ctx.globalAlpha = a;
          curAlpha = a;
        }
        const gw = p.img.width / dpr;
        const gh = p.img.height / dpr;
        ctx.drawImage(p.img, p.x - gw / 2, p.y - gh / 2, gw, gh);
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
