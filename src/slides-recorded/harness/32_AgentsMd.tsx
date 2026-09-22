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
 * 2026-09-22 這一段（Slide 65 到 70）改走現場頁的字級，內容也講深了一層。
 * 講師的判斷是：這六頁夾在前後都是現場頁的中間，原本 rec 的大字級讓字忽大忽小，
 * 而且一頁只講一句話，三個追問（放哪／多長／換工具）各 45 秒，聽起來像三件不相干的事。
 * 所以這一頁的口白會超過 45 秒，`check:rec` 會提醒，那是預期中的，不要把它砍回 45 秒。
 * 要動的話，動的是「這一段要不要拆成兩支影片」，不是把內容削短。
 */

export const meta: RecordedMeta = {
  id: 'harness-32-agents-md',
  title: '換成 Codex 或 Cursor，手冊還讀得到嗎',
  script:
    '有些夥伴可能會想說：寫了一份 CLAUDE.md，換成別家工具是不是要整份重寫。不用。其實還有一個叫做 AGENTS.md 的檔案，它是跨工具的共通檔名，Codex、Cursor 都會讀。它最早是 OpenAI、Google、Cursor 幾家各自在做，後來收斂成同一個開放格式，現在跟 MCP 歸在同一個基金會底下。做法是在專案裡建一個 AGENTS.md，讓它指向同一份 CLAUDE.md。這個東西叫符號連結，英文是 symbolic link，指令是畫面上那一行，你不用自己打，把那句話跟它說就好。為什麼是連結，不是複製成兩份？兩份分開之後你只會記得改其中一份，過一陣子兩邊的規矩就不一樣，而你不知道該信哪一份。連結只有一份本體，改哪一邊都是同一個檔案。Windows 上建符號連結要管理員權限，嫌麻煩就用替代做法：在 CLAUDE.md 開頭寫一行 at AGENTS.md，那個符號的意思是把整份併進來。最後補一件事：新版的 Claude Code 自己也讀得懂 AGENTS.md，但預設只在你沒有 CLAUDE.md 的時候才讀。你已經寫好手冊了，所以那個連結還是要做。',
  seconds: 85,
  from: 55,
};

export default function RecAgentsMd() {
  return (
    <SlideLayout title={meta.title} subtitle="One File, Many Tools" icon={Share2}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-lg leading-snug">換工具要重寫一份嗎？</p>
          <p className="text-slate-100 text-2xl font-bold leading-snug mt-3">
            不用，<span className="text-sky-400">AGENTS.md</span> 是跨工具的共通檔名
          </p>
        </AnimatedBlock>

        {/*
          原本這一格只印 ln -s CLAUDE.md AGENTS.md。
          沒學終端機的人看到那一行就卡住了，而且他根本不需要自己打，
          交代一句話就會做完。指令降成註腳，跟它講的那句話才是主體。
        */}
        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <div className="text-slate-500 text-sm mb-2">跟它說這句就好</div>
          <div className="bg-slate-950 border border-sky-900/50 rounded-xl px-6 py-4 text-sky-100 text-base leading-relaxed">
            「幫我在專案裡建一個 AGENTS.md，做成指向 CLAUDE.md 的捷徑，不要複製成兩份。」
          </div>
          <p className="text-slate-400 text-base leading-relaxed mt-4">
            改一份，兩個檔名同時更新。
            <span className="text-slate-600 text-sm ml-2 font-mono">（符號連結：ln -s CLAUDE.md AGENTS.md。Windows 需管理員權限，替代做法是在 CLAUDE.md 開頭寫 @AGENTS.md）</span>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-sm shrink-0">實例</span>
          <span className="text-slate-300 text-base">這份簡報的專案就是這樣設定的</span>
        </AnimatedBlock>
        {/* 2026-09 的新行為。這一格不用講得太細，設定值留給註腳。 */}
        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-2xl px-7 py-5">
          <div className="text-slate-500 text-sm mb-2">2026 年 9 月之後</div>
          <p className="text-slate-300 text-base leading-relaxed">
            新版的 Claude Code 自己也讀得懂 <span className="font-mono text-orange-300">AGENTS.md</span>，
            <strong className="text-slate-100">但預設只在你沒有 CLAUDE.md 的時候才讀。</strong>
            你寫過手冊了，所以捷徑還是要做。
            <span className="block text-slate-500 text-sm mt-3">
              真的想兩個都讀，在 <span className="font-mono text-orange-300">/config</span> 把 Project instructions 改成兩份一起載入。
            </span>
          </p>
        </AnimatedBlock>

      </RecPage>
    </SlideLayout>
  );
}
