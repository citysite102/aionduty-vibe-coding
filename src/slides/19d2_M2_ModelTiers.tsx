import { Gauge, Zap, Hammer, Brain } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/*
 * 2026-10-14 新增，2026-10-15 依官方價目表與 model-config 重查一次。
 * 接在 19d（Harness 對成本的影響）後面：前一頁講「讀得多、改得多就花得多」，
 * 這一頁講同一筆錢裡最直接的那個調整，也就是這一輪交給哪個層級的模型。
 *
 * 為什麼要有這一頁：`11e_M1_ClaudeMenuTabs` 的指令表早就寫著「/model：換模型，
 * 控制花費最直接的手段」，但全片沒有任何一頁說過該換成哪一個。那句承諾一直沒有兌現。
 *
 * 最後查證：2026-10-15，對照 platform.claude.com/docs/en/about-claude/models/overview
 * 與 code.claude.com/docs/en/model-config。當時的現況：
 *   - 線上四個：Fable 5.1（$10／$50）、Opus 5.5（$4／$20）、Sonnet 5.5（$2／$10）、
 *     Haiku 5.5（自 $0.10／$0.50），單位都是每百萬 token。19d 畫面上那句
 *     「Claude 的輸出是輸入的五倍」四個模型都仍然成立。
 *   - `/model` 的選項是 haiku／sonnet／opus／fable／best／opusplan。
 *   - **Pro、Max、Team 的預設模型是 Opus 5.5**（Claude Code v2.1.280 以前 Pro 預設是 Sonnet 5）。
 *     學員打開就站在最貴的那一層，所以這一頁多數時候是教他往下換，不是往上換。
 *     開場那句與逐字稿都照這個寫（講「預設是最貴的那一層、多數工作用不到」，
 *     不要寫成「這一頁多半是往下換」那種在講投影片自己的句子，D-2 的後設導覽句），
 *     要改之前先重查 model-config 的 Default model 一節。
 *   - `fable` 與 `best` 在 Pro 是扣 usage credits，不算方案額度，所以只放進但書的小字，
 *     不另外開一張卡：那一層不是日常要挑的東西。
 *
 * **畫面上刻意不印每百萬 token 的單價。** 單價會過期（2026-09-22 到 10-15 之間整條線換了一代），
 * 而層級之間的關係比數字穩。這一頁 2026-10-14 剛建好時就踩過：檔頭照印象寫成
 * 「Haiku 4.5、Sonnet 5、Opus 5」，那已經是上一代。要印數字就回官方定價頁重查，
 * 不要從任何二手文件抄（當時手上另一份文件寫 Opus 是 $4／$20，19d 在 09-22 記的是 $5／$25，
 * 兩份都不是憑印象能分辨的）。
 *
 * 但書那一塊是這一頁的重點，不要為了版面把它砍掉：
 * 課前準備推的是 Claude Pro 月費方案，而月費不是按量付費，
 * 省 token 對他省到的是用量上限而不是帳單。少了這一句，整頁的省錢邏輯對半數學員是錯的。
 */
const TIERS = [
  {
    icon: Zap,
    name: 'Haiku',
    tagline: '最便宜、最快',
    fit: ['把一堆紀錄整理成表格', '檔名、欄位名稱大批改掉', '照現成的模板填內容'],
    unfit: '要回答「為什麼會這樣」的事',
  },
  {
    icon: Hammer,
    name: 'Sonnet',
    tagline: '日常開發，先從這一層開始',
    fit: ['範圍講清楚的功能', '照專案裡已經有的寫法再做一個', '補上漏掉的檢查'],
    unfit: '查不出原因的錯誤、要跨好幾個檔案一起想的設計',
  },
  {
    icon: Brain,
    name: 'Opus',
    tagline: '最貴，留給難的那幾次',
    fit: ['資料怎麼存、功能怎麼拆', '卡了兩輪還查不出原因的錯誤', '出錯代價高的：權限、金鑰、收費'],
    unfit: '機械性的整理（錢多花了，結果一樣）',
  },
];

export default function SlideModelTiers() {
  return (
    <SlideLayout title="模型三層：Haiku、Sonnet、Opus 怎麼挑" subtitle="Model Tiers: What to Run on Which" icon={Gauge} updated={{ date: '2026/11/01', kind: '新增' }}>
      <div className="max-w-6xl mx-auto w-full min-h-full flex flex-col pt-2 pb-4">
        <p className="text-slate-300 text-base leading-relaxed mb-4">
          打開的預設是 Opus，也就是最貴的那一層，而多數工作用不到這麼貴。要換就在桌面版的輸入框旁邊，
          或在 Claude Code 打 <code className="font-mono text-orange-300">/model</code>。
          <strong className="text-slate-100">機械性的整理交給便宜的，要判斷為什麼的事才留給貴的</strong>。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch mb-4">
          {TIERS.map((tier, i) => (
            <AnimatedBlock
              key={tier.name}
              stepIndex={i + 1}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col"
            >
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-3 mb-1">
                <span className="w-9 h-9 shrink-0 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <tier.icon size={18} aria-hidden="true" />
                </span>
                {tier.name}
              </h3>
              <p className="text-sky-400/80 text-sm font-medium mb-4 pl-12">{tier.tagline}</p>

              <ul className="space-y-1.5 mb-4">
                {tier.fit.map((item) => (
                  <li key={item} className="text-slate-300 text-base leading-relaxed flex gap-2">
                    <span className="text-slate-600 shrink-0">・</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4 border-t border-slate-800 text-sm leading-relaxed text-slate-500">
                <span className="text-slate-400 font-medium">不要用在：</span>
                {tier.unfit}
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <Callout
          tone="warn"
          label="兩件最容易誤會的事"
          stepIndex={4}
          footnote={
            <>
              Opus 上面還有一層 <code className="font-mono text-slate-300">fable</code>，
              在 Pro 是另外扣 usage credits、不算在月費額度裡，日常開發不會用到。
            </>
          }
        >
          <p className="mb-2">
            <strong className="text-slate-200">月費方案不是按量付費。</strong>
            Claude Pro 固定月費，換便宜的層級省到的是用量上限，帳單不會變小；
            到 Console 儲值、按量付費的人，省的才是真的錢。
          </p>
          <p>
            <strong className="text-slate-200">用太便宜的層級反而會更貴。</strong>
            它一次寫不對，重做三輪加起來比一開始就用對的那一次多。
          </p>
        </Callout>
      </div>
    </SlideLayout>
  );
}
