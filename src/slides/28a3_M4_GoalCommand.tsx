import { Flag, Terminal, Scale, Fence, Boxes, ExternalLink, ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';
import { Callout } from '../components/Callout';

/**
 * 8-1 與 8-2 整段教的是手寫那四段話（目標、什麼叫做完、怎麼驗、邊界），
 * 而 Claude Code 已經有 /goal 直接吃「什麼叫做完」那一段。學員一打 /help
 * 就會看到它，整章不提會顯得停在去年。
 *
 * 但這一頁不是要取代前面那套。條件本身還是學員要寫，/goal 替他做的只有
 * 「每一輪自動再跑一次」。開場第一段就把這件事講死，不要讓學員以為手寫那段可以跳過。
 *
 * 排在「你在旁邊看什麼」後面：先自己盯過三輪，才知道 /goal 幫你省掉的是哪一段。
 * 範例條件沿用計時器那五題與「最多 5 輪」，跟前面兩頁對得起來，不要換題目。
 *
 * 收尾那段是這一頁真正的重點：判定的模型只讀得到對話裡秀出來的東西，
 * 所以它跟「它有可能用講的宣稱驗過了」是同一個風險，不要刪掉。
 *
 * /loop 的正名放在這裡而不是「與其自己一直下提示」那一頁：名稱撞的是那一頁沒錯，
 * 但那頁右欄的內容區已經溢出（量過，可捲高度比可視高度多兩百多），再加一塊會捲到看不見。
 * 放這裡對比反而更利落，讀者眼前就是 /goal。tone 用 muted 是為了不跟上面那個 focus 搶。
 */
const BLOCKS = [
  {
    icon: Terminal,
    tag: '怎麼用',
    title: '打完就開跑，不用再送一句話',
    body: '後面接你的條件，按下去就開始做。打 /goal 不帶東西看進度，打 /goal clear 收手。一個對話一次只能有一個目標。',
  },
  {
    icon: Scale,
    tag: '誰來驗收',
    title: '驗收的是另一個模型，不是做事的那一個',
    flow: ['你的條件＋這段對話', '送給另一個小模型', '三種答案'],
    verdicts: ['還沒到 → 繼續，理由當成下一輪的方向', '達成 → 結束', '做不到 → 也結束'],
    body: '因為驗收的不是同一個模型，做事的那一個就不能用一句「做好了」把自己放行。',
  },
  {
    icon: Fence,
    tag: '它管不到的',
    title: '權限沒有變鬆，輪數要自己寫進條件',
    body: '它不會放寬權限，該問你的照樣會問。輪數也要自己寫進條件，它沒有內建上限。',
  },
];

/*
  2026-10-05：原本只寫「/goal 五題全部通過」。問題是 CLAUDE.md A-4 那一條：
  把複製鈕吃的字串單獨讀一遍，它自己說得通嗎？「五題」在這裡沒有指涉，
  學員貼過去，那個判定模型也不知道是哪五題，會自己編一組出來。
  所以五題照抄 28a_M4_LoopPractice 的 PROMPT，**改那一頁的五題要回來改這裡**。
*/
/**
 * ── 三家都有 `/goal`（C-1）────────────────────────────────────────────
 * 最後查證：2026-10-05。三家的指令名稱目前剛好一樣，但停的方式不一樣，
 * 而「它什麼時候會停下來問你」正是章節八那五道邊界在管的事，所以這一塊要留。
 *
 *   Claude Code      課程主線，機制寫在上面那三格。
 *   OpenAI Codex CLI `/goal` 在 v0.128.0（2026-04-30）以實驗功能加入，
 *                    v0.133.0 起預設開啟。官方說法是跑到目標達成、
 *                    或設定的 token 預算用完為止。
 *                    出處：simonwillison.net/2026/Apr/30/codex-goals/
 *   Google           **Gemini CLI 已經不是找得到它的地方**：Google 2026-06-18 對消費者帳號
 *                    收掉 Gemini CLI，換成 Antigravity CLI（指令是 agy）。
 *                    官方 slash command 文件原話：「Instructs the agent to work
 *                    continuously until the specified objective is fully achieved」，
 *                    並且「without pausing for turn-by-turn confirmations」。
 *                    出處：antigravity.google/docs/slash-commands/
 *
 * 這一類（別人家產品的指令名稱與行為）是 C-3 最會過期的那一種。
 * 下次改版前三個都重查一次，名字對不上就整塊拿掉，不要只改一個。
 * Gemini CLI 那一行尤其要看：那是「學員去搜會搜到舊東西」的坑，不是補充。
 */
const CROSS_TOOL = [
  { tool: 'Claude Code', note: '每一輪交給另一個比較小的模型判定，回還沒到、達成、做不到。' },
  { tool: 'OpenAI Codex CLI', note: '2026 年 4 月才加進去。跑到目標達成，或你設的 token 預算用完為止。' },
  { tool: 'Google Antigravity', note: '文件寫的是「不停下來逐輪確認」。Gemini CLI 已經收掉，換成它。' },
];

const GOAL_LINE = `/goal 下面五題全部通過才算達成：
1. 三顆按鈕都點得到，點下去大字分別變成 15:00 / 25:00 / 50:00
2. 倒數進行中點另一顆，先停下來換成新時間，不會自己開始跑
3. 按「返航」之後回到目前選的那個時間，不是固定回 25:00
4. 瀏覽器 Console 沒有紅字
5. 沒有引用任何外部圖片
最多跑 5 輪，還沒全過就停下來，告訴我卡在第幾題`;

export default function SlideGoalCommand() {
  return (
    <SlideLayout
      title="/goal：條件寫一次，它自己跑到達成"
      subtitle="The Built-in Version"
      icon={Flag}
    >
      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          剛才那段話裡最花力氣的是【什麼叫做完】那五題。Claude Code 有一個內建指令直接吃那一段：
          你把條件寫成一句話，它自己跑到條件成立為止。
          <strong className="text-slate-100">它替你做的只有一件事：每一輪自動再跑一次。</strong>
          條件長什麼樣，還是你寫。
          {/*
            2026-10-04：學員上一頁才手寫完四個中括號，這一頁就冒出一個內建指令吃掉那一段，
            最可能的結論是「原來剛才那段是白寫的」。這一句把取捨講明：/goal 吃的是其中兩塊，
            另外兩塊（目標、邊界）還是要你自己交代。**不要刪。**
          */}
          <span className="block mt-2 text-slate-400">
            手寫那四塊不是白寫的：<code className="font-mono text-orange-300">/goal</code>{' '}
            吃的是其中兩塊（什麼叫做完、怎麼驗），目標跟邊界還是要你自己講一次。
            差別只在誰發動下一輪。
          </span>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <CopyBlock text={GOAL_LINE} note="條件就是你剛才寫過的那五題，換一種送法" size="xs" />
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BLOCKS.map((b, i) => {
            const Icon = b.icon;
            return (
              <AnimatedBlock
                key={b.tag}
                stepIndex={i + 3}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 flex flex-col"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon size={16} className="text-sky-400 shrink-0" />
                  <span className="font-mono text-sm font-bold text-sky-300">【{b.tag}】</span>
                </div>
                <div className="text-slate-100 text-base font-bold leading-snug mb-2">{b.title}</div>
                {b.flow && (
                  <div className="mb-2 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                      {b.flow.map((s, k) => (
                        <span key={s} className="flex items-center gap-1.5">
                          {k > 0 && <ArrowRight aria-hidden="true" size={12} className="text-slate-600 shrink-0" />}
                          <span className="rounded border border-slate-800 bg-slate-950 px-2 py-0.5 text-slate-300 text-sm">{s}</span>
                        </span>
                      ))}
                    </div>
                    {b.verdicts?.map((v) => (
                      <div key={v} className="text-slate-400 text-sm leading-relaxed pl-2 border-l border-slate-800">{v}</div>
                    ))}
                  </div>
                )}
                <p className="text-slate-400 text-sm leading-relaxed">{b.body}</p>
              </AnimatedBlock>
            );
          })}
        </div>

        <Callout tone="focus" label="它只看得到對話裡秀出來的東西" stepIndex={6}>
          驗收的那個模型不會自己跑指令，也不會開檔案來看。
          <strong className="text-slate-100">它只讀得到 Claude 在對話裡印出來的東西。</strong>
          所以【怎麼驗】不能省，條件要寫成「它印得出證據」的樣子（逐題列出通過或失敗，而不是只說「修好了」）。
          它說達成的時候，你還是要自己點一次。
        </Callout>

        <AnimatedBlock stepIndex={7} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2.5 mb-1.5">
            <Boxes size={18} className="text-slate-400 shrink-0" />
            <h4 className="text-base font-bold text-slate-100">
              三家的 CLI 現在都有這個功能，而且剛好都叫 <code className="font-mono text-orange-300">/goal</code>
            </h4>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            {CROSS_TOOL.map((c) => (
              <div key={c.tool} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="text-sm font-bold text-slate-200 mb-1.5">{c.tool}</div>
                <p className="text-sm text-slate-400 leading-relaxed">{c.note}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 leading-relaxed mt-3 border-t border-slate-800 pt-3">
            名字一樣，不代表行為一樣。
            <strong className="text-slate-300">差最多的是「它什麼時候會停下來問你」</strong>，
            而那正是前面那五道邊界在管的事。換一個工具之前，先去看它那一條怎麼寫。
          </p>
          <p className="text-xs text-slate-600 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>出處（2026-10-05 查證）</span>
            <a
              href="https://simonwillison.net/2026/Apr/30/codex-goals/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-sky-400"
            >
              Codex CLI 0.128.0 adds /goal <ExternalLink size={11} />
            </a>
            <a
              href="https://antigravity.google/docs/slash-commands/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-sky-400"
            >
              Antigravity 官方 slash commands <ExternalLink size={11} />
            </a>
          </p>
        </AnimatedBlock>

        <Callout tone="muted" label="別跟 /loop 搞混" stepIndex={8}>
          打 <span className="font-mono text-slate-100">/</span> 的時候你會看到一個
          <code className="font-mono text-orange-300 mx-1">/loop</code>，它做的是另一件事：
          照時間間隔重複跑同一句話，例如每五分鐘看一次部署好了沒，用來盯一個還在跑的東西。
          要它自己改一輪、驗一輪跑到條件成立的，是 <code className="font-mono text-orange-300">/goal</code>。
        </Callout>

      </div>
    </SlideLayout>
  );
}
