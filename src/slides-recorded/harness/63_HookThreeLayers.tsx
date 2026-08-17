import { Boxes } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 前一頁講完為什麼要 Hook，這一頁給它的骨架，後面三頁各展開一層。
 * 先給骨架再展開，是因為 Event、Matcher、Handler 三個詞單獨出現都沒有意義，
 * 學員要先知道它們是同一條設定的三個欄位。
 *
 * 右欄一律填這份簡報真的掛著的那一條，三層才不是三個抽象名詞。
 *
 * 沒有 from：這一頁不是從現行版拆出來的，是新寫的。
 */
const LAYERS = [
  {
    n: '①',
    en: 'Event',
    ask: '什麼時候檢查',
    real: '每次要寫檔案之前',
  },
  {
    n: '②',
    en: 'Matcher',
    ask: '這一次要不要管',
    real: '只管會動到投影片的那幾個工具',
  },
  {
    n: '③',
    en: 'Handler',
    ask: '到底做什麼',
    real: '有破折號就擋下來，附一句理由',
  },
];

export const meta: RecordedMeta = {
  id: 'harness-63-hook-three-layers',
  title: '一條 Hook 拆開只有三層',
  script:
    '知道要掛 Hook 之後，接下來就是它長什麼樣。它是一段設定，不是程式，而且拆開只有三層。第一層 Event，什麼時候檢查。第二層 Matcher，這一次要不要管。第三層 Handler，條件過了到底做什麼。用這份簡報掛的那一條對回去你就知道它在講什麼：Event 是每次要寫檔案之前，Matcher 是只管會動到投影片的那幾個工具，Handler 是看到破折號就擋下來、附一句理由。三層都要寫齊。少了 Event 它不知道什麼時候該醒過來，少了 Matcher 它每一次都會插手，少了 Handler 就是醒過來卻什麼都不做。接下來三頁一層一層講。',
  seconds: 42,
};

export default function RecHookThreeLayers() {
  return (
    <SlideLayout title={meta.title} subtitle="Anatomy of a Hook" icon={Boxes}>
      <RecPage className="space-y-5" handbook={1}>
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            它是一段設定，<Key>不是程式</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="grid grid-cols-[1fr_1.4fr] gap-4 border-b border-slate-800 bg-slate-900 px-6 py-3 text-base text-slate-500">
            <span>它在問什麼</span>
            <span className="font-mono">這份簡報那一條的答案</span>
          </div>
          {LAYERS.map((l) => (
            <div
              key={l.en}
              className="grid grid-cols-[1fr_1.4fr] gap-4 px-6 py-4 border-b border-slate-800/70 last:border-0"
            >
              <div>
                <div className="font-mono text-lg font-bold text-sky-300">
                  {l.n} {l.en}
                </div>
                <div className="text-slate-400 text-lg mt-0.5">{l.ask}</div>
              </div>
              <span className="text-slate-300 text-lg self-center">{l.real}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 三層要寫齊。少了範圍那一層，它每一次都會插手。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
