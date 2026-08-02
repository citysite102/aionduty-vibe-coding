import { FolderGit2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-51-recap-artifact',
  title: '你的專案裡多了什麼？',
  script:
    '把畫面拉回你的資料夾。這一段結束之後，mission-timer 這個專案裡多了一個檔案，就是 CLAUDE.md。它不是筆記，也不在你的腦子裡，它跟著專案一起走。之後不管你隔多久回來、換哪一台電腦、或是把資料夾交給別人，規矩都在裡面。這是這一段唯一的產出，但它會影響你後面每一次對話。',
  seconds: 40,
  from: 76,
};

export default function RecRecapArtifact() {
  return (
    <SlideLayout title={meta.title} subtitle="Module 2 Recap" icon={FolderGit2}>
      <div className="max-w-4xl mx-auto pt-2 space-y-6">
        <AnimatedBlock stepIndex={1} className="bg-slate-950 border border-slate-800 rounded-2xl px-7 py-6 font-mono">
          <div className="text-slate-300 text-xl">mission-timer/</div>
          <div className="text-slate-500 text-xl">├ index.html</div>
          <div className="text-slate-500 text-xl">├ src/</div>
          <div className="text-sky-300 text-xl">└ CLAUDE.md　←　這一段的產出</div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <p className="text-slate-100 text-4xl font-bold leading-snug">它跟著專案走，不在你的腦子裡</p>
          <p className="text-slate-400 text-xl leading-relaxed mt-4">
            隔多久回來、換哪一台電腦，規矩都還在。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
