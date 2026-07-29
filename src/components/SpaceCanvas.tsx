import { useEffect, useRef } from 'react';

export type PlanetKey = 'earth' | 'mars' | 'moon' | 'jupiter' | 'saturn';

type PlanetSpec = {
  label: string;
  /** 受光面的粒子顏色 */
  surface: [number, number, number];
  /** 輪廓邊緣光的顏色 */
  rim: [number, number, number];
  /** 大氣層輝光顏色；null 代表沒有大氣（月球） */
  atmosphere: [number, number, number] | null;
  /** 大氣輝光強度 */
  glow: number;
  /** 球體底色，由地平線往下三段 */
  body: [string, string, string];
  /** 緯向條紋數，0 為無條紋 */
  bands: number;
  /** 是否有看得見的光環。木星的環太黯淡，只有土星畫得出來 */
  rings?: boolean;
};

export const PLANETS: Record<PlanetKey, PlanetSpec> = {
  earth: {
    label: '地球',
    surface: [112, 168, 232],
    rim: [238, 240, 255],
    atmosphere: [146, 198, 255],
    glow: 1,
    body: ['rgba(16,26,46,0.95)', 'rgba(8,14,26,0.95)', 'rgba(4,7,14,0.95)'],
    bands: 0,
  },
  mars: {
    label: '火星',
    surface: [214, 118, 72],
    rim: [255, 204, 166],
    atmosphere: [255, 168, 116],
    glow: 0.6,
    body: ['rgba(44,24,16,0.95)', 'rgba(24,13,9,0.95)', 'rgba(10,6,4,0.95)'],
    bands: 0,
  },
  moon: {
    label: '月球',
    surface: [186, 190, 200],
    rim: [240, 244, 250],
    atmosphere: null, // 沒有大氣層，所以沒有輝光，明暗交界也更銳利
    glow: 0,
    body: ['rgba(26,28,34,0.95)', 'rgba(14,15,19,0.95)', 'rgba(6,7,9,0.95)'],
    bands: 0,
  },
  jupiter: {
    label: '木星',
    surface: [222, 170, 110],
    rim: [255, 228, 182],
    atmosphere: [255, 196, 130],
    glow: 0.85,
    body: ['rgba(48,34,20,0.95)', 'rgba(26,18,11,0.95)', 'rgba(11,8,5,0.95)'],
    bands: 9,
  },
  saturn: {
    label: '土星',
    surface: [214, 192, 146],
    rim: [255, 246, 216],
    atmosphere: [255, 226, 168],
    glow: 0.8,
    body: ['rgba(44,36,22,0.95)', 'rgba(24,20,12,0.95)', 'rgba(10,8,5,0.95)'],
    bands: 6,
    rings: true,
  },
};

const LAT_STEPS = 620;    // 整顆球的緯線數，畫面上只會用到最上面約四分之一
const LON_DENSITY = 1000; // 赤道上的經度點數，其餘緯度依 sin 收斂
const DOT = 0.85;         // 點的邊長
const T_LEVELS = 8;       // 邊緣光混色分層
const A_LEVELS = 12;      // 透明度分層
const SPIN_MS = 240000;   // 自轉一圈的毫秒數，慢到不搶注意力
const FRAME_MS = 33;      // 更新間隔上限，約 30fps

/**
 * 從軌道上看星球的畫面：星塵 + 經緯粒子點陣，星球沿極軸緩慢自轉。
 * 星塵先畫進離屏 canvas，每幀直接貼上，只有球體重算。
 * 粒子依「邊緣光程度 × 透明度」分桶後批次繪製，把 fillStyle 的切換
 * 從上萬次壓到不到一百次，這是能跑滿 60fps 的關鍵。
 */
