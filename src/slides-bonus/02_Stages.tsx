import { Milestone } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { BrandLogo, brandColor, type Brand } from '../components/BrandLogos';
import { SourceFoot, SRC } from './_Source';

/**
 * 三家各走過的五個階段：回答問題 → 記得脈絡 → 使用工具 → 執行任務 → 交付成果。
 *
 * **2026-10-20 這一頁換掉了原本的季度泳道（三家並排、橫軸五個季度）。** 原因是講師指出
 * 那張表「上下對不起來」：一格一到兩條，三家的條數不一樣，同一季的三格高度各不相同，
 * 讀者得自己猜哪一條對哪一條。日期型的比較留給下一頁（一個方向一列，三欄固定對齊），
 * 完整的 66 條在附錄。
 *
 * **這一頁刻意不印日期。** 它要講的是「三家都走過同樣五個階段」，不是誰先誰後；
 * 階段之間沒有確切的分界日，硬掛日期會變成一張假的時間軸。每一格掛的是
 * **那一家在那個階段現在的東西**，學員拿它去對自己的畫面。日期在下一頁。
 *
 * 每一格的名字都來自這一疊已經查證過的資料，不要自己補沒查過的產品：
 *   回答問題  三家的網頁對話本身
 *   記得脈絡  11_Crosswalk 的「記得你上次講過的話」那一列
 *             （Claude Settings › Memory、ChatGPT memory、Gemini Personal Intelligence）
 *   使用工具  Claude 的 Connectors（2026-09-17 Customize 一頁化，Connectors 自己一頁）、
 *             ChatGPT 的 Plugins 與 Skills（官方說 skills 打包成 plugin 發）、
 *             Gemini 自訂裡的 40 個以上應用與服務（gemini.google/release-notes 2026.10.13）
 *
 * **2026-10-20 修掉一個會誤導的格子：Gemini 那一格原本寫 Computer Use。**
 * 同一欄的另外兩家掛的是「接外部工具」，只有 Gemini 掛「代替你點畫面」，
 * 讀者會以為只有 Gemini 做得到。實際上三家都有，而且都在 2026 上半年
 * （Claude 2026-03-23 操作電腦研究預覽擴到 Pro 與 Max、ChatGPT 的 Computer Use 在
 * learn.chatgpt.com 2026-04-13 那一週、Gemini 2026-06-24 公開預覽），
 * 這一條寫在收尾那一頁（`14_Outlook`）的證據列裡，**那裡掛的是類別 icon 不是品牌 Logo**，
 * 理由同 CLAUDE.md「講類別的句子不要掛某一家的 Logo」。
 * 所以這一格改成 Gemini 的工具連接，操作電腦那件事不在這一欄比。
 *   執行任務  Cowork、dots 與 Codex、Spark
 *   交付成果  Docs/Slides/Dashboards、Intelligent UI 的面板、Canvas
 *
 * 最後查證：2026-10-19（名稱）與 2026-10-20（Antigravity 的位置）。
 * 出處與逐條紀錄寫在 `_timeline.ts` 與 `11_Crosswalk.tsx` 的檔頭。
 */
const STAGES = [
  { n: '01', zh: '回答問題', en: 'Chat' },
  { n: '02', zh: '記得脈絡', en: 'Context' },
  { n: '03', zh: '使用工具', en: 'Tools' },
  { n: '04', zh: '執行任務', en: 'Agent' },
  { n: '05', zh: '交付成果', en: 'Work' },
];

/** 一家一條，五格對齊五個階段。格子數一定是 5，少一格版面就會錯開。 */
const LANES: { brand: Brand; name: string; cells: string[] }[] = [
  {
    brand: 'claude',
    name: 'Claude',
    cells: ['claude.ai 對話', 'Settings › Memory', 'Connectors 與 MCP', 'Cowork', 'Docs、Slides、Dashboards'],
  },
  {
    brand: 'openai',
    name: 'ChatGPT',
    cells: ['chatgpt.com 對話', 'memory', 'Plugins 與 Skills', 'dots 與 Codex', 'Intelligent UI 的面板'],
  },
  {
    brand: 'gemini',
    name: 'Gemini',
    cells: ['gemini.google.com 對話', 'Personal Intelligence', '自訂裡的 40 多個服務', 'Spark', 'Canvas'],
  },
];

