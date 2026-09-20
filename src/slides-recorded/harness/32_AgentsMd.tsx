import { Share2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/*
 * 這一頁講的是 Claude Code 與 AGENTS.md 的關係，是全片最會過期的內容之一。
 * 最後查證：2026-09-19，對照 code.claude.com/docs/en/memory 的 AGENTS.md 一節。
 *
 * 當時的現況：v2.1.277 起 Claude Code 可以直接讀 AGENTS.md，但**預設只在
 * 工作目錄與上層都沒有 CLAUDE.md 時才讀**。要兩個都讀，到 /config 把
 * Project instructions 設成 claude-md-and-agents-md。
 *
 * 所以這一頁教的捷徑沒有過期：學員走完第五章手上一定有 CLAUDE.md，
 * 在他的專案裡 AGENTS.md 預設不會被讀到。官方對既有 symlink 的說法是
 * 「nothing, or delete the symlink. Either way Claude reads the content once」。
 * 原生支援解的是反方向（repo 本來就只有 AGENTS.md），跟這一頁的情境不同。
 *
 * 下次改版前先重查那一節，不要憑印象改。
 */

export const meta: RecordedMeta = {
  id: 'harness-32-agents-md',
  title: '換成別家的工具，還讀得到嗎？',
  script:
    '會有人擔心，寫了一份 CLAUDE.md，換成別家工具是不是要重寫。不用。AGENTS.md 是跨工具的共通檔名，Codex、Cursor 都會讀它。做法是建一個 AGENTS.md 的捷徑，指向同一份 CLAUDE.md，改一份兩邊同時更新，你不用自己打指令，跟它說一句就好。要補充的是，新版的 Claude Code 自己也讀得懂 AGENTS.md，但預設只在你沒有 CLAUDE.md 的時候才讀，所以你這種已經寫好手冊的情況，捷徑還是要做。',
  seconds: 40,
  from: 55,
};

export default function RecAgentsMd() {
  return (
    <SlideLayout title={meta.title} subtitle="One File, Many Tools" icon={Share2}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-2xl leading-snug">換工具要重寫一份嗎？</p>
          <p className="text-slate-100 text-4xl font-bold leading-snug mt-3">
            不用，<span className="text-sky-400">AGENTS.md</span> 是跨工具的共通檔名
          </p>
        </AnimatedBlock>

        {/*
          原本這一格只印 ln -s CLAUDE.md AGENTS.md。
          沒學終端機的人看到那一行就卡住了，而且他根本不需要自己打，
          交代一句話就會做完。指令降成註腳，跟它講的那句話才是主體。
        */}
        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <div className="text-slate-500 text-base mb-2">跟它說這句就好</div>
          <div className="bg-slate-950 border border-sky-900/50 rounded-xl px-6 py-4 text-sky-100 text-xl leading-relaxed">
            「幫我在專案裡建一個 AGENTS.md，做成指向 CLAUDE.md 的捷徑，不要複製成兩份。」
          </div>
          <p className="text-slate-400 text-xl leading-relaxed mt-4">
            改一份，兩個檔名同時更新。
            <span className="text-slate-600 text-base ml-2 font-mono">（實際做的是 ln -s CLAUDE.md AGENTS.md。Windows 建不了捷徑，改在 CLAUDE.md 開頭寫 @AGENTS.md，「@」是整份併進來）</span>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">實例</span>
          <span className="text-slate-300 text-xl">這份簡報的專案就是這樣設定的</span>
        </AnimatedBlock>
        {/* 2026-09 的新行為。這一格不用講得太細，設定值留給註腳。 */}
        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-2xl px-7 py-5">
          <div className="text-slate-500 text-base mb-2">2026 年 9 月之後</div>
          <p className="text-slate-300 text-xl leading-relaxed">
            新版的 Claude Code 自己也讀得懂 <span className="font-mono text-orange-300">AGENTS.md</span>，
            <strong className="text-slate-100">但預設只在你沒有 CLAUDE.md 的時候才讀。</strong>
            你寫過手冊了，所以捷徑還是要做。
            <span className="block text-slate-500 text-base mt-3">
              真的想兩個都讀，在 <span className="font-mono text-orange-300">/config</span> 把 Project instructions 改成兩份一起載入。
            </span>
          </p>
        </AnimatedBlock>

      </RecPage>
    </SlideLayout>
  );
}
