import { Target } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function Slide04() {
  return (
    <SlideLayout title="兩條學習主線" subtitle="Dual Threads" icon={Target}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        
        {/* 主線 A */}
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-xl p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-sky-400 font-mono text-xs font-bold px-2 py-1 bg-sky-400/10 rounded uppercase">Thread A</span>
              <h3 className="text-2xl font-bold mt-3">建立專案的 AI 指導手冊 (CLAUDE.md)</h3>
            </div>
            <div className="text-sky-500/20 text-6xl font-black">A</div>
          </div>
          <p className="text-slate-400 mb-6 font-medium">重點不在於「寫一個檔案」，而是把專案的知識與規範整理成一份可以長期重複使用的資產（以 <span className="text-sky-400 font-bold font-mono">CLAUDE.md</span> 為載體），讓 AI 每次啟動都自動讀到。</p>
          
          <ul className="space-y-4 text-sm mt-8">
            <li className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 font-mono shrink-0">1</div>
              <div><strong className="text-slate-200 block text-base">雛形：先有一份，然後確認它真的被讀到</strong><span className="text-slate-500 leading-relaxed">第一單元收尾就會有第一版，請它把那個單元的開發重點總結出來。內容不用多，但要親眼確認它出現在載入清單裡。</span></div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 font-mono shrink-0">2</div>
              <div><strong className="text-slate-200 block text-base">成長：學會分流，而不是一直往裡面加</strong><span className="text-slate-500 leading-relaxed">會出事的交給程式攔截，只在某一區適用的分出去，有固定步驟的包成可呼叫的流程，其餘才進根目錄。</span></div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 font-mono shrink-0">3</div>
              <div><strong className="text-slate-200 block text-base">完善：定期健檢，該刪的刪掉</strong><span className="text-slate-500 leading-relaxed">已經有程式在擋的事，文字版就是重複的。它跟著專案走，換一台電腦、隔三個月回來都還在。</span></div>
            </li>
          </ul>
        </AnimatedBlock>

        {/* 主線 B */}
        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-xl p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-indigo-400 font-mono text-xs font-bold px-2 py-1 bg-indigo-400/10 rounded uppercase">Thread B</span>
              <h3 className="text-2xl font-bold mt-3">培養協作心理與習慣</h3>
            </div>
            <div className="text-indigo-500/20 text-6xl font-black">B</div>
          </div>
          <p className="text-slate-400 mb-6 font-medium">技術學會後，最大的挑戰往往是「不敢放手」或「過度放任」。</p>

          <div className="space-y-6 mt-8">
            <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
              <strong className="text-indigo-300 block mb-2 text-lg">克服放手焦慮</strong>
              <span className="text-slate-400 text-sm leading-relaxed">從「每一步都自己接管」慢慢過渡到「適度放手」，知道什麼時候可以讓它整夜自己跑。</span>
            </div>
            <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
              <strong className="text-indigo-300 block mb-2 text-lg">最好的實踐習慣</strong>
              <span className="text-slate-400 text-sm leading-relaxed">每當系統出現偏差，除了修正，記得問自己：<span className="text-slate-100 italic block mt-2 text-base">「這能轉化為一條新規則嗎？」</span></span>
            </div>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
