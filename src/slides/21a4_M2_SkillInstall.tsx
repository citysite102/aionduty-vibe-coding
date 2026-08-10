import { PackagePlus, FolderPlus, Store, MessageSquare } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 現場最卡的一頁，原本不存在。
 *
 * Skill 前面兩頁都在講「裝了差在哪」，但怎麼裝只有一行註腳寫「用 /plugin 裝」，
 * 結果整班卡在這裡，有人還被要求去開終端機。
 *
 * 三種來源照「你掌握得了多少」排：自己寫最穩，因為它就是一個資料夾加一個檔案，
 * 不依賴市集、不依賴網路、桌面版終端機都一樣。市集排第二。
 *
 * 最後那塊是回饋裡明確提到的卡點：檔案建好了但它沒反應，因為要重開一次 session。
 * 這件事沒人會自己想到，一定要寫在畫面上。
 */
const WAYS = [
  {
    icon: FolderPlus,
    tag: '最穩',
    name: '自己寫一個',
    body: '一個資料夾加一個檔案就是一個 Skill，不用市集、不用網路，桌面版跟終端機都一樣。',
    how: '.claude/skills/名稱/SKILL.md',
    prompt: '「幫我建一個叫 weekly-report 的 Skill，內容是我每週整理報表的步驟：⋯」',
    accent: true,
  },
  {
    icon: Store,
    tag: '裝現成的',
    name: '從市集裝',
    body: '官方市集是 anthropics/claude-plugins-official，社群也有自己的。裝之前先看它要求什麼權限。',
    how: '輸入 /plugin，選市集，挑一個裝',
    prompt: null,
    accent: false,
  },
  {
    icon: MessageSquare,
    tag: '懶人法',
    name: '直接叫它裝',
    body: '你不確定該打哪個指令的時候，把名字給它就好，它會自己去找、自己放到對的位置。',
    how: null,
    prompt: '「幫我安裝 frontend-design 這個 Skill，裝完告訴我怎麼叫它。」',
    accent: false,
  },
];

export default function SlideSkillInstall() {
  return (
    <SlideLayout title="Skill 怎麼裝，怎麼知道它裝好了" subtitle="Installing a Skill" icon={PackagePlus}>
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          三種來源做的是同一件事：<strong className="text-slate-100">把一份 SKILL.md 放到它找得到的地方。</strong>
          所以某一種卡住的時候，換另一種也一樣會成功。
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WAYS.map((w, i) => {
            const Icon = w.icon;
            return (
              <AnimatedBlock
                key={w.name}
                stepIndex={i + 2}
                className={`rounded-2xl border p-5 flex flex-col ${
                  w.accent
                    ? 'bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      w.accent ? 'bg-sky-500/15 text-sky-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-base font-bold text-slate-100 leading-tight">{w.name}</div>
                    <div className="text-xs text-slate-500">{w.tag}</div>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-3">{w.body}</p>

                {w.how && (
                  <div className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-sm text-orange-300 break-all mb-2">
                    {w.how}
                  </div>
                )}
                {w.prompt && (
                  <div className="mt-auto rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-600 mb-1">Prompt</div>
                    <p className="text-sky-100 text-sm leading-relaxed">{w.prompt}</p>
                  </div>
                )}
              </AnimatedBlock>
            );
          })}
        </div>

        <Callout tone="warn" label="檔案明明建好了，它卻沒反應" stepIndex={5}>
          <strong className="text-slate-100">先重開一次對話。</strong>
          新增的 Skill、子代理、規則檔，是在對話開始的時候掃進來的。
          你在對話中途建的檔案，這一輪它不會知道，輸入{' '}
          <code className="font-mono text-orange-300">/clear</code> 或關掉重開就會掃到。
          <span className="block mt-2 text-slate-400">
            重開之後還是沒有，就檢查兩件事：資料夾名稱跟 SKILL.md 裡寫的 name 是不是一致，
            以及檔案是不是真的放在 <code className="font-mono text-slate-300">.claude/skills/</code> 底下（那個資料夾預設是隱藏的）。
          </span>
        </Callout>

        <AnimatedBlock stepIndex={6} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <div className="text-base font-bold text-slate-100 mb-2">怎麼確認它真的裝好了</div>
          <p className="text-slate-400 text-sm leading-relaxed">
            最直接的辦法是點名叫它：<span className="text-slate-200">「用 frontend-design 這個 Skill 幫我改版面。」</span>
            它有沒有照那套流程走，你看它的回應就知道。
            也可以輸入 <code className="font-mono text-orange-300">/context</code>，載進來的東西會列在裡面。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
