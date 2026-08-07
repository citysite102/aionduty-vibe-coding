import { CheckSquare, CornerDownRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideHandsOnPrompt() {
  return (
    <SlideLayout title="跟著做：寫出真正能用的 CLAUDE.md" subtitle="Step-by-step Prompt" icon={CheckSquare}>
      <div className="max-w-5xl mx-auto mt-1 space-y-4">

        <AnimatedBlock stepIndex={1} className="bg-sky-950/20 border border-sky-900/40 rounded-xl px-5 py-3 flex gap-3 items-start">
          <CornerDownRight size={16} className="text-sky-400 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-slate-100">不要開新資料夾。</strong>
            這一輪回到你第一單元做的那個任務計時器。第一單元收尾時它自己總結過一份 CLAUDE.md，
            那份只是它的摘要，<strong className="text-slate-100">現在要把它改成真正能用的版本</strong>，把口頭上的約定變成寫下來的規範。
          </p>
        </AnimatedBlock>

        {/*
          不加 items-start：讓同一列的卡片等高，四張卡的邊框才會對齊。
          hover 暗化用 brightness 不用 opacity，理由見「動手搭建運作框架」那頁的註解。
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 [&:hover>*]:brightness-[0.4] [&>*:hover]:brightness-100">

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg transition-[filter,border-color] duration-200 hover:border-sky-500/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">1</div>
            <h3 className="text-lg font-bold text-slate-100">回到原本的專案</h3>
          </div>
          <div className="bg-black/50 p-4 rounded-lg font-mono text-sm border border-slate-800 space-y-2 text-slate-300">
            <div className="text-emerald-400">$ cd mission-timer</div>
            <div className="text-emerald-400">$ claude</div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg transition-[filter,border-color] duration-200 hover:border-sky-500/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">2</div>
            <h3 className="text-lg font-bold text-slate-100">先讓它自己讀一遍</h3>
          </div>
          <div className="bg-black/50 p-4 rounded-lg font-mono text-sm border border-slate-800 text-sky-300">
            You: 請先看過這個專案，然後告訴我目前有哪些檔案、樣式上有哪些既定的做法。先不要改東西。
          </div>
          <p className="text-slate-500 text-xs mt-3 leading-relaxed">
            它要讀的是你第一單元產出的 <code className="text-slate-400">index.html</code>：裡面已經有配色、按鈕文案和排版方式。
            這一步整理出來的東西，就是下一步手冊的草稿。
          </p>
          <p className="text-amber-400/80 text-xs mt-2 leading-relaxed">
            如果資料夾是空的（例如第一單元沒有實際做），這一步就跳過，直接進第 3 步，把那句「改寫」換成新建一份。空資料夾沒有東西可讀。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg transition-[filter,border-color] duration-200 hover:border-sky-500/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">3</div>
            <h3 className="text-lg font-bold text-slate-100">把約定寫成 CLAUDE.md</h3>
          </div>
          <div className="bg-black/50 p-4 rounded-lg font-mono text-sm border border-slate-800 text-sky-300 leading-relaxed">
            You: 請在 CLAUDE.md 補上下面這幾條，原本已經有的不要動，以後每次進來都要遵守。<br/>
            1. 深色星空背景，主色只用在當下要強調的那一個元素。<br/>
            2. 星球與火箭一律用 canvas 或 CSS 畫，不得引用外部圖片。<br/>
            3. 按鈕文案使用航太語彙：發射、待機、返航、補給。<br/>
            4. 倒數的分鐘數要放在最上面當設定，不要散在程式碼裡。
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg transition-[filter,border-color] duration-200 hover:border-sky-500/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">4</div>
            <h3 className="text-lg font-bold text-slate-100">驗收：規範真的有用嗎</h3>
          </div>
          <div className="bg-black/50 p-4 rounded-lg font-mono text-sm border border-slate-800 text-sky-300">
            You: 幫我加一個 5 分鐘的「補給時間」模式，樣式請遵守 CLAUDE.md。
          </div>
          <p className="text-slate-400 text-xs mt-3 leading-relaxed">
            重點在看它有沒有自己去讀那份手冊。按鈕文案有沒有跟上、有沒有偷塞一張外部圖片進來。
            <strong className="text-slate-200">寫了規範，跟規範被遵守，是兩件事。</strong>
          </p>
        </AnimatedBlock>

        </div>

      </div>
    </SlideLayout>
  );
}
