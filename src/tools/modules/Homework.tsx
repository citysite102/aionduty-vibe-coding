import { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Panel, Note, Mono, CopyButton } from '../ui';

/**
 * 兩份作業。
 *
 * 分工跟工具箱其他格一樣：投影片負責判斷，這張卡負責照著跑。所以這裡不解釋
 * 為什麼要寫手冊、為什麼要設邊界，那些課程講過了；這裡只寫要交什麼、怎麼自己驗。
 *
 * **完成條件每一條都只能回答「有做到」或「沒做到」**，這是課程自己的判斷標準
 * （Done-when 那一格），作業卡不能自己破例，所以不要寫「做得完整」「品質良好」。
 *
 * 2026-10-21 作業二改過一次。原本叫「交付與驗收：上線、審查角色、資安自查」，
 * 講師反映不吸引人：四樣要交的東西有三樣是流程文件，學員看不到自己會得到什麼。
 * 現在把有感的那一刻拉到標題上（有人第一次打開你做的東西），審查角色與資安自查
 * 退到目標句裡，而且「找一個人用一次」從完成條件升級成要交的東西。
 * **兩份都有一行「做完你手上會有」**，那是這張卡唯一在講報酬的地方，不要拿掉。
 *
 * 兩份作業對齊 `02a_CoreAssets` 那三樣帶得走的東西：作業一是「走完一次從需求到產出」
 * 加「把規範寫成它讀得到的規則」，作業二是「上線」加「讓做的人跟驗的人分開」。
 * 改標題或要交的東西之前先看那一頁，不要讓作業練到課程沒教過的東西。
 *
 * 四種起步題與那四段 Prompt 跟 `28b0_M4_PickTopic` 是同一份，改一邊要改兩邊。
 * 題目一律自選：綁課程的計時器比較好比對，但做完多數人用不到，而這兩份作業
 * 要的是他下週還會再打開一次的東西。
 *
 * 勾選狀態寫進 localStorage。工具箱其他格都是無狀態的，這一格例外，
 * 因為作業會跨好幾天做，重整一次就清空的清單沒有人會用。
 * **頁尾那句「關掉分頁就沒了」因此多了一個但書**，兩邊要一起看：
 * 真的改成不存的話，記得把 `App.tsx` 頁尾那句但書也拿掉，不要讓它變成假的說明。
 */

const TOPICS = [
  {
    title: '每週都要交的那份報表',
    who: '手上有固定要彙整的數字或資料',
    prompt:
      '這是我上週的原始資料和交出去的報表。幫我寫一支腳本，下次我把新資料放進同一個資料夾就能產出同樣格式。',
    get: '一支下次還能再跑一次的腳本',
  },
  {
    title: '一頁式網站，換成你自己的內容',
    who: '想要一個能傳給別人的網址',
    prompt:
      '幫我做一個單頁網站，內容是這些。做完幫我推上 GitHub 並部署，給我可以傳給別人的網址。',
    get: '一組公開網址，對方不用裝任何東西',
  },
  {
    title: '你每個月都要重寫一次的那種回覆',
    who: '客服回信、面試邀約、貼文格式',
    prompt:
      '我貼三則我以前寫過的回覆。幫我整理成一份 SKILL.md，寫清楚步驟和語氣，之後我說「用這個回」你就照著跑。',
    get: '一份 SKILL.md，之後叫一次就展開',
  },
  {
    title: '你部門的用詞與格式規範',
    who: '有一套大家嘴巴上說、但沒寫下來的規則',
    prompt:
      '我貼一份我們的用詞規範。幫我整理成 CLAUDE.md，然後用它檢查這篇文章，列出哪幾句不符合。',
    get: '一份手冊，以後每次對話它都會先讀',
  },
];

