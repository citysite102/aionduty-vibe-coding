import React, { useEffect, useRef, useState } from 'react';
import { Panel, Note, Mono } from '../ui';
import { RotateCcw } from 'lucide-react';

/**
 * 假的終端機。目的是讓沒開過終端機的人先按過一次，知道打錯字不會怎麼樣。
 *
 * 兩個原則：
 * 1. 只做課程真的會用到的那幾個指令，不做一個假的 shell。做太全反而讓人以為自己學會了。
 * 2. 每一行輸出後面附一句白話，講「你剛才做了什麼」。這是它跟真終端機唯一該有的差別。
 *
 * 檔案樹是記憶體裡的物件，重整就回到初始狀態，不寫到任何地方。
 */
type Node = { type: 'dir'; children: Record<string, Node> } | { type: 'file'; content: string };

const CLAUDE_MD = `# mission-timer

一頁式倒數計時器，太空任務的外觀。純前端，沒有後端。

## 怎麼跟我合作
- 一律用繁體中文回覆
- 改任何檔案之前，先說你要改哪一個、改什麼

## 這個專案的寫法
- 背景固定 #020617，強調色只用一種，其他一律灰階
- 星球與火箭用 canvas 或 CSS 畫，不要引用外部圖片

## 什麼叫做完
- 每次改完，開瀏覽器把功能點過一次，Console 沒有紅字才算做完

## 不要做
- 時間快到時不要跳 alert，也不要用閃爍
`;

const REVIEWER = `---
name: code-reviewer
description: 專門負責挑錯的資深工程師
---
檢查我改完的檔案。倒數的分鐘數不准寫死在程式裡，CLAUDE.md 要求集中成設定。
逐條回覆，每條寫「通過」或「不通過」，不通過要指出檔案與第幾行。
有一條不通過就整份退回，不要自己動手改。
`;

function initialFs(): Node {
  return {
    type: 'dir',
    children: {
      'mission-timer': {
        type: 'dir',
        children: {
          'index.html': { type: 'file', content: '<!doctype html>\n<html lang="zh-Hant">\n  ... 整個計時器就是這一個檔案 ...\n</html>\n' },
          'CLAUDE.md': { type: 'file', content: CLAUDE_MD },
          '.claude': {
            type: 'dir',
            children: {
              agents: {
                type: 'dir',
                children: { 'code-reviewer.md': { type: 'file', content: REVIEWER } },
              },
            },
          },
        },
      },
      documents: {
        type: 'dir',
        children: {
          '提案_A客戶.md': { type: 'file', content: '# 提案 A\n（英文版）\n' },
        },
      },
    },
  };
}

type Line = { text: string; tone?: 'out' | 'cmd' | 'err' | 'hint' };

const HELP: [string, string][] = [
  ['pwd', '我現在站在哪個資料夾'],
  ['ls', '這個資料夾裡有什麼（ls -a 連隱藏的一起看）'],
  ['cd 資料夾', '走進去。cd .. 是退回上一層'],
  ['mkdir 名字', '開一個新資料夾'],
  ['touch 檔名', '開一個空檔案'],
  ['cat 檔名', '把檔案內容印出來看'],
  ['tree', '把這個資料夾底下的結構畫出來'],
  ['git status', '看目前有哪些改動還沒存檔'],
  ['claude', '在這個資料夾啟動 Claude Code'],
  ['clear', '清掉畫面'],
];

