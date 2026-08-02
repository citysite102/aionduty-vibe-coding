import { ShieldAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const CAUSES = [
  {
    tag: '沒讀到',
    title: '規則根本沒被載入',
    desc: '規則寫在子目錄的 CLAUDE.md，這一輪沒動到那一區，它就不會載進來。',
  },
  {
    tag: '份量不足',
    title: '檔案太長，那條規則排在後面',
    desc: '排在最後面的規則，被遵守的機率明顯低於排在最前面的。一般建議一份控制在 200 行以內。',
  },
  {
    tag: '無法判定',
    title: '規則沒有可以檢查的標準',
    desc: '「程式碼要優雅」沒有客觀判準，它無法確認自己有沒有做到。',
  },
  {
    tag: '互相矛盾',
    title: '兩條規則同時滿足不了',
    desc: '「一頁最多兩種強調色」跟「錯誤用紅、正解用綠、警告用琥珀」，遇到三種情境就一定違反其中一條。',
  },
  {
    tag: '被覆蓋',
    title: '你在對話裡推翻了它',
    desc: '你說過「這次先不管樣式」，那句話比手冊晚出現，它會照最近的指令走。',
  },
];

const DIAGNOSIS = [
  { step: '1. 跑 /context', desc: '那份手冊在載入清單裡嗎？不在，就是位置的問題。' },
  { step: '2. 問它依據哪一條', desc: '「你剛才那個決定，是依據 CLAUDE.md 的哪一條？」' },
  { step: '3. 它答不出來', desc: '規則無法判定，改寫成可以檢查的句子。' },
  { step: '4. 答得出來卻做錯', desc: '多半是被埋在後面，或兩條規則互相矛盾。' },
];

export default function SlideM2RuleFailure() {
  return (
    <SlideLayout title="規則明明寫了，它卻沒照做" subtitle="Why Rules Fail" icon={ShieldAlert}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-5 max-w-6xl mx-auto items-start pb-4">

        <div className="flex flex-col gap-2">
          {CAUSES.map((c, i) => (
            <AnimatedBlock
              key={c.tag}
              stepIndex={i + 1}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 flex gap-4 items-baseline shadow-md"
            >
              <div className="w-16 shrink-0 text-sky-400 font-bold text-sm">{c.tag}</div>
              <div>
                <div className="text-slate-200 text-sm font-bold">{c.title}</div>
                <div className="text-slate-500 text-xs leading-relaxed mt-0.5">{c.desc}</div>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={6} className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
          <h3 className="text-sm font-bold text-slate-100 mb-3 border-b border-slate-800 pb-2">先診斷，再動手</h3>
          <ol className="space-y-2.5">
            {DIAGNOSIS.map((d) => (
              <li key={d.step}>
                <div className="text-slate-200 text-xs font-bold">{d.step}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{d.desc}</div>
              </li>
            ))}
          </ol>
          <p className="text-amber-300/90 text-xs leading-relaxed mt-3 pt-3 border-t border-slate-800">
            這五種的處理方式不一樣。跳過診斷直接再加一條規則，檔案只會更肥，原本的問題還在。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
