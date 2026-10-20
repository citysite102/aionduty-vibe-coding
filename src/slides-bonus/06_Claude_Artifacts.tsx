import { FileStack, BarChart3 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { LiveDemo } from '../components/LiveDemo';
import { SourceFoot, SRC } from './_Source';

/**
 * 五個產出物與各自的方案門檻。這一頁是這個補充單元最會過期的一頁：
 * beta 會轉正、方案門檻會往下開，兩件事都不會有人通知你。
 *
 * 最後查證：2026-10-19，對照 claude.com/resources/articles/dashboards-and-motion
 * 與 support.claude.com/en/articles/12138966-release-notes（2026-09-16 那一條）。
 * 當時的現況：
 *   Docs、Slides、Design  2026-10-08 出 beta，每一個方案都有，含免費
 *   Dashboards            beta，付費方案（Pro、Max、Team、Enterprise）
 *   Motion                beta，只有 Team 與 Enterprise
 *   Enterprise 的 Dashboards 與 Motion 預設關閉，要在 Organization settings › Artifacts 打開；
 *   Docs、Slides、Design 則排定 2026-10-15 自動開啟。
 *   claude.ai/design 這個獨立網址 2026-12-14 關閉，功能併進對話裡。
 *
 * 右邊那張看板圖是示意，不是截圖。它要讓學員認得出兩件事：圖底下會寫出這張圖是用哪一句查詢
 * 算出來的、以及資料更新到什麼時候。這兩個是 Dashboards 跟「請它畫一張圖」的差別所在。
 */
const ITEMS = [
  { name: 'Docs', what: '文件。可以接著改每一段，不是一整塊文字', state: '正式', who: '全部方案，含免費' },
  { name: 'Slides', what: '投影片。改一頁不會動到其他頁', state: '正式', who: '全部方案，含免費' },
  { name: 'Design', what: '介面與圖的草稿，直接在畫布上改', state: '正式', who: '全部方案，含免費' },
  {
    name: 'Dashboards',
    what: '接上公司的資料庫，用中文問，它做出會自己更新的看板',
    state: 'beta',
    who: '付費方案',
  },
  {
    name: 'Motion',
    what: '把報告或想法做成短動畫，輸出 MP4',
    state: 'beta',
    who: 'Team 與 Enterprise',
  },
];

/** 看板示意圖的柱子。數字沒有意義，只是讓它看起來像一張真的圖 */
const BARS = [38, 62, 49, 81, 70, 94];

export default function SlideBonusClaudeArtifacts() {
  return (
    <SlideLayout title="Docs 到 Motion：五個產出物，誰用得到" subtitle="Artifacts" icon={FileStack}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto items-start">

        {/* 左欄：五個產出物與方案 */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <LiveDemo kind="desktop" note="同一個問題，要一份 Docs 與一份 Slides" />
          <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
            Claude 給你的不一定是一段文字，也可能是一份打開就能改的檔案，
            <strong className="text-slate-100">介面上叫 Artifacts</strong>。
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-slate-500">
                  <th className="pb-2 pr-3 font-normal">產出物</th>
                  <th className="pb-2 pr-3 font-normal">它做什麼</th>
                  <th className="pb-2 pr-3 font-normal">狀態</th>
                  <th className="pb-2 font-normal">開給誰</th>
                </tr>
              </thead>
              <tbody>
                {ITEMS.map((it) => (
                  <tr key={it.name} className="border-t border-slate-800 align-top">
                    <td className="py-2.5 pr-3">
                      <span className="font-mono text-sm text-orange-300">{it.name}</span>
                    </td>
                    <td className="py-2.5 pr-3 text-sm text-slate-300 leading-snug">{it.what}</td>
                    <td className="py-2.5 pr-3">
                      <span
                        className={`font-mono text-xs ${
                          it.state === 'beta' ? 'text-amber-300' : 'text-slate-500'
                        }`}
                      >
                        {it.state}
                      </span>
                    </td>
                    <td className="py-2.5 text-sm text-slate-400 leading-snug">{it.who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-slate-500">
              標 beta 的還在測試，功能與開放的對象都可能再改。
            </p>
          </AnimatedBlock>

          <Callout tone="warn" label="公司帳號打開卻找不到" stepIndex={3}>
            Enterprise 的 Dashboards 與 Motion
            <strong className="text-slate-100">預設是關的</strong>，管理者要在
            <span className="font-mono text-slate-200"> Organization settings › Artifacts </span>
            打開。Docs、Slides、Design 則排定在 2026-10-15 自動開啟。
          </Callout>

          <Callout tone="muted" stepIndex={4}>
            <span className="font-mono text-slate-300">claude.ai/design</span> 這個獨立網址
            2026-12-14 關閉，功能移進對話裡，舊連結存著的話記得改掉。
          </Callout>
        </div>

        {/* 右欄：Dashboards 的樣子 */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <AnimatedBlock
            stepIndex={2}
            className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl text-left"
          >
            <div className="bg-[#1a1a19] px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={14} className="text-slate-500" />
                <span className="text-slate-200 text-sm font-bold">各通路的本月訂單</span>
                <span className="ml-auto rounded-md bg-[#2c2c2b] px-2 py-0.5 font-mono text-xs text-slate-400">
                  30d
                </span>
              </div>

              <div className="rounded-xl bg-[#232322] p-3">
                <div className="flex items-end gap-2 h-28">
                  {BARS.map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-t-[3px]"
                      style={{ height: `${h}%`, backgroundColor: i === BARS.length - 1 ? '#7c9fe8' : '#4f7fd0' }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between font-mono text-xs text-slate-600">
                  <span>5 月</span>
                  <span>10 月</span>
                </div>
              </div>

              <div className="mt-3 rounded-lg bg-[#232322] px-3 py-2 font-mono text-xs text-slate-500 truncate">
                SELECT channel, count(*) FROM orders WHERE ...
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-600">
                <span>Snowflake</span>
                <span>更新於 4 分鐘前</span>
              </div>
            </div>
            <div className="bg-[#131312] border-t border-slate-800 px-4 py-2 text-xs text-slate-600">
              示意圖，數字是編的
            </div>
          </AnimatedBlock>

          <Callout tone="focus" label="跟「請它畫張圖」差在哪" stepIndex={5}>
            每一張圖底下寫著它是用哪一句查詢算出來的，以及資料更新到什麼時候。
            <strong className="text-slate-100">能連的是 Redshift、BigQuery、ClickHouse、Databricks、Snowflake 這一類公司在用的資料庫</strong>，
            不是你上傳的那一份試算表。
          </Callout>

          <Callout tone="muted" stepIndex={6}>
            Motion 的動畫是 Claude 寫成程式碼產出來的，中間沒有影片模型，
            所以每一個字、每一個數字、每一段的長短都還改得動，最後輸出 MP4。
          </Callout>
        </div>

        <div className="lg:col-span-12">
          <SourceFoot links={[SRC.claudeDash, SRC.claudeNotes]} />
        </div>
      </div>
    </SlideLayout>
  );
}
