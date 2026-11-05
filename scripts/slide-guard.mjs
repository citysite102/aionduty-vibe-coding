#!/usr/bin/env node
/**
 * PreToolUse hook：寫進 src/ 之前，擋掉 CLAUDE.md 那幾條「不會報錯、typecheck
 * 也抓不到」的錯。掛在 .claude/settings.json 的 Write|Edit|MultiEdit 上。
 *
 * 為什麼要用 hook 而不是只靠 npm run check：這幾類的共同點是寫錯不會壞，
 * 只會安靜地什麼都不做（邊框不渲染、間距沒生效、class 拼錯無反應）。
 * 等到有人肉眼看出來，那一段通常已經被改過好幾輪，很難判斷是哪一次寫壞的。
 *
 * 它取代原本那條 inline 的破折號 hook，並修掉它兩個問題：
 *   1. 原本管整個 repo。工具腳本必須拿那個字元當比對樣式，會被自己擋住。
 *      現在只管 src/，也就是只管會被投影出來的內容。CLAUDE.md 要引用被禁的
 *      字元本身才講得清規範（D-1 那一條現在就有一個），一樣不該被擋。
 *   2. 原本 matcher 只有 Write|Edit，MultiEdit 整個漏掉。
 *
 * 另外只擋「這次新增的」：Edit 的 old_string 裡本來就有同一段字就放行，
 * 否則搬動一段既有的程式碼會被自己的規範卡住。
 *
 * hook 自己出錯要 fail open。不能寫檔案比寫錯一個 class 嚴重得多。
 */

/** 這個字元不能直接寫在檔案裡，否則這支腳本會被自己擋下來。 */
const EM = String.fromCharCode(0x2014);

