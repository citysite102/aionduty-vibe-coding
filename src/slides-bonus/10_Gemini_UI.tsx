import { AppWindow, Keyboard, PackageOpen, Code2, Plug } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { BrandLogo } from '../components/BrandLogos';
import { LiveDemo } from '../components/LiveDemo';
import { SourceFoot, SRC } from './_Source';

/**
 * 介面圖③：Gemini 桌面應用，Antigravity 併進來之後。
 *
 * 配色取 Gemini 深色模式的灰階（#1e1f20 主區、#282a2c 側邊欄、#333537 膠囊、
 * #e3e3e3 文字），走 inline hex，理由同另外兩張介面圖。
 *
 * **2026-10-20 照講師的實機重畫過側邊欄，不要改回原本那一版。** 原本側邊欄畫的是
 * 「Skills ＋ 底下兩個 Skill 名字 ＋ Antigravity ＋ 最近」，那是照官方更新頁的描述推的，
 * 實機（繁體中文介面）上根本不長那樣：由上到下是新對話、媒體庫、圖像、已排定、自訂、影片，
 * 再來是「筆記本」與「對話」兩個分組。**Skills 沒有自己的一欄，它在「自訂」裡面。**
 *
 * **Antigravity 也不在側邊欄，而且中文介面上看不到。** 官方 2026.10.13 的原文是
 * 「在 Mac 上點選 Gemini 應用程式頂端的『Antigravity』」，同一條還寫
 * 「這項功能支援英文，並在所有支援 Antigravity 的地區推出，適用於個人 Google 帳戶
 * 和符合資格的公司帳戶，使用者須年滿 18 歲」。所以圖上不畫它，由卡片說明去哪裡找、
 * 以及為什麼自己的畫面上沒有。**這就是 C-3 說的「介面上有幾個選項以實機為準」。**
 *
 * 側邊欄的「筆記本」在實機上有，但官方更新頁查不到對應條目（2026-10-20 查），
 * 所以圖上畫出來、不給日期也不解釋它做什麼，查到再補。
 *
 * **底下那個框 2026-10-20 換掉了內容。** 原本寫的是「Argon 給複雜任務、日常走 Flash」，
 * 但那跟 `09_Gemini_Year` 模型欄的結論句是同一句話（B-5：同一批內容只開一頁），
 * 而這一頁缺的是另一件事：**學員不知道什麼時候該從一般對話切到別的功能**。
 * ChatGPT 那一頁（08）用「Chat 回答你，Work 交件」解掉同一個問題，這裡對齊它。
 * 出處（2026-10-20）：
 *   Deep Research  gemini.google/tw/overview/deep-research：拆解問題、跨來源找答案，
 *                  彙整成完整結果
 *   Canvas         gemini.google/tw/overview/canvas：互動創意空間，把文字描述變成實際創作，
 *                  官方舉的例是互動式資訊圖表、測驗、Podcast 風格的語音摘要
 *   Spark          support.google.com/gemini/answer/17094507：在 Gemini 應用裡自動執行
 *                  複雜工作流程、管理排程
 *   **Spark 的開放範圍 2026-10-20 查清楚了**，原本以為兩份資料打架，其實是三個時間點：
 *     最早是受信任的測試者與美國 18 歲以上的 Google AI Ultra 訂閱者；
 *     2026-07-14 擴到所有支援 Gemini 應用的地區（歐洲經濟區、奈及利亞、瑞士、英國除外），
 *     仍限 Ultra，支援所有語言；2026-07-29 台灣開放給 Google AI Pro 訂閱者，分批推出，
 *     Pro 與 Ultra 都能用，介面可以是繁中或英文
 *     （blog.google/intl/zh-tw/products/devices-services/gemini-spark-ai）。
 *     **所以畫面上現在報方案（Pro 或 Ultra）但不報地區**：地區清單會變，而且排除的那四個
 *     跟這門課的學員沒有關係。
 *
 * 這張圖依官方更新頁的描述與實機畫的，不是截圖，下緣寫明示意。
 * 出處 gemini.google/release-notes：
 *   2026.09.10  Windows 桌面版，Alt + Space 叫出來，列出的用途是摘要文件、生成圖片、深入研究
 *   2026.09.30  Skills 取代 Gems，可以同時疊好幾個
 *   2026.10.13  Gemini 4 Argon；Antigravity 併進 macOS 應用，用途是寫程式、做原型與產出內容；
 *               自訂可以接 40 個以上的應用或服務
 * 模型選單寫 Gemini 4 Argon：ai.google.dev/gemini-api/docs/changelog（2026-10-13）
 *
 * 側邊欄的中文標籤照 Gemini 繁中介面的用語寫（新對話、最近），
 * 這一類是 D-4 的例外，照抄不翻譯。Skills 底下那兩個名字是編的，圖的下緣有寫。
 */
