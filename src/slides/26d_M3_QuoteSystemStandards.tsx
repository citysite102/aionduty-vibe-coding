import { FileCog, FolderTree, Palette, ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const FILES = [
  { path: 'CLAUDE.md', note: '專案規則、開發流程、交付前檢查' },
  { path: 'docs/quote-brief.md', note: '需求與不做事項' },
  { path: 'docs/data-model.md', note: '四張表與欄位說明' },
  { path: 'docs/api-contract.md', note: 'Request、Response 與錯誤格式' },
  { path: 'docs/ui-guidelines.md', note: '表單、列表、金額與狀態顯示' },
  { path: '.claude/agents/quote-reviewer.md', note: '報價審查小幫手' },
];

const RULES = [
  { title: '金額', text: '資料庫用整數分存；畫面顯示再格式化。' },
  { title: '狀態', text: '只允許 draft、review、approved、sent。' },
  { title: 'API', text: '錯誤回應固定用 code、message、missing_fields。' },
  { title: '缺資料', text: '缺必填欄位就擋下，不要讓 AI 或系統自動補。' },
];

export default function SlideQuoteSystemStandards() {
  return (
    <SlideLayout title="把規範放進對的位置" subtitle="Project Harness" icon={FileCog}>
      <div className="max-w-6xl mx-auto w-full pb-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-5 items-stretch">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2.5 text-slate-100 font-bold mb-4">
            <FolderTree aria-hidden="true" size={20} className="text-sky-400" />
            專案資料夾先長這樣
          </div>
          <div className="space-y-2">
            {FILES.map((file, index) => (
              <AnimatedBlock key={file.path} stepIndex={index + 2} className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="font-mono text-sm text-slate-200 mb-1 break-words">{file.path}</div>
                <p className="text-slate-500 text-xs leading-snug">{file.note}</p>
              </AnimatedBlock>
            ))}
          </div>
        </AnimatedBlock>

        <div className="space-y-4">
          <AnimatedBlock stepIndex={8} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-2.5 text-slate-100 font-bold mb-3">
              <Palette aria-hidden="true" size={20} className="text-sky-400" />
              設計規範先寫可驗收的
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              不寫「畫面要乾淨」。改寫成：列表每列固定顯示客戶、總額、有效期限、狀態；金額一律靠右；危險操作放在次要區。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={9} className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex items-center gap-2.5 text-slate-100 font-bold mb-3">
              <ShieldCheck aria-hidden="true" size={20} className="text-sky-400" />
              三條先放進 CLAUDE.md
            </div>
            <div className="space-y-2">
              {RULES.map((rule) => (
                <div key={rule.title} className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
                  <div className="text-sky-400 text-sm font-bold mb-1">{rule.title}</div>
                  <p className="text-slate-400 text-sm leading-relaxed">{rule.text}</p>
                </div>
              ))}
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </SlideLayout>
  );
}
