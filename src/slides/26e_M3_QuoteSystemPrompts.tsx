import { TerminalSquare, ArrowRight, AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyText } from '../components/CopyBlock';

/*
 * 每一步都要有「做完之後你要看什麼」，否則學員照貼完五段，
 * 不會知道自己已經被帶偏了。watch 寫的是這一步特有的失誤，
 * 跨步驟的通病留給下一頁的五個風險，兩邊不要重複。
 */
const STEPS = [
  {
    title: '建立專案規格檔',
    prompt:
      '請建立 docs/quote-brief.md、docs/data-model.md、docs/api-contract.md、docs/ui-guidelines.md 四份文件，內容照我們前面談的填。這一步只寫文件，不要寫任何功能程式碼，也不要建資料庫。',
    watch: '它很容易直接開始寫功能。看到 src/ 底下多出檔案就停下來，退回這一步。',
  },
  {
    title: '請它回頭檢查缺口',
    prompt:
      '讀完那四份文件，列出 5 個你還不確定的地方，特別檢查需求、資料欄位與 API 回應這三邊有沒有對不上。只列問題，不要改檔案，也不要開始實作。',
    watch: '它一個問題都提不出來，代表文件太模糊到無從比對。回頭把欄位寫具體再問一次。',
  },
  {
    title: '建立資料、API 與畫面骨架',
    prompt:
      '照 data-model.md 建立客戶、品項、報價單、明細四個資料結構，照 api-contract.md 實作 GET /api/customers 與 POST /api/quotes，並建立報價列表與編輯頁的畫面骨架。金額一律用整數分儲存。先用假資料，這一步不要接真的資料庫。',
    watch: '金額用小數會在加總時差幾分錢，事後很難回頭改，所以要在這一步就講明。',
  },
  {
    title: '加入商業邏輯',
    prompt:
      '照 api-contract.md 加入稅金、折扣、有效期限與狀態流轉，狀態只允許 draft、review、approved、sent 四種。不要串金流、不要做庫存，也不要改已經定好的 API 路徑與欄位名稱。',
    watch: '它可能自己多發明狀態。改完請它列出實作跟 api-contract.md 有哪裡不一樣。',
  },
  {
    title: '交給子代理審查',
    prompt:
      '請 quote-reviewer 檢查目前的報價流程缺哪些必要資訊。缺哪一欄就列出哪一欄，不要自己補資料。先列問題，不要動任何檔案。',
    watch: '它回「看起來沒問題」就是退回條件沒寫清楚，補上「缺什麼要逐項列出」再跑一次。',
  },
];

export default function SlideQuoteSystemPrompts() {
  return (
    <SlideLayout title="用五個指令推進" subtitle="Step by Step" icon={TerminalSquare}>
      <div className="max-w-6xl mx-auto w-full pb-8 space-y-4">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-4">
          <p className="text-slate-300 text-base leading-relaxed">
            中型專案要分段下指令。每一步都讓 Agent 先產出可檢查的規格檔、畫面骨架或資料結構，再往下一步。
          </p>
        </AnimatedBlock>

        <div className="space-y-3">
          {STEPS.map((step, index) => (
            <AnimatedBlock key={step.title} stepIndex={index + 2} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:items-center">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-800 font-mono text-sm font-bold text-sky-400">
                    {index + 1}
                  </span>
                  <h3 className="text-slate-100 text-base font-bold">{step.title}</h3>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight aria-hidden="true" size={16} className="hidden md:block text-slate-700 shrink-0 mt-1" />
                  <div className="min-w-0">
                    <CopyText text={step.prompt} />
                    <p className="mt-2 flex items-start gap-2 text-amber-200/70 text-xs leading-relaxed">
                      <AlertTriangle aria-hidden="true" size={13} className="text-amber-500 shrink-0 mt-0.5" />
                      {step.watch}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={7} className="rounded-2xl border px-6 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-300 text-base leading-relaxed">
            這段先不教 SDD，也不要求完整測試。這一段練的是四件事：需求先寫成一頁、API 先講好、資料結構先講定、每一步都有審查點。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
