import { NotebookPen, Terminal, TriangleAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const FIELDS = [
  { name: 'startedAt', desc: '這趟什麼時候出發' },
  { name: 'minutes', desc: '飛了多久' },
  { name: 'completed', desc: '有沒有撐完，中途返航也要記' },
];

const DERIVED = [
  '今天完成幾趟',
  '總飛行時數',
  '連續出勤幾天',
  '中途返航率',
];

export default function SlideMissionLog() {
  return (
    <SlideLayout title="幫計時器加上航行日誌" subtitle="Mission Timer v2: Data" icon={NotebookPen}>
      <div className="max-w-6xl mx-auto text-left space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-950/40 border border-slate-800/80 rounded-2xl px-6 py-3.5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full text-xs font-mono shrink-0 self-start md:self-center font-bold">
            循環講完了，回頭收作品
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            <strong className="text-slate-200">剛才那一輪是讓它自己跑，接下來這一段回到你自己決定要什麼。</strong>
            計時器用了幾天之後，你會開始想知道「我這禮拜到底做了幾趟」。這個念頭一冒出來，作品就從一個玩具變成一個會累積東西的工具。
            這裡會回收前面資料庫那一頁講的東西，但先別急著架資料庫。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

          {/* 左：資料要記什麼 */}
          <div className="lg:col-span-5 space-y-5">
            <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-slate-200 mb-3 border-b border-slate-800 pb-2">
                一趟任務，記這三件事
              </h3>
              <div className="space-y-2">
                {FIELDS.map(f => (
                  <div key={f.name} className="flex gap-3 items-baseline bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
                    <code className="text-sky-300 text-xs font-mono shrink-0">{f.name}</code>
                    <span className="text-slate-400 text-[11px] leading-relaxed">{f.desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-[11px] mt-3 leading-relaxed">
                第三個欄位是最多人漏掉的。<strong className="text-slate-300">失敗也要記</strong>，不然你永遠不知道自己有多常放棄。
              </p>
            </AnimatedBlock>

            <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-slate-200 mb-3 border-b border-slate-800 pb-2">
                這些不要存，用算的
              </h3>
              <div className="flex flex-wrap gap-2">
                {DERIVED.map(d => (
                  <span key={d} className="px-2.5 py-1 bg-emerald-500/5 text-emerald-300/90 border border-emerald-900/40 rounded-lg text-[11px] font-bold">
                    {d}
                  </span>
                ))}
              </div>
              <p className="text-slate-500 text-[11px] mt-3 leading-relaxed">
                AI 很愛偷懶，直接存一個「今天完成 3 趟」的數字。那個數字遲早會跟實際紀錄對不上。
                <strong className="text-slate-300">能算出來的就不要另外存一份。</strong>
              </p>
            </AnimatedBlock>
          </div>

          {/* 右：存哪裡 + prompt + 陷阱 */}
          <div className="lg:col-span-7 space-y-5">
            <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-slate-200 mb-3 border-b border-slate-800 pb-2">
                存在哪裡？先用瀏覽器自己記就好
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">
                瀏覽器內建一塊叫 <code className="text-sky-300 font-mono">localStorage</code> 的小空間，網頁可以把東西寫在你這台電腦上。
                <strong className="text-slate-200">不用註冊、不用後端、不用付錢</strong>，一句話就有。
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative">
                <div className="absolute top-2.5 right-3 flex items-center gap-1 text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                  <Terminal size={11} className="text-sky-400" /> Prompt
                </div>
                <p className="text-sky-300 text-xs leading-relaxed font-medium mt-1">
                  「幫計時器加上航行日誌。每完成或中途返航一趟就記一筆，欄位是出發時間、飛行分鐘數、有沒有完成。
                  資料先存在瀏覽器的 localStorage 就好，不要接資料庫。
                  畫面下方顯示今天完成幾趟、總時數、連續出勤天數，這三個都要從紀錄算出來，<strong className="text-amber-300">不要另外存一份數字</strong>。」
                </p>
              </div>
            </AnimatedBlock>

            <AnimatedBlock stepIndex={4} className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex gap-3 items-start">
              <TriangleAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-300 mb-1.5">你要負責檢查的那一題</h4>
                <p className="text-slate-300 text-xs leading-relaxed mb-2">
                  「連續出勤天數」是這裡面唯一會寫錯、而且用眼睛看不出來的東西。跨過午夜怎麼算？昨天沒做，今天該不該歸零？
                </p>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  你不用會寫這段程式。你要會問這句：
                  <span className="text-sky-300 font-bold">「我昨天沒做，今天打開，連續天數應該要歸零。你有處理嗎？寫個例子給我看。」</span>
                </p>
                <p className="text-slate-500 text-[11px] leading-relaxed mt-2">
                  這就是整堂課想給你的視角。你不是工程師，你是那個知道該問什麼的人。
                </p>
              </div>
            </AnimatedBlock>
          </div>
        </div>

      </div>
    </SlideLayout>
  );
}
