import { FilePlus2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HandbookState } from './_HandbookState';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-54-handbook-v1',
  title: '手冊 v1：該留、該搬、該刪、該改寫',
  script:
    '回到我們的 CLAUDE.md。這是我到目前為止的版本，放在專案根目錄；你自己產出來的不會跟我完全一樣，那沒關係，要看的是它的結構。這一版十四行，分成專案說明、畫面、程式、不要做四個區塊。我把它整理成固定的樣子，後面每改一次都會回到同一個畫面，你才比得出改了什麼。這十四行裡面混著四種東西：該留的、該搬到別層去的、該刪掉的，還有一條寫了等於沒寫的。哪一條是哪一種，後面會一條一條拆。',
  seconds: 40,
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
            四個區塊、十四行。該搬去別層的、重複的、寫了等於沒寫的各有一條，其餘先留著。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
