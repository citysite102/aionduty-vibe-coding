/**
 * 逐字稿與投影片的對照檢查。
 *
 * 存在的理由：`check:slides` 只看 src/，`check:rec` 只看預錄頁自己的 meta，
 * 兩支都不知道 `逐字稿/` 那 38 個檔案寫了什麼。所以投影片改了、逐字稿沒跟著改，
 * 四支檢查全部會過，而錄的時候照著唸出來的是舊版。2026-10-03 一次掃出
 * 兩處真的對不上（Slide 25 的標題、Slide 87 的整段口白是舊版），
 * 以及插頁之後十一支檔頭的頁碼範圍沒推。
 *
 * 檢查五件事：
 *   1. 檔頭的「Slide A-B ／ N 頁」與 `npm run units` 算出來的範圍一致
 *   2. 每一支的 `## Slide N｜` 連號，而且就是那個單元的範圍
 *   3. 小標的標題跟投影片的標題一字不差（分節頁容許「（分節頁）」「分節頁：」）
 *   4. 預錄拆頁的口白逐字等於該頁的 `meta.script`
 *   5. `【轉場 → Slide N】` 指到本單元的某一頁，或下一單元的第一頁
 *
 * 不檢查的：「畫面」那一欄寫得對不對，那要讀語意，交給人或 subagent。
 *
 * 用法：npm run check:transcripts
 */

import { readFileSync, readdirSync } from 'node:fs';
import { readDeck, resolveUnits } from './lib/deck.mjs';

const DIR = '逐字稿';

/** meta 的 script 可能寫成多段字串用 + 串接，要全部接起來 */
function metaScript(file) {
  const src = readFileSync(file, 'utf8');
  const a = src.indexOf('  script:');
  if (a === -1) return null;
  const b = src.indexOf('\n  seconds', a);
  if (b === -1) return null;
  const parts = [...src.slice(a, b).matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);
  return parts.length ? parts.join('').replace(/\\'/g, "'") : null;
}

/** 比對時忽略反引號、空白與引號，那些是 markdown 的排版，不是內容差異 */
const norm = (s) => s.replace(/[`\s「」【】]/g, '');

const deck = readDeck();
const { units } = resolveUnits(deck);
const byUnit = new Map(units.map((u) => [u.id, u]));

const problems = [];
const add = (file, msg) => problems.push(`${file}: ${msg}`);

for (const name of readdirSync(DIR).sort()) {
  if (!/^\d+-\d+_.*\.md$/.test(name)) continue;
  const text = readFileSync(`${DIR}/${name}`, 'utf8');
  const key = name.split('_')[0];
  const unit = byUnit.get(key);
  if (!unit) {
    add(name, `找不到單元 ${key}，單元編號會隨搬頁重排，用 npm run units 對一次`);
    continue;
  }

  const first = unit.from + 1;
  const last = unit.to + 1;
  const want = first === last ? `Slide ${first}` : `Slide ${first}-${last}`;
  const head = text.match(/^Slide \d+(?:-\d+)? ／ \d+ 頁 ／/m);
  if (!head) add(name, '檔頭缺「Slide A-B ／ N 頁 ／」那一行');
  else if (head[0] !== `${want} ／ ${last - first + 1} 頁 ／`)
    add(name, `檔頭寫「${head[0]}」，實際是「${want} ／ ${last - first + 1} 頁 ／」`);

  const heads = [...text.matchAll(/^## Slide (\d+)｜(.+?)\s*$/gm)].map((m) => [Number(m[1]), m[2]]);
  const nums = heads.map(([n]) => n);
  const expect = Array.from({ length: last - first + 1 }, (_, i) => first + i);
  if (nums.join() !== expect.join())
    add(name, `小標頁碼是 ${nums.join(', ')}，單元範圍是 ${first}-${last}`);

  for (const [n, title] of heads) {
    const entry = deck.entries[n - 1];
    if (!entry) {
      add(name, `Slide ${n} 不存在`);
      continue;
    }
    const clean = title.replace(/^分節頁：/, '').replace(/（分節頁）$/, '');
    if (norm(clean) !== norm(entry.title))
      add(name, `Slide ${n} 標題：稿「${title}」≠ 頁「${entry.title}」`);

    if (entry.file.includes('slides-recorded')) {
      const script = metaScript(entry.file);
      const sec = text.slice(
        text.indexOf(`## Slide ${n}｜`),
        text.includes(`## Slide ${n + 1}｜`) ? text.indexOf(`## Slide ${n + 1}｜`) : undefined,
      );
      const quoted = sec.match(/\*\*逐字稿\*\*[^\n]*\n+((?:>.*\n?)+)/);
      if (!quoted) add(name, `Slide ${n} 找不到逐字稿區塊`);
      else if (script && norm(quoted[1].replace(/^>/gm, '')) !== norm(script))
        add(name, `Slide ${n} 的口白跟 meta.script 不一樣（預錄頁一律照抄）`);
    }
  }

  for (const m of text.matchAll(/【轉場 → Slide (\d+)】/g)) {
    const tgt = Number(m[1]);
    if (!nums.includes(tgt) && tgt !== last + 1)
      add(name, `轉場指向 Slide ${tgt}，既不在這一支也不是下一頁`);
  }
}

if (problems.length) {
  console.error(problems.map((p) => `  x ${p}`).join('\n'));
  console.error(`\n共 ${problems.length} 項。投影片改了就要回頭改逐字稿（CLAUDE.md B-6c）。`);
  process.exit(1);
}
console.log('通過');
