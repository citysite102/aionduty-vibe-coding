/**
 * 印出「畫面上的 Slide N ←→ 檔案」對照表。
 *
 * 為什麼需要這支：檔名裡的編號（10e、11b、21f4）是**主題群組編號**，不是頁碼。
 * 同一群的檔案排在一起是它的用處，但它不會、也不該跟播放順序一致，因為插一頁
 * 就會讓後面每一個檔名都要改，連帶 import、REPLACEMENTS、註解裡的交叉引用全部要動。
 * 順序的唯一真相在 App.tsx 的 LIVE_SLIDES，這支只是把它印成人看得懂的樣子。
 *
 *   npm run map              全部
 *   npm run map -- 29        只看第 29 頁
 *   npm run map -- git       標題或檔名含 git 的頁
 *
 * 頁碼跟畫面右下角的「Slide N」一致，也就是已經把預錄拆頁算進去的那個編號。
 */
import { readFileSync } from 'node:fs';

const APP = 'src/App.tsx';
const REGISTRY = 'src/slides-recorded/registry.ts';

const app = readFileSync(APP, 'utf8');
const registry = readFileSync(REGISTRY, 'utf8');

function arrayLines(src, name) {
  const m = src.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\n\\];`));
  if (!m) throw new Error(`${APP} 找不到 ${name}`);
  return m[1]
    .split('\n')
    .map((l) => l.replace(/\/\/.*$/, '').trim().replace(/,$/, ''))
    .filter(Boolean);
}

const comps = arrayLines(app, 'LIVE_SLIDES');
const titles = arrayLines(app, 'LIVE_TITLES').map((s) => s.replace(/^["']|["']$/g, ''));

const compFile = {};
for (const m of app.matchAll(/import (\w+)(?:, \{[^}]*\})? from '\.\/slides\/(.*?)'/g)) {
  compFile[m[1]] = `src/slides/${m[2]}.tsx`;
}

const sections = [...app.matchAll(/\{ start: (\d+), label: '(.*?)' \}/g)].map((m) => ({
  start: Number(m[1]),
  label: m[2],
}));

/** 拆成預錄頁的那幾個 LIVE index，以及各自拆出幾頁、檔案是哪些 */
const replBody = registry.match(/export const REPLACEMENTS[\s\S]*/)?.[0] ?? '';
const repl = new Map();
for (const b of replBody.matchAll(/^ {2}(\d+): \[([\s\S]*?)^ {2}\],/gm)) {
  const files = [...b[2].matchAll(/Component: (\w+)/g)].map((m) => m[1]);
  repl.set(Number(b[1]), files);
}
const recFile = {};
// 預錄頁的 import 帶著 { meta as mNN }，所以中間那段要放行
for (const m of registry.matchAll(/import (\w+)(?:, \{[^}]*\})? from '\.\/(.*?)'/g)) {
  recFile[m[1]] = `src/slides-recorded/${m[2]}.tsx`;
}

// LIVE index 展開成實際播放順序
const rows = [];
for (let i = 0; i < comps.length; i += 1) {
  const section = [...sections].reverse().find((s) => s.start <= i)?.label ?? '';
  const parts = repl.get(i);
  if (parts) {
    parts.forEach((c, n) => {
      rows.push({
        slide: rows.length + 1,
        live: i,
        title: `${titles[i]}（拆頁 ${n + 1}/${parts.length}）`,
        file: recFile[c] ?? `?（${c}）`,
        section,
      });
    });
  } else {
    rows.push({
      slide: rows.length + 1,
      live: i,
      title: titles[i],
      file: compFile[comps[i]] ?? `?（${comps[i]}）`,
      section,
    });
  }
}

const q = process.argv.slice(2).join(' ').trim();
let shown = rows;
if (q) {
  shown = /^\d+$/.test(q)
    ? rows.filter((r) => r.slide === Number(q))
    : rows.filter((r) => (r.title + r.file).toLowerCase().includes(q.toLowerCase()));
}

if (!shown.length) {
  console.log(`找不到符合「${q}」的頁。共 ${rows.length} 頁。`);
  process.exit(0);
}

let lastSection = null;
for (const r of shown) {
  if (!q && r.section !== lastSection) {
    console.log(`\n── ${r.section} ──`);
    lastSection = r.section;
  }
  const slide = String(r.slide).padStart(3);
  console.log(`${slide}  LIVE ${String(r.live).padStart(3)}  ${r.file.padEnd(46)} ${r.title}`);
}
console.log(`\n共 ${rows.length} 頁${q ? `，符合「${q}」的有 ${shown.length} 頁` : ''}。`);
console.log('欄位：Slide（畫面右下角的編號）／LIVE（App.tsx 陣列的 index，插頁時要改的那個）／檔案／標題');
