import { Footprints } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-10-04：這一頁連著講了四次「這三題」，但從頭到尾沒有把三題列出來。
 * 它們是在 Slide 117 問的，中間隔了三頁（答案、六個零件對照），學員早就記不得了
 * （講師：「我一直困惑是哪三個問題？」）。原本唯一寫出三題的地方是最下面那段 Prompt，
 * 而那時候已經用「這三題」指過三次。現在把三題列在最上面，流程線的第二站也改成指得回去。
 * **這一頁要獨立看得懂**，不要假設學員記得三頁前的問題。
 */
const QUESTIONS = [
  '哪些違反了會出事？',
  '哪些只有特定情況才適用？',
  '哪些每次都要重講一次？',
];

/** 排成流程線之後每一格要短，長句移到口白 */
const STEPS = ['挑一件重複做過三次的事', '上面三題各寫一句', '下次做同一件事貼上去'];

export const meta: RecordedMeta = {
  id: 'harness-47-transfer-next-step',
  title: '換成你自己的工作，怎麼開始',
  script:
    '前面那三題再念一次，因為接下來要換成你自己的工作了：哪些事情違反了會出事？哪些事情只有特定情況才適用？哪些事情你每次都要重講一次？' +
    '這三題跟你用哪個工具無關，換成別的 AI、換成完全不同的工作，要問的還是這三題。換成你自己的工作就這樣開始：挑一件你這個月重複做過三次以上的事，照那三題各寫一句，先不要求完整。下次再做同一件事的時候把它貼上去，缺什麼再補。第一份三行就可以上場。如果連三行都不知道從哪寫起，就把畫面上那一句貼給它，讓它反過來問你，答完就有初稿了。至於什麼時候該加 Skill 或 Hook，等你被同一件事絆到第二次再說。',
  seconds: 58,
  // 三題在畫面上出現兩次是刻意的：上面那份是給學員讀的題目，下面那份在 Prompt 字串裡，
  // 因為學員按複製只會拿到那個字串，寫「上面那三題」Claude 看不到（CLAUDE.md A-4）。
  // 兩份加起來超過 160 字，所以標 reference 不套那條上限。
  kind: 'reference',
  from: 75,
};

export default function RecTransferNextStep() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={Footprints}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-500 text-xl leading-relaxed mb-3">
            換別的 AI、換別的工作，要問的還是這三題：
          </p>
          <div className="space-y-1.5 mb-5">
            {QUESTIONS.map((q, i) => (
              <div key={q} className="flex items-baseline gap-3">
                <span className="font-mono text-base text-slate-600 shrink-0">0{i + 1}</span>
                <span className="text-slate-300 text-xl leading-snug">{q}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-300 text-4xl font-bold leading-snug">
            第一份<Key>三行就可以上場</Key>
          </p>
        </AnimatedBlock>

        {/*
          原本是三條清單。但這三件事是一條線上的三站（挑一件、各寫一句、下次貼上去），
          清單排下來看不出先後，也看不出第三站是「下一次」才會發生的。排成流程線。
        */}
        <AnimatedBlock stepIndex={2}>
          <FlowRow steps={STEPS} />
        </AnimatedBlock>

        {/*
          「照三個問題各寫一句」是整章最大的一個空白頁：學員要自己從零生出三行。
          給一句可貼的，讓它反過來問，三行就有了初稿。這一頁本來就是收尾與起步，
          不給起步的那一下，多數人回去不會動手。
        */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-sky-900/50 bg-sky-950/20 px-7 py-4">
          <div className="text-base font-mono uppercase tracking-widest text-sky-500 mb-2.5">Prompt</div>
          <p className="text-sky-100 text-lg leading-relaxed">
            「我常做的一件事是⋯（講一次流程）。照這三題各問我一輪：哪些違反了會出事、哪些只有特定情況才適用、哪些每次都要重講。問完把我的答案整理成三行，一行一條。」
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 什麼時候該加 Skill 或 Hook？等你被同一件事絆到第二次再說。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
