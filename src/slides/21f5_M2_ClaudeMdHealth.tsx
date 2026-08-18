import { ClipboardCheck, AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const STEPS = [
  {
    n: '1',
    name: '盤點',
    desc: '每一條規則後面標上「它是為了解決哪一次的問題」。想不起來的先打問號。',
  },
  {
    n: '2',
    name: '減法',
    desc: '打問號的那些，用右邊三種證據判斷能不能刪。先刪再搬，順序不要反，不然會把該刪的搬到別處，繼續佔著空間。',
  },
  {
    n: '3',
    name: '分流',
    desc: '留下來的，照上一頁的四個問題送到該去的地方。',
  },
  {
    n: '4',
    name: '加法',
    desc: '這時候才補新規則，而且補在正確的位置，不要一律往根目錄堆。',
  },
  {
    n: '5',
    name: '修剪',
    desc: '讀一遍留下來的句子，把「要優雅」這種改寫成可以檢查的敘述。',
  },
];

const EVIDENCE = [
  {
    name: '現場證據',
    desc: '最近的對話裡，它真的違反過這條嗎？從來沒違反過的規則，可能是在防一個不存在的問題。',
  },
  {
    name: '機制證據',
    desc: '這件事已經有 Hook、CI 或 lint 在擋嗎？有的話，文字版就是重複的。',
  },
  {
    name: '時效證據',
    desc: '規則綁的那個資料夾、指令、流程還在嗎？專案改過名字，規則常常沒跟著改。',
  },
];

export default function SlideM2ClaudeMdHealth() {
  return (
    <SlideLayout title="手冊越寫越長，怎麼整理" subtitle="The Five-Step Health Check" icon={ClipboardCheck}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-x-6 gap-y-4 max-w-6xl mx-auto items-start pb-4">

        <div className="space-y-2.5">
          {STEPS.map((s, i) => (
            <AnimatedBlock
              key={s.n}
              stepIndex={i + 1}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 items-start shadow-md"
            >
              <div className="w-9 h-9 shrink-0 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400 font-bold font-mono">
                {s.n}
              </div>
              <div>
                <div className="text-slate-200 text-[15px] font-bold mb-1">{s.name}</div>
                <div className="text-slate-500 text-sm leading-relaxed">{s.desc}</div>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <div className="space-y-4">
          <AnimatedBlock stepIndex={6} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-base font-bold text-slate-100 mb-1">刪掉一條規則之前</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">憑印象刪會刪錯。三種證據，至少要有兩種。</p>
            <div className="space-y-3">
              {EVIDENCE.map((e) => (
                <div key={e.name} className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-3">
                  <div className="text-sky-400 font-bold text-sm mb-1">{e.name}</div>
                  <div className="text-slate-400 text-[13px] leading-relaxed">{e.desc}</div>
                </div>
              ))}
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={7} className="bg-amber-500/5 border border-amber-500/25 rounded-2xl p-5 flex gap-3 items-start">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-bold text-slate-100 mb-2">證據不足的時候，不要直接刪</h4>
              <p className="text-slate-400 text-[13px] leading-relaxed">
                兩個比較安全的做法：<strong className="text-slate-200">降級</strong>，把它從根目錄搬到子目錄，讓它只在相關的時候才載入；或<strong className="text-slate-200">標記觀察</strong>，在那一行後面註記日期，下一輪健檢再看。
              </p>
            </div>
          </AnimatedBlock>
        </div>

        <AnimatedBlock
          stepIndex={8}
          className="lg:col-span-2 border rounded-2xl px-5 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <p className="text-slate-400 text-base leading-relaxed">
            把「要優雅」改寫成可以檢查的敘述，不用寫得更長，換個方向講就好：與其列一串不要做什麼，不如講清楚只能做什麼。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
