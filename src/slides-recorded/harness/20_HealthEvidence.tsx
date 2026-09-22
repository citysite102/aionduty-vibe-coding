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

export const meta: RecordedMeta = {
  id: 'harness-20-health-evidence',
  title: '手冊健檢：哪幾條可以直接刪',
  script:
    '有兩種情況很好認，看到就可以直接刪。第一種，這件事已經有程式在擋了：手冊裡寫著不要用 inline style，而 lint 本來就會報這個錯，那這一條只是再說一次，刪掉照樣不會發生。第二種，規則管的那個東西不見了：規則寫著某個資料夾裡要怎麼做，而那個資料夾早就改名或砍掉了，這條現在是空的。還有一種很容易被當成可以刪：你從來沒看它違反過這條。這個不算理由，可能是它一直有照做，也可能這種情況根本沒發生過。',
  seconds: 45,
  from: 69,
};

const SURE = [
  {
    title: '已經有程式在擋了',
    body: '手冊裡寫著不要用 inline style，而 lint 本來就會報這個錯。這一條只是再說一次，刪掉照樣不會發生。',
  },
  {
    title: '它管的那個東西不見了',
    body: '規則寫著某個資料夾裡要怎麼做，而那個資料夾早就改名或砍掉了。這條現在是空的。',
  },
];

export default function RecHealthEvidence() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={Scale}>
      <RecPage className="space-y-5">
        <SeriesRail {...HEALTH_RAIL} current={1} />

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            <Key>這兩種可以直接刪</Key>，第三種很容易被誤會
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-2 gap-4">
          {SURE.map((s) => (
            <div key={s.title} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
              <div className="text-slate-200 text-xl font-bold mb-2.5">{s.title}</div>
              <p className="text-slate-400 text-lg leading-relaxed">{s.body}</p>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-5">
          <div className="text-amber-200/90 text-xl font-bold mb-2.5">⚠️ 從來沒看它違反過，這個不算理由</div>
          <p className="text-slate-300 text-lg leading-relaxed">
            可能是它一直有照做，也可能這種情況根本沒發生過。光看這一點，分不出來是哪一個。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
