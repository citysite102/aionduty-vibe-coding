import { ToggleLeft } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { DontDo } from './_DontDo';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-11-write-whitelist',
  title: '規則怎麼寫：白名單',
  script:
    '第一個技巧：講清楚只能做什麼，不要列一串不能做什麼。禁止清單有個先天的問題，你能想到的壞寫法有限，擋掉三種，它還有第四種。改成白名單就不一樣了，你把可以用的東西框出來，框以外的它都不會碰。這是全部技巧裡最有效的一個，因為它把無限的可能收斂成有限的選項。',
  seconds: 38,
  from: 70,
};

export default function RecWrite1() {
  return (
    <SlideLayout title={meta.title} subtitle="How to Phrase It" icon={ToggleLeft}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-4xl font-bold leading-snug"><Key>講清楚只能做什麼</Key>，不要列一串不能做什麼</p>
        </AnimatedBlock>

        <DontDo
          stepFrom={2}
          bad="「不要用舊版的 React 寫法，不要用 var，不要改到我的 CSS。」"
          badNote="你擋掉三種，它還有第四種方式可以出錯。"
          good="「一律使用 React Functional Components 與 Hooks，CSS 僅限修改 Tailwind classes。」"
          goodNote="把範圍框起來，範圍以外的它都不會去碰。"
        />
      </RecPage>
    </SlideLayout>
  );
}
