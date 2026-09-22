import { PackagePlus, FolderPlus, Store, MessageSquare } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyAction } from '../components/CopyBlock';
import { Callout } from '../components/Callout';
import pluginCommand from '../../assets/ui/plugin-command.png';
import pluginDiscover from '../../assets/ui/plugin-discover.png';

/**
 * 最後查證：2026-09-22，對照 code.claude.com/docs/en/skills 的 Skill 檔案結構那一節。
 * 當時的現況：`SKILL.md` 是唯一必要的檔案，但原文寫「Skills can include multiple files
 * in their directory」，可以附參考文件、範例與腳本，那些檔案不會每次載入，
 * 由 `SKILL.md` 裡的連結說明哪一份什麼時候讀（官方另建議 `SKILL.md` 控制在 500 行以內）。
 * 所以這一頁不要寫成「一個 Skill 就是一個檔案」，逐字稿 5-2 的 Slide 57 也照這個講。
 * 下次改版前先重查那一節。
 */

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
    tag: '最穩，不用連網',
    name: '自己寫一個',
    body: '一個資料夾放一個 SKILL.md 就是一個 Skill，不用市集也不用網路。檔案開頭要寫 name 與 description，name 要跟資料夾名稱一致。',
    how: '.claude/skills/名稱/SKILL.md',
    prompt: '「幫我建一個叫 weekly-report 的 Skill，內容是我每週整理報表的步驟：⋯」',
    accent: true,
    shots: false,
  },
  {
    icon: Store,
    tag: '裝別人做好的',
    name: '從市集裝',
    body: '官方市集是 anthropics/claude-plugins-official。挑之前先看說明，知道它會做什麼再裝。',
    how: '/plugin → Discover 分頁',
    prompt: null,
    accent: false,
    shots: true,
  },
  {
    icon: MessageSquare,
    tag: '不確定指令就用這個',
    name: '直接叫它裝',
    body: '你不確定該打哪個指令的時候，把名字給它就好，它會自己去找、自己放到對的位置。',
    how: null,
    prompt: '「幫我安裝 frontend-design 這個 Skill，裝完告訴我怎麼叫它。」',
    accent: false,
    shots: false,
  },
];

export default function SlideSkillInstall() {
  return (
    <SlideLayout title="Skill 的三種來源，怎麼確認它裝好了" subtitle="Installing a Skill" icon={PackagePlus}>
      <div className="max-w-6xl mx-auto space-y-2 pb-2">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          三種來源，最後拿到的都是同一個東西：
          <strong className="text-slate-100">一個放在它找得到的位置的資料夾，裡面一定有一份 <code className="font-mono text-orange-300">SKILL.md</code>。</strong>
          差別只在這份檔案是你自己寫的，還是拿別人做好的。
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
                {/*
                  實機截圖，不是示意圖。兩張合起來回答「打了 /plugin 之後會看到什麼」：
                  上面是輸入框的樣子，下面是 Plugins 面板，重點在 Discover 那個分頁。
                  第二張用 object-top 裁掉下半，完整放會把整頁撐高約 200px。
                  換 Claude Code 版本之後畫面會變，要重截請一起換掉 assets/ui/ 那兩個檔案。
                */}
                {w.shots && (
                  <div className="mt-auto space-y-2">
                    <img
                      src={pluginCommand}
                      alt="Claude Code 的輸入框，打上 /plugin"
                      className="w-full rounded-lg border border-slate-800"
                    />
                    <img
                      src={pluginDiscover}
                      alt="Plugins 面板，上方有 Yours 與 Discover 兩個分頁"
                      className="w-full h-12 rounded-lg border border-slate-800 object-cover object-top"
                    />
                  </div>
                )}
                {w.prompt && (
                  <div className="mt-auto rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-600 mb-1">Prompt</div>
                    <p className="text-sky-100 text-sm leading-relaxed">{w.prompt}</p>
                    {/* 資料裡的字串自帶「」是為了排版，複製出去要剝掉 */}
                    <CopyAction text={w.prompt.replace(/^「|」$/g, '')} className="mt-2" />
                  </div>
                )}
              </AnimatedBlock>
            );
          })}
        </div>

        {/*
          這兩塊原本上下疊，加上市集截圖之後整頁超出可視高度（792 對 584）。
          它們講的是同一件事的兩面（沒反應怎麼辦／怎麼確認它在），並排讀得通，
          而且省下一整塊的高度。再往這一頁加東西之前先量一次。
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
        <Callout tone="warn" label="檔案明明建好了，它卻沒反應" stepIndex={5}>
          <strong className="text-slate-100">先重開一次對話。</strong>
          Skill 是在對話開始時掃進來的，中途建的這一輪它不知道。輸入{' '}
          <code className="font-mono text-orange-300">/clear</code> 或關掉重開。
          <span className="block mt-2 text-sm text-slate-400">
            還是沒有，就檢查資料夾名稱跟 SKILL.md 裡的 name 一不一致，以及檔案在不在{' '}
            <code className="font-mono text-slate-300">.claude/skills/</code>（預設隱藏）。
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

      </div>
    </SlideLayout>
  );
}
