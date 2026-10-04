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
 *
 * 2026-10-04（講師）：「這個案例要引導學員學一個專案的建構流程，以及自己要負責哪些部分。」
 * 原本第二塊只寫「這一段沒有新東西⋯看流程就好，不用開新專案」，兩個問題：
 *
 *   一、**不是真的沒有新東西**。主檔與明細、狀態流轉、金額用整數分存，三個都是新的，
 *      而且是這一段最難的三個。那句話會讓跟不上的學員以為是自己的問題。
 *   二、「看流程就好」把整段都劃成旁觀，但第一塊（User Story、三題、範圍）學員自己做得到，
 *      而且那正是這一段最值得帶走的東西。現在口徑改成分開講：哪一段跟著做、哪一段看過去。
 *
 * `SPLIT` 那一塊是講師問題的正面回答（你負責什麼、交出去什麼）。
 * **它跟 26e 第一塊的「前兩步你只做兩件事」是同一條線，改一邊要看另一邊（B-4）。**
 */

/** 這一段裡哪些是你的、哪些交給它。對應 26e 前兩步的分工。 */
const SPLIT = [
  {
    t: '你負責',
    v: '這個產品給誰用、為了什麼、這一輪做到哪裡、哪些不做。以及它每產出一份東西，你同不同意。',
  },
  {
    t: '交給它',
    v: '資料表怎麼切、API 怎麼定、畫面骨架怎麼搭、程式碼怎麼寫。這幾件你不用會，但要看得懂它問你的問題。',
  },
];
const PIECES = [
  { n: '1', icon: FileText, title: '需求與範圍', note: '角色、他們的 User Story、要不要後端' },
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

        {/* 學員在這裡最想知道的兩件事：我要不要跟著做，以及這一段裡哪些是我的工作 */}
        <AnimatedBlock stepIndex={2} className="rounded-xl border border-sky-500/25 bg-sky-500/5 p-6">
          <p className="text-slate-200 text-base leading-relaxed">
            <strong className="text-sky-300 font-bold">這一段練的是一個專案怎麼從一句話長出來。</strong>
            前端後端怎麼分、資料庫是什麼、手冊寫什麼、審查者怎麼設，前面都教過了，這裡第一次把它們放進同一個題目。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {SPLIT.map((x) => (
              <div key={x.t} className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="text-slate-200 text-sm font-bold mb-1">{x.t}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{x.v}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-base leading-relaxed mt-3">
            第一塊換成你自己的題目做一次：列出角色、寫出他們各自要完成的事、再回答三個問題。
            後面的資料表、API 與那五段指令是示範，等你要做比計時器大的東西再回來抄。
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
