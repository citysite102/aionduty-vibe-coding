import { Sparkles } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-22-health-rest',
  title: '手冊健檢：加法排在第四',
  script:
    '剩下三步直接套在你這份手冊上。第三步分流：「絕對不要刪掉我的檔案」違反了會出事，搬去 Hook。第四步加法，這一輪一條都不用補。這個順序值得停一下，發現手冊沒生效的時候多數人的第一個動作就是再加一條，健檢刻意把加法排在第四，因為先刪再搬之後要補的通常比原本以為的少。第五步修剪，「畫面要好看」它做完自己也不知道達成沒有，怎麼改寫是下一段的主題。',
  seconds: 46,
  from: 69,
};

export default function RecHealthRest() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={Sparkles}>
      <RecPage>
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
            ['3　分流', '「絕對不要刪掉我的檔案」違反了會出事，搬去 Hook。', '這條就是前面四個問題的第一題。'],
            ['4　加法', '這一輪一條都不用補。', '先刪再搬之後，原本想加的那條通常已經不需要了。'],
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
