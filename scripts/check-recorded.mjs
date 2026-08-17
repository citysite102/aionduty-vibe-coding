#!/usr/bin/env node
/**
 * 預錄版拆頁檢查。
 * 用法：node scripts/check-recorded.mjs
 * 規則見「預錄版拆頁設計.md」。違規會以非零結束碼結束，可以掛進 CI。
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src/slides-recorded';
const LIMIT_CHARS = 160;
const LIMIT_SECONDS = 45;
const LIMIT_BULLET = 5;
const LIMIT_BULLET_CHARS = 20;

/**
 * 口白的實際長度要從字數推算，不能只信 meta 裡的 seconds。
 *
 * seconds 是手寫的估計值，而這支腳本原本只讀那個數字，所以「寫 45、實際要念 60 秒」
 * 完全抓不到。全片的宣稱值換算出來是每秒 3.7 到 6.5 字，差了將近兩倍，
 * 也就是那些數字彼此之間就不一致。
 *
 * 4 是中文口播含停頓的保守速度（一個字約等於一個音節）。刻意取偏慢的值，
 * 因為這個數字只用來回答一個問題：這一頁會不會超過 45 秒。推算出來超過就提醒，
 * 沒超過就不吵。反過來（宣稱值比推算值大）不提醒，那多半只是估得寬鬆，
 * 而真正的長度要錄一次才知道，不該拿一個猜出來的常數去吵已經寫好的四十幾頁。
 */
const CHARS_PER_SECOND = 4;

/** 口白裡的英文與數字也要念，不能只數中文 */
function spokenLength(script) {
  const cjk = (script.match(/[一-鿿]/g) || []).length;
  // 連續的英文或數字算一個詞，一個詞的長度大約等於兩個中文字
  const words = (script.match(/[A-Za-z0-9][A-Za-z0-9.\-_/]*/g) || []).length;
  return cjk + words * 2;
}

/** 底線開頭的檔案是共用元件，不是頁面，跳過不檢查 */
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return walk(p);
    if (name.startsWith('_') || !name.endsWith('.tsx')) return [];
    return [p];
  });
}

const errors = [];
const warnings = [];
let estTotal = 0;

for (const file of walk(ROOT)) {
  const src = readFileSync(file, 'utf8');
  const name = file.replace(ROOT + '/', '');

  // meta 完整性
  const metaBlock = src.match(/export const meta[\s\S]*?\n\};/);
  if (!metaBlock) {
    errors.push(`${name}：找不到 export const meta`);
    continue;
  }
  for (const key of ['id', 'title', 'script', 'seconds']) {
    if (!new RegExp(`\\b${key}\\s*:`).test(metaBlock[0])) {
      errors.push(`${name}：meta 缺少 ${key}`);
    }
  }

  // 字數：扣掉 meta 區塊（口白不算在畫面文字裡），也扣掉註解（註解不會顯示在畫面上）
  const visible = src
    .replace(metaBlock[0], '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
  const chars = (visible.match(/[一-龥]/g) || []).length;
  if (chars > LIMIT_CHARS) {
    errors.push(`${name}：畫面中文 ${chars} 字，超過 ${LIMIT_CHARS}`);
  }

  // 字級：不得出現寫死的 px
  const hardPx = visible.match(/text-\[\d+px\]/g);
  if (hardPx) {
    errors.push(`${name}：出現寫死的字級 ${[...new Set(hardPx)].join('、')}`);
  }

  // 口白長度。宣稱值與推算值都要看，兩者對不上的時候宣稱值不可信
  const sec = Number((metaBlock[0].match(/seconds:\s*(\d+)/) || [])[1]);
  const script = (metaBlock[0].match(/script:\s*\n?\s*'([\s\S]*?)',/) || [])[1] || '';
  const est = Math.round(spokenLength(script) / CHARS_PER_SECOND);

  if (sec > LIMIT_SECONDS) {
    warnings.push(`${name}：口白宣稱 ${sec} 秒，超過 ${LIMIT_SECONDS} 秒，這一頁可能還是太滿`);
  }
  if (est > LIMIT_SECONDS) {
    warnings.push(
      `${name}：口白推算 ${est} 秒（meta 寫 ${sec}），照每秒 ${CHARS_PER_SECOND} 字念會超過 ${LIMIT_SECONDS} 秒`,
    );
  }

  estTotal += est;

  // 標題含連接詞，可能是兩頁
  const title = (metaBlock[0].match(/title:\s*'([^']*)'/) || [])[1] || '';
  if (/[與和]|以及/.test(title)) {
    warnings.push(`${name}：標題「${title}」含連接詞，確認是不是兩個主張`);
  }

  // 條列數量與長度
  const items = [...visible.matchAll(/^\s*(?:desc|d|t|title):\s*'([^']*)'/gm)].map((m) => m[1]);
  const longItems = items.filter((t) => t.length > LIMIT_BULLET_CHARS * 2);
  if (longItems.length) {
    warnings.push(`${name}：有 ${longItems.length} 個項目偏長，考慮再拆`);
  }
  const arrayItems = (visible.match(/^\s*\{\s*$/gm) || []).length;
  if (arrayItems > LIMIT_BULLET) {
    warnings.push(`${name}：條列超過 ${LIMIT_BULLET} 項`);
  }
}

// 口白總長
const total = walk(ROOT).reduce((sum, f) => {
  const m = readFileSync(f, 'utf8').match(/seconds:\s*(\d+)/);
  return sum + (m ? Number(m[1]) : 0);
}, 0);

const pages = walk(ROOT).length;
console.log(
  `檢查 ${pages} 頁，口白宣稱總長 ${total} 秒（約 ${(total / 60).toFixed(1)} 分鐘），` +
    `照每秒 ${CHARS_PER_SECOND} 字推算是 ${estTotal} 秒（約 ${(estTotal / 60).toFixed(1)} 分鐘）`,
);

if (warnings.length) {
  console.log('\n警告');
  warnings.forEach((w) => console.log('  ! ' + w));
}
if (errors.length) {
  console.log('\n錯誤');
  errors.forEach((e) => console.log('  x ' + e));
  process.exit(1);
}
console.log('\n通過');
