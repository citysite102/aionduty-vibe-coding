import { Boxes } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-32b-where-else',
  title: '這些規矩，只有終端機用得到嗎？',
  script:
    '這一段從頭到尾都在講 CLAUDE.md 這個檔案，而它是終端機的東西。問題是你不會每天都開終端機，有時候你只是想在網頁上問一句話。所以先認一下人：Claude 有三個地方可以用。第一個是網頁版的 claude.ai，裡面組織工作的功能叫 Projects。第二個是桌面版的應用程式，裡面有一個頁籤叫 Cowork。第三個就是這堂課一直在用的 Claude Code，跑在終端機裡。接下來這一段就是在比這三個地方，先記得它們分別在哪裡。',
  seconds: 42,
  from: 72,
};

/** 視窗上緣那三顆點，三張卡共用 */
function Dots() {
  return (
    <div className="flex gap-1.5">
      <span className="w-2 h-2 rounded-full bg-slate-700" />
      <span className="w-2 h-2 rounded-full bg-slate-700" />
      <span className="w-2 h-2 rounded-full bg-slate-700" />
    </div>
  );
}

/**
 * 三個地方的身分卡。這一頁只做認人，能力差異留給後面幾頁。
 * 每張卡上半部畫出那個地方實際長什麼樣，學員之後看到真的介面才認得出來。
 */
const PLACES = [
  {
    name: 'Claude Projects',
    note: '網頁版 claude.ai，在瀏覽器裡開，不用裝東西。',
    screen: (
      <>
        <div className="flex items-center gap-2.5">
          <Dots />
          <div className="flex-1 rounded border border-slate-800 bg-slate-900 px-2 py-1 font-mono text-xs text-slate-400">
            claude.ai
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <div className="w-1/3 space-y-1.5">
            <div className="h-3.5 rounded border border-sky-500/25 bg-sky-500/10" />
            <div className="h-3.5 rounded bg-slate-800/60" />
            <div className="h-3.5 rounded bg-slate-800/60" />
          </div>
          <div className="flex-1 rounded border border-slate-800 bg-slate-900" />
        </div>
      </>
    ),
  },
  {
    name: 'Cowork',
    note: '桌面版應用程式，Mac 與 Windows 都有，是其中一個頁籤。',
    screen: (
      <>
        <Dots />
        <div className="mt-3 flex gap-1 font-mono text-xs">
          <span className="rounded px-2 py-1 text-slate-600">Chat</span>
          <span className="rounded border border-sky-500/25 bg-sky-500/10 px-2 py-1 font-bold text-sky-300">
            Cowork
          </span>
          <span className="rounded px-2 py-1 text-slate-600">Code</span>
        </div>
        <div className="mt-2.5 h-[22px] rounded border border-slate-800 bg-slate-900" />
      </>
    ),
  },
  {
    name: 'Claude Code',
    note: '終端機，這堂課一直在用的那個。',
    screen: (
      <>
        <Dots />
        <div className="mt-3 font-mono text-xs leading-relaxed">
          <div className="text-slate-600">~/my-project</div>
          <div className="mt-1 text-slate-300">
            <span className="text-sky-400">$</span> claude
          </div>
        </div>
      </>
    ),
  },
];

export default function RecWhereElse() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Rules, Different Surface" icon={Boxes}>
      <RecPage>
        <AnimatedBlock stepIndex={1} className="mb-7">
          <p className="text-slate-100 text-4xl font-bold leading-snug">你不會每天都開終端機</p>
        </AnimatedBlock>

        {/* 一張一張出現，講者帶到誰誰才亮 */}
        <div className="grid grid-cols-3 gap-5">
          {PLACES.map((p, i) => (
            <AnimatedBlock
              key={p.name}
              stepIndex={i + 2}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
            >
              <div className="h-[116px] border-b border-slate-800 bg-slate-950 p-3.5">{p.screen}</div>
              <div className="p-5">
                <div className="text-xl font-bold text-slate-100">{p.name}</div>
                <p className="mt-1.5 text-base leading-relaxed text-slate-500">{p.note}</p>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={5} className="mt-6 px-1 text-xl leading-relaxed text-slate-400">
          接下來這一段，就是在比這三個地方。
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
