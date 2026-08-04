import { BookOpen, FileText, GitCompare, Brain } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const DEBTS = [
  {
    icon: FileText,
    zh: '意圖債',
    en: 'Intent Debt',
    accent: 'text-slate-400 bg-slate-800/60 border-slate-700',
    desc: '每次開一個新對話，AI 都要重新了解你要什麼。你交代得不夠清楚，它就會用自己的猜測把空白填滿，做出來的東西越走越偏。',
    fix: '把工作慣例與規則寫進 CLAUDE.md 或 SKILL.md，讓它不必每次重猜。'
  },
  {
    icon: GitCompare,
    zh: '理解債',
    en: 'Comprehension Debt',
    accent: 'text-slate-400 bg-slate-800/60 border-slate-700',
    desc: '迴圈跑得越順，產出的程式碼與資料就越多。你沒讀過的部分等於沒掌握，久了會變成自己專案的陌生人。',
    fix: '定期看它到底改了什麼（git diff），每次抽查幾個檔案就好，不要等到全部看不懂。'
  },
  {
    icon: Brain,
    zh: '認知投降',
    en: 'Cognitive Surrender',
    accent: 'text-slate-400 bg-slate-800/60 border-slate-700',
    desc: '太依賴自動迴圈之後，人就完全不再主動思考，也說不出自己的判斷標準是什麼。',
    fix: '帶著判斷力去設計與驗證迴圈，是把腦力挪去更值得的地方；用迴圈來逃避思考，才是退步的開始。'
  }
];

export default function SlideVocabulary() {
  return (
    <SlideLayout title="自動化之後，最容易累積的三件事" subtitle="Three Debts to Watch For" icon={BookOpen}>
      <div className="max-w-5xl mx-auto mt-3 text-left space-y-5 pb-6">

        <AnimatedBlock stepIndex={1} className="bg-slate-900/60 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-slate-300 text-base leading-relaxed">
            接下來這一段會一直提到這三個詞。它們的共通點是：
            <strong className="text-slate-100">當下都不痛，會拖到後面才一次還。</strong>
            先認得它們，後面講風險與防線時會比較有感覺。
          </p>
        </AnimatedBlock>

        {DEBTS.map((debt, idx) => {
          const Icon = debt.icon;
          return (
            <AnimatedBlock
              key={debt.en}
              stepIndex={idx + 2}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex gap-5 items-start"
            >
              <div className={`p-3 rounded-2xl border shrink-0 ${debt.accent}`}>
                <Icon size={22} />
              </div>
              <div>
                <div className="flex items-baseline gap-2.5 mb-2">
                  <h3 className="text-lg font-bold text-slate-100">{debt.zh}</h3>
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{debt.en}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{debt.desc}</p>
                <p className="text-sm text-slate-400 leading-relaxed mt-2.5 pt-2.5 border-t border-slate-800">
                  <strong className="text-slate-200">怎麼還：</strong>{debt.fix}
                </p>
              </div>
            </AnimatedBlock>
          );
        })}

      </div>
    </SlideLayout>
  );
}
