import { useState } from 'react';
import { Panel, Field, TextInput, TextArea, Select, OutputPane, Note, lines } from '../ui';
import { judge } from '../vague';

/**
 * 組出來的形狀就是課程第四單元那段可以照抄的指令：目標、什麼叫做完、怎麼驗、邊界。
 * 四段缺一段就會有具體後果，所以每一段的提示都寫「少了它會怎樣」，不是寫「請填寫」。
 */
const PRESETS = [
  {
    id: 'feature',
    label: '幫現有的東西加一個功能',
    goal: '幫計時器加上三個預設時間：15、25、50 分鐘，各一顆按鈕。',
    done: '三顆按鈕都點得到，點下去大字分別變成 15:00 / 25:00 / 50:00\n倒數進行中點另一顆，先停下來換成新時間，不會自己開始跑\n按「返航」之後回到目前選的那個時間，不是固定回 25:00\n瀏覽器 Console 沒有紅字',
    verify: '每改完一輪，用 webapp-testing 自己開瀏覽器把上面每一題點過一次，逐題列出通過或失敗給我看。沒有全過就自己修，修完再驗一次。',
    scope: '只能改 index.html，樣式照 CLAUDE.md。\n最多跑 5 輪，還沒全過就停下來，告訴我卡在第幾題。\n需要改到別的檔案或安裝新套件，先問我。',
  },
  {
    id: 'bug',
    label: '修一個壞掉的地方',
    goal: '按下「返航」之後畫面會停住不動，請找出原因並修好。',
    done: '按「返航」之後倒數回到目前選的時間，而且可以再按「發射」重新開始\n連按三次「返航」也不會卡住\n瀏覽器 Console 沒有紅字',
    verify: '修完自己開瀏覽器把上面每一題點過一次，逐題回報通過或失敗。順便告訴我原本錯在哪一行，用白話講，我不看程式碼。',
    scope: '先只改造成這個問題的那一段，不要順手重構其他地方。\n如果原因不只一個，先停下來列給我看，我決定要修哪一個。',
  },
  {
    id: 'data',
    label: '整理一份資料（不用寫程式）',
    goal: '把這個資料夾裡 30 場會議的逐字稿，整理成一份下週會議可以直接照著討論的跟進清單。',
    done: '每一筆都有：客戶名稱、要做什麼、負責人、期限日期（寫成 2026-08-15 這種格式）、出自第幾場會議\n30 場每一場都要有對應的列，一場都不能漏\n沒有空白，也沒有「待確認」',
    verify: '做完先自己對一次：逐項檢查上面每一條，回報通過或不通過。不通過的自己補齊再檢查一次。',
    scope: '牽涉報價金額、合約期限、折扣條件的，一律留白並標記，不要自己填數字。\n只讀這個資料夾，不要動原始檔。',
  },
];

const EMPTY = { goal: '', done: '', verify: '', scope: '' };

export default function PromptBuilder() {
  const [preset, setPreset] = useState('feature');
  const [v, setV] = useState(PRESETS[0]);

  function applyPreset(id: string) {
    setPreset(id);
    if (id === 'blank') {
      setV({ ...PRESETS[0], ...EMPTY });
      return;
    }
    const p = PRESETS.find((x) => x.id === id);
    if (p) setV(p);
  }

  const doneLines = lines(v.done);
  const vagueHits = [...new Set(doneLines.flatMap((l) => judge(l).hits))];

  const assembled = [
    v.goal.trim() && `【目標】\n${v.goal.trim()}`,
    doneLines.length &&
      `【什麼叫做完】${doneLines.length} 題全部通過才算完成\n${doneLines
        .map((l, i) => `${i + 1}. ${l}`)
        .join('\n')}`,
    v.verify.trim() && `【怎麼驗】\n${v.verify.trim()}`,
    v.scope.trim() && `【邊界】\n${v.scope.trim()}`,
  ]
    .filter(Boolean)
    .join('\n\n');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 xl:gap-8 items-start">
      <div className="space-y-6">
        <Panel
          title="先挑一個接近的情境"
          desc="四段的形狀都一樣，換情境只是換內容。挑一個再改比從空白開始快。"
        >
          <div className="space-y-2.5">
            {[...PRESETS, { id: 'blank', label: '空白，我自己寫' }].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p.id)}
                className={`w-full text-left rounded-xl border px-4 py-3 text-base leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 ${
                  preset === p.id
                    ? 'border-sky-500/40 bg-sky-500/5 text-slate-100'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="填四段" desc="每一段少了都有具體後果，右邊會即時組起來。">
          <div className="space-y-6">
            <Field label="【目標】" hint="一句話，一次一個功能">
              <TextArea
                rows={2}
                value={v.goal}
                onChange={(e) => setV({ ...v, goal: e.target.value })}
                placeholder="這一輪要它做的事"
              />
            </Field>

            <Field label="【什麼叫做完】" hint="一行一題，每題都要用眼睛看得出有沒有">
              <TextArea
                rows={5}
                value={v.done}
                onChange={(e) => setV({ ...v, done: e.target.value })}
                placeholder={'點下去大字變成 15:00\n瀏覽器 Console 沒有紅字'}
              />
              {vagueHits.length > 0 && (
                <p className="mt-2 rounded-lg border border-amber-500/25 bg-amber-500/5 px-3.5 py-2.5 text-sm leading-relaxed text-slate-300">
                  這幾個字它驗不出來：
                  <span className="text-amber-300 font-bold">{vagueHits.join('、')}</span>
                  。換成「指著畫面回答得出有或沒有」的寫法，或到「Done-when 檢查器」那一頁改。
                </p>
              )}
            </Field>

            <Field label="【怎麼驗】" hint="少了這段，它改完就停下來等你，不會自己跑下一輪">
              <TextArea
                rows={3}
                value={v.verify}
                onChange={(e) => setV({ ...v, verify: e.target.value })}
                placeholder="每改完一輪自己驗一次，逐題回報通過或失敗，沒全過就自己修"
              />
            </Field>

            <Field label="【邊界】" hint="最多幾輪、能動哪些檔案、什麼時候要停下來問你">
              <TextArea
                rows={3}
                value={v.scope}
                onChange={(e) => setV({ ...v, scope: e.target.value })}
                placeholder="只能改 index.html，最多跑 5 輪"
              />
            </Field>
          </div>
        </Panel>
      </div>

      <div className="lg:sticky lg:top-24 space-y-6">
        <OutputPane filename="貼進 Claude Code 的那段話" body={assembled || '（四段都空著）'} />
        <Panel title="貼下去之後" desc={undefined}>
          <ol className="space-y-2.5 text-sm leading-relaxed text-slate-400 list-decimal pl-5">
            <li>一次貼完，不要拆成四句慢慢講。拆開講它會先做第一句。</li>
            <li>它跑的前幾輪不用動，那幾輪原本是你自己要來回的。</li>
            <li>它說全過的時候，自己再點一次確認。它有可能用講的宣稱驗過了。</li>
            <li>跑滿你設的輪數還沒過，換你出手，不要放著讓它繼續跑。</li>
          </ol>
          <Note>
            四段裡最花力氣的是「什麼叫做完」。目標它一定會做，邊界你想得到，
            但完成條件沒寫清楚，它就會自己選一個答案。
          </Note>
        </Panel>
      </div>
    </div>
  );
}
