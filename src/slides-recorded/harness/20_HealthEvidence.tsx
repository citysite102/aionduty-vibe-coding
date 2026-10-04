import { Scale } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { SeriesRail, HEALTH_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-09-23 整頁重寫。原本是「三種證據（現場／機制／時效），三格裡湊得出兩格才刪」。
 * 講師回饋：不夠白話，而且取了三個名字又加一條「中兩格」的門檻，學員會以為要背一套規則，
 * 反而比原本更難懂。
 *
 * 更根本的問題是那條門檻本身站不住：機制與時效各自單獨成立就足以刪（已經有程式在擋、
 * 它管的東西不存在了），現場證據單獨成立卻什麼都證明不了（沒違反過可能是它一直有照做）。
 * 硬湊成「三選二」等於把一個確定的理由跟一個不確定的理由當成等值。
 *
 * 所以改成講兩種可以直接刪的情況，加上一種最常被誤會的，每一種都配一句真的例子。
 * 沒有名字要記，也沒有數字要算。說不準的那些交給下一頁（21_HealthWeakEvidence）。
 */

/**
 * 2026-10-03：第一種情況原本寫「lint 本來就會報這個錯」。那是過度一般化，
 * 預設的 lint 不會報 inline style，要裝規則才會，而這個專案的 npm run lint 就是
 * tsc --noEmit，根本不報。改成「你的 lint 設定裡剛好有一條在報這個錯」，
 * 並補一句要先確認那個檢查真的在跑。學員照原本的講法刪掉手冊那一條，就真的沒人擋了。
 */
export const meta: RecordedMeta = {
  id: 'harness-20-health-evidence',
  title: '手冊健檢：哪幾條可以直接刪',
  script:
    '有三種情況很好認，看到就可以直接刪。' +
    '第一種，這件事已經有程式在擋了：手冊裡寫著不要用 inline style，而你掛的 Hook 或 lint 設定裡剛好有一條在擋，那手冊這一條只是再說一次，刪掉照樣不會發生。這裡要先確認那個檢查真的在跑，不是以為它在跑。' +
    '第二種，同一條在別的規則文件裡也寫過。這一種跟第一種不一樣，擋它的不是程式，是另一份也會被載入的文件：可能在家目錄那份全域手冊，可能在子目錄的 CLAUDE.md，也可能在 .claude 斜線 rules 底下。兩份都會載入，等於同一句話講兩次。該留哪一份？留靠近那一區、講得比較具體的那一份，把根目錄那句比較泛的刪掉。' +
    '第三種，規則管的那個東西不見了：規則寫著某個資料夾裡要怎麼做，而那個資料夾早就改名或砍掉了，這條現在是空的。' +
    '還有一種很容易被當成可以刪：你從來沒看它違反過這條。這個不算理由，可能是它一直有照做，也可能這種情況沒發生過。',
  // 2026-10-04 補第三種可刪的情況之後，口白推算 82 秒，刻意超過 45 秒的上限。
  // 多出來的是「別的規則文件也寫過同一條」那一段：它跟第一種的差別
  //（擋你的是程式，還是另一份也會載入的文件）不講清楚，學員會兩種混成一種。
  // 要砍的時候該問的是這一頁要不要拆成兩支，不是把那一段削掉。
  seconds: 82,
  from: 69,
};

/**
 * 2026-10-04 補第三種。講師：「只有這兩種嗎？例如已經有在其他 Rule、Hook 裡面的？」
 * 原本第一種只舉 lint，而 Hook 那一條其實早在〈規則該放哪一層〉那一頁就承諾過
 * 「已經有 Hook 在擋的事，手冊裡的文字版就是重複的，健檢的時候最容易刪掉的就是那一批」，
 * 健檢這裡卻沒接回去。第二種則是另一回事：重複不在程式裡，而在別一份規則文件裡
 * （全域手冊、子目錄的 CLAUDE.md、`.claude/rules/`），那時候兩份都還會載入，
 * 要刪的是講得比較泛的那一份。留哪一份照〈CLAUDE.md 可以放的四個位置〉的原則：
 * 越靠近你正在改的檔案講得越具體，下面那層蓋過上面。
 */
const SURE = [
  {
    title: '已經有程式在擋了',
    body: '手冊寫著「不要用 inline style」，而 Hook 或 lint 裡有一條在擋。文字版只是再說一次。',
    tail: '先確認它真的在跑。',
  },
  {
    title: '別的規則文件已經有了',
    body: '同一句話在全域手冊、子目錄的 CLAUDE.md 或 .claude/rules/ 裡也有，兩份都會載入。',
    tail: '留比較具體的那一份。',
  },
  {
    title: '它管的那個東西不見了',
    body: '規則管的那個資料夾早就改名或砍掉了，這條現在是空的。',
    tail: '',
  },
];

export default function RecHealthEvidence() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={Scale}>
      <RecPage className="space-y-5">
        <SeriesRail {...HEALTH_RAIL} current={1} />

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            <Key>這三種可以直接刪</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-3 gap-4">
          {SURE.map((s) => (
            <div key={s.title} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
              <div className="text-slate-200 text-xl font-bold mb-2.5">{s.title}</div>
              <p className="text-slate-400 text-lg leading-relaxed">{s.body}</p>
              {s.tail && <p className="text-slate-500 text-base leading-relaxed mt-2.5">{s.tail}</p>}
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-5">
          <div className="text-amber-200/90 text-xl font-bold mb-2.5">⚠️ 從來沒看它違反過，不算理由</div>
          <p className="text-slate-300 text-lg leading-relaxed">
            可能是它一直有照做，也可能這種情況沒發生過。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
