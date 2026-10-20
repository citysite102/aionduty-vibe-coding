import { ListOrdered } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { BrandLogo, brandColor } from '../components/BrandLogos';
import { SourceFoot, SRC } from './_Source';
import { QUARTERS, BRANDS, KINDS } from './_timeline';

/**
 * 附錄：這一年的完整更新清單，六十幾條逐條列出。2026-10-19 新增。
 *
 * **它是參考頁，不是講的頁。** 這一疊的第二頁原本就是這個樣子，
 * 但那一頁要在課堂上講，66 條講不完也念不完；拆開之後各自做各自的事：
 * 泳道那一頁講「三家同時在動」，這一頁給回頭查「那一天到底發生什麼」。
 * 所以這一頁刻意**不加結論、不加 Callout**，捲動也沒關係，學員是自己翻的。
 *
 * 資料跟泳道同源（`_timeline.ts`），改條目去那邊改，這裡只負責全部印出來。
 * 類別圖例放在這一頁而不是泳道那一頁，因為八個圖例會佔掉泳道的一整列高度，
 * 而真正需要對照圖例的人是在查清單的人。
 *
 * 口語的名詞解釋（記憶的三個階段、API 額度能用在哪、Cowork 跟 Research 差在哪⋯）
 * 寫在這裡，因為它們長到放不進一行條目，但學員查到那一條時會想知道：
 *
 *   記憶          claude.com/blog/memory：2025-09-11 先給 Team 與 Enterprise，
 *                 2025-10-23 才開到個人方案（先 Max，Pro 兩週內），2026-03-02 開到所有方案含免費。
 *                 跨對話記得你的專案與偏好，每個 Project 有各自獨立的記憶，
 *                 設定裡看得到也改得掉，另有不留記錄的 incognito chat。
 *   API 額度      support.claude.com/articles/17154008：要先把 Console 組織連上方案，
 *                 額度才會每個帳期進來。Max 5x 每月 $100、Max 20x $200、Team 最多 $500（共用池，
 *                 Standard 每席 $20、Premium 每席 $100）。**只能用在 API、Managed Agents、
 *                 Agent SDK 與 Playground，不能折 Claude Code，也不能折 app 的超量使用**，
 *                 當期沒用完不累積。
 *   M365 系列     Excel 2025-11-24 開 beta 只是開頭。claude.com/blog（2026-05-07）：
 *                 Excel、PowerPoint、Word 轉正式，Outlook 公開 beta，全部付費方案都能用，
 *                 四個 app 之間的脈絡會互通。
 *   Cowork vs Research  Research 是對話裡的功能（輸入 /deep-research 或按 +），
 *                 多步查資料後產出報告；Cowork 是把事情委派出去，它在你的檔案與工具上動手，
 *                 用的是跟 Claude Code 同一套 agentic 架構。
 *   dots          learn.chatgpt.com/docs/dots：由 GPT-6 Astra 驅動，住在雲端、有自己的電腦與瀏覽器，
 *                 電腦關機也會繼續做，在 ChatGPT、Slack、Teams 與通話裡都是同一個 dot、同一份記憶。
 *                 方案：Pro 100／200／500（18 歲以上，不含 EEA、英國、瑞士）、
 *                 Business Premium 與 Enterprise（Enterprise 預設關閉）。
 *   Antigravity   2.0（2026-05-19）是「啟動、監看、協調多個 agent」的桌面應用，
 *                 可以並行跑好幾個 agent、自訂 subagent 流程、排程任務，另外多了 CLI 與 Python SDK；
 *                 原本那個編輯器改名成 Antigravity IDE，仍然單獨發行。
 *                 **2026-10-13 內建進 Gemini 應用不等於被收掉**，見 antigravity.google/download。
 */
export default function SlideBonusAppendix() {
  return (
    <SlideLayout title="完整更新清單（附錄）" subtitle="Appendix" icon={ListOrdered}>
      <div className="min-h-full max-w-6xl mx-auto flex flex-col gap-3">

        {/* 類別圖例。泳道那一頁用的是同一組記號 */}
        <AnimatedBlock
          stepIndex={1}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500"
        >
          <span className="text-slate-400">圖形記號：</span>
          {Object.entries(KINDS).map(([key, k]) => (
            <span key={key} className="flex items-center gap-1">
              <k.icon size={12} aria-hidden="true" />
              {k.label}
            </span>
          ))}
        </AnimatedBlock>

        <div className="grid grid-cols-3 gap-2 sticky top-0 z-10 bg-[#020617] pb-2">
          {BRANDS.map((b) => (
            <div key={b.key} className="flex items-center gap-2">
              <span style={{ color: brandColor(b.brand) }}>
                <BrandLogo brand={b.brand} size={15} />
              </span>
              <span className="text-slate-200 text-sm font-bold">{b.name}</span>
            </div>
          ))}
        </div>

        {QUARTERS.map((q) => (
          <div key={q.quarter} className="flex flex-col gap-1">
            <div className="font-mono text-xs tracking-widest text-slate-500">
              {q.quarter}
              <span className="ml-2 font-sans tracking-normal text-slate-600">{q.theme}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 items-stretch">
              {BRANDS.map((b) => (
                <ul
                  key={b.key}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-1 text-left"
                >
                  {q[b.key].map((e) => {
                    const Icon = KINDS[e.kind].icon;
                    return (
                      <li key={e.date + e.text} className="flex gap-2 leading-snug">
                        <span className="flex h-5 w-3.5 shrink-0 items-center justify-center">
                          <Icon size={13} className="text-slate-600" aria-label={KINDS[e.kind].label} />
                        </span>
                        <span>
                          <span className="font-mono text-xs text-slate-500 mr-2">{e.date}</span>
                          <span className="text-sm text-slate-300">{e.text}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        ))}

        <SourceFoot
          links={[SRC.claudeNotes, SRC.claudeNews, SRC.openaiLearn, SRC.geminiNotes, SRC.geminiApi]}
          secondhand="ChatGPT 的模型日期與廣告後台時程取自維基百科與新聞報導"
        />
      </div>
    </SlideLayout>
  );
}
