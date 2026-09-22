import { Footprints } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/** 排成流程線之後每一格要短，長句移到口白 */
const STEPS = ['挑一件重複做過三次的事', '照三個問題各寫一句', '下次做同一件事貼上去'];

export const meta: RecordedMeta = {
  id: 'harness-47-transfer-next-step',
  title: '換成你自己的工作，怎麼開始',
  script:
    '這三個問題跟你用哪個工具無關，換成別的 AI、換成完全不同的工作，要問的還是這三題。換成你自己的工作就這樣開始：挑一件你這個月重複做過三次以上的事，照三個問題各寫一句，先不要求完整。下次再做同一件事的時候把它貼上去，缺什麼再補。第一份三行就可以上場。如果連三行都不知道從哪寫起，就把畫面上那一句貼給它，讓它反過來問你，答完就有初稿了。至於什麼時候該加 Skill 或 Hook，等你被同一件事絆到第二次再說。',
  seconds: 45,
  from: 75,
};

export default function RecTransferNextStep() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={Footprints}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-500 text-xl leading-relaxed mb-3">
            換別的 AI、換完全不同的工作，要問的還是這三題。
          </p>
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
