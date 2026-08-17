import { PencilRuler } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 六個寫法講完之後原本沒有動手的頁面，整段就停在「看完」。
 * 前一頁（57_HandbookV4）是拿示範手冊改一條，這一頁是換成學員自己那份。
 *
 * 第一版只把判準寫成一句話：「另一個人只看做出來的東西，能不能回答有做到或沒做到」。
 * 那句話本身就是抽象的，學員讀完還是不知道改完應該長什麼樣。
 * 現在改成給一組看得見的對照：同一件事，一個答不出來、一個數一數就答得出來。
 * 判準留在口白裡講，畫面上只放那兩行，因為那兩行才是可以照著模仿的東西。
 *
 * 例子用這份簡報自己的規範（A-1 那條兩種強調色），不另編一個假的。
 */
const CHECK = [
  { ok: false, rule: '畫面要好看', why: '看著結果也答不出來' },
  { ok: true, rule: '一頁最多兩種強調色', why: '數一數就答得出來' },
];

export const meta: RecordedMeta = {
  id: 'harness-16b-write-practice',
  title: '換你改一條規則',
  script:
    '換你改一條。打開你自己那份手冊，挑最模糊的那一條，多半是帶形容詞的那一句。判準是這樣：另一個人只看做出來的東西，能不能回答有做到或沒做到。畫面要好看，答不出來，因為每個人的好看不一樣。改成一頁最多兩種強調色，數一數就答得出來。把你那一條交給它：這是我手冊裡的一條，照白名單、理由、例子、例外、一次一件幫我改寫。改完先自己數一次，數得出來才算改好。',
  seconds: 40,
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
          <FlowRow steps={['挑一條', '照六個寫法看一遍', '改寫', '自己數一次']} />
        </AnimatedBlock>

        {/* 改完長什麼樣。這一組是整頁的重點，判準那句話留給口白 */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900 px-7 py-2.5 text-base text-slate-500">
            改完要變成數得出來的
          </div>
          {CHECK.map((c) => (
            <div
              key={c.rule}
              className="flex items-baseline gap-4 px-7 py-4 border-b border-slate-800/70 last:border-0"
            >
              <span className={`text-xl font-bold shrink-0 ${c.ok ? 'text-emerald-400' : 'text-red-400'}`}>
                {c.ok ? '✓' : '✕'}
              </span>
              <span className={`text-xl leading-snug ${c.ok ? 'text-slate-100' : 'text-slate-400'}`}>
                {c.rule}
              </span>
              <span className="text-slate-500 text-lg ml-auto shrink-0">{c.why}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-7 py-4">
          <div className="font-mono text-base text-sky-400 mb-2">Prompt</div>
          <p className="text-sky-100 text-xl leading-relaxed">
            這是我手冊裡的一條：⋯。照白名單、理由、例子、例外、一次一件幫我改寫。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
