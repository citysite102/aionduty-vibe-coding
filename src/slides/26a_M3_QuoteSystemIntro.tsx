import { ArrowRightLeft, BriefcaseBusiness, Database, FileText, Palette, ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/*
 * 五格是這一段的路線，不是五個並列的選項，所以要編號。
 * 順序有意義：先講清楚要做什麼，才有辦法談它由哪幾層組成，
 * 有了層次才知道資料怎麼放，規範和審查是最後才蓋上去的。
 */
const PIECES = [
  { n: '1', icon: FileText, title: '需求說明', note: '誰要用、用來完成哪一段工作' },
  { n: '2', icon: ArrowRightLeft, title: '產品結構', note: '由哪幾層組成、各層怎麼串' },
  { n: '3', icon: Database, title: '資料基礎', note: '客戶、品項、報價單與明細' },
  { n: '4', icon: Palette, title: '設計規範', note: '表單、狀態、金額欄位與用字' },
  { n: '5', icon: ShieldCheck, title: '審查子代理', note: '報價送出前，先找缺口' },
];

export default function SlideQuoteSystemIntro() {
  return (
    <SlideLayout title="把分工放進一個中型專案" subtitle="Module 3 Practice" icon={BriefcaseBusiness}>
      <div className="max-w-5xl mx-auto w-full min-h-full flex flex-col justify-center pb-8 space-y-6">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-100 text-2xl font-bold leading-snug mb-2">
            接下來用「客戶報價系統」做一次完整預演。
          </p>
          <p className="text-slate-400 text-base leading-relaxed">
            這不是要取代任務計時器主作品，也不是要把全部功能做完。
            這一段練的是中型專案的拆解方式，下面五步就是順序，先講清楚要什麼，才有辦法談它怎麼組成。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {PIECES.map((piece, index) => {
            const Icon = piece.icon;
            return (
              <AnimatedBlock
                key={piece.title}
                stepIndex={index + 2}
                className="rounded-lg border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon aria-hidden="true" size={24} className="text-sky-400" />
                  <span className="font-mono text-sm font-bold text-slate-600">{piece.n}</span>
                </div>
                <h3 className="text-slate-100 text-base font-bold leading-snug mb-1">{piece.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{piece.note}</p>
              </AnimatedBlock>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
}
