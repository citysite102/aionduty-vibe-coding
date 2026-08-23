import { GitPullRequest, AppWindow, Copy, TerminalSquare } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';
import { Callout } from '../components/Callout';

/**
 * 這一頁原本是左右兩欄：左邊一個「你的需求在哪裡」的決策框架，右邊報表案例。
 *
 * 左欄跟前面「照你的目標，挑一種 AI 工具」那一頁重複，兩邊都是把純對話 → 中間 → Claude Code
 * 排成一條軸，只是換個講法。留下來的是右欄，因為它有那一頁沒有的東西：
 * 同一個需求在三種做法底下各長什麼樣。判準是「兩頁互換位置讀起來有差別嗎」，
 * 有了報表這個共同題目才有差別。
 *
 * 2026-08-18 從「換你改這兩句」後面搬到「照你的目標，挑一種 AI 工具」正後方。
 * 那兩頁講的是同一件事（什麼時候用哪一種做法），中間隔著四頁講怎麼把話說清楚；
 * 分成兩個錄製單元之後，這一頁留在原位會變成一支影片的結尾講另一支的主題。
 *
 * 三段不是平等的項目，第三段是這堂課要帶大家去的地方，所以只有它上 sky，
 * 前兩段維持灰階。不要為了「看起來有層次」給前兩段各配一個顏色。
 *
 * 第三段刻意不寫死成終端機：課程現在是先桌面版再終端機，寫「在終端機運作」
 * 會跟學員前一頁剛做完的事對不上。
 */
const STAGES = [
  {
    icon: AppWindow,
    when: '老闆等一下就要看',
    what: '單次需求',
    body: '把資料丟進網頁版的對話框，請它直接算好、畫成圖表。做完就結束，不留下任何東西。',
    limit: '它看不到你電腦裡的檔案，資料要自己貼進去。',
    highlight: false,
  },
  {
    icon: Copy,
    when: '每個月初都要做一次',
    what: '重複需求',
    body: '請它寫一支處理報表的程式，你複製貼上到自己電腦執行。出錯就把錯誤訊息再貼回對話框問。',
    limit: '每一輪都要你當搬運工。專案一變大，貼漏一段、蓋掉一個檔案都很常見。',
    highlight: false,
  },
  {
    icon: TerminalSquare,
    when: '要跟你手上的專案和流程接在一起',
    what: '系統化需求',
    body: '在你自己的電腦上開 Claude Code，讓它直接在專案資料夾裡工作。它會自己寫程式、自己安裝需要的套件（別人寫好、拿來就能用的現成零件）、自己看報錯修到跑得動、自己存檔。',
    limit: '你從動手的人，變成決定方向跟驗收的人。',
    highlight: true,
  },
];

const PROMPT = `幫我寫一支 Python 腳本來處理報表，具體需求如下：
1. 讀取 ./data/ 目錄下的所有 .csv 檔案
2. 將這些檔案合併，並根據「日期」欄位排序
3. 輸出到 ./output/summary.xlsx
4. 執行腳本確認沒問題後，幫我用「feat: add report processing script」進行 git commit`;

export default function SlideIntroCases() {
  return (
    <SlideLayout title="同一個需求，差別在它碰不碰得到你的檔案" subtitle="When to Use What" icon={GitPullRequest}>
      <div className="max-w-5xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          拿同一件事來比比看：<strong className="text-slate-100">幫我處理報表。</strong>
          三種用的都是同一個 AI，差別在它能不能碰到你的檔案，以及做完之後有沒有留下東西。
        </AnimatedBlock>

        {STAGES.map((s, i) => {
          const Icon = s.icon;
          return (
            <AnimatedBlock
              key={s.what}
              stepIndex={i + 2}
              className={`rounded-2xl border p-5 ${
                s.highlight
                  ? 'bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    s.highlight ? 'bg-sky-500/15 text-sky-400' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 mb-1.5">
                    <h3 className="text-base font-bold text-slate-100">{s.when}</h3>
                    <span className="text-sm text-slate-500">{s.what}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{s.body}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mt-1.5">{s.limit}</p>
                </div>
              </div>
            </AnimatedBlock>
          );
        })}

        <AnimatedBlock stepIndex={5}>
          <CopyBlock text={PROMPT} note="第三種做法實際交代下去的樣子" />
        </AnimatedBlock>

        <Callout tone="muted" stepIndex={6}>
          第二種是最多人現在的做法，也是這門課要帶你離開的那一種。
          它每個月都要你重來一次，而前面兩種都沒有留下一份「下次它還記得」的東西。
        </Callout>

      </div>
    </SlideLayout>
  );
}
