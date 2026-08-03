#!/usr/bin/env node
/**
 * 投影片順序自檢。
 *
 * 插頁、刪頁、換順序之後跑這支。它抓的是四類「不會報錯也不會被 typecheck 抓到」的錯：
 *
 *   1. LIVE_SLIDES 與 LIVE_TITLES 長度不一致（兩個陣列靠 index 對齊）
 *   2. REPLACEMENTS 的 key 指到了別頁（插頁時忘了把 key 往後推）
 *   3. SECTION_DEFS 的 start 沒有落在分節頁上（插頁時忘了把 start 往後推）
 *   4. 分節頁數量跟 SECTION_DEFS 對不起來
 *
 * 2 和 3 是最容易漏的：在某一頁前面插一頁，所有「大於等於該位置」的
 * REPLACEMENTS key 與 SECTION_DEFS start 都要 +1，刪頁則是 -1。
 */
import { readFileSync } from 'node:fs';

const APP = 'src/App.tsx';
const REGISTRY = 'src/slides-recorded/registry.ts';

const app = readFileSync(APP, 'utf8');
const registry = readFileSync(REGISTRY, 'utf8');

const errors = [];
const notes = [];

/** 取出一個頂層陣列的每一行（已去掉縮排與尾逗號） */
function arrayLines(src, name, file) {
  const m = src.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\n\\];`));
  if (!m) {
    errors.push(`${file}：找不到 ${name}`);
    return [];
  }
  return m[1]
    .split('\n')
    .map((s) => s.trim().replace(/,$/, ''))
    .filter(Boolean);
}

const comps = arrayLines(app, 'LIVE_SLIDES', APP);
const titles = arrayLines(app, 'LIVE_TITLES', APP).map((s) => s.replace(/^["']|["']$/g, ''));

/** 元件名 -> 檔名，用來判斷是不是分節頁 */
const compFile = {};
for (const m of app.matchAll(/import (\w+)(?:, \{[^}]*\})? from '\.\/slides\/(.*?)'/g)) {
  compFile[m[1]] = m[2];
}

const sectionDefs = [...app.matchAll(/\{ start: (\d+), label: '(.*?)' \}/g)].map((m) => ({
  start: Number(m[1]),
  label: m[2],
}));

/** REPLACEMENTS 的 key，以及註解裡宣稱的那一頁標題 */
const replBody = registry.match(/export const REPLACEMENTS[\s\S]*/)?.[0] ?? '';
const replKeys = [...replBody.matchAll(/^ {2}(\d+): \[/gm)].map((m) => Number(m[1]));
const replClaims = new Map();
// 註解寫法有「原 Slide 57「⋯」」也有「原「⋯」」，一律吃到第一個引號為止
for (const m of replBody.matchAll(/\/\/ index (\d+) = [^「\n]*「(.*?)」/g)) {
  replClaims.set(Number(m[1]), m[2]);
}
/** 每個 key 底下拆出幾頁 */
const replCounts = new Map();
for (const b of replBody.matchAll(/^ {2}(\d+): \[([\s\S]*?)^ {2}\],/gm)) {
  replCounts.set(Number(b[1]), [...b[2].matchAll(/meta: \w+/g)].length);
}

// --- 1. 兩個陣列長度 ---
if (comps.length !== titles.length) {
  errors.push(
    `${APP}：LIVE_SLIDES 有 ${comps.length} 筆、LIVE_TITLES 有 ${titles.length} 筆，長度必須一致`,
  );
}

// --- 2. REPLACEMENTS 的 key 有沒有指對 ---
for (const key of replKeys) {
  if (key >= comps.length) {
    errors.push(`${REGISTRY}：key ${key} 超出 LIVE_SLIDES 範圍（共 ${comps.length} 筆）`);
    continue;
  }
  const claim = replClaims.get(key);
  // 註解是這裡唯一能核對「這個 key 本來要頂替哪一頁」的依據，所以它是必要的。
  // 少了它，key 被改錯也看不出來。
  if (claim === undefined) {
    errors.push(
      `${REGISTRY}：key ${key} 缺少 \`// index ${key} = 原「標題」\` 註解，改動後無法核對它有沒有指錯頁`,
    );
    continue;
  }
  if (!titles[key].startsWith(claim.slice(0, 6))) {
    errors.push(
      `${REGISTRY}：key ${key} 註解寫「${claim}」，但 LIVE_TITLES[${key}] 是「${titles[key]}」`,
    );
  }
}

// 註解留在原地、key 卻搬走了
for (const idx of replClaims.keys()) {
  if (!replKeys.includes(idx)) {
    errors.push(`${REGISTRY}：有 \`// index ${idx} = ⋯\` 註解，但沒有對應的 ${idx}: [ ⋯ ] 項目`);
  }
}

// --- 3. SECTION_DEFS 的 start 有沒有落在分節頁上 ---
for (const { start, label } of sectionDefs) {
  const comp = comps[start];
  const file = compFile[comp] ?? '(未知)';
  if (start === 0) continue; // 第一節從封面開始，不是分節頁
  if (!file.includes('_Div_')) {
    errors.push(
      `${APP}：SECTION_DEFS「${label}」的 start=${start} 指到 ${comp}（${file}），那不是分節頁`,
    );
  }
}

// --- 4. 分節頁數量 vs SECTION_DEFS ---
const dividerIdx = comps
  .map((c, i) => (compFile[c]?.includes('_Div_') ? i : -1))
  .filter((i) => i >= 0);
const declared = sectionDefs.filter((d) => d.start !== 0).map((d) => d.start);
const missing = dividerIdx.filter((i) => !declared.includes(i));
if (missing.length) {
  errors.push(
    `${APP}：有分節頁沒有對應的 SECTION_DEFS：${missing
      .map((i) => `index ${i} (${compFile[comps[i]]})`)
      .join('、')}`,
  );
}

// --- 攤平後的實際頁數 ---
let flat = 0;
for (let i = 0; i < comps.length; i++) flat += replCounts.get(i) ?? 1;

// --- 輸出 ---
console.log(
  `LIVE ${comps.length} 頁，其中 ${replKeys.length} 頁拆成 ${[...replCounts.values()].reduce(
    (a, b) => a + b,
    0,
  )} 頁，實際播放 ${flat} 頁`,
);
console.log(`分節 ${sectionDefs.length} 組（＋結語自成一組）`);

if (notes.length) {
  console.log('\n提醒');
  notes.forEach((n) => console.log('  - ' + n));
}

if (errors.length) {
  console.log('\n錯誤');
  errors.forEach((e) => console.log('  x ' + e));
  process.exit(1);
}

console.log('\n通過');
