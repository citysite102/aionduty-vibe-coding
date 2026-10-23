import { Waves } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CaseShot } from '../components/CaseShot';
import { CaseHandbook } from '../components/CaseHandbook';
import shrineShot from '../../assets/cases/case-04-wishes-hero.jpg';

/**
 * 案例四的首頁。2026-10-23 新增，資料來源 case-04-wishes.pdf（封面、學員路線圖、
 * 八個判斷、〈這個案例做到最後，完成的是什麼？〉、〈各階段預估時間〉）。
 *
 * 截圖是從那份 PDF 第 23 頁抽出來的「階段 16 做完」那一張，另外兩張（浮空石台、
 * 第一版海上神社）在〈一層一層疊上去〉那一頁。三張是同一個專案的不同時間點，不要分開換掉。
 *
 * 公開網址 2026-10-23 換過兩次：講師先給單次部署的網址（shrine-diorama-jcjkj94wn-…），
 * 那一種被 Vercel 的部署保護擋著，外人點進去會被導到 Vercel 的登入頁；改掛 vercel.app 的
 * 正式別名之後，同一天手冊 20-8 掛上了自訂網域，所以現在是 www.wishingshrine.com（實測 200，
 * 標題就是「海上許願神社」）。換網址之前用無痕視窗開一次確認不用登入。
 *
 * 時數用〈各階段預估時間〉那張表的合計（讀 4.9 小時、動手 16.3 小時），
 * 不用封面寫的 3.5／12.1 小時：封面那組比逐階段加總少，而學員實際照著做的是各階段。
 */
const ROUTE = [
  { label: '起點', text: '一個空資料夾，以及一個已經做完的成品，先打開它試五件事' },
  {
    label: '過程',
    text: '先盤點、寫規格，再一層一層疊上水面、漣漪與船、時段、環境動態、鏡頭、介面與聲音。中間搬進 Astro，最後接上登入、資料庫與對外 API',
  },
  {
    label: '產出',
    text: '一個轉得動、點水面起漣漪、可以讀繪馬（寫願望的那塊木牌）與祈願的 3D 神社網站，有背景音樂與信箱登入、一支登入之後才拿得到資料的 API，部署在 Vercel 上，最後掛上自己買的網域',
  },
];

const SCALE = [
  { row: '是什麼', three: '開窯預約', four: '海上許願神社' },
  { row: '畫面', three: '表單與列表', four: '一個會動的 3D 場景，加上寫繪馬的介面' },
  {
    row: '難的地方',
    three: '權限：繞過網頁直接送請求，擋得住嗎',
    four: '改一個地方，怎麼證明別的地方沒被弄壞',
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
              alt="海上許願神社的畫面：海中央一座 low-poly 神社，紅色鳥居立在水裡，三艘船在周圍，右上角可以切白天、黃昏、夜晚，右下角有「寫一張繪馬」"
              url="https://www.wishingshrine.com/"
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-5 py-4">
              <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
                這個案例要回答的問題
              </div>
              <p className="text-slate-100 text-base font-bold leading-relaxed">
                畫面越做越精緻，改的地方越來越多。怎麼確定這一次的修改沒有把別的東西弄壞？
              </p>
            </div>

            <dl className="space-y-3">
              {ROUTE.map((r) => (
                <div key={r.label} className="flex gap-3">
                  <dt className="w-10 shrink-0 font-mono text-xs uppercase tracking-widest text-slate-500 pt-1">
                    {r.label}
                  </dt>
                  <dd className="text-slate-300 text-sm leading-relaxed">{r.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">它比案例三多的那一塊，是「怎麼證明沒壞」</h3>
          <p className="text-sm text-slate-400 mb-4">
            登入、資料庫、權限這些案例三都做過，這裡照同一套再做一次。新東西是一個每一幀都在動的 3D 畫面，看不出來的壞法變多了。
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
          <p className="text-slate-300 text-sm leading-relaxed mt-4">
            技術是 Three.js、Astro、Web Audio 與 Supabase（登入、資料庫權限、雲端函式）。
            <strong className="text-slate-100">不需要看懂 shader 或 JavaScript</strong>，手冊裡的程式碼和數字是用來確認結果的。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            這個案例有幾份長規格不是一個字一個字打出來的：先把畫面截圖給 ChatGPT 看、討論完請它寫成規格，再貼給 Claude。
            <strong className="text-slate-200">ChatGPT 看不到你的程式</strong>，所以貼過去之後先叫 Claude 盤點哪裡和現況對不上，確認完再動手。
          </p>
        </AnimatedBlock>

        <Callout tone="warn" label="這一份是初稿，而且有兩樣東西要你自己準備" stepIndex={3}>
          五個環境音與五首背景音樂課程沒有附，要自己準備。這一份的背景音樂是五首自己用 Suno 生成的曲子，
          <strong className="text-slate-100">生成之前先看那個工具的條款，免費方案常常只能個人使用</strong>。
          另外網站雖然已經上線，但內建的寄信服務只寄得到專案成員，要讓別人登入得自己接寄信服務；
          手冊裡還沒實測的步驟都標了 TODO。
        </Callout>

        <AnimatedBlock stepIndex={4}>
          <CaseHandbook
            file="case-04-wishes.pdf"
            title="海上許願神社：3D 場景加上會員登入"
            hours="約 16.3 小時"
          />
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
