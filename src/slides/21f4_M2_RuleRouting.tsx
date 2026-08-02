import { Split } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const BRANCHES = [
  {
    q: '違反了會出事，絕對不能發生？',
    to: 'Hook / CI',
    desc: 'Hook 擋你的機器，CI 擋整個團隊。它們在對話外面跑，不吃對話的空間。',
  },
  {
    q: '只在某一區檔案才適用？',
    to: '子目錄 CLAUDE.md / rules',
    desc: '放進那一區的資料夾。只有動到那一區才會被讀進來，平常不會佔掉對話的空間。',
  },
  {
    q: '有固定步驟，用到才需要？',
    to: 'Skill',
    desc: '平常只載名稱，真的要跑那套流程時才展開全文。',
  },
  {
    q: '以上皆非，每一輪都要記得？',
    to: '根目錄 CLAUDE.md',
    desc: '這裡是最後一站，不是預設選項。能往上送的先送走。',
  },
];

export default function SlideM2RuleRouting() {
  return (
    <SlideLayout title="這條規則該放哪" subtitle="Routing Your Rules" icon={Split}>
      <div className="max-w-6xl mx-auto space-y-3.5 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
          上一頁的五種失效，有三種的根因是<strong className="text-slate-200">位置放錯</strong>，不是規則寫得不好。照順序問這四個問題，第一個答「是」的就是它該去的地方。
        </AnimatedBlock>

        <div className="space-y-2.5">
          {BRANCHES.map((b, i) => (
            <AnimatedBlock
              key={b.to}
              stepIndex={i + 2}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 grid grid-cols-1 md:grid-cols-[1fr_auto_1.15fr] gap-x-4 gap-y-1 items-center shadow-md"
            >
              <div className="text-slate-200 text-sm font-bold">{b.q}</div>
              <div className="text-slate-600 font-mono text-sm hidden md:block">→</div>
              <div>
                <div className="text-sky-400 font-bold text-sm">{b.to}</div>
                <div className="text-slate-500 text-xs leading-relaxed mt-0.5">{b.desc}</div>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={6} className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 space-y-2">
          <p className="text-slate-400 text-sm leading-relaxed">
            <strong className="text-slate-200">越往上越確定，改起來也越費事。</strong>Hook 與 CI 是程式在擋，一定會執行，但要動到設定檔；CLAUDE.md 隨時能改，但它不保證會被照做。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            <strong className="text-slate-200">同一條不要放兩個地方。</strong>這份簡報的「中文不要用破折號」已經有 hook 在擋，文字版就是重複的。已經被機制擋住的事，是修剪時最容易刪的一批。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
