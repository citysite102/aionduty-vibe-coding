import { ArrowRightLeft, BriefcaseBusiness, Database, FileText, Palette, ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const PIECES = [
  { icon: FileText, title: '需求說明', note: '誰要用、用來完成哪一段工作' },
  { icon: ArrowRightLeft, title: 'API 合約', note: '前端要送什麼、後端要回什麼' },
  { icon: Database, title: '資料基礎', note: '客戶、品項、報價單與明細' },
  { icon: Palette, title: '設計規範', note: '表單、狀態、金額欄位與用字' },
  { icon: ShieldCheck, title: '審查小幫手', note: '報價送出前，先找缺口' },
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
            這不是要取代任務計時器主作品，也不是要現場做完全部功能；這段只練中型專案的拆解方式。
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
                <Icon aria-hidden="true" size={24} className="text-sky-400 mb-3" />
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
