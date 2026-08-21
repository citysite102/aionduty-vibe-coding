import { Palette } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CaseShot } from '../components/CaseShot';
import vesselHero from '../../assets/cases/case-01-vessel-hero.jpg';
import vesselProcess from '../../assets/cases/case-01-vessel-process.jpg';

/**
 * 三個完整案例的第一頁。案例一與案例三是同一個品牌的兩半（首頁與預約），
 * 那個關係寫在案例三那一頁，不在這裡重複。
 *
 * 這一頁不要寫「把兩版並排看」：第一版沒有留存，畫面上放不出來。
 * AI 感那一塊改成一份指得出來的清單，講者對著成品講，不需要對照組。
 */
const ROUTE = [
  { label: '起點', text: '桌面上一個空資料夾，裡面只有你自己寫的規格' },
  { label: '過程', text: '從參考圖談出視覺規則，寫成設計規範與一份集中的顏色尺寸設定，再加上一個會擋下違規改動的自動檢查' },
  { label: '產出', text: '一個公開網址上的一頁式品牌網站，以及一份機器檢查得了的設計規範' },
];

/** 第一版真的做出來的東西。並排看得出來的差別就是這幾項，全部是灰階，沒有哪一項比較重要 */
const AI_FEEL = [
  '(01) 到 (05) 分節編號',
  '只是好看的英文字',
  '兩條跑馬燈',
  '膠囊按鈕加圓形箭頭',
  '三欄大數字',
  '大圓角卡片',
  '自訂游標',
  '頂部進度條',
  '橫向輪播',
  '每一段開頭的英文小標',
  '全站大寫加寬字距',
];

export default function SlideCase1Vessel() {
  return (
    <SlideLayout title="案例一：器 VESSEL" subtitle="Case 01 · 一頁式品牌網站" icon={Palette}>
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          <div className="md:col-span-3">
            <CaseShot
              src={vesselHero}
              alt="器 VESSEL 首頁：沾滿泥漿的雙手在轆轤上拉起坯體，左下角是大字標題「土的沉默，火的回答」，右下角是橘色的 1280°C"
              url="https://case-01-vessel.samioo.chatgpt.site/"
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-5 py-4">
              <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
                這個案例要回答的問題
              </div>
              <p className="text-slate-100 text-base font-bold leading-relaxed">
                我要怎麼把「我想要這樣」，變成 AI 每次都照著做的規則？
              </p>
            </div>

            <dl className="space-y-3">
              {ROUTE.map((r) => (
                <div key={r.label} className="flex gap-3">
                  <dt className="w-10 shrink-0 font-mono text-xs uppercase tracking-widest text-slate-500 pt-1">
                    {r.label}
                  </dt>
                  <dd className="text-slate-300 text-sm leading-relaxed">{r.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-2">第一件事：把「AI 感」指出來</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            第一版做出來是一個很乾淨、但每個網站都有的樣子。畫面上指得出來的是這十一項，後來一項一項刪掉。
          </p>
          <ul className="flex flex-wrap gap-2 mb-4">
            {AI_FEEL.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-400"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="text-slate-400 text-sm leading-relaxed">
            單獨看沒有一項難看，問題是每一個網站都有。
            <strong className="text-slate-200">刪完之後剩下的，才是只有這家工作室講得出來的東西。</strong>
            你自己第一版做出來的東西，也拿這張清單掃一遍。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <img
            src={vesselProcess}
            alt="製程那一段的畫面：大標題「從一塊土到一只器，四十一天。」底下是練土、成形、修坯、施釉，每一列只有編號、名稱與一句說明，往下還有第五列燒成"
            className="md:col-span-3 w-full rounded-2xl border border-slate-800"
          />
          <div className="md:col-span-2">
            <h3 className="text-base font-bold text-slate-100 mb-2">刪完之後，剩下的長這樣</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              製程這一段沒有卡片、沒有圖示、沒有裝飾用的英文，只有一張表。
              <strong className="text-slate-100">
                四十一天、五個步驟，每一步寫的都是只有這家工作室說得出來的事實
              </strong>
              ：菊練法翻折兩百次、比例在拉坯的三分鐘裡決定、釉層厚薄的差異會在窯裡被放大十倍。
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              這些句子換成咖啡店就不成立。
            </p>
          </div>
        </AnimatedBlock>

        <Callout tone="muted" label="做完手上會有什麼" stepIndex={4}>
          一個放得進作品集、給得了客戶看的成品。要真的對外掛上去，還差三件事：照片改成自己拍並且自己託管、
          字體改成自己託管、補上頁面標題描述與分享縮圖。
          <span className="text-slate-300">這個案例不做這三件</span>，因為它們跟這裡要教的東西無關。
        </Callout>

      </div>
    </SlideLayout>
  );
}
