import { HelpCircle, Briefcase } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 五個情境的建議做法。tone 只有兩種：
 *   plain  這一題不需要動到專案檔案，用對話框或現成工具就好
 *   agent  這一題要讀寫你電腦裡的真實檔案，才輪到 Claude Code
 * 顏色標的是這個分界，不是「哪一題比較好」。
 */
const CASES = [
  {
    title: '情境一：每週一從系統匯出報表寄給主管',
    need: '不需要做出網頁，只需要一段會自動跑的邏輯。',
    tone: 'plain' as const,
    answer: '用對話框請它寫一段 Google Apps Script（Google 試算表內建的自動化腳本），貼進表單就能執行。',
  },
  {
    title: '情境二：短期活動網頁，下週上線',
    need: '只收集與顯示資訊，不需要複雜功能。',
    tone: 'plain' as const,
    answer: '用 AI App Builder（例如 v0）直接生成並上線，或用 Typeform 這類現成表單工具。',
  },
  {
    title: '情境三：舊有系統新增「忘記密碼」',
    need: '要讀懂舊資料庫的結構，還要接上目前在用的信件服務。',
    tone: 'agent' as const,
    answer: '用 Claude Code 打開現有專案，讓它自己讀懂架構再動手串接。',
  },
  {
    title: '情境四：高度客製化的個人記帳工具',
    need: '想自己掌控每一個畫面細節與資料存放方式。',
    tone: 'agent' as const,
    answer: '先用 Google AI Studio 這類工具打草稿，下載下來之後再用 Claude Code 接著改。',
  },
  {
    title: '情境五：想了解目前實作的爬蟲邏輯',
    need: '不需要修改程式碼，只要看懂架構並規劃下一步。',
    tone: 'agent' as const,
    answer: '用 Claude Code 在專案裡來回討論，請它「用白話文解釋這段程式碼」並協助梳理邏輯。',
  },
];

const TONES = {
  plain: 'text-emerald-300 bg-emerald-950/30 border-emerald-900/50',
  agent: 'text-sky-300 bg-sky-950/30 border-sky-900/50',
};

export default function Slide18b() {
  return (
    <SlideLayout title="該用什麼工具？" subtitle="Scenario Quiz" icon={HelpCircle}>
      <div className="max-w-5xl mx-auto min-h-full flex flex-col justify-center pb-4">
        <p className="text-slate-300 text-xl mb-2 text-center leading-relaxed">
          這五題，你覺得該用<strong className="text-slate-100">純對話</strong>、
          <strong className="text-slate-100">無程式碼工具</strong>，
          還是<strong className="text-slate-100">能動手的 Claude Code</strong>？
        </p>
        <p className="text-slate-500 text-sm mb-2 text-center">
          分界只有一條：這件事需不需要讀寫你電腦裡的真實檔案。
        </p>
        <div className="flex items-center justify-center gap-5 mb-6 text-xs">
          <span className="inline-flex items-center gap-1.5 text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            不用，前兩種工具就夠
          </span>
          <span className="inline-flex items-center gap-1.5 text-sky-300">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            要，這時候才輪到 Claude Code
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CASES.map((c, i) => (
            <AnimatedBlock
              key={c.title}
              stepIndex={i + 1}
              className={`bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-start gap-4 ${
                i === CASES.length - 1 ? 'md:col-span-2 md:w-3/4 md:mx-auto' : ''
              }`}
            >
              <div className="bg-slate-800 p-2.5 rounded-lg text-slate-300 shrink-0">
                <Briefcase size={18} />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-100 font-bold mb-1.5 text-base leading-snug">{c.title}</h4>
                <p className="text-slate-400 text-sm mb-3 leading-relaxed">{c.need}</p>
                <div className={`text-sm px-3 py-2 rounded-lg border leading-relaxed ${TONES[c.tone]}`}>
                  <strong>建議做法：</strong>
                  {c.answer}
                </div>
              </div>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
