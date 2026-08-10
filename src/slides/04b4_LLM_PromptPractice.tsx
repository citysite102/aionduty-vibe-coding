import type { ReactNode } from 'react';
import { Pencil } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 這一頁原本只有兩句話，沒有附上被抱怨的那個東西。
 *
 * 那樣其實是無解的：要把「這個按鈕怪怪的」改成不用猜的版本，
 * 前提是你知道它哪裡怪。看不到按鈕，學員只能自己編一個毛病出來，
 * 練的就不是「把話講清楚」，是「編一個需求」。
 *
 * 兩個實物都是照著上一頁那三個檢查點設計的：
 *   1 代稱換名字   → 按鈕上有字、投影片有標題，名字是看得到的
 *   2 講清楚邊界   → 兩張圖裡都有「不該被動到」的東西（取消鍵、原本的文案）
 *   3 直接給它看   → 這兩張圖本身就是正解的一部分，貼給它比形容十句有用
 * 換掉實物之前先確認新的那個也同時滿足這三件事。
 */

/**
 * 題一：訂單表單。毛病要看得見，學員才有東西可以描述，
 * 所以「儲存草稿」故意染成警示紅、還是三顆裡最搶眼的那一顆，
 * 真正要按的「送出」反而跟「取消」一樣灰。
 */
const ButtonMock = () => (
  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
    <div className="text-xs font-mono text-slate-600 mb-3">訂單表單</div>
    <div className="space-y-2 mb-4">
      <div className="h-2 w-2/3 rounded bg-slate-800" />
      <div className="h-2 w-1/2 rounded bg-slate-800" />
    </div>
    <div className="flex gap-2">
      <div className="rounded-md border border-red-500 bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-300">儲存草稿</div>
      <div className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-400">送出</div>
      <div className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-400">取消</div>
    </div>
  </div>
);

/** 題二：現有的那一頁簡報，沒有層次 */
const SlideMock = () => (
  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
    <div className="text-xs font-mono text-slate-600 mb-3">第 3 頁</div>
    <div className="rounded-md bg-slate-900 px-4 py-3">
      <div className="text-sm text-slate-300 mb-2">產品介紹</div>
      <div className="space-y-1 text-xs text-slate-500">
        <div>· 支援多人同時編輯</div>
        <div>· 可以匯出成 Excel</div>
        <div>· 有權限管理</div>
      </div>
    </div>
  </div>
);

const DRILLS: { prompt: string; mock: ReactNode; caption: string; nudge: string }[] = [
  {
    prompt: '「這個按鈕怪怪的，修一下」',
    mock: <ButtonMock />,
    caption: '你手上的畫面',
    nudge: '紅色通常代表「按下去會出事」。哪一顆該紅、哪一顆該最顯眼？按鈕上有字，那就是它的名字，另外兩顆不該被動到。',
  },
  {
    prompt: '「幫我做一頁產品介紹的簡報，要專業一點」',
    mock: <SlideMock />,
    caption: '你現在有的那一頁',
    nudge: '「專業一點」是在跟什麼比？還有，三行文案要留著還是可以改？',
  },
];

export default function SlideLLMPromptPractice() {
  return (
    <SlideLayout title="換你改這兩句" subtitle="Try It Yourself" icon={Pencil}>
      <div className="max-w-5xl mx-auto space-y-5 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-base leading-relaxed">
          照剛才那三個檢查點，把下面兩句改成它不用猜的版本。附的那張圖是你手上真正有的東西。
        </AnimatedBlock>

        {DRILLS.map((d, i) => (
          <AnimatedBlock
            key={d.prompt}
            stepIndex={i + 2}
            className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 items-start">
              <div>
                <div className="text-slate-200 text-xl leading-snug mb-4">{d.prompt}</div>
                <div className="border-t border-dashed border-slate-700 pt-3 text-slate-600 text-base">
                  改寫：
                </div>
                <div className="h-10" />
                <p className="text-slate-500 text-sm leading-relaxed">{d.nudge}</p>
              </div>
              <div>
                <div className="text-xs text-slate-600 mb-2">{d.caption}</div>
                {d.mock}
              </div>
            </div>
          </AnimatedBlock>
        ))}

        {/*
          原本是「念給旁邊的人聽，他反問你就代表 AI 也會猜錯」。
          線上課沒有旁邊的人，但那句的功能是「不需要講師改的自我檢查」，
          所以替代的也要能自己執行：念到得補一句「我的意思是」就是同一個訊號。
          第二句把「講不清楚的直接貼給它看」變成真的做得到的動作，
          自己看影片的人才有辦法當場驗一次。
        */}
        <AnimatedBlock stepIndex={4} className="text-slate-400 text-base leading-relaxed px-1 space-y-1.5">
          <p>
            改完自己念一遍。
            <span className="text-slate-200">念到需要停下來補一句「我的意思是⋯」，那個地方 AI 也會猜。</span>
          </p>
          <p>
            還是不確定，就把改寫後的句子連同那張圖一起貼給它，問它「你還需要猜哪些地方」。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
