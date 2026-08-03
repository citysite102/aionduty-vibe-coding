import { LayoutPanelLeft } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-34b-projects-ui',
  title: 'Claude Projects 裡，手冊放在哪一格',
  script:
    '講到這裡你可能會想，那些規範在 Claude Projects 裡到底填在哪裡。開一個 Project 進去，右邊會看到兩格。上面那格叫專案知識庫，放檔案用的，你上傳的規格書、語氣指南都放這裡，對應到你在專案裡擺的那些參考文件。下面那格叫自訂指令，那一格才是你的 CLAUDE.md，寫角色、寫規矩、寫輸出格式。左邊是專案清單，一個任務一個，這件事後面會再講。',
  seconds: 42,
  from: 72,
};

export default function RecProjectsUI() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Rules, Different Surface" icon={LayoutPanelLeft}>
      <RecPage>
        <AnimatedBlock stepIndex={1} className="mb-5">
          <p className="text-slate-300 text-4xl font-bold leading-snug">兩格：<Key>一格放檔案，一格放規矩</Key></p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-2.5 border-b border-slate-800 bg-slate-900/60">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            </div>
            <span className="text-sm font-mono text-slate-500 ml-2">claude.ai / Projects</span>
          </div>

          <div className="grid grid-cols-[170px_1fr]">
            <div className="border-r border-slate-800 bg-slate-900/30 p-3 space-y-1.5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Projects</div>
              <div className="rounded-lg border border-sky-500/25 bg-sky-500/10 px-3 py-1.5 text-sm font-bold text-sky-300">
                社群文案
              </div>
              <div className="px-3 py-1.5 text-sm text-slate-500">課程備課</div>
              <div className="px-3 py-1.5 text-sm text-slate-500">客戶提案</div>
            </div>

            <div className="p-4 space-y-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5">
                <div className="text-sm font-bold text-slate-300 mb-1.5">專案知識庫（Project knowledge）</div>
                <div className="text-sm text-slate-500 font-mono">品牌語氣指南.md ／ 產品規格書.pdf</div>
              </div>
              <div className="rounded-xl border border-sky-500/30 bg-slate-900 p-3.5">
                <div className="text-sm font-bold text-sky-300 mb-1.5">自訂指令（Custom instructions）</div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  「你是行銷總監。語氣幽默但專業，不要用誇飾的形容詞，每篇貼文最後附三個相關的 Hashtag。」
                </p>
              </div>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="mt-4 bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-xl px-6 py-3.5">
          <p className="text-slate-300 text-xl leading-relaxed">
            💡 下面那格就是你的 CLAUDE.md，換了個名字而已。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