const OWASP_PROMPT =
  '照 OWASP Top 10 2025 逐條檢查這個專案，不要改任何檔案。' +
  '每一條都說明這個專案有沒有這個問題、你是從哪個檔案的哪一段看出來的，' +
  '看不出來就寫「看不出來」，不要用推測的。最後照「被人利用之後收不收得回來」排出處理順序。';

const HOMEWORK = [
  {
    id: 'hw1',
    no: '作業一',
    title: '需求到產出：把一件重複的工作交給 Agent',
    after: '章節五走完（手上已經有一份 CLAUDE.md）',
    goal: '選一件你這個月會做第二次的工作，用發包的方式交代出去，並把這件事的規則寫成它每次都會先讀到的檔案。',
    win: '一件你下週還會再打開一次的東西，而且下次不用重講一遍規則',
    hand: [
      '產出本身：一個打得開的網頁、一支能再跑一次的腳本，或一份 SKILL.md',
      '一份 CLAUDE.md，至少三條規則，每一條寫出為什麼要有這條',
      '你交代之前寫下的完成條件，加上逐條的驗收結果',
      '一句話說明這件事省掉了哪一個步驟',
    ],
    done: [
      '關掉對話重開一次，叫它做同一件事，產出跟上一次一樣',
      '產出你沒有手動改過就能交出去',
      'CLAUDE.md 的每一條都說得出為什麼，沒有一條的理由是「比較好」',
      '打 /context 看得到那份手冊被讀進去',
    ],
    stuck: [
      ['prompt', '指令寫完它還是做錯方向'],
      ['done-when', '完成條件寫不出來，或寫了驗不出來'],
      ['claude-md', '手冊不知道從哪裡開始寫'],
    ],
  },
  {
    id: 'hw2',
    no: '作業二',
    title: '交付上線：讓第一個使用者打得開',
    after: '章節八走完（部署與資安那一段）',
    goal: '把作業一的產出放到別人打得開的地方，找一個真的使用者用一次，並且在交出去之前自己先跑完一輪檢查。',
    win: '一個可以貼進履歷或部門群組的網址，加上一套你在會議上講得出口的檢查結果',
    hand: [
      '一個別人打得開的網址，或一份對方不用裝東西就能用的檔案',
      '第一個使用者的紀錄：他卡住的第一個地方，以及你後來改了什麼',
      '一個審查角色：你給它完成條件，它只准挑錯、不准自己改。規則是機械性的就改成一條 Hook',
      '資安自查的結論：OWASP 那段 Prompt 的輸出，加上你自己標的三條「目前沒做」',
    ],
    done: [
      '那個人不用你在旁邊解釋，就知道第一步要做什麼',
      '他卡住的地方你已經改掉，或你說得出為什麼不改',
      '金鑰不在版控裡，翻 git 的歷史紀錄也找不到',
      '故意犯一次那個錯，審查角色或 Hook 真的把它擋下來',
      '你說得出資安自查裡哪三條目前沒做，以及為什麼現在不做',
    ],
    stuck: [
      ['deploy', '推上去或部署卡住'],
      ['subagent', '不知道審查角色怎麼寫'],
      ['router', '那條規則不知道該寫進手冊還是做成 Hook'],
    ],
  },
];

function useTicks(id: string) {
  const key = `homework:${id}`;
  const [ticks, setTicks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setTicks(JSON.parse(raw));
    } catch {
      /* 讀不到就當作全部沒勾，不要讓一格清單弄壞整頁 */
    }
  }, [key]);

  const toggle = (item: string) => {
    setTicks((prev) => {
      const next = { ...prev, [item]: !prev[item] };
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* 無痕視窗寫不進去，畫面上照樣可以勾 */
      }
      return next;
    });
  };

  return [ticks, toggle] as const;
}

