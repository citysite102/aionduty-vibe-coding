import { PencilRuler } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 六個寫法講完之後原本沒有動手的頁面，整段就停在「看完」。
 * 前一頁（57_HandbookV4）是拿示範手冊改一條，這一頁是換成學員自己那份。
 * 先看別人改，再改自己的，順序不要反。
 *
 * 判準沿用前一頁那一句，一字不改：那句話是這一段唯一的驗收方式，
 * 換句話說會讓學員以為是兩個標準。
 *
 * 沒有 from：這一頁不是從現行版拆出來的，是新寫的。
 */
export const meta: RecordedMeta = {
  id: 'harness-16b-write-practice',
  title: '換你改一條規則',
  script:
    '換你改一條。打開你自己那份手冊，挑最模糊的那一條，多半是帶形容詞的那一句，像是畫面要好看、程式要乾淨。把這句話交給它：這是我手冊裡的一條，照白名單、寫出理由、給例子、講清楚例外、一次只講一件這幾點幫我改寫。改完不要急著存，先拿判準驗一次：另一個人只看做出來的東西，能不能回答有做到或沒做到。答得出來才算改好，答不出來就是還有形容詞沒拆掉。',
  seconds: 42,
};

export default function RecWritePractice() {
  return (
    <SlideLayout title={meta.title} subtitle="Your Turn" icon={PencilRuler}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            挑你手冊裡<Key>最模糊的那一條</Key>
          </p>
          <p className="text-slate-500 text-lg leading-relaxed mt-2">多半是帶形容詞的那一句</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <FlowRow steps={['挑一條', '照六個寫法看一遍', '改寫', '拿判準驗']} />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-7 py-5">
          <div className="font-mono text-base text-sky-400 mb-2">Prompt</div>
          <p className="text-sky-100 text-xl leading-relaxed">
            這是我手冊裡的一條：⋯。照白名單、理由、例子、例外、一次一件幫我改寫。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 px-7 py-5">
          <div className="text-slate-500 text-base mb-2">改完拿這句驗</div>
          <p className="text-slate-300 text-xl leading-relaxed">
            另一個人只看做出來的東西，能不能回答「有做到」或「沒做到」。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 答不出來，就是還有形容詞沒拆掉。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
