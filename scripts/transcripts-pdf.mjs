#!/usr/bin/env node
/**
 * 把 逐字稿/ 底下的單元 markdown 合成一份可閱讀、可列印的 PDF。
 * 用法：npm run pdf
 *
 * 為什麼不裝套件：
 * 這些 markdown 的語法是這個專案自己寫出來的固定子集（標題三層、引言塊、
 * 扁平清單、粗體、行內等寬，沒有表格、沒有巢狀清單、沒有連結），所以轉換器
 * 手寫五十行就夠，不值得為它多一個相依套件。排版交給 Chrome 的列印引擎，
 * 它本來就在這台機器上，而且 CJK 斷行比任何 headless 排版器都準。
 *
 * 不做頁碼：Chrome 的 --print-to-pdf 不支援 CSS 分頁計數器，要頁碼得再拉
 * paged.js 進來。目前靠每個單元自己的標題塊與可點的目錄導覽，夠用。
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const SRC = '逐字稿';
const OUT = join(SRC, '逐字稿全集.pdf');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

/* ── markdown → html（只支援上面那個子集）───────────────────────── */

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** 行內：先跳脫，再認等寬與粗體。順序不能反，不然 code 裡的符號會被吃掉 */
const inline = (s) =>
  esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

/** 區塊：逐行掃，同類連續行併成一塊 */
function blocks(lines, slug) {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    if (/^-{3,}$/.test(line.trim())) { out.push('<hr>'); i++; continue; }

    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      const lv = h[1].length;
      const id = lv === 2 ? ` id="${slug}-${out.filter((x) => x.startsWith('<h2')).length}"` : '';
      out.push(`<h${lv + 1}${id}>${inline(h[2])}</h${lv + 1}>`);
      i++;
      continue;
    }

    if (line.startsWith('>')) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      // 引言塊裡面自己還有段落，遞迴處理
      out.push(`<blockquote>${blocks(buf, slug).join('\n')}</blockquote>`);
      continue;
    }

    if (line.startsWith('- ')) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        buf.push(`<li>${inline(lines[i].slice(2))}</li>`);
        i++;
      }
      out.push(`<ul>${buf.join('')}</ul>`);
      continue;
    }

    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^[->#]/.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }

    // 自成一行的粗體是欄位標（**畫面**、**逐字稿**、**【轉場 → Slide 2】**），
    // 抽出來給它自己的樣式，剩下的才是內文
    const label = buf[0].match(/^\*\*(.+?)\*\*$/);
    if (label) {
      const cls = label[1].startsWith('【轉場') ? 'cue' : 'label';
      out.push(`<p class="${cls}">${inline(label[1])}</p>`);
      buf.shift();
    }
    if (!buf.length) continue;

    // 教學意圖、預估時間、錄製註記這幾行是給錄製的人看的，降一級
    const note = /^\*\*(這頁的教學意圖|預估時間|錄製註記|來源|注意)\*\*/.test(buf[0]);
    out.push(`<p${note ? ' class="note"' : ''}>${buf.map(inline).join('<br>')}</p>`);
  }
  return out;
}

/** 轉場標底下那一塊引言是接著念的，跟逐字稿本體分開標 */
const markCues = (html) =>
  html.replace(/(<p class="cue">[\s\S]*?<\/p>)\s*<blockquote>/g, '$1<blockquote class="cue-q">');

/**
 * 「待處理」記的是投影片的問題，不是要念的字。整段包起來降一級，
 * 錄的人掃到那條分隔線就知道下面可以跳過。
 */
const markTodo = (html) =>
  html.replace(
    /<h3([^>]*)>待處理<\/h3>([\s\S]*)$/,
    '<section class="todo"><h3$1 class="todo-head">待處理</h3>$2</section>',
  );

/* ── 讀單元 ───────────────────────────────────────────────────── */

