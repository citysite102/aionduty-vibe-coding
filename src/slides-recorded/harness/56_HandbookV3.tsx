import { Scissors } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HandbookState } from './_HandbookState';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 這一版刪掉的「一律用繁體中文回答」，在 21d5_M2_FolderMap 是「該放家目錄」的正面例子。
 * 兩邊不矛盾：它留在家目錄那一層，只是不要在專案手冊再寫一次。
 * 兩頁相隔三十三頁，改動任何一邊都要回頭看另一邊。
 */

/**
 * 2026-10-04 補了一塊兩個檔案並排。講師回饋：「因為沒有全域的去做比對，我擔心同學會困惑
 * 什麼是全域的。」原本這一頁只用一句話說「它已經寫在全域手冊裡」，而學員手上只有專案那一份，
 * 畫面上也看不到全域那一份長什麼樣，等於要他相信一個沒出現過的東西。
 * 現在兩個路徑、兩份內容並排，重複的那一行在兩邊都看得到，刪掉的理由就自己浮出來了。
 * 全域那一份的兩條沿用 Slide 75（`21d5_M2_FolderMap`）舉的同一個例子，不要另外編。
 */

export const meta: RecordedMeta = {
  id: 'harness-56-handbook-v3',
  title: '手冊 v3：健檢之後刪掉重複的那一條',
  script:
    '五步健檢跑完，程式那一區的一律用繁體中文回答被刪了。不是它不對，是它重複了。' +
    '畫面上兩個檔案並排你就看得出來。左邊這個路徑是家目錄那一份，前面講分層的時候提過，它每個專案都會讀，裡面寫的是跟你這個人有關、跟專案無關的事：一律用繁體中文回答、先給結論再給理由。右邊是計時器這個專案自己那一份，只有這個專案會讀，裡面寫的是倒數的分鐘數放最上面當設定這種只在這裡成立的事。' +
    '問題就在中間那一行：一律用繁體中文回答，兩邊都有。同一條寫在兩個地方，之後你要改的時候只會改到其中一份，另一份就默默變成錯的，而且你不會知道是哪一份。' +
    '所以它留在家目錄那一層就好，專案這一份刪掉。',
  seconds: 63,
  from: 69,
};

export default function RecHandbookV3() {
  return (
    <SlideLayout title={meta.title} subtitle="Your Handbook So Far" icon={Scissors}>
      <RecPage className="space-y-4" handbook={3}>
        <HandbookState stepIndex={1} version={3} />

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-slate-800">
            <div className="px-6 py-4">
              <div className="font-mono text-base text-orange-300">~/.claude/CLAUDE.md</div>
              <div className="text-slate-500 text-base mb-2.5">家目錄那一份，每個專案都會讀</div>
              <div className="text-slate-300 text-base leading-relaxed">一律用繁體中文回答</div>
              <div className="text-slate-500 text-base leading-relaxed">先給結論，再給理由</div>
            </div>
            <div className="px-6 py-4">
              <div className="font-mono text-base text-orange-300">mission-timer/CLAUDE.md</div>
              <div className="text-slate-500 text-base mb-2.5">只有這個專案會讀</div>
              <div className="text-slate-500 text-base leading-relaxed line-through">一律用繁體中文回答</div>
              <div className="text-slate-300 text-base leading-relaxed">倒數的分鐘數放最上面當設定</div>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1 space-y-2.5">
          <p className="text-slate-300 text-xl leading-relaxed">
            刪掉它<Key>不是因為它寫錯了</Key>，是全域手冊裡已經有同一條，每個專案都適用。
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            同一條寫在兩個地方，之後要改的時候，你只會改到其中一份。留在上面那一層就好。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
