import { Globe } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { LayerRail } from './_LayerRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-27-layer-global',
  title: '這一層要放什麼？',
  script:
    '第一層，全域，檔案放在家目錄底下的 .claude 資料夾裡。這一層放的是你自己跨所有專案的偏好，換到哪個專案都會帶著。像是回答一律用繁體中文、跑指令前先說明你要做什麼，這種跟專案內容無關、只跟你這個人有關的習慣。反過來說，只有這個專案才成立的規矩不要寫在這裡，否則它會跟著你去干擾別的專案。',
  seconds: 40,
  from: 55,
};

export default function RecLayerGlobal() {
  return (
    <SlideLayout title={meta.title} subtitle="Multiple Layers of Settings" icon={Globe}>
      <RecPage>
        <LayerRail active={1} />

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-slate-500 text-base font-mono mb-3">第 1 層，共 4 層</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-7">
            <p className="text-sky-300 text-2xl font-mono leading-snug">~/.claude/CLAUDE.md</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold mb-5 leading-snug">你跨所有專案的個人偏好</p>

          <p className="text-slate-400 text-xl leading-relaxed">
            換到哪個專案都會帶著。只有這個專案才成立的規矩不要寫在這裡。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="mt-5 flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">例如</span>
          <span className="text-slate-300 text-xl">回答一律用繁體中文</span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
