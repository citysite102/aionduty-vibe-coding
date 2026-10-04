import { Boxes, MonitorSmartphone, ArrowRightLeft, Server, Database, Plug } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 2026-10-04（講師）：「同學很難憑空蹦出這些內容，我可以如何引導？」
 * 病根不是少了提示，是這一頁沒說**那五層是固定的**。前端、API、後端、資料庫、外部服務，
 * 每一個網頁產品都是這五層，章節三（前後端那一頁、API 那一頁）已經教過。
 * 學員要做的不是發明層，是把上一頁的功能範圍拆進五個固定的格子。
 * 所以補了兩件事：開場講明五層不用你想，以及底下那張「逐句對」的示範。
 *
 * 同一輪第二次改：上一頁改成「先寫一句 User Story，再問三題決定要幾層」之後，
 * 這一頁的開場要接得上那三題的結論（要前端、後端、資料庫），不能再從
 * 「叫 AI 做一個報價系統，它會自己決定怎麼切」重新起一個頭，那跟上一頁沒有因果。
 * **改上一頁的三題就要回來看這一段（B-4）。**
 *
 * 示範只給兩列是刻意的：這一頁已經有五張卡，四列會把收尾推出畫面。
 * 兩列夠學員看出那四句問法（畫面上按哪裡、要跟誰要資料、算在哪裡、存在哪裡）怎麼用。
 * **換例子的時候要從上一頁那條動線挑**，不要自己編一個需求。
 */

/** 示範用的兩列：第一列取自上一頁「這一輪要做」，第二列取自三題的第三題 */
const TRACE = [
  { need: '選客戶', fe: '客戶下拉選單', api: '跟後端要客戶清單', be: '不用', db: '客戶那張表' },
  { need: '主管確認後才送出', fe: '送審按鈕', api: '送出一張報價', be: '檢查狀態、擋下缺資料', db: '報價單的狀態欄位' },
];

const LAYERS = [
  {
    icon: MonitorSmartphone,
    title: '前端',
    subtitle: '使用者看得到的工具',
    detail: '報價列表、編輯表單、金額顯示、送審按鈕',
  },
  {
    icon: ArrowRightLeft,
    title: 'API',
    subtitle: '前後端講好的合約',
    detail: 'POST /api/quotes、GET /api/customers、回傳欄位與錯誤格式',
  },
  {
    icon: Server,
    title: '後端',
    subtitle: '商業邏輯與權限',
    detail: '計算稅金與折扣、檢查狀態流轉、擋下缺資料的報價',
  },
  {
    icon: Database,
    title: '資料庫',
    subtitle: '長期記憶',
    detail: 'customers、products、quotes、quote_items 四張表',
  },
  {
    icon: Plug,
    title: '外部服務',
    subtitle: '這一輪先留位置',
    detail: 'PDF 匯出、Email 寄送、金流或 CRM，先列出但不急著串',
  },
];

export default function SlideQuoteSystemArchitecture() {
  return (
    <SlideLayout title="先畫出產品由哪幾層組成" subtitle="Product Architecture" icon={Boxes}>
      <div className="max-w-6xl mx-auto w-full pb-8 space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-slate-400 text-sm leading-relaxed">
            上一頁三題答完，你已經知道這個題目要前端、後端跟資料庫。把那三層攤開，加上中間的 API 與最後的外部服務，一共五層。
          </p>
          <p className="text-slate-300 text-base leading-relaxed mt-2">
            <strong className="text-slate-100">這五層不用你想</strong>，大部分的網頁產品都是這幾層，你前面看過了。
            要填的是每一層裡面放什麼，而那些內容從上一頁那幾句 Story 就拆得出來。
            不確定你的題目長不長這樣，也可以把 Story 貼給 AI，請它先整理一份給你看。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {LAYERS.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <AnimatedBlock key={layer.title} stepIndex={index + 2} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <Icon aria-hidden="true" size={24} className="text-sky-400 mb-3" />
                <h3 className="text-slate-100 text-base font-bold leading-snug">{layer.title}</h3>
                <div className="text-slate-500 text-xs font-bold leading-snug mt-1 mb-3">{layer.subtitle}</div>
                <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-3">{layer.detail}</p>
              </AnimatedBlock>
            );
          })}
        </div>

        <AnimatedBlock stepIndex={7} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-slate-100 text-base font-bold mb-1">每一層放什麼，從上一頁的功能範圍拆出來</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            一個動作問四句：<strong className="text-slate-300">畫面上按哪裡、要跟誰要資料、算在哪裡、存進哪一張表。</strong>
            <strong className="text-slate-200">中間那三欄你不用會寫</strong>，你要答得出來的只有它要什麼、拿回什麼。
          </p>
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[1.2fr_1fr_1.1fr_1.2fr_1fr] gap-3 border-b border-slate-800 pb-2 font-mono text-xs text-slate-500">
                <span>需求那一句</span>
                <span>前端</span>
                <span>API</span>
                <span>後端</span>
                <span>資料庫</span>
              </div>
              {TRACE.map((t) => (
                <div
                  key={t.need}
                  className="grid grid-cols-[1.2fr_1fr_1.1fr_1.2fr_1fr] gap-3 border-b border-slate-800/70 py-2.5 last:border-0 text-sm leading-snug"
                >
                  <span className="text-slate-200 font-bold">{t.need}</span>
                  <span className="text-slate-400">{t.fe}</span>
                  <span className="text-slate-400">{t.api}</span>
                  <span className="text-slate-400">{t.be}</span>
                  <span className="text-slate-400">{t.db}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-3">
            剩下的動作照同一個方式拆完，五格就滿了。拆到一半發現某一格永遠是空的，那就是這個題目用不到那一層。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={8} className="rounded-2xl border px-6 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-300 text-base leading-relaxed">
            這張圖會直接變成後面的任務切分：先把每一層寫成文件，再一次做出資料結構、API 與畫面骨架，最後補後端邏輯。
            外部服務先保留介面，避免第一輪就失控。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
