import { TerminalSquare, ArrowRight, AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 2026-10-08 新增：從 `26e_M3_QuoteSystemPrompts.tsx` 拆出來的後兩步。
 * 拆頁的理由（Prompt 是複製用的範本，不能刪字）寫在那一份的檔頭，改這一頁之前先讀它。
 *
 * **編號是 4 與 5，跨兩頁連號。** 不要因為它排在這一頁的第一張就改成 1，
 * 底下「每一步之間固定做兩件事」那一塊明文指著「第 3、4 步」。
 *
 * 第 5 步的 `setup` 一定要留：五步裡沒有一步建 `quote-reviewer`，
 * 學員讀到這裡會以為自己漏做了一步。
 */
const STEPS = [
  {
    title: '加入商業邏輯',
    prompt:
      '照 api-contract.md 加入稅金、折扣、有效期限與狀態流轉，狀態只允許 draft、review、approved、sent 四種。不要串金流、不要做庫存，也不要改已經定好的 API 路徑與欄位名稱。',
    watch: '它可能自己多發明狀態。改完請它列出實作跟 api-contract.md 有哪裡不一樣。',
  },
  {
    title: '交給子代理審查',
    setup: '這個角色要先建。骨架照前面那個 code-reviewer：判斷標準換成 docs/quote-brief.md，檢查項目換成報價的欄位規則，退回條件照抄。',
    prompt:
      '請 quote-reviewer 檢查目前的報價流程缺哪些必要資訊。缺哪一欄就列出哪一欄，不要自己補資料。先列問題，不要動任何檔案。',
    watch: '它回「看起來沒問題」就是退回條件沒寫清楚，補上「缺什麼要逐項列出」再跑一次。',
  },
];

export default function SlideQuoteSystemPrompts2() {
  return (
    <SlideLayout title="後兩步：商業邏輯與交給子代理審查" subtitle="Step by Step 4–5" icon={TerminalSquare}>
      <div className="max-w-6xl mx-auto w-full pb-8 space-y-4">
        <div className="space-y-3">
          {STEPS.map((step, index) => (
            <AnimatedBlock key={step.title} stepIndex={index + 1} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:items-center">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-800 font-mono text-sm font-bold text-sky-400">
                    {index + 4}
                  </span>
                  <h3 className="text-slate-100 text-base font-bold">{step.title}</h3>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight aria-hidden="true" size={16} className="hidden md:block text-slate-700 shrink-0 mt-1" />
                  <div className="min-w-0">
                    {step.setup && (
                      <p className="mb-2 text-slate-300 text-sm leading-relaxed">※ {step.setup}</p>
                    )}
                    <p className="font-mono text-sm leading-relaxed text-slate-400 break-words">{step.prompt}</p>
                    <p className="mt-2 flex items-start gap-2 text-amber-200/70 text-sm leading-relaxed">
                      <AlertTriangle aria-hidden="true" size={13} className="text-amber-500 shrink-0 mt-0.5" />
                      {step.watch}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={3} className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-4">
          <h3 className="text-slate-100 text-base font-bold mb-2">每一步之間，固定做兩件事</h3>
          <ul className="space-y-1.5 text-slate-400 text-sm leading-relaxed">
            <li>
              動手之前先 <code className="font-mono text-slate-300">git commit</code> 一次。
              第 3、4 步最可能要退回，存檔點是最便宜的保險。
            </li>
            <li>
              第 3、4 步做完，自己打開畫面點一次再往下。
              <strong className="text-slate-300">它說做完了不算，你點得到才算。</strong>
            </li>
          </ul>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border px-6 py-4 bg-sky-500/5 border-sky-500/25">
          <p className="text-slate-300 text-base leading-relaxed">
            這段先不教 SDD，也不要求完整測試，也不接真的資料庫。那要等你確定欄位不會再改了。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
