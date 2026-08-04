/**
 * 頁碼對照表：把 LIVE 頁碼（1 起算）對到實際的檔案路徑與標題。
 *
 * 存在的理由：畫面上的頁碼是 App.tsx 的 LIVE_SLIDES 推導出來的，
 * 檔名（21f6_、27b8c_）跟頁碼沒有關係。教學模擬的 agent 要能用
 * 「第 76 到 85 頁」指定範圍，就需要這張表。
 *
 * 用法：
 *   node scripts/slide-manifest.mjs            # 全部
 *   node scripts/slide-manifest.mjs 76 85      # 第 76 到 85 頁
 *   node scripts/slide-manifest.mjs --sections # 只列分節
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

if (titles.length !== components.length) {
  console.error(`LIVE_TITLES ${titles.length} 筆、LIVE_SLIDES ${components.length} 筆，長度不一致`);
  process.exit(1);
}

const argv = process.argv.slice(2);

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

console.log(`# LIVE 共 ${components.length} 頁，以下為 P${from} 到 P${to}\n`);
let lastSection = null;
for (let i = from - 1; i < Math.min(to, components.length); i++) {
  const section = sectionOf(i);
  if (section !== lastSection) {
    console.log(`## ${section}`);
    lastSection = section;
  }
  const file = imports.get(components[i]) ?? `（找不到 ${components[i]} 的 import）`;
  console.log(`P${i + 1}\t${titles[i]}\t${file}`);
}