export default function SlideBonusStages() {
  return (
    <SlideLayout title="從回答問題到交付成果的五個階段" subtitle="Chat → Work" icon={Milestone}>
      <div className="min-h-full max-w-6xl mx-auto flex flex-col gap-6">
        {/* 階段欄頭。第一欄留給泳道的名牌，所以是 1 + 5 格 */}
        <AnimatedBlock stepIndex={1} className="grid grid-cols-[6.5rem_repeat(5,1fr)] gap-3">
          <div />
          {STAGES.map((s, i) => (
            <div
              key={s.n}
              className={`rounded-lg px-2 py-1.5 text-center ${
                i === STAGES.length - 1 ? 'border border-sky-500/30 bg-sky-500/10' : 'bg-slate-900'
              }`}
            >
              <div className="font-mono text-xs text-slate-500">階段 {s.n}</div>
              <div
                className={`text-sm font-bold leading-snug ${
                  i === STAGES.length - 1 ? 'text-sky-200' : 'text-slate-200'
                }`}
              >
                {s.zh}
              </div>
              <div className="font-mono text-xs text-slate-600">{s.en}</div>
            </div>
          ))}
        </AnimatedBlock>

        {/* 一家一條泳道。stepIndex 一家一個，講到哪一家亮哪一條 */}
        {LANES.map((lane, i) => (
          <AnimatedBlock
            key={lane.name}
            stepIndex={i + 2}
            className="grid grid-cols-[6.5rem_repeat(5,1fr)] gap-3 items-start"
          >
            <div className="flex items-center gap-2 pt-1">
              <span style={{ color: brandColor(lane.brand) }}>
                <BrandLogo brand={lane.brand} size={15} />
              </span>
              <span className="text-sm font-bold text-slate-200">{lane.name}</span>
            </div>

            {/*
              線畫在格子底下，點蓋在線上。線不用 border-t 拉滿整列：
              最左跟最右會凸出去半格，看起來像斷掉的鐵軌。
            */}
            {lane.cells.map((cell, k) => (
              <div key={cell} className="relative flex flex-col items-center pt-3">
                <span
                  aria-hidden="true"
                  className={`absolute top-[15px] h-px bg-slate-800 ${
                    k === 0 ? 'left-1/2 right-0' : k === lane.cells.length - 1 ? 'left-0 right-1/2' : 'left-0 right-0'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`relative z-10 h-2.5 w-2.5 rounded-full ${
                    k === lane.cells.length - 1 ? 'bg-sky-400' : 'bg-slate-600'
                  }`}
                />
                <span
                  className={`mt-3 text-center text-sm leading-snug ${
                    k === lane.cells.length - 1 ? 'text-slate-100' : 'text-slate-300'
                  }`}
                >
                  {cell}
                </span>
              </div>
            ))}
          </AnimatedBlock>
        ))}

        {/*
          收尾不用 Callout 的框：三條泳道已經把高度吃滿，再加一圈 padding 與邊框
          會把它跟出處一起推到摺線下面。這一句是這一頁的結論，要看得到。
        */}
        <AnimatedBlock stepIndex={5} as="div" className="mt-1 text-center">
          <p className="text-base leading-relaxed text-slate-300">
            不同公司、不同產品，
            <strong className="text-slate-100">走到的工作模式越來越像</strong>。
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            這張圖排的是每一家走過的階段，不是發布的先後；同一個階段三家的完整度也不一樣。
          </p>
        </AnimatedBlock>

        <SourceFoot links={[SRC.claudeNotes, SRC.openaiLearn, SRC.geminiNotes]} />
      </div>
    </SlideLayout>
  );
}
