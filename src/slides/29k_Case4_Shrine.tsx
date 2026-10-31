import { Waves } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CaseShot } from '../components/CaseShot';
import { CaseHandbook } from '../components/CaseHandbook';
import shrineShot from '../../assets/cases/case-04-wishes-live.jpg';

/**
 * 案例四的首頁。2026-10-23 新增，資料來源 case-04-wishes.pdf（封面、學員路線圖、
 * 八個判斷、〈這個案例做到最後，完成的是什麼？〉、〈各階段預估時間〉）。
 *
 * 2026-10-31（講師：截圖目前線上最新版本）首頁那一張換成當天實機抓的
 * `case-04-wishes-live.jpg`（1483×812，從 www.wishingshrine.com 直接截）。
 * 站上已經比手冊的截圖多了兩樣：天氣（晴／薄霧／小雨／大雨／雷雨）與視角切換，
 * 而且多了一個「建築」開關可以把神社換成教堂（網址帶 `?theme=church`）。
 * **原本那張 `case-04-wishes-hero.jpg` 不要刪**，〈水面、浮力與接合處〉那一頁還在用它，
 * 它在那裡的身分是「做到最後的那個時間點」，不是「現在長什麼樣」。
 * 下次再換之前先用無痕視窗開一次：這一張左下角有登入後的帳號膠囊。
 *
 * 另外兩張狀態圖（浮空石台、第一版海上神社）在〈水面、浮力與接合處〉那一頁。
 * 那三張是同一個專案的不同時間點，不要分開換掉。
 *
 * 公開網址 2026-10-23 換過兩次：講師先給單次部署的網址（shrine-diorama-jcjkj94wn-…），
 * 那一種被 Vercel 的部署保護擋著，外人點進去會被導到 Vercel 的登入頁；改掛 vercel.app 的
 * 正式別名之後，同一天手冊 20-8 掛上了自訂網域，所以現在是 www.wishingshrine.com（實測 200，
 * 標題就是「海上許願神社」）。換網址之前用無痕視窗開一次確認不用登入。
 *
 * 2026-10-31（講師：怎麼會把這個寫給同學；為什麼會說這個是初稿）警告那一塊收乾淨了。
 * 先拿掉「手冊裡還沒實測的步驟都標了 TODO」，再拿掉標題裡的「這一份是初稿」。
 * 那兩句講的都是**製作狀態**，不是學員要做的事，寫在畫面上等於叫他別相信手冊。
 * 現在那一塊只剩他真的要自己處理的三件：音樂素材、素材的授權、寄信服務。
 * **不要加回「初稿」或 TODO。** 哪幾步還沒實測是製作端自己要收的，收完就沒有這件事。
 *
 * 2026-10-31（講師：感覺不是要回答這個問題）那一句換成手冊封面自己的那一行
 * 「一個很重的 3D 畫面，加上會員系統，每一步怎麼確認做對了」。手冊內頁另有一句
 * 「畫面越做越精緻⋯怎麼確定這一次的修改沒有把別的東西弄壞」，那是**三個驗證方法**的引言，
 * 不是整個案例的題目：這個案例學員真正做的是 3D 加會員系統，回歸驗證只是其中一段。
 * **不要改回「畫面越做越精緻」那一句。** 手冊內頁那一行還在，下次改手冊時一起對齊。
 *
 * 2026-11-01 手冊改版，數字跟著更新：時數變成讀 5.2 小時、動手 17.8 小時，
 * 而且封面與〈各階段預估時間〉那張表現在是同一組（舊版封面寫 3.5／12.1，表算出來是
 * 4.9／16.3，所以當時取表）。**下次改版一樣先對那張表的合計。**
 * 同一輪技術那一條補上 React（手冊的使用技術列明「介面用 React」，階段 8 的標題
 * 也改成「搬進 Astro，切開引擎與介面，介面改用 React」）與 Supabase 的 Storage。
 */
/**
 * 2026-10-31 三段各自改成條列（講師：敘述太長）。原本「產出」是一句六十多字的長句，
 * 一口氣塞進六樣東西，讀者只會讀到前兩樣。**要加東西就加一條，不要接回句尾。**
 */
