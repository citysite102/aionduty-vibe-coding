import { AppWindow, MessageSquare, SlidersHorizontal, Paperclip, Brain } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { BrandLogo } from '../components/BrandLogos';
import { LiveDemo } from '../components/LiveDemo';
import { SourceFoot, SRC } from './_Source';

/**
 * 介面圖①：Claude 桌面版，Cowork 併進對話之後的樣子。
 * 版面與配色沿用 `src/slides/11b_M1_ClaudeCodeUI.tsx`（主簡報 Slide 32），
 * 兩頁放在一起看才對得起來，所以 hex 照抄不改（A-1 對仿真畫面的規定）。
 *
 * **這張圖是依官方更新說明畫的，不是照截圖描的。** 2026-10-19 查證當天沒有實機可對，
 * 所以圖的下緣寫明「示意」。錄影示範的時候以實機為準，發現版面不一樣就回來改這張圖，
 * 不要只在口白裡補一句（C-3 的「介面上有幾個選項，以實機為準」）。
 *
 * 出處：
 *   support.claude.com/en/articles/12138966-release-notes
 *     2026-09-16  Cowork 併進所有對話、Design 在對話裡、Slides 與 Docs 成為產出物類型
 *     2026-09-17  Customize 改成完整一頁，Skills、Plugins、Connectors 各一頁，Memory 搬進 Settings
 *   claude.com/docs/cowork/changelog
 *     2026-09-15  Unified Claude（beta）
 *     2026-10-13  設定重整、模型選單加上 effort 控制
 *   claude.com/resources/articles/dashboards-and-motion
 *     2026-10-08  Dashboards 與 Motion 進 beta
 *   模型那一格顯示 Opus 5.5：platform.claude.com 的 model overview 與
 *   code.claude.com/docs/en/model-config 的 Default model（2026-10-15，與 Slide 32 同一次查證）
 */
/*
 * **Cowork 的分界（2026-10-20 補，出處 claude.com/docs/cowork/overview）**：
 * 原文「Rather than responding to prompts sequentially, Claude tackles intricate,
 * multi-step tasks autonomously. Describe a desired outcome, then return later to
 * completed work — polished documents, organized files, synthesized research」，
 * 同一頁列的能力包含直接讀寫你電腦上的檔案、配 Claude in Chrome 操作網站、
 * 子代理分工平行跑、產出 Excel（含會動的公式）與 PowerPoint。
 * 入口 2026-09-16 合併之後**不必先選模式**，但「你給的是一個問題還是一個要完成的結果」
 * 這個判斷還在，第一張卡講的就是這件事。ChatGPT 那一頁（08）用同一個分界寫 Chat 與 Work。
 */
const NOTES = [
  {
    icon: MessageSquare,
    title: '問一句話，還是要一份做完的東西',
    body: '2026-09-16 之前要先選「聊天」還是「交辦任務」，現在都打在同一個框裡。差別在你給的是什麼：給一個問題，它回答你；描述一個要完成的結果（把這批檔案整理好、做一份報告），它會自己拆成多步做完再回來，產出可以是 Excel 或 PowerPoint。',
  },
  {
    icon: SlidersHorizontal,
    title: 'Customize：Skills 與外部連接',
    body: '側邊欄的 Customize 是完整一頁，Skills、Plugins、Connectors 各自有自己的清單與搜尋，不再擠在設定裡的表格。',
  },
  {
    icon: Brain,
    title: 'Memory 在 Settings 底下',
    body: 'Claude 記下的東西按主題一條一條列出來，看到不該記的當場刪掉。這一區 2026-08-25 之後跟 Cowork 共用同一份。',
  },
  {
    icon: Paperclip,
    title: '要一份檔案，從輸入框旁邊叫出來',
    body: '這五個在介面上叫 Artifacts。Docs、Slides、Design 現在是正式功能，Dashboards 與 Motion 還掛著 beta，而 beta 的那兩個要看你在哪一個方案。',
  },
];

/** 輸入框底下那一排產出物。beta 的兩個照實標，不要畫成一樣的狀態 */
const ARTIFACTS: [string, string][] = [
  ['Docs', ''],
  ['Slides', ''],
  ['Design', ''],
  ['Dashboards', 'beta'],
  ['Motion', 'beta'],
];

