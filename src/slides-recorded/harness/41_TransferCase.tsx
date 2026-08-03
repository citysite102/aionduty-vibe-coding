import { Briefcase, FileText, AlertTriangle, Languages } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { AskFirst } from './_AskFirst';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 情境頁原本是三條純文字，看起來跟前面每一頁都一樣，帶不進去。
 * 改成把那五份提案畫出來，讓學員先看到「東西」再讀條件。
 *
 * 全部用程式畫，不引用外部圖片（A-4）。
 */
const DOCS = [
  { name: '提案_A 客戶', tag: '英文版', icon: Languages },
  { name: '提案_B 客戶', tag: '不收 PDF', icon: FileText },
  { name: '提案_C 客戶', tag: '', icon: FileText },
  { name: '提案_D 客戶', tag: '成本外洩', icon: AlertTriangle, bad: true },
  { name: '提案_E 客戶', tag: '', icon: FileText },
];

export const meta: RecordedMeta = {
  id: 'harness-41-transfer-case',
  title: '換成你的工作，手冊該寫什麼',
  script:
    '換一個完全不是程式的工作。你負責寫客戶提案，這個月寫了五份。每一份你都要重新交代一次，提案分哪幾段、公司簡介用哪一版、語氣要多正式。A 客戶要英文版，B 客戶不收 PDF。而 D 客戶那一份，你差點把成本結構貼進要寄出去的檔案裡。這件事跟程式無關，但它符合前面所有條件：重複發生、有你自己的規矩、每次都要重講一遍。如果要交給 Claude 做，你的手冊會寫什麼？先自己想三十秒。',
  seconds: 42,
  from: 75,
};

export default function RecTransferCase() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={Briefcase}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-400 text-xl leading-relaxed mb-4">
            你負責寫客戶提案，這個月寫了五份。
          </p>

          <div className="flex gap-3">
            {DOCS.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.name}
                  className={`flex-1 rounded-xl border px-4 py-5 ${
                    d.bad ? 'border-red-500/40 bg-red-950/20' : 'border-slate-800 bg-slate-900'
                  }`}
                >
                  <Icon size={22} className={d.bad ? 'text-red-400 mb-3' : 'text-slate-600 mb-3'} />
                  <div className="text-slate-300 text-base font-bold leading-tight">{d.name}</div>
                  {d.tag && (
                    <div className={`text-sm mt-1.5 ${d.bad ? 'text-red-300' : 'text-slate-500'}`}>{d.tag}</div>
                  )}
                </div>
              );
            })}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 px-7 py-5">
          <ul className="space-y-2.5 text-slate-400 text-xl leading-relaxed">
            <li>· 每一份都要重講：分哪幾段、公司簡介用哪一版、語氣多正式</li>
            <li>· 兩個客戶有自己的格式要求</li>
            <li>· 有一份差點把成本結構貼進要寄出去的檔案</li>
          </ul>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3}>
          <p className="text-slate-300 text-3xl font-bold leading-snug mb-4">
            跟程式無關，但<Key>三個條件全中</Key>
          </p>
          <AskFirst note="先自己想三十秒" />
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
