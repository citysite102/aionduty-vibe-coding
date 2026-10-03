import { Boxes } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { StageMap } from './_StageMap';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * **口白刻意超過 45 秒（96 秒），不要砍回去。** 理由同 62_HookHowTo：
 * 這一組 2026-09-23 依講師回饋改成講得更細。原本三層的對照是一句話帶過
 * （「時機是⋯範圍是⋯動作是⋯」），講師回饋「太 AI，不夠白話」，
 * 現在改成一問一答，讓三個英文名詞落到具體的句子上。
 */
/**
 * 2026-10-03（第二輪）把「你寫的是設定，不用自己寫程式」改掉。學員問：這是指設定攔截條件，
 * 還是指叫 AI 幫你寫程式？會含糊是因為那句話把三層混成一句，而且跟 Slide 80 自打臉
 * （那一頁現在直接秀 slide-guard.mjs 的程式）。精確的講法是：**前兩層是從清單裡挑一個，
 * 第三層才是你要它做的事**；簡單的一行指令就夠，複雜的要寫成一支小程式，請 Claude 寫、你負責驗收。
 *
 * 2026-10-03（第三輪）「前兩層是填空，第三層指到一支檢查」再改一次。講師說讀起來像反了：
 * 第一層的欄位名當時叫「什麼時候**檢查**」，而大字又說第三層才是「一支**檢查**」，
 * 同一個詞指到兩層去。現在三個欄位改成「什麼時候／哪幾次要管／要做什麼」，
 * 大字改成「前兩層挑條件，第三層才是要做的事」，「填空」這個詞一併拿掉。
 *
 * 2026-10-03 修掉畫面與口白對不起來的地方。原本那段設定檔是手寫的簡寫
 * （三行：`PreToolUse` ／ `matcher: ...` ／ `command: ...`），有兩個問題：
 *   1. 口白說「做什麼？把這次擋下來，然後告訴它哪裡不行」，但畫面上的動作那一行寫的是
 *      `command: ...`，三個點什麼都沒說，學員對不到。現在那一行印的是真的值
 *      （`node scripts/slide-guard.mjs`），口白也改成「去跑一支檢查，那支檢查會擋下來並回一句理由」。
 *   2. 口白說「你打開自己那一份也會看到同樣的三行」，但真的 `.claude/settings.json` 是巢狀 JSON，
 *      不是那三行。現在畫面照抄專案根目錄那一份的結構（只把 command 的值換成短版），
 *      並用箭頭標出三個位置，口白改成「括號比較多，但你只要找三個位置」。
 * **這一段要跟 .claude/settings.json 的實際內容對得起來**，改設定要回來改這一頁。
 *
 * 前一頁講完為什麼要 Hook，這一頁給骨架，後面三頁各展開一層。
 * 先給骨架再展開，是因為 Event、Matcher、Handler 三個詞單獨出現都沒有意義，
 * 學員要先知道它們是同一段設定的三個位置。
 *
 * 上排是白話的問題，下排是設定裡的名稱，note 填這份簡報真的掛著的那一條的答案。
 * 下面再貼一次那個檔案長什麼樣，是為了讓「三個名詞」跟「三行設定」對得起來，
 * 學員之後打開自己的檔案才認得出哪一行是哪一層。
 *
 * note 是完整的答案，不要縮寫。原本寫成「只管寫檔案那幾個」「擋下來，附理由」，
 * 那是寫的人腦裡已經有答案才看得懂的簡寫：「那幾個」是哪幾個沒有講，
 * 「附理由」附給誰看也沒有講。一格多五個字，換一句讀得懂的話。
 *
 * 沒有 from：這一頁不是從現行版拆出來的，是新寫的。
 */
const LAYERS = [
  { stage: '什麼時候', code: 'Event', note: 'Claude 要寫檔案之前' },
  { stage: '哪幾次要管', code: 'Matcher', note: '只有寫檔案跟改檔案那幾次' },
  { stage: '要做什麼', code: 'Handler', note: '跑一支檢查，它會擋下來並說明哪裡不行' },
];

