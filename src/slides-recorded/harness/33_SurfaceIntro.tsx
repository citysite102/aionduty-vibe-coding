import { Columns3 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 原本這一塊是五頁：一頁問「要重學嗎」，三頁各講一個地方，一頁補網頁版的介面。
 * 但那三頁的結構完全一樣，都是拿同樣兩個問題去問，一頁一個答案。
 * 三頁分開講，學員反而看不出它們的差別在哪，因為沒有並排。
 *
 * 併成一頁對照表之後，兩個問題變成兩欄，三個地方變成三列，差別自己浮出來。
 */
const SURFACES = [
  {
    name: 'Claude Projects',
    where: '網頁版 claude.ai',
    files: '只有你上傳的那些檔案',
    act: '不會動你的電腦',
  },
  {
    name: 'Cowork',
    where: '桌面版的一個頁籤',
    files: '你綁的那一個資料夾',
    act: '能讀能寫，不執行指令',
  },
  {
    name: 'Claude Code',
    where: '終端機，或桌面版的 Code 頁籤',
    files: '整個專案資料夾',
    act: '能執行指令、跑測試、版控',
    lead: true,
  },
];

export const meta: RecordedMeta = {
  id: 'harness-33-surface-intro',
  title: '三個地方，差別只有兩件事',
  script:
    '這一段從頭到尾都在講 CLAUDE.md，而它是終端機的東西。問題是你不會每天都開終端機，有時候只是想在網頁上問一句話。換到另外兩個地方，前面學的要重學嗎？不用。手冊怎麼寫、分層怎麼分、規則該放哪，三個地方都成立。會變的只有兩件事：它碰得到哪些檔案，以及它能不能自己動手。網頁版的 Projects 只看得到你上傳的檔案，不會動你的電腦。桌面版的 Cowork 綁一個資料夾，能讀能寫但不執行指令。Claude Code 整個專案都能讀，也能執行測試和版本控制，這門課主要在用的就是它。差別都落在權限，不在你要怎麼寫手冊。',
  seconds: 44,
  from: 72,
};

export default function RecSurfaceIntro() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Rules, Different Surface" icon={Columns3}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-500 text-xl leading-relaxed mb-3">
            <code className="font-mono text-orange-300">CLAUDE.md</code> 是終端機的東西，
            但你不會每天都開終端機。改用網頁版或桌面版，要重學嗎？
          </p>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            不用。寫法三個地方通用，<Key>差別只在它碰得到什麼</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-4 border-b border-slate-800 bg-slate-900 px-6 py-3 text-base text-slate-500">
            <span />
            <span>碰得到哪些檔案</span>
            <span>能不能自己動手</span>
          </div>

          {SURFACES.map((s) => (
            <div
              key={s.name}
              className={`grid grid-cols-[1.1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-slate-800/70 last:border-0 ${
                s.lead ? 'bg-sky-950/20' : ''
              }`}
            >
              <div>
                <div className={`text-xl font-bold ${s.lead ? 'text-sky-300' : 'text-slate-200'}`}>{s.name}</div>
                <div className="text-slate-600 text-sm mt-0.5">{s.where}</div>
              </div>
              <div className="text-slate-400 text-lg leading-snug self-center">{s.files}</div>
              <div className="text-slate-400 text-lg leading-snug self-center">{s.act}</div>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 差別都落在權限，不在你要怎麼寫手冊。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
