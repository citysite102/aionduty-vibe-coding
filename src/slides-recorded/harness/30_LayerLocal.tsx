import { UserCog } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { LayerRail } from './_LayerRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-30-layer-local',
  title: '這一層要放什麼？',
  script:
    '第四層，CLAUDE.local.md，放在專案裡但加進 gitignore，不會進版本控制。它放的是只有你這台機器成立的事，例如你的資料庫連線是開在哪個埠、你習慣用哪個瀏覽器測試。這些寫進根目錄那份會變成團隊的困擾，因為別人的環境不是這樣。判斷方式很簡單：這條規矩換一台電腦還成立嗎？不成立的就放這裡。',
  seconds: 40,
  from: 55,
};

export default function RecLayerLocal() {
  return (
    <SlideLayout title={meta.title} subtitle="Multiple Layers of Settings" icon={UserCog}>
      <RecPage>
        <LayerRail active={4} />

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-slate-500 text-base font-mono mb-3">第 4 層，共 4 層</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-7">
            <p className="text-sky-300 text-2xl font-mono leading-snug">./CLAUDE.local.md</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold mb-5 leading-snug">只有你這台機器成立的事</p>

          <p className="text-slate-400 text-xl leading-relaxed">
            放進 gitignore，不進版本控制。例如你的測試環境開在哪個埠。
          </p>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="mt-5 bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-xl px-6 py-4"
        >
          <p className="text-slate-300 text-xl leading-relaxed">
            判斷方式：這條規矩換一台電腦還成立嗎？不成立的就放這裡。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
