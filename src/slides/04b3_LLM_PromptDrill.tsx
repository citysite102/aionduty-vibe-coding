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
    <SlideLayout title="換你把這三句話改清楚" subtitle="Try It Yourself" icon={PenLine}>
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 max-w-6xl mx-auto items-start pb-4">

        <div className="space-y-3">
          <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
            這個練習不用開終端機，手機上的 AI 就能做。前面講的原理，落到實際動作就是這三個檢查點。
          </AnimatedBlock>

          {CHECKS.map((c, i) => (
            <AnimatedBlock
              key={c.n}
              stepIndex={i + 2}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 flex gap-3 items-start"
            >
              <div className="w-6 h-6 shrink-0 rounded bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400 font-bold font-mono text-xs">
                {c.n}
              </div>
              <div>
                <div className="text-slate-200 text-xs font-bold mb-1">{c.q}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{c.a}</div>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <div className="space-y-3">
          <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">示範</div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-red-400 font-mono text-xs">✕</span>
                  <span className="text-red-300 text-sm">「幫我把這份表格整理一下」</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed pl-5">
                  「這份」是哪份？「整理」是排序、去重複，還是換格式？它只能猜，猜錯了你還得重講一次。
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono text-xs mt-0.5">✓</span>
                  <span className="text-emerald-300 text-sm leading-relaxed">
                    「附件這份會員名單，請依照『註冊日期』由新到舊排序，重複的 Email 只留最新那筆，其他欄位不要動。」
                  </span>
                </div>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={6} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-3">換你改這兩句</div>
            <div className="space-y-3">
              <div className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-3">
                <div className="text-slate-300 text-sm mb-2">「這個按鈕怪怪的，修一下」</div>
                <div className="border-t border-dashed border-slate-700 pt-2 text-slate-600 text-xs">改寫：</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-3">
                <div className="text-slate-300 text-sm mb-2">「幫我寫個活動文案，要好看一點」</div>
                <div className="border-t border-dashed border-slate-700 pt-2 text-slate-600 text-xs">改寫：</div>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={7} className="text-slate-500 text-xs leading-relaxed px-1">
            改完念給旁邊的人聽。<span className="text-slate-300">他如果還要反問你一句，代表 AI 也會猜錯。</span>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
