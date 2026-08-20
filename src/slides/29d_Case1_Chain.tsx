import { ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 案例一真正要留下來的東西是這條線的順序，不是那個網站。
 * 只有「自動檢查」那一格標 sky：整條線的分水嶺在那裡，前面都是請它照做，
 * 從那一格開始才是擋得住。其餘六格灰階（A-1：平等的項目不要一項一色）。
 */
const CHAIN = [
  { name: '你自己寫的規格', why: '沒有規格就先看參考圖，你會照抄整張圖，包含你其實不想要的部分' },
  { name: '視覺規則', why: '規則沒談定就先寫進手冊，寫出來的會是「要有質感」這種沒有作用的句子' },
  { name: '設計規範，加上一份集中的顏色與尺寸設定', why: '顏色沒有集中管理就先做畫面，色碼會散落在十幾個檔案裡，之後改配色改不乾淨' },
  { name: '第一個畫面', why: '沒有先做一個畫面出來，你不知道要檢查什麼，檢查規則會變成憑空想像' },
  {
    name: '自動檢查',
    why: '規則在這裡從「請你這樣做」變成「會被檢查」',
    key: true,
  },
  { name: '其餘區塊', why: '檢查先裝好，後面每一個區塊才是在保護下做出來的' },
  { name: '體檢、審查、上線', why: '沒做完就體檢，會一直重複檢查同樣的問題' },
];

const USES = [
  { from: '真實素材', to: '網站上的內容、數字與專有名詞' },
  { from: '不做什麼', to: '設計規範裡的禁用清單' },
  { from: '驗收條件', to: '自動檢查腳本的規則' },
  { from: '沒有的素材', to: '哪一段要留白的依據' },
];

const JUDGEMENTS = [
  { q: '參考圖裡哪些是這個設計的本質，哪些只是流行公式', by: '拿掉它之後，還像不像這個風格' },
  { q: '這個區塊該不該存在', by: '換一個產業還完全成立嗎' },
  { q: '這條規則寫得夠不夠具體', by: '能不能被機器檢查，或者被人眼一秒判斷' },
  { q: '這張照片該不該放', by: '一秒內認得出這是什麼行業嗎' },
  { q: 'AI 的這條建議該不該收', by: '它跟你的設計規範衝不衝突' },
];

export default function SlideCase1Chain() {
  return (
    <SlideLayout
      title="規則要能被機器檢查，才擋得住"
      subtitle="Case 01 · 從規格到自動檢查"
      icon={ShieldCheck}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-4">手冊分成十二步，做起來就是這一條線</h3>
          <ol className="space-y-2">
            {CHAIN.map((c, i) => (
              <li
                key={c.name}
                className={`flex gap-4 rounded-xl border px-4 py-3 ${
                  c.key ? 'border-sky-500/30 bg-sky-500/5' : 'border-slate-800 bg-slate-950'
                }`}
              >
                <span className="font-mono text-sm text-slate-600 pt-0.5">{i + 1}</span>
                <div className="min-w-0">
                  <div className={`text-sm font-bold ${c.key ? 'text-sky-200' : 'text-slate-100'}`}>
                    {c.name}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mt-0.5">{c.why}</p>
                </div>
              </li>
            ))}
          </ol>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">你寫的那份規格，在這條線上被拆開來用</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            寫在
            <code className="font-mono text-orange-300"> CLAUDE.md </code>
            裡的禁用清單，每開一次新對話它都會先讀一次。驗收條件那一塊寫得夠具體，才翻得成檢查規則。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {USES.map((u) => (
              <div key={u.from} className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="text-slate-500 text-sm">{u.from}</div>
                <div className="text-slate-200 text-sm leading-relaxed mt-0.5">{u.to}</div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">技術操作它會幫你做，這五個判斷它幫不了你</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            因為它們要的是你對這個品牌與這批內容的理解。
          </p>
          <ul className="space-y-2">
            {JUDGEMENTS.map((j, i) => (
              <li key={j.q} className="flex gap-4 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                <span className="font-mono text-sm text-slate-600 pt-0.5">{i + 1}</span>
                <div className="min-w-0">
                  <div className="text-slate-100 text-sm font-bold">{j.q}</div>
                  <p className="text-slate-400 text-sm leading-relaxed mt-0.5">判斷依據：{j.by}</p>
                </div>
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <Callout tone="focus" label="換成你自己的專案時，先做哪一段" stepIndex={4}>
          第 1 到第 3 步就夠開工了：把規格寫出來、談出視覺規則、寫成設計規範。
          <strong className="text-slate-100">第 5 步的自動檢查不要省</strong>，但可以等到你發現自己一直在提醒它同一件事的時候再回頭裝。
        </Callout>

      </div>
    </SlideLayout>
  );
}