export function SpaceCanvas({
  planet = 'earth',
  animate = true,
  className = '',
}: {
  planet?: PlanetKey;
  animate?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spec = PLANETS[planet];
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const spinning = animate && !prefersReduced;

    let w = 0;
    let h = 0;
    let starLayer: HTMLCanvasElement | null = null;
    let raf = 0;

    // 分桶用的座標暫存，跨幀重複使用，避免每幀配置記憶體
    const bucketCount = T_LEVELS * A_LEVELS;
    const bucketX: number[][] = Array.from({ length: bucketCount }, () => []);
    const bucketY: number[][] = Array.from({ length: bucketCount }, () => []);

    const buildStars = () => {
      const layer = document.createElement('canvas');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      layer.width = Math.round(w * dpr);
      layer.height = Math.round(h * dpr);
      const sctx = layer.getContext('2d');
      if (!sctx) return null;
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 固定種子的偽隨機，確保重繪時星圖不會跳位置
      let seed = 20260728;
      const rand = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      };

      const starCount = Math.round((w * h) / 620);
      for (let i = 0; i < starCount; i++) {
        const x = rand() * w;
        const y = rand() * h * 0.95;
        const roll = rand();
        const size = roll > 0.975 ? 1.5 : roll > 0.86 ? 1.0 : 0.65;
        const alpha = 0.1 + rand() * 0.72;
        sctx.beginPath();
        sctx.arc(x, y, size, 0, Math.PI * 2);
        sctx.fillStyle = `rgba(226,238,255,${alpha})`;
        sctx.fill();
      }
      return layer;
    };

    const resize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      starLayer = buildStars();
    };

    const render = (rot: number) => {
      if (w === 0 || h === 0) return;
      ctx.clearRect(0, 0, w, h);
      if (starLayer) ctx.drawImage(starLayer, 0, 0, w, h);

      // --- 球體幾何：球心沉在畫面下方，只露出頂端一道弧 ---
      const R = Math.max(w, 460) * 1.75;
      const horizonY = h * 0.55;
      const cx = w / 2;
      const cy = horizonY + R;

      // 球體本身（深色底，讓粒子有東西可以浮出來）
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      const body = ctx.createLinearGradient(0, horizonY, 0, h);
      body.addColorStop(0, spec.body[0]);
      body.addColorStop(0.5, spec.body[1]);
      body.addColorStop(1, spec.body[2]);
      ctx.fillStyle = body;
      ctx.fillRect(0, horizonY - 2, w, h - horizonY + 2);
      ctx.restore();

      // 大氣層：貼著地平線外緣的一圈輝光（月球沒有）
      if (spec.atmosphere) {
        const [ar, ag, ab] = spec.atmosphere;
        const halo = ctx.createRadialGradient(cx, cy, R * 0.978, cx, cy, R * 1.05);
        halo.addColorStop(0, `rgba(${ar},${ag},${ab},0)`);
        halo.addColorStop(0.42, `rgba(${ar},${ag},${ab},${0.55 * spec.glow})`);
        halo.addColorStop(0.72, `rgba(${ar},${ag},${ab},${0.14 * spec.glow})`);
        halo.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, w, h);
      }

      // --- 粒子點陣 ---
      const lx = -0.42, ly = 0.52, lz = 0.74; // 光源在左上前方
      const lLen = Math.hypot(lx, ly, lz);
      const yMin = (cy - h) / R - 0.03; // 低於這個緯度不會出現在畫面上
      const sharpRim = spec.atmosphere === null; // 無大氣：邊緣光更窄

      for (let b = 0; b < bucketCount; b++) {
        bucketX[b].length = 0;
        bucketY[b].length = 0;
      }

      for (let i = 0; i < LAT_STEPS; i++) {
        const phi = (i / LAT_STEPS) * Math.PI; // 從北極量起的極角
        const y = Math.cos(phi);
        if (y < yMin) break; // 再往下就出畫面了

        const ring = Math.sin(phi);
        const lonCount = Math.max(8, Math.round(LON_DENSITY * ring));
        const sy = cy - y * R;
        // 每條緯線錯開一個黃金角，否則各列的經度會對齊成垂直條紋
        const phase = i * 2.39996323 + rot;
        const step = (Math.PI * 2) / lonCount;

        // 木星的緯向條紋
        const band = spec.bands ? 0.72 + 0.28 * Math.sin(phi * spec.bands * Math.PI) : 1;
        const ylit = y * ly;

        for (let j = 0; j < lonCount; j++) {
          const theta = phase + j * step;
          const z = Math.sin(theta) * ring;
          if (z <= 0) continue; // 背面不畫

          const x = Math.cos(theta) * ring;
          const sx = cx + x * R;
          if (sx < -2 || sx > w + 2) continue;

          // 蘭伯特光照
          const lit = Math.max(0, (x * lx + ylit + z * lz) / lLen);

          // 邊緣光：z 越接近 0 代表越靠近球體輪廓。
          // 這裡要的是 (1-z²)^30 或 ^65，用連續平方展開，比 Math.pow 快得多
          const v = 1 - z * z;
          const v2 = v * v, v4 = v2 * v2, v8 = v4 * v4, v16 = v8 * v8, v32 = v16 * v16;
          const falloff = sharpRim ? v32 * v16 * v8 * v4 * v : v16 * v8 * v4 * v2;
          const rim = falloff * (0.28 + 0.72 * lit);

          const alpha = Math.min(0.95, (0.05 + lit * 0.5 + rim * 0.8) * band);
          if (alpha < 0.04) continue;

          const tIdx = Math.min(T_LEVELS - 1, (rim * 1.7 * T_LEVELS) | 0);
          const aIdx = Math.min(A_LEVELS - 1, ((alpha / 0.95) * A_LEVELS) | 0);
          const b = tIdx * A_LEVELS + aIdx;
          bucketX[b].push(sx);
          bucketY[b].push(sy);
        }
      }

      const [sr, sg, sb] = spec.surface;
      const [rr, rg, rb] = spec.rim;
      for (let t = 0; t < T_LEVELS; t++) {
        const mix = t / (T_LEVELS - 1);
        const cr = Math.round(sr + (rr - sr) * mix);
        const cg = Math.round(sg + (rg - sg) * mix);
        const cb = Math.round(sb + (rb - sb) * mix);
        const size = DOT + mix * 0.5;
        for (let a = 0; a < A_LEVELS; a++) {
          const b = t * A_LEVELS + a;
          const xs = bucketX[b];
          if (xs.length === 0) continue;
          const ys = bucketY[b];
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${(((a + 0.5) / A_LEVELS) * 0.95).toFixed(3)})`;
          for (let k = 0; k < xs.length; k++) ctx.fillRect(xs[k], ys[k], size, size);
        }
      }

      // --- 光環：從地平線後方斜跨過天空，被星球擋住的那段不畫 ---
      if (spec.rings) {
        // 環用自己的亂數種子，才不會動到星圖
        let rseed = 90210;
        const rrand = () => {
          rseed = (rseed * 1664525 + 1013904223) % 4294967296;
          return rseed / 4294967296;
        };

        const RING_DOTS = 20000;
        const baseY = h * 0.17;      // 環在畫面中央的高度，讓開下方的主要內容
        const tilt = -0.10;          // 斜度，左高右低
        const curve = 0.00022;       // 往兩側微微下彎，像繞著星球
        const halfWidth = h * 0.055; // 環的厚度，窄一點才像環

        // 環的密度分佈：內側最亮，中間一道明顯的縫，外側收乾淨
        const ringProfile = (r: number) => {
          if (r < 0.34) return 1;
          if (r < 0.44) return 0.06; // 卡西尼縫
          if (r < 0.78) return 0.72;
          if (r < 0.92) return 0.3;
          return 0;
        };

        for (let i = 0; i < RING_DOTS; i++) {
          const x = -w * 0.25 + rrand() * w * 1.5;
          const dx = x - cx;
          const centerY = baseY + dx * Math.tan(tilt) + dx * dx * curve;

          const v = rrand();
          const r = Math.abs(v - 0.5) * 2;
          const density = ringProfile(r);
          if (rrand() > density) continue; // 依密度抽樣，做出環縫

          const y = centerY + (v - 0.5) * 2 * halfWidth;
          if (x < -2 || x > w + 2 || y < -2 || y > h + 2) continue;

          // 被星球本體擋住的那一段不畫
          const dxp = x - cx;
          if (Math.abs(dxp) < R) {
            const surfaceY = cy - Math.sqrt(R * R - dxp * dxp);
            if (y > surfaceY) continue;
          }

          const alpha = (0.12 + density * 0.4) * (0.55 + rrand() * 0.45);
          ctx.fillStyle = `rgba(238,226,190,${alpha.toFixed(3)})`;
          ctx.fillRect(x, y, 0.9, 0.9);
        }
      }

      // 日出熱點：光源正對的那段地平線最亮（月球沒有大氣，不做散射）
      if (spec.atmosphere) {
        const [ar, ag, ab] = spec.atmosphere;
        const hotX = cx - w * 0.16;
        const hotY = horizonY + 4;
        ctx.globalCompositeOperation = 'lighter';
        const hot = ctx.createRadialGradient(hotX, hotY, 0, hotX, hotY, w * 0.34);
        hot.addColorStop(0, `rgba(${Math.min(255, ar + 52)},${Math.min(255, ag + 30)},${Math.min(255, ab + 10)},${0.42 * spec.glow})`);
        hot.addColorStop(0.28, `rgba(${ar},${ag},${ab},${0.16 * spec.glow})`);
        hot.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
        ctx.fillStyle = hot;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';
      }
    };

    resize();
    render(0);

    if (spinning) {
      const start = performance.now();
      let last = 0;
      const loop = (now: number) => {
        // 自轉一圈要四分鐘，用不著 60fps；限在 30fps 可以省一半 CPU，肉眼看不出差別
        if (now - last >= FRAME_MS) {
          last = now;
          render(((now - start) / SPIN_MS) * Math.PI * 2);
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(() => {
      resize();
      if (!spinning) render(0);
    });
    observer.observe(parent);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [planet, animate]);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
}
