import { PenTool, Target, Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideM2HandsOn() {
  return (
    <SlideLayout title="動手搭建運作框架" subtitle="Hands-on Harness" icon={PenTool}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 max-w-6xl mx-auto h-full items-stretch">
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 content-center">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-lg font-bold flex items-center gap-3 text-sky-400 mb-4 border-b border-slate-800 pb-3">
              1. 寫員工手冊 (CLAUDE.md)
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              替第一單元那個任務計時器，把你原本口頭交代的事情變成白紙黑字。
            </p>
            <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs border border-slate-800 text-slate-400 leading-relaxed">
              # 任務計時器開發規範<br/>
              - 深色星空背景，主色只給要強調的元素<br/>
              - 星球與火箭用 canvas 或 CSS 畫，禁止外部圖片<br/>
              - 按鈕文案用航太語彙：發射、待機、返航、補給<br/>
              - 倒數分鐘數集中成設定，不要散在程式碼裡
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-lg font-bold flex items-center gap-3 text-indigo-400 mb-4 border-b border-slate-800 pb-3">
              2. 體檢上下文 (/context)
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              親眼看看 Context 是如何被塞滿的。
            </p>
            <ul className="text-slate-400 text-sm list-disc pl-5">
              <li>輸入 <code className="text-indigo-300">/context</code> 看現在載入了哪些資料。</li>
              <li>輸入 <code className="text-indigo-300">/compact</code> 壓縮對話記憶。</li>
            </ul>
          </AnimatedBlock>
          
          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-lg font-bold flex items-center gap-3 text-emerald-400 mb-4 border-b border-slate-800 pb-3">
              3. 任務切分演練 (Decomposition)
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              丟一個含糊的需求：「我想知道自己今天完成幾趟任務」，請它拆成三步：
            </p>
            <ol className="text-slate-400 text-sm list-decimal pl-5">
              <li>一趟任務要記下哪些欄位</li>
              <li>這些紀錄存在哪裡</li>
              <li>畫面上要怎麼呈現</li>
            </ol>
            <p className="text-slate-500 text-xs mt-3 italic">對照體驗：沒手冊亂猜 vs 照著清單做。這張清單等一下還會用到。</p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-lg font-bold flex items-center gap-3 text-amber-400 mb-4 border-b border-slate-800 pb-3">
              4. 它自己也會記 (auto memory)
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              除了你寫的 CLAUDE.md，Claude Code 還會自己記筆記，這是預設開著的。兩者分工不同：
            </p>
            <div className="space-y-2 text-sm">
              <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
                <span className="text-sky-300 font-bold">CLAUDE.md</span>
                <span className="text-slate-400"> ：你寫的規矩。「一律用繁體中文」這種。</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
                <span className="text-amber-300 font-bold">auto memory</span>
                <span className="text-slate-400"> ：它自己學到的。你糾正過它的事、這個專案怎麼跑測試，它會存起來。</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              輸入 <code className="text-amber-300">/memory</code> 可以看它到底記了什麼，也可以直接改或刪掉。那些筆記就是純文字檔。
            </p>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              判斷原則：你希望團隊每個人都遵守的，寫進 CLAUDE.md；只是講給它聽的一次性偏好，讓它自己記就好。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={5} className="bg-gradient-to-b from-sky-900/30 to-indigo-900/20 border border-sky-900/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden h-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.14)_1px,transparent_0)] bg-[size:6px_6px] opacity-40"></div>

          <div className="relative z-10 space-y-4 w-full">
            <div className="w-20 h-20 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-sky-400 border border-sky-500/30">
              <Target size={40} />
            </div>
            
            <h3 className="text-2xl font-black text-slate-100 tracking-tight leading-tight mb-2">
              完成你的<br/>Harness
            </h3>
            <div className="w-16 h-1 bg-sky-500/50 rounded-full mx-auto"></div>
            
            <p className="text-slate-300 text-sm mt-6 text-left">
              你的產出：
            </p>
            <div className="space-y-3 text-left bg-slate-900/60 p-4 rounded-xl border border-slate-700 w-full">
              <div className="flex gap-3 text-xs text-slate-300 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>你的計時器有了 CLAUDE.md</span>
              </div>
              <div className="flex gap-3 text-xs text-slate-300 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>一張拆好的任務清單</span>
              </div>
              <div className="flex gap-3 text-xs text-slate-300 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>了解 Context 的珍貴</span>
              </div>
            </div>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
