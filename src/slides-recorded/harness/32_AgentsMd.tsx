import { Share2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-32-agents-md',
  title: '換成別家的工具，還讀得到嗎？',
  script:
    '會有人擔心，寫了一份 CLAUDE.md，之後換成別家的工具是不是要重寫。不用。AGENTS.md 是目前跨工具的共通檔名，Codex、Cursor 這些都會讀它。做法是在專案裡建一個 AGENTS.md 的捷徑，指向同一份 CLAUDE.md，兩個檔名指的是同一個檔案，改一份、兩邊同時更新。這份簡報的專案就是這樣設定的。',
  seconds: 40,
  from: 55,
};

export default function RecAgentsMd() {
  return (
    <SlideLayout title={meta.title} subtitle="One File, Many Tools" icon={Share2} compact>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-2xl leading-snug">換工具要重寫一份嗎？</p>
          <p className="text-slate-100 text-5xl font-bold leading-snug mt-3">
            不用，<span className="text-sky-400">AGENTS.md</span> 是跨工具的共通檔名
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <div className="bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 font-mono text-lg text-slate-300">
            ln -s CLAUDE.md AGENTS.md
          </div>
          <p className="text-slate-400 text-xl leading-relaxed mt-4">
            建一個捷徑指向同一份檔案。改一份，兩個檔名同時更新。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">實例</span>
          <span className="text-slate-300 text-xl">這份簡報的專案就是這樣設定的</span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
