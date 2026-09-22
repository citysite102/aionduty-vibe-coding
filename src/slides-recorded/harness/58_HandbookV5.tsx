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
 * 最後查證：2026-09-23。Claude Projects 放常駐指示那一欄，官方說明文件寫的是
 * project instructions（support.claude.com/en/articles/9517075-what-are-projects），
 * 中文介面上的實際字樣本輪沒有開實機對過，錄影前看一眼再念。
 */

export const meta: RecordedMeta = {
  id: 'harness-58-handbook-v5',
  title: '手冊定稿：三個介面各怎麼帶過去',
  script:
    '這份檔案到這裡定型了。少掉的那一條是併回全域手冊的那一條，搬去 Hook 的那一條也沒有消失，換成一行指向 .claude/settings.json 的提醒。它這麼短是因為那個計時器就這麼大，不是因為短比較好。你自己的專案會比它長，但不會一直長下去：長出來、整理掉、再長出來。接下來把它帶去別的地方，三個介面各一個動作。Claude Code 本來就在讀。桌面版切到 Cowork，綁上同一個資料夾。網頁版在 claude.ai 開一個 Project，整份貼進專案指示那一欄。內容一個字都不用改。',
  seconds: 45,
  from: 71,
};

/** 三列對應上一頁那張三欄表的三個介面，由「什麼都不用做」往「要自己貼」排 */
const CARRY = [
  { where: 'Claude Code', act: '本來就在讀，什麼都不用做' },
  { where: 'Cowork（桌面版）', act: '綁上同一個資料夾，它一樣讀得到' },
  { where: 'Claude Projects（網頁）', act: '開一個 Project，整份貼進專案指示那一欄' },
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
            帶去別的地方，<Key>內容一個字都不用改</Key>
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
