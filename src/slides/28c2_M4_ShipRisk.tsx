import { ShieldAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 單元 8-5 第三頁。上一頁交出一套跑得動的流程，這一頁問它交不交得出去。
 *
 * ── 2026-11-09 重構（講師給了逐塊的規格）──────────────────────
 * 這一頁現在只做一件事：**把「交得出去」拆成功能、品質、安全三個面向**，
 * 再用同一個登入功能示範同一件事可以有三種驗收要求。下一頁接 OWASP。
 *
 * ── 被指名刪掉的敘述，不要寫回來 ─────────────────────────
 *   「其中兩層它不會主動告訴你。」
 *   「它不會主動說，要拿規格一條一條對。」
 *   「它不會主動說，而且畫面上完全看不出來。」
 * 理由：那是把「AI 會不會主動檢查」寫成一種固定的能力限制，而它其實取決於
 * **你有沒有事先定義標準、有沒有給它檢查的工具、有沒有要求它交出核對得了的證據**。
 * 現在那個位置寫的是「驗的方式」，而不是「它會不會說」。
 *
 * 「需求裡沒有寫的它不會做」那一句留著（壓成一行），它是上面那件事的因：
 * 你說「做一個可以登記報名的頁面」，它就做了一個可以登記報名的頁面，
 * 而「擋住不該進來的人」沒有人說過，所以那件事不會出現。
 *
 * ── 2026-11-09 從這一頁移出去的四塊（暫時沒有新家，講師要決定）──────
 *   1. 三個數字（99% 的受測網站至少一個資安問題／42.3 對 9.6／約 2,000 個沒有登入的工具）
 *   2. 台灣 2026/08 What'Sub 的案例與 INSIDE 專訪
 *   3. 影子 AI 那個琥珀框
 *   4. 「為什麼會這樣，而且跟你的程度無關」的完整三行版本
 * 出處先留在這裡，要用的時候不必重查（**數字都是 2026-10-10 查到的二手轉述，
 * 要再用一定要重查，連結點不開或對不上的時候整塊拿掉比改數字安全**）：
 *   Reeve 與 Symbiotic 的數字 https://aiqkangber.com/blog/security-vulnerabilities-in-vibe-coding
 *   Red Access 的影子 AI 調查 https://www.ithome.com.tw/news/176269
 *   What'Sub 專訪 https://www.inside.com.tw/article/42420-lean-ai-vibe-coding-whatsub-subtitle-tool
 *
 * **底下那一句「功能正常，不代表符合需求；符合需求，也不代表沒有安全風險。」
 * 是講師指定的原句。** 形狀上接近頂真，但它就是這一頁的論點，不要在掃對仗時改掉。
 *
 * 三個面向是**這門課用的教學框架**，不是嚴格互斥的軟體品質標準，畫面上那一句要留著：
 * 同一件事可能同時算品質也算安全，重點是三種都要有人看。
 *
 * ── 2026-11-09 登入那一塊補上三格示意畫面 ────────────────────
 * 病根：這一頁的論點是「安全那一層畫面上看不出來」，但它本來是用三行字講這件事。
 * 現在三種驗收要求各配一格示意畫面，演的是**需求只寫了功能**的那個版本：
 * 功能那一件做得出來，另外兩件沒有人交代，而三格看起來一樣正常。
 *
 * **三格一定要同時出現，不要做成一次看一格的切換。** 對照本身就是這一頁的論點，
 * 一次只看一格就沒有對照了；而且這份投影片會輸出成 PDF 給學員（根目錄那一份），
 * 預設只顯示一格等於 PDF 掉兩格。
 *
 * 三行驗收要求的原文一個字都沒動，只是從上下三列改成左右三欄。收尾那段**只刪了
 * 開頭那一句**「同一個功能可能通過了功能測試，品質或安全那兩層還是有問題。」，
 * 因為三格畫面現在在演同一件事，留著是同一句話講兩次。
 * **「需求裡沒有寫的它不會做」那一句與後面報名頁面的例子沒有動**（見上面那一段）。
 *
 * 示意畫面裡**不要放姓名、電話這類假的個資**：1042 換成 1043 加幾條灰色色塊就說得完，
 * 放了假個資學員要先分辨那是不是真的。`Shot` 是這一頁自己的小元件，不要搬成共用的，
 * 它的尺寸是照這一頁剩下的高度調的（`SiteMock` 的 `BrowserFrame` 內距放不下）。
 *
 * ⚠ 三格讓這一頁長高了 60px，所以同一輪把外層間距收緊了（`space-y-4 pb-6` → `space-y-3 pb-4`、
 * 三個面向那張表 `py-3.5` → `py-3`、登入那張卡 `p-5` → `p-4`），一個字都沒刪。
 * 量過的高度（2026-11-09）：內容區 `scrollHeight` 803px，加上頁面自己的 244px
 * （`pt-12`、標題區與 `pb-20`），**視窗高度低於約 1047px 就會需要捲動**，全螢幕 1080p 放得下。
 * 改內容之後要再量一次：`document.querySelector('[data-slide-scroll]')` 的
 * `scrollHeight` 加上 `innerHeight - clientHeight`。
 *
 * 用色：sky（三個面向）＋ 成對的 emerald／red（做得出來／沒做出來）兩種（A-1，
 * 成對的 red 與 emerald 合計算一種）。
 */

const ASPECTS = [
  {
    n: '01',
    k: '功能正確性',
    en: 'Functionality',
    q: '該做的功能，有沒有正常運作？',
    what: '登入、表單送出、資料存得進去，以及主要的使用流程走不走得完。',
    how: '功能測試、端對端測試，加上自己實際操作一次。',
  },
  {
    n: '02',
    k: '品質與需求符合性',
    en: 'Quality',
    q: '做出來的成果，符不符合原本的要求？',
    what: '規格裡每一條有沒有做到、手機版面、錯誤處理、速度、好不好用與無障礙。',
    how: '拿規格逐條驗收、品質檢查、效能測試。',
  },
  {
    n: '03',
    k: '安全與權限',
    en: 'Security',
    q: '功能都正常的時候，還有沒有安全風險？',
    what: '存取控制、身分驗證、機密資料、系統設定，以及那些影響大的操作。',
    how: '權限測試、設定審查、漏洞掃描，必要時找專業的安全驗證。',
  },
];

/** 同一個功能，三種驗收要求。**不要換成別的例子**，登入是學員都做過的。
 *
 *  `shot` 是「需求只寫了功能」時，那三件事各自長什麼樣：功能那一件寫進需求了所以做得出來，
 *  另外兩件沒有人交代，所以畫面上看起來一樣正常。**三格一定要同時出現**，
 *  這一頁的論點是同一個功能的三種結果擺在一起才成立，做成一次只看一格就沒有對照了。
 *  三格也因此不走互動：預設就是全部，PDF 與講義拿到的是同一份。
 *
 *  `ok` 只分過與沒過，用的是 A-1 成對的 emerald／red，合計算一種強調色。
 *  畫面裡**不要放姓名、電話這類假的個資**：換編號就看得到別人的，用 1042 → 1043
 *  與灰色資料條就說得完，放了假個資反而要學員先分辨那是不是真的。
 *
 *  ⚠ 品質那格的失敗訊息 2026-11-09 改過一次，**不要改回去**。原本寫的是畫面上出現
 *  「登入失敗」、底下註記「沒說是帳號錯還是密碼錯」，當天由講師退掉：**那是反向的資安建議**。
 *  登入失敗訊息本來就該是通用的，區分「帳號不存在」與「密碼錯」會讓人可以列舉出
 *  哪些帳號存在（OWASP 的 Authentication 建議），而這一頁下一頁就要接 OWASP。
 *  真正的品質問題是**把技術訊息丟給使用者**（401、JSON 錯誤、整頁沒反應），
 *  也就是「帳密打錯有清楚的提示」裡那個「清楚」沒做到，不是「沒講是哪一個錯」。 */
const LOGIN = [
  {
    k: '功能',
    v: '帳號密碼正確，可以成功登入。',
    ok: true,
    shot: { url: '/members/1042', who: '會員 1042', note: '登入成功，資料出得來' },
  },
  {
    k: '品質',
    v: '帳密打錯有清楚的提示，手機上也操作得順。',
    ok: false,
    shot: { url: '/login', form: true, err: '401 Unauthorized', note: '使用者看不懂，也不知道下一步' },
  },
  {
    k: '安全',
    v: '登入之後看不到別的會員的私人資料。',
    ok: false,
    shot: { url: '/members/', hot: '1043', who: '會員 1043', note: '網址換個編號，別人的就出來了' },
  },
];

/**
 * 示意畫面。只畫瀏覽器殼、網址列與幾條色塊，**不要畫成真的介面**：
 * 這裡要對比的是三格看起來一樣正常，不是版型好不好看。
 * 內文色塊走 `SiteMock` 的慣例（不放真字），但網址與那一行紅字是這一格的重點，要印出來。
 * 註記字級 `text-xs` 是 A-4 允許的「圖表註記」，不要拿它寫成段的句子。
 */
function Shot({ s }: { s: (typeof LOGIN)[number]['shot'] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
      <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900 px-2 py-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-slate-700" />
        ))}
        <span className="ml-1 min-w-0 flex-1 truncate rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-slate-400">
          {s.url}
          {'hot' in s && s.hot && <span className="text-red-400">{s.hot}</span>}
        </span>
      </div>
      {/* 固定高度：三格的內容不一樣高（表單那格有兩個欄位），不固定的話底下那行註記會對不齊 */}
      <div className="h-16 space-y-1.5 px-3 py-2.5">
        {'form' in s && s.form ? (
          <>
            <div className="h-3.5 rounded border border-slate-800 bg-slate-900" />
            <div className="h-3.5 rounded border border-slate-800 bg-slate-900" />
            <div className="font-mono text-xs text-red-400">{s.err}</div>
          </>
        ) : (
          <>
            <div className="font-mono text-xs text-slate-300">{s.who}</div>
            <div className="h-1.5 w-full rounded bg-slate-800" />
            <div className="h-1.5 w-4/6 rounded bg-slate-800" />
          </>
        )}
      </div>
    </div>
  );
}

