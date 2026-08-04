import { HelpCircle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const HINTS = [
  {
    q: '哪些事情你每次都要重講一次？',
    a: '這些就是手冊的第一批內容。例如格式、稱呼、哪些欄位一定要有。',
  },
  {
    q: '哪些事情違反了會出事？',
    a: '這些不要只寫進手冊，要找一個機制擋。例如不能把電話與地址寫進去。',
  },
  {
    q: '哪些事情只有特定情況才適用？',
    a: '這些分出去，不要塞進同一份手冊。例如只有對外版本才需要的規矩。',
  },
];

export default function SlideM2TransferQuiz() {
  return (
    <SlideLayout title="換成你的工作，手冊該寫什麼" subtitle="Transfer It" icon={HelpCircle}>
      <div className="max-w-6xl mx-auto space-y-4 pb-4">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-5 items-stretch">

          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">情境</div>
            <p className="text-slate-200 text-lg leading-relaxed font-bold mb-4">
              你每週要把三場會議的逐字稿整理成一份紀錄，寄給同一群人。
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              這件事跟程式無關，但它符合前面所有條件：重複發生、有你自己的規矩、每次都要重講一遍。
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mt-4 pt-4 border-t border-slate-800">
              如果要交給 Claude 做，<strong className="text-sky-400">你的手冊會寫什麼？</strong>
            </p>
          </AnimatedBlock>

          <div className="flex flex-col gap-2.5">
            <AnimatedBlock stepIndex={2} className="text-slate-500 text-xs leading-relaxed">
              想不出來的話，照這三個問題往下問。
            </AnimatedBlock>

            {HINTS.map((h, i) => (
              <AnimatedBlock
                key={h.q}
                stepIndex={i + 3}
                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3"
              >
                <div className="text-slate-200 text-sm font-bold mb-1">{h.q}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{h.a}</div>
              </AnimatedBlock>
            ))}
          </div>
        </div>

        <AnimatedBlock stepIndex={6} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-sm font-bold text-slate-100 mb-3 pb-3 border-b border-slate-800">
            一份可能的答案
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5">
            <div className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 font-mono text-xs text-slate-300 leading-relaxed space-y-1">
              <div className="text-slate-500"># 會議紀錄整理規範</div>
              <div>輸出固定四段：決議、待辦、負責人、期限</div>
              <div>待辦一定要有負責人，沒有就寫「未指定」</div>
              <div>不要寫進電話、地址這類個資</div>
              <div>對外版本的規矩另外放，見 external.md</div>
            </div>
            <ul className="text-slate-400 text-xs leading-relaxed space-y-2">
              <li><span className="text-slate-200">前兩行</span>來自第一題，是你每次都要重講的格式。</li>
              <li><span className="text-slate-200">第三行</span>來自第二題，但它其實不該只寫在這裡，個資外洩的代價太高，應該再加一道機制擋。</li>
              <li><span className="text-slate-200">第四行</span>來自第三題，對外版本的規矩分出去，這份手冊才不會越長越肥。</li>
            </ul>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={7} className="bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-xl px-5 py-3.5">
          <p className="text-slate-400 text-sm leading-relaxed">
            這三個問題跟你用哪個工具無關。<strong className="text-slate-200">換成別的 AI、換成完全不同的工作，要問的還是這三題。</strong>
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