export default function Sandbox() {
  const [fs, setFs] = useState<Node>(initialFs);
  const [cwd, setCwd] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const [inClaude, setInClaude] = useState(false);
  const [out, setOut] = useState<Line[]>([
    { text: '這是一個假的終端機，打錯字不會弄壞任何東西，重整就回到最初的狀態。', tone: 'hint' },
    { text: '先試試看 pwd，再試 ls。不知道能打什麼就打 help。', tone: 'hint' },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [out]);

  function nodeAt(path: string[]): Node | null {
    let cur: Node = fs;
    for (const seg of path) {
      if (cur.type !== 'dir' || !cur.children[seg]) return null;
      cur = cur.children[seg];
    }
    return cur;
  }

  function push(lines: Line[]) {
    setOut((o) => [...o, ...lines]);
  }

  function prompt() {
    return `~/${cwd.join('/')}`.replace(/\/$/, '');
  }

  function run(raw: string) {
    const cmd = raw.trim();
    push([{ text: inClaude ? `> ${cmd}` : `${prompt()} $ ${cmd}`, tone: 'cmd' }]);
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHIdx(-1);

    if (inClaude) return runInClaude(cmd);

    const [head, ...rest] = cmd.split(/\s+/);
    const arg = rest.filter((r) => !r.startsWith('-')).join(' ');
    const flags = rest.filter((r) => r.startsWith('-')).join('');
    const here = nodeAt(cwd);

    switch (head) {
      case 'help':
        push([
          { text: '這裡認得的指令：' },
          ...HELP.map(([c, d]) => ({ text: `  ${c.padEnd(14)}${d}` })),
        ]);
        return;

      case 'pwd':
        push([{ text: `/Users/you/${cwd.join('/')}`.replace(/\/$/, '') }, { text: '你現在站在這裡。路徑就是「從最外層一路走到這裡」的順序。', tone: 'hint' }]);
        return;

      case 'ls': {
        if (!here || here.type !== 'dir') return push([{ text: 'ls: 這裡不是資料夾', tone: 'err' }]);
        const names = Object.keys(here.children).filter((n) => flags.includes('a') || !n.startsWith('.'));
        if (!names.length) return push([{ text: '（空的）' }]);
        push([
          { text: names.map((n) => (here.children[n].type === 'dir' ? `${n}/` : n)).join('   ') },
          ...(!flags.includes('a') && Object.keys(here.children).some((n) => n.startsWith('.'))
            ? [{ text: '這裡還有以點開頭的隱藏資料夾，打 ls -a 才看得到。', tone: 'hint' as const }]
            : []),
        ]);
        return;
      }

      case 'cd': {
        if (!arg || arg === '~') {
          setCwd([]);
          return push([{ text: '回到最外層。', tone: 'hint' }]);
        }
        if (arg === '..') {
          if (!cwd.length) return push([{ text: '已經在最外層了。', tone: 'hint' }]);
          setCwd(cwd.slice(0, -1));
          return;
        }
        const target = [...cwd, ...arg.split('/').filter(Boolean)];
        const n = nodeAt(target);
        if (!n) return push([{ text: `cd: ${arg}: 找不到這個資料夾`, tone: 'err' }, { text: '先打 ls 看看這裡到底有什麼，名字要一模一樣。', tone: 'hint' }]);
        if (n.type !== 'dir') return push([{ text: `cd: ${arg}: 這是檔案，不是資料夾`, tone: 'err' }]);
        setCwd(target);
        return;
      }

      case 'mkdir': {
        if (!arg) return push([{ text: 'mkdir: 要給一個名字', tone: 'err' }]);
        if (!here || here.type !== 'dir') return;
        if (here.children[arg]) return push([{ text: `mkdir: ${arg} 已經存在`, tone: 'err' }]);
        here.children[arg] = { type: 'dir', children: {} };
        setFs({ ...fs });
        push([{ text: `建好了：${arg}/`, tone: 'hint' }]);
        return;
      }

      case 'touch': {
        if (!arg) return push([{ text: 'touch: 要給一個檔名', tone: 'err' }]);
        if (!here || here.type !== 'dir') return;
        here.children[arg] = { type: 'file', content: '' };
        setFs({ ...fs });
        push([{ text: `建好了：${arg}（空的）`, tone: 'hint' }]);
        return;
      }

      case 'cat': {
        if (!arg) return push([{ text: 'cat: 要給一個檔名', tone: 'err' }]);
        const n = nodeAt([...cwd, ...arg.split('/').filter(Boolean)]);
        if (!n) return push([{ text: `cat: ${arg}: 找不到這個檔案`, tone: 'err' }]);
        if (n.type !== 'file') return push([{ text: `cat: ${arg}: 這是資料夾`, tone: 'err' }]);
        push(n.content ? n.content.split('\n').map((t) => ({ text: t })) : [{ text: '（這個檔案是空的）' }]);
        return;
      }

      case 'tree': {
        if (!here || here.type !== 'dir') return;
        const rows: Line[] = [{ text: `${cwd.length ? cwd[cwd.length - 1] : '~'}/` }];
        const walk = (n: Node, depth: number) => {
          if (n.type !== 'dir') return;
          for (const name of Object.keys(n.children)) {
            const child = n.children[name];
            rows.push({ text: `${'  '.repeat(depth)}└ ${name}${child.type === 'dir' ? '/' : ''}` });
            if (depth < 2) walk(child, depth + 1);
          }
        };
        walk(here, 1);
        push(rows);
        return;
      }

      case 'git': {
        const sub = rest[0];
        if (sub === 'status')
          return push([
            { text: 'On branch main' },
            { text: 'Changes not staged for commit:' },
            { text: '  modified:   index.html' },
            { text: '這是在說：index.html 改過了，但還沒存進版本裡。存檔要 git add 再 git commit。', tone: 'hint' },
          ]);
        if (sub === 'init') return push([{ text: 'Initialized empty Git repository' }, { text: '這個資料夾從現在開始有存檔點了。', tone: 'hint' }]);
        if (sub === 'commit') return push([{ text: '[main 4f2a1c9] 你的訊息' }, { text: '存好了。commit 是存檔，不是備份，東西還是只在這台電腦裡。', tone: 'hint' }]);
        return push([{ text: `這個沙盒只做 git status / git init / git commit。`, tone: 'hint' }]);
      }

      case 'rm':
        return push([
          { text: 'rm: 這個沙盒不做刪除', tone: 'err' },
          { text: '真的終端機裡 rm 刪掉的東西不會進垃圾桶，也沒有還原。要刪檔案，用檔案總管或 Finder 刪，至少還撿得回來。', tone: 'hint' },
        ]);

      case 'claude': {
        if (!cwd.length)
          return push([
            { text: '可以啟動，但你現在在最外層。', tone: 'err' },
            { text: '先 cd 進你的專案資料夾再啟動，它讀得到的範圍就是你啟動的那個資料夾。', tone: 'hint' },
          ]);
        setInClaude(true);
        return push([
          { text: '' },
          { text: '  ✻ Claude Code' },
          { text: `  cwd: /Users/you/${cwd.join('/')}` },
          { text: '' },
          { text: '試試看打 /context 或 /agents，打 exit 離開。', tone: 'hint' },
        ]);
      }

      case 'clear':
        setOut([]);
        return;

      case 'exit':
        return push([{ text: '你不在 Claude Code 裡面。', tone: 'hint' }]);

      default:
        push([
          { text: `找不到指令：${head}`, tone: 'err' },
          { text: '真的終端機也會這樣回你。這不是壞掉，是它不認得這個字。打 help 看認得哪些。', tone: 'hint' },
        ]);
    }
  }

  function runInClaude(cmd: string) {
    if (cmd === 'exit' || cmd === '/exit') {
      setInClaude(false);
      return push([{ text: '離開 Claude Code，回到終端機。', tone: 'hint' }]);
    }
    if (cmd === '/context') {
      const here = nodeAt(cwd);
      const hasMd = here?.type === 'dir' && !!here.children['CLAUDE.md'];
      return push(
        hasMd
          ? [
              { text: 'Context 使用狀況' },
              { text: '  System prompt          2.1k' },
              { text: '  CLAUDE.md              0.4k   ← 你的手冊在這裡' },
              { text: '  Tools                  9.8k' },
              { text: '這一行看得到，才代表它真的讀到了。', tone: 'hint' },
            ]
          : [
              { text: 'Context 使用狀況' },
              { text: '  System prompt          2.1k' },
              { text: '  Tools                  9.8k' },
              { text: '清單裡沒有 CLAUDE.md，代表這個資料夾裡沒有那份檔案，或你在錯的層。', tone: 'hint' },
            ],
      );
    }
    if (cmd === '/agents') {
      const n = nodeAt([...cwd, '.claude', 'agents']);
      const names = n && n.type === 'dir' ? Object.keys(n.children) : [];
      return push(
        names.length
          ? [
              { text: '這個專案裡的子代理：' },
              ...names.map((x) => ({ text: `  ${x.replace(/\.md$/, '')}` })),
              { text: '要它出場得點名，例如「請 code-reviewer 檢查 index.html」。', tone: 'hint' },
            ]
          : [{ text: '這個專案還沒有子代理。' }, { text: '建一個檔案放到 .claude/agents/ 就有了。', tone: 'hint' }],
      );
    }
    if (cmd === '/cost' || cmd === '/usage')
      return push([{ text: '這個沙盒沒有真的用量。真的畫面會顯示這一輪花了多少、額度還剩多少。', tone: 'hint' }]);
    if (cmd.startsWith('/'))
      return push([{ text: `這個沙盒只做 /context、/agents、/cost。`, tone: 'hint' }]);

    return push([
      { text: '（這裡不會真的呼叫 Claude）', tone: 'hint' },
      { text: '真的用起來，你打完這句它會先說要改哪一個檔案，你同意了它才動手。', tone: 'hint' },
    ]);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const i = Math.min(hIdx + 1, history.length - 1);
      if (history[i]) {
        setHIdx(i);
        setInput(history[i]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(i);
      setInput(i >= 0 ? history[i] || '' : '');
    }
  }

  const QUICK = inClaude
    ? ['/context', '/agents', 'exit']
    : ['pwd', 'ls', 'cd mission-timer', 'ls -a', 'cat CLAUDE.md', 'claude', 'git status'];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-5 py-2.5">
          <span className="font-mono text-sm text-slate-300">終端機練習沙盒</span>
          <span className="text-xs text-slate-500">打錯不會弄壞任何東西</span>
          <span className="ml-auto font-mono text-xs text-slate-500">
            {inClaude ? 'Claude Code' : `~/${cwd.join('/')}`.replace(/\/$/, '')}
          </span>
          <button
            type="button"
            onClick={() => {
              setFs(initialFs());
              setCwd([]);
              setInClaude(false);
              setOut([{ text: '回到最初的狀態。', tone: 'hint' }]);
            }}
            className="text-slate-500 hover:text-slate-300"
            aria-label="重來"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <div className="h-[380px] overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed">
          {out.map((l, i) => (
            <div
              key={i}
              className={
                l.tone === 'cmd'
                  ? 'text-slate-100'
                  : l.tone === 'err'
                    ? 'text-rose-300'
                    : l.tone === 'hint'
                      ? 'text-slate-500'
                      : 'text-slate-300'
              }
            >
              {l.text || ' '}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="border-t border-slate-800 px-5 py-3 flex items-center gap-3">
          <span className="font-mono text-sm text-emerald-400 shrink-0">
            {inClaude ? '>' : `${`~/${cwd.join('/')}`.replace(/\/$/, '')} $`}
          </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoFocus
            placeholder={inClaude ? '打 /context 看看' : '打 pwd 看看'}
            className="flex-1 bg-transparent font-mono text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
          />
        </div>

        <div className="border-t border-slate-800 px-5 py-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 mr-1">點一下就填進去：</span>
          {QUICK.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setInput(q)}
              className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-300 hover:border-slate-700"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <Panel title="這幾個就夠了" desc="課程裡真正會用到的就這些，其他的等你需要再查。">
        <div className="divide-y divide-slate-800">
          {HELP.map(([c, d]) => (
            <div key={c} className="grid grid-cols-[9rem_1fr] gap-4 py-2.5 text-sm leading-relaxed">
              <code className="font-mono text-slate-200">{c}</code>
              <span className="text-slate-400">{d}</span>
            </div>
          ))}
        </div>
        <Note>
          走桌面版那條路的話，這一頁可以只當作認字用：<Mono>cd</Mono> 跟 <Mono>ls</Mono> 是什麼意思，
          之後看別人的教學才不會卡住。桌面版點資料夾就等於這裡的 cd。
        </Note>
      </Panel>
    </div>
  );
}
