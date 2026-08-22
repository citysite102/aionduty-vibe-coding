import { Compass, FileText, Flag } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 排在「你在旁邊看什麼」後面，不是前面：先做過一次，再給那件事名字。
 *
 * 原本這一頁是純術語（SDD、TDD 2.0、Agentic TDD）加一份三點路線圖，
 * 路線圖跟收尾那頁重複，術語也沒有掛回學員做過的任何東西，所以整頁沒有落點。
 * 現在每個名詞都指回他剛貼過的那段指令的某一段，最後那組對照是這一頁真正的作業：
 * 分辨自己寫的是規格還是願望。
 */
const TERMS = [
  {
    icon: FileText,
    en: 'SDD',
    full: 'Specification-Driven',
    zh: '規格驅動開發',
    line: '先想清楚，再動手做。',
    did: '你寫的【目標】跟【什麼叫做完】就是規格。中型專案那一段「先把需求說成一頁」也是同一件事。',
    why: '寫程式不再是最花時間的部分之後，最花時間的變成把「要什麼」講到沒有歧義。',
  },
  {
    icon: Flag,
    en: 'TDD 2.0',
    full: 'Agentic TDD',
    zh: '測試驅動開發',
    line: '先定終點，再讓它自己走過去。',
    did: '你寫的【怎麼驗】那一段。它自己跑掉的那兩輪，做的就是這件事。',
    why: '驗收條件是它唯一能自己判斷「還沒做完」的依據。沒有這一段，它改完就停下來等你看。',
  },
];

const SPEC_VS_WISH = [
  {
    wish: '做一個好看的報表頁',
    spec: '一頁表格，欄位是日期、品項、金額，超過 50 筆要分頁',
  },
  {
    wish: '操作要順暢',
    spec: '點下去畫面要有反應，還在等的時候顯示載入中',
  },
  {
    wish: '測試都要過',
    spec: '這五題各點一次，逐題回報通過或失敗',
  },
];

export default function SlideFutureEngineering() {
  return (
    <SlideLayout
      title="你寫的是規格，還是願望"
      subtitle="Spec First, Tests as the Finish Line"
      icon={Compass}
    >
      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <p className="text-slate-300 text-base leading-relaxed">
            你貼下去那段話做了兩件事，
            <strong className="text-slate-100">業界各有一個名字</strong>。

          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TERMS.map((t, i) => {
            const Icon = t.icon;
            return (
              <AnimatedBlock
                key={t.en}
                stepIndex={i + 2}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <Icon aria-hidden="true" size={18} className="text-slate-400 shrink-0" />
                  <span className="font-mono text-sm font-bold text-slate-200">{t.en}</span>
                  <span className="text-base font-bold text-slate-100">{t.zh}</span>
                  <span className="ml-auto shrink-0 font-mono text-xs text-slate-600">{t.full}</span>
                </div>

                <p className="text-slate-100 text-base font-bold leading-relaxed mb-3">{t.line}</p>

                <div className="text-sm leading-relaxed text-slate-400 space-y-2">
                  <p>
                    <strong className="text-slate-300">你已經做過：</strong>
                    {t.did}
                  </p>
                  <p className="border-t border-slate-800 pt-2">
                    <strong className="text-slate-300">為什麼有效：</strong>
                    {t.why}
                  </p>
                </div>
              </AnimatedBlock>
            );
          })}
        </div>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">
            所以難的不是這兩個詞，是分辨自己寫的是規格還是願望
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            判準只有一個：<strong className="text-slate-200">它驗完之後，你能不能指著畫面說「這題過了」。</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SPEC_VS_WISH.map((s) => (
              <div key={s.wish} className="space-y-2">
                <div className="rounded-xl border px-4 py-2.5 bg-rose-500/5 border-rose-500/25">
                  <span className="text-rose-300 text-sm font-bold mr-2">✕</span>
                  <span className="text-slate-400 text-sm leading-relaxed">{s.wish}</span>
                </div>
                <div className="rounded-xl border px-4 py-2.5 bg-emerald-500/5 border-emerald-500/25">
                  <span className="text-emerald-300 text-sm font-bold mr-2">✓</span>
                  <span className="text-slate-300 text-sm leading-relaxed">{s.spec}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
