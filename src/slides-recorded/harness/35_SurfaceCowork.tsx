import { FolderOpen } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { SurfaceRail } from './_SurfaceRail';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-35-surface-cowork',
  title: '這個地方能做什麼？',
  script:
    '第二個，Cowork，介面還是網頁，但它多了一個資料夾。你指定本機的哪一個資料夾給它，它就能直接讀寫那裡的檔案，操作方式仍然是聊天。它的權限範圍就是你綁的那個資料夾，不會跨出去，所以你可以只綁一個子目錄，不必把整個專案交出去。對於還不習慣終端機的人，這是把聊天換成能動手的第一步。',
  seconds: 41,
  from: 72,
};

export default function RecSurfaceCowork() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Rules, Different Surface" icon={FolderOpen}>
      <div className="max-w-4xl mx-auto pt-2">
        <SurfaceRail active={2} />

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-slate-500 text-base font-mono mb-3">2 / 3　網頁介面加本機資料夾</div>

          <p className="text-slate-100 text-4xl font-bold mb-5 leading-snug">還是聊天，但它能動你的檔案</p>

          <p className="text-slate-400 text-xl leading-relaxed">
            你指定哪一個資料夾，它就能讀寫那裡的檔案。
          </p>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="mt-5 bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-xl px-6 py-4"
        >
          <p className="text-slate-300 text-xl leading-relaxed">
            權限就是你綁的那個資料夾。可以只綁一個子目錄，不必交出整個專案。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
