import { ArrowRightLeft, BriefcaseBusiness, Database, FileText, Palette, ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/*
 * 五格是這一段的路線，不是五個並列的選項，所以要編號。
 * 順序有意義：先講清楚要做什麼，才有辦法談它由哪幾層組成，
 * 有了層次才知道資料怎麼放，規範和審查是最後才蓋上去的。
 *
 * 2026-09-23：講師回饋學員在這裡會有兩個疑問，而原本的版面兩個都沒有正面回答：
 * 「為什麼突然要講一個專案」，以及「這一段到底要不要跟著做」。
 * 原本第一塊先講做什麼（「接下來用客戶報價系統做一次完整預演」），再把三個但書
 * 塞進同一段，讀起來像免責聲明，而「為什麼換題目」根本沒寫在畫面上，只在口白裡。
 *
 * 現在第一塊只回答為什麼換題目（計時器一句話就交代得完，示範不出拆解），
 * 第二塊回答怎麼聽，而且明講這一段沒有新觀念、每一格前面都教過。
 * 最後那一點是講師特別提的：這一段是把前面學的東西第一次放進同一個題目，
 * 不講的話學員會以為又開了一個新主題。
 *
 * 標題也一起改。原本是「把分工放進一個中型專案」，但五格裡只有第四格跟分工有關，
 * 其餘四格是需求、結構、資料、推進，標題承諾的東西頁面上沒有那麼多（D-5）。
 */
const PIECES = [
  { n: '1', icon: FileText, title: '需求說明', note: '誰要用、用來完成哪一段工作' },
  { n: '2', icon: ArrowRightLeft, title: '產品結構', note: '由哪幾層組成、各層怎麼串' },
  { n: '3', icon: Database, title: '資料基礎', note: '客戶、品項、報價單與明細' },
  { n: '4', icon: Palette, title: '規範與審查', note: '表單、狀態、金額欄位，以及誰負責挑錯' },
  { n: '5', icon: ShieldCheck, title: '推進與踩雷', note: '五個指令的順序，跟最常卡住的五件事' },
];

export default function SlideQuoteSystemIntro() {
  return (
    <SlideLayout title="一個中型專案，從需求拆到踩雷" subtitle="Module 3 Practice" icon={BriefcaseBusiness}>
      <div className="max-w-5xl mx-auto w-full min-h-full flex flex-col justify-center pb-8 space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-100 text-2xl font-bold leading-snug mb-2">
            計時器一句話就交代得完，所以它示範不出「拆解」
          </p>
          <p className="text-slate-400 text-base leading-relaxed">
            換一個卡在尷尬大小的題目：客戶報價系統。一個人做得完，但一句話交代不完，而你工作上真正會碰到的東西多半是這個尺寸。
          </p>
        </AnimatedBlock>

        {/* 學員在這裡最想知道的兩件事：我要不要跟著做，以及這是不是又一個新主題 */}
        <AnimatedBlock stepIndex={2} className="rounded-xl border border-sky-500/25 bg-sky-500/5 p-6">
          <p className="text-slate-200 text-base leading-relaxed">
            <strong className="text-sky-300 font-bold">這一段沒有新東西。</strong>
            需求怎麼描述、前端後端跟資料庫怎麼分、手冊寫什麼、審查者怎麼設，前面都教過了，
            這裡是第一次把它們放進同一個題目。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2">
            所以看流程就好，不用開新專案，也不取代你的任務計時器。後面那五段指令，等你要做比計時器大的東西時再回來抄。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {PIECES.map((piece, index) => {
            const Icon = piece.icon;
            return (
              <AnimatedBlock
                key={piece.title}
                stepIndex={index + 3}
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
