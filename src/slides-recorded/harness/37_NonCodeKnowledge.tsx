import { Megaphone } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import type { RecordedMeta } from '../types';

const KNOWLEDGE = ['品牌語氣指南', '過去互動比較好的幾篇貼文', '不能提到的競品與敏感字清單'];

export const meta: RecordedMeta = {
  id: 'harness-37-non-code-knowledge',
  title: '不是程式的工作也用得上嗎？',
  script:
    '舉一個完全跟程式無關的例子。你在 Claude Projects 裡開一個社群文案專案，知識庫要放什麼？放品牌語氣指南、放過去互動比較好的幾篇貼文、放不能提到的競品與敏感字清單。這些就是你給它的參考資料，等同於你在專案裡放的那些規格文件。放進去之後，每一次開新對話它都看得到，你不用每次重貼。',
  seconds: 40,
  from: 72,
};

export default function RecNonCodeKnowledge() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Structure, Any Job" icon={Megaphone}>
      <div className="max-w-4xl mx-auto pt-2 space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-2xl leading-snug">在 Claude Projects 開一個「社群文案」專案</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <div className="text-sky-400 text-lg font-bold mb-4">知識庫放什麼</div>
          <ul className="space-y-3">
            {KNOWLEDGE.map((k) => (
              <li key={k} className="text-slate-300 text-xl leading-relaxed flex gap-4">
                <span className="text-slate-600 shrink-0">·</span>
                {k}
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3}>
          <p className="text-slate-100 text-4xl font-bold leading-snug">知識庫就是你給它的參考資料</p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
