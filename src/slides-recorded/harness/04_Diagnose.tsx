import { Search } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

const STEPS = [
  { n: '1', t: '跑 /context', d: '那份手冊在載入清單裡嗎？不在，就是位置的問題。' },
  { n: '2', t: '問它依據哪一條', d: '「你剛才那個決定，是依據 CLAUDE.md 的哪一條？」' },
  { n: '3', t: '它答不出來', d: '代表規則無法判定，改寫成可以檢查的句子。' },
  { n: '4', t: '答得出來卻做錯', d: '多半是被埋在後面，或是兩條規則互相矛盾。' },
];

export const meta: RecordedMeta = {
  id: 'harness-04-diagnose',
  title: '那要怎麼知道是哪一種？',
  script:
    '這五種原因的處理方式完全不同，所以不要一發現它沒照做就急著再加一條規則，那只會讓檔案更肥，原本的問題還在。診斷順序是這樣：第一步跑 /context，確認那份手冊在不在載入清單裡，不在就是位置的問題。第二步問它依據哪一條做決定。如果它答不出來，代表規則寫得無法判定。如果它答得出來卻還是做錯，那多半是被埋在後面，或是兩條規則互相矛盾。',
  seconds: 42,
  from: 68,
};

export default function RecDiagnose() {
  return (
    <SlideLayout title={meta.title} subtitle="Why Rules Fail" icon={Search}>
      <RecPage className="space-y-4">
        {STEPS.map((s, i) => (
          <AnimatedBlock
            key={s.n}
            stepIndex={i + 1}
            className="bg-slate-900 border border-slate-800 rounded-2xl px-7 py-5 flex gap-5 items-start"
          >
            <div className="w-11 h-11 shrink-0 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400 font-bold font-mono text-xl">
              {s.n}
            </div>
            <div>
              <div className="text-slate-100 text-xl font-bold mb-1">{s.t}</div>
              <p className="text-slate-400 text-lg leading-relaxed">{s.d}</p>
            </div>
          </AnimatedBlock>
        ))}

        <AnimatedBlock stepIndex={5} className="bg-amber-500/5 border border-amber-500/20 rounded-2xl px-7 py-5">
          <p className="text-slate-300 text-lg leading-relaxed">
            跳過診斷直接再加一條規則，檔案只會更肥，原本的問題還在。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
