import { Presentation, Terminal, AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 這一頁的價值在於它是真的。節錄一律照抄專案根目錄那份 CLAUDE.md，
 * 不要為了好看改寫，改寫過就跟其他頁的示範沒有差別了。
 *
 * 版面刻意做成檔案檢視的樣子（行號、等寬字、深底），
 * 因為這一頁的主張就是「這是一個真的檔案」，做成一般的卡片列表會失去那個意思。
 *
 * 每一條拆成三段：規則原文、句子裡真正的重點（sky）、這條的由來（amber）。
 * 學員最缺的不是規則範例，是「規則從哪裡來」，答案都一樣：出過一次事。
 */
const RULES = [
  {
    line: 34,
    before: '同一頁最多兩種強調色，',
    key: '沒有語意的地方就用灰階。',
    after: '',
    why: '一開始每頁配色都不一樣，翻起來像十個人各做各的。',
  },
  {
    line: 121,
    before: '只用內建色階。slate-850 這種色階',
    key: '不會報錯，typecheck 也會過，',
    after: '但邊框會直接不渲染。',
    why: '這個錯犯過三次，每次都花二十分鐘才找到。',
  },
  {
    line: 58,
    before: '禁止常駐無限動畫。特別注意 map 裡的條件式 class，',
    key: '一行程式可能生出七個閃爍點。',
    after: '',
    why: '後半句是後來補的。第一次只寫前半句，它照樣寫出了七個閃爍點。',
  },
];

const INIT_STEPS = [
  { n: '1', t: '打 /init', d: '它會把整個專案讀過一遍。' },
  { n: '2', t: '它產出第一版', d: '寫的是它從檔案裡看得出來的：用什麼框架、資料夾怎麼分。' },
  { n: '3', t: '你刪掉猜的', d: '補上它看不到的。通常會刪掉一半，這一步才是重點。' },
];

export default function SlideThisDeck() {
  return (
    <SlideLayout title="這份簡報就是這樣做出來的" subtitle="How This Deck Was Built" icon={Presentation}>
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-8">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            你現在看到的這一整份<strong className="text-sky-300">沒有用簡報軟體</strong>，
            它是一個網頁專案。下面這份照抄，沒有為了上台好看而改寫。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-4 items-start">

          <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
            <div className="flex items-baseline gap-3 border-b border-slate-800 bg-slate-900 px-5 py-2.5">
              <span className="font-mono text-sm text-slate-300">CLAUDE.md</span>
              <span className="text-xs text-slate-600">節錄三條</span>
            </div>

            <div className="divide-y divide-slate-800/70">
              {RULES.map((r) => (
                <div key={r.line} className="px-5 py-4">
                  <div className="flex gap-4">
                    <span className="font-mono text-xs text-slate-700 shrink-0 pt-1 tabular-nums">{r.line}</span>
                    <p className="font-mono text-sm leading-relaxed text-slate-400">
                      {r.before}
                      <strong className="text-sky-300 font-bold">{r.key}</strong>
                      {r.after}
                    </p>
                  </div>

                  <div className="flex gap-2.5 mt-2.5 pl-10">
                    <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-amber-200/70 text-xs leading-relaxed">{r.why}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 bg-slate-900/60 px-5 py-3.5">
              <p className="text-slate-400 text-xs leading-relaxed">
                還有一條沒寫在這裡：<strong className="text-slate-200">中文不要用破折號。</strong>
                寫進手冊沒用，它會忘，所以做成 Hook 擋下來。
                <span className="text-slate-500">這就是分流四問的第一題，會出事的交給機制。</span>
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="space-y-3">
            <div className="rounded-2xl border border-sky-500/40 bg-sky-950/25 px-5 py-4">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Terminal size={15} className="text-sky-400 shrink-0" />
                <span className="font-mono text-lg font-bold text-sky-300">/init</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                換你試。不用從空白開始，你已經有的專案就是素材。
              </p>
            </div>

            {INIT_STEPS.map((s) => (
              <div key={s.n} className="flex gap-3.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 font-mono text-xs font-bold text-slate-400">
                  {s.n}
                </span>
                <div>
                  <h4 className="text-slate-100 font-bold text-sm mb-0.5">{s.t}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </AnimatedBlock>

        </div>

        <AnimatedBlock
          stepIndex={4}
          className="rounded-2xl border border-slate-800 border-l-4 border-l-sky-500 bg-slate-950 px-6 py-4"
        >
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-slate-100">`/init` 產出的是它從檔案裡推得出來的東西。</strong>
            你腦裡那些「為什麼要這樣」「什麼絕對不能做」，它一個都看不到。
            上面那三條的橘字，就是它猜不到、只有你寫得出來的部分。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
