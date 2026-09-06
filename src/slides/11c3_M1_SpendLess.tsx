import { Coins, Activity, Gauge } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 從「自己做跟外包，成本與交期差多少」拆出來的後半。
 *
 * 拆的理由是量出來的：那一頁裝了主張、情境分頁、花的錢、花的時間、但書、
 * 收尾與這兩個指令，內容區溢出六百多 px，是全片常態（約 130px）的四倍多。
 * 對預錄課來說，需要捲動的頁面等於錄影時要一邊捲一邊講。
 *
 * 切點選在「對照」與「控制」之間：前一頁回答「這筆錢值不值得」，
 * 這一頁回答「怎麼少花一點」。情境分頁只跟金額有關，所以留在前一頁，
 * 這一頁沒有隨情境變動的內容，不需要再放一次分頁。
 *
 * 收尾那三個浪費要留在最後一格，它是下一頁（要動手的三塊）的鋪陳：
 * 工具、只給需要的資料、把題目切小，三個對得一一對得上。順序不要動。
 */
const LEVERS = [
  {
    icon: Activity,
    tag: '量',
    cmd: '/usage',
    title: '先知道自己實際花多少',
    body: '跑過一次之後打它，看得到這次花了多少、額度什麼時候重置。沒有這個數字，後面調什麼都是憑感覺。',
    note: null,
  },
  {
    icon: Gauge,
    tag: '調',
    cmd: '/effort',
    title: '同一個模型裡，調它每次要想多久',
    body: '想得越久越貴。預設是 high，事情簡單的時候調到 low 或 medium，省下來的是實打實的 token。/model 換的是模型等級，/effort 是在同一個等級裡調深淺，兩個可以分開用。',
    note: '它會記住你設的等級，下次開新對話還是同一個。所以調低之後遇到難題覺得它變笨，先打一次看現在停在哪一級。',
  },
];

export default function SlideSpendLess() {
  return (
    <SlideLayout
      title="怎麼少花一點：兩個指令與三個常見的浪費"
      subtitle="Spending Less"
      icon={Coins}
    >
      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          這筆錢有兩個地方可以壓，順序不要反過來：
          <strong className="text-slate-100">先知道自己實際花多少，再決定要不要調它想多久。</strong>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LEVERS.map((l, i) => {
            const Icon = l.icon;
            return (
              <AnimatedBlock
                key={l.cmd}
                stepIndex={i + 2}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 flex flex-col"
              >
                <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-slate-800">
                  <Icon size={16} className="text-slate-400 shrink-0" />
                  <span className="font-mono text-sm font-bold text-slate-300">【{l.tag}】</span>
                  <code className="font-mono text-sm font-bold text-orange-300 ml-auto">{l.cmd}</code>
                </div>
                <div className="text-slate-100 text-base font-bold leading-snug mb-2">{l.title}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{l.body}</p>
                {l.note && (
                  <p className="text-slate-500 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
                    {l.note}
                  </p>
                )}
              </AnimatedBlock>
            );
          })}
        </div>

        <Callout tone="focus" label="真正省下來的通常不是旋鈕" stepIndex={4}>
          token 最容易被浪費的地方有三個：
          <strong className="text-slate-100">它手上沒有對的工具、你丟了一堆它用不到的資料給它、
          或是一個題目一次交代太大。</strong>
        </Callout>

      </div>
    </SlideLayout>
  );
}
