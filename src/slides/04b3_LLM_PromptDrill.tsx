import { PenLine } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const CHECKS = [
  {
    n: '1',
    q: '有沒有「那個」「這邊」這種代稱？',
    a: '換成名字。檔名、按鈕上的字、欄位名稱都行，只要是唯一的。之後在 Claude Code 裡，可以直接用 @檔名 指定。',
  },
  {
    n: '2',
    q: '有沒有講清楚邊界？',
    a: '要它做什麼，也要說不要動什麼。範圍給得越窄，它猜的空間越小。',
  },
  {
    n: '3',
    q: '講不清楚的，能不能直接給它看？',
    a: '貼一張圖、貼一段現有的內容。你講十句，不如給它一個範例。',
  },
];

export default function SlideLLMPromptDrill() {
  return (
    <SlideLayout title="常見的三個溝通誤區" subtitle="Three Checks" icon={PenLine}>
      <div className="max-w-5xl mx-auto space-y-4 pb-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHECKS.map((c, i) => (
            <AnimatedBlock
              key={c.n}
              stepIndex={i + 1}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4"
            >
              <div className="w-7 h-7 mb-3 rounded bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400 font-bold font-mono text-sm">
                {c.n}
              </div>
              <div className="text-slate-200 text-base font-bold mb-2 leading-snug">{c.q}</div>
              <div className="text-slate-500 text-sm leading-relaxed">{c.a}</div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">示範</div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-red-400 font-mono text-sm">✕</span>
            <span className="text-red-300 text-base">「幫我把這份表格整理一下」</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed pl-6 mb-4">
            「這份」是哪份？「整理」是排序、去重複，還是換格式？它只能猜，猜錯了你還得重講一次。
          </p>
          <div className="flex items-start gap-2 pt-3 border-t border-slate-800">
            <span className="text-emerald-400 font-mono text-sm mt-1">✓</span>
            <span className="text-emerald-300 text-base leading-relaxed">
              「附件這份會員名單，請依照『註冊日期』由新到舊排序，重複的 Email 只留最新那筆，其他欄位不要動。」
            </span>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