export default function SlideShipRisk() {
  return (
    <SlideLayout
      title="AI 說完成了，我們該怎麼驗收？"
      subtitle="Functionality / Quality / Security"
      icon={ShieldAlert}
    >
      <div className="max-w-6xl mx-auto w-full space-y-3 pb-4">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          網站打得開、功能點得動，只代表一部分的檢查通過。
          <strong className="text-slate-100">真正交出去之前，還要確認需求有沒有滿足，以及資料與權限有沒有被保護住。</strong>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900">
          {ASPECTS.map((a) => (
            <div key={a.en} className="grid grid-cols-1 gap-x-5 gap-y-1 px-5 py-3 md:grid-cols-[13rem_minmax(0,1fr)]">
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-slate-600">{a.n}</span>
                  <span className="text-base font-bold text-slate-100">{a.k}</span>
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-slate-600">{a.en}</div>
                <p className="mt-1 text-sm leading-relaxed text-sky-200/90">{a.q}</p>
              </div>
              <dl className="min-w-0 space-y-0.5 text-sm leading-relaxed">
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-xs text-slate-600">檢查什麼</dt>
                  <dd className="min-w-0 text-slate-300">{a.what}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-xs text-slate-600">怎麼驗</dt>
                  <dd className="min-w-0 text-slate-400">{a.how}</dd>
                </div>
              </dl>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <h3 className="text-base font-bold text-slate-100">
            同一個會員登入功能，三種驗收要求
            <span className="ml-2 text-sm font-normal text-slate-500">需求只寫了功能的時候，畫面會長成這樣</span>
          </h3>
          <dl className="mt-2 grid grid-cols-1 gap-x-5 gap-y-2 text-sm leading-relaxed md:grid-cols-3">
            {LOGIN.map((l) => (
              <div key={l.k} className="min-w-0">
                <dt className="flex items-baseline gap-2">
                  <span className="font-bold text-sky-300">{l.k}</span>
                  <span className={`font-mono text-xs ${l.ok ? 'text-emerald-400' : 'text-red-400'}`}>
                    {l.ok ? '做得出來' : '沒做出來'}
                  </span>
                </dt>
                <dd className="mt-1 min-w-0">
                  <span className="block text-slate-300">{l.v}</span>
                  <span className="mt-1.5 block">
                    <Shot s={l.shot} />
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-500">{l.shot.note}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-2.5 border-t border-slate-800 pt-2.5 text-sm leading-relaxed text-slate-500">
            它們之所以沒被做出來，多半是
            <strong className="text-slate-400">需求裡沒有寫</strong>：
            你說「做一個可以登記報名的頁面」，它就做了一個可以登記報名的頁面；
            沒有人交代「誰能讀、誰能改這些報名資料」，做出來的功能就可能少掉那道檢查。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="border-t border-slate-800 pt-4">
          <p className="text-base font-bold leading-relaxed text-slate-100">
            功能正常，不代表符合需求；符合需求，也不代表沒有安全風險。
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            這三個面向是這門課用來分工的框架，不是嚴格互斥的標準，同一件事可能同時算品質也算安全。
            要的是三種都有人看，而每一種都要事先定義標準、給得出檢查的方式，並且要求核對得了的證據。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
