import { PenLine } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-38-non-code-instruction',
  title: '不是程式也用得上：指令欄',
  script:
    '同一個 Project 還有一個指令欄，那一格才是你的 CLAUDE.md。寫法也一樣：先給角色，再講規矩，最後講輸出格式。例如「你是行銷總監，語氣幽默但專業，不要用誇飾的形容詞，每篇貼文最後附三個相關的 Hashtag」。你看得出來，這跟前面寫程式規範的結構完全一樣，只是換了一個題目。',
  seconds: 38,
  from: 72,
};

export default function RecNonCodeInstruction() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Structure, Any Job" icon={PenLine}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-2xl leading-snug mb-3">同一個 Project 裡的「指令」欄要寫什麼</p>
          <p className="text-slate-300 text-4xl font-bold leading-snug">這一格就是<Key>你的 CLAUDE.md</Key></p>
          <p className="text-slate-400 text-xl leading-relaxed mt-4">
            先給角色，再講規矩，最後講輸出格式。結構跟寫程式規範一樣。
          </p>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="bg-slate-950 border border-slate-800 rounded-2xl px-7 py-6 text-slate-300 text-xl leading-relaxed"
        >
          你是行銷總監。語氣幽默但專業，不要用誇飾的形容詞，每篇貼文最後附三個相關 Hashtag。
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
