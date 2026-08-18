/**
 * 把 App.tsx、registry.ts、courseUnits.ts 讀成一份「實際播放順序」的資料。
 *
 * 三支腳本共用這裡：course-units.mjs 印表、check-slides.mjs 驗單元、
 * 以後要再加別的檢查也從這裡拿，不要各自再寫一份 regex。
 * slide-map.mjs 是更早寫的，還維持它自己那份，改動時不受這裡影響。
 */
import { readFileSync, readdirSync } from 'node:fs';

export const APP = 'src/App.tsx';
export const REGISTRY = 'src/slides-recorded/registry.ts';
export const UNITS = 'src/courseUnits.ts';

/** 取出一個頂層陣列的每一行（已去掉縮排與尾逗號） */
function arrayLines(src, name, file) {
  const m = src.match(new RegExp(`const ${name}(?::[^=]*)? = \\[([\\s\\S]*?)\\n\\];`));
  if (!m) throw new Error(`${file}：找不到 ${name}`);
  return m[1]
    .split('\n')
    .map((s) => s.trim().replace(/,$/, ''))
    .filter(Boolean);
}

export function readDeck() {
  const app = readFileSync(APP, 'utf8');
  const registry = readFileSync(REGISTRY, 'utf8');
  const units = readFileSync(UNITS, 'utf8');

  const comps = arrayLines(app, 'LIVE_SLIDES', APP);
  const titles = arrayLines(app, 'LIVE_TITLES', APP).map((s) => s.replace(/^["']|["']$/g, ''));

  /** 元件名 -> 檔案路徑 */
  const compFile = {};
  for (const m of app.matchAll(/import (\w+)(?:, \{[^}]*\})? from '\.\/slides\/(.*?)'/g)) {
    compFile[m[1]] = `src/slides/${m[2]}.tsx`;
  }

  const sections = [...app.matchAll(/\{ start: (\d+), label: '(.*?)' \}/g)].map((m) => ({
    start: Number(m[1]),
    label: m[2],
  }));

  // 預錄頁：meta 變數 -> 那一頁自己的 title 與檔案
  const metaByFile = {};
  const dir = 'src/slides-recorded/harness';
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.tsx')) continue;
    const s = readFileSync(`${dir}/${f}`, 'utf8');
    const title = s.match(/title:\s*'([^']*)'/)?.[1];
    if (title) metaByFile[f] = { title, file: `${dir}/${f}` };
  }
  const metaVarFile = {};
  for (const m of registry.matchAll(/import \w+, \{ meta as (\w+) \} from '\.\/harness\/(.*?)'/g)) {
    metaVarFile[m[1]] = `${m[2]}.tsx`;
  }

  /** LIVE index -> 拆出來的那幾頁 */
  const repl = new Map();
  const replBody = registry.match(/export const REPLACEMENTS[\s\S]*/)?.[0] ?? '';
  for (const b of replBody.matchAll(/^ {2}(\d+): \[([\s\S]*?)^ {2}\],/gm)) {
    const parts = [...b[2].matchAll(/meta: (\w+)/g)].map((m) => {
      const info = metaByFile[metaVarFile[m[1]]];
      return info ?? { title: `?（${m[1]}）`, file: '?' };
    });
    repl.set(Number(b[1]), parts);
  }

  // 攤平成實際播放順序
  const entries = [];
  for (let live = 0; live < comps.length; live += 1) {
    const parts = repl.get(live);
    if (parts) {
      parts.forEach((p, part) => {
        entries.push({ slide: entries.length + 1, live, part, title: p.title, file: p.file });
      });
    } else {
      entries.push({
        slide: entries.length + 1,
        live,
        part: 0,
        title: titles[live],
        file: compFile[comps[live]] ?? `?（${comps[live]}）`,
      });
    }
  }

  // 章節：八個分節，最後一頁的結語自成一章（跟 App.tsx 選單的分組一致）
  const chapters = sections.map((s, i) => ({
    n: i + 1,
    label: s.label,
    from: entries.findIndex((e) => e.live === s.start && e.part === 0),
  }));
  chapters.push({ n: sections.length + 1, label: '結語', from: entries.length - 1 });
  chapters.forEach((c, i) => {
    c.to = i + 1 < chapters.length ? chapters[i + 1].from - 1 : entries.length - 1;
  });
  entries.forEach((e) => {
    e.chapter = chapters.filter((c) => c.from <= e.slide - 1).at(-1);
  });

  // 單元
  const unitDefs = [];
  const body = units.match(/export const UNIT_DEFS[\s\S]*/)?.[0] ?? '';
  for (const m of body.matchAll(/\{ live: (\d+),(?: part: (\d+),)? title: '(.*?)', anchor: '(.*?)' \}/g)) {
    unitDefs.push({
      live: Number(m[1]),
      part: m[2] === undefined ? 0 : Number(m[2]),
      title: m[3],
      anchor: m[4],
    });
  }

  return { comps, titles, sections, entries, chapters, unitDefs, repl };
}

/**
 * 把單元定義接上實際頁數。回傳 { units, errors }。
 * errors 是給 check:slides 用的，course-units.mjs 印表時也會先看它。
 */
export function resolveUnits(deck) {
  const { entries, chapters, unitDefs } = deck;
  const errors = [];
  const units = [];

  unitDefs.forEach((d, i) => {
    const idx = entries.findIndex((e) => e.live === d.live && e.part === d.part);
    if (idx < 0) {
      errors.push(
        `${UNITS}：第 ${i + 1} 筆單元「${d.title}」指到 live ${d.live} / part ${d.part}，那一頁不存在`,
      );
      return;
    }
    if (entries[idx].title !== d.anchor) {
      errors.push(
        `${UNITS}：單元「${d.title}」的 anchor 寫「${d.anchor}」，但 Slide ${idx + 1} 是「${entries[idx].title}」`,
      );
    }
    units.push({ ...d, from: idx });
  });

  units.forEach((u, i) => {
    u.to = i + 1 < units.length ? units[i + 1].from - 1 : entries.length - 1;
  });

  // 起點要遞增，否則後面的 to 會算成負的
  for (let i = 1; i < units.length; i += 1) {
    if (units[i].from <= units[i - 1].from) {
      errors.push(
        `${UNITS}：單元「${units[i].title}」的起點沒有排在「${units[i - 1].title}」後面，順序要跟播放順序一致`,
      );
    }
  }

  if (units.length && units[0].from !== 0) {
    errors.push(`${UNITS}：第一個單元不是從 Slide 1 開始`);
  }

  // 每一章的第一頁都要剛好是某個單元的起點，否則會有一支影片跨兩章
  for (const c of chapters) {
    if (!units.some((u) => u.from === c.from)) {
      errors.push(
        `${UNITS}：章節「${c.label}」的第一頁（Slide ${c.from + 1}）不是任何單元的起點，會有單元跨章`,
      );
    }
  }

  // 編號 X-Y 由位置推導，不寫死
  const seen = new Map();
  for (const u of units) {
    const c = entries[u.from].chapter;
    const n = (seen.get(c.n) ?? 0) + 1;
    seen.set(c.n, n);
    u.chapter = c;
    u.id = `${c.n}-${n}`;
  }

  return { units, errors };
}

/** 一、二、三⋯ 的中文數字，章節標題用 */
export const CN = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
