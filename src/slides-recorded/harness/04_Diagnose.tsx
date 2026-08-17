import { Search } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 這一頁原本是四張編號卡，一張一步。但它做的事其實是分岔：
 * 問一個問題，答案往兩邊走，其中一邊就地結案，另一邊才往下問。
 * 排成清單看不出那個分岔，讀者會以為四步是依序都要做完。
 *
 * 改成兩個問題各帶兩條岔路。左邊那條是就地結案（灰底加結論），
 * 右邊那條才繼續往下。這樣「查到哪裡為止」自己就看得出來。
 *
 * 顏色：問題灰階，結論給 sky（當下要記的是結論），最後的警告 amber。一頁兩色。
 */
const BRANCHES = [
  {
    step: '1',
    ask: '那份手冊在載入清單裡嗎？',
    how: '跑 /context',
    no: { label: '不在', result: '位置問題，查到這裡就結束' },
    yes: { label: '在', result: '往下問' },
  },
  {
    step: '2',
    ask: '剛才那個決定依據哪一條？',
    how: '直接問它',
    no: { label: '答不出來', result: '句子寫壞，改寫成可以檢查的' },
    yes: { label: '答得出來卻做錯', result: '被埋在後面，或兩條規則打架' },
  },
];

export const meta: RecordedMeta = {
  id: 'harness-04-diagnose',
  title: '那要怎麼知道是哪一種？',
  script:
    '三種原因的處理方式完全不同，所以不要一發現它沒照做就急著再加一條規則，那只會讓檔案更肥。診斷只有兩個問題，每一個問題答案往兩邊走。第一個問題：那份手冊在載入清單裡嗎？跑斜線 context 就知道。不在，就是位置問題，查到這裡結束。在的話往下問第二個：剛才那個決定依據哪一條？答不出來，代表句子寫壞了，要改寫成可以檢查的。答得出來卻還是做錯，多半是被埋在後面，或者兩條規則互相打架。位置最好處理，所以下一步先決定位置。',
  seconds: 45,
  from: 68,
};

export default function RecDiagnose() {
  return (
    <SlideLayout title={meta.title} subtitle="Why Rules Fail" icon={Search}>
      <RecPage className="space-y-4" handbook={1}>
        {BRANCHES.map((b, i) => (
          <AnimatedBlock key={b.step} stepIndex={i + 1}>
            {/* 問題 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-4">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xl font-bold text-slate-500 shrink-0">{b.step}</span>
                <div className="min-w-0">
                  <div className="text-slate-100 text-xl font-bold leading-snug">{b.ask}</div>
                  <div className="font-mono text-base text-orange-300 mt-1">{b.how}</div>
                </div>
              </div>
            </div>

            {/* 兩條岔路。線只畫一條短的，不要做成花俏的流程圖 */}
            <div className="mx-auto h-3 w-px bg-slate-700" />

            <div className="grid grid-cols-2 gap-4">
              {[b.no, b.yes].map((branch) => (
                <div
                  key={branch.label}
                  className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-3"
                >
                  <div className="text-slate-500 text-base mb-1">{branch.label}</div>
                  <div className="text-sky-200 text-lg leading-snug">{branch.result}</div>
                </div>
              ))}
            </div>
          </AnimatedBlock>
        ))}

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-amber-900/40 bg-amber-950/20 px-7 py-4">
          <p className="text-slate-300 text-lg leading-relaxed">
            ⚠️ 跳過診斷直接再加一條，檔案只會更肥，原本的問題還在。
            <Key>位置的問題最好處理</Key>，所以下一步先決定位置。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
