import { ShieldQuestion } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { JudgementTable } from '../components/JudgementTable';

/**
 * 案例四的收尾，也是四個案例那條線的最後一塊。另外三塊在〈器 VESSEL 的十二步〉的下半、
 * 〈這件事該交給誰做〉與〈這件事可以相信誰〉。四頁的開頭互相引用，改一頁要改四頁。
 *
 * 2026-10-23 新增。資料來源 case-04-wishes.pdf 的〈八個判斷〉，八條照手冊原序。
 * 同一輪把〈這件事可以相信誰〉那一頁的「三個案例、十六條」收尾搬到這裡，
 * 因為收尾只能有一個，而案例四現在是最後一個案例。
 *
 * 第 1 條標 sky：它在階段 2 建立，之後每一個階段各用一次，也是這個案例的核心判斷。
 * 階段編號只標關鍵的那幾個，理由同案例二、案例三那兩頁。
 *
 * 2026-10-23 八條全部改寫過一輪：原本照手冊的用語抄（雜訊底線、常數、RLS 管列不管欄、
 * service_role、事件操作引擎），那些字對不寫程式的人等於空白。現在每一條的代價都寫成
 * 畫面上或資料上看得到的後果，判斷依據寫成一個當場答得出有或沒有的問題。
 */
const JUDGEMENTS = [
  {
    q: '畫面怪怪的時候，先量一次還是直接改',
    group: '畫面與素材',
    by: '先用沒改過的版本截兩張圖互相比，確認它是 0%；第一個修法沒效，就要它回頭量數字，不要讓它再猜一次',
    cost: '海一直加大，畫面下緣那塊空白還在，因為真正的原因是鏡頭把前景切掉了',
    key: true,
    keyNote: '每個階段各用一次',
  },
  {
    q: '柱子、木樁的位置，要不要用屋頂、碼頭板的數字去算',
    by: '兩邊的位置是不是同一個數字算出來的，改一邊另一邊會不會跟著動',
    cost: '柱子頂端和屋頂留著空隙、木樁站在板子外面，一處接一處，出現了四次',
  },
  {
    q: '換一套框架時，3D 那一邊要不要跟著重寫',
    by: '搬完之後畫面是不是一模一樣；介面能不能只靠幾個固定的呼叫去指揮 3D 那一邊',
    cost: '把已經驗過的水面、浮力與燈光打掉重做一次',
  },
  {
    q: '這首曲子能不能放進公開的網站與教材',
    by: '它是誰的錄音；AI 生成的話，那個工具的條款允不允許公開使用',
    cost: '網站一上線，就是在散布一首你沒有權利散布的錄音',
  },
  {
    q: '「要登入才按得下去」算不算擋住了',
    group: '登入與資料',
    by: '有人不開網頁、直接送一個請求過來，伺服器擋不擋得住',
    cost: '繪馬與祈願誰都寫得進去，而畫面上完全看不出來',
  },
  {
    q: '「誰掛了哪一塊」要不要放進公開的那張表',
    by: '資料庫的規則擋得住「哪幾筆看得到」，擋不住「同一筆裡的哪一欄」',
    cost: '別人從公開的繪馬牆就反查得出，這幾塊是同一個人掛的',
  },
  {
    q: '前端放哪一把金鑰，API 用誰的身分查資料庫',
    by: '這把金鑰受不受資料庫規則的限制',
    cost: '管理用的那一把外流，所有權限等於沒有；API 用它查，程式一個條件寫錯就回傳所有人的資料',
  },
  {
    q: '錯誤訊息叫你把權限開給沒登入的人，要不要照做',
    by: '這個「拒絕」是不是本來就該發生',
    cost: '照抄那一行，沒登入的人就讀得到所有人的祈願紀錄',
  },
];

const LINE = [
  { k: '案例一問的是', v: '這個東西該不該存在' },
  { k: '案例二問的是', v: '這件事該交給誰做' },
  { k: '案例三問的是', v: '這件事可以相信誰' },
];

export default function SlideCase4Judgements() {
  return (
    <SlideLayout
      title="改完拿什麼證明沒壞：案例四的八個判斷"
      subtitle="Case 04 · AI 幫不了你的那幾個決定"
      icon={ShieldQuestion}
    >
      <div className="max-w-6xl mx-auto space-y-3 pb-2">

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {LINE.map((c) => (
            <div key={c.k} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">{c.k}</div>
              <p className="text-slate-300 text-base leading-relaxed">{c.v}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4">
            <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
              這個案例問的是
            </div>
            <p className="text-slate-100 text-base font-bold leading-relaxed">改完拿什麼證明沒壞</p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <JudgementTable items={JUDGEMENTS} />
        </AnimatedBlock>

        <Callout tone="focus" label="二十四條裡，沒有一條在問語法" stepIndex={3}>
          每一條都有一個共通點：
          <strong className="text-slate-100">它們問的都是你對這件事的理解，不是語法怎麼寫。</strong>
          語法那一半 AI 已經做得比你好，所以你剩下的工作就是這二十四條這種題目。
        </Callout>

      </div>
    </SlideLayout>
  );
}
