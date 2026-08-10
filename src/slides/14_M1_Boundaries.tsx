import { Compass, ShieldAlert, Cpu } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 弱項原本有一條是「預設不會操作瀏覽器介面與外部授權」。
 * 那是工具當下的設定問題，掛個擴充就變了，學員記著也用不上，
 * 而且他這輩子可能不會遇到。
 *
 * 換成三條不管工具怎麼進步都成立的：範圍太大、它不會說自己不確定、
 * 沒說出口的偏好它猜不到。三條都對得上學員自己驗得出來的經驗。
 */
const STRENGTHS = [
  {
    title: '目標很明確的單一任務',
    body: '計時器、單位換算、批次改檔名、把一份資料整理成另一種格式。講得出「做完長什麼樣」的，它做得又快又好。',
  },
  {
    title: '照著錯誤訊息找原因',
    body: '把整段紅字丟給它，它會自己翻遍整個資料夾找出哪一行有問題，這件事它比人快得多。',
  },
  {
    title: '讀懂一個你沒看過的專案',
    body: '請它把別人的專案讀一遍，用白話講這東西是怎麼跑起來的、哪個檔案負責什麼。',
  },
];

const LIMITS = [
  {
    title: '一句話就要一個大系統',
    body: '「幫我做一個 Facebook」這種。範圍太大，它會自己決定一堆你沒同意的做法，等你發現時已經改到看不懂了。',
  },
  {
    title: '它不會主動說「我不確定」',
    body: '它沒把握的時候，答案看起來跟有把握的時候沒兩樣。所以你不能從它的語氣判斷這件事對不對，得自己查，或是叫它實際跑一次給你看。',
  },
  {
    title: '你沒說出口的偏好',
    body: '你說「再大器一點」，它可能把所有字放大兩倍。腦子裡的畫面它拿不到，你得講到具體：哪個元素、多大、什麼顏色。講不出來就貼一張圖給它看。',
  },
];

export default function SlideBoundaries() {
  return (
    <SlideLayout title="哪些事它做得好，哪些你得自己來" subtitle="Capabilities & Boundaries" icon={Compass}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto pt-4 pb-8 items-start">

        <AnimatedBlock
          stepIndex={1}
          className="rounded-3xl border px-6 py-6 bg-emerald-500/5 border-emerald-500/25"
        >
          <h3 className="text-xl font-bold text-emerald-300 flex items-center gap-3 mb-5">
            <Cpu aria-hidden="true" size={22} />
            它的強項
          </h3>
          <ul className="space-y-4">
            {STRENGTHS.map((s) => (
              <li key={s.title} className="flex gap-3">
                <span className="text-emerald-400 font-bold mt-0.5 shrink-0">✓</span>
                <div>
                  <strong className="text-slate-100 block mb-1">{s.title}</strong>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="rounded-3xl border px-6 py-6 bg-rose-500/5 border-rose-500/25"
        >
          <h3 className="text-xl font-bold text-rose-300 flex items-center gap-3 mb-5">
            <ShieldAlert aria-hidden="true" size={22} />
            這幾件你得自己來
          </h3>
          <ul className="space-y-4">
            {LIMITS.map((l) => (
              <li key={l.title} className="flex gap-3">
                <span className="text-rose-400 font-bold mt-0.5 shrink-0">✕</span>
                <div>
                  <strong className="text-slate-100 block mb-1">{l.title}</strong>
                  <p className="text-slate-400 text-sm leading-relaxed">{l.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
