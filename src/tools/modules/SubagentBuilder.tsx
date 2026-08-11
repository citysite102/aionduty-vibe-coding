import { useState } from 'react';
import { Panel, Field, TextInput, TextArea, OutputPane, Note, Mono, CopyButton, lines } from '../ui';

/**
 * 產出 .claude/agents/<name>.md。
 *
 * 這個檔案的成敗不在角色設定，在退回條件：沒有那條線，它預設會找一個說得過去的說法
 * 讓你通過。所以「不通過怎麼辦」那一格是必填，範本也都圍著它寫。
 */
const PRESETS = [
  {
    id: 'code',
    label: '程式：只負責挑錯的審查員',
    name: 'code-reviewer',
    desc: '專門負責挑錯的資深工程師',
    checks: '倒數的分鐘數有沒有被寫死在程式裡，CLAUDE.md 要求集中成設定\n有沒有引用外部圖片\n有沒有留下沒用到的變數或整段被註解掉的程式',
    reject: '不通過要指出檔案名稱與第幾行，並貼出那一行',
  },
  {
    id: 'quote',
    label: '業務：報價單審查員',
    name: 'quote-reviewer',
    desc: '檢查客戶報價單缺哪個欄位、價格規則與風險提醒',
    checks: '客戶名稱、有效期限、品項、數量、幣別、稅金、折扣理由、付款條件，八項都要有\n折扣超過兩成有沒有寫理由\n有沒有把成本結構寫進要寄出去的檔案',
    reject: '缺哪一項就列出哪一項，不要自己補資料，也不要推測客戶想要什麼',
  },
  {
    id: 'brand',
    label: '行銷：用字與格式審查員',
    name: 'brand-reviewer',
    desc: '檢查對外文案的用字、格式與禁用說法',
    checks: '有沒有出現沒有來源的百分比或數字\n有沒有用到禁用詞清單裡的字\n標題長度、標點與全形半形是否符合規範',
    reject: '逐句指出哪一句不符合、違反哪一條，並附上改寫建議，但不要直接改掉原文',
  },
];

export default function SubagentBuilder() {
  const [p, setP] = useState(PRESETS[0]);
  const [noFix, setNoFix] = useState(true);

  const checkLines = lines(p.checks);

  const file = [
    '---',
    `name: ${p.name || 'reviewer'}`,
    `description: ${p.desc || '負責挑錯的審查員'}`,
    '---',
    '檢查我改完的東西。逐條回覆，每一條寫「通過」或「不通過」。',
    '',
    '要檢查的項目：',
    ...checkLines.map((c, i) => `${i + 1}. ${c}`),
    '',
    p.reject.trim(),
    noFix ? '只要有一條不通過，整份退回，不要自己動手改。' : '不通過的地方可以直接改，但要列出你改了哪幾行。',
  ].join('\n');

  const claudeMdLine = `每次改完 ${'index.html'} 之後，先請 ${p.name || 'reviewer'} 檢查，它退回的話就照著修，修完再檢查一次，通過了再回報給我。`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 xl:gap-8 items-start">
      <div className="space-y-6">
        <Panel title="挑一個角色開始" desc="檔案格式都一樣，差別在檢查標準跟退回條件。">
          <div className="space-y-2.5">
            {PRESETS.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setP(x)}
                className={`w-full text-left rounded-xl border px-4 py-3 text-base leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 ${
                  p.id === x.id
                    ? 'border-sky-500/40 bg-sky-500/5 text-slate-100'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="改成你的標準" desc="檢查項目一行一條，寫成別人只看結果就答得出有或沒有的句子。">
          <div className="space-y-6">
            <Field label="名字" hint="檔名會用它，英文小寫加連字號">
              <TextInput value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} />
            </Field>
            <Field label="一句話職責" hint="主 Agent 靠這句判斷要不要派它出場">
              <TextInput value={p.desc} onChange={(e) => setP({ ...p, desc: e.target.value })} />
            </Field>
            <Field label="要檢查什麼" hint="一行一條">
              <TextArea rows={5} value={p.checks} onChange={(e) => setP({ ...p, checks: e.target.value })} />
            </Field>
            <Field label="不通過的時候要怎麼回" hint="這一格是整個檔案的重點">
              <TextArea rows={3} value={p.reject} onChange={(e) => setP({ ...p, reject: e.target.value })} />
            </Field>
            <button
              type="button"
              onClick={() => setNoFix(!noFix)}
              className={`w-full text-left rounded-xl border px-4 py-3 text-base leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 ${
                noFix ? 'border-sky-500/40 bg-sky-500/5 text-slate-100' : 'border-slate-800 bg-slate-950 text-slate-400'
              }`}
            >
              不准它自己動手改，只能退回
              <span className="block text-xs text-slate-500 mt-0.5">
                審的人跟做的人分開，它才不會改完順便說自己通過
              </span>
            </button>
          </div>
        </Panel>
      </div>

      <div className="lg:sticky lg:top-24 space-y-6">
        <OutputPane filename={`.claude/agents/${p.name || 'reviewer'}.md`} body={file} />

        <Panel title="怎麼建、怎麼叫它" desc={undefined}>
          <ol className="space-y-3 text-sm leading-relaxed text-slate-400 list-decimal pl-5">
            <li>
              把上面整段貼給它，說「幫我建一個 {p.name || 'reviewer'} 子代理，內容照這段」。
              也可以打 <Mono>/agents</Mono> 讓它帶你建。
            </li>
            <li>
              叫它出場要點名：「請 {p.name || 'reviewer'} 檢查 index.html。」
              它自己不會監聽事件。
            </li>
            <li>
              看它退回什麼。<span className="text-slate-200">它指得到檔案跟第幾行才算數</span>，
              回你「整體看起來沒問題」就是沒審。
            </li>
          </ol>

          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="text-sm font-bold text-slate-200 mb-2">要它每次都出場</div>
            <p className="text-sm leading-relaxed text-slate-400 mb-3">
              加這一行到 <Mono>CLAUDE.md</Mono>。這是「通常會跑」，不是「一定會跑」；
              要一定會跑得用 Hook，那是在執行層攔下來。
            </p>
            <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 mb-3">
              <p className="text-sm leading-relaxed text-slate-200">{claudeMdLine}</p>
            </div>
            <CopyButton text={claudeMdLine} label="複製這一行" />
          </div>

          <Note>
            檔案放在專案的 <Mono>.claude/agents/</Mono> 底下，會跟著專案走。
            別人拿到這個資料夾，也會拿到同一套審查標準。
          </Note>
        </Panel>
      </div>
    </div>
  );
}
