import { Map, ArrowDown, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 單元 7-4 第六頁。2026-11 新增，影片裡還沒有這一段。
 * 出處與不引用的理由寫在 `27g_M4_GraphLayer` 檔頭（C-1／C-2）。
 *
 * ── 這一頁的職務 ────────────────────────────────────────────
 * 把前面幾頁的東西放回同一張圖，到閘門分出沒過與過了為止。
 * 兩條回饋路徑在下一頁，原本跟這一頁合在一起，2026-11-04 量過之後拆開：
 * 合起來在 1512x772 溢出 747px，而光是這張圖就填滿一個畫面，壓縮救不了。
 *
 * **學習路徑就是章節五那一套規範維護**，只是從另一個方向看：
 * 那邊教的是手冊怎麼寫、怎麼健檢，這裡講的是那些規則從哪裡來。
 * 所以落點那幾個（CLAUDE.md、測試規範、Skill）全部是學員已經有的東西，
 * **不要在這裡新增第四種落點**，那會跟 Slide 100、106「同一條規則不要放兩個地方」打架（B-6）。
 *
 * ⚠ 最後那兩個但書不要刪，它們擋的是這一整個單元最可能造成的誤解：
 *   1. 學習路徑不是每次成功都寫成永久規則。那會讓手冊越長越肥、規則互相打架，
 *      正是章節五整章在收的爛攤子。
 *   2. 「人只審最後一步」是有前提的。規格一開始就錯，每個節點都會通過測試，
 *      交出來的東西照樣不是你要的。所以至少留兩個要你點頭的地方。
 *
 * 用色：主流程 sky、通過與退回是 emerald／rose 成對算一種，合計兩種（A-1）。
 * 但書用 muted 不用 warn，**因為 amber 會變成第三種色**。
 *
 * 閘門底下那一段講「它說自己有多確定排在最後」。那一條原本想補進 `28s_M4_SafetyStop`
 * 的第 4 道，後來沒有：那一頁已經在教「十分鐘之內救不救得回來」，可逆性判斷本身它有了，
 * **而且那一頁錄過影，改內容會讓口白對不上畫面（A-5）**。所以只有真的新的那半句放在這裡，
 * 並且回頭指到那條判斷標準，不要在這裡重寫一次。
 */

/** 每個執行節點裡面那一圈，就是前面四頁的 Loop */
const WORKER_LOOP = ['做', '測', '沒過就改'];

/**
 * 2026-11-04 複查時從「畫面、API、測試」換成電商那三塊。
 * 原本把「測試」排成跟畫面、API 並行的節點，而上一頁才剛教過整合測試要讀前面的產出，
 * 兩頁打架（B-6）。換成 162 與 166 都在用的電商三塊，整個單元也串得起來。
 */
const WORKERS = ['商品列表', '會員登入', '購物車'];

/**
 * 三個執行節點裡面那一圈是持續動的，**這是刻意的，不要清掉**（同 `27_M4_LoopEng` 的註記）。
 * 整張圖的重點就是「三塊同時在跑，而且每一塊裡面都有自己的迴圈」，靜止的圖看不出這件事，
 * 剩下的差別只有文字。2026-11-04 講師指定要這個效果。
 *
 * `OFFSET` 讓三個節點彼此錯開，不然三欄會同步閃，看起來像一個整體在跑而不是三個各跑各的。
 * 錄的時候念完就走，不要停在這一頁等它跑完一輪。
 */
const CYCLE = 2.7;
const OFFSET = 0.9;

export default function SlideGraphMap() {
  return (
    <SlideLayout
      title="從規格到交付：拆解一張完整的 Graph"
      subtitle="The Whole Graph"
      icon={Map}
    >
      <div className="max-w-5xl mx-auto w-full space-y-4 pb-6">

        {/* 全景圖 */}
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-5">
          <div className="flex flex-col items-center">

            <div className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-2 text-center">
              <div className="text-slate-100 text-base font-bold">規格（你給的輸入，底下才開始是節點）</div>
              <div className="text-slate-400 text-xs mt-0.5">要做什麼、怎樣叫做完、哪些東西不能碰</div>
            </div>

            <ArrowDown aria-hidden="true" size={14} className="text-slate-600 my-1.5" />

            <div className="w-full rounded-xl border border-sky-500/30 bg-sky-500/5 px-5 py-2 text-center">
              <div className="text-sky-300 text-base font-bold">拆解節點</div>
              <div className="text-slate-400 text-xs mt-0.5">切成幾塊、誰等誰、哪一塊出錯最難收回</div>
            </div>

            <ArrowDown aria-hidden="true" size={14} className="text-slate-600 my-1.5" />

            <div className="w-full text-center text-slate-500 text-xs mb-1">執行節點，三塊同時跑，各跑各的那一圈</div>
            <div className="w-full grid grid-cols-3 gap-3">
              {WORKERS.map((w, wi) => (
                <div key={w} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className="text-slate-100 text-sm font-bold">{w}</span>
                    <motion.span
                      aria-hidden="true"
                      className="text-slate-600"
                      animate={{ rotate: 360 }}
                      transition={{ duration: CYCLE, repeat: Infinity, ease: 'linear', delay: wi * OFFSET }}
                    >
                      <RefreshCw size={11} />
                    </motion.span>
                  </div>
                  <div className="space-y-1">
                    {WORKER_LOOP.map((step, si) => (
                      <motion.div
                        key={step}
                        className="text-xs text-center text-slate-400"
                        animate={{ opacity: [0.35, 0.35, 1, 0.35] }}
                        transition={{
                          duration: CYCLE,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          times: [0, si / 3, (si + 0.5) / 3, (si + 1) / 3],
                          delay: wi * OFFSET,
                        }}
                      >
                        {step}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <ArrowDown aria-hidden="true" size={14} className="text-slate-600 my-1.5" />

            <div className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-2 text-center">
              <div className="text-slate-100 text-base font-bold">合併：這裡就是那個程式節點</div>
              <div className="text-slate-400 text-xs mt-0.5">接起來、比對這一輪改了哪些東西，不用模型</div>
            </div>

            <ArrowDown aria-hidden="true" size={14} className="text-slate-600 my-1.5" />

            <div className="w-full rounded-xl border border-sky-500/30 bg-sky-500/5 px-5 py-2 text-center">
              <div className="text-sky-300 text-base font-bold">閘門：這一塊能不能放行</div>
              <div className="text-slate-400 text-xs mt-0.5">
                測試過了沒　改到的檔案有沒有超出講好的範圍　錯了救不救得回來　有沒有證據
              </div>
            </div>

            <div className="w-full grid grid-cols-3 gap-3 mt-2">
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 px-4 py-2 text-center">
                <div className="text-rose-300 text-sm font-bold">沒過</div>
                <div className="text-slate-400 text-xs mt-0.5">只退回這一塊，帶著證據</div>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-center">
                <div className="text-slate-200 text-sm font-bold">過了但錯了難收回</div>
                <div className="text-slate-400 text-xs mt-0.5">停下來等你點頭</div>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-center">
                <div className="text-emerald-300 text-sm font-bold">過了而且救得回來</div>
                <div className="text-slate-400 text-xs mt-0.5">直接放行</div>
              </div>
            </div>
          </div>

          <p className="text-slate-400 text-base leading-relaxed mt-3 pt-3 border-t border-slate-800">
            閘門先看程式跑出來的結果，再看這一輪的過程，
            <strong className="text-slate-200">它說自己有多確定排在最後</strong>，
            因為那是唯一一項它自己影響得了的。真正要看的是：做錯了，十分鐘之內救不救得回來。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
