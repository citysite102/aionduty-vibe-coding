import { Filter } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { SeriesRail, HOOK_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * **口白刻意超過 45 秒（96 秒），不要砍回去。** 理由同 62_HookHowTo。
 * 另外 2026-09-23 修掉一個接續問題：原本開頭是「第二層是範圍，這一層最常被跳過。
 * 時機到了，這一輪它可能在讀檔案⋯」，「時機到了」是接前一頁的詞但沒有交代，
 * 講師回饋「前後有點不夠白話，教學口吻太怪了」。現在先問「為什麼需要它」再回答。
 */
/**
 * 最後查證：2026-10-03，對照 code.claude.com/docs/en/hooks。matcher 只比對工具名這點仍然成立，
 * 但「要限定資料夾只能在指令裡自己判斷」已經過期：現在 handler 上有 `if` 欄位，用 permission rule
 * 語法同時比對工具名與參數（文件原文舉的例子是「`"Edit(*.ts)"` runs only for TypeScript files」）。
 * 這一頁改成兩條路都講：有 if 可以宣告式地縮，沒用 if 才需要在指令裡自己判斷。
 *
 * 這一頁的 matcher 與工具清單，跟專案根目錄的 .claude/settings.json 綁在一起
 * （那一條真的掛著的 Hook）。改設定要回來改這一頁，否則「照抄真的那一條」的承諾就破了。
 * 2026-09-20 核對：實際是 Write|Edit|MultiEdit，當時投影片少了 MultiEdit，已補齊。
 */

/**
 * 第二層。這一層最容易被跳過，因為不寫它也能跑，只是會變成每一次都插手，
 * 然後你會開始覺得 Hook 很煩、想把它關掉。
 *
 * 上面那一行是設定檔裡真正的寫法，下面的膠囊是那一行的結果：哪幾個過得去。
 * 一行設定加一排結果，比一句「範圍要收窄」看得懂。
 *
 * 最後那一段是真的發生過：原本那條 hook 沒有限定資料夾，結果擋掉一支必須拿
 * 破折號當比對樣式的工具腳本，一連擋三次。學員記不住抽象的原則，記得住這種事。
 */
const TOOLS = [
  { name: 'Read', keep: false },
  { name: 'Bash', keep: false },
  { name: 'Write', keep: true },
  { name: 'Edit', keep: true },
  { name: 'MultiEdit', keep: true },
  { name: 'WebFetch', keep: false },
];

export const meta: RecordedMeta = {
  id: 'harness-65-hook-matcher',
  title: 'Hook 第二層：條件，只留你要管的工具',
  script:
    '第二層是範圍，也是最多人直接跳過的一層。為什麼需要它？因為你剛才選的那個時機，一輪對話裡會來很多次。以工具執行前來說，它可能正要讀一個檔案、可能要跑一行指令、也可能真的要寫檔案，每一次都會經過你這條 Hook。範圍那一行的作用，就是從裡面挑出你真正要檢查的那幾種。這份簡報掛的那一條寫了三個工具。Write 是整個檔案重寫一次，Edit 是把檔案裡某一處的文字換掉，MultiEdit 是一次換好幾處。三個都是在動你的檔案，所以三個都要管；Claude 讀東西的時候就不會被打擾。不寫這一行也能跑，但代價是它每一次動作都插手一遍，煩到最後你會自己把它關掉。這裡最容易誤會：範圍那一行挑的是工具，不是資料夾。那要怎麼限定資料夾？在同一條 Hook 裡多寫一個 if，像畫面上這個，只管 src 底下 api 那個資料夾。下一頁的五個例子裡會再用到兩次，連它的地雷一起講。不想用 if 的話，就得在下一層那支檢查裡自己判斷路徑，這份簡報那一支就是這樣寫的。這條一開始沒有挑檔案，結果連專案自己的工具腳本都被擋了三次。',
  seconds: 96,
};

export default function RecHookMatcher() {
  return (
    <SlideLayout title={meta.title} subtitle="Layer 2: Matcher" icon={Filter}>
      <RecPage className="space-y-5">
        <SeriesRail {...HOOK_RAIL} current={1} />

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            同一個時機會來很多次，<Key>挑你要檢查的</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <FlowRow steps={['時機到了', '看它在用哪個工具', '只有這幾個要檢查']} />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900 px-6 py-2.5 font-mono text-lg text-orange-300">
            matcher: Write|Edit|MultiEdit
          </div>
          <div className="px-6 pt-4 text-slate-500 text-base leading-relaxed">
            Write 整個檔案重寫一次，Edit 換掉檔案裡某一處，MultiEdit 一次換好幾處。
          </div>
          <div className="px-6 py-5 flex flex-wrap gap-3">
            {TOOLS.map((t) => (
              <span
                key={t.name}
                className={`rounded-xl border px-4 py-2 font-mono text-lg ${
                  t.keep
                    ? 'border-sky-500/40 bg-sky-500/10 text-sky-200'
                    : 'border-slate-800 bg-slate-900 text-slate-600'
                }`}
              >
                {t.keep ? '✓ ' : '✗ '}
                {t.name}
              </span>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 px-7 py-5">
          <div className="text-slate-100 text-xl font-bold mb-1">要再縮到某個資料夾或某種檔案</div>
          <p className="text-slate-500 text-base leading-relaxed mb-3">
            範圍那一行只挑工具。要挑檔案，在同一條 Hook 裡多寫一個{' '}
            <code className="font-mono text-orange-300">if</code>：
          </p>
          <div className="font-mono text-lg flex flex-wrap items-baseline gap-x-4">
            <span className="text-orange-300">if: Edit(src/api/**)</span>
            <span className="font-sans text-slate-500 text-base">只管這個資料夾底下的檔案</span>
          </div>
          <p className="text-slate-500 text-base leading-relaxed mt-3">
            下一頁的例子裡會再用到兩次。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="rounded-2xl border border-amber-900/40 bg-amber-950/20 px-7 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            範圍開太大會擋到不該擋的。這條原本沒挑檔案，連專案自己的工具腳本都被擋了三次。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
