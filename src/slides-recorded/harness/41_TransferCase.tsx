import { Briefcase, FileText, AlertTriangle, Languages } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 情境頁原本是三條純文字，看起來跟前面每一頁都一樣，帶不進去。
 * 改成把那五份提案畫出來，讓學員先看到「東西」再讀條件。
 *
 * 全部用程式畫，不引用外部圖片（A-4）。
 */
/**
 * 2026-10-04（講師）：「底下五個乍看有點看不懂是什麼意思，不收 PDF 是什麼意思？
 * 英文版是說做錯了嗎？」病根是卡片上只有一個裸標籤，讀者分不出那是客戶的要求還是失誤。
 * 標籤改成完整的句子，另外在卡片上方加一行說明這兩種標記各是什麼。
 */
const DOCS = [
  { name: '提案_A', tag: '要英文版', icon: Languages },
  { name: '提案_B', tag: '只收 Word，不收 PDF', icon: FileText },
  { name: '提案_C', tag: '', icon: FileText },
  { name: '提案_D', tag: '差點把成本貼進去', icon: AlertTriangle, bad: true },
  { name: '提案_E', tag: '', icon: FileText },
];

export const meta: RecordedMeta = {
  id: 'harness-41-transfer-case',
  title: '以客戶提案為例，這份工作要哪些規範',
  script:
    '以業務的客戶提案為例，這個月寫了五份。每一份都要重新交代提案分哪幾段、公司簡介用哪一版、語氣要多正式，也就是我們對外講話的口吻。' +
    '卡片下面那一行是那個客戶特別交代的事：A 客戶要英文版，B 客戶只收 Word、不收 PDF。' +
    '紅色那一份是上個月差點出事的：D 客戶那一次，差點把成本結構貼進要寄出去的檔案裡。' +
    '這件事跟程式一點關係都沒有，但該寫一份手冊的三個條件全中：重複發生、有自己的規則、每次都要重講。' +
    '這三個條件就是用來看你自己工作的。你手上一定有一件事每次做都要重講一遍，拿它對一次，三個都中就該寫。' +
    '那如果把這件事交給 Claude 做，手冊會寫哪三條？下一頁對答案。',
  seconds: 40,
  from: 75,
};

export default function RecTransferCase() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={Briefcase}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          {/*
            2026-10-04（講師）：原本第一句就是「你負責寫客戶提案」，學員會想
            「我又沒有要寫客戶提案」。這一頁真正要講的是：Claude 做得到的事越多，
            越要先給它一個框架，而判斷哪些工作需要框架的條件只有三個。
            提案只是載體。
            2026-10-04（第二、三輪）試過兩種寫法都不行：第一句直接寫「你負責寫客戶提案」，
            學員會想「我又沒有在寫提案」；改成「例子是客戶提案，你的工作不是這個也沒關係」，
            那是在替例子道歉，讀起來很像 AI。
            現在的解法是換人稱：**例子用第三人稱（業務助理），最後那一問才轉回「你」。**
            這樣不用任何一句說明，學員也知道前面在看別人的例子、現在輪到自己。
            這一頁的人稱順序是：別人的例子 → 三個條件 → 換成你手上那件事。**不要混回去。**
          */}
          <p className="text-slate-400 text-xl leading-relaxed mb-1">
            以業務的客戶提案為例。這個月寫了五份：
          </p>
          <p className="text-slate-500 text-base leading-relaxed mb-4">
            下面那行是客戶的特別要求；紅色那份出過事。
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
            每一份都要重講：分哪幾段、公司簡介用哪一版、
            <strong className="text-slate-300">語氣多正式（對外的口吻）</strong>。
          </p>
        </AnimatedBlock>

        {/*
          原本這一頁只掛了一個「先自己想三十秒」，但畫面上沒有題目，
          學員不知道要想什麼，講者也不知道要收什麼樣的答案。
          題目寫出來，並且給三個格子：那三格就是下一頁要答的。
          2026-10-04 那個「先自己想三十秒」整個拿掉（講師）：全片改成預錄自學之後，
          學員本來就可以自己暫停，印一個秒數在畫面上是課務交代（D-2）。
        */}
        <AnimatedBlock stepIndex={3}>
          {/*
            原本只寫「三個條件全中」，那三個條件只在口白裡講過，畫面上讀不到。
            這一段是預錄的，看影片的人沒辦法問「哪三個」，所以列出來。
          */}
          <p className="text-slate-300 text-3xl font-bold leading-snug mb-2">
            跟程式無關，但<Key>該寫規範的條件都在</Key>
          </p>
          <p className="text-slate-500 text-lg leading-relaxed mb-4">
            重複發生　有自己的規則　每次都要重講
          </p>
          <p className="text-slate-300 text-xl leading-relaxed mb-4">
            換成你的工作，你會寫哪三條？
          </p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              '違反了會出事的',
              '只有特定情況適用的',
              '每次都要重講的',
            ].map((q, i) => (
              <div key={q} className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-4">
                <div className="font-mono text-base text-slate-600 mb-1.5">0{i + 1}</div>
                <p className="text-slate-300 text-lg leading-snug">{q}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
