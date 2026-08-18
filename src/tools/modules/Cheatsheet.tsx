import { useState } from 'react';
import { Panel, TextInput, Note, Mono, CopyButton } from '../ui';

/**
 * 全課程可以直接複製的指令，收在同一頁。
 *
 * 為什麼要有這一格：自己看影片的人卡住的時候，沒有講者可以問「剛剛那句怎麼打」。
 * 其他七格都是「幫你組出一段新的話」，這一格是「把課程裡出現過的原話找回來」，
 * 是兩件不同的事，所以不塞進那七格裡。
 *
 * 每一條都必須是課程裡真的出現過的，不要在這裡自己發明新指令。
 * from 欄寫的是它在哪一段出現，學員對不上的時候可以回去看那一頁。
 *
 * kind 有兩種：say 是貼進對話框的話，slash 是直接打的斜線指令。
 * 兩者混排而不分開，因為學員要的是「這一步該做什麼」，不是「這是哪一類」。
 */
type Item = {
  when: string;
  kind: 'say' | 'slash';
  text: string;
  watch?: string;
  from: string;
};

const GROUPS: { unit: string; title: string; items: Item[] }[] = [
  {
    unit: '階段一',
    title: '做出第一個作品',
    items: [
      {
        when: '讓它去外面拿資料，接一個真的 API',
        kind: 'say',
        text: `幫我在計時器加一個功能，資料來源是這個網址：
https://api.open-meteo.com/v1/forecast?latitude=25.03&longitude=121.56&daily=sunrise,sunset&timezone=Asia/Taipei&forecast_days=1

1. 頁面載入時去拿今天台北的日出與日落時間
2. 顯示在倒數下面，格式是「日出 05:23 ／ 日落 18:36」
3. 拿不到的時候不要讓畫面壞掉，那一行顯示「離線」就好

這個 API 不用金鑰，直接打就可以。`,
        watch: '改完存檔，重新整理瀏覽器。那一行顯示「離線」代表請求送出去了但沒拿回來，先檢查網路。',
        from: '讓計時器打一次 API',
      },
      {
        when: '第一次存檔，之後改壞了才回得來',
        kind: 'say',
        text: '幫我把這個資料夾建立成 Git repository，做第一次 commit，訊息寫「第一個作品完成」。',
        watch: '存檔之後才新增的檔案不在裡面，那要再存一次才算。',
        from: '第一個作品收成',
      },
      {
        when: '看到紅字，不想自己讀那段英文',
        kind: 'say',
        text: '用白話解釋這個錯誤在說什麼，我不看程式碼。',
        watch: '整段紅字複製貼上，不要只貼最後一行。前面那幾行才有檔名跟行號。',
        from: '錯誤訊息判讀',
      },
      {
        when: '它改完了，但你想知道下次怎麼避免',
        kind: 'say',
        text: '這次為什麼會發生？下次我要怎麼避免？',
        watch: '這一句最容易被跳過，但它決定你會不會一直踩同一個坑。',
        from: '錯誤訊息判讀',
      },
    ],
  },
  {
    unit: '階段二',
    title: '寫出會被讀到的手冊',
    items: [
      {
        when: '專案已經有東西了，讓它自己讀完再寫手冊',
        kind: 'say',
        text: '讀一遍這個專案，幫我寫一份 CLAUDE.md。先不要存檔，貼出來給我看。',
        watch: '「先不要存檔」是重點。先看它寫了什麼，再決定要不要留。',
        from: '動手：四格',
      },
      {
        when: '確認手冊真的被載入了',
        kind: 'slash',
        text: '/context',
        watch: '看 CLAUDE.md 有沒有出現在 Memory files 清單裡。沒有就是位置錯了，不是它不聽話。',
        from: '動手：四格',
      },
      {
        when: '把新的規矩補進既有的手冊，不要蓋掉舊的',
        kind: 'say',
        text: '請在 CLAUDE.md 補上下面這幾條，原本已經有的不要動，以後每次進來都要遵守。',
        watch: '底下接你自己那幾條，一行一條。',
        from: '動手：寫出能用的手冊',
      },
      {
        when: '驗收：手冊到底有沒有被遵守',
        kind: 'say',
        text: '幫我加一個 5 分鐘的「補給時間」模式，樣式請遵守 CLAUDE.md。',
        watch: '看它有沒有自己去讀那份手冊：按鈕文案有沒有跟上、有沒有偷塞外部圖片、分鐘數有沒有寫死。',
        from: '動手：寫出能用的手冊',
      },
      {
        when: '需求你自己也還沒想清楚',
        kind: 'say',
        text: '這個需求我還沒想清楚。先不要寫程式，把你需要我決定的事情列出來問我。',
        watch: '它問的那幾題，就是你沒講它就得自己猜的地方。',
        from: '動手：四格',
      },
      {
        when: '把一套固定步驟做成 Skill',
        kind: 'say',
        text: '幫我建一個叫 weekly-report 的 Skill，內容是我每週整理報表的步驟：（在這裡寫你的步驟）',
        watch: '檔案會在 .claude/skills/weekly-report/SKILL.md。建好之後要重開一次對話它才看得到。',
        from: 'Skill 怎麼裝',
      },
      {
        when: '裝一個現成的 Skill，但不確定該打哪個指令',
        kind: 'say',
        text: '幫我安裝 frontend-design 這個 Skill，裝完告訴我怎麼叫它。',
        watch: '也可以自己打 /plugin 從市集挑。裝之前先看它要求什麼權限。',
        from: 'Skill 怎麼裝',
      },
      {
        when: '同一個專案要同時給別家工具讀',
        kind: 'say',
        text: '幫我在這個專案裡把 AGENTS.md 做成 CLAUDE.md 的捷徑（symlink），這樣兩個檔名指到同一份內容，我只要改一份。做完告訴我怎麼確認它成功了。',
        watch: '不要複製成兩份。當下最快，但三個月後那兩份一定會不一樣。',
        from: 'CLAUDE.md 產生器',
      },
    ],
  },
  {
    unit: '階段三',
    title: '讓角色替你把關',
    items: [
      {
        when: '建一個只負責挑錯、不准自己動手改的角色',
        kind: 'say',
        text: '幫我建一個 code-reviewer 子代理，內容照下面這段：（貼上子代理產生器的輸出）',
        watch: '也可以打 /agents 讓它帶你建。檔案會在 .claude/agents/code-reviewer.md。',
        from: '動手：建一個審查角色',
      },
      {
        when: '叫它出場（它自己不會監聽）',
        kind: 'say',
        text: '請 code-reviewer 檢查 index.html。',
        watch: '它指得到檔案跟第幾行才算數。回你「整體看起來沒問題」就是沒審。',
        from: '動手：建一個審查角色',
      },
    ],
  },
  {
    unit: '階段四',
    title: '讓它自己跑一輪，然後上線',
    items: [
      {
        when: '交代一件比較大的事，要它自己驗、自己修',
        kind: 'say',
        text: `【目標】
（一句話，一次一個功能）

【什麼叫做完】以下每一題都要通過
1. （用眼睛看得出來的事實）
2. 瀏覽器 Console 沒有紅字

【怎麼驗】
每改完一輪自己開瀏覽器把上面每一題點過一次，逐題列出通過或失敗。沒有全過就自己修，修完再驗一次。

【邊界】
只能改 index.html。最多跑 5 輪，還沒全過就停下來，告訴我卡在第幾題。
需要改到別的檔案或安裝新套件，先問我。`,
        watch: '一次貼完，不要拆成四句慢慢講。到「Prompt 組裝器」那一格可以照你的情境填。',
        from: '動手：讓它自己跑一輪',
      },
      {
        when: '把專案推上 GitHub',
        kind: 'say',
        text: '幫我把這個專案推到 GitHub，設成 private。推之前先確認沒有把密碼或金鑰帶上去。',
        watch: '不確定要不要公開就選 private，之後隨時能改成公開，反過來很麻煩。但免費帳號要用 GitHub Pages 掛網頁的話，repo 必須是 public。',
        from: '推上 GitHub',
      },
      {
        when: '真的把它變成一個網址',
        kind: 'say',
        text: '幫我把這個資料夾部署上線。先確認本機打開沒問題，推上 GitHub，再接部署平台完成部署。需要我去瀏覽器授權的時候停下來告訴我要點哪裡。完成後把網址給我，並且確認那個網址真的打得開。',
        watch: '拿到網址之後用手機開一次，不要用你部署的那台電腦，也不要連同一個 wifi。',
        from: '真的把它變成一個網址',
      },
      {
        when: 'repo 是 private，GitHub Pages 掛不上去',
        kind: 'say',
        text: '我的 repo 是 private，GitHub Pages 掛不上去。請先幫我確認 .gitignore 有沒有擋掉金鑰跟 .env，確認乾淨之後再告訴我怎麼把 repo 改成 public。',
        watch: '免費帳號只掛得起 public 的 repo。不想公開就改走 Vercel，它吃 private。',
        from: '有些東西不能推上去',
      },
      {
        when: '改完之後，讓線上那版跟著更新',
        kind: 'say',
        text: '我改完了，請幫我 commit 並 push，讓線上那版更新。',
        watch: '部署平台看的是 GitHub 上的版本。改在自己電腦上，那邊還沒收到。',
        from: '部署卡關',
      },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.items);

export default function Cheatsheet() {
  const [q, setQ] = useState('');
  const kw = q.trim().toLowerCase();
  const match = (i: Item) =>
    !kw ||
    i.when.toLowerCase().includes(kw) ||
    i.text.toLowerCase().includes(kw) ||
    i.from.toLowerCase().includes(kw);

  const groups = GROUPS.map((g) => ({ ...g, items: g.items.filter(match) })).filter(
    (g) => g.items.length > 0,
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Panel
        title={`課程裡出現過的指令，共 ${ALL.length} 條`}
        desc="照階段排。找到你這一步要用的那一條，按複製，貼進 Claude Code。這裡不會有課程沒教過的東西。"
      >
        <TextInput
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜尋，例如「部署」「手冊」「錯誤」「Skill」"
        />
      </Panel>

      {groups.map((g) => (
        <section key={g.unit} className="space-y-4">
          <div className="flex items-baseline gap-3 px-1">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
              {g.unit}
            </span>
            <span className="text-base text-slate-400">{g.title}</span>
          </div>

          {g.items.map((i) => (
            <div key={i.text} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                <h3 className="text-base font-bold text-slate-100 leading-snug">{i.when}</h3>
                <span className="rounded-full border border-slate-800 px-2.5 py-0.5 font-mono text-xs text-slate-500">
                  {i.from}
                </span>
              </div>

              <div className="rounded-lg border border-sky-900/50 bg-sky-950/20 px-4 py-3">
                <pre className="font-mono text-sm leading-relaxed text-sky-100 whitespace-pre-wrap break-words">
                  {i.kind === 'slash' ? i.text : `「${i.text}」`}
                </pre>
              </div>

              <div className="mt-3 flex flex-wrap items-start gap-x-4 gap-y-2.5">
                <CopyButton text={i.text} />
                {i.watch && (
                  <p className="flex-1 min-w-[16rem] text-sm leading-relaxed text-slate-400">
                    {i.watch}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>
      ))}

      {!groups.length && (
        <p className="text-sm text-slate-500 px-1">
          沒有符合的。課程沒教過的指令這裡不會有，直接把你想做的事講給它聽就好。
        </p>
      )}

      <Panel title="斜線指令另外三個常用的" desc="這幾個不是貼給它的話，是直接打的。">
        <div className="divide-y divide-slate-800">
          {[
            ['/context', '看這一輪載入了什麼。手冊沒生效的時候第一個要打的就是它。'],
            ['/agents', '管理子代理，也可以讓它帶你建一個。'],
            ['/plugin', '打開市集裝 Skill。'],
          ].map(([cmd, desc]) => (
            <div key={cmd} className="grid grid-cols-[7rem_1fr] gap-4 py-3 text-sm leading-relaxed">
              <Mono>{cmd}</Mono>
              <span className="text-slate-400">{desc}</span>
            </div>
          ))}
        </div>
        <Note>
          指令的完整清單在 Claude Code 裡打 <Mono>/help</Mono> 就看得到。這裡只列課程用得到的。
        </Note>
      </Panel>
    </div>
  );
}
