import { FileX2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-01-fail-not-loaded',
  title: '為什麼規則沒有生效？',
  script:
    '規則寫了卻沒照做，第一個要排除的原因是它根本沒讀到。CLAUDE.md 分成好幾層，根目錄那份每一輪都會載入，但子目錄裡的那份不一樣，要等到它真的動到那一區的檔案才會被讀進來。所以你在子目錄寫了規則，這一輪它卻在改別的地方，那條規則就完全不在對話裡。這種情況跟規則寫得好不好無關，你把它改得再精準都沒有用。',
  seconds: 42,
  from: 68,
};

export default function RecFailNotLoaded() {
  return (
    <SlideLayout title={meta.title} subtitle="Why Rules Fail" icon={FileX2}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={0} className="mb-6">
          <div className="text-slate-500 text-base font-mono mb-2">原因 1 / 3</div>
          <p className="text-slate-100 text-3xl font-bold leading-snug">因為那份手冊，根本沒進到這一輪的對話裡。</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={1} className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-slate-500 text-base font-mono mb-2">根目錄</div>
            <div className="text-slate-100 text-xl font-bold mb-3 font-mono">./CLAUDE.md</div>
            <div className="text-sky-400 text-lg">每一輪都會載入</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-slate-500 text-base font-mono mb-2">子目錄</div>
            <div className="text-slate-100 text-xl font-bold mb-3 font-mono">報表/CLAUDE.md</div>
            <div className="text-slate-400 text-lg">動到那一區才載入</div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-2xl p-6"
        >
          <p className="text-slate-300 text-xl leading-relaxed">
            規則寫在子目錄，這一輪它卻在改別的地方，那條規則就不在對話裡。這跟規則寫得好不好無關。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
