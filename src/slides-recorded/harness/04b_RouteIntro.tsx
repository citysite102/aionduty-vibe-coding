import { ListOrdered } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { SeriesRail, ROUTE_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 分流那四題原本是直接從第一題開始，方法本身寫成第一題頁面上的一行引言。
 * 於是第一頁要同時交代「這套方法怎麼用」跟「第一題是什麼」，
 * 而後面三頁只有一題。第一頁跟其他三頁的份量不一樣，讀起來就會覺得跳。
 *
 * 這一頁把方法獨立出來：四題一次看完、講清楚為什麼是這個順序，然後才進第一題。
 *
 * 只列問題，不列答案。四個去處由上面那條軌一頁一頁填上去，
 * 先在這裡全部揭曉，後面四頁的「先自己想」就沒有意義了。
 * 軌在這一頁刻意四格全空（current 給 -1），那四個空格就是接下來要填的東西。
 *
 * 沒有 from：這一頁不是從現行版拆出來的，是新寫的。
 */
const QUESTIONS = [
  '違反了會出事，絕對不能發生？',
  '只在某一區檔案才適用？',
  '有固定步驟，用到才需要？',
  '以上皆非，而且每一輪都要記得？',
];

export const meta: RecordedMeta = {
  id: 'harness-04b-route-intro',
  title: '一條規則該放哪，照順序問四題',
  script:
    '診斷完是位置問題，接下來就是決定位置。方法是四個問題，照順序問，第一個答「是」的就是它該去的地方，後面不用再問。四題是這樣：違反了會出事，絕對不能發生嗎？只在某一區檔案才適用嗎？有固定步驟，用到才需要嗎？以上皆非，而且每一輪都要記得嗎？順序不能換，因為它是照「擋得住的程度」排的：先問擋得住的，再看範圍大小，最後才是那份每一輪都會載入的手冊。接下來一題一頁，你先自己想，再看答案。',
  seconds: 42,
};

export default function RecRouteIntro() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={ListOrdered}>
      <RecPage className="space-y-5" handbook={1}>
        <SeriesRail {...ROUTE_RAIL} current={-1} />

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            照順序問，<Key>第一個答「是」的就是答案</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          {QUESTIONS.map((q, i) => (
            <div
              key={q}
              className="flex items-baseline gap-5 px-7 py-4 border-b border-slate-800/70 last:border-0"
            >
              <span className="font-mono text-lg font-bold text-slate-600 shrink-0">{i + 1}</span>
              <span className="text-slate-200 text-xl leading-snug">{q}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 順序不能換：先問擋得住的，再看範圍大小，最後才是每一輪都會載入的那份。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
