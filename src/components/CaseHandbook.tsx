import { FileDown, Sparkles } from 'lucide-react';
import { CopyAction } from './CopyBlock';

/** 講義頁的位置。上課程平台之後會換，換這裡就好 */
const HANDOUTS_URL = 'https://citysite102.github.io/aionduty-vibe-coding/handouts/';

/**
 * 案例頁底下那一行：這一份的完整手冊在哪裡下載。
 *
 * 為什麼要有它：投影片只做重點引導與知識點，不是把手冊講完一遍。
 * 學員真正要照著執行的是那份 PDF，所以每個案例的頁面上都要指得到它，
 * 否則整段課看完手上沒有可以動手的東西。
 *
 * 寫成元件不是為了抽象，是因為五個案例頁都要用，而網址之後會換（現在掛在
 * GitHub Pages，上課程平台之後會變）。一個地方改掉比四頁各改一次可靠。
 *
 * 它不是課務交代（D-2）：講的不是「等一下會發下去」，是這一份手冊叫什麼、
 * 做完手上會有什麼。學員回頭翻講義的時候用得到。
 *
 * 2026-11-01（講師：可以補充給同學，可以把 PDF 給 AI，請它輔助引導互動式教學）
 * 底下多一行「這份 PDF 可以直接給 AI」。它寫在這個共用元件裡而不是某一個案例頁，
 * 因為五份手冊都適用，而且這是**預錄自學**最缺的那一塊：影片不會回答他的問題，
 * 手冊也不會，但上傳之後的那個對話會。
 * 那一句指令要給得出來，不能只說「可以問 AI」，所以配一個複製鈕；
 * 字串只宣告一次（A-4：複製鈕拿到的字要跟畫面上印的是同一份）。
 * **不要寫成「跟著做一次」那種課務交代**，它寫的是做法與做完會得到什麼。
 */

/** 上傳手冊之後的第一句。畫面上印的與複製鈕拿到的是同一個字串（A-4）。 */
const GUIDE_PROMPT =
  '這份 PDF 是我要照著做的教學手冊。請先讀完，然後一個階段一個階段帶我：' +
  '每個階段先用白話講這一步在做什麼、我會看到什麼，再給我可以照貼的指令。' +
  '我說「下一步」你才往下走。我卡住或畫面跟手冊不一樣的時候，先問我看到什麼，不要直接改。';
export function CaseHandbook({
  file,
  title,
  hours,
}: {
  /** PDF 檔名，對應 public/handouts/ 底下那一份 */
  file: string;
  /** 手冊封面上的名字 */
  title: string;
  /** 手冊自己標的動手時數，例如「約 5.7 小時」 */
  hours: string;
}) {
  return (
    <div className="space-y-2">
      <a
      href={`${HANDOUTS_URL}${file}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-700"
    >
      <FileDown aria-hidden="true" size={18} className="shrink-0 text-slate-500" />
      <span className="text-slate-300 text-sm leading-relaxed">
        完整手冊〈{title}〉照著做得完，動手{hours}。五份手冊都在這一頁：
        {/*
          網址要印成看得見的字，不能只掛在 href 上。這幾頁學員多半是在看影片，
          點不到連結，看得到的只有畫面上印出來的字。2026-10-06 的教學模擬兩位
          學員都卡在「我不知道這份手冊要去哪裡拿」，原本這裡只印檔名。

          第二輪模擬又抓到一條：原本印的是「網址＋檔名」，兩位都說要從影片逐字抄那一長串，
          抄錯一個字母不知道是自己錯還是網址壞了。所以現在只印到資料夾那一層，
          四份在同一頁，他只需要抄一次；檔名降級成辨識用的標籤，不是要他打的東西。
        */}
        <span className="font-mono text-slate-400 break-all">
          {' '}
          {HANDOUTS_URL.replace(/^https?:\/\//, '')}
        </span>
        <span className="text-slate-500">（這一份的檔名是 </span>
        <span className="font-mono text-slate-500">{file}</span>
        <span className="text-slate-500">）</span>
      </span>
      </a>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles aria-hidden="true" size={15} className="shrink-0 text-sky-400" />
          <span className="text-slate-200 text-sm font-bold">這份 PDF 可以直接給 AI 帶你做</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          開一個新對話把它上傳上去，它就成為一個隨時問得到的助教：
          這一步在做什麼、哪個詞看不懂、畫面跟手冊不一樣，都可以直接問它。
        </p>
        <p className="mt-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sky-200 text-sm leading-relaxed">
          {GUIDE_PROMPT}
        </p>
        <CopyAction text={GUIDE_PROMPT} className="mt-1.5" />
      </div>
    </div>
  );
}
