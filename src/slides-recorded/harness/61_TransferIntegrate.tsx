import { BookOpen, Plug } from 'lucide-react';
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
  { n: '1', t: '照官方指令加入 Notion MCP', d: 'claude mcp add --transport http notion https://mcp.notion.com/mcp' },
  { n: '2', t: '在 Claude Code 跑 /mcp 完成登入', d: '跟著瀏覽器的 OAuth 流程授權，不需要自己架伺服器。' },
  { n: '3', t: '用 /mcp 與 /context 確認有沒有接上', d: '先確認連線與 token 用量，再請它查 Notion 裡的資料。' },
];

const DOCS = [
  { t: 'Claude Code MCP', u: 'code.claude.com/docs/en/mcp' },
  { t: 'Notion MCP', u: 'developers.notion.com/guides/mcp/get-started-with-mcp' },
];

export const meta: RecordedMeta = {
  id: 'harness-61-transfer-integrate',
  title: '規矩寫完了，但你的資料不在這台電腦上',
  script:
    '前面幾頁處理的是規矩，寫在哪、用什麼方式擋。還有一件事沒解決：你的資料多半不在這台電腦上，它在 Notion、在雲端硬碟、在公司的系統裡。你不用為了這套東西改變工作方式，資料還是放在你原本的地方，接上去就好。以 Notion 為例，照官方文件現在是三步。第一步在終端機加入官方的 Notion MCP 連線。第二步回到 Claude Code 跑斜線 mcp，跟著瀏覽器完成 OAuth 登入，不需要自己架伺服器，也不需要自己保管一串整合金鑰。第三步用斜線 mcp 和斜線 context 確認它有沒有接上，以及這個連線佔了多少 token。串好之後，你不用再把 Notion 的內容複製貼上，它自己去查。換成其他支援 MCP 的工具，判斷方式一樣：先找官方文件，再確認權限與範圍。',
  seconds: 45,
  from: 75,
};

export default function RecTransferIntegrate() {
  return (
    <SlideLayout title={meta.title} subtitle="Plug It In" icon={Plug}>
      <RecPage className="space-y-5">
        {/*
          原本第一句就跳到 Notion，但前一頁收在「五行規矩各自該怎麼擋」，
          讀者不知道為什麼突然講起串工具。標題的「那我怎麼串⋯」也在回應一個
          前面沒有被提出的問題。先講清楚這裡換了一個維度：前面處理規矩，這裡處理資料。
        */}
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-500 text-xl leading-relaxed mb-2">
            規矩解決完了，還有一件事：你的資料多半不在這台電腦上。
            不用搬家，接上去就好，以 Notion 為例：
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
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-5 py-4">
            <div className="flex items-center gap-2 text-slate-300 text-base font-bold mb-2">
              <BookOpen size={18} className="text-sky-400" />
              官方文件
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {DOCS.map((doc) => (
                <div key={doc.u} className="font-mono text-sm text-slate-500">
                  <span className="text-slate-300">{doc.t}</span>
                  <span className="block text-slate-600">{doc.u}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
