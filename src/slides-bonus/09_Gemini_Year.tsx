import { Stars, Cpu, Image, Bot } from 'lucide-react';
import { SlideLayout } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { SourceFoot, SRC } from './_Source';
import { YearGroups, type YearGroup } from './_YearGroups';

/**
 * Gemini 這一年。三組：模型、圖像與影音、介面與代理。
 *
 * 這一頁的來源是三家裡最紮實的：gemini.google/release-notes 與
 * ai.google.dev/gemini-api/docs/changelog 兩份都是官方的，而且都抓得到，
 * 所以日期以它們為準，沒有二手來源。
 *
 * 最後查證：2026-10-19。對照：
 *   ai.google.dev/gemini-api/docs/changelog
 *     2025-11-18 Gemini 3 Pro Preview、2025-11-20 Gemini 3 Pro Image（Nano Banana Pro）、
 *     2025-12-17 Gemini 3 Flash、2026-02-19 Gemini 3.1 Pro、2026-02-26 Nano Banana 2、
 *     2026-05-19 Gemini 3.5 Flash 與 Managed Agents 與 Antigravity Agent 預覽、
 *     2026-06-24 Computer Use 工具公開預覽、2026-07-21 Gemini 3.6 Flash、
 *     2026-08-27 Omni Flash、2026-09-02 Gemini 3.8 Flash、2026-09-03 Lyria 3.5、
 *     2026-10-06 Nano Banana 2.1 GA、2026-10-13 Gemini 4 Argon
 *     **Argon 的方案門檻 2026-10-20 補查**：blog.google 的
 *     「Gemini 4 Argon is now available in the Gemini app」寫 Google AI Pro 與 Ultra
 *     訂閱者都能用，同一天（2026-10-13）開發者也能用，模型 ID 是 `gemini-4-argon`
 *     （ai.google.dev/gemini-api/docs/models/gemini-4-argon）。
 *     **名字是 Argon 不是 Argus**，官方全站都寫 Argon，口白不要念錯。
 *   gemini.google/release-notes
 *     2026.06.30 Spark、2026.09.10 Windows 桌面版（Alt + Space）、
 *     2026.09.30 Skills 取代 Gems 並自動搬移、
 *     2026.10.13 Gemini 4 Argon、Antigravity 併進 macOS 應用、自訂可連 40 個以上的服務
 *   Gemini 3 與 Antigravity 同日上線（2025-11-18）取自 techcrunch 與 infoq 的發表報導，
 *   官方 changelog 那天只記了模型。
 *
 * **2026-10-20 三件事改過：欄序、節點數、底下那個框。**
 *   欄序換成「模型 → 入口與代理 → 圖像影音」，跟 Claude、ChatGPT 那兩頁對齊
 *   （三頁都是第一欄模型、第二欄入口，第三欄才放各家自己的特色），
 *   讀者橫著比三頁的時候才不會每一頁都要重新找欄位。
 *   一欄最多五個節點：模型欄砍掉 3.5 Flash（純版號），入口欄砍掉 Computer Use
 *   （那是用 API 叫的工具，不是學員打開就看得到的東西）。完整清單在附錄。
 *   原本底下那個「Gems 與 Skills 的關係」框併進入口欄的結論句，理由跟 `04_Claude_Year`
 *   同一條：一頁只留一個 sky 框，留給最上面那句整頁結論。
 *
 * **Flash 到底換了幾版，畫面上刻意不報數字。** `_timeline.ts` 的 Q3 headline 寫「換六版」
 * （把 Omni Flash 算進去），這一頁原本的欄底結論寫「四版」，兩個對不上。
 * 逐條數 changelog 是 3 Flash、3.5、3.6、3.7、3.8 五版，加 Omni Flash 六版，
 * 看怎麼算。數字沒把握就不要報（D-6e），寫「改版最勤的就是它」一樣說得清楚。
 *
 *   **Spark 那一條 2026-10-19 改過一次，不要改回去。** release notes 的摘要是
 *   「personal AI agent on macOS for task automation」，照它寫會寫成「macOS 上的助手」，
 *   但官方那篇 blog.google/intl/zh-tw/products/devices-services/gemini-spark-ai
 *   寫得很明白：它是「個人 AI 代理」而不是被動助理，跑在 Google 的雲端，
 *   筆電闔上、手機鎖了都還在做，原生接 Gmail 與 Google 文件，由 Gemini 3.6 Flash 驅動，
 *   2026 年 7 月在台灣開放給 Google AI Pro 訂閱者。兩件事都不是 macOS 專屬。
 *   **2026-10-20 補完開放時程**：2026-07-14 擴到所有支援 Gemini 應用的地區
 *   （排除歐洲經濟區、奈及利亞、瑞士、英國），當時仍限 Google AI Ultra；
 *   2026-07-29 台灣開放給 Google AI Pro，分批推出，Pro 與 Ultra 都能用。
 *   方案寫在 `10_Gemini_UI` 的結論框裡，這一頁的時間軸只記上線日。
 */
