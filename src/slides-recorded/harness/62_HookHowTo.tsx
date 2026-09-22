import { ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * **口白刻意超過 45 秒（90 秒），不要砍回去。** 2026-09-23 講師回饋：
 * 「單元 6-2 是希望更詳細的說明 Hook 可以如何使用，因為許多學員對這件事情比較陌生。」
 * 原本這一頁只用一句抽象的「違反了會出事的，還有每一次都要做的」交代用途，
 * 學員聽完仍然不知道自己會拿它做什麼。現在補了四個具體用途（擋金鑰、擋回不來的指令、
 * 存檔後自動排版、收工前跑測試）。要砍的時候該問的是「這一段要不要拆成兩支影片」，
 * 不是把用途刪掉（CLAUDE.md A-4）。
 */
/**
 * Hook 這一組的第一頁，職務只有三件事：為什麼需要它、它憑什麼一定會執行、
 * 什麼時候才值得掛。怎麼寫、有哪些時機、範圍、動作各自往後一頁，這一頁不列設定欄位。
 *
 * 原理原本寫成一段話（「它在幾個固定的時機停下來，把當下要做的事交給你的設定⋯」），
 * 讀者要自己在腦裡把先後順序排出來。改成一排四步，順序由版面講，句子省下來。
 *
 * 例子一律用這份簡報真的掛著的那一條，擋下來的訊息學員在畫面上看得到，
 * 不必相信講者。
 *
 * 但畫面上那句訊息是實際輸出的白話版。scripts/slide-guard.mjs 真的吐回來的是
 * 「D-1 中文破折號（寫成 ⋯）：改用⋯」那一行，前後還各一句，而且它一次檢查七條規則，
 * 破折號只是第一條。畫面取白話版是刻意的（學員要讀得懂那句理由在教它什麼），
 * 錄實機的時候畫面會是長版，口白不要說成一字不差。
 */
export const meta: RecordedMeta = {
  id: 'harness-62-hook-why',
  title: 'Hook 是程式在擋，不是它記得',
  script:
    '規則歸位的四個去處，第一個是 Hook。這個東西多數人沒碰過，所以先講它到底是什麼。手冊是請它記得，而它可能沒讀到，也可能讀到了還是漏掉。Hook 完全不一樣，你寫一段設定，擋的動作是工具自己做的，跟它記不記得沒有關係。流程是這樣：你交代一件事，它動手之前先停下來，把當下要做的事交給你那段設定檢查一次，說可以才過得去。被擋的時候它會看到你寫的理由，然後自己換一個寫法再來。這份簡報就掛著一條：寫檔案之前先看有沒有中文破折號，有就退回去。那實際上可以拿它來做什麼？講幾個常見的。第一，金鑰或密碼寫進程式碼，存檔之前擋下來，這是最多人掛的一條。第二，動到正式環境的資料庫、或者刪掉整個資料夾這種回不來的指令，直接不准。第三，每次存檔之後自動跑排版，這種不是擋，是幫你補一個你一定會忘記的動作。第四，它說做完了的時候自動跑一次測試，沒過就叫它回去改。判斷標準兩個：違反了會出事的，還有每一次都要做、但你一定會忘記提醒的。',
  seconds: 90,
  from: 68,
};

export default function RecHookHowTo() {
  return (
    <SlideLayout title={meta.title} subtitle="Why Hooks" icon={ShieldCheck}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            手冊是請它記得，<Key>Hook 是程式在擋</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="font-mono text-base text-orange-300 mb-2">CLAUDE.md</div>
            <p className="text-slate-400 text-lg leading-relaxed">可能沒讀到，讀到了也可能漏掉</p>
          </div>
          <div className="rounded-2xl border border-sky-500/25 bg-sky-500/5 p-6">
            <div className="font-mono text-base text-orange-300 mb-2">settings.json</div>
            <p className="text-sky-100 text-lg leading-relaxed">你寫設定，工具自己執行</p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 px-7 py-5">
          <div className="text-slate-500 text-base mb-3">它每次動手之前會走這一段</div>
          <FlowRow steps={['你交代一件事', '它動手前停下來', '你的設定檢查一次', '放行或擋下來']} />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-amber-900/40 bg-amber-950/20 px-7 py-5">
          <div className="text-amber-300 text-base font-bold mb-2">被擋的時候它看到這句</div>
          <p className="text-slate-300 text-lg leading-relaxed">
            偵測到中文破折號，請改用逗號、句號、冒號或括號。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 值得掛的只有兩種：違反了會出事，或每一次都要做。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
