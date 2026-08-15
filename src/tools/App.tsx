import React, { useEffect, useState } from 'react';
import {
  Compass,
  ClipboardList,
  Wand2,
  FileText,
  UserPlus,
  Signpost,
  ListChecks,
  SquareTerminal,
  Globe,
  ExternalLink,
} from 'lucide-react';
import Start from './modules/Start';
import Cheatsheet from './modules/Cheatsheet';
import PromptBuilder from './modules/PromptBuilder';
import ClaudeMdBuilder from './modules/ClaudeMdBuilder';
import SubagentBuilder from './modules/SubagentBuilder';
import RuleRouter from './modules/RuleRouter';
import DoneWhenChecker from './modules/DoneWhenChecker';
import Sandbox from './modules/Sandbox';
import DeployHelp from './modules/DeployHelp';

/**
 * 課程工具箱。跟簡報同一個 repo、同一次部署，網址是簡報的 /tools/。
 *
 * 每一個工具都對應課程裡的一段，而且都產出一個帶得走的東西（一段指令、一個檔案、一個判斷）。
 * 沒有東西可以帶走的就不要放進來，那種內容留在投影片上就好。
 *
 * 分頁狀態寫進網址的 hash，講者可以直接把 /tools/#claude-md 這種連結貼給學員。
 */
const TABS = [
  {
    id: 'start',
    icon: Compass,
    label: '從這裡開始',
    sub: '你現在該用哪一格',
    from: '',
    when: '',
    Component: Start,
  },
  {
    id: 'cheatsheet',
    icon: ClipboardList,
    label: '指令速查',
    sub: '課程裡出現過的每一句',
    from: '全課程',
    when: '想不起來某一步那句話怎麼打。這裡收的都是課程裡真的出現過的原話，照單元排。',
    Component: Cheatsheet,
  },
  {
    id: 'prompt',
    icon: Wand2,
    label: 'Prompt 組裝器',
    sub: '目標、什麼叫做完、怎麼驗、邊界',
    from: '第四單元',
    when: '要交代一件比較大的事，而且希望它自己驗、自己修，不是改完就停下來等你。',
    Component: PromptBuilder,
  },
  {
    id: 'claude-md',
    icon: FileText,
    label: 'CLAUDE.md 產生器',
    sub: '含 AGENTS.md 怎麼接',
    from: '第二單元',
    when: '開一個新專案的第一件事。或是你發現自己每次開新對話都在重講同樣的規矩。',
    Component: ClaudeMdBuilder,
  },
  {
    id: 'subagent',
    icon: UserPlus,
    label: '子代理產生器',
    sub: '會退回的審查角色',
    from: '第三單元',
    when: '你不想每次都自己檢查，但又不放心讓它自己說「看起來沒問題」的時候。',
    Component: SubagentBuilder,
  },
  {
    id: 'router',
    icon: Signpost,
    label: '規則分流器',
    sub: '這條該放哪一層',
    from: '第二單元',
    when: '想到一條新規矩，但不確定要寫進手冊、分到子目錄、做成 Skill 還是用 Hook 擋。',
    Component: RuleRouter,
  },
  {
    id: 'done-when',
    icon: ListChecks,
    label: 'Done-when 檢查器',
    sub: '把願望改成驗得出來的句子',
    from: '第四單元',
    when: '交代完它做出來的東西總是差一點，多半是完成條件寫成了願望。先貼進來看哪幾句驗不出來。',
    Component: DoneWhenChecker,
  },
  {
    id: 'sandbox',
    icon: SquareTerminal,
    label: '終端機沙盒',
    sub: '打錯不會弄壞東西',
    from: '選修',
    when: '第一次開終端機、或看不懂別人教學裡那幾行指令的時候。這裡打錯不會弄壞任何東西。',
    Component: Sandbox,
  },
  {
    id: 'deploy',
    icon: Globe,
    label: '部署卡關',
    sub: '六個症狀跟怎麼辦',
    from: '第四單元',
    when: '推不上去、部署完一片空白、改了網址卻沒更新。照症狀找，不用先懂原理。',
    Component: DeployHelp,
  },
];

export default function App() {
  const [active, setActive] = useState(() => {
    const h = window.location.hash.replace('#', '');
    return TABS.some((t) => t.id === h) ? h : TABS[0].id;
  });

  useEffect(() => {
    if (window.location.hash.replace('#', '') !== active) window.location.hash = active;
  }, [active]);

  // 分頁已經開著的時候，貼一個 #claude-md 這種連結進網址列不會重新載入，
  // 沒有這段就會停在原本那一格，講者以為連結沒用。
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#', '');
      if (TABS.some((t) => t.id === h)) setActive(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const tab = TABS.find((t) => t.id === active) ?? TABS[0];
  // 起始頁要能把人送去別格，所以它多吃一個 go；其餘的都不吃 props
  const Body = tab.Component as React.ComponentType<{ go?: (id: string) => void }>;

  return (
    <div className="min-h-screen bg-[#020617]">
      <header className="border-b border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <h1 className="text-xl font-bold text-slate-100">課程工具箱</h1>
          <p className="text-sm text-slate-500">
            打造自己的 AI 工作體系 · 每一格都會產出一個你帶得走的東西
          </p>
          <a
            href="../"
            className="ml-auto inline-flex items-center gap-1.5 text-sm text-sky-400 hover:text-sky-300"
          >
            回到簡報
            <ExternalLink size={13} />
          </a>
        </div>
      </header>

      <nav className="border-b border-slate-800/80 bg-slate-950/40 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex gap-1.5 overflow-x-auto">
          {TABS.map((t) => {
            const Icon = t.icon;
            const on = t.id === active;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                aria-current={on ? 'page' : undefined}
                className={`shrink-0 flex items-center gap-2 px-4 py-4 border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 ${
                  on
                    ? 'border-sky-400 text-sky-300'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <Icon size={16} className="shrink-0" />
                <span className="text-sm font-bold whitespace-nowrap">{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-10">
        <div className="mb-7">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
            <h2 className="text-2xl font-bold text-slate-100">{tab.label}</h2>
            <span className="text-base text-slate-500">{tab.sub}</span>
            {tab.from && (
              <span className="rounded-full border border-slate-800 px-2.5 py-0.5 font-mono text-xs text-slate-500">
                {tab.from}
              </span>
            )}
          </div>
          {tab.when && (
            <p className="mt-3 rounded-xl border border-sky-500/20 bg-sky-500/5 px-5 py-3.5 text-base leading-relaxed text-slate-300 max-w-4xl">
              <span className="font-bold text-sky-300">什麼時候用：</span>
              {tab.when}
            </p>
          )}
        </div>
        <Body go={setActive} />
      </main>

      <footer className="border-t border-slate-800/80 mt-14">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 text-sm leading-relaxed text-slate-500 max-w-prose space-y-3">
          <p>
            這裡的東西都在你的瀏覽器裡跑，沒有送出去任何內容，也沒有呼叫任何 AI。
            關掉分頁就沒了，要留下來的請按複製。
          </p>
          <p>
            要印出來放在手邊的四份講義（
            <code className="font-mono">CLAUDE.md</code> 模板、規則分流判斷卡、五步健檢表、錯誤訊息對照表）在
            <a
              href="../handouts/"
              className="ml-1 inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300"
            >
              講義下載頁
              <ExternalLink size={12} />
            </a>
            。
          </p>
        </div>
      </footer>
    </div>
  );
}
