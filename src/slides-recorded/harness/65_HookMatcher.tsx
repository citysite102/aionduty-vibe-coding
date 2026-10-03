import { Filter } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { SeriesRail, HOOK_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * **口白刻意超過 45 秒（177 秒），不要砍回去。** 理由同 62_HookHowTo。
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
  { name: 'Read', does: '讀一個檔案', keep: false },
  { name: 'Bash', does: '跑一行指令', keep: false },
  { name: 'WebFetch', does: '抓一個網頁', keep: false },
  { name: 'Write', does: '整個檔案重寫一次', keep: true },
  { name: 'Edit', does: '換掉檔案裡某一處', keep: true },
  { name: 'MultiEdit', does: '一次換好幾處', keep: true },
];

export const meta: RecordedMeta = {
  id: 'harness-65-hook-matcher',
  title: 'Hook 第二層：條件，只留你要管的工具',
  script:
    '第二層是範圍，也是最多人直接跳過的一層。先講為什麼需要它。上一層你選的時機是「它動手之前」。問題是，Claude 一輪對話裡會動手很多次：讀一個檔案是一次，跑一行指令是一次，寫一個檔案也是一次。每一次它動手之前，都會停下來問你這條 Hook：這一次要不要管？第二層就是在回答這個問題。舉個實際的例子你就有畫面了。假設你的時機選了「工具執行前」，然後你跟 Claude 說：幫我把計時器的按鈕文字改成補給。它接下來會做好幾件事。第一，它要先讀 index.html 看現在長什麼樣，這是一次動手，你這條 Hook 被叫起來一次。第二，它可能跑一行指令看看資料夾裡有什麼檔案，Hook 又被叫起來一次。第三，它才真的改那個檔案，Hook 第三次被叫起來。你其實只想檢查最後那一次，前面兩次它只是在看東西。範圍那一行就是在這裡把前面兩次放掉。畫面上那六個是 Claude 手上的工具，不是時機，這裡要分清楚：時機是上一層選的，這一層挑的是工具。六個分別是：Read，它用來讀一個檔案；Bash，用來跑一行指令；WebFetch，用來抓一個網頁；Write，用來把整個檔案重寫一次；Edit，用來換掉檔案裡某一處；MultiEdit，用來一次換好幾處。這份簡報掛的那一條只留後面三個，因為那三個都是在動我的檔案。這樣 Claude 讀東西、查資料的時候就不會被打擾。不寫這一行也能跑，但代價是它每一次動作都插手一遍，煩到最後你會自己把它關掉。還有一件事很容易誤會：範圍只挑得到工具，挑不到資料夾。你寫 Write，意思是「只要它在寫檔案就要管」，不管它寫的是哪一個資料夾。那如果我只想管某一個資料夾呢？那就在這條 Hook 裡再加一行 if，像畫面上這一行：Edit 括號 src 斜線 api 斜線兩顆星，意思是只有改到 src 底下 api 那個資料夾的檔案，才要檢查。這件事我自己踩過。這份簡報有一支小程式，工作是檢查簡報裡有沒有用到被禁的字，而它要比對那個字，裡面就必須寫出那個字。結果 Hook 一看到就把它擋下來，連擋三次，因為那條 Hook 當時只挑了工具，沒有限定資料夾。',
  seconds: 177,
};

export default function RecHookMatcher() {
  return (
    <SlideLayout title={meta.title} subtitle="Layer 2: Matcher" icon={Filter}>
      <RecPage className="space-y-5">
        <SeriesRail {...HOOK_RAIL} current={1} />

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            一輪對話裡，它會動手很多次，<Key>挑你要管的那幾次</Key>
          </p>
          <p className="text-slate-500 text-xl leading-relaxed mt-2">
            讀檔案、跑指令、寫檔案，每一次都會問這條 Hook。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <FlowRow steps={['時機到了', '它在用哪個工具', '這幾個才檢查']} />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900 px-6 py-2.5">
            <div className="font-mono text-lg text-orange-300">matcher: Write|Edit|MultiEdit</div>
            <div className="text-slate-500 text-base mt-1">
              底下六個是工具，不是時機。
            </div>
          </div>
          <div className="px-6 py-5 grid grid-cols-3 gap-3">
            {TOOLS.map((t) => (
              <div
                key={t.name}
                className={`rounded-xl border px-4 py-2.5 ${
                  t.keep
                    ? 'border-sky-500/40 bg-sky-500/10'
                    : 'border-slate-800 bg-slate-900'
                }`}
              >
                <div className={`font-mono text-lg ${t.keep ? 'text-sky-200' : 'text-slate-600'}`}>
                  {t.keep ? '✓ ' : '✗ '}
                  {t.name}
                </div>
                <div className="text-slate-500 text-base mt-0.5">{t.does}</div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 px-7 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            挑得到工具，挑不到資料夾。要縮到某一個資料夾，加一行{' '}
            <code className="font-mono text-orange-300">if</code>：
          </p>
          <div className="font-mono text-lg mt-2 flex flex-wrap items-baseline gap-x-4">
            <span className="text-orange-300">if: Edit(src/api/**)</span>
            <span className="font-sans text-slate-500 text-base">只管這個資料夾底下</span>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="rounded-2xl border border-amber-900/40 bg-amber-950/20 px-7 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            這條一開始沒加 if，連檢查用字的那支小程式都被擋了三次。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
