#!/usr/bin/env node
/**
 * 印出錄製用的「章節 ／ 單元 ／ Slide 幾到幾」對照表。
 *
 *   npm run units            全部，依章節分組
 *   npm run units -- 3       只看第三章，連每一頁的標題一起印
 *   npm run units -- 3-4     只看那一個單元
 *   npm run units -- 手冊     章節名或單元名含「手冊」的
 *
 * 單元編號 X-Y 是算出來的，不寫死在任何地方。插頁、搬頁之後重跑這支就會重排，
 * 所以錄製清單不會跟畫面右下角的 Slide N 對不上（CLAUDE.md B-3）。
 */
import { readDeck, resolveUnits, CN } from './lib/deck.mjs';

const deck = readDeck();
const { units, errors } = resolveUnits(deck);

if (errors.length) {
  console.log('單元定義有問題，先修好再看表：\n');
  errors.forEach((e) => console.log('  x ' + e));
  process.exit(1);
}

const arg = (process.argv[2] ?? '').trim();

function matches(u) {
  if (!arg) return true;
  if (u.id === arg) return true;
  if (/^\d+$/.test(arg)) return String(u.chapter.n) === arg;
  return u.title.includes(arg) || u.chapter.label.includes(arg);
}

const picked = units.filter(matches);
if (!picked.length) {
  console.log(`沒有符合「${arg}」的章節或單元。`);
  process.exit(0);
}

/** 只挑了一部分的時候，順便把每一頁印出來，錄的時候照著翻 */
const verbose = Boolean(arg);

let lastChapter = null;
for (const u of picked) {
  if (u.chapter !== lastChapter) {
    lastChapter = u.chapter;
    const span = `Slide ${u.chapter.from + 1}-${u.chapter.to + 1}`;
    console.log(`\n── 章節${CN[u.chapter.n]} ${u.chapter.label}  ${span} ──`);
  }
  const pages = u.to - u.from + 1;
  console.log(
    `  ${u.id.padEnd(5)} Slide ${String(u.from + 1).padStart(3)}-${String(u.to + 1).padEnd(3)}` +
      ` ${String(pages).padStart(2)} 頁   ${u.title}`,
  );
  if (verbose) {
    for (let i = u.from; i <= u.to; i += 1) {
      const e = deck.entries[i];
      console.log(`          ${String(e.slide).padStart(3)}  ${e.title}`);
    }
  }
}

const chapters = new Set(picked.map((u) => u.chapter.n));
const pages = picked.reduce((a, u) => a + (u.to - u.from + 1), 0);
console.log(
  `\n共 ${chapters.size} 章、${picked.length} 個單元、${pages} 頁。` +
    (arg ? '' : '\n單元編號由位置推導，插頁之後重跑這支就會重排。'),
);