const GROUPS: YearGroup[] = [
  {
    icon: Cpu,
    title: '模型：量大用 Flash，難題用 Argon',
    rows: [
      ['2025-11-18', 'Gemini 3'],
      ['2025-12-17', 'Gemini 3 Flash（量大、要快的那一層）'],
      ['2026-02-19', 'Gemini 3.1 Pro'],
      ['2026-09-02', 'Gemini 3.8 Flash'],
      ['2026-10-13', 'Gemini 4 Argon（官方說它是給複雜任務用的那一層）'],
    ],
    note: '挑的方式是看你要快還是要難：量大、要快走 Flash，複雜的任務才上 Argon（要 Google AI Pro 或 Ultra）。改版最勤的是 Flash。',
  },
  {
    icon: Bot,
    title: '入口與代理：桌面應用與 Skills',
    rows: [
      ['2025-11-18', 'Antigravity（Google 自己的程式開發工具）上線'],
      ['2026-06-30', 'Spark（個人 AI 代理）：接上 Gmail 與文件，你電腦關著它也在做'],
      ['2026-09-10', '桌面版補上 Windows，按 Alt + Space 從任何畫面叫出來'],
      ['2026-09-30', 'Skills（把做法存成檔案重複用）取代 Gems，舊的自動搬過去'],
      ['2026-10-13', 'Mac 的 Gemini 應用頂端多一個 Antigravity 按鈕，點了在對話裡寫程式（限英文）'],
    ],
    note: 'Gemini 不再只待在瀏覽器裡：桌面有應用程式，雲端有替你辦事的代理。Skills 用的是 SKILL.md，跟另外兩家同一種檔案格式，寫過的那一份搬過去也讀得到。',
  },
  {
    icon: Image,
    title: '圖像影音：從做圖到影片與音樂',
    rows: [
      ['2025-11-20', 'Nano Banana Pro（做圖與改圖）'],
      ['2026-02-26', 'Nano Banana 2'],
      ['2026-08-27', 'Omni Flash，可以把影片接長與補中間的畫面'],
      ['2026-09-03', 'Lyria 3.5，產出整首歌'],
      ['2026-10-06', 'Nano Banana 2.1，圖裡的文字更清楚，同一個角色前後也更一致'],
    ],
    note: '做圖、改圖、把影片接長、產出一整首歌，這一塊從圖片一路延伸到影音。',
  },
];

export default function SlideBonusGeminiYear() {
  return (
    <SlideLayout title="Gemini 2026 年的變化" subtitle="Gemini 2025-10 → 2026-10" icon={Stars}>
      <div className="min-h-full max-w-6xl mx-auto flex flex-col gap-3">
        <Callout tone="focus" stepIndex={1}>
          Gemini 這一年補上桌面應用、
          <strong className="text-slate-100">把 Gems 換成 Skills，雲端多了一個替你辦事的代理 Spark</strong>。
          模型一路改版，最新的 Gemini 4 Argon 2026-10-13 才上線。
        </Callout>

        <YearGroups groups={GROUPS} />

        <SourceFoot checked="2026-10-20" links={[SRC.geminiNotes, SRC.geminiSkills, SRC.geminiApi, SRC.geminiSpark]} />
      </div>
    </SlideLayout>
  );
}