export const meta: RecordedMeta = {
  id: 'harness-63-hook-three-layers',
  title: 'Hook 的三層機制',
  script:
    '一條 Hook 拆開只有三層，而前兩層都是從清單裡挑一個，真正要想的是第三層。第一層問什麼時候，叫 Event。第二層問哪幾次要管，叫 Matcher。第三層問要做什麼，叫 Handler。拿這份簡報掛的那一條套進去就很好懂。什麼時候？Claude 要寫檔案進去之前。哪幾次要管？只有寫檔案跟改檔案那幾次，它讀東西的時候不要來煩我。要做什麼？去跑一支檢查，那支檢查會把不合規的擋下來，並且回一句話告訴它哪裡不行。畫面下面那段就是這份簡報真正的設定檔，括號比較多，你只要找三個位置：標著時機的那一行是 PreToolUse，標著範圍的是 matcher，標著動作的是 command，後面接的就是要跑哪一支檢查。等一下換你掛一條，掛完打開那個檔案，看到的也是這個形狀。那「不用自己寫程式」是什麼意思？時機跟範圍這兩層是從清單裡挑一個，沒有什麼好寫的。第三層才看情況：要做的事簡單，一行指令就好；複雜的要寫成一支小程式，像這份簡報這一支就有一百多行。但那支不用你自己寫，你把要擋什麼講清楚，請 Claude 寫，你負責測一次。三層要寫齊，最常漏掉的是中間那層範圍。',
  seconds: 96,
};

export default function RecHookThreeLayers() {
  return (
    <SlideLayout title={meta.title} subtitle="Anatomy of a Hook" icon={Boxes}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            前兩層挑條件，<Key>第三層才是要做的事</Key>
          </p>
          <p className="text-slate-500 text-xl leading-relaxed mt-2">
            要做的事簡單的話，一行指令就好；複雜的要寫成一支小程式，那支請 Claude 幫你寫。
          </p>
        </AnimatedBlock>

        {/* 下排的灰字是「這份簡報那一條」的答案，不先講一句，讀者不知道那幾句在回答什麼 */}
        <AnimatedBlock stepIndex={2}>
          <div className="text-slate-500 text-base mb-3">灰字是這份簡報掛的那一條的答案</div>
          <StageMap items={LAYERS} />
        </AnimatedBlock>

        {/* 三個名詞對三個位置。縮排照真實檔案，學員打開自己那份才認得出來 */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900 px-6 py-2.5 font-mono text-base text-slate-500">
            .claude/settings.json
          </div>
          <div className="px-6 py-4 font-mono text-base leading-relaxed text-slate-400">
            <div>&quot;hooks&quot;: {'{'}</div>
            <div className="flex gap-3 pl-4">
              <span className="text-orange-300">&quot;PreToolUse&quot;</span>
              <span>: [ {'{'}</span>
              <span className="font-sans text-slate-600">← 時機</span>
            </div>
            <div className="flex gap-3 pl-10">
              <span className="text-orange-300">&quot;matcher&quot;: &quot;Write|Edit|MultiEdit&quot;</span>
              <span className="font-sans text-slate-600">← 範圍</span>
            </div>
            <div className="pl-10">&quot;hooks&quot;: [ {'{'} &quot;type&quot;: &quot;command&quot;,</div>
            <div className="flex gap-3 pl-14">
              <span className="text-orange-300">&quot;command&quot;: &quot;node scripts/slide-guard.mjs&quot;</span>
              <span className="font-sans text-slate-600">← 動作</span>
            </div>
            <div className="pl-10">{'}'} ]</div>
            <div className="pl-4">{'}'} ]</div>
            <div>{'}'}</div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 三層要寫齊。沒寫範圍，它每一次用工具都會跳出來檢查。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
