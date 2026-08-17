import { Search } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { Fork, Branch } from './_DecisionTree';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 這一頁原本是四張編號卡，一張一步，看起來像四步都要照順序做完。
 * 但它做的事是分岔：問一個問題，一邊就地結案，另一邊才往下問。
 *
 * 第一版改成「問題卡加下面兩塊」，但只在中間畫了一小段豎線，
 * 結果還是三個堆疊的區塊，看不出那兩塊是同一個問題分出來的。
 * 現在用 _DecisionTree 的 Fork 畫出橫桿，第二個問題整組往右縮排，
 * 深度就看得出來：第二層是掛在「在」那一條線底下的。
 *
 * 顏色：往下走的那一邊 sky，就地結案的那一邊灰階加「到此結束」，最後的警告 amber。
 */
export const meta: RecordedMeta = {
  id: 'harness-04-diagnose',
  title: '那要怎麼知道是哪一種？',
  script:
    '三種原因的處理方式完全不同，所以不要一發現它沒照做就急著再加一條規則，那只會讓檔案更肥。診斷只有兩個問題，每一個問題答案往兩邊走。第一個問題：那份手冊在載入清單裡嗎？跑斜線 context 就知道。不在，就是位置問題，查到這裡結束。在的話往下問第二個：剛才那個決定依據哪一條？答不出來，代表句子寫壞了，要改寫成可以檢查的。答得出來卻還是做錯，多半是被埋在後面，或者兩條規則互相打架。位置最好處理，所以下一步先決定位置。',
  seconds: 45,
  from: 68,
};

/** 問題節點。編號、問句、怎麼查。 */
function Ask({ n, q, how }: { n: string; q: string; how: string }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 px-7 py-4">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xl font-bold text-slate-500 shrink-0">{n}</span>
        <div className="min-w-0">
          <div className="text-slate-100 text-xl font-bold leading-snug">{q}</div>
          <div className="font-mono text-base text-orange-300 mt-1">{how}</div>
        </div>
      </div>
    </div>
  );
}

export default function RecDiagnose() {
  return (
    <SlideLayout title={meta.title} subtitle="Why Rules Fail" icon={Search}>
      <RecPage className="space-y-3" handbook={1}>
        <AnimatedBlock stepIndex={1}>
          <Ask n="1" q="那份手冊在載入清單裡嗎？" how="跑 /context" />
          <Fork />
          <div className="grid grid-cols-2 gap-4">
            <Branch label="不在" end>
              位置問題
            </Branch>
            <Branch label="在">往下問</Branch>
          </div>
        </AnimatedBlock>

        {/* 第二層縮排，讓人看得出它掛在「在」那一條底下，不是另一個平行的問題 */}
        <AnimatedBlock stepIndex={2} className="pl-[8%]">
          <Ask n="2" q="剛才那個決定依據哪一條？" how="直接問它" />
          <Fork />
          <div className="grid grid-cols-2 gap-4">
            <Branch label="答不出來" end>
              句子寫壞，改寫成可以檢查的
            </Branch>
            <Branch label="答得出來卻做錯" end>
              被埋在後面，或兩條規則打架
            </Branch>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-amber-900/40 bg-amber-950/20 px-7 py-4">
          <p className="text-slate-300 text-lg leading-relaxed">
            ⚠️ 跳過診斷直接再加一條，檔案只會更肥。
            <Key>位置的問題最好處理</Key>，所以下一步先決定位置。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
