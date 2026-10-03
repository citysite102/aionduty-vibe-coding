import { ShieldX } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HookCiTable } from '../../components/HookCiTable';
import { AskFirst } from '../../components/AskFirst';
import { SeriesRail, ROUTE_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * **這一頁刻意超過 45 秒**（2026-10-03，推算 70 秒）。它要收兩個學員一定會問的問題，
 * 砍掉任何一個都會讓這一格變回「聽起來有道理但用不出來」：
 *   1. Hook 跟 CI 到底選哪一個。原本只說「Hook 擋你這台機器、CI 擋整個團隊」，
 *      那聽起來像覆蓋範圍，所以學員會推論「每台都裝 Hook 就等於團隊」。四欄對照
 *      （共用元件 HookCiTable，Slide 73 也用同一份）就是為了把那個推論擋掉。
 *   2. 「不能把密碼或金鑰寫進程式碼裡」這種規則，程式真的分得出來嗎。這裡只給一句
 *      機制（比對長相：固定開頭與長度、變數名稱、亂度），完整的三種偵測方式與限制
 *      在 Slide 156，不要在這裡展開。
 * 要砍的時候該問的是「這一頁要不要拆成兩支影片」，不是把內容削短（CLAUDE.md A-4）。
 */
export const meta: RecordedMeta = {
  id: 'harness-05-route-q1',
  title: '規則放哪：會出事的，交給 Hook',
  script:
    '第一個問題：違反了會出事，絕對不能發生嗎？如果是，交給 Hook 或 CI，就是前面看過的那兩道關卡。這一層跟另外三層有一個本質差別：這兩道關卡都不在對話裡，是程式在擋，不經過 AI 判斷，所以不會因為它漏讀就失效。那兩個之間怎麼選？畫面上那張表列了四欄，最關鍵的是最後一欄：Hook 繞得過，別人用別的工具改就不會觸發；CI 設成合併前的必要檢查就繞不過。所以 Hook 給你當場的回饋，CI 才是算數的那一道，兩個是搭配的。像是不能把密碼或金鑰寫進程式碼裡，這種就屬於這一層。順帶一提，程式怎麼知道那串字是金鑰？它比對的是長相：金鑰通常有固定的開頭，而且是一長串沒有規律、唸不出來的字。章節八推上 GitHub 那一段會講細節。判斷標準是：這件事錯一次，收得回來嗎。',
  seconds: 70,
  from: 69,
};

export default function RecRouteQ1() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={ShieldX}>
      <RecPage>
        <SeriesRail {...ROUTE_RAIL} current={0} revealAt={2} />

        {/* 方法（照順序問四題、第一個答是的就是答案）已經獨立成前一頁，這裡直接開題目 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <AnimatedBlock stepIndex={1}>
            <p className="text-slate-300 text-2xl leading-snug mb-6">違反了會出事，絕對不能發生？</p>

            <AskFirst />
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="mt-7">
            <p className="text-sky-300 text-4xl font-bold mb-5 leading-snug">交給 Hook 或 CI</p>

            <p className="text-slate-400 text-xl leading-relaxed">
              這兩道關卡都不在對話裡，是程式在擋，不經過 AI 判斷，所以不會因為它漏讀就失效。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={3} className="mt-5 px-2">
          <div className="flex items-baseline gap-4">
            <span className="text-slate-500 text-base shrink-0">例如</span>
            <span className="text-slate-300 text-xl">不能把密碼或金鑰寫進程式碼裡</span>
          </div>
          <p className="text-slate-500 text-base leading-relaxed mt-2 pl-[3.6rem]">
            程式怎麼分辨？金鑰通常有固定的開頭，而且是一長串沒有規律、唸不出來的字。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 px-7 py-5">
          <div className="text-slate-100 font-bold text-xl mb-1">那兩個之間怎麼選？</div>
          <p className="text-slate-500 text-base leading-relaxed mb-3">
            每個人都裝 Hook，不等於團隊擋得住。
          </p>
          <HookCiTable size="rec" />
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
