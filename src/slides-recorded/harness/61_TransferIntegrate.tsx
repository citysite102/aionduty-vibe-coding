import { Plug } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * MCP 在前面只出現過一次就消失了。這一頁把它接回來，
 * 而且要接得夠具體：學員最常問的是「那我怎麼串我的 Notion」，
 * 所以直接把那三步寫出來，不要停在「接上 MCP 就好」。
 */
const STEPS = [
  { n: '1', t: '去 Notion 開一把整合金鑰', d: 'Settings 裡的 Connections，開完把那串貼著備用。' },
  { n: '2', t: '把要給它看的頁面分享給那個整合', d: '沒分享的它讀不到，等於資料夾沒綁進來。' },
  { n: '3', t: '在 Claude Code 裡加上這個連線', d: '加完打 /mcp 確認它出現在清單裡，跟 /context 是同一招。' },
];

export const meta: RecordedMeta = {
  id: 'harness-61-transfer-integrate',
  title: '那我怎麼串我自己的工具',
  script:
    '你不用為了這套東西改變工作方式，資料還是放在你原本的地方，接上去就好。以 Notion 為例，三步。第一步去 Notion 的設定裡開一把整合金鑰。第二步把你要給它看的那幾頁分享給那個整合，沒分享的它讀不到，這一步最常被漏掉。第三步在 Claude Code 裡加上這個連線，加完打斜線 mcp 確認它出現在清單裡，跟前面用斜線 context 確認手冊有沒有載入是同一招。串好之後，你不用再把 Notion 的內容複製貼上，它自己去查。換成 Slack、Google Drive 或公司內部系統，步驟是一樣的。',
  seconds: 45,
  from: 75,
};

export default function RecTransferIntegrate() {
  return (
    <SlideLayout title={meta.title} subtitle="Plug It In" icon={Plug}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-500 text-xl leading-relaxed mb-2">
            資料還是放在你原本的地方，接上去就好。以 Notion 為例：
          </p>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            串好之後<Key>它自己去查，你不用再複製貼上</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="flex gap-5 px-7 py-4 border-b border-slate-800/70 last:border-0"
            >
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 font-mono text-base font-bold text-slate-400">
                {s.n}
              </span>
              <div>
                <div className="text-slate-200 text-xl font-bold leading-snug">{s.t}</div>
                <p className="text-slate-500 text-lg leading-relaxed mt-1">{s.d}</p>
              </div>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 換成 Slack、雲端硬碟或公司內部系統，步驟一樣。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
