import { AppWindow, LayoutGrid, Globe, MousePointerClick } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { BrandLogo } from '../components/BrandLogos';
import { LiveDemo } from '../components/LiveDemo';
import { SourceFoot, SRC } from './_Source';

/**
 * 介面圖②：ChatGPT 桌面版，Chat、Work、Codex 併成一個殼之後。
 *
 * 配色取 ChatGPT 深色模式的灰階（#171717 側邊欄、#212121 主區、#303030 輸入框、
 * #ececec 文字），走 inline hex，理由同 `05_Claude_UI.tsx`：學員要拿它對照自己的螢幕。
 *
 * **這張圖是依報導與維基百科的描述畫的，而且比另外兩張更不確定。**
 * 2026-10-19 查證時 openai.com 與 help.openai.com 都擋自動抓取，拿不到官方的畫面說明，
 * 所以圖的下緣寫明示意。錄影示範的時候以實機為準，發現不一樣就回來改這張圖。
 *
 * 出處（2026-10-19 覆核過，三個入口那一條已經從二手升為官方）：
 *   三個入口（Chat、Work、Codex）、2026-07-09 併進同一個 App、全方案
 *     learn.chatgpt.com/docs/whats-new，2026-07-06 那一週，原文
 *     「Codex keeps its dedicated coding experience alongside ChatGPT's Chat and Work」
 *   **Chat 與 Work 的分界（2026-10-20 補）**
 *     learn.chatgpt.com/docs/use-chatgpt 直接讀得到，原文是
 *     Chat「a question or back-and-forth」（ask a question, search the web, brainstorm,
 *     draft a message, compare options）、Work「carry a larger task through to a reviewable
 *     result」（create a deck, analyze files, draft a report, build a project plan）、
 *     Codex「developer tools and see technical details」（debug, run tests, review a PR）。
 *     切換的說法是「when you want a finished, reviewable result, switch to Work and
 *     describe what it should include」。
 *     help.openai.com/en/articles/20001275-chatgpt-work-and-codex **直接開是 403**，
 *     「stay with a project for hours」「關掉桌面版還會繼續」「Scheduled Tasks 可以只跑一次、
 *     按排程或被事件觸發、或持續監看變化」這幾句是從搜尋結果讀到的官方內文（C-4 第 2 點）。
 *     同一批來源還提到**舊的 ChatGPT agent（Agent Mode）已經下架，官方要人改用 Work**，
 *     這件事沒寫進畫面：這一疊講的是現況，不是遷移史。
 *   Atlas 2026-08-09 關站、能力移進 ChatGPT 與 Codex
 *     en.wikipedia.org/wiki/ChatGPT_Atlas
 *   Intelligent UI
 *     help.openai.com/en/articles/20001598-intelligent-ui-in-chatgpt（官方 help center 條目）。
 *     **2026-10-19 補查到的，原本只有 openai.com 那一頁的標題可以佐證這個名字存在。**
 *     官方的說法是它讓 ChatGPT「以完整可互動的介面回答」，GPT-6 受過訓練會用文字、
 *     視覺與互動元件組成回答，並依問題決定怎麼搭；回答裡可能出現圖形、可點的按鈕、
 *     表單、圖表，也可以請它當場做一個工具（官方舉例：試算存款的計算機、分攤帳單、小遊戲）。
 *     注意：**這一頁我直接開是 403，上面那段是從搜尋結果讀到的官方內文**，
 *     要寫進對外文件之前人工開一次確認。learn.chatgpt.com 整份沒有提到 Intelligent UI。
 *
 *     旁證（不是官方，也沒有進畫面）：CopilotKit 2026-10-09 開源了一個叫
 *     Open Intelligent UI 的模板（MIT），把同一個概念做成開發者可以自己接的框架，
 *     aiposthub.com 2026-10-11 有中文介紹。它沒有引用 OpenAI 官方，所以只能當旁證，
 *     證明這個詞在生態系裡被當成通用概念在用。這門課講的是三個主流工具，所以不收進畫面。
 *   免費與 Go 方案的廣告（2026-02-09 起，美國先開）
 *     help.openai.com/en/articles/20001047-ads-in-chatgpt（2026-10-19 補查到的官方條目）。
 *     原文：廣告出現在回答下方、標示為贊助；Free 與 Go 會有，Plus 以上不會；
 *     已開放的地區是美、加、澳、紐、英、墨、巴西、日、韓，**台灣不在清單裡**，
 *     所以這一條在課堂上要講成「你可能還看不到」，不要講成「你會看到」。
 */
const NOTES = [
  {
    icon: LayoutGrid,
    title: 'Chat 回答你，Work 交件',
    body: '要一段答案、要比較選項，用 Chat。要一份簡報、一份報告，或把一批檔案分析完，就切到 Work：它會自己拆成多步做上好幾個小時，關掉桌面版也繼續跑。寫程式走 Codex。三個入口 2026-07-09 併進同一個 App，每個方案都有，含免費。',
  },
  {
    icon: Globe,
    title: 'Atlas 不用再找了',
    body: '那個獨立的瀏覽器 2026-08-09 關站，瀏覽網頁與代替你點網站的能力移進 ChatGPT 與 Codex 裡面。',
  },
  {
    icon: MousePointerClick,
    title: '回答裡會出現可以操作的東西',
    body: '這個功能叫 Intelligent UI。GPT-6 會用文字、圖像與可以操作的元件組成回答，按鈕、表單、圖表都可能出現，也可以叫它當場做一個小工具，例如分攤帳單。',
  },
];

