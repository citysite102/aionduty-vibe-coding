import { Antenna } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { LiveDemo } from '../components/LiveDemo';

/**
 * API 前面講了三頁，但那三頁的例子都要金鑰，所以只能用講的。
 * 這一頁是它的出口：學員自己的計時器真的打一次外部服務。
 *
 * 挑 Open-Meteo 的理由只有一個，就是它在教室裡跑得起來：
 * 免金鑰、免註冊，而且回應帶 access-control-allow-origin: *，
 * 所以雙擊打開的 index.html（來源是 file://）直接呼叫得通，不必先架伺服器。
 * 換 API 之前先確認這三件事，不然這一頁會變成第四個「叫我動手但我做不到」。
 *
 * prompt 裡的第 3 點不要拿掉。它是這一頁真正要教的東西，
 * 而且現場 wifi 斷掉的時候，它就是那個讓畫面不會壞掉的保險。
 */
const API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=25.03&longitude=121.56&daily=sunrise,sunset&timezone=Asia/Taipei&forecast_days=1';

const PROMPT = `幫我在計時器加一個功能，資料來源是這個網址：
${API_URL}

1. 頁面載入時去拿今天台北的日出與日落時間
2. 顯示在倒數下面，格式是「日出 05:23 ／ 日落 18:36」
3. 拿不到的時候不要讓畫面壞掉，那一行顯示「離線」就好

這個 API 不用金鑰，直接打就可以。`;

const RESPONSE = `{
  "timezone": "Asia/Taipei",
  "daily": {
    "time":    ["2026-08-05"],
    "sunrise": ["2026-08-05T05:23"],
    "sunset":  ["2026-08-05T18:36"]
  }
}`;

export default function SlideApiHandsOn() {
  return (
    <SlideLayout title="讓計時器去外面拿一筆資料" subtitle="Your First API Call" icon={Antenna}>
      <LiveDemo kind="claude" note="跟著加一次" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto items-start pb-8">

        <div className="space-y-4">
          <AnimatedBlock stepIndex={1}>
            <p className="text-slate-300 text-base leading-relaxed">
              你的計時器目前所有東西都寫在 <code className="font-mono text-slate-200">index.html</code> 裡面，
              不會去外面拿任何資料。
              <strong className="text-slate-100">這一步讓它在載入的時候，去一個公開的天氣服務要今天的日出與日落時間。</strong>
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="rounded-2xl border border-sky-900/50 bg-sky-950/20 p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-2.5">Prompt</div>
            <pre className="text-sky-100 text-sm leading-relaxed whitespace-pre-wrap font-mono break-all">
              {PROMPT}
            </pre>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-base font-bold text-slate-100 mb-2">為什麼挑這一個</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              它<strong className="text-slate-300">不用金鑰、不用註冊</strong>，網址貼上去就能打。
              前面看過的那些 API 多半要先申請一組金鑰，光是申請就會卡掉不少時間，
              所以先用打得通的這一個把整條路走完一次。
            </p>
          </AnimatedBlock>
        </div>

        <div className="space-y-4">
          <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
            <div className="border-b border-slate-800 bg-slate-950 px-5 py-2.5 text-xs font-mono uppercase tracking-widest text-slate-500">
              它拿回來的東西
            </div>
            <pre className="px-5 py-4 font-mono text-sm leading-relaxed text-slate-300 overflow-x-auto">
              {RESPONSE}
            </pre>
            <p className="px-5 pb-4 text-slate-500 text-sm leading-relaxed">
              大括號包起來、一行一個欄位、左邊名字右邊值。
              前面餐廳點單那個比喻裡的出菜明細，長的就是這個樣子。
            </p>
          </AnimatedBlock>

          <Callout tone="warn" label="第 3 點不要拿掉" stepIndex={5}>
            不寫這一句，它只會處理「拿到了要怎麼顯示」，不會處理「拿不到怎麼辦」。
            <strong className="text-slate-100">網路一斷，那一行就會一直停在載入中</strong>，
            而你會以為是自己哪裡寫錯了。
            <span className="block mt-2 text-slate-400">
              只要是去外面拿資料，就有拿不到的時候。拿不到的時候畫面要長什麼樣，是你要先決定的。
            </span>
          </Callout>

          <AnimatedBlock stepIndex={6} className="text-slate-400 text-sm leading-relaxed px-1">
            改完存檔，重新整理瀏覽器就看得到。
            如果那一行顯示「離線」，代表請求送出去了但沒拿回來，先檢查網路，再把網址貼進瀏覽器確認它自己打得通。
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
