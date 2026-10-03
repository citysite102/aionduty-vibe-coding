import { Workflow } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CopyAction } from '../components/CopyBlock';

/**
 * 最後查證：2026-10-03，對照 code.claude.com/docs/en/workflows（Orchestrate subagents at
 * scale with dynamic workflows）。當時的現況，逐條對應畫面上寫的：
 *   - 定義：「A dynamic workflow is a JavaScript script that orchestrates many subagents at once.
 *     Claude writes the script for the task you describe, and a runtime executes it in the
 *     background while your session stays responsive.」
 *   - 跟子代理的差別（文件那張表的兩列）：Who decides what runs next → Claude, turn by turn ／
 *     The script；Where intermediate results live → Claude's context window ／ Script variables。
 *   - 叫出來的方式：`/deep-research` 是唯一的內建 workflow；自己的任務在 prompt 裡加
 *     `ultracode`，或「Asking in your own words, for example "use a workflow"」也算同一種 opt-in。
 *   - 方案與開關：「available on all paid plans… On Pro, turn them on from the Dynamic workflows
 *     row in /config」。所以免費方案沒有這個功能，Pro 要自己打開，這一句不要漏。
 *   - 代價：「a single run can use meaningfully more tokens… Runs count toward your plan's usage
 *     and rate limits」，以及超過 25 個 agent 會出現 Large workflow 警告。
 *   - 看進度與中止：`/workflows` 清單裡選一個按 `x` 停掉。
 *
 * 不要寫進投影片的兩件事（查到但對入門沒用）：腳本的 agent()/pipeline()/parallel() 寫法，
 * 以及 resume 的快取規則。學員這一頁的任務是知道有這個東西、叫得出來、知道它很貴。
 *
 * 這一頁接在 Slide 130 四種模式的第四種（流程腳本）後面，那一格有一行指過來。
 * 搬頁的時候兩邊要一起看（B-4）。
 */
const TRIGGERS: { cmd: string; label: string; desc: string; plain?: boolean }[] = [
  {
    cmd: '/deep-research',
    label: '內建的那一支，最省事',
    desc: '後面接一個問題。它分頭去查、互相對照，最後給你一份有附出處的報告。想先看看 workflow 長什麼樣，從這個開始。',
  },
  {
    cmd: 'ultracode',
    label: '你自己的任務',
    desc: '把這個字寫進你那句話裡，Claude 就不照平常一步一步做，而是先寫一支腳本把事情分出去。',
  },
  {
    cmd: '用你自己的話',
    // 這一格不是 Claude 的專有名詞，不上橘（A-1）
    plain: true,
    label: '不想記關鍵字',
    desc: '直接說「用 workflow 跑這件事」也算數，官方文件把它當成同一種開關。',
  },
];

const DEMO =
  'ultracode：把計時器的每一個功能列出來，一個一個檢查在手機上會不會壞掉，' +
  '每一條結論都要另一個 agent 覆核過再回報給我。';

export default function SlideM3Workflows() {
  return (
    <SlideLayout title="一次派很多個子代理：workflow 怎麼用" subtitle="Dynamic Workflows" icon={Workflow}>
      <div className="max-w-5xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
          第四種模式現在是 Claude Code 內建的功能。
          <strong className="text-slate-200">你描述任務，它寫一支腳本，由執行環境在背景跑</strong>，
          一次派出幾十個子代理，你這邊的對話照常用。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-sky-500/25 bg-sky-950/20 p-5">
            <div className="text-sky-300 font-bold text-base mb-2">你自己派子代理</div>
            <ul className="space-y-1.5 text-slate-400 text-sm leading-relaxed">
              <li>下一步派誰，Claude 每一回合現場決定。</li>
              <li>每一個結果都會回到你這段對話裡。</li>
              <li>適合一次幾件事。</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-indigo-500/25 bg-indigo-950/20 p-5">
            <div className="text-indigo-300 font-bold text-base mb-2">交給 workflow</div>
            <ul className="space-y-1.5 text-slate-400 text-sm leading-relaxed">
              <li>下一步派誰寫在腳本裡，照腳本跑。</li>
              <li>中間結果留在腳本的變數，只有最後的結論回到對話。</li>
              <li>所以它派得動幾十個，你的對話也不會被塞爆。</li>
            </ul>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-slate-200 text-sm font-bold mb-3">三種叫得出來的方式</div>
          <div className="space-y-2.5">
            {TRIGGERS.map((t) => (
              <div key={t.cmd} className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5">
                <div className="flex items-baseline gap-3 mb-1">
                  <code className={`font-mono font-bold text-sm ${t.plain ? 'text-slate-300' : 'text-orange-300'}`}>{t.cmd}</code>
                  <span className="text-slate-500 text-xs">{t.label}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-slate-200 text-sm font-bold mb-3">拿你的計時器試一次</div>
          <div className="rounded-lg border border-sky-900/50 bg-sky-950/20 px-3.5 py-2.5">
            <div className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-1.5">Prompt</div>
            <p className="text-sky-100 text-sm leading-relaxed">「{DEMO}」</p>
            <CopyAction text={DEMO} className="mt-2" />
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-3">
            送出之後它會先給你一張要跑哪幾個階段的清單，你按同意它才開始。
            跑的時候打 <code className="font-mono text-orange-300">/workflows</code>{' '}
            看每個階段派了幾個、花了多少 token，想停就在清單上按{' '}
            <code className="font-mono text-slate-300">x</code>。
          </p>
        </AnimatedBlock>

        <Callout tone="warn" stepIndex={5}>
          它很貴。一次跑掉的 token 比你在對話裡做同一件事多很多，而且一樣算進你方案的用量，
          所以先拿一個小範圍試（一個資料夾、一個窄一點的問題），不要第一次就整個專案丟下去。
          免費方案沒有這個功能；Pro 方案有，但要自己到{' '}
          <code className="font-mono text-orange-300">/config</code> 把 Dynamic workflows 打開。
        </Callout>

      </div>
    </SlideLayout>
  );
}