function DoneList({ id, items }: { id: string; items: string[] }) {
  const [ticks, toggle] = useTicks(id);
  const count = items.filter((i) => ticks[i]).length;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <div className="text-sm font-bold text-slate-200">完成條件</div>
        <div className="font-mono text-xs text-slate-500">
          {count} / {items.length}
        </div>
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => {
          const on = !!ticks[item];
          return (
            <li key={item}>
              <button
                type="button"
                onClick={() => toggle(item)}
                className="w-full text-left flex items-start gap-2.5 rounded-lg px-2 py-1.5 hover:bg-slate-800/60"
              >
                <span
                  className={`mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center ${
                    on ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'border-slate-700'
                  }`}
                >
                  {on && <Check size={11} aria-hidden="true" />}
                </span>
                <span className={`text-sm leading-relaxed ${on ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Homework({ go }: { go?: (id: string) => void }) {
  return (
    <div className="space-y-6">
      <Panel
        title="挑題目"
        desc="兩份作業都用你自己的題目。選一件你這個月會做第二次的事：第一次交代它花的時間通常比省下來的多，第二次才看得出差別。"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TOPICS.map((t) => (
            <div key={t.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-slate-100 text-sm font-bold mb-1">{t.title}</div>
              <div className="text-slate-500 text-xs mb-3">{t.who}</div>
              <div className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-300 text-xs leading-relaxed mb-2">
                {t.prompt}
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500 text-xs">{t.get}</span>
                <CopyButton text={t.prompt} label="複製" />
              </div>
            </div>
          ))}
        </div>
        <Note>
          四個都對不上的話，自己挑也可以，條件只有一個：那件事你這個月會再做一次。
        </Note>
      </Panel>

      {HOMEWORK.map((hw) => (
        <div key={hw.id}>
        <Panel title={`${hw.no}｜${hw.title}`} desc={hw.goal}>
          <div className="rounded-xl border border-sky-500/25 bg-sky-500/5 px-4 py-3 mb-4">
            <span className="text-sky-300 text-xs font-bold mr-2">做完你手上會有</span>
            <span className="text-slate-300 text-sm leading-relaxed">{hw.win}</span>
          </div>
          <div className="text-xs text-slate-500 mb-4">建議時機：{hw.after}</div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-bold text-slate-200 mb-2">要交出來的東西</div>
              <ul className="space-y-1.5">
                {hw.hand.map((h) => (
                  <li key={h} className="text-slate-300 text-sm leading-relaxed flex gap-2">
                    <span className="text-slate-600 shrink-0">・</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <DoneList id={hw.id} items={hw.done} />
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800">
            <div className="text-sm font-bold text-slate-200 mb-2">卡住的時候</div>
            <div className="flex flex-wrap gap-2">
              {hw.stuck.map(([target, why]) => (
                <button
                  key={target}
                  type="button"
                  onClick={() => go?.(target)}
                  className="group inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-left hover:border-sky-500/40"
                >
                  <span className="text-slate-400 text-xs leading-relaxed">{why}</span>
                  <ArrowRight
                    size={13}
                    aria-hidden="true"
                    className="text-slate-600 group-hover:text-sky-400 shrink-0"
                  />
                </button>
              ))}
            </div>
          </div>

          {hw.id === 'hw2' && (
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="text-sm font-bold text-slate-200 mb-2">資安自查要跑的那一段</div>
              <div className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-slate-300 text-xs leading-relaxed mb-2">
                {OWASP_PROMPT}
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500 text-xs">
                  跑完把結論貼進作業，並自己標出三條目前沒做的。
                </span>
                <CopyButton text={OWASP_PROMPT} label="複製" />
              </div>
            </div>
          )}
        </Panel>
        </div>
      ))}

      <Note>
        這兩份沒有人幫你改，驗收方式就是上面那幾條：每一條只能回答有做到或沒做到。
        換一個題目這套流程不會變，講清楚要什麼、說好什麼叫做完、跑完自己抽查幾筆。
        要交給別人看的話，把 <Mono>完成條件</Mono> 連同你勾的狀態一起附上，
        對方才知道你驗過哪幾項。
      </Note>
    </div>
  );
}