export default function SlideBonusChatGptUI() {
  return (
    <SlideLayout title="ChatGPT 桌面版：Chat、Work 與 Codex" subtitle="ChatGPT Desktop" icon={AppWindow}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-1 items-stretch">

        {/* 左欄：標註 */}
        <div className="lg:col-span-5 flex flex-col space-y-3 text-left">
          <LiveDemo kind="desktop" note="三個入口各接哪一類工作" />
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

          <Callout tone="warn" label="免費與 Go 方案要多看一眼" stepIndex={4}>
            這兩個方案的<strong className="text-slate-100">回答下方會出現標示為贊助的內容</strong>，
            那不是 ChatGPT 的建議。官方列出的開放地區是美、加、英、澳、紐、墨、巴西、日、韓，
            台灣不在裡面，所以你現在可能還看不到。
          </Callout>
        </div>

        {/* 右欄：桌面版畫面示意 */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimatedBlock
            stepIndex={1}
            className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-full min-h-[460px] text-left"
          >
            <div className="flex-1 flex bg-[#212121]">

              {/* 側邊欄 */}
              <div className="w-[30%] shrink-0 bg-[#171717] px-3 py-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#ececec]">
                  <BrandLogo brand="openai" size={14} />
                  <span className="text-sm font-bold">ChatGPT</span>
                </div>
                <div className="rounded-lg bg-[#2f2f2f] px-2.5 py-1.5 text-xs text-[#ececec]">
                  + New chat
                </div>
                <div className="flex flex-col gap-1 text-xs text-slate-400">
                  <span className="px-2.5 py-1.5">Search</span>
                  <span className="px-2.5 py-1.5">Library</span>
                  <span className="px-2.5 py-1.5">Projects</span>
                </div>
                <div className="mt-auto text-xs text-slate-500 px-2.5">Free plan</div>
              </div>

              {/* 主區 */}
              <div className="flex-1 flex flex-col px-5 py-4 min-w-0">

                {/* 三個入口。這一排就是左邊第一條標註在講的東西 */}
                <div className="flex items-center gap-2 text-xs shrink-0">
                  <span className="rounded-lg bg-[#2f2f2f] px-2.5 py-1 text-[#ececec]">Chat</span>
                  <span className="px-2.5 py-1 text-slate-500">Work</span>
                  <span className="px-2.5 py-1 text-slate-500">Codex</span>
                  <span className="ml-auto flex items-center gap-1 text-slate-400">
                    GPT-6 Instant <span className="text-slate-600">&#9662;</span>
                  </span>
                </div>

                {/* 一來一往，第二塊帶著可以點的小元件 */}
                <div className="mt-4 flex flex-col gap-3 text-sm">
                  <div className="self-end rounded-2xl bg-[#2f2f2f] px-3 py-2 text-[#ececec] max-w-[80%]">
                    下週二台北飛東京，幫我比一下
                  </div>

                  <div className="text-slate-300 leading-relaxed">
                    三個航班的時間與價格如下，可以直接在下面切換日期。
                  </div>

                  <div className="rounded-xl border border-[#3a3a3a] bg-[#2a2a2a] p-3">
                    <div className="flex items-center gap-2 mb-2.5 text-xs">
                      {['10/20', '10/21', '10/22'].map((d, i) => (
                        <span
                          key={d}
                          className={`rounded-md px-2 py-1 ${
                            i === 1 ? 'bg-[#4a4a4a] text-[#ececec]' : 'text-slate-500'
                          }`}
                        >
                          {d}
                        </span>
                      ))}
                      <span className="ml-auto text-slate-600">可以點</span>
                    </div>
                    {[
                      ['07:40', 'NT$ 9,200'],
                      ['13:15', 'NT$ 8,450'],
                    ].map(([t, p]) => (
                      <div
                        key={t}
                        className="flex justify-between border-t border-[#3a3a3a] py-1.5 text-xs text-slate-300"
                      >
                        <span className="font-mono">{t}</span>
                        <span className="font-mono">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 min-h-[1rem]" />

                <div className="shrink-0 rounded-3xl bg-[#303030] px-4 py-2.5 flex items-center justify-between gap-3">
                  <span className="text-slate-500 text-sm truncate">Ask anything</span>
                  <span className="text-slate-600 text-sm shrink-0">&#9679;</span>
                </div>
              </div>
            </div>

            <div className="bg-[#171717] border-t border-slate-800 px-4 py-2 text-xs text-slate-600 flex justify-between gap-3">
              <span className="truncate">依官方說明與報導繪製，示意用，班次與價格是編的</span>
              <span className="shrink-0">
                <a
                  href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  help.openai.com
                </a>
              </span>
            </div>
          </AnimatedBlock>
        </div>

        <div className="lg:col-span-12">
          <SourceFoot
            links={[SRC.openaiLearn, SRC.openaiIntelligentUI, SRC.openaiAds]}
            secondhand="Atlas 關站日期取自維基百科"
          />
        </div>
      </div>
    </SlideLayout>
  );
}