const ROUTE: { label: string; items: string[] }[] = [
  {
    label: '起點',
    items: [
      '一個空資料夾，你自己的版本從這裡從頭做起',
      '另外下載一份做好的成品，打開它試五件事。那一份是拿來看目標的，程式不是你的',
    ],
  },
  {
    label: '過程',
    items: [
      '先盤點、寫規格',
      '一層一層疊上水面、漣漪與船、時段、環境動態、鏡頭、介面與聲音',
      '中間導入 Astro 與 React',
      '最後接上會員登入、對外 API 與照片上傳，做資安檢查，部署上線',
    ],
  },
  {
    label: '產出',
    items: [
      '一個 3D 神社網站：轉得動、縮放得了、點水面起漣漪，讀得到別人的繪馬（寫願望的那塊木牌，寫好掛上牆）與祈願',
      '有背景音樂與信箱登入，繪馬可以附一張照片',
      '兩支 API：一支要帶登入權杖才拿得到資料，一支是公開的對外 API',
      '一個部署在 Vercel 的正式網站，最後掛上自己買的網域，加一份開發日誌',
    ],
  },
];

const SCALE = [
  { row: '是什麼', three: '開窯預約', four: '海上許願神社' },
  { row: '畫面', three: '表單與列表', four: '一個會動的 3D 場景，加上寫繪馬的介面' },
  {
    row: '難的地方',
    three: '有人繞過網頁直接送請求，擋不擋得住',
    four: '改了一個地方，怎麼確認其他地方還是對的',
  },
];

/**
 * 2026-10-31（講師：過於 AI、看不太懂）三條重寫，同日再改一次（講師：Astro 是什麼、
 * 為什麼一直說丟給 AI 看）。
 *   - 「不需要看懂 shader 或 JavaScript」裡的 shader 只有工程師看得懂（D-2）。
 *   - **每個技術後面要掛一句它負責什麼**。Astro 全片只在這一頁與 Slide 179 出現，
 *     沒有別的地方解釋過它，學員讀到這裡會卡住。
 *     2026-10-31（講師：這個說明太抽象）那一句又改了一次。原本照抄手冊的名詞欄
 *     （「一套做網站的工具，負責把頁面組裝成瀏覽器看得懂的檔案」），但「組裝成檔案」
 *     對不寫程式的人等於空白，他看不出沒有它會怎樣。現在改成講他自己走過的差別：
 *     案例一只有一個 HTML 檔，這裡頁面變多、要共用版型與導覽列。
 *     **不要改回「組裝成瀏覽器看得懂的檔案」。**
 *   2026-10-31（講師：同學會困惑為什麼有時候是 ChatGPT 有時候是 Claude）前面補一條
 *     「兩個 AI 分工，不是換來換去」。兩條 ChatGPT 的條目**沒有一條說過為什麼要兩個**，
 *     學員讀到的是這個案例一下用這家一下用那家。分界線寫成他驗得了的事實：
 *     Claude 連著這個資料夾所以改得了檔案，ChatGPT 看不到檔案但看得懂截圖。
 *     **不要把這一條拿掉再去改後面兩條的措辭**，問題是少了分界線，不是措辭。
 *   - ChatGPT 那兩條原本沒說「為什麼要找它」，讀起來像突然冒出一個工具。
 *     手冊有整整一節叫〈用 ChatGPT 寫規格，再交給 Claude〉，理由是畫面上哪裡不對
 *     很難用文字講，而截圖給得出來。**第一句要先講那個理由**，再講做法。
 *     第二條的風險也照手冊原文（「ChatGPT 看不到程式，規格裡的套件、檔名、數字、
 *     做法都可能和專案不一樣」），原本只寫「看不到你的專案」沒說會錯在哪。
 */
const FACTS = [
  {
    k: '用到的技術',
    v: 'Three.js（畫 3D）、Astro（把程式整理成網頁檔案，案例三用的也是它）、React（介面：繪馬卡片、控制列、登入視窗）、Web Audio（聲音）、Supabase（登入、資料庫權限、檔案、雲端函式）。',
  },
  {
    k: '不用看懂程式碼',
    v: '指令都由 Claude 下，設定檔你不用碰。出現的程式碼與數字是拿來核對結果的。',
  },
  {
    k: '兩個 AI 分工，不是換來換去',
    v: 'Claude 連著這個專案的資料夾，改檔案的只有它。ChatGPT 看不到這些檔案，但它看得懂你丟的截圖，所以拿它討論「畫面哪裡不對、該怎麼改」。',
  },
  {
    k: '畫面上哪裡不對，先截圖給 ChatGPT',
    v: '這種問題很難用文字講，截圖給得出來。討論完請它把結論寫成一份規格，那份規格是要帶回來貼給 Claude 的。這個案例幾份長規格都是這樣來的。',
  },
  {
    k: '貼給 Claude 之後先比對',
    v: 'ChatGPT 沒看過這個專案，規格裡的套件、檔名、數字都可能和專案不一樣。先叫 Claude 列出哪裡對不上，確認完再動手。',
  },
];

