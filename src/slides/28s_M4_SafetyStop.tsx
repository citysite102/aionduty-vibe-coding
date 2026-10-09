import { AlertCircle, ShieldCheck, Undo2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { hoverIsolateGrid, hoverIsolateCardRing } from '../components/hoverIsolate';

/**
 * 2026-10-08 新增：從 `28_M4_Safety.tsx` 拆出來的後兩道。拆頁的理由與編號為什麼不重排，
 * 寫在那一份的檔頭，改這一頁之前先讀它。
 *
 * **第 4、5 道的編號是對外的。** 全片有六處按序數引用（`28e_M4_ToolBoundary` 引第三道、
 * `27b9b_M4_SupabaseStore` 引第二道、`27b4c_M4_Intervene` 註解裡寫「『它能花多少』是第五道」），
 * 所以這一頁的卡片仍然叫 4 與 5，不要因為它是一頁的第一張就改成 1。
 *
 * 第 4 道原本只有一句話列出五種收不回來的動作，拆頁之後有空間，改成看得見的五個格子。
 * 那五個是分類不是清單，**不要再往裡面加**，加到七八個就沒有人記得住了。
 *
 * 2026-10-09：第 4 道卡片的第一句原本是「專案內改壞了可以用 git 復原；但有些動作收不回來：」，
 * 冒號後面接的那五格 10-08 拆頁時搬到開場了，所以它斷在冒號上，而且跟開場那句重複。
 * 改成那句學員帶得走的判斷標準（十分鐘之內救不救得回來），逐字稿本來就在念它。
 * **五類清單只留在開場那一塊，不要在這張卡再列一次。**
 */
const IRREVERSIBLE = ['推上遠端', '發信給別人', '付款', '刪除雲端資料', '公開部署'];

export default function SlideSafetyStop() {
  return (
    <SlideLayout title="後兩道邊界：要你點頭的動作，和花錢的上限" subtitle="Safety Protocols 4–5" icon={AlertCircle}>

      <div className="flex flex-col gap-4 max-w-6xl mx-auto mt-2">
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-300 text-base leading-relaxed">
            前三道管的是<strong className="text-slate-100">它碰得到什麼</strong>。剩下兩道管的是另一件事：
            哪些動作就算它做對了，也要先問過你；以及它一個晚上最多能花多少錢。
          </p>
          <div className="mt-3 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <Undo2 aria-hidden="true" size={15} className="text-amber-400 shrink-0" />
              <span className="text-slate-200 text-sm font-bold">專案裡改壞了可以復原，這五種收不回來</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {IRREVERSIBLE.map((x) => (
                <span key={x} className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-200 text-sm">
                  {x}
                </span>
              ))}
            </div>
          </div>
        </AnimatedBlock>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-1 ${hoverIsolateGrid}`}>
          <AnimatedBlock stepIndex={2} className={`bg-slate-900/60 p-5 rounded-3xl border border-amber-900/40 shadow-xl ${hoverIsolateCardRing}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-500/20 w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="text-amber-400" size={18} />
              </div>
              <h3 className="text-base font-bold text-amber-300 tracking-wide">4. 收不回來的動作，一律留人類確認</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              判斷標準只有一句：<strong className="text-slate-200">這件事做錯了，我十分鐘之內救得回來嗎</strong>。
              救不回來的，就不要放進自動流程。
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mt-2 border-l-2 border-amber-900/60 pl-3">
              <strong className="text-slate-100">怎麼避免：</strong>
              上面那五類一律保留人類確認，不要放進自動流程。
              <span className="block mt-1.5 text-slate-400">最低成本的保險：動工前先 <code className="text-slate-200 bg-slate-950 px-1 rounded font-mono">git commit</code> 一次。</span>
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className={`bg-slate-900/60 p-5 rounded-3xl border border-amber-900/40 shadow-xl ${hoverIsolateCardRing}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-500/20 w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle className="text-amber-400" size={18} />
              </div>
              <h3 className="text-base font-bold text-amber-300 tracking-wide">5. 在後台設用量上限</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              它會自己跑，所以也會<strong className="text-slate-100">自己花錢</strong>。
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mt-2">
              前面四道管的是它會做什麼，這一道管的是它能花多少。
              <strong className="text-slate-100">怎麼避免：</strong>去後台設一個上限，帳單才不會在你睡覺的時候長大。
              <span className="block mt-2 text-slate-500">還沒跑過的流程，先拿一小部分資料試跑，確認產出長得對再讓它跑完整批。</span>
            </p>
          </AnimatedBlock>
        </div>
      </div>

    </SlideLayout>
  );
}
