import { AlertOctagon, Terminal, Globe, MessageSquare } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const CASES = [
  {
    icon: Terminal,
    where: 'Claude Code 執行指令時的紅字',
    when: '終端機或桌面版都一樣，還沒跑起來就出事',
    accent: 'text-amber-400 bg-amber-500/10',
    log: [
      { text: '$ npm run dev', tone: 'text-slate-500' },
      { text: 'sh: vite: command not found', tone: 'text-red-400 font-bold' }
    ],
    reads: [
      { k: '在哪裡', v: '畫面根本還沒出現，是專案本身啟動失敗。' },
      { k: '什麼事', v: '找不到 vite 這個工具。' },
      { k: '怎麼做', v: '多半是套件還沒裝。把整段貼回去說：「請幫我把套件裝好，再跑一次。」' }
    ]
  },
  {
    icon: Globe,
    where: '瀏覽器 Console 的紅字',
    when: '跑起來了，但畫面壞掉',
    accent: 'text-sky-400 bg-sky-500/10',
    log: [
      { text: 'Uncaught TypeError: Cannot read', tone: 'text-red-400 font-bold' },
      { text: "properties of undefined (reading 'name')", tone: 'text-red-400 font-bold' },
      { text: '    at PlanetCard (Planet.tsx:24)', tone: 'text-slate-500' }
    ],
    reads: [
      { k: '在哪裡', v: 'Planet.tsx 這個檔案的第 24 行。' },
      { k: '什麼事', v: '程式想拿一個叫 name 的東西，但它手上是空的。' },
      { k: '怎麼做', v: '常見原因是資料還沒回來就先畫。整段貼回去請它修。' }
    ]
  }
];

const ASKS = [
  '「用白話解釋這個錯誤在說什麼，我不看程式碼。」',
  '「請只改必要的地方修好它，並告訴我你改了什麼。」',
  '「這次為什麼會發生？下次我要怎麼避免？」'
];

export default function SlideReadErrors() {
  return (
    <SlideLayout
      title="紅字在跟你說三件事"
      subtitle="Reading Error Messages Without Reading Code"
      icon={AlertOctagon}
    >
      <div className="max-w-6xl mx-auto mt-3 text-left space-y-5 pb-6">

        <AnimatedBlock stepIndex={1} className="bg-slate-900/60 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-slate-300 text-base leading-relaxed">
            紅字看起來很嚇人，但你不用看懂每一個字。先看三件事：
            <strong className="text-slate-100">在哪裡出事、出了什麼事、接下來該做什麼。</strong>
            剩下的整段複製，貼給 AI。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        <div className="space-y-5">
        {CASES.map((c, idx) => {
          const Icon = c.icon;
          return (
            <AnimatedBlock
              key={c.where}
              stepIndex={idx + 2}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                <div className={`p-2.5 rounded-xl ${c.accent}`}>
                  <Icon size={18} />
                </div>
                <h4 className="text-base font-bold text-slate-100">{c.where}</h4>
                <span className="text-sm text-slate-500">{c.when}</span>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                  {c.log.map((line) => (
                    <div key={line.text} className={`${line.tone} whitespace-pre`}>{line.text}</div>
                  ))}
                </div>

                <div className="space-y-2">
                  {c.reads.map((r) => (
                    <div key={r.k} className="flex gap-3 text-sm leading-relaxed">
                      <span className="text-slate-500 shrink-0 w-14">{r.k}</span>
                      <span className="text-slate-300">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedBlock>
          );
        })}
        </div>

        <div className="space-y-5">
        {/*
          原本「畫面一片空白，終端機又沒報錯」是獨立的一頁，但它跟這一頁的第二個案例
          講的是同一件事：紅字在瀏覽器裡，不在終端機。合併成這一塊，
          保留那一頁真正多出來的兩個操作：截圖直接貼，以及 Console 怎麼打開。
        */}
        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h4 className="text-base font-bold text-slate-100 mb-1.5">畫面壞了，可是哪裡都找不到紅字</h4>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            計時器昨天還好好的，今天打開只剩一片黑，按「發射」也沒反應，終端機卻什麼都沒說。這時候有兩招。
          </p>

          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <div className="text-sm font-bold text-slate-200 mb-2">一、直接給它看</div>
              <p className="text-sm text-slate-400 leading-relaxed mb-2.5">
                別花力氣描述「星球不見了、按鈕點了沒反應」，截圖貼給它。
              </p>
              <p className="text-sm text-emerald-300 leading-relaxed">
                「這是我現在看到的畫面，星球本來應該在下面，請幫我修正。」
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <div className="text-sm font-bold text-slate-200 mb-2">二、自己去撈那段紅字</div>
              <div className="text-sm text-slate-400 leading-relaxed space-y-1">
                <div>
                  1. 按 <code className="font-mono text-slate-200">F12</code>
                  （Mac 按 <code className="font-mono text-slate-200">Cmd + Opt + I</code>）
                </div>
                <div>2. 點最上面的 Console 分頁</div>
                <div>3. 看到紅字，整段複製貼回對話框</div>
              </div>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="bg-slate-950 border border-slate-800 rounded-3xl p-6">
          <h4 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-emerald-400" />
            順便讓它教你：三句可以直接照抄
          </h4>
          <div className="space-y-2.5">
            {ASKS.map((q, i) => (
              <div key={q} className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 flex gap-3">
                <span className="text-xs font-mono text-slate-500 shrink-0 mt-1">{i + 1}</span>
                <p className="text-sm text-emerald-300 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mt-4">
            不要只說「有錯誤，幫我修」。<strong className="text-slate-200">紅字整段貼上</strong>，它才知道你在講哪一個。

          </p>
        </AnimatedBlock>
        </div>
        </div>

      </div>
    </SlideLayout>
  );
}
