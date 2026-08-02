import { Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-09-route-principles',
  title: '越往上越確定，但也越難改',
  script:
    '這四層有兩個原則要記得。第一，越往上越確定，改起來也越費事。Hook 跟 CI 是程式在擋，一定會執行，但要動到設定檔；寫在 CLAUDE.md 裡的規則隨時能改，但它不保證會被照做。第二，同一條規則不要放兩個地方。已經有 Hook 在擋的事，文字版就是重複的，那是你之後做健檢時最容易刪掉的一批。',
  seconds: 38,
  from: 69,
};

const LAYERS = [
  { name: 'Hook / CI', tag: '程式在擋', strong: true },
  { name: '子目錄 rules', tag: '碰到才載', strong: false },
  { name: 'Skill', tag: '用到才展開', strong: false },
  { name: '根目錄 CLAUDE.md', tag: '不保證照做', strong: false },
];

export default function RecRoutePrinciples() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={Layers}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="space-y-2.5">
          {LAYERS.map((l, i) => (
            <div
              key={l.name}
              className="flex items-center gap-5 bg-slate-900 border border-slate-800 rounded-xl px-6 py-4"
              style={{ marginLeft: `${i * 28}px` }}
            >
              <span className={`text-xl font-bold ${l.strong ? 'text-sky-400' : 'text-slate-300'}`}>{l.name}</span>
              <span className="text-slate-500 text-lg">{l.tag}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-xl px-6 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            上面兩層是程式在擋，一定會執行。最下面那層是寫給它看的，不保證會被照做。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
