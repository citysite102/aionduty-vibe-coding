import { useState } from 'react';
import { Panel, Field, TextArea, Note, CopyButton } from '../ui';
import { judge, toSentences, VAGUE_WORDS } from '../vague';

/**
 * 把「畫面要好看」這種句子挑出來。
 *
 * 誠實地說，這是字面比對：它查得到清單裡的詞，查不到「這句話意思很模糊」。
 * 所以畫面上要寫清楚，沒被標記不等於寫得夠好，判準還是那一句：
 * 它驗完之後，你能不能指著畫面說「這題過了」。
 */
const SAMPLE = `畫面要好看，風格保持一致
操作要順暢
點下去大字變成 15:00
資料不要太多
每一筆都有客戶名稱、負責人、期限日期，沒有空白`;

const REWRITE_HINTS = [
  ['好看、美觀、有質感', '指到看得到的東西：顏色用哪一組、間距多少、有沒有多餘的裝飾'],
  ['順暢、流暢、直覺', '指到一個動作跟它的結果：點下去之後畫面上要出現什麼'],
  ['乾淨、簡潔、現代', '指到數量或位置：一頁最多幾個區塊、標題放哪裡'],
  ['完整、完善、沒問題', '指到清單：哪幾項全部都要有，缺一項就是沒過'],
  ['不要太、盡量、大概', '換成數字：不超過幾個、至少幾筆、最多幾秒'],
];

export default function DoneWhenChecker() {
  const [text, setText] = useState(SAMPLE);
  const sentences = toSentences(text).map(judge);
  const bad = sentences.filter((s) => s.hits.length > 0);
  const weak = sentences.filter((s) => s.hits.length === 0 && !s.checkable && !s.hasNumber);
  const ok = sentences.filter((s) => s.hits.length === 0 && (s.checkable || s.hasNumber));

  const cleaned = ok.map((s, i) => `${i + 1}. ${s.text}`).join('\n');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 xl:gap-8 items-start">
      <div className="space-y-6">
        <Panel
          title="把你的完成條件貼進來"
          desc="一行一條，或用句號分開。它會逐句看，標出驗不出來的那幾句。"
        >
          <Field label="完成條件">
            <TextArea rows={9} value={text} onChange={(e) => setText(e.target.value)} />
          </Field>
          <Note>
            這是字面比對，不是理解：它只查得到{VAGUE_WORDS.length} 個常見的模糊詞。
            沒被標記不代表寫得夠好，真正的判準只有一個：
            <span className="text-slate-200">它驗完之後，你能不能指著畫面說「這題過了」。</span>
          </Note>
        </Panel>

        <Panel title="這幾種字要換掉" desc="左邊是驗不出來的寫法，右邊是換的方向。">
          <div className="divide-y divide-slate-800">
            {REWRITE_HINTS.map(([from, to]) => (
              <div key={from} className="grid grid-cols-[9rem_1fr] gap-4 py-2.5 text-sm leading-relaxed">
                <span className="text-slate-400">{from}</span>
                <span className="text-slate-300">{to}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="lg:sticky lg:top-24 space-y-6">
        <Panel title={`逐句結果（共 ${sentences.length} 句）`} desc={undefined}>
          <div className="space-y-2.5">
            {sentences.length === 0 && (
              <p className="text-sm text-slate-500">左邊還沒有內容。</p>
            )}
            {sentences.map((s, i) => {
              const tone =
                s.hits.length > 0
                  ? 'border-rose-500/25 bg-rose-500/5'
                  : s.checkable || s.hasNumber
                    ? 'border-emerald-500/25 bg-emerald-500/5'
                    : 'border-slate-800 bg-slate-950';
              const tag =
                s.hits.length > 0 ? '驗不出來' : s.checkable || s.hasNumber ? '可以驗' : '看不出要驗什麼';
              const tagTone =
                s.hits.length > 0
                  ? 'text-rose-300'
                  : s.checkable || s.hasNumber
                    ? 'text-emerald-300'
                    : 'text-slate-500';
              return (
                <div key={i} className={`rounded-xl border px-4 py-3 ${tone}`}>
                  <div className="flex items-baseline gap-2.5 mb-1">
                    <span className={`text-xs font-bold ${tagTone}`}>{tag}</span>
                    {s.hits.length > 0 && (
                      <span className="text-xs text-slate-500">卡在「{s.hits.join('、')}」</span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-200">{s.text}</p>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel
          title="留下來的這幾條可以直接用"
          desc={`${ok.length} 句過關、${bad.length} 句有模糊詞、${weak.length} 句看不出要驗什麼。`}
        >
          <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
            <pre className="font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
              {cleaned || '（還沒有可以直接用的句子）'}
            </pre>
          </div>
          {cleaned && (
            <div className="mt-3">
              <CopyButton text={cleaned} label="複製這幾條" />
            </div>
          )}
          <Note>
            把它貼進 Prompt 組裝器的【什麼叫做完】那一格，四段就湊齊了。
          </Note>
        </Panel>
      </div>
    </div>
  );
}
