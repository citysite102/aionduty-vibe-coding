import { TerminalSquare, ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const STEPS = [
  {
    title: '建立專案規格檔',
    prompt: '請先建立 docs/quote-brief.md、docs/data-model.md、docs/api-contract.md、docs/ui-guidelines.md。先不要寫功能。',
  },
  {
    title: '請它回頭檢查缺口',
    prompt: '請根據四份文件列出 5 個你還不確定的地方，特別檢查需求、資料欄位與 API 回應有沒有對齊。不要開始實作。',
  },
  {
    title: '建立資料、API 與畫面骨架',
    prompt: '先做客戶、品項、報價單、明細四個資料結構，建立 GET /api/customers、POST /api/quotes 的基本回應，並建立報價列表與編輯頁。',
  },
  {
    title: '加入商業邏輯',
    prompt: '依照 api-contract 加入稅金、折扣、有效期限與狀態流轉。不要串金流、不要做庫存。',
  },
  {
    title: '交給小幫手審查',
    prompt: '請 quote-reviewer 檢查目前報價流程缺哪些必要資訊，先列問題，不要修改。',
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
                  <p className="font-mono text-xs md:text-sm leading-relaxed text-slate-400 break-words">{step.prompt}</p>
                </div>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={7} className="rounded-xl border border-slate-800 border-l-4 border-l-sky-500 bg-slate-900 px-6 py-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            這段先不教 SDD，也不要求完整測試。現在只練四件事：需求先落地、API 先講好、資料先對齊、每一步都有審查點。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
