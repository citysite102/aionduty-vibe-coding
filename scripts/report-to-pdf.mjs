#!/usr/bin/env node
/**
 * 把教學模擬報告整併成一份 PDF。
 *
 *   node scripts/report-to-pdf.mjs                     # 併全部 教學模擬報告_*.md
 *   node scripts/report-to-pdf.mjs 總診斷.md 其他.md    # 只併指定的檔，照給定順序
 *
 * 產出 教學模擬報告_合併.pdf（跟 .md 一樣是 gitignore 掉的內部文件）。
 *
 * 刻意不加任何常駐相依套件，因為這是一次性的內部產物，不值得讓 package.json
 * 為它多一條相依。用的是兩個本機已經有的東西：
 *
 *   markdown → HTML   npx --yes marked（用完即丟，不寫進 package.json）
 *   HTML → PDF        Chrome 的 --headless --print-to-pdf
 *
 * 中文字型走 PingFang TC，那是 macOS 內建，不引用外部網址（同 CLAUDE.md A-4
 * 對投影片的要求，離線也要能產出）。
 */
import { readFileSync, writeFileSync, readdirSync, mkdtempSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = '教學模擬報告_合併.pdf';

/** 沒給檔名就自己找，並照 P 編號排序，不要照檔名的字串序（P1-P14 會排在 P103 後面）。 */
function discover() {
  return readdirSync('.')
    .filter((f) => f.startsWith('教學模擬報告_') && f.endsWith('.md'))
    .map((f) => ({ f, n: Number(f.match(/P(\d+)/)?.[1] ?? 1e9) }))
    .sort((a, b) => a.n - b.n)
    .map((x) => x.f);
}

const files = process.argv.slice(2).length ? process.argv.slice(2) : discover();

if (!files.length) {
  console.error('找不到任何 教學模擬報告_*.md');
  process.exit(1);
}
const missing = files.filter((f) => !existsSync(f));
if (missing.length) {
  console.error(`這幾個檔不存在：${missing.join('、')}`);
  process.exit(1);
}
if (!existsSync(CHROME)) {
  console.error(`找不到 Chrome：${CHROME}`);
  process.exit(1);
}

const work = mkdtempSync(join(tmpdir(), 'sim-pdf-'));

/** 每一份報告之間硬分頁，這樣印出來一份報告從新的一頁開始。 */
const merged = files
  .map((f) => readFileSync(f, 'utf8').trim())
  .join('\n\n<div class="pagebreak"></div>\n\n');

const mdPath = join(work, 'merged.md');
const bodyPath = join(work, 'body.html');
writeFileSync(mdPath, merged);

execFileSync('npx', ['--yes', 'marked', '-i', mdPath, '-o', bodyPath], { stdio: 'inherit' });

const CSS = `
  @page { size: A4; margin: 14mm 11mm; }
  body {
    font-family: "PingFang TC", "Heiti TC", sans-serif;
    font-size: 10.5pt; line-height: 1.7; color: #1a1a1a; max-width: none;
  }
  h1 { font-size: 19pt; border-bottom: 2px solid #333; padding-bottom: .3em; margin-top: 0; }
  h2 { font-size: 14pt; margin-top: 1.6em; border-bottom: 1px solid #bbb; padding-bottom: .2em; }
  h3 { font-size: 12pt; margin-top: 1.3em; }
  h1, h2, h3, h4 { break-after: avoid; }
  table { border-collapse: collapse; width: 100%; margin: .8em 0; font-size: 9.5pt; }
  th, td { border: 1px solid #bbb; padding: 5px 7px; text-align: left; vertical-align: top; }
  /* 標題列不折行，否則「名字」「代號」「程度」這種短標題會把整欄壓到一兩個字寬，
     中文可以任意換行，結果就是儲存格裡一個字一行。nowrap 讓欄寬至少撐到標題長度。 */
  th { background: #f0f0f0; font-weight: 700; white-space: nowrap; }
  tr, blockquote, pre { break-inside: avoid; }
  code { font-family: "SF Mono", Menlo, monospace; font-size: .88em; background: #f2f2f2;
         padding: 1px 4px; border-radius: 3px; }
  pre { background: #f7f7f7; padding: .7em 1em; border-radius: 5px; overflow-x: auto; }
  pre code { background: none; padding: 0; }
  blockquote { margin: .8em 0; padding: .4em 1em; border-left: 3px solid #999;
               background: #fafafa; color: #333; }
  .pagebreak { break-after: page; }
  a { color: #0645ad; text-decoration: none; }
`;

const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8">
<title>教學模擬報告</title><style>${CSS}</style></head><body>
${readFileSync(bodyPath, 'utf8')}
</body></html>`;

const htmlPath = join(work, 'merged.html');
writeFileSync(htmlPath, html);

execFileSync(
  CHROME,
  [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${OUT}`,
    `file://${htmlPath}`,
  ],
  { stdio: 'inherit' },
);

console.log(`\n併了 ${files.length} 份：${files.join('、')}`);
console.log(`產出 ${OUT}`);
