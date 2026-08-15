import { useState } from 'react';
import { Panel, Field, TextInput, TextArea, Select, Toggle, OutputPane, Note, Mono, CopyButton, lines } from '../ui';

/**
 * 產生 CLAUDE.md，順便處理 AGENTS.md 那個問題。
 *
 * AGENTS.md 是各家工具通用的檔名，CLAUDE.md 是 Claude Code 讀的。
 * 兩份內容一樣的話，最容易出事的是「改了一份忘了另一份」，所以這裡不產出兩份全文，
 * 而是給捷徑（symlink）跟一行引用兩種做法，並且說明各自的代價。
 */
const STACKS = [
  { value: 'single', label: '單一個 index.html（課程裡那個計時器）' },
  { value: 'vite', label: 'Vite + React' },
  { value: 'next', label: 'Next.js' },
  { value: 'python', label: 'Python 腳本' },
  { value: 'nocode', label: '不是程式專案（文件、報表、內容）' },
];

const VERIFY: Record<string, string> = {
  single: '每次改完，用 webapp-testing 開瀏覽器把功能點過一次，Console 沒有紅字才算做完。',
  vite: '每次改完跑一次 `npm run lint`，紅字沒清掉不算做完。',
  next: '每次改完跑一次 `npm run lint`，紅字沒清掉不算做完。',
  python: '每次改完跑一次你寫的檢查腳本，全部通過才算做完。',
  nocode: '每次做完，逐項對照上面的完成條件回報通過或不通過，有一項沒過就自己補完再回報。',
};

