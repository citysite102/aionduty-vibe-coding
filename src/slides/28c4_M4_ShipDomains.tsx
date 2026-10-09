import { Compass, CreditCard, UserLock, Scale, Copyright } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 2026-10-10 新增，章節八這一組的最後一頁（99% → OWASP → 這一頁）。
 *
 * 這一頁回答的是講師那句「逐漸累計自己對技術與科技架構的掌握程度」。
 * 前兩頁處理的是這一個專案，這一頁處理的是**換一個領域怎麼辦**，
 * 而它的教學效果來自一件事：**金流那四條裡有三條是這門課已經教過的原則換個場合**。
 *   前端送來的金額不能信  ← 有人繞過你的畫面直接送請求（案例三）
 *   同一筆付款按兩次      ← 兩個人同時搶最後一個名額（同一種 race condition）
 *   你怎麼知道錢收到了    ← 它說做完了，你自己再確認一次
 * 只有「卡號不要進你的系統」是新的。
 *
 * 所以金流那一塊要獨立放上面、而且要把 `from` 那一欄念出來，
 * 它是整頁的證據：學員學的不是計時器，是判斷，而判斷會搬家。
 * **不要為了版面整齊把金流壓成跟其他三個一樣大。**
 *
 * 另外三個領域刻意只給一句，因為這門課沒有資格教它們，
 * 而「先問誰」本身就是這裡唯一要帶走的動作。
 *
 * 這一頁沒有可查證的外部數字，所以沒有 C-1 區塊。
 * 唯一會過期的是金流服務商的名字（Stripe、綠界、藍新），下次改版順手看一眼，
 * 不確定就只留「用第三方金流」，名字拿掉照樣成立。
 *
 * 強調色只有 sky（金流那一塊的 from 標記）。四個領域不要一個一色（A-1）。
 */
const MONEY = [
  {
    ask: '卡號不要進你的系統',
    detail: '一律用第三方金流，你的程式只收它回傳的結果。',
    from: '這一條是新的，四條裡只有它要背',
    isNew: true,
  },
  {
    ask: '金額與數量一律在後端重算',
    detail: '前端送上來的價格不能信。',
    from: '有人繞過你的畫面直接送請求，還擋不擋得住',
  },
  {
    ask: '同一筆付款按兩次會怎樣',
    detail: '兩個請求同時進來，兩邊都看到「還沒付過」。',
    from: '兩個人同時搶最後一個名額',
  },
  {
    ask: '你怎麼知道錢真的收到了',
    detail: '要有一份對得起來的紀錄，不是它說成功就成功。',
    from: '它說做完了，你自己再確認一次',
  },
];

const DOMAINS = [
  {
    icon: UserLock,
    name: '個資與公司資料',
    ask: '先問這些資料能不能離開公司，再問怎麼存。',
    detail:
      '順序反過來的人會先做完才發現不能用。問的時候講成一句話：「我想做的這個東西，會把某某資料放到某某平台上。」不要只問「可不可以用 AI」，他們答不出來。',
  },
  {
    icon: Scale,
    name: '受監管行業',
    ask: '醫療、金融、兒少：先問法遵，不要先做。',
    detail:
      '這幾個行業的規定會直接決定這個東西能不能存在，不是做完再補。先問一通電話，比做完整個重來便宜。',
  },
  {
    icon: Copyright,
    name: '對外公開的內容',
    ask: '素材是不是你的。',
    detail:
      'AI 生成的圖、你抓來的照片、字型的授權，對外公開跟自己看是兩種條件。別人網站上的資料能不能抓、抓了能不能公開展示，也是這一類。',
  },
];

export default function SlideShipDomains() {
  return (
    <SlideLayout
      title="金流、個資、受監管行業、著作權"
      subtitle="When the Domain Changes"
      icon={Compass}
    >
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-8">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          這幾個領域這門課沒有教，但你回去很可能會碰到。每一個只給那一題，
          <strong className="text-slate-100">而多數時候它是你已經學過的原則換一個場合</strong>。
        </AnimatedBlock>

        {/*
          金流放上面、而且比其他三個大，是因為它是這一頁的證據：
          四條裡有三條是學過的東西搬過來。右邊那一欄不要拿掉。
        */}
        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-slate-800">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
              <CreditCard aria-hidden="true" size={16} />
            </span>
            <h3 className="text-base font-bold text-slate-100">金流</h3>
            <span className="text-slate-500 text-sm">四條裡有三條你已經學過，只是當時不是在講錢</span>
          </div>
          <div className="divide-y divide-slate-800/70">
            {MONEY.map((m) => (
              <div
                key={m.ask}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,330px)] gap-x-5 gap-y-1 py-2.5"
              >
                <div>
                  <div className="text-slate-100 text-sm font-bold leading-snug">{m.ask}</div>
                  <p className="text-slate-400 text-sm leading-relaxed mt-0.5">{m.detail}</p>
                </div>
                <p
                  className={`text-sm leading-relaxed md:text-right ${
                    m.isNew ? 'text-slate-500' : 'text-sky-300/80'
                  }`}
                >
                  {m.isNew ? m.from : `← ${m.from}`}
                </p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DOMAINS.map((d, i) => {
            const Icon = d.icon;
            return (
              <AnimatedBlock
                key={d.name}
                stepIndex={i + 3}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <Icon aria-hidden="true" size={16} className="text-slate-500 shrink-0" />
                  <h3 className="text-base font-bold text-slate-100">{d.name}</h3>
                </div>
                <p className="text-slate-200 text-sm font-bold leading-relaxed">{d.ask}</p>
                <p className="text-slate-400 text-sm leading-relaxed mt-2">{d.detail}</p>
              </AnimatedBlock>
            );
          })}
        </div>

        {/*
          收尾是這三頁真正要留下的一句，也是整章「你負責判斷」那條線的終點。
          **不要改成「資安很重要」那種結論**，那是口號，而且前面兩頁已經給過證據了。
        */}
        <Callout tone="focus" label="會搬家的是判斷，不是那個計時器" stepIndex={6}>
          你在計時器上學的「不要信前端送上來的東西」，換到錢上面叫金額要在後端重算，
          換到報表上面叫數字要從原始紀錄算。
          <strong className="text-slate-100">碰到新領域的時候，先找這一題的對應物，再去查它的細節。</strong>
          <span className="block mt-2 text-slate-400">
            這四個領域的那一題都收在講義頁那張〈上線前自查卡〉的最後一段。
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
