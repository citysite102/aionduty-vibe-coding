import { FilePlus2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HandbookState } from './_HandbookState';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-54-handbook-v1',
  title: '你的手冊現在長這樣',
  script:
    '先把檔案開出來，放在專案根目錄。裡面先照想到的寫，有專案說明、畫面、程式、不要做四個區塊，一共十四行。這十四行裡面混著四種東西：該留的、該搬去別的地方的、該刪掉的，還有一條寫了等於沒寫的。接下來三塊就是把這四種分開。',
  seconds: 32,
  from: 58,
};

export default function RecHandbookV1() {
  return (
    <SlideLayout title={meta.title} subtitle="Your Handbook So Far" icon={FilePlus2}>
      <RecPage className="space-y-4" handbook={1}>
        <HandbookState stepIndex={1} version={1} />

        <AnimatedBlock stepIndex={2} className="px-1">
          <p className="text-slate-400 text-lg leading-relaxed">
            四種混在一起：該留的、該搬的、該刪的，還有一條寫了等於沒寫。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
