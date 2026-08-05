import { useState } from 'react';
import { TrendingUp, Clock, Hourglass, Coins, Info } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

type CaseKey = 'script' | 'webapp' | 'bug';

/**
 * token 費用不是憑印象填的，是用公告單價乘估計用量算出來的。
 *
 * 單價：Claude Opus 5，輸入 $5、輸出 $25 / 百萬 token，快取讀取約輸入的十分之一。
 * 這三個是官方公告的數字，學員查得到，所以頁面上要寫出來。
 * 用量（basis 那一欄）是估的，所以頁面上要標明它是估的，並告訴學員怎麼查自己的真實數字。
 *
 * 匯率抓 1 美元兌 32 元。改單價或改匯率的時候，三筆都要一起重算。
 */
const PRICE_NOTE = '輸入 $5、輸出 $25 / 百萬 token';

type CaseSpec = {
  key: CaseKey;
  name: string;
  desc: string;
  /** 外包報價（新台幣） */
  quote: string;
  /** 外包交期，日曆時間 */
  leadTime: string;
  /** 你自己做的 token 花費，由 basis 的用量乘上公告單價算出 */
  tokenCost: string;
  /** 上面那個金額是怎麼算的 */
  basis: string;
  /** 你自己要投入的工時 */
  yourHours: string;
  /** 你自己做的交期 */
  yourLeadTime: string;
};

const CASES: CaseSpec[] = [
  {
    key: 'script',
    name: '自動化小腳本',
    desc: '定時抓取網站資料，整理成 Excel 寄出。',
    quote: '1 萬',
    leadTime: '5 天',
    tokenCost: '70 元',
    basis: '抓一小時的來回：輸出約 6 萬 token，加上讀專案的輸入',
    yourHours: '1 小時',
    yourLeadTime: '當天',
  },
  {
    key: 'webapp',
    name: '內部管理工具',
    desc: '有前台畫面、後端 API 與資料儲存的訂單管理系統。',
    quote: '7.5 萬',
    leadTime: '3 週',
    tokenCost: '450 元',
    basis: '抓五小時的來回：輸出約 40 萬 token，加上反覆讀專案的輸入',
    yourHours: '5 小時',
    yourLeadTime: '當天',
  },
  {
    key: 'bug',
    name: '修一個環境問題',
    desc: '套件版本衝突，專案跑不起來。',
    quote: '8 千',
    leadTime: '2 天',
    tokenCost: '30 元',
    basis: '抓半小時的來回：輸出約 2.5 萬 token，加上讀錯誤訊息與設定檔的輸入',
    yourHours: '半小時',
    yourLeadTime: '當天',
  },
];

