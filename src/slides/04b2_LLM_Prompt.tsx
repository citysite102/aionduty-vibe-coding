import { Image as ImageIcon, TriangleAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideLLMPrompt() {
  return (
    <SlideLayout title="講不清楚的，直接給它看" subtitle="Show, Don't Describe" icon={ImageIcon}>
      <div className="max-w-5xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
          上一頁講的是為什麼它會猜錯。<strong className="text-slate-200">Vibe Coding 不是「丟棄邏輯、隨意亂指」</strong>，因為它沒有你腦中的畫面，遇到講不清楚的地方它不會停下來問你，只會挑一個最像的往下做。
          而有一類需求，你再怎麼加形容詞都講不清楚。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            「做得更精緻一點」這種話沒有用，因為你心裡的標準跟它的標準不一樣，講幾次都對不上。
            <strong className="text-slate-100">貼一張參考圖進去，它拿到的不只是外觀，還有做法。</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider font-mono">只有文字</div>
              <p className="text-slate-300 text-sm font-medium mb-2">「星球做得更擬真一點，加上陰影」</p>
              <p className="text-slate-500 text-xs leading-relaxed">
                它會把漸層調得更細緻，但骨子裡還是同一顆漸層球。方向對，層級不對。
              </p>
            </div>
            <div className="bg-slate-950 border border-sky-500/30 rounded-xl p-4">
              <div className="text-xs font-bold text-sky-400 mb-2 uppercase tracking-wider font-mono">附上參考圖</div>
              <p className="text-slate-300 text-sm font-medium mb-2">同一句話，外加一張點陣星球的圖</p>
              <p className="text-slate-500 text-xs leading-relaxed">
                它看懂那是粒子渲染，直接換一種畫法。<strong className="text-slate-300">這個決定從形容詞裡推不出來。</strong>
              </p>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex gap-3 items-start">
          <TriangleAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-amber-300 mb-1.5">但參考圖要挑「它做得出來的」</div>
            <p className="text-slate-300 text-xs leading-relaxed mb-2">
              AI 只會寫程式，不會生圖。你貼一張攝影作品或 3D 算圖過去，它寫不出那種東西，只會給你一個不上不下的結果，
              然後你會以為是自己不會用。
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              挑那種<strong className="text-slate-200">看得出來「這是用程式畫的」</strong>的圖。這是期待落差最常發生的地方。
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-xl px-5 py-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            圖負責「長什麼樣」，文字負責「不准做什麼」和「怎麼運作」。
            <strong className="text-slate-200">前者省掉十句形容詞，後者是圖片永遠表達不了的。兩個要一起給。</strong>
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
