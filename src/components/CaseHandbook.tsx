import { FileDown } from 'lucide-react';

/** 講義頁的位置。上課程平台之後會換，換這裡就好 */
const HANDOUTS_URL = 'https://citysite102.github.io/aionduty-vibe-coding/handouts/';

/**
 * 案例頁底下那一行：這一份的完整手冊在哪裡下載。
 *
 * 為什麼要有它：投影片只做重點引導與知識點，不是把手冊講完一遍。
 * 學員真正要照著執行的是那份 PDF，所以每個案例的頁面上都要指得到它，
 * 否則整段課看完手上沒有可以動手的東西。
 *
 * 寫成元件不是為了抽象，是因為四個案例頁都要用，而網址之後會換（現在掛在
 * GitHub Pages，上課程平台之後會變）。一個地方改掉比四頁各改一次可靠。
 *
 * 它不是課務交代（D-2）：講的不是「等一下會發下去」，是這一份手冊叫什麼、
 * 做完手上會有什麼。學員回頭翻講義的時候用得到。
 */
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
    <a
      href={`${HANDOUTS_URL}${file}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-700"
    >
      <FileDown aria-hidden="true" size={18} className="shrink-0 text-slate-500" />
      <span className="text-slate-300 text-sm leading-relaxed">
        完整手冊〈{title}〉照著做得完，動手{hours}。四份手冊都在這一頁：
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
  );
}