const files = readdirSync(SRC)
  .filter((f) => /^\d+-\d+_.*\.md$/.test(f))
  .sort((a, b) => {
    const n = (s) => s.match(/^(\d+)-(\d+)/).slice(1).map(Number);
    const [ax, ay] = n(a);
    const [bx, by] = n(b);
    return ax - bx || ay - by;
  });

if (!files.length) {
  console.error(`在 ${SRC}/ 找不到任何「編號_名稱.md」的單元檔`);
  process.exit(1);
}

const units = files.map((f) => {
  const raw = readFileSync(join(SRC, f), 'utf8');
  const lines = raw.split('\n');
  const head = lines[0].match(/^#\s*單元\s*(\S+)｜(.+)$/);
  if (!head) throw new Error(`${f}：第一行不是「# 單元 X-Y｜標題」`);

  // 表頭是「Slide 18-19 ／ 2 頁 ／ 章節三 … ／ **動手**」，欄位數不固定，
  // 所以按 ／ 切開再各自認欄位，不要用一條長 regex 去猜整行。
  const metaLine = lines.find((l) => l.startsWith('Slide '));
  if (!metaLine) throw new Error(`${f}：找不到「Slide … ／ N 頁 ／ 章節…」那一行`);
  const cols = metaLine.split('／').map((s) => s.trim());
  const ci = cols.findIndex((c) => c.startsWith('章節'));
  if (ci < 0) throw new Error(`${f}：表頭缺少「章節…」那一欄：${metaLine}`);

  const [, unit, title] = head;
  const slides = cols[0].replace(/^Slide\s+/, '');
  const pages = (cols[1].match(/\d+/) || [])[0];
  if (!pages) throw new Error(`${f}：表頭第二欄讀不出頁數：${metaLine}`);
  const slug = 'u' + unit.replace(/[^\dA-Za-z]/g, '-');

  return {
    unit, title, slides, pages, slug,
    chapter: cols[ci],
    tags: cols.slice(ci + 1),
    // 首行標題與表頭那一行改由版面自己排，內文從它們之後開始
    html: markTodo(markCues(blocks(lines.slice(lines.indexOf(metaLine) + 1), slug).join('\n'))),
  };
});

/* ── 目錄依章節分組 ───────────────────────────────────────────── */

const chapters = [];
for (const u of units) {
  if (!chapters.length || chapters.at(-1).name !== u.chapter) chapters.push({ name: u.chapter, units: [] });
  chapters.at(-1).units.push(u);
}

const today = new Date().toISOString().slice(0, 10);

const toc = chapters
  .map(
    (c) => `<section class="toc-ch">
      <h3>${esc(c.name)}</h3>
      <ol>${c.units
        .map(
          (u) =>
            `<li><a href="#${u.slug}"><span class="n">${esc(u.unit)}</span><span class="t">${esc(
              u.title,
            )}</span><span class="s">Slide ${esc(u.slides)}・${u.pages} 頁</span></a></li>`,
        )
        .join('')}</ol>
    </section>`,
  )
  .join('\n');

const body = units
  .map(
    (u) => `<article class="unit" id="${u.slug}">
      <header class="unit-head">
        <div class="unit-ch">${esc(u.chapter)}</div>
        <h1><span class="unit-no">單元 ${esc(u.unit)}</span>${esc(u.title)}</h1>
        <div class="unit-meta">Slide ${esc(u.slides)}　・　共 ${u.pages} 頁${u.tags
          .map((t) => `<span class="tag">${inline(t)}</span>`)
          .join('')}</div>
      </header>
      ${u.html}
    </article>`,
  )
  .join('\n');

const totalPages = units.reduce((s, u) => s + Number(u.pages), 0);

const html = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8">
<title>Vibe Coding 實戰・逐字稿全集</title>
<style>
  @page { size: A4; margin: 17mm 16mm 16mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font: 10.5pt/1.95 "PingFang TC", "Heiti TC", "Noto Sans CJK TC", sans-serif;
    color: #1a2231;
    -webkit-font-smoothing: antialiased;
  }
  code { font-family: "SF Mono", Menlo, monospace; font-size: 0.87em;
         background: #eef2f7; padding: 0.1em 0.34em; border-radius: 3px; color: #0b4a6f; }
  strong { font-weight: 600; color: #0f1723; }
  hr { border: 0; border-top: 1px solid #e3e8ef; margin: 1.6em 0; }

  /* 封面 */
  .cover { height: 247mm; display: flex; flex-direction: column; justify-content: center;
           page-break-after: always; }
  .cover .kicker { font-size: 10pt; letter-spacing: .32em; color: #5b6craf; color: #64748b; }
  .cover h1 { font-size: 31pt; line-height: 1.35; margin: .45em 0 .3em; letter-spacing: .02em; }
  .cover .sub { font-size: 12.5pt; color: #475569; line-height: 1.9; }
  .cover .rule { width: 62px; border-top: 3px solid #0284c7; margin: 1.7em 0; }
  .cover .stat { font-size: 10pt; color: #64748b; margin-top: 2.4em; line-height: 2; }

  /* 目錄 */
  .toc { page-break-after: always; }
  .toc > h2 { font-size: 17pt; margin: 0 0 1.1em; padding-bottom: .5em; border-bottom: 2px solid #0f1723; }
  .toc-ch { break-inside: avoid; margin-bottom: .85em; }
  .toc-ch h3 { font-size: 10pt; margin: 0 0 .3em; padding: .3em .7em; letter-spacing: .04em; }
  .toc-ch ol { list-style: none; margin: 0; padding: 0; }
  .toc-ch li { margin: 0; }
  .toc-ch a { display: flex; gap: .7em; align-items: baseline; text-decoration: none; color: inherit;
              padding: .16em 0 .16em .9em; border-left: 2px solid #e3e8ef; font-size: 9.4pt; }
  .toc-ch .n { color: #94a3b8; font-variant-numeric: tabular-nums; min-width: 2.6em; }
  .toc-ch .t { flex: 1; }
  .toc-ch .s { color: #94a3b8; font-size: 8.6pt; white-space: nowrap; }

  /* 單元 */
  .unit { page-break-before: always; }
  .unit-head { margin-bottom: 1.5em; padding-bottom: .9em; border-bottom: 2px solid #0f1723; }
  .unit-ch { font-size: 8.8pt; color: #64748b; letter-spacing: .12em; }
  .unit h1 { font-size: 19pt; line-height: 1.45; margin: .3em 0 .32em; }
  .unit-no { display: block; font-size: 10pt; color: #0284c7; letter-spacing: .06em; margin-bottom: .2em; }
  .unit-meta { font-size: 9pt; color: #64748b; }
  .unit-meta .tag { display: inline-block; margin-left: .7em; padding: .1em .55em;
                    background: #e0f2fe; color: #075985; border-radius: 3px; font-size: 8.4pt; }
  .unit-meta .tag strong { color: inherit; }

  /* 頁標題（## Slide N｜…）*/
  h3 { font-size: 12.6pt; line-height: 1.5; margin: 2.1em 0 .75em;
       padding: .42em .7em; background: #0f1723; color: #fff; border-radius: 4px;
       break-after: avoid; }
  /* 待處理裡的小標（### 1.【缺漏】…）*/
  h4 { font-size: 10.4pt; margin: 1.5em 0 .45em; color: #0f1723; break-after: avoid; }

  p { margin: .62em 0; orphans: 3; widows: 3; }
  ul { margin: .55em 0; padding-left: 1.25em; }
  li { margin: .3em 0; orphans: 3; widows: 3; }

  /* 每頁之間的 --- 在這裡是多餘的，標題色塊已經在分段了 */
  hr:has(+ h3) { display: none; }

  /* 欄位標：畫面、逐字稿 */
  p.label { font-size: 8.8pt; letter-spacing: .12em; color: #0284c7;
            margin: 1.35em 0 .35em; break-after: avoid; }
  /* 轉場標：換一個顏色，錄的時候這裡不要停 */
  p.cue { font-size: 8.8pt; letter-spacing: .1em; color: #b45309;
          margin: 1.35em 0 .35em; break-after: avoid; }
  p.cue strong { color: inherit; font-weight: 600; }
  /* 教學意圖、預估時間、錄製註記：給錄製的人看的，不是要念的 */
  p.note { font-size: 9.2pt; line-height: 1.8; color: #64748b;
           background: #f6f8fa; border: 1px solid #e3e8ef; border-radius: 4px;
           padding: .6em .85em; margin: .9em 0; }
  p.note strong { color: #475569; }

  /* 逐字稿本體：整份最該好念的東西，所以最大、最鬆 */
  blockquote {
    margin: .4em 0 1.1em; padding: .75em 0 .75em 1.05em;
    border-left: 3px solid #0284c7; background: #f7fafd;
    font-size: 11.6pt; line-height: 2.15; orphans: 3; widows: 3;
  }
  blockquote p { margin: .5em 0; }
  blockquote p:first-child { margin-top: 0; }
  blockquote p:last-child { margin-bottom: 0; }
  /* 待處理：投影片的問題清單，不是要念的字，整段降一級 */
  .todo { margin-top: 2.6em; padding-top: 1.1em; border-top: 1px solid #e3e8ef;
          font-size: 9.4pt; line-height: 1.85; color: #475569; }
  .todo h3.todo-head { background: none; color: #94a3b8; padding: 0;
                       font-size: 9.4pt; letter-spacing: .16em; margin: 0 0 .2em; }
  .todo h4 { font-size: 9.8pt; color: #334155; margin: 1.15em 0 .35em; }
  .todo strong { color: #334155; }
  .todo p, .todo li { orphans: 2; widows: 2; }

  /* 待處理裡的引言（狀態橫幅、引用的投影片原文）不是要念的，
     不能吃到上面那組逐字稿樣式 */
  .todo blockquote { font-size: 9.4pt; line-height: 1.85; margin: .5em 0;
                     padding: .55em 0 .55em .9em;
                     border-left-color: #cbd5e1; background: #f8fafc; }

  /* 轉場那一塊：同樣要念，但標成接續用的顏色 */
  blockquote.cue-q { border-left-color: #d97706; background: #fffaf2; font-size: 11pt; }
</style></head><body>

<section class="cover">
  <div class="kicker">AI ON DUTY</div>
  <h1>Vibe Coding 實戰<br>教學逐字稿全集</h1>
  <div class="rule"></div>
  <div class="sub">補上軟體基礎，建立一套自己能重複用的 AI 開發流程。<br>講師　Samuel 高玉璁</div>
  <div class="stat">
    ${chapters.length} 章　・　${units.length} 個錄製單元　・　${totalPages} 頁投影片<br>
    產出日期 ${today}
  </div>
</section>

<section class="toc">
  <h2>目錄</h2>
  ${toc}
</section>

${body}
</body></html>`;

/* ── 輸出 ─────────────────────────────────────────────────────── */

if (!existsSync(CHROME)) {
  console.error(`找不到 Chrome：${CHROME}\n這支腳本靠 Chrome 的列印引擎產 PDF，請先安裝 Google Chrome。`);
  process.exit(1);
}

const tmp = join(mkdtempSync(join(tmpdir(), 'transcripts-')), 'index.html');
writeFileSync(tmp, html);

execFileSync(
  CHROME,
  [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--generate-pdf-document-outline',
    `--print-to-pdf=${OUT}`,
    'file://' + encodeURI(tmp),
  ],
  { stdio: 'ignore' },
);

if (!existsSync(OUT) || statSync(OUT).size < 50_000) {
  console.error(`PDF 沒產出來，或小得不合理：${OUT}`);
  process.exit(1);
}

console.log(
  `${OUT}\n` +
    `${units.length} 個單元、${chapters.length} 章、${totalPages} 頁投影片，` +
    `檔案 ${(statSync(OUT).size / 1024 / 1024).toFixed(1)} MB`,
);