export default function SlideCase4Shrine() {
  return (
    <SlideLayout
      title="案例四：海上許願神社"
      subtitle="Case 04 · 3D 場景加上會員登入"
      icon={Waves}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          <div className="md:col-span-3">
            <CaseShot
              src={shrineShot}
              alt="海上許願神社的畫面：海中央一座 low-poly 神社，紅色鳥居立在水裡，小船在周圍，右上角可以切時段、天氣、視角與建築（神社或教堂），右下角有「寫一張繪馬」"
              url="https://www.wishingshrine.com/"
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-5 py-4">
              <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
                這個案例在練什麼
              </div>
              <p className="text-slate-100 text-base font-bold leading-relaxed">
                挑選合適的開發架構，實作更複雜的互動機制
              </p>
            </div>

            <dl className="space-y-3">
              {ROUTE.map((r) => (
                <div key={r.label} className="flex gap-3">
                  <dt className="w-10 shrink-0 font-mono text-xs uppercase tracking-widest text-slate-500 pt-1">
                    {r.label}
                  </dt>
                  <dd className="min-w-0 flex-1">
                    <ul className="space-y-0.5">
                      {r.items.map((it) => (
                        <li key={it} className="flex gap-2 text-slate-300 text-sm leading-relaxed">
                          <span className="shrink-0 text-slate-600">・</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          {/*
            2026-10-31（講師：過於 AI、看不太懂）小標與副標重寫。原本小標是
            「它比案例三多的那一塊，是『怎麼證明沒壞』」：「那一塊」是空心的位置代稱，
            句型又是 A 是 B 的對仗。副標的「每一幀」與「看不出來的壞法」是工程用語與自造詞。
            現在小標只給這一塊的名字（D-5 區塊小標那一節），副標講具體差在哪。
          */}
          <h3 className="text-base font-bold text-slate-100 mb-1">和案例三的差別</h3>
          <p className="text-sm text-slate-400 mb-4">
            登入、資料庫、權限這三樣案例三都做過，這個案例照同一套再做一次。
            多出來的是一個 3D 場景：畫面一直在動，改壞了不一定看得出來。
          </p>
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-950 text-slate-500">
                  <th className="w-24 px-4 py-2 text-left font-normal" />
                  <th className="px-4 py-2 text-left font-normal">案例三做的</th>
                  <th className="px-4 py-2 text-left font-normal">這個案例做的</th>
                </tr>
              </thead>
              <tbody>
                {SCALE.map((r) => (
                  <tr key={r.row} className="border-t border-slate-800">
                    <td className="px-4 py-2.5 text-slate-500">{r.row}</td>
                    <td className="px-4 py-2.5 text-slate-300 leading-relaxed">{r.three}</td>
                    <td className="px-4 py-2.5 text-slate-300 leading-relaxed">{r.four}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-4 space-y-1.5 border-t border-slate-800 pt-3">
            {FACTS.map((f) => (
              <li key={f.k} className="flex gap-2 text-slate-300 text-sm leading-relaxed">
                <span className="shrink-0 text-slate-600">・</span>
                <span>
                  <span className="font-bold text-slate-200">{f.k}</span>
                  <span className="ml-2">{f.v}</span>
                </span>
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <Callout tone="warn" label="這幾樣課程沒有附，要你自己準備" stepIndex={3}>
          <ul className="space-y-1.5">
            <li className="flex gap-2">
              <span className="shrink-0 text-amber-500/70">・</span>
              <span>
                <span className="font-bold text-slate-100">五個環境音與五首背景音樂</span>
                <span className="ml-2">課程沒有附，要自己準備。這一份用的是五首自己用 Suno 生成的曲子。</span>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-amber-500/70">・</span>
              <span>
                <span className="font-bold text-slate-100">生成之前先看那個工具的條款</span>
                <span className="ml-2">免費方案常常只能個人使用，公開的網站不算。</span>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-amber-500/70">・</span>
              <span>
                <span className="font-bold text-slate-100">寄信服務</span>
                <span className="ml-2">
                  網站雖然上線了，但內建的寄信只寄得到專案成員，要讓別人登入得自己接一個。
                </span>
              </span>
            </li>
          </ul>
        </Callout>

        <AnimatedBlock stepIndex={4}>
          <CaseHandbook
            file="case-04-wishes.pdf"
            title="海上許願神社：3D 場景加上會員登入"
            hours="約 17.8 小時"
          />
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
