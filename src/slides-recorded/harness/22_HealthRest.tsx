import { Sparkles } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { SeriesRail, HEALTH_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-10-03 標題從「手冊健檢：加法排在第四」改成「剩下的歸位、加法、修剪」。
 * 這一頁講的是第三到第五步，舊標題只點名其中一步，讀者看不出另外兩步也在這裡
 * （D-5：標題列舉了什麼，就要回去數頁面上真的有幾個）。
 * 「加法排在第四」那個主張沒有消失，它還在口白與畫面裡。
 */
export const meta: RecordedMeta = {
  id: 'harness-22-health-rest',
  title: '手冊健檢：剩下的歸位、加法、修剪',
  script:
    '第三到第五步，套在同一份手冊上講，不要用想的。' +
    '第三步歸位：「絕對不要刪掉我的檔案」這一條違反了會出事，所以它不該只寫在手冊裡，要搬去 Hook。這一條前面四個問題的第一題就處理過了，健檢的第三步做的是同一件事。' +
    '第四步加法，這一輪一條都不用補。這裡要多講兩句，因為它反直覺。你會想加一條，通常是因為你交代過的某件事它沒照做。但它沒照做的原因，多半不是你少寫了一條，是那條被埋在一堆用不到的規則裡，或者它根本只在某一區才該生效。前面兩步把重複的刪掉、把只管一區的搬走之後，剩下的那幾條它讀得到了，原本想補的那一條往往就不需要了。所以加法排第四，不是不准你加，是叫你先刪再看。' +
    '第五步修剪：「畫面要好看，風格保持一致」這一句，它做完自己也不知道算不算達成，你也沒辦法指著結果說它違規。這一條下一頁會真的改掉。',
  seconds: 77,
  from: 69,
};

export default function RecHealthRest() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={Sparkles}>
      <RecPage>
        <SeriesRail {...HEALTH_RAIL} current={2} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          {/*
            大字位置給的是主張，不是進度。這一頁改過兩次：先是「剩下三步，你已經學過兩步」，
            那是在安撫學員；後來改成「剩下三步，加法排在第四」，前半仍然在報進度。
            標題也跟著改，其他五頁都是「手冊健檢：每條規則為了什麼而加／先刪再搬」這種講內容的寫法。
            這一頁真正反直覺的是加法的排序：手冊沒生效時，多數人的第一反應是再加一條。
          */}
          <p className="text-slate-300 text-4xl font-bold leading-snug">手冊沒生效時，第一個動作<Key>不是再加一條</Key></p>
        </AnimatedBlock>

        {/*
          原本這三步只有名詞加一句解釋，學員問「那到底要做什麼」。
          三步各掛一條這一段一直在改的那份手冊裡的真實句子，抽象的部分就有落點了。
        */}
        <AnimatedBlock stepIndex={2} className="space-y-4">
          {[
            ['3　歸位', '「絕對不要刪掉我的檔案」違反了會出事，搬去 Hook，不要只寫在手冊裡。', '這條就是前面四個問題的第一題。'],
            ['4　加法', '這一輪一條都不用補。', '你想加一條，通常是因為它沒照做。但多半不是你少寫一條，是那條被用不到的規則埋掉了。前兩步清掉，它就讀得到了。'],
            ['5　修剪', '「畫面要好看，風格保持一致」改成看得出達成沒有的寫法。', '它做完自己也不知道算不算好看。'],
          ].map(([n, d, note]) => (
            <div key={n} className="bg-slate-900 border border-slate-800 rounded-2xl px-7 py-5 flex gap-6 items-baseline">
              <span className="text-sky-400 font-bold text-xl font-mono shrink-0 w-24">{n}</span>
              <div>
                <p className="text-slate-200 text-lg leading-relaxed">{d}</p>
                <p className="text-slate-500 text-base leading-relaxed mt-1">{note}</p>
              </div>
            </div>
          ))}
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
