import { Boxes } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { StageMap } from './_StageMap';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * **口白刻意超過 45 秒（71 秒），不要砍回去。** 理由同 62_HookHowTo：
 * 這一組 2026-09-23 依講師回饋改成講得更細。原本三層的對照是一句話帶過
 * （「時機是⋯範圍是⋯動作是⋯」），講師回饋「太 AI，不夠白話」，
 * 現在改成一問一答，讓三個英文名詞落到具體的句子上。
 */
/**
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
  { stage: '什麼時候檢查', code: 'Event', note: '它要寫檔案之前' },
  { stage: '這一次要不要管', code: 'Matcher', note: '只有寫檔案跟改檔案要管' },
  { stage: '到底做什麼', code: 'Handler', note: '跑一支檢查，它會擋下來並說明哪裡不行' },
];

export const meta: RecordedMeta = {
  id: 'harness-63-hook-three-layers',
  title: '一條 Hook 拆開只有三層',
  script:
    '你寫的是一段設定，不用自己寫程式，而且拆開只有三層。第一層問什麼時候檢查，叫 Event。第二層問這一次要不要管，叫 Matcher。第三層問到底做什麼，叫 Handler。三個英文名詞聽起來很多，但拿這份簡報掛的那一條套進去，你就知道它在講什麼了。什麼時候檢查？它要寫檔案進去之前。這一次要不要管？只有寫檔案跟改檔案要管，它讀東西的時候不要來煩我。做什麼？去跑一支檢查，那支檢查會把不合規的擋下來，並且回一句話告訴它哪裡不行。畫面下面那段就是這份簡報真正的設定檔，括號比較多，但你只要找三個位置：箭頭標著時機的那一行是 PreToolUse，標著範圍的是 matcher，標著動作的是 command，後面接的就是要跑哪一支檢查。你打開自己那一份，長的也是這個樣子。三層要寫齊，最常漏掉的是中間那層範圍。',
  seconds: 71,
};

export default function RecHookThreeLayers() {
  return (
    <SlideLayout title={meta.title} subtitle="Anatomy of a Hook" icon={Boxes}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            你寫的是設定，<Key>不用自己寫程式</Key>
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
