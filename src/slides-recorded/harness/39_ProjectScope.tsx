import { SplitSquareHorizontal } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { DontDo } from './_DontDo';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-39-project-scope',
  title: '一個專案該放多少東西？',
  script:
    '這裡有一個很多人踩到的地方：專案要依任務切開，不要把不相關的資料混在同一個裡面。如果你把社群文案、報價單、會議紀錄全放進同一個專案，它每次回答都會被那些不相干的資料拉走，寫貼文的時候引用到報價單的措辭。切開之後，每個專案的知識庫都只跟那一件事有關，它讀到的東西才會準。判斷方式跟前面分層那一段是同一句話：只跟某一件事有關的，就分出去。',
  seconds: 44,
  from: 72,
};

export default function RecProjectScope() {
  return (
    <SlideLayout title={meta.title} subtitle="One Project, One Job" icon={SplitSquareHorizontal}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-100 text-4xl font-bold leading-snug">依任務切開，不相關的不要混在一起</p>
        </AnimatedBlock>

        <DontDo
          stepFrom={2}
          bad="一個專案裡同時放社群文案、報價單、會議紀錄。"
          badNote="寫貼文的時候會引用到報價單的措辭。"
          good="一個任務一個專案，知識庫只放那件事會用到的資料。"
          goodNote="它讀到的東西才會準。"
        />
      </RecPage>
    </SlideLayout>
  );
}
