import { ShieldX } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { AskFirst } from '../../components/AskFirst';
import { SeriesRail, ROUTE_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-05-route-q1',
  title: '規則放哪：會出事的，交給 Hook',
  script:
    '所以先決定位置，再回頭修句子。拿到一條規則，照順序問四個問題，第一個答是的，就是它該去的地方。第一個問題：違反了會出事，絕對不能發生嗎？如果是，交給 Hook 或 CI，就是前面看過的那兩道關卡。它們都不在對話裡，是程式在擋，不經過 AI 判斷，所以它忘不掉也繞不過。Hook 擋你這台機器，CI 擋整個團隊。像是不能把密碼或金鑰寫進程式碼裡，這種就屬於這一層。',
  seconds: 42,
  from: 69,
};

export default function RecRouteQ1() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={ShieldX}>
      <RecPage>
        <SeriesRail {...ROUTE_RAIL} current={0} revealAt={2} />

        {/*
          這一頁是四題的第一題，所以它得多交代一句規則怎麼用。那句話原本放在卡片裡面、
          排在題目之前，於是這一頁的開場是一段小灰字，而 Q2 到 Q4 的開場都是題目本身，
          連著播就會覺得這一頁的版面跟其他三頁不一樣。
          把它移到卡片外面當整頁的引言，卡片裡就跟另外三頁對齊了：題目、停一下、答案。
        */}
        <AnimatedBlock stepIndex={1} as="p" className="text-slate-400 text-xl leading-relaxed mb-5">
          先決定位置，再回頭修句子。照順序問四題，第一個答「是」的就是它該去的地方。
        </AnimatedBlock>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <AnimatedBlock stepIndex={1}>
            <p className="text-slate-300 text-2xl leading-snug mb-6">違反了會出事，絕對不能發生？</p>

            <AskFirst />
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="mt-7">
            <p className="text-sky-300 text-4xl font-bold mb-5 leading-snug">交給 Hook 或 CI</p>

            <p className="text-slate-400 text-xl leading-relaxed">
              這兩道關卡都不在對話裡，是程式在擋，不經過 AI 判斷，所以它忘不掉也繞不過。Hook 擋你這台機器，CI 擋整個團隊。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={3} className="mt-5 flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">例如</span>
          <span className="text-slate-300 text-xl">不能把密碼或金鑰寫進程式碼裡</span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
