/**
 * 頁碼對照表：把 LIVE 頁碼（1 起算）對到實際的檔案路徑與標題。
 *
 * 存在的理由：畫面上的頁碼是 App.tsx 的 LIVE_SLIDES 推導出來的，
 * 檔名（21f6_、27b8c_）跟頁碼沒有關係。教學模擬的 agent 要能用
 * 「第 76 到 85 頁」指定範圍，就需要這張表。
 *
 * 它同時處理 REPLACEMENTS，那是這支工具最重要的一件事：
 * 有 8 個 LIVE index 被 src/slides-recorded/ 的預錄頁整組取代，
 * App.tsx 的 ENTRIES 對那幾格「完全不 render 原元件」。所以
 *
 *   1. LIVE 頁碼與畫面右下角的「Slide N」從第 59 頁之後就對不起來，差距一路累積到 40
 *   2. src/slides/ 底下那 8 個檔案改了不會有人看到
 *
 * 這兩件事在 2026-08 的模擬裡讓一整段的診斷對錯了檔案，所以輸出一律標示。
 *
 * 用法：
 *   node scripts/slide-manifest.mjs            # 全部
 *   node scripts/slide-manifest.mjs 76 85      # 第 76 到 85 頁
 *   node scripts/slide-manifest.mjs --sections # 只列分節
 *   node scripts/slide-manifest.mjs --dead     # 只列不會播的檔案
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(path.join(ROOT, 'src/App.tsx'), 'utf8');

/** identifier -> 相對於專案根目錄的檔案路徑 */
const imports = new Map();
for (const m of src.matchAll(/^import\s+(\w+)\s+from\s+'\.\/(slides\/[^']+)';$/gm)) {
  imports.set(m[1], `src/${m[2]}.tsx`);
}

function arrayBody(name) {
  const start = src.indexOf(`const ${name} = [`);
  if (start === -1) throw new Error(`找不到 ${name}`);
  const open = src.indexOf('[', start);
  const close = src.indexOf('\n];', open);
  return src.slice(open + 1, close);
}

const titles = [...arrayBody('LIVE_TITLES').matchAll(/"([^"]*)"/g)].map((m) => m[1]);
const components = arrayBody('LIVE_SLIDES')
  .split('\n')
  .map((l) => l.trim().replace(/,$/, ''))
  .filter((l) => l && !l.startsWith('//'));

const sections = [...src.matchAll(/\{\s*start:\s*(\d+),\s*label:\s*'([^']+)'\s*\}/g)].map((m) => ({
  start: Number(m[1]),
  label: m[2],
}));

/* ---- REPLACEMENTS：哪幾格被預錄頁取代，各換成幾頁、換成哪些檔 ---- */

const registry = readFileSync(path.join(ROOT, 'src/slides-recorded/registry.ts'), 'utf8');

/** Component identifier -> harness 檔案路徑 */
const recFiles = new Map();
for (const m of registry.matchAll(/^import\s+(\w+),\s*\{[^}]*\}\s*from\s+'\.\/(harness\/[^']+)';$/gm)) {
  recFiles.set(m[1], `src/slides-recorded/${m[2]}.tsx`);
}

/** LIVE index -> 取代它的檔案清單 */
const replacements = new Map();
for (const m of registry.matchAll(/^\s*(\d+):\s*\[([\s\S]*?)^\s*\],/gm)) {
  const files = [...m[2].matchAll(/Component:\s*(\w+)/g)].map(
    (c) => recFiles.get(c[1]) ?? `（找不到 ${c[1]}）`,
  );
  replacements.set(Number(m[1]), files);
}

/** LIVE index -> 那一格在實際播放序列裡的第一個 Slide 編號（1 起算） */
const playedAt = [];
let cursor = 1;
for (let i = 0; i < components.length; i++) {
  playedAt[i] = cursor;
  cursor += replacements.get(i)?.length ?? 1;
}
const playedTotal = cursor - 1;


if (titles.length !== components.length) {
  console.error(`LIVE_TITLES ${titles.length} 筆、LIVE_SLIDES ${components.length} 筆，長度不一致`);
  process.exit(1);
}

const argv = process.argv.slice(2);

if (argv[0] === '--dead') {
  console.log('# 這些 src/slides/ 的檔案不會播，改了不會出現在畫面上\n');
  for (const [i, files] of [...replacements].sort((a, b) => a[0] - b[0])) {
    console.log(`P${i + 1}（Slide ${playedAt[i]}）\t${titles[i]}`);
    console.log(`  死檔：${imports.get(components[i])}`);
    console.log(`  實際播 ${files.length} 頁：`);
    for (const f of files) console.log(`    ${f}`);
    console.log('');
  }
  process.exit(0);
}

if (argv[0] === '--sections') {
  for (const [i, s] of sections.entries()) {
    const end = i + 1 < sections.length ? sections[i + 1].start : components.length;
    console.log(`P${s.start + 1}-P${end}\t${s.label}（${end - s.start} 頁）`);
  }
  process.exit(0);
}

const from = argv[0] ? Number(argv[0]) : 1;
const to = argv[1] ? Number(argv[1]) : components.length;

const sectionOf = (i) => {
  let label = '（未分節）';
  for (const s of sections) if (i >= s.start) label = s.label;
  return label;
};

console.log(
  `# LIVE 共 ${components.length} 頁，實際播放 ${playedTotal} 頁（${replacements.size} 頁被預錄頁取代）\n` +
    `# 以下為 P${from} 到 P${to}。「Slide N」是畫面右下角看到的編號\n`,
);
let lastSection = null;
for (let i = from - 1; i < Math.min(to, components.length); i++) {
  const section = sectionOf(i);
  if (section !== lastSection) {
    console.log(`## ${section}`);
    lastSection = section;
  }
  const file = imports.get(components[i]) ?? `（找不到 ${components[i]} 的 import）`;
  const rec = replacements.get(i);
  console.log(`P${i + 1}\tSlide ${playedAt[i]}\t${titles[i]}\t${file}`);
  if (rec) {
    console.log(`\t⚠ 這一格不播上面那個檔，改播 ${rec.length} 頁預錄頁（Slide ${playedAt[i]}-${playedAt[i] + rec.length - 1}）：`);
    for (const f of rec) console.log(`\t  ${f}`);
  }
}