const RULES = [
  {
    clause: 'D-1',
    scope: 'text',
    label: '中文破折號',
    re: new RegExp(EM + EM, 'g'),
    fix: '改用「，」「。」「：」或（）括號',
  },
  {
    clause: 'D-2',
    scope: 'src',
    skipComments: true,
    label: '口白印上畫面（課務交代、操作說明、講者的動作）',
    /**
     * 2026-11-04 新增。講者現場說一句就過去的話，印在畫面上只會佔位置，
     * 學員回頭翻講義時完全用不到。D-2 原本把它拆成「課務與操作交代」與
     * 「宣告自己接下來要做什麼修辭」兩條，而且只寫在語意層，沒有東西擋。
     *
     * **只管 `src/`，不管逐字稿**：逐字稿就是口白，這些寫法在那邊是對的。
     *
     * 「我要先」刻意只抓後面接講、說、問、給、提、聊的那幾種，
     * 「我先」排除「我先前」。
     * `25e2_M3_ReadARepo` 的小標「裝它之前我要先有什麼」裡的「我」是學員自稱，
     * 那是合法的，不要為了多抓一個而把它擋掉。
     */
    re: /\u8ddf\u8457(\u505a|\u6253|\u88dd|\u63a8|\u8dd1|\u8cbc|\u7df4)\u4e00?\u6b21|\u8acb(\u9ede\u9078|\u9ede\u4e00\u4e0b|\u6309\u4e0b|\u6253\u958b)|\u7b49\u4e00\u4e0b(\u6703|\u8981)(\u767c|\u7d66|\u8b1b|\u505a|\u770b)|\u628a\u9019\u4e00\u9801\u622a\u5716|\u73fe\u5728\u53ef\u4ee5(\u628a|\u6253\u958b|\u958b\u59cb)|\u6211\u5148(?!\u524d|\u751f)|\u6211\u8981\u5148(\u8b1b|\u8aaa|\u554f|\u7d66|\u63d0|\u804a)|\u6211\u7528\u4e00\u500b|\u6211\u5ff5\u4e00\u904d|\u6211\u60f3\u5148/g,
    fix: '講者說一句就過去的話不要印在畫面上。寫「做完會怎樣」或「要看什麼」，或整句刪掉交給口白',
  },
  {
    clause: 'D-2',
    scope: 'text',
    skipComments: true,
    label: '對仗句型',
    /**
     * 2026-11-04 新增。只抓兩個最固定的形狀：`不是 A，是 B`（含「，而是」）與「，而不是」。
     *
     * **刻意不抓單獨的「，不是 B」。** 那個形狀有大量合法用法
     * （「不過這裡要說清楚，不是每一種品質都判定得了」），抓了會變成天天誤報。
     * 單獨的那種留給 copy-reviewer。
     *
     * 排除「不是每」「不是只」「不是所有」：那是在限定範圍，不是對仗。
     * 改法見 D-2：只留那一邊成立的事實，或換成講得出內容的句子。
     */
    re: /\u4e0d\u662f(?!\u6bcf|\u53ea|\u6240\u6709)[^\u3002\uff0c\u3001\u300c\u300d\n]{1,14}\uff0c(\u662f|\u800c\u662f)|\uff0c\u800c\u4e0d\u662f/g,
    fix: '只留那一邊成立的事實，或換成講得出內容的句子。例：「第一句話不是叫它做事，是叫它先排」→「第一句話要叫它先排出來給你看，先別讓它動手」',
  },
  {
    clause: 'D-2',
    scope: 'text',
    label: '進度安撫（斷言學員已經做過什麼）',
    /**
     * 2026-11-04 新增。這一條原本只寫在 D-2 的「要靠語意判斷」那一層，所以沒有東西擋得住，
     * 同一個毛病在單元 7-4 一輪裡被指出三次（投影片兩處、逐字稿七處）。
     * 但它其實是純字面的：病灶永遠是「你」加上一個完成式。
     *
     * 改法是換主詞或直接講那件事：「我們在計時器那一輪寫過」「紅字怎麼讀，前面那一頁講過」。
     * 不要改成「大家已經」，那只是把同一句話換個人稱。
     *
     * **只抓「人稱＋完成式動詞」，而且跳過註解行。** 第一版寫成只要有「你前面」就擋，
     * 拿全片掃出 93 處，抽樣之後發現三類混在一起：
     *   真違規   「大部分的網頁產品都是這幾層，你前面看過了」
     *   合法指物 「切到你前面做計時器的那個資料夾」（刪掉讀者就不知道切到哪，D-2 自己的判斷標準）
     *   檔頭註解 `28c3_M4_ShipOwasp` 那一行正是在記錄某個標題為什麼被換掉
     * 誤擋比漏抓更傷：被誤擋幾次之後，下一個人會直接把規則關掉。
     * 所以「你前面那個 code-reviewer」這種沒有動詞的版本故意不抓，留給 copy-reviewer。
     */
    skipComments: true,
    re: /(\u4f60(\u524d\u9762|\u525b\u624d|\u5df2\u7d93))[^\u3002\uff0c\u3001\u300c\u300d\n]{0,10}(\u5b78\u904e|\u7df4\u904e|\u770b\u904e|\u88dd\u904e|\u8dd1\u904e|\u505a\u904e|\u5beb\u904e|\u7528\u904e|\u8a66\u904e|\u719f\u4e86|\u6709\u7b54\u6848)|\u4f60\u5728[^\u3002\uff0c\u3001\u300c\u300d\n]{0,12}(\u5c31|\u5df2\u7d93)[^\u3002\uff0c\u3001\u300c\u300d\n]{0,6}(\u5b78\u904e|\u7df4\u904e|\u770b\u904e|\u88dd\u904e|\u8dd1\u904e|\u505a\u904e|\u5beb\u904e)/g,
    fix: '換主詞或直接講那件事：「我們在計時器那一輪寫過⋯」「紅字怎麼讀，前面那一頁講過」。不要斷言學員做過什麼',
  },
  {
    clause: 'A-4',
    label: '不存在的色階',
    re: /-(slate|sky|indigo|orange|emerald|amber|red|rose)-(150|250|350|450|550|650|750|850|1000)\b/g,
    fix: 'Tailwind 只有 50 到 950 的整百階。寫錯不會報錯，邊框會直接不渲染',
  },
  {
    clause: 'A-4',
    label: '非法的間距值',
    re: /\b[pm][xytblr]?-\d+\.[1-46-9]\b/g,
    fix: '小數只有 .5。py-0.2 這種是靜默失效',
  },
  {
    clause: 'A-4',
    label: '這個專案沒有的 animate class',
    re: /\banimate-(spin-slow|infinite|duration-\d+)\b/g,
    fix: '那些是別的外掛才有的。要調速度用 style={{ animationDuration }}，或改用 motion',
  },
  {
    clause: 'A-1',
    label: '不在白名單裡的色相',
    re: /-(blue|green|gray|zinc|neutral|stone|violet|purple|teal|cyan|pink|fuchsia|lime|yellow)-[0-9]{2,3}\b/g,
    fix: '全片只有 slate / sky / indigo / orange / emerald / amber / red 與 rose。blue 不是 sky，green 不是 emerald，gray 不是 slate',
  },
  {
    clause: 'A-1',
    label: '左側色條',
    re: /\bborder-l-4\b/g,
    fix: '訊息塊走 Callout 元件。樣式是整框淡色底加同色邊框，不是左邊一條',
  },
  {
    clause: 'A-4',
    label: 'JSX 內文裡的反引號',
    re: /(?<=>)[^<>\n]*`[^`\n]+`[^<>\n]*(?=<)/g,
    fix: 'JSX 裡的反引號是純文字，畫面上會直接出現兩個撇號。要等寬就寫 <code className="font-mono">',
  },
];

const chunks = [];
for await (const c of process.stdin) chunks.push(c);

/** 放行就是什麼都不輸出、正常結束。 */
const allow = () => process.exit(0);

let input;
try {
  input = JSON.parse(Buffer.concat(chunks).toString('utf8'))?.tool_input ?? {};
} catch {
  allow();
}

const path = String(input.file_path ?? '').replace(/\\/g, '/');
const inSrc = /(^|\/)src\//.test(path);
const inScript = /(^|\/)\u9010\u5b57\u7a3f\//.test(path);
if (!inSrc && !inScript) allow();

/**
 * 2026-11-04：擋的範圍從 `src/` 擴到逐字稿。
 *
 * 病根是這個：逐字稿是全片一半的文字量，而它**從來沒有被任何一支自動檢查碰過**
 * （`check:words` 2026-10-05 才收進來，這支 hook 一直只管 src）。
 * 結果就是同一類文案毛病在逐字稿裡一改再改，每次都要人指出來。
 *
 * 只有 `scope: 'text'` 的規則會套到逐字稿，Tailwind 與 JSX 那幾條維持只管 src：
 * 逐字稿裡的 `> ` 引言跟反引號那條規則會互咬。
 */

/** Write 給 content，Edit 給 new_string，MultiEdit 給 edits[]。 */
const pairs = [
  { next: input.content ?? '', prev: '' },
  { next: input.new_string ?? '', prev: input.old_string ?? '' },
  ...(Array.isArray(input.edits)
    ? input.edits.map((e) => ({ next: e.new_string ?? '', prev: e.old_string ?? '' }))
    : []),
].filter((p) => p.next);

const active = RULES.filter((r) => inSrc || r.scope === 'text');

/** 檔頭與區塊註解不受文案規範限制（CLAUDE.md D-2 那條「註解不受這一條限制」）。 */
const isComment = (line) => /^\s*(\*|\/\/|\/\*)/.test(line);

const hits = [];
for (const { next, prev } of pairs) {
  for (const rule of active) {
    if (hits.some((h) => h.rule === rule)) continue;
    const text = rule.skipComments
      ? next.split('\n').filter((l) => !isComment(l)).join('\n')
      : next;
    for (const m of text.matchAll(rule.re)) {
      if (prev.includes(m[0])) continue; // 本來就在那裡，不是這次寫的
      hits.push({ rule, hit: m[0] });
      break;
    }
  }
}

if (!hits.length) allow();

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: [
        '這次寫入違反 CLAUDE.md，以下都是不會報錯也不會被 typecheck 抓到的那一類：',
        ...hits.map((h) => `・${h.rule.clause} ${h.rule.label}（寫成 ${h.hit}）：${h.rule.fix}`),
        '改掉再寫一次。',
      ].join('\n'),
    },
  }),
);