export default function SlideBonusClaudeUI() {
  return (
    <SlideLayout title="Claude 桌面版：Cowork 併進對話之後" subtitle="Claude Desktop" icon={AppWindow}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-1 items-stretch">

        {/* 左欄：標註 */}
        <div className="lg:col-span-5 flex flex-col space-y-3 text-left">
          <LiveDemo kind="desktop" note="同一個輸入框交辦任務，不先選模式" />
          {NOTES.map((n, i) => (
            <AnimatedBlock
              key={n.title}
              stepIndex={i + 1}
              className="flex gap-3 items-start bg-slate-900 p-4 rounded-xl border border-slate-800"
            >
              <div className="p-1.5 bg-slate-800 text-slate-400 rounded shrink-0">
                <n.icon size={14} />
              </div>
              <div className="min-w-0">
                <h4 className="text-base font-bold text-slate-100">{n.title}</h4>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">{n.body}</p>
              </div>
            </AnimatedBlock>
          ))}

          <Callout tone="focus" stepIndex={5}>
            版面變了，<strong className="text-slate-100">開工前要確認的東西沒變</strong>：
            左下角那個資料夾是 Claude 這一輪讀寫的範圍，右邊那一格是這一輪用的是哪一層的模型。
          </Callout>
        </div>

        {/* 右欄：桌面版對話畫面。底色照抄真實畫面，走 inline hex 不進 Tailwind 色階 */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimatedBlock
            stepIndex={1}
            className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-full min-h-[460px] text-left"
          >
            <div className="flex-1 flex bg-[#1a1a19]">

              {/* 側邊欄 */}
              <div className="w-[34%] shrink-0 bg-[#131312] px-3 py-4 flex flex-col gap-3 border-r border-[#2c2c2b]">
                <div className="flex items-center gap-2 text-[#d97757]">
                  <BrandLogo brand="claude" size={16} />
                  <span className="text-slate-200 text-sm font-bold">Claude</span>
                  <span className="ml-auto font-mono text-xs text-slate-500">&lt;/&gt;</span>
                </div>

                <div className="rounded-lg bg-[#2c2c2b] px-2.5 py-1.5 text-xs text-slate-200">
                  + New chat
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  {['Chats', 'Projects'].map((s) => (
                    <span key={s} className="rounded-md px-2.5 py-1.5 text-slate-400">
                      {s}
                    </span>
                  ))}
                  <span className="rounded-md bg-[#232322] px-2.5 py-1.5 text-slate-100">Customize</span>
                  <span className="pl-4 pt-1 text-slate-600">Skills · Plugins · Connectors</span>
                </div>

                <div className="mt-auto flex flex-col gap-1 text-xs">
                  <span className="rounded-md px-2.5 py-1.5 text-slate-400">Settings</span>
                  <span className="pl-4 text-slate-600">Memory › Topics</span>
                </div>
              </div>

              {/* 主區 */}
              <div className="flex-1 flex flex-col px-5 py-4 min-w-0">
                <div className="flex items-start justify-between mb-4 shrink-0">
                  <span className="text-slate-100 text-lg font-bold">What&apos;s up next, Samuel?</span>
                  <span className="text-slate-500 text-xs mt-1.5 shrink-0">What&apos;s new</span>
                </div>

                <div className="flex-1 min-h-[1.5rem]" />

                <div className="shrink-0">
                  <div className="rounded-xl bg-[#232322] border border-[#3a3a38] px-3 py-2.5 flex items-center justify-between gap-3">
                    <span className="text-slate-500 text-sm truncate">
                      Describe a task or ask a question
                    </span>
                    <span className="text-slate-600 text-sm shrink-0">&crarr;</span>
                  </div>

                  {/* 產出物選單。這一排就是左邊第四條標註在講的東西 */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-slate-600 text-xs mr-0.5">&#128206;</span>
                    {ARTIFACTS.map(([name, tag]) => (
                      <span
                        key={name}
                        className="rounded-lg bg-[#232322] px-2 py-1 text-xs text-slate-300 flex items-center gap-1"
                      >
                        {name}
                        {tag && <span className="text-slate-600">{tag}</span>}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-2">
                      <span className="rounded-lg bg-[#232322] px-2 py-1 text-slate-300">Local</span>
                      <span className="rounded-lg bg-[#232322] px-2 py-1 text-slate-300">mission-timer</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-slate-300">Opus 5.5</span>
                      <span className="text-slate-300">High</span>
                      <span className="inline-block h-2.5 w-2.5 rounded-full border border-slate-600" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#131312] border-t border-slate-800 px-4 py-2 text-xs text-slate-600 flex justify-between gap-3">
              <span className="truncate">依 2026-10 的官方更新說明繪製，示意用，實機以你的版本為準</span>
              <span className="shrink-0">
                <a
                  href="https://support.claude.com/en/articles/12138966-release-notes"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  support.claude.com
                </a>
              </span>
            </div>
          </AnimatedBlock>
        </div>

        <div className="lg:col-span-12">
          <SourceFoot links={[SRC.claudeNotes, SRC.cowork, SRC.claudeDash]} />
        </div>
      </div>
    </SlideLayout>
  );
}
