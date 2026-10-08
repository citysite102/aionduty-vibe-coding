import { PackageOpen, Users, FolderTree, Unplug, ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 2026-10-08 新增（講師要求）：前一頁〈一個產品團隊的角色，各自讀哪一份規範〉把子代理放大到
 * 五個角色，學員會問「有沒有人已經做好一整套」。有，而且做到底了，所以這一頁要回答的是
 * 「現成的拿來用，哪一半能借、哪一半不能」，不是介紹那個專案。
 *
 * 最後查證：2026-10-08，`gh api repos/msitarzewski/agency-agents`。
 * 當時的現況：230+ 個角色、18 個部門、MIT、15.8 萬顆星，支援 14 種以上的工具，
 * 安裝方式是 `./scripts/install.sh --tool claude-code` 或下載它的桌面程式。
 * 星數與角色數會變，下次改版前重跑那一行，不要憑印象改。畫面上的星數標了查證月份，
 * **改數字就要連那個月份一起改**，否則會變成一個看起來精確但沒人知道哪天量的數字。
 *
 * 2026-10-08 第二輪（講師）兩件事：
 *
 * 一、**語氣從「你」改成「我們」**。原本開場是「那五個角色，你是一個字一個字打出來的。
 *    下一個專案呢，再打一次嗎？」，講師指出那讀起來像在指著學員問話。前面那五個角色是
 *    課程裡一起做的，所以是「我們自己設置的」。同一條套用到整頁：建議那一塊也從
 *    「挑三到五個複製出來改寫」軟化成「使用前先讀過它是怎麼設計的」。
 *    **改這一頁的文案時不要把「我們」換回「你」。**
 *
 * 二、**原本整頁都是字，加了一張對照圖**（`CONTRAST`）。它直接沿用前一頁已經建立的那個
 *    箭頭模型：左邊角色、右邊它只准照的那一份。現成的那一包只給得起箭頭左邊，右邊是空的。
 *    這張圖取代了原本「它給的是角色，不是你的規範」那一整段說明，**不要兩邊都留**，
 *    留兩份就是同一件事講兩次。改前一頁的箭頭寫法時，這張圖要一起改。
 *
 * 三個代價裡最容易被跳過的是第一個。學員看到 230 會以為是 230 個幫手，但子代理是叫才出來的
 * （章節五講過載入時機），沒叫就只是躺在資料夾裡的檔案。這一條不要刪。
 *
 * 強調色兩種：sky（能借的那一半與對照圖）與 amber（三個代價）。`.claude/agents/` 走 orange，
 * 那是 Claude Code 的專有名詞，不計入額度（A-1）。
 */

const CONTRAST = [
  {
    label: '我們自己做的',
    role: 'agents/pm.md',
    spec: 'docs/PRD-template.md',
    note: '規範是我們自己定的，所以它做出來的東西才會長成我們要的樣子',
    ours: true,
  },
  {
    label: '現成的那一包',
    role: 'agents/pm.md',
    spec: null,
    note: '角色有，規範沒有。它只知道一個 PM 通常怎麼做事，不知道我們這個專案的規定',
    ours: false,
  },
];

const COSTS = [
  {
    icon: Users,
    t: '230 份檔案不等於 230 個幫手',
    d: '子代理是叫了才出來的，沒叫就只是躺在資料夾裡的檔案。會動的是我們記得住名字的那幾個。',
  },
  {
    icon: FolderTree,
    t: '整包裝進去，資料夾就讀不完了',
    d: '出事的時候要回答「是哪一份在影響它」。裝三個翻得完，裝 230 個只能整個重裝一次。',
  },
  {
    icon: Unplug,
    t: '它的角色跟我們的流程不一定對得上',
    d: '那是一個通用團隊的分法。我們的流程裡可能根本沒有那個角色，也可能少了一個它沒有的。',
  },
];

const ASK = [
  {
    q: '它裝到哪裡、會動到哪些檔案？',
    d: '先把安裝腳本打開看一遍再執行。這一包會寫進 .claude/agents/，也會改各家工具的設定檔。',
  },
  {
    q: '它加的是角色，還是規範？',
    d: '角色可以參考，規範要換成我們自己的。看那份檔案有沒有提到這個專案，沒有就是通用角色。',
  },
  {
    q: '拿掉它，專案還跑得動嗎？',
    d: '答案是「要重寫一半」的東西，先不要裝在正式專案上。角色檔是純文字，刪掉就沒了。',
  },
];

export default function SlideReadyMadeAgents() {
  return (
    <SlideLayout title="230 個現成角色：借角色，不要借規範" subtitle="Ready-made Agent Packs" icon={PackageOpen}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 max-w-6xl mx-auto items-start pb-8">

        <div className="space-y-4">
          <AnimatedBlock stepIndex={1}>
            <p className="text-slate-300 text-base leading-relaxed">
              前面那五個角色是我們自己設置的。而 GitHub 上有一個叫{' '}
              <strong className="text-slate-100">agency-agents</strong>{' '}
              的專案，裡面放了 230 個以上的現成角色，工程、設計、行銷、財務都有，
              一行指令就全部進到{' '}
              <code className="font-mono text-orange-300">.claude/agents/</code>。
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2.5 text-slate-500 text-sm">
              <span>MIT 授權</span>
              <span>支援 Claude Code、Cursor、Copilot 等十幾種工具</span>
              <span>15 萬顆星（2026 年 10 月查）</span>
              <span>每一份的骨架跟我們寫的 code-reviewer 一樣</span>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
            <h3 className="text-slate-100 text-base font-bold">差別在箭頭的右邊</h3>
            {CONTRAST.map((c) => (
              <div key={c.label}>
                <p className={`text-sm font-bold mb-1.5 ${c.ours ? 'text-sky-300' : 'text-slate-400'}`}>{c.label}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-200">
                    {c.role}
                  </span>
                  <ArrowRight aria-hidden="true" size={18} className="text-slate-600 shrink-0" />
                  {c.spec ? (
                    <span className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 font-mono text-sm text-sky-200">
                      {c.spec}
                    </span>
                  ) : (
                    <span className="rounded-lg border border-dashed border-slate-700 px-3 py-2 text-sm text-slate-500">
                      沒有這一半
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mt-1.5">{c.note}</p>
              </div>
            ))}
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="space-y-2">
            <h3 className="text-slate-100 text-base font-bold">整包裝下去的三個代價</h3>
            {COSTS.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.t} className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5">
                  <span className="flex items-center gap-2.5 text-slate-100 text-sm font-bold mb-1">
                    <Icon aria-hidden="true" size={16} className="text-amber-400 shrink-0" />
                    {c.t}
                  </span>
                  <p className="text-slate-300 text-sm leading-relaxed">{c.d}</p>
                </div>
              );
            })}
          </AnimatedBlock>
        </div>

        <div className="space-y-4">
          <AnimatedBlock stepIndex={4} className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-2">參考它的角色名字與分工</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              一個團隊該有哪些角色、每個角色交出什麼，這件事不值得從零想一遍。
              打開它的工程部門看一次，很可能會看到一個我們沒想到要開的角色，
              例如專門把需求翻成規格的那個。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-1">看到下一個同類型的專案，先問這三題</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              這一類專案一直在冒出來，搜「Claude Code agents」就會看到一整排。
              帶走這三個問題，比記住任何一個專案的名字有用。
            </p>
            <div className="space-y-2">
              {ASK.map((a, i) => (
                <div key={a.q} className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-sm text-slate-600 shrink-0">0{i + 1}</span>
                    <span className="text-slate-100 text-sm font-bold">{a.q}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mt-1 pl-7">{a.d}</p>
                </div>
              ))}
            </div>
          </AnimatedBlock>

          <Callout tone="muted" label="用之前先讀過它" stepIndex={6}>
            這一包可以拿來用，但在用之前，記得先讀一下那幾個角色是怎麼設計的：它被交代做什麼、
            不准做什麼、交出來的東西長什麼樣。讀過才知道它跟我們的流程對不對得上，
            也才知道要補哪一句「照 docs/ 底下哪一份做」。
          </Callout>
        </div>

      </div>
    </SlideLayout>
  );
}
