import { FileCog, FolderTree, Palette, ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * `by` 回答「這幾個檔案誰做出來的」。2026-10-04 講師問的：六份列在這裡，但沒有一步指令生得出
 * `CLAUDE.md` 的那四條與 `quote-reviewer.md`，學員會以為自己漏做了。
 * 四份 `docs/` 由下一頁的第 1、2 步產出，另外兩份要自己動手，這裡逐份標出來。
 * **下一頁的步驟編號改了就要回來改這一欄（B-4）。**
 */
const FILES = [
  { path: 'CLAUDE.md', note: '專案規則、開發流程、交付前檢查', by: '你章節五那一份，這裡再補右邊那四條' },
  { path: 'docs/quote-brief.md', note: 'User Story、這一輪做什麼、哪些不做', by: '下一頁第 1 步產出' },
  { path: 'docs/data-model.md', note: '四張表與欄位說明', by: '下一頁第 2 步產出' },
  { path: 'docs/api-contract.md', note: 'Request、Response 與錯誤格式', by: '下一頁第 2 步產出' },
  { path: 'docs/ui-guidelines.md', note: '表單、列表、金額與狀態顯示', by: '下一頁第 2 步產出' },
  {
    path: '.claude/agents/quote-reviewer.md',
    note: '報價審查子代理。建法跟前面那個 code-reviewer 一樣，只有標準不同',
    by: '你自己建，第 5 步才用得到',
  },
];

const RULES = [
  { title: '金額', text: '資料庫用整數分存；畫面顯示再格式化。' },
  { title: '狀態', text: '只允許 draft、review、approved、sent。' },
  { title: 'API', text: '錯誤回應固定用 code、message、missing_fields。' },
  { title: '缺資料', text: '缺必填欄位就擋下，不要讓 AI 或系統自動補。' },
];

export default function SlideQuoteSystemStandards() {
  return (
    <SlideLayout title="規範寫在哪：docs、設計準則、CLAUDE.md" subtitle="Project Harness" icon={FileCog}>
      <div className="max-w-6xl mx-auto w-full pb-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-5 items-stretch">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2.5 text-slate-100 font-bold mb-4">
            <FolderTree aria-hidden="true" size={20} className="text-sky-400" />
            專案資料夾先長這樣，右邊標的是誰做出來的
          </div>
          <div className="space-y-2">
            {FILES.map((file, index) => (
              <AnimatedBlock key={file.path} stepIndex={index + 2} className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <span className="font-mono text-sm text-slate-200 break-words">{file.path}</span>
                  <span className="text-sky-300/80 text-xs shrink-0">{file.by}</span>
                </div>
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
              四條先放進 CLAUDE.md
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
