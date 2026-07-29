import { Target, Cpu, Info, AlertTriangle, Image as ImageIcon, TriangleAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideLLMPrompt() {
  return (
    <SlideLayout title="如何寫出精準的 Prompt" subtitle="Lowering the Entropy" icon={Target}>
      <div className="max-w-5xl mx-auto mt-4 space-y-4">

        <AnimatedBlock stepIndex={1} className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl text-sm text-slate-400 flex gap-2">
          <Info size={16} className="text-sky-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            指令越模糊，向量在幾何空間中的對位就越隨機、越容易幻覺。<strong className="text-slate-200">Vibe Coding 不是「丟棄邏輯、隨意亂指」</strong>；因為 AI 沒有你腦中的專案脈絡（上下文），遇到講不清楚的地方它不會停下來問你，只會挑一個機率上最像的往下做。你越精準，它越聚焦。以下三個習慣就能大幅降低亂度：
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h4 className="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
              <Cpu size={16} />
              <span>1. 別用「那個 / 這邊」這種模糊代稱（指代詞）</span>
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              AI 不是讀心術。想改哪一個 React 元件，直接給出它的 <code className="text-slate-100 bg-slate-950 px-1 rounded">@檔名</code> 或元件名稱，而不是在對話框裡說「修改那部分」。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h4 className="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
              <Target size={16} />
              <span>2. 給予具體的限制與邊界</span>
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              明確宣告「使用 TypeScript、用 Tailwind 排版、避免額外的 API」。限制可選項能大幅縮小數學解空間，明顯提高一次就寫對的機率。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={4} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-amber-950/20 border border-amber-900/40 rounded-2xl p-5">
            <div className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
              <AlertTriangle size={14} /> 模糊指令
            </div>
            <p className="text-slate-300 text-sm font-medium leading-relaxed">「幫我改一下那邊按鈕的對話框功能」</p>
            <p className="text-slate-500 text-xs mt-2">→ 意圖發散，向量拉扯到多個框架與檔案，容易幻覺。</p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-5">
            <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
              <Target size={14} /> 精準指令
            </div>
            <p className="text-slate-300 text-sm font-medium leading-relaxed">「在 <code className="text-slate-100 bg-slate-950 px-1 rounded">Sidebar.tsx</code> 的 LogOutButton，整合 shadcn/ui 的 Dialog 做二次確認」</p>
            <p className="text-slate-500 text-xs mt-2">→ 目標只有一個，它不用猜，產出穩定。</p>
          </div>
        </AnimatedBlock>

        {/* 第三個習慣：用參考圖對齊標準 */}
        <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h4 className="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
            <ImageIcon size={16} />
            <span>3. 講不清楚的，直接給它看</span>
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            「做得更精緻一點」這種話沒有用，因為你心裡的標準跟它的標準不一樣，講幾次都對不上。
            <strong className="text-slate-100">貼一張參考圖進去，它拿到的不只是外觀，還有做法。</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider font-mono">只有文字</div>
              <p className="text-slate-300 text-sm font-medium mb-2">「星球做得更擬真一點，加上陰影」</p>
              <p className="text-slate-500 text-xs leading-relaxed">
                → 它會把漸層調得更細緻，但骨子裡還是同一顆漸層球。方向對，層級不對。
              </p>
            </div>
            <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4">
              <div className="text-[11px] font-bold text-emerald-400 mb-2 uppercase tracking-wider font-mono">附上參考圖</div>
              <p className="text-slate-300 text-sm font-medium mb-2">同一句話，外加一張點陣星球的圖</p>
              <p className="text-slate-500 text-xs leading-relaxed">
                → 它看懂那是粒子渲染，直接換一種畫法。<strong className="text-slate-300">這個決定從形容詞裡推不出來。</strong>
              </p>
            </div>
          </div>

          <div className="mt-4 bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex gap-3 items-start">
            <TriangleAlert size={16} className="text-amber-400 shrink-0 mt-0.5" />
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
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={6} className="text-center text-slate-500 text-xs leading-relaxed border-t border-slate-800 pt-4">
          圖負責「長什麼樣」，文字負責「不准做什麼」和「怎麼運作」。
          <strong className="text-slate-300">前者省掉十句形容詞，後者是圖片永遠表達不了的。兩個要一起給。</strong>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