export default function ClaudeMdBuilder() {
  const [name, setName] = useState('mission-timer');
  const [one, setOne] = useState('一頁式倒數計時器，太空任務的外觀。純前端，沒有後端。');
  const [stack, setStack] = useState('single');
  const [zh, setZh] = useState(true);
  const [sayFirst, setSayFirst] = useState(true);
  const [verify, setVerify] = useState(true);
  const [style, setStyle] = useState('背景固定 #020617，強調色只用一種，其他一律灰階\n星球與火箭用 canvas 或 CSS 畫，不要引用外部圖片');
  const [never, setNever] = useState('時間快到時不要跳 alert，也不要用閃爍\n不要把金鑰寫進程式碼裡');
  const [tab, setTab] = useState<'claude' | 'agents'>('claude');

  const rules: string[] = [];
  if (zh) rules.push('一律用繁體中文回覆');
  if (sayFirst) rules.push('改任何檔案之前，先說你要改哪一個、改什麼');
  rules.push('一次只做一件事，做完先讓我看，再往下');

  const body = [
    `# ${name || '專案名稱'}`,
    '',
    one.trim(),
    '',
    '## 怎麼跟我合作',
    ...rules.map((r) => `- ${r}`),
    '',
    ...(lines(style).length ? ['## 這個專案的寫法', ...lines(style).map((r) => `- ${r}`), ''] : []),
    ...(verify ? ['## 什麼叫做完', `- ${VERIFY[stack]}`, ''] : []),
    ...(lines(never).length ? ['## 不要做', ...lines(never).map((r) => `- ${r}`)] : []),
  ]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const agents = `# ${name || '專案名稱'}\n\n這個專案的規範寫在 CLAUDE.md，請直接讀那一份。\n內容只維護一份，這裡不要另外抄一次。`;

  const symlinkPrompt = `幫我在這個專案裡把 AGENTS.md 做成 CLAUDE.md 的捷徑（symlink），這樣兩個檔名指到同一份內容，我只要改一份。做完告訴我怎麼確認它成功了。`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 xl:gap-8 items-start">
      <div className="space-y-6">
        <Panel title="這個專案是什麼" desc="它每次開新對話都會先讀這一段，所以要寫給「完全沒進來過的人」看。">
          <div className="space-y-6">
            <Field label="資料夾名稱">
              <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="mission-timer" />
            </Field>
            <Field label="一句話說明" hint="做什麼的、給誰用">
              <TextArea rows={2} value={one} onChange={(e) => setOne(e.target.value)} />
            </Field>
            <Field label="用什麼做的" hint="決定「什麼叫做完」那一段要寫哪一種檢查">
              <Select value={stack} onChange={(e) => setStack(e.target.value)} options={STACKS} />
            </Field>
          </div>
        </Panel>

        <Panel title="怎麼跟你合作" desc="這三條是每個專案都適用的，跟你做什麼無關。">
          <div className="space-y-2.5">
            <Toggle checked={zh} onChange={setZh} label="一律用繁體中文回覆" />
            <Toggle
              checked={sayFirst}
              onChange={setSayFirst}
              label="改任何檔案之前，先說要改哪一個"
              hint="這條是給你煞車的機會，不是禮貌"
            />
            <Toggle
              checked={verify}
              onChange={setVerify}
              label="加上「什麼叫做完」那一段"
              hint="沒有這段，它改完就停下來等你看"
            />
          </div>
        </Panel>

        <Panel title="這個專案自己的規矩" desc="只有這個專案適用的東西寫這裡，一行一條。">
          <div className="space-y-6">
            <Field label="寫法與樣式" hint="寫成別人只看結果就能回答有或沒有的句子">
              <TextArea rows={3} value={style} onChange={(e) => setStyle(e.target.value)} />
            </Field>
            <Field label="不要做" hint="踩過一次的坑寫在這裡，它下次才不會再踩">
              <TextArea rows={3} value={never} onChange={(e) => setNever(e.target.value)} />
            </Field>
          </div>
        </Panel>
      </div>

      <div className="lg:sticky lg:top-24 space-y-6">
        <div className="flex gap-2">
          {[
            { id: 'claude' as const, label: 'CLAUDE.md' },
            { id: 'agents' as const, label: 'AGENTS.md' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-lg border px-4 py-1.5 font-mono text-sm transition-colors ${
                tab === t.id
                  ? 'border-sky-500/40 bg-sky-500/10 text-sky-300'
                  : 'border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'claude' ? (
          <>
            <OutputPane filename="CLAUDE.md" body={body} />
            <Panel title="放哪裡" desc={undefined}>
              <p className="text-sm leading-relaxed text-slate-400">
                放在專案資料夾的最外層，檔名就是 <Mono>CLAUDE.md</Mono>，全大寫。
                存好之後跟它說一句「請重新讀一次 CLAUDE.md」，再打 <Mono>/context</Mono> 確認它出現在載入清單裡。
              </p>
              <Note>
                看不到它在清單裡，多半是放錯層：它讀的是你打開的那個資料夾，不是上一層。
              </Note>
            </Panel>
          </>
        ) : (
          <>
            <Panel
              title="AGENTS.md 是別家工具讀的檔名"
              desc="Claude Code 讀 CLAUDE.md，Cursor、Codex 這些多半讀 AGENTS.md。同一個專案兩邊都要有的時候，最容易出事的不是格式，是你改了一份忘了另一份。"
            >
              <div className="space-y-6">
                <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
                  <div className="text-sm font-bold text-emerald-300 mb-2">做法一：做成同一份的捷徑（建議）</div>
                  <p className="text-sm leading-relaxed text-slate-300 mb-3">
                    兩個檔名指到同一份內容，改一份等於兩份都改。不用自己打指令，把下面這句貼給它。
                  </p>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
                    <p className="text-sm leading-relaxed text-slate-200">{symlinkPrompt}</p>
                  </div>
                  <div className="mt-3">
                    <CopyButton text={symlinkPrompt} label="複製這句" />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="text-sm font-bold text-slate-200 mb-2">做法二：AGENTS.md 只寫一行，指回去</div>
                  <p className="text-sm leading-relaxed text-slate-400 mb-3">
                    有些平台不吃捷徑（例如某些 Windows 環境、或壓縮後上傳的專案），那就讓 AGENTS.md 只負責指路。
                  </p>
                  <OutputPane filename="AGENTS.md" body={agents} />
                </div>
              </div>
              <Note>
                不建議把同一份內容複製成兩個檔案。當下最快，但三個月後那兩份一定會不一樣，
                而你不會知道是哪一份在生效。
              </Note>
            </Panel>
          </>
        )}
      </div>
    </div>
  );
}
