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
    label: '中文破折號',
    re: new RegExp(EM + EM, 'g'),
    fix: '改用「，」「。」「：」或（）括號',
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

if (!/(^|\/)src\//.test(String(input.file_path ?? '').replace(/\\/g, '/'))) allow();

/** Write 給 content，Edit 給 new_string，MultiEdit 給 edits[]。 */
const pairs = [
  { next: input.content ?? '', prev: '' },
  { next: input.new_string ?? '', prev: input.old_string ?? '' },
  ...(Array.isArray(input.edits)
    ? input.edits.map((e) => ({ next: e.new_string ?? '', prev: e.old_string ?? '' }))
    : []),
].filter((p) => p.next);

const hits = [];
for (const { next, prev } of pairs) {
  for (const rule of RULES) {
    if (hits.some((h) => h.rule === rule)) continue;
    for (const m of next.matchAll(rule.re)) {
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
