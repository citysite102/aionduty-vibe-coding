/**
 * 用詞檢查：抓 CLAUDE.md D-2、D-3 裡可以用字面比對的那一部分。
 *
 * 為什麼需要這支：D 章只有 D-1 的破折號有 hook 擋，其餘全靠肉眼。
 * 實際的結果是，有自動檢查的那一條從來沒被違反過，沒檢查的一直在長回來。
 * `lint` 是 tsc，`check:slides` 看結構，兩支都不看文字。
 *
 * 這支只抓「查字典就能判定」的那一半。
 * 收尾金句、進度安撫、後設導覽句、自創比喻要看語意，字面抓不到，
 * 硬要用正規式只會生出一堆誤報然後被無視。那四類走 copy-reviewer agent。
 *
 * 用法：node scripts/check-words.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['src/slides', 'src/slides-recorded', 'src/components'];

/**
 * 一定是錯的。中國用語對照表與明確的浮誇詞。
 *
 * skipIf 是給中文沒有詞界這件事用的。「補上手腳與記憶」裡面切得出「上手」，
 * 但那不是違規。這種只能一個一個排除，不要為了少寫幾行就把詞從表裡拿掉。
 */
const BANNED = [
  // D-3 中國用語
  { word: '一鍵', fix: '依實際操作描述（組合鍵的話「一鍵」語意本身就錯）' },
  { word: '上手', fix: '熟悉', skipIf: /[補加接裝][上]手|上手[腳邊]/ },
  { word: '技術棧', fix: '技術堆疊' },
  { word: '調用', fix: '呼叫（但「調用 AI」多半該寫「使用 AI」）' },
  { word: '高併發', fix: '平行處理' },
  { word: '依賴套件', fix: '相依套件' },
  { word: '本地', fix: '本機' },
  { word: '運行', fix: '執行、跑（「運作原理」不受影響）' },
  { word: '場景', fix: '情境' },
  { word: '加載', fix: '載入' },
  { word: '開箱即用', fix: '現成可用、不用自己架' },
  { word: '痛點', fix: '問題、卡住的地方' },
  { word: '土炮', fix: '自己摸索、自己土法做' },
  { word: '質變', fix: '直接講清楚變化是什麼' },
  { word: '量變', fix: '直接講清楚變化是什麼' },
  // D-2 浮誇修辭
  { word: '無痛', fix: '直接講要付出什麼' },
  { word: '彈指', fix: '講實際要按什麼' },
  { word: '秒殺', fix: '講實際結果' },
  { word: '戰情室', fix: '講那個東西實際是什麼' },
  // D-4 譯名
  { word: 'Sub Agent', fix: '子代理（Subagent）' },
  { word: '小幫手', fix: '子代理（Subagent）' },
  { word: 'AI 專案經理', fix: '指揮者' },
  { word: '安全沙箱', fix: '運作框架（Harness），sandbox 才是沙箱' },
  { word: '語境工程', fix: '上下文工程' },
];

/** 不一定錯，但值得回頭看一眼。 */
const SUSPECT = [
  { re: /不僅[是不]/, why: '對仗句型（D-2）' },
  { re: /不只是[^，。]{0,12}，(更|而)是/, why: '對仗句型（D-2）' },
  // 百分比要貼著中文才算。CSS 的 width: '30%'、w-[50%] 不是在對學員講話。
  {
    re: /[一-鿿][^<>"'{}]{0,8}\d+\s?%|\d+\s?%[^<>"'{}]{0,8}[一-鿿]/,
    why: '量化數據（D-2）：沒有可查證來源就刪掉',
  },
  { re: /指數級/, why: '過度承諾（D-2）' },
  // 同上，要貼著中文。animate={{ left: '100%' }} 不是在承諾什麼。
  { re: /[一-鿿][^<>"'{}]{0,6}100\s?%|100\s?%[^<>"'{}]{0,6}[一-鿿]/, why: '過度承諾（D-2）' },
  { re: /它會自己修好/, why: '過度承諾（D-2）' },
  { re: /不可逆的趨勢/, why: '未來預測寫成事實（D-2），要講預測就標明是預測' },
  { re: /打造/, why: '「打造」全片留 1 到 2 處就好（D-2）' },
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.tsx') || name.endsWith('.ts')) out.push(p);
  }
  return out;
}

/**
 * 註解拿掉再比對，包含 JSX 的 {\/* … *\/}。
 * 註解裡常常在討論規範本身（例如「這一頁改過兩次：先是⋯」），
 * 或只是在標區塊名（{\/* Sub Agents *\/}），那些不是給學員看的字。
 * 行數要保留，不然報出來的行號會對不上。
 */
function stripComments(src) {
  return src
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .split('\n')
    .map((line) => (/^\s*(\/\/|\*)/.test(line) ? '' : line.replace(/\/\/.*$/, '')))
    .join('\n');
}

/**
 * 有些頁面是在示範壞寫法，或是在教「這些詞要改掉」，
 * 那種頁面整份都會命中，而且全部是正解不是違規。
 * 在檔案裡任一行加上 check-words-ignore-file 就跳過整份。
 */
const IGNORE_MARK = 'check-words-ignore-file';

const errors = [];
const warnings = [];

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const raw = readFileSync(file, 'utf8');
    if (raw.includes(IGNORE_MARK)) continue;
    const lines = stripComments(raw).split('\n');

    lines.forEach((line, i) => {
      for (const { word, fix, skipIf } of BANNED) {
        if (line.includes(word) && !(skipIf && skipIf.test(line))) {
          errors.push(`${file}:${i + 1}　「${word}」→ ${fix}`);
        }
      }
      for (const { re, why } of SUSPECT) {
        const m = line.match(re);
        if (m) warnings.push(`${file}:${i + 1}　「${m[0]}」　${why}`);
      }
    });
  }
}

if (warnings.length) {
  console.log('提醒（要自己判斷，不一定是錯的）');
  for (const w of warnings) console.log(`  ? ${w}`);
  console.log('');
}

if (errors.length) {
  console.error('違規');
  for (const e of errors) console.error(`  ! ${e}`);
  console.error(`\n共 ${errors.length} 處。對照 CLAUDE.md 的 D-2、D-3、D-4。`);
  process.exit(1);
}

console.log('通過');
