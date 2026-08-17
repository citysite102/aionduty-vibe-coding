import { Search } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

const STEPS = [
  { n: '1', t: '跑 /context', d: '那份手冊在載入清單裡嗎？', key: '不在，就是位置的問題' },
  { n: '2', t: '問它依據哪一條', d: '「你剛才那個決定，是依據 CLAUDE.md 的哪一條？」', key: '' },
  { n: '3', t: '它答不出來', d: '改寫成可以檢查的句子。', key: '代表規則無法判定' },
  { n: '4', t: '答得出來卻做錯', d: '多半是', key: '被埋在後面，或是兩條規則互相矛盾' },
];

export const meta: RecordedMeta = {
  id: 'harness-04-diagnose',
  title: '那要怎麼知道是哪一種？',
  script:
    '這三種原因的處理方式完全不同，所以不要一發現它沒照做就急著再加一條規則，那只會讓檔案更肥，原本的問題還在。診斷順序是這樣：第一步跑 /context，確認那份手冊在不在載入清單裡，不在就是位置的問題。第二步問它依據哪一條做決定。如果它答不出來，代表規則寫得無法判定。如果它答得出來卻還是做錯，那多半是被埋在後面，或是兩條規則互相矛盾。第一步查出來的是位置問題，第三步是句子寫壞，第四步可能是位置，也可能是兩條規則打架。位置的問題最好處理，所以下一步先決定位置。',
  seconds: 47,
  from: 68,
};

export default function RecDiagnose() {
  return (
    <SlideLayout title={meta.title} subtitle="Why Rules Fail" icon={Search}>
      <RecPage className="space-y-4" handbook={1}>
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
              <p className="text-slate-400 text-lg leading-relaxed">
                {s.n === '4' ? (
                  <>
                    {s.d}
                    <Key>{s.key}</Key>。
                  </>
                ) : s.key ? (
                  <>
                    {s.d}
                    <Key>{s.key}</Key>。
                  </>
                ) : (
                  s.d
                )}
              </p>
            </div>
          </AnimatedBlock>
        ))}

        {/*
          原本這一頁講完診斷就結束，下一頁直接開始問「這條規則該放哪」，中間是斷的。
          診斷的結論本身就是接點，所以併進這一塊，不另開一個區塊把頁面撐爆。
        */}
        <AnimatedBlock stepIndex={5} className="bg-amber-500/5 border border-amber-500/20 rounded-2xl px-7 py-5">
          <p className="text-slate-300 text-lg leading-relaxed">
            ⚠️ 跳過診斷直接再加一條規則，檔案只會更肥，原本的問題還在。
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mt-3 pt-3 border-t border-amber-500/15">
            第 1 步查出來的是位置，第 3 步是句子寫壞，第 4 步兩種都有可能。<Key>位置的問題最好處理</Key>，所以下一步先決定位置。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
