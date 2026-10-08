import { Layers3 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 2026-10-08 新增（講師要求）：上一頁介紹 OpenMontage 之後，學員一定會拿它跟自己聽過的
 * AI 影片工具比。這一頁回答那個比較，但真正要留下的是「先問它在哪一層」這個讀法。
 *
 * **這張對照表是講師提供的**（2026-10-08），不是我整理的。Kling、Veo、Seedance 與 Magnific
 * 那兩欄沒有再去官網二次查證（magnific.com 擋 WebFetch，回 403）。
 * 這一類產品的方案與功能改得很快（C 章），下次改版前自己開一次那兩個網站對照，
 * 特別是「怎麼付錢」那一列。OpenMontage 那一欄的依據見 25f 的檔頭。
 *
 * 比喻（攝影師／攝影棚／製片）是講師寫的，保留。它跟 D-2 禁的那種裝飾性比喻不同：
 * 三個比喻各自對應表格裡一整欄的差別，刪掉之後讀者要自己把四列讀完才看得出層級，
 * 所以它是在增加理解，不是在修辭。**不要把它改寫成形容詞。**
 *
 * 顏色：三欄裡只有 OpenMontage 那一欄上 sky，因為它是這堂課接得下去的那一層，
 * 另外兩欄維持灰階。三欄各一色會變成 A-1 禁的「項目編號」用法。
 *
 * 收尾那一塊才是可以帶走的東西：三層的差別是「你要坐在那裡多久」。
 * 不要寫成「第三層最好」，那三層各有適用的時候，而且學員多數情況下真的只需要第一層。
 */

const COLS = [
  { name: '影片生成工具', sub: 'Kling、Veo、Seedance', metaphor: '攝影師', accent: false },
  { name: 'Magnific', sub: '生成加後製的操作台', metaphor: '器材齊全的攝影棚', accent: false },
  { name: 'OpenMontage', sub: '接在 Claude Code 上的流程', metaphor: '製片手冊', accent: true },
];

const ROWS = [
  {
    q: '你拿到什麼',
    a: ['一段幾秒的鏡頭', '鏡頭，加上放大、修光、剪接等後製', '一支有腳本、旁白、配樂、字幕的完成片'],
  },
  {
    q: '誰在指揮',
    a: ['你，一個指令生一段', '你，在畫布上自己串流程', 'Agent 執行，你在關卡點頭'],
  },
  {
    q: '在哪裡跑',
    a: ['網頁或 App', '網頁平台', '你的電腦，搭配 Claude Code、Cursor'],
  },
  {
    q: '怎麼付錢',
    a: ['訂閱或點數', '訂閱點數', '工具本身免費，模型的費用各家自付'],
  },
];

export default function SlideToolLayers() {
  return (
    <SlideLayout title="同樣做影片，三種工具差在哪一層" subtitle="Which Layer Is It" icon={Layers3}>
      <div className="max-w-6xl mx-auto space-y-4 pb-8">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            你大概聽過 Kling 或 Veo，也可能用過 Magnific。那它們跟剛才那一套是什麼關係，
            要選哪一個？
            <strong className="text-slate-100">這三個其實不在同一層，彼此不太算直接競爭。</strong>
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2">
            影片生成工具是<strong className="text-slate-200">攝影師</strong>，你說一句它拍一顆鏡頭。
            Magnific 是<strong className="text-slate-200">器材齊全的攝影棚</strong>，生成跟後製都在裡面，但要你自己站在那裡操作。
            OpenMontage 是<strong className="text-slate-200">一本製作團隊的工作手冊</strong>，
            交給你的 AI 工具去當製片。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="grid grid-cols-[6.5rem_1fr_1fr_1fr] gap-x-4 gap-y-0">
            <div />
            {COLS.map((c) => (
              <div
                key={c.name}
                className={`rounded-t-xl px-3 pt-3 pb-2.5 ${c.accent ? 'bg-sky-500/10 border-x border-t border-sky-500/30' : ''}`}
              >
                <p className={`text-base font-bold ${c.accent ? 'text-sky-300' : 'text-slate-100'}`}>{c.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{c.sub}</p>
                <p className="text-slate-400 text-sm mt-1.5">「{c.metaphor}」</p>
              </div>
            ))}

            {ROWS.map((r, ri) => {
              const last = ri === ROWS.length - 1;
              return (
                <div key={r.q} className="contents">
                  <div className="text-slate-400 text-sm font-bold pt-3 border-t border-slate-800">{r.q}</div>
                  {r.a.map((a, i) => (
                    <div
                      key={i}
                      className={`text-sm leading-relaxed pt-3 pb-2 px-3 border-t ${
                        COLS[i].accent
                          ? `bg-sky-500/10 border-sky-500/20 border-x text-slate-200 ${last ? 'border-b rounded-b-xl' : ''}`
                          : 'border-slate-800 text-slate-400'
                      }`}
                    >
                      {a}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-2">看到一個新的 AI 工具，先問它在哪一層</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              第一層生一個素材，第二層給你一個操作台，第三層給 Agent 一套走完的流程。
              三層的差別不是誰比較強，是
              <strong className="text-slate-200">你要坐在那裡多久</strong>：
              第一層每一段都要你再下一次指令，第二層流程是你自己串的，
              第三層是你把規則定好之後它自己跑，你只在關卡點頭。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-2">不是越上層越該用</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              只要一顆鏡頭，開網頁打一句話最快，架一條流程反而是繞路。
              第三層划算的時機只有一個：
              <strong className="text-slate-200">同一件事你要做很多次，而且每次的步驟一樣</strong>。
              你那份每個月都要交的東西符合，臨時要一張圖不符合。
            </p>
          </div>
        </AnimatedBlock>

        <Callout tone="muted" label="這張表會過期" stepIndex={4}>
          這三家的功能與收費都改得很快，你看到的時候可能已經不是這樣了。
          會過期的是格子裡的字，不會過期的是左邊那四個問題：拿到什麼、誰在指揮、在哪裡跑、怎麼付錢。
          下次評估任何一個新工具，把這四題問一遍就夠了。
        </Callout>

      </div>
    </SlideLayout>
  );
}
