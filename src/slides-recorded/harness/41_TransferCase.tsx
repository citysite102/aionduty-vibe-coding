import { Briefcase, FileText, AlertTriangle, Languages } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { AskFirst } from '../../components/AskFirst';
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
    '換一個完全不是程式的工作。你負責寫客戶提案，這個月寫了五份。每一份你都要重新交代一次，提案分哪幾段、公司簡介用哪一版、語氣要多正式。A 客戶要英文版，B 客戶不收 PDF。而 D 客戶那一份，你差點把成本結構貼進要寄出去的檔案裡。這件事跟程式無關，但它符合前面所有條件：重複發生、有你自己的規矩、每次都要重講一遍。如果要交給 Claude 做，你的手冊會寫什麼？三格各寫一條：每次都要重講的、會出事的、只有特定客戶適用的。先自己想三十秒，接下來三頁一格一格對答案。',
  seconds: 46,
  from: 75,
};

export default function RecTransferCase() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={Briefcase}>
      <RecPage className="space-y-5">
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

        {/* 例外條件已經標在上面五張卡上了，這裡只留卡片標不出來的那一條 */}
        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 px-7 py-4">
          <p className="text-slate-400 text-xl leading-relaxed">
            每一份都要重講一次：分哪幾段、公司簡介用哪一版、語氣多正式。
          </p>
        </AnimatedBlock>

        {/*
          原本這一頁只掛了一個「先自己想三十秒」，但畫面上沒有題目，
          學員不知道要想什麼，講者也不知道要收什麼樣的答案。
          題目寫出來，並且給三個格子：那三格就是接下來三頁各答一格。
        */}
        <AnimatedBlock stepIndex={3}>
          {/*
            原本只寫「三個條件全中」，那三個條件只在口白裡講過，畫面上讀不到。
            這一段是預錄的，看影片的人沒辦法問「哪三個」，所以列出來。
          */}
          <p className="text-slate-300 text-3xl font-bold leading-snug mb-2">
            跟程式無關，但<Key>三個條件全中</Key>
          </p>
          <p className="text-slate-500 text-lg leading-relaxed mb-4">
            重複發生　有你自己的規矩　每次都要重講
          </p>
          <p className="text-slate-300 text-xl leading-relaxed mb-4">
            交給 Claude 做，你的手冊會寫什麼？三格各一條。
          </p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              '每次都要重講的',
              '違反了會出事的',
              '只有特定客戶適用的',
            ].map((q, i) => (
              <div key={q} className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-4">
                <div className="font-mono text-base text-slate-600 mb-1.5">0{i + 1}</div>
                <p className="text-slate-300 text-lg leading-snug">{q}</p>
              </div>
            ))}
          </div>

          <AskFirst note="先自己想三十秒" />
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
