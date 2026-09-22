import { FolderGit2, FileCode2, BookMarked, Bot, Wrench } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 這一頁原本是 init / add / commit 三張卡加上「為什麼要有中間那一站」的 Callout。
 * 下一頁的 Git playground 做出來之後，那些變成同一批內容講兩次：
 * 那邊有可以按的暫存區，也有被 .gitignore 擋掉的 .env，兩頁互換位置讀起來沒差別，
 * 就是 CLAUDE.md B-5 說的同一批內容開兩頁。
 *
 * 所以這一頁退回它獨有的職務：為什麼要有版本紀錄、Git 到底記了哪些東西。
 * 「怎麼操作」整段交給下一頁，這裡一個指令都不列（init 除外，它是起點，
 * 而且只做一次，放進 playground 反而會多一個按了只會亮一次的按鈕）。
 *
 * 「記的不只是程式碼」是這門課特別要講的：學員之後寫的手冊、Skill、子代理設定
 * 全都是文字檔，全都會一起進版本紀錄。章節五開始改手冊的時候要靠這件事。
 *
 * branch 的說明 2026-09-21 搬到下一頁。Git 的詞彙（add / commit / push / pull）
 * 全部集中在 playground 那一頁，branch 留在這裡是孤零零的一個名詞。
 */
const RECORDED = [
  {
    icon: FileCode2,
    label: '程式碼',
    body: '網頁、樣式、腳本，這是大家想得到的那一批。',
  },
  {
    icon: BookMarked,
    label: 'CLAUDE.md',
    body: '你寫給 AI 的規則。改了哪一條、什麼時候改的，都查得到。',
    mono: true,
  },
  {
    icon: Bot,
    label: 'Skill 與子代理的設定',
    body: '你分給 AI 的角色，例如專門負責審查的那一個，一樣是文字檔，一樣跟著版本走。',
  },
  {
    icon: Wrench,
    label: '你自己搭的運作框架',
    body: '驗收腳本、檢查用的小工具，改壞了退得回去。',
  },
];

export default function Slide10e() {
  return (
    <SlideLayout title="Git 幫你記下每一版，不只是程式碼" subtitle="Version Control" icon={FolderGit2}>
      <div className="max-w-5xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          以前你可能會把檔案存成{' '}
          <code className="font-mono text-slate-200">報告_final_v2_真的最後版.docx</code>。
          <strong className="text-slate-100">Git 就是把這件事做對的版本</strong>
          ：它幫你記下每一次的修改，你隨時可以回到任何一個時間點，而且不用自己想檔名。
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="rounded-2xl border border-sky-500/25 bg-sky-500/5 p-5 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
            <code className="font-mono text-base font-bold text-sky-300">git init</code>
            <span className="text-slate-100 text-base font-bold">開始記錄這個資料夾</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            一個專案只做一次。從這一刻起，這個資料夾裡的變動 Git 都會盯著。
            它會生出一個叫 <code className="font-mono text-slate-300">.git</code> 的隱藏資料夾，
            所有版本都存在那裡，所以你的專案資料夾自己就是一份完整的紀錄，斷網也照樣存得了檔。
          </p>
        </AnimatedBlock>

        {/* Git 記的是「資料夾裡每一個沒被排除的檔案每一版長什麼樣」，這一格把「哪些東西」攤開。
            標題不要寫成「每一個文字檔」：圖片、字型、音樂檔一樣進版本紀錄，寫成文字檔會讓
            學員以為 public/ 底下那些東西沒被備份到。四格要講的「不只是程式碼」標題已經有了。 */}
        <AnimatedBlock stepIndex={3}>
          <div className="text-base font-bold text-slate-100 mb-3">它會記下你沒排除掉的每一個檔案</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {RECORDED.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.label}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-4 flex items-start gap-3"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <div
                      className={`text-base font-bold mb-1 ${
                        r.mono ? 'font-mono text-orange-300' : 'text-slate-100'
                      }`}
                    >
                      {r.label}
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{r.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="text-base font-bold text-slate-100 mb-1.5">為什麼要留著這些紀錄</div>
          <p className="text-slate-400 text-sm leading-relaxed">
            規則會越改越多，總有一次會改壞。有紀錄，你查得到是哪一次改的、那一次改了什麼、跟現在差在哪，然後退回上一版。
            沒紀錄，你只能靠印象猜自己上禮拜寫了什麼。
          </p>
        </AnimatedBlock>

        <Callout tone="muted" stepIndex={5}>
          這些操作你不會自己打，但有兩件事要你講：
          <strong className="text-slate-200">這次存哪幾個檔案，說明寫什麼</strong>
          。例如「把 <code className="font-mono text-slate-300">index.html</code> 和{' '}
          <code className="font-mono text-slate-300">style.css</code> 這次的修改存成一版，
          說明寫『換掉按鈕的顏色』」。存完再問一句「這一版存進去的是哪些檔案」，
          因為有些東西不能進版本紀錄，例如金鑰跟密碼。
        </Callout>

      </div>
    </SlideLayout>
  );
}
