import { AnimatedBlock } from '../../components/SlideLayout';

/**
 * 寫法技巧的並排版。取代原本的 `_DontDo`（一頁一組、上紅框下綠框）。
 *
 * 2026-10-04 改的理由：六個技巧原本一個技巧一頁，六頁共用同一個元件，
 * 版面一模一樣。連續六頁長得一樣是這一支影片最大的風險（講師：「我很怕這一段
 * 教學起來非常無聊」），而且**三條並排才看得出它們是同一類的三種做法**，
 * 分開講反而看不出差別。先例是同一個資料夾的 `33_SurfaceIntro`，檔頭寫著
 * 同一個理由：「三頁分開講，學員反而看不出它們的差別在哪，因為沒有並排。」
 *
 * 六組的 `bad` 與 `good` 原文一字沒改，只是從一頁一組變成一頁三組，
 * 所以字級從 `text-xl` 降到 `text-base`、框從 p-6 收成 px-5 py-3.5。
 * **不要為了好看再把它放大回去**，放大就塞不下三組，又會退回一頁一組。
 *
 * 紅框加綠框是同一個對照關係的兩邊，依 CLAUDE.md A-1 合計算一種強調色。
 */
export type Tip = {
  /** 技巧名稱，列在那一組的最上面 */
  name: string;
  bad: string;
  badNote?: string;
  good: string;
  goodNote?: string;
};

export function TipRows({ tips, stepFrom = 1 }: { tips: Tip[]; stepFrom?: number }) {
  return (
    <div className="space-y-4">
      {tips.map((t, i) => (
        <AnimatedBlock
          key={t.name}
          stepIndex={stepFrom + i}
          className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4"
        >
          <div className="text-slate-100 text-xl font-bold mb-3">{t.name}</div>

          <div className="grid grid-cols-[2.5rem_1fr] gap-x-3 gap-y-2.5 items-baseline">
            <span className="text-red-400 font-bold text-base">✕</span>
            <span>
              <span className="text-slate-300 text-base leading-relaxed">{t.bad}</span>
              {t.badNote && <span className="block text-slate-500 text-sm mt-1 leading-relaxed">{t.badNote}</span>}
            </span>

            <span className="text-emerald-400 font-bold text-base">✓</span>
            <span>
              <span className="text-slate-200 text-base leading-relaxed">{t.good}</span>
              {t.goodNote && <span className="block text-slate-500 text-sm mt-1 leading-relaxed">{t.goodNote}</span>}
            </span>
          </div>
        </AnimatedBlock>
      ))}
    </div>
  );
}
