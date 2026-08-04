import { FolderCog } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const PLACES = [
  {
    name: 'Claude Projects',
    where: '網頁版',
    can: '把團隊長期共用的規格與規範放同一個地方，每次開新對話都自動帶著。',
    cannot: '不會在你的電腦裡建立檔案，也不會執行任何指令。',
  },
  {
    name: 'Cowork',
    where: '桌面版，綁一個本機資料夾',
    can: '保有聊天的操作方式，但能直接讀寫你綁的那個資料夾。可以只綁一個子目錄，不必掃整個專案。',
    cannot: '權限範圍就是你綁的那個資料夾，不會跨出去。',
  },
  {
    name: 'Claude Code',
    where: '終端機',
    can: '讀整個資料夾、執行測試、操作版本控制，直接把檔案改出來。',
    cannot: '沒有圖形介面，看不到視覺預覽。',
  },
];

export default function SlideM2ProjectsInPractice() {
  return (
    <SlideLayout title="同一套手冊，換個地方用" subtitle="Same Rules, Different Surface" icon={FolderCog}>
      <div className="max-w-6xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
          前面講的手冊、分層、規則該放哪，都不是終端機專屬的。換到別的地方，<strong className="text-slate-200">觀念一樣，只有兩件事會變：它碰得到哪些檔案，以及它能不能自己動手。</strong>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {PLACES.map((p, i) => (
            <AnimatedBlock
              key={p.name}
              stepIndex={i + 2}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col"
            >
              <div className="text-sky-400 font-bold text-base">{p.name}</div>
              <div className="text-slate-500 text-xs font-mono mb-3">{p.where}</div>
              <div className="text-slate-300 text-xs leading-relaxed mb-3">{p.can}</div>
              <div className="text-slate-500 text-xs leading-relaxed mt-auto pt-3 border-t border-slate-800">
                {p.cannot}
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-slate-800">
            <span className="text-sm font-bold text-slate-100">舉一個完全不是程式的例子</span>
            <span className="text-xs text-slate-500">在 Claude Projects 裡開一個「社群文案」專案</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sky-400 text-xs font-bold mb-2">知識庫放什麼</div>
              <ul className="text-slate-400 text-xs leading-relaxed space-y-1 list-disc pl-4 marker:text-slate-600">
                <li>品牌語氣指南</li>
                <li>過去互動比較好的幾篇貼文</li>
                <li>不能提到的競品與敏感字清單</li>
              </ul>
            </div>
            <div>
              <div className="text-sky-400 text-xs font-bold mb-2">指令怎麼寫</div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-300 text-xs leading-relaxed font-mono">
                你是行銷總監。語氣幽默但專業，不要用誇飾的形容詞，每篇貼文最後附三個相關 Hashtag。
              </div>
            </div>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mt-4 pt-3 border-t border-slate-800">
            知識庫等於<span className="text-slate-300">你給它的參考資料</span>，指令等於<span className="text-slate-300">你的 CLAUDE.md</span>。換個地方、換個工作，結構完全一樣。另外，專案要依任務切開，不要把不相關的資料混在同一個裡面，否則它讀到的東西會失焦。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={6} className="border rounded-2xl px-5 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-400 text-base leading-relaxed">
            三個地方都吃同一份規範，<strong className="text-slate-200">差別只在權限範圍。</strong>
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
