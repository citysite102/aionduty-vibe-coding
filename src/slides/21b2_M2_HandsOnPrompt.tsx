import { CheckSquare, CornerDownRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyAction } from '../components/CopyBlock';
import { Callout } from '../components/Callout';
import { hoverIsolateGrid, hoverIsolateCard } from '../components/hoverIsolate';

/**
 * 這一頁原本有四步，前兩步是「cd 進專案、開 claude」跟「先讓它讀一遍」。
 * 但上一頁第 1 格就是叫它讀完專案生一份草稿，等於同一件事做兩次，
 * 學員會問這兩頁差在哪。前兩步拿掉，這一頁從那份草稿接下去。
 *
 * 另外原本寫「章節三收尾時它自己總結過一份 CLAUDE.md」，那一步已經
 * 隨著終端機安裝頁搬進選修段，主線上不存在那份檔案了，前提要跟著改。
 * cd 與 claude 兩行也拿掉：主線是桌面版，不預設有終端機。
 *
 * 四張卡的號碼原本 sky / amber / emerald 各一色，那是 A-1 禁的項目編號配色，
 * 這裡是同一條流程的兩步，統一走 sky。
 */
const RULES = [
  '深色星空背景，主色只用在當下要強調的那一個元素。',
  '星球與火箭一律用 canvas 或 CSS 畫，不得引用外部圖片。',
  '按鈕文案使用航太語彙：發射、待機、返航、補給。',
  '倒數的分鐘數要放在最上面當設定，不要散在程式碼裡。',
];

/** 第 1 步要貼的完整內容。畫面上的指令句與清單都從這裡推導，不會兩邊不一致。 */
const STEP1_LEAD = '請在 CLAUDE.md 補上下面這幾條，原本已經有的不要動，以後每次進來都要遵守。';
const STEP1_TEXT = [STEP1_LEAD, ...RULES.map((r, i) => `${i + 1}. ${r}`)].join('\n');

const STEP2_TEXT = '幫我加一個 5 分鐘的「補給時間」模式，樣式請遵守 CLAUDE.md。';

export default function SlideHandsOnPrompt() {
  return (
    <SlideLayout title="跟著做：寫出真正能用的 CLAUDE.md" subtitle="Step-by-step Prompt" icon={CheckSquare}>
      <div className="max-w-5xl mx-auto mt-1 space-y-4 pb-6">

        <AnimatedBlock
          stepIndex={1}
          className="bg-sky-950/20 border border-sky-900/40 rounded-xl px-5 py-3 flex gap-3 items-start"
        >
          <CornerDownRight size={16} className="text-sky-400 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-300 leading-relaxed">
            上一格那份草稿，是它<strong className="text-slate-100">讀完你的程式碼</strong>寫出來的，
            所以裡面只有它看得到的東西。現在補上它看不到的那一半：
            <strong className="text-slate-100">你腦子裡的規矩</strong>。
          </p>
        </AnimatedBlock>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${hoverIsolateGrid}`}>

          <AnimatedBlock
            stepIndex={2}
            className={`bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col ${hoverIsolateCard}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">1</div>
              <h3 className="text-lg font-bold text-slate-100">把約定補進去</h3>
            </div>
            <div className="bg-black/50 p-4 rounded-lg border border-slate-800 text-sky-300 text-sm leading-relaxed">
              <div className="mb-2">You: {STEP1_LEAD}</div>
              <ol className="space-y-1 list-decimal list-inside">
                {RULES.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
              {/* 複製的是指令加四條規則的完整文字，跟畫面上讀到的一致 */}
              <CopyAction text={STEP1_TEXT} className="mt-3" />
            </div>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed">
              這四條都是它讀程式碼讀不出來的：它看得到你用了什麼顏色，看不到你為什麼不准用外部圖片。
            </p>
          </AnimatedBlock>

          <AnimatedBlock
            stepIndex={3}
            className={`bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col ${hoverIsolateCard}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">2</div>
              <h3 className="text-lg font-bold text-slate-100">驗收：規範真的有用嗎</h3>
            </div>
            <div className="bg-black/50 p-4 rounded-lg border border-slate-800 text-sky-300 text-sm leading-relaxed">
              You: {STEP2_TEXT}
              <CopyAction text={STEP2_TEXT} className="mt-3" />
            </div>
            <p className="text-slate-400 text-xs mt-3 leading-relaxed">
              重點在看它有沒有自己去讀那份手冊：按鈕文案有沒有跟上、有沒有偷塞一張外部圖片進來、分鐘數有沒有寫死在程式裡。
            </p>
            <p className="text-slate-300 text-sm mt-3 pt-2.5 border-t border-slate-800 leading-relaxed">
              <strong className="text-slate-100">寫了規範，跟規範被遵守，是兩件事。</strong>
            </p>
          </AnimatedBlock>

        </div>

        <Callout tone="muted" stepIndex={4}>
          手上沒有計時器的話（前面沒做完也沒關係），開一個空資料夾，
          把上面那四條改成你自己工作上真的有的規矩，一樣走得完這兩步。
        </Callout>

      </div>
    </SlideLayout>
  );
}
