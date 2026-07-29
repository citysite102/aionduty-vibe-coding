import { Presentation, FileText, ClipboardCheck, ShieldAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const steps = [
  {
    icon: FileText,
    title: '先把規矩寫下來',
    body: '專案根目錄放一份 CLAUDE.md，寫的是畫布尺寸、配色、字體，還有一份「不要做什麼」的動態負面清單。每次開 Claude Code，它第一件事就是讀這份。',
    note: '就是你剛剛看到的分層裡，中間那一層。',
  },
  {
    icon: ClipboardCheck,
    title: '讓它先把全部讀過一遍',
    body: '請它逐頁審完整份簡報，把事實錯誤、用詞問題、結構重複整理成一份 審稿報告.md。然後照著報告一項一項修，改完一項劃掉一項。',
    note: '它讀完要幾分鐘，我讀完要一個下午。',
  },
  {
    icon: ShieldAlert,
    title: '最容易犯的錯，交給機器擋',
    body: '例如我不想在中文裡看到破折號。與其每次提醒它，不如寫一個 hook：只要它想把破折號寫進檔案，就會被直接擋下來。',
    note: '規矩靠人記會忘，靠程式擋不會。',
  },
];

const reasons = [
  {
    num: '1',
    title: '一句話改 86 頁',
    body: '「把所有頁面的強調色收斂成一種」是一次指令，不是 86 次手動操作。統一譯名、改版式、換用詞，都是同一回事。',
  },
  {
    num: '2',
    title: '規範寫下來才守得住',
    body: '一個人做 86 頁，做到一半一定會走鐘。規矩寫在 CLAUDE.md 裡，它每次進來都從同一個起點，不會因為我今天心情不同就變樣。',
  },
  {
    num: '3',
    title: '我只負責挑錯',
    body: '我不動手排版。我看畫面、指出哪裡怪，剩下的它做。這就是這堂課從第一頁講到現在的那件事。',
  },
];

export default function SlideThisDeck() {
  return (
    <SlideLayout title="這份簡報就是這樣做出來的" subtitle="How This Deck Was Built" icon={Presentation}>
      <div className="max-w-6xl mx-auto space-y-4">

        <AnimatedBlock stepIndex={1} className="bg-sky-950/20 border border-sky-900/40 rounded-xl px-5 py-4">
          <p className="text-slate-200 text-base leading-relaxed">
            你現在看到的這 86 頁，<strong className="text-sky-300">沒有用簡報軟體</strong>。
            它是一個網頁專案，從第一頁到最後一頁，都是在終端機裡跟 Claude Code 一頁一頁改出來的。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 items-start">

          <AnimatedBlock stepIndex={2} className="space-y-3">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] font-mono">怎麼進行的</h3>
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4">
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <Icon size={16} className="text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-slate-100 font-bold text-base mb-1">{s.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
                    <p className="text-slate-600 text-xs mt-1.5">{s.note}</p>
                  </div>
                </div>
              );
            })}

            <div className="bg-black/50 border border-slate-800 rounded-xl p-4 font-mono text-[11px] leading-relaxed">
              <div className="text-slate-600 mb-2"># .claude/settings.json　擋破折號的 hook（簡化版）</div>
              <div className="text-slate-400">&quot;PreToolUse&quot;: [{'{'}</div>
              <div className="text-slate-400 pl-3">&quot;matcher&quot;: &quot;Write|Edit&quot;,</div>
              <div className="text-slate-400 pl-3">&quot;hooks&quot;: [{'{'} &quot;command&quot;: <span className="text-sky-400">&quot;內容含破折號就回傳 deny&quot;</span> {'}'}]</div>
              <div className="text-slate-400">{'}'}]</div>
              <div className="text-slate-500 mt-2.5">它想寫進去 → 被擋 → 自己換成逗號或括號重寫。我不用在場。</div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="space-y-3">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] font-mono">為什麼不用簡報軟體</h3>
            {reasons.map(r => (
              <div key={r.num} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <h4 className="text-slate-100 font-bold text-base mb-1.5 flex items-center gap-2.5">
                  <span className="text-sky-400 font-mono text-sm">{r.num}</span>
                  {r.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </AnimatedBlock>

        </div>

        <AnimatedBlock stepIndex={4} className="border-t border-slate-800 pt-4 text-center">
          <p className="text-slate-400 text-sm leading-relaxed">
            你今天要做的計時器，跟我做這份簡報，是同一套流程。
            <strong className="text-slate-200">規矩寫下來、讓它先讀、把守則交給機器擋，然後你只負責看結果。</strong>
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
