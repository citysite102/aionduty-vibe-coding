import { ShieldAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const CAUSES = [
  {
    tag: '沒讀到',
    title: '規則根本沒被載入',
    desc: '規則寫在子目錄的 CLAUDE.md，這一輪沒動到那一區，它就不會載進來。',
  },
  {
    tag: '被埋掉',
    title: '檔案太長，排在後面的被蓋過',
    desc: '規則一多，後面那幾條就容易被當成背景。官方建議一份不要超過約 200 行。',
  },
  {
    tag: '判不動',
    title: '規則沒有可檢查的標準',
    desc: '「程式碼要優雅」「注意效能」，它無法判斷自己做到了沒，只能猜。',
  },
  {
    tag: '打架',
    title: '兩條規則互相衝突',
    desc: '「註解一律寫中文」跟「不要留廢話註解」同時在，照哪一條都算違規。',
  },
  {
    tag: '被蓋掉',
    title: '你自己在對話中覆蓋了它',
    desc: '你說過「這次先不管樣式」，那句話出現得比手冊晚，它會照最近聽到的走。',
  },
];

const DIAGNOSIS = [
  { step: '1. 跑 /context', desc: '那份手冊在載入清單裡嗎？不在，就是位置的問題。' },
  { step: '2. 問它依據哪一條', desc: '「你剛才那個決定，是依據 CLAUDE.md 的哪一條？」' },
  { step: '3. 它答不出來', desc: '規則無法判定，改寫成可以檢查的句子。' },
  { step: '4. 答得出來卻做錯', desc: '多半是被埋掉或規則打架，該做健檢了。' },
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
