import { FolderTree } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { LayerRail } from './_LayerRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-29-layer-subdir',
  title: '這一層要放什麼？',
  script:
    '第三層，子目錄。你可以在任何一個資料夾底下再放一份 CLAUDE.md，寫的是那一區專屬的規矩。它最大的特點是載入時機：平常不佔任何空間，只有當 Claude 真的動到那一區的檔案時才讀進來。所以只跟某一塊有關的細節放這裡，根目錄那份就不會被撐大。像是這個專案的動畫元件目錄，規矩跟簡報頁面完全不同，就適合分出去。',
  seconds: 43,
  from: 55,
};

export default function RecLayerSubdir() {
  return (
    <SlideLayout title={meta.title} subtitle="Multiple Layers of Settings" icon={FolderTree}>
      <RecPage>
        <LayerRail active={3} />

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-slate-500 text-base font-mono mb-3">第 3 層，共 4 層</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-7">
            <p className="text-sky-300 text-2xl font-mono leading-snug">src/remotion/CLAUDE.md</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold mb-5 leading-snug">碰到才載入，平常不佔空間</p>

          <p className="text-slate-400 text-xl leading-relaxed">
            只有動到那一區的檔案時才讀進來。只跟某一塊有關的細節放這裡。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="mt-5 flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">例如</span>
          <span className="text-slate-300 text-xl">動畫元件目錄，規矩跟簡報頁面不同</span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
