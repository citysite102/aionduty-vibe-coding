import { Copy } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HandbookState } from './_HandbookState';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-09-23：講師回饋兩件事。
 * 一、標題不用強調行數。「十三行」是那個計時器專案剛好的大小，不是目標值，
 *     擺在標題上會讓學員以為自己的手冊也該收到十三行。行數留在內文講一次就夠。
 * 二、「換個介面照用」太抽象。學員讀完不知道手要動什麼，所以換成三列，
 *     一列一個介面，各寫出實際的動作，跟上一頁那張三欄表對得起來。
 *
 * 這一頁只放得下手冊面板加那三列：面板本身就佔掉四百多 px。原本那塊「少掉的那一行去哪了」
 * 與「自己驗一次」都拿掉了，面板上的刪除標記已經看得到，驗證那一句口白會念。
 * 想再加東西之前先開 ?slide=118&step=9&clean=1 看一次，多一塊就會被推出畫面，
 * 而預錄頁看不到就等於沒有。
 *
 * 2026-10-04 瘦身。表頭原本寫「帶去別的地方，內容一個字都不用改」，而「不用重學／一個字都不用改」
 * 這個承諾上一頁（33_SurfaceIntro）跟下一頁（32_Cheat_Tools）各講過一次，連著三頁同一句。
 * 表頭改成動作本身，口白也拿掉結尾那句「內容一個字都不用改」，三列的內容沒動。
 * 這一頁真正獨有的是成長軸的收尾那一句（長出來、整理掉、再長出來），口白裡那一段要念滿。
 *
 * 最後查證：2026-09-23。Claude Projects 放常駐指示那一欄，官方說明文件寫的是
 * project instructions（support.claude.com/en/articles/9517075-what-are-projects），
 * 中文介面上的實際字樣本輪沒有開實機對過，錄影前看一眼再念。
 */

export const meta: RecordedMeta = {
  id: 'harness-58-handbook-v5',
  title: '手冊定稿：同一份規則，用在哪幾個地方',
  script:
    '這份檔案到這裡定型了。少掉的那一條是併回全域手冊的那一條，搬去 Hook 的那一條也沒有消失，換成一行指向 .claude/settings.json 的提醒。' +
    '它這麼短是因為那個計時器就這麼大，不是因為短比較好。你自己的專案會比它長，但不會一直長下去：長出來、整理掉、再長出來。這一條成長軸走到這裡就收完了，五個版本你都看過了。' +
    '那這份檔案寫完之後，它會在哪裡被讀到？這一點比它長什麼樣重要，因為你平常不會只有一種工作方式。畫面上那三列的左邊是情境，右邊是那個情境下你手要動什麼。' +
    '第一種，你在終端機裡改這個專案的程式。什麼都不用做，Claude Code 每一輪自己就讀進去了，你前面一直在用的就是這一種。' +
    '第二種，你在桌面版整理這個資料夾裡的檔案，不一定是程式，可能是一批文件。切到 Cowork，綁上同一個資料夾，它一樣讀得到同一份規則。' +
    '第三種，你根本沒有打開那個資料夾，只是在網頁上問一句話。那就在 claude.ai 開一個 Project，把整份貼進專案指示那一欄，之後每次對話它都會帶上。' +
    '三種的共同點是：規則只有一份，換的是你怎麼把它交給它。',
  seconds: 96,
  from: 71,
};

/** 三列對應上一頁那張三欄表的三個介面，由「什麼都不用做」往「要自己貼」排 */
/**
 * 2026-10-04：三列從「三個介面」改成「你在做什麼」。講師回饋：這一頁要強調的是
 * **規則檔案寫完之後，怎麼套用到不同的工作流程裡**，而不是三個產品各叫什麼名字。
 * 所以左欄換成學員認得出的情境（在終端機改程式／在桌面版整理那個資料夾／只是上網頁問一句），
 * 右欄才是那個情境下手要動什麼。產品名稱收進右欄，因為它是動作的一部分，不是分類依據。
 */
const CARRY = [
  { where: '在終端機改這個專案的程式', act: '什麼都不用做，Claude Code 每一輪自己讀' },
  { where: '在桌面版整理這個資料夾的檔案', act: '切到 Cowork，綁上同一個資料夾，它一樣讀得到' },
  { where: '只是在網頁上問一句話', act: '在 claude.ai 開一個 Project，整份貼進專案指示那一欄' },
];

export default function RecHandbookV5() {
  return (
    <SlideLayout title={meta.title} subtitle="Your Handbook So Far" icon={Copy}>
      <RecPage className="space-y-3">
        <HandbookState stepIndex={1} version={5} />

        {/*
          「換個介面照用」原本只有一句話，學員不知道手要動什麼。一列一個介面，各給一個動作。
          「少掉的那一條併回全域手冊」那段說明拿掉了：面板上的刪除標記已經看得到，
          口白也會念，再印一次會把下面兩塊擠出畫面。
        */}
        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900 px-7 py-2 text-sm text-slate-500">
帶去別的地方，<Key>各做一件事</Key>
          </div>
          {CARRY.map((c) => (
            <div
              key={c.where}
              className="grid grid-cols-[14rem_1fr] gap-5 px-7 py-2 border-b border-slate-800/70 last:border-0"
            >
              <span className="text-slate-200 text-base font-bold">{c.where}</span>
              <span className="text-slate-400 text-base">{c.act}</span>
            </div>
          ))}
        </AnimatedBlock>

      </RecPage>
    </SlideLayout>
  );
}
