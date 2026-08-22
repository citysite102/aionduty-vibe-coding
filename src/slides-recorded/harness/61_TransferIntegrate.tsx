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
    '規矩解決完了，還有一件事：你的資料多半不在這台電腦上，它在 Notion、在雲端硬碟、在公司的系統裡。不用搬家，接上去就好。以 Notion 為例，照官方文件是三步：在終端機加入官方的 Notion 連線，回到 Claude Code 跑斜線 mcp 完成登入，再用斜線 context 看它佔了多少 token。串好之後你不用再複製貼上，它自己去查。這一頁是等你真的需要才回來看的，現在照著做不完也沒關係。',
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
        {/*
          這一段講的是「不是程式的工作也用得上」，而這一頁要學員去終端機加連線、跑 OAuth，
          難度比整段高一階。不給一個明確的出口，卡在這裡的人會以為後面都跟不上了。
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