const NOTES = [
  {
    icon: Keyboard,
    title: '按 Alt + Space 叫出來',
    body: '2026-09-10 起有 Windows 桌面版，不用先開瀏覽器。macOS 的 Gemini 應用更早就有。',
  },
  {
    icon: PackageOpen,
    title: 'Skills 在側邊欄的「自訂」裡',
    body: '2026-09-30 起 Gems 換成 Skills，一次可以疊好幾個，原本做好的 Gems 會自動搬過去。繁體中文介面上這一欄寫的是「自訂」，不是 Skills，所以要從那裡進去。',
  },
  {
    icon: Code2,
    title: 'Antigravity 在頂端，中文介面看不到',
    body: '2026-10-13 起，Mac 的 Gemini 應用頂端多一個 Antigravity，點下去就在對話裡寫程式、做網頁原型。官方寫明它只支援英文，而且限支援的地區與 18 歲以上的合格帳號，所以中文介面上沒有這一項。它也有獨立版：桌面應用、IDE、CLI 與編輯器外掛。',
  },
  {
    icon: Plug,
    title: '接得上 40 個以上的應用或服務',
    body: '把信件、日曆、雲端硬碟這一類接上去之後，Gemini 問得到你的資料，不必每次貼一遍。',
  },
];

export default function SlideBonusGeminiUI() {
  return (
    <SlideLayout title="Gemini 桌面版：Skills 與 Antigravity" subtitle="Gemini Desktop" icon={AppWindow}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-1 items-stretch">

        {/* 左欄：標註 */}
        <div className="lg:col-span-5 flex flex-col space-y-3 text-left">
          <LiveDemo kind="desktop" note="按 Alt + Space 叫出來，掛一個 Skill 上去" />
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
            要一段答案就直接問；
            <strong className="text-slate-100">要一份做完的東西，從輸入框底下那一排挑</strong>：
            完整的研究報告走 Deep Research，要它直接做出文件、程式或互動頁面走 Canvas。
            Spark 是替你跑整個流程的代理，Google AI Pro 或 Ultra 訂閱者才有。
          </Callout>
        </div>

        {/* 右欄：桌面應用畫面示意 */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimatedBlock
            stepIndex={1}
            className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-full min-h-[460px] text-left"
          >
            <div className="flex-1 flex bg-[#1e1f20]">

              {/* 側邊欄 */}
              <div className="w-[32%] shrink-0 bg-[#282a2c] px-3 py-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span style={{ color: '#8E75B2' }}>
                    <BrandLogo brand="gemini" size={15} />
                  </span>
                  <span className="text-[#e3e3e3] text-sm font-bold">Gemini</span>
                  <span className="ml-auto shrink-0 whitespace-nowrap font-mono text-xs text-slate-500">Alt+Space</span>
                </div>

                <div className="rounded-full bg-[#333537] px-3 py-1.5 text-xs text-[#e3e3e3]">
                  + 新對話
                </div>

                {/* 由上到下照實機的繁中介面，Skills 在「自訂」裡面，側邊欄沒有 Antigravity */}
                <div className="flex flex-col gap-1 text-xs">
                  {['媒體庫', '圖像', '已排定'].map((item) => (
                    <span key={item} className="rounded-md px-2.5 py-1.5 text-slate-400">
                      {item}
                    </span>
                  ))}
                  <span className="rounded-md bg-[#333537] px-2.5 py-1.5 text-[#e3e3e3]">自訂</span>
                  <span className="pl-4 pt-0.5 text-slate-500">會議紀錄整理</span>
                  <span className="pl-4 text-slate-500">客訴回覆草稿</span>
                  <span className="rounded-md px-2.5 py-1.5 mt-1 text-slate-400">影片</span>
                </div>

                <div className="mt-auto flex flex-col gap-1 text-xs">
                  <span className="px-1 text-slate-600">筆記本</span>
                  <span className="rounded-md px-2.5 py-1.5 text-slate-400">+ 新增筆記本</span>
                  <span className="px-1 pt-1 text-slate-600">對話</span>
                  <span className="truncate px-2.5 text-slate-500">住宅火災警報器宣導插畫</span>
                </div>
              </div>

              {/* 主區 */}
              <div className="flex-1 flex flex-col px-5 py-4 min-w-0">
                <div className="flex items-center justify-between mb-5 shrink-0 text-xs">
                  <span className="text-slate-500">今天</span>
                  <span className="flex items-center gap-1 rounded-full bg-[#333537] px-2.5 py-1 text-[#e3e3e3]">
                    Gemini 4 Argon <span className="text-slate-500">&#9662;</span>
                  </span>
                </div>

                <div className="text-2xl font-bold text-[#e3e3e3] mb-1">晚安，Samuel</div>
                <div className="text-sm text-slate-500">今天想做什麼？</div>

                <div className="flex-1 min-h-[1.5rem]" />

                <div className="shrink-0">
                  <div className="rounded-3xl bg-[#333537] px-4 py-2.5 flex items-center justify-between gap-3">
                    <span className="text-slate-400 text-sm truncate">問 Gemini</span>
                    <span className="text-slate-500 text-sm shrink-0">&#9650;</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2 text-xs">
                    {['Deep Research', 'Canvas', '圖片'].map((c) => (
                      <span key={c} className="rounded-full border border-[#444746] px-2.5 py-1 text-slate-400">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#282a2c] border-t border-slate-800 px-4 py-2 text-xs text-slate-600 flex justify-between gap-3">
              <span className="truncate">側邊欄照 2026-10 的繁中實機畫，示意用，兩個 Skill 名稱是編的</span>
              <span className="shrink-0">
                <a
                  href="https://gemini.google/release-notes/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  gemini.google
                </a>
              </span>
            </div>
          </AnimatedBlock>
        </div>

        <div className="lg:col-span-12">
          <SourceFoot checked="2026-10-20" links={[SRC.geminiNotes, SRC.antigravity, SRC.geminiApi]} />
        </div>
      </div>
    </SlideLayout>
  );
}
