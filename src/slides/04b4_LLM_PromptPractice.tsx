import { Pencil } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const DRILLS = ['「這個按鈕怪怪的，修一下」', '「幫我做一頁產品介紹的簡報，要專業一點」'];

export default function SlideLLMPromptPractice() {
  return (
    <SlideLayout title="換你改這兩句" subtitle="Try It Yourself" icon={Pencil}>
      <div className="max-w-4xl mx-auto space-y-5 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-base leading-relaxed">
          照剛才那三個檢查點，把下面兩句改成它不用猜的版本。
        </AnimatedBlock>

        {DRILLS.map((d, i) => (
          <AnimatedBlock
            key={d}
            stepIndex={i + 2}
            className="bg-slate-900 border border-slate-800 rounded-2xl px-7 py-6"
          >
            <div className="text-slate-200 text-2xl leading-snug mb-5">{d}</div>
            <div className="border-t border-dashed border-slate-700 pt-4 text-slate-600 text-base">
              改寫：
            </div>
            <div className="h-12" />
          </AnimatedBlock>
        ))}

        <AnimatedBlock stepIndex={4} className="text-slate-400 text-base leading-relaxed px-1">
          改完念給旁邊的人聽。
          <span className="text-slate-200">他如果還要反問你一句，代表 AI 也會猜錯。</span>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
