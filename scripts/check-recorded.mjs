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

  // 字數：扣掉 meta 區塊（口白不算在畫面文字裡）
  const visible = src.replace(metaBlock[0], '');
  const chars = (visible.match(/[一-龥]/g) || []).length;
  if (chars > LIMIT_CHARS) {
    errors.push(`${name}：畫面中文 ${chars} 字，超過 ${LIMIT_CHARS}`);
  }

  // 字級：不得出現寫死的 px
  const hardPx = visible.match(/text-\[\d+px\]/g);
  if (hardPx) {
    errors.push(`${name}：出現寫死的字級 ${[...new Set(hardPx)].join('、')}`);
  }

  // 口白長度
  const sec = Number((metaBlock[0].match(/seconds:\s*(\d+)/) || [])[1]);
  if (sec > LIMIT_SECONDS) {
    warnings.push(`${name}：口白 ${sec} 秒，超過 ${LIMIT_SECONDS} 秒，這一頁可能還是太滿`);
  }

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
console.log(`檢查 ${pages} 頁，口白總長 ${total} 秒（約 ${(total / 60).toFixed(1)} 分鐘）`);

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
