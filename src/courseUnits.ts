/**
 * 錄製單元的唯一真相。
 *
 * 兩層結構：
 *   章節 = App.tsx 的 SECTION_DEFS（八節）＋ 結語，共九章，這裡不重複定義，由位置推導。
 *   單元 = 一支可以單獨錄的影片，也就是這份清單。編號 X-Y 的 X、Y 都是算出來的，
 *          不寫死，所以插頁、搬頁之後編號會自己重排。
 *
 * 每一筆只寫「從哪一頁開始」，結束點就是下一筆的前一頁，所以不會有缺口或重疊。
 *
 * 為什麼不直接寫 Slide 幾到幾：CLAUDE.md B-3 那條。絕對頁碼插一頁就全錯，
 * 而畫面右下角一直顯示著正確的頁碼，兩邊對不上比沒寫更糟。
 *
 * 改動這份清單之後一定要跑 `npm run check:slides`，它會拿 anchor 比對真正的頁面標題。
 * 要看排出來長什麼樣就跑 `npm run units`。
 */

export interface UnitDef {
  /**
   * 起點那一頁在 LIVE_SLIDES 的 index（0 起算）。
   * 跟 SECTION_DEFS 的 start 同一套座標，插頁時要一起往後推。
   */
  live: number;
  /**
   * 那一頁被拆成好幾頁的話，這是要當起點的第幾頁（0 起算）。
   * 沒拆過的頁面省略。目前只有第六章的拆頁組會用到。
   */
  part?: number;
  /** 單元名稱，會直接變成影片標題 */
  title: string;
  /**
   * 起點那一頁的標題，照抄畫面上實際播出來的那一個（拆頁請抄它自己的 meta.title）。
   * 這是 check:slides 唯一能核對 live/part 有沒有指錯的依據，缺了會直接報錯。
   */
  anchor: string;
}

export const UNIT_DEFS: UnitDef[] = [
  // ── 章節一 課前導讀 ──
  { live: 0, title: '課程總覽與課前準備', anchor: '封面' },

  // ── 章節二 Vibe Coding 是什麼，能做到哪裡 ──
  { live: 4, title: 'Vibe Coding、Agentic Engineering 與工具選擇', anchor: 'Vibe Coding 是什麼，能做到哪裡' },
  { live: 9, title: '把需求講清楚：AI 怎麼猜你的意思', anchor: '同一個需求，三種做法' },

  // ── 章節三 Agent 的心智模型與 Claude Code 實作 ──
  { live: 14, title: '為什麼要一個能動手的 AI', anchor: '讓 AI 動手：Claude Code 入門' },
  { live: 17, title: '桌面版四步，做出第一個東西', anchor: '先用桌面版做出第一個東西' },
  { live: 19, title: '看懂紅字，看懂 API 文件', anchor: '紅字不是壞事，它在告訴你哪裡卡住' },
  { live: 23, title: '前端、後端、資料庫與上線', anchor: '你按下按鈕之後，發生了什麼事' },
  { live: 27, title: 'Git：每一版都留得住', anchor: 'Git 幫你記下每一版，不只是程式碼' },
  { live: 29, title: 'Claude Code 的介面、按鍵與指令', anchor: '打開之後，你只需要動最下面那一條' },
  { live: 32, title: '一次改一點：做出你的第一個作品', anchor: '一次改一點，比一次改完安全' },
  // 起點刻意不是「叫它寫個小工具」那一頁：它是支線示範，當一支影片的第一格
  // 會讓學員以為這一單元在講寫腳本，其實在講邊界與收成。它留在上一單元收尾。
  { live: 37, title: '它做得好與做不好的事，還有這一章的收成', anchor: '哪些事它做得好，哪些你得自己來' },

  // ── 章節四 選修：終端機 ──
  { live: 40, title: '選修：終端機是什麼，怎麼跟它打字', anchor: '選修：把 Claude Code 裝進終端機' },
  { live: 43, title: '選修：裝上 Claude Code 與終端機才有的操作', anchor: '裝好終端機版，確認它讀得到你的專案' },

  // ── 章節五 Agent 運作框架與成本分析 ──
  { live: 45, title: '運作框架是什麼，有哪些零件', anchor: 'Agent 運作框架與成本分析' },
  { live: 50, title: '這筆錢怎麼算：兩種花法與付費模式', anchor: '兩種花錢的方式：邊做邊花，還是先花再省' },
  { live: 53, title: '給它工具：MCP 與 Skills', anchor: '接下來要動手的三件事' },
  { live: 59, title: '給它邊界：監督程度與權限模式', anchor: '監督與邊界' },
  { live: 61, title: '動手寫出第一份 CLAUDE.md', anchor: '動手搭建運作框架' },
  { live: 65, title: '一份不夠用的時候：手冊的分層', anchor: '同一句話，有沒有手冊差在哪' },
  { live: 66, title: '零件什麼時候載入，各自放在哪', anchor: '常駐的東西越少，它越專心' },
  { live: 71, title: '這幾樣實際怎麼用，跟你的專案有什麼關係', anchor: '這幾樣實際怎麼用？（一）規範與流程' },

  // ── 章節六 手冊（CLAUDE.md）的疑難雜症與轉移 ──
  { live: 76, title: '四個問題，與規則明明寫了卻沒照做', anchor: '手冊（CLAUDE.md）的疑難雜症與轉移' },
  { live: 79, title: '這條規則該放哪：分流四題', anchor: '一條規則該放哪，照順序問四題' },
  { live: 79, part: 5, title: 'Hook 怎麼掛，以及分層的取捨', anchor: 'Hook 是程式在擋，不是它記得' },
  { live: 80, title: '手冊越寫越肥，怎麼健檢', anchor: '手冊健檢：五個步驟' },
  { live: 81, title: '規則怎麼寫：六個寫法與一次練習', anchor: '規則怎麼寫：白名單' },
  { live: 82, title: '同一套手冊，換個地方用', anchor: '三個地方，差別只有兩件事' },
  { live: 84, title: '換成你的工作，手冊該寫什麼', anchor: '換成你的工作，手冊該寫什麼' },

  // ── 章節七 讓 Agent 分工，並守住品質 ──
  { live: 86, title: 'Agent 分工：三個角色與四種模式', anchor: '讓 Agent 分工，並守住品質' },
  { live: 89, title: '品質防線：動手做一個審查子代理', anchor: '設立品質防線 (Anti-Slop)' },
  { live: 92, title: '中型專案演練：需求、結構、資料與規範', anchor: '把分工放進一個中型專案' },
  { live: 97, title: '用五個指令推進，與最常卡住的五件事', anchor: '用五個指令推進' },

  // ── 章節八 Agent 循環開發流程 ──
  { live: 100, title: '循環開發：把反覆下提示交給系統', anchor: 'Agent 循環開發流程' },
  { live: 103, title: '踩煞車、守品質、讀紅字、設邊界', anchor: '鬼打牆的時候，你可以怎麼踩煞車' },
  { live: 107, title: '實際跑一輪，看它自己驗', anchor: '讓計時器自己跑完一輪' },
  { live: 110, title: '收作品：航行日誌、GitHub 與部署上線', anchor: '幫計時器加上航行日誌' },
  { live: 115, title: '回去之後：挑一個題目，開工三步驟', anchor: '回去之後，做哪一種題目' },

  // ── 章節九 結語 ──
  { live: 117, title: '結語：未來的工作者', anchor: '未來的工作者' },
];
