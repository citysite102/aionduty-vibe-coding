import { FilePlus2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HandbookState } from './_HandbookState';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-54-handbook-v1',
  title: '你的手冊現在長這樣',
  script:
    '這就是你前面動手寫出來的那份手冊，放在專案根目錄。我把它整理成一個固定的樣子，後面每改一次都會回到同一個畫面，你才比得出改了什麼。這一版十四行，分成專案說明、畫面、程式、不要做四個區塊。這十四行裡面混著四種東西，該留的、該搬到別層去的、該刪掉的，還有一條寫了等於沒寫的。哪一條是哪一種，後面會一條一條拆。',
  seconds: 34,
  from: 58,
};

export default function RecHandbookV1() {
  return (
    <SlideLayout title={meta.title} subtitle="Your Handbook So Far" icon={FilePlus2}>
      <RecPage className="space-y-4" handbook={1}>
        <HandbookState stepIndex={1} version={1} />

        <AnimatedBlock stepIndex={2} className="px-1 space-y-2.5">
          <p className="text-slate-300 text-base leading-relaxed">
            檔案就開在<Key>專案根目錄</Key>，跟你的程式放在一起。裡面先照想到的寫就好。
          </p>
          <p className="text-slate-400 text-base leading-relaxed">
            這十四行混著四種：該留的、該搬去別的地方的、該刪的，還有一條寫了等於沒寫。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