export default function SlideROI() {
  const [active, setActive] = useState<CaseKey>('webapp');
  const c = CASES.find(x => x.key === active) ?? CASES[1];

  return (
    <SlideLayout title="為什麼你該花錢買 AI 算力？" subtitle="Cost & Lead Time" icon={TrendingUp}>
      <div className="flex flex-col gap-4 max-w-6xl mx-auto w-full pb-2 text-left">

        {/* 主張 */}
        <AnimatedBlock stepIndex={1} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-slate-100 text-lg leading-relaxed font-bold">
            花這筆錢，換到的是把「驗證一個點子行不行」從三週壓到當天。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            外包最貴的往往不是報價，而是你得先寫需求、等排程、來回改，然後才知道這個點子行不行。
          </p>
        </AnimatedBlock>

        {/* 情境切換 */}
        <AnimatedBlock stepIndex={2} className="flex flex-wrap gap-2">
          {CASES.map(item => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
                active === item.key
                  ? 'bg-sky-500/10 border-sky-500/40 text-sky-300'
                  : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
              }`}
            >
              {item.name}
            </button>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <p className="text-slate-400 text-sm">{c.desc}</p>
        </AnimatedBlock>

        {/* 錢 */}
        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <Coins size={18} className="text-slate-400" />
            <h3 className="text-base font-bold text-slate-200">花的錢</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <div className="text-slate-500 text-xs font-bold mb-2">找人外包</div>
              <div className="text-slate-300 text-3xl font-bold font-mono">{c.quote}</div>
            </div>
            <div className="bg-slate-950 border border-emerald-900/40 rounded-xl p-5">
              <div className="text-emerald-400 text-xs font-bold mb-2">自己指揮 AI 做（token 費用）</div>
              <div className="text-emerald-300 text-3xl font-bold font-mono">{c.tokenCost}</div>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed">{c.basis}</p>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-3 leading-relaxed">
            單價是公告的：<strong className="text-slate-400">{PRICE_NOTE}</strong>，快取讀取約輸入的十分之一，匯率抓 32。
            用量是估的，你自己跑一次之後打 <code className="font-mono text-orange-300">/usage</code> 就看得到真實數字。
          </p>
        </AnimatedBlock>

        {/* 時間：兩件不同的事，並排不相減 */}
        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2 pb-3 border-b border-slate-800">
            <Clock size={18} className="text-slate-400" />
            <h3 className="text-base font-bold text-slate-200">花的時間</h3>
            <span className="text-slate-500 text-xs ml-1">這是兩件不同的事，不要放在一起相減</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold mb-3">
                <Hourglass size={13} /> 交期：從開口到拿到東西
              </div>
              <div className="flex items-baseline gap-3">
                <div>
                  <div className="text-slate-500 text-[11px] mb-0.5">外包</div>
                  <div className="text-slate-300 text-2xl font-bold font-mono">{c.leadTime}</div>
                </div>
                <div className="text-slate-700 text-xl">vs</div>
                <div>
                  <div className="text-emerald-400/70 text-[11px] mb-0.5">你自己做</div>
                  <div className="text-emerald-300 text-2xl font-bold font-mono">{c.yourLeadTime}</div>
                </div>
              </div>
              <p className="text-slate-500 text-[11px] mt-3 leading-relaxed">
                這一格才是真正的差別。外包那幾天大多在等，不是在做。
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold mb-3">
                <Clock size={13} /> 你的工時：實際坐在電腦前的時間
              </div>
              <div className="flex items-baseline gap-3">
                <div>
                  <div className="text-slate-500 text-[11px] mb-0.5">外包（寫需求、驗收、來回）</div>
                  <div className="text-slate-300 text-2xl font-bold font-mono">數小時</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-amber-400/80 text-[11px] mb-0.5">你自己做</div>
                <div className="text-amber-300 text-2xl font-bold font-mono">{c.yourHours}</div>
              </div>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                自己做並沒有讓你的時間變成零，只是換成花在你自己的東西上。
              </p>
            </div>
          </div>
        </AnimatedBlock>

        {/* 但書 */}
        <AnimatedBlock stepIndex={5} className="bg-amber-500/5 border border-amber-500/25 rounded-2xl px-5 py-4 flex gap-3 items-start">
          <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <p className="text-slate-200 text-base leading-relaxed">
              <strong className="text-amber-300">這筆帳裡有一項不是零：你的時間和判斷力。</strong>
              token 很便宜，但你得看得懂它做了什麼、抓得出它哪裡做錯。那個能力不會自己長出來。
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              兩邊的數字都是估計。外包報價是市場上常見的區間，實際依需求規模與廠商差異很大；
              token 費用是用公告單價乘上估計用量算的。這裡只拿來對照數量級。
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={6} className="rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4">
          <p className="text-slate-300 text-base leading-relaxed">
            所以問題不是要不要花這筆錢，是<strong className="text-slate-100">怎麼讓它花在刀口上</strong>。
            token 最容易被浪費的地方有三個：它手上沒有對的工具、你丟了一堆它用不到的資料給它、
            或是一個題目一次交代太大。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
