import { Database } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 2026-10-08 新增（講師要求）：前面那幾頁都假設專案只有幾個檔案。學員回去接手已經在跑的
 * 專案之後第一個撞到的是「它每次都要重讀一遍」，這一頁補那一段。
 *
 * ── 2026-11-08 整頁重寫（講師給了逐塊的規格）──────────────────
 * 這一頁現在只講一件事：**Agent 在大專案出錯，常常是沒有拿到正確的專案脈絡，
 * 不見得是模型不夠強。** 下一頁才講「資料已經有了，怎麼找得到」。
 *
 * 同一輪拿掉與改掉的，**不要加回來**：
 *   1. 「課程裡的案例 ／ 已經在跑的專案」兩個大框（含右邊那片會動的格子）。
 *      那片格子是 2026-10-31 講師指定做成動畫的，這一輪由講師自己撤掉，
 *      理由是它只在講「檔案很多」，而這一頁的重點是脈絡沒給到。
 *   2. 四層表原本的「活多久」欄與「第一層你管不了、第三四層是工具的事」那行分派。
 *      那個講法把兩個不同維度混在一起：**檢索是取得資訊的方法，不是第四種記憶**，
 *      它也會用來讀專案文件與外部記憶。現在表格改成「作用／注意事項」兩欄，
 *      底下一行明講這四項不是平行的四種記憶。
 *   3. codebase-memory-mcp 的實例、`curl` 安裝提醒、四個評估問題、token 對照圖，
 *      這些在拆頁那一輪就搬去下一頁了。
 *
 * **底部那句「有保存，不代表找得到；找得到，也不代表找對版本。」是講師指定的原句**，
 * 形狀上接近 D-2 的收尾金句，但它是這兩頁的論點本身（上半句是這一頁，下半句是下一頁），
 * 不是語氣。**不要在掃對仗的時候把它改掉。**
 *
 * 三個症狀要照寫那幾個具體例子（舊版檔案、昨天的決策、共用元件），
 * 每一條底下的「原因」是這一頁真正要教的東西，抽掉就只剩抱怨。
 *
 * 強調色一種：sky（右欄那張表）。其餘灰階。
 */

/** 左欄：三個學員真的會撞到的情況。描述講現象，原因講脈絡缺在哪，兩行都要有。 */
const SYMPTOMS = [
  {
    n: '01',
    k: '改錯檔案',
    v: '明明已經換了新版架構，Agent 卻跑去修改不再使用的舊程式。',
    why: '不知道目前哪個檔案才是正式版本。',
  },
  {
    n: '02',
    k: '忘記決策',
    v: '昨天才確認的需求與規格，今天換一輪對話又要重新解釋一次。',
    why: '決策只存在先前的聊天紀錄裡。',
  },
  {
    n: '03',
    k: '改壞其他功能',
    v: '修好了登入頁面，卻意外影響共用的元件，讓其他頁面一起出問題。',
    why: '不清楚各個部分之間的相依關係與限制。',
  },
];

/** 右欄：Agent 的專案脈絡從哪裡來。英文名稱留著給學員對照工具介面，中文才是主要閱讀內容。
 *  **順序不代表階段**，底下那行小字就是在擋這個誤讀。 */
const SOURCES = [
  {
    k: '上下文視窗',
    en: 'Context Window',
    v: '目前這一輪對話與執行中看得到的資訊',
    note: '容量有限，不保證保留所有歷史內容',
  },
  {
    k: '專案文件',
    en: 'Project Files',
    v: '專案的規格、架構、規則與進度',
    note: '文件要維護，也要讓 Agent 讀得到',
  },
  {
    k: '外部記憶',
    en: 'External Memory',
    v: '跨好幾次工作保存下來的重要決策與狀態',
    note: '要管更新、過期與互相衝突',
  },
  {
    k: '檢索',
    en: 'Retrieval',
    v: '需要的時候，從文件或資料裡把資訊找回來',
    note: '找得到不代表正確，也不代表是最新版',
  },
];

export default function SlideProjectMemory() {
  return (
    <SlideLayout title="專案變大後，為什麼 Agent 開始忘東忘西？" subtitle="Project Context" icon={Database}>
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            同一個專案做久了，Agent 可能改到舊版檔案、忘記先前的決策，甚至把已經修好的功能改壞。
            <strong className="text-slate-100">這些狀況多半是它沒有拿到正確的專案脈絡。</strong>
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-[42fr_58fr] gap-6 items-start">

          <AnimatedBlock stepIndex={2}>
            <h3 className="text-slate-100 text-base font-bold mb-3">你可能遇過這三種情況</h3>
            <ol className="space-y-4">
              {SYMPTOMS.map((s) => (
                <li key={s.n}>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs text-slate-600">{s.n}</span>
                    <span className="text-base font-bold text-slate-100">{s.k}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">{s.v}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">原因：{s.why}</p>
                </li>
              ))}
            </ol>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-3">它需要的資訊，不只存在聊天紀錄裡</h3>
            <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.1fr)] gap-x-4 border-t border-slate-800">
              {SOURCES.map((s) => (
                <div key={s.en} className="contents">
                  <div className="border-b border-slate-800 py-2.5">
                    <div className="text-sm font-bold text-sky-300">{s.k}</div>
                    <div className="font-mono text-xs leading-tight text-slate-600">{s.en}</div>
                  </div>
                  <p className="border-b border-slate-800 py-2.5 text-sm leading-relaxed text-slate-300">{s.v}</p>
                  <p className="border-b border-slate-800 py-2.5 text-sm leading-relaxed text-slate-500">{s.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              這四項不是四種平行的記憶。檢索是取得資訊的方法，它也可能用來讀專案文件與外部記憶。
            </p>
          </AnimatedBlock>

        </div>

        <AnimatedBlock stepIndex={4} className="border-t border-slate-800 pt-4">
          <p className="text-slate-100 text-lg font-bold leading-relaxed">
            有保存，不代表找得到；找得到，也不代表找對版本。
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            長期專案需要的是一份持續更新、查得到，而且說得出哪一份才算正式版本的專案資訊。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
