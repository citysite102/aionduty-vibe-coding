import React, { useState } from 'react';
import { Key, Terminal, Globe, MonitorDot, Shield, ShieldAlert, Check, X, ArrowRight, RefreshCw, Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion, AnimatePresence } from 'motion/react';

/**
 * 最後查證：2026-09-21，逐條對照 code.claude.com/docs/en/permission-modes。
 * 當時的現況與這一頁的對應：
 *   - 六個模式全部存在且設定值相符。
 *   - `default` 的介面名稱是 **Manual**（原文：「The mode that reviews every action is
 *     named Manual in the CLI ... Its config value is `default`」）。這一頁原本把它標成
 *     「預設」，但同一頁的 auto 又標著「訂閱方案的預設」，兩個「預設」在同一張表上打架，
 *     而且真正的起始模式是 auto。已改成「手動 manual」，設定值寫在內文裡。
 *   - 起始模式：「On Pro, Max, and Team plans, the built-in starting permission mode is
 *     auto mode.」原本只寫 Pro 與 Max，漏了 Team。
 *   - 2026-09-22 再查一次，這一條有前提，原本寫得太滿：文件的表格那一列是
 *     「A Pro, Max, or Team plan, **in a terminal or through the VS Code extension**」。
 *     桌面版走的是另一套：模式「remembered per folder」，而且優先於 settings 的 defaultMode。
 *     另外這幾種情況一律回 default：第一次裝好或升級後的第一個 session、feature flag 抓不到、
 *     disableAutoMode、claude -p 與 SDK、Bedrock/Vertex/Foundry/gateway、Enterprise 與 Console API key。
 *     版本也有門檻（macOS/Linux/WSL v2.1.228 以上，原生 Windows v2.1.233 以上），舊版一律 Manual。
 *   - 網頁版（2026-09-22 改寫）：原本畫的是「三個開關」，現況是輸入框旁的模式下拉。
 *     雲端工作階段只有 Auto、Accept edits、Plan，沒有 Manual（因為雲端不管哪個模式都先放行改檔案），
 *     也不給 Bypass；遠端遙控本機的工作階段則是 Manual、Accept edits、Plan。
 *   - acceptEdits：「Reads, file edits, and common filesystem commands (mkdir, touch,
 *     mv, cp, etc.)」，跟這一頁一致。
 *   - 循環：「From `auto`, the first press switches to `default`, and the cycle then runs
 *     `default` → `acceptEdits` → `plan` → back to `default`. Optional modes ... slot in
 *     after `plan`.」跟 cycleTerminalMode 一致。
 *   - dontAsk 不在循環裡，要用 --permission-mode dontAsk 指定，跟這一頁一致。
 * 下次改版前先重查那一節，不要憑印象改。
 *
 * 這一組數值與 11d2_M1_TerminalKeys.tsx 同步，改一邊要改兩邊。
 *
 * 2026-09-22 補桌面版分頁。來源是實機截圖（不是文件）：輸入框左下角那個顯示 Auto 的
 * 下拉打開之後，標題寫 Mode，底下依序是 Auto 1 / Manual 2 / Accept edits 3 / Plan 4，
 * 每一個帶一行英文說明，最後一列 Bypass permissions 右邊是一個 Enable，不給編號。
 * 也就是桌面版比終端機少了 dontAsk，而 bypass 要另外啟用，不在數字快捷鍵裡。
 * C-3：介面位置這一類要開 app 對照，不能只看文件。下次改版前重截一次。
 */

/**
 * 桌面版輸入框那個 Mode 下拉的實際內容，2026-09-22 從 app 上抄下來的。
 * 數字是鍵盤快捷鍵，Bypass permissions 沒有編號，右邊是一個 Enable。
 */
const DESKTOP_MODES = [
  { name: 'Auto', note: 'Claude handles permission decisions', key: '1', current: true },
  { name: 'Manual', note: 'Always ask before making changes', key: '2', current: false },
  { name: 'Accept edits', note: 'Automatically accept all file edits', key: '3', current: false },
  { name: 'Plan', note: 'Create a plan before making changes', key: '4', current: false },
  { name: 'Bypass permissions', note: '要另外啟用，不在數字快捷鍵裡', key: null, current: false },
];

/**
 * claude.ai/code 的雲端工作階段只給這三個，2026-09-22 從 app 截圖對照官方文件確認：
 * 「Cloud sessions: Accept edits, Plan, and Auto. Accept edits corresponds to `default`
 * mode: cloud sessions pre-approve file edits regardless of mode, so the dropdown shows
 * Accept edits instead of Manual ... Bypass permissions isn't available.」
 * （遠端遙控本機的那種工作階段不一樣，給的是 Manual、Accept edits、Plan。）
 */
const WEB_MODES = [
  { name: 'Auto', note: 'Claude handles permission decisions', key: '1', current: true },
  { name: 'Accept edits', note: 'Automatically accept all file edits', key: '2', current: false },
  { name: 'Plan', note: 'Create a plan before making changes', key: '3', current: false },
];

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

export default function SlideCheatPerms() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'desktop' | 'web'>('terminal');

  // Terminal mockup interactive state
  const [terminalMode, setTerminalMode] = useState<'default' | 'auto-accept' | 'plan' | 'auto' | 'dont-ask' | 'bypass'>('default');

  // 這個模擬器演 default → acceptEdits → plan → auto 這四格。實際上 Pro/Max 開機在 auto，
  // 按第一下才進 manual（default 的介面名稱），而且啟用的選用模式會插在 plan 後面。
  // 循環順序照官方文件（2026-09-20 查證）：default → acceptEdits → plan → auto → 回 default。
  // 起始狀態刻意停在 default 而不是 auto：Pro/Max 實際開機在 auto，但讓第一眼看到全放行，
  // 這一頁的第一印象就反了。dontAsk 不在循環裡（官方：never appears in the cycle）。
  const cycleTerminalMode = () => {
    if (terminalMode === 'default') {
      setTerminalMode('auto-accept');
    } else if (terminalMode === 'auto-accept') {
      setTerminalMode('plan');
    } else if (terminalMode === 'plan') {
      setTerminalMode('auto');
    } else {
      setTerminalMode('default');
    }
  };

  return (
    <SlideLayout title="Claude Code 的六個權限模式" subtitle="Practice: Interactive Permission Modes & Control Interfaces" icon={Key}>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-2 items-stretch text-left pb-6">

        {/* Left column: Classical Permission Matrix Table */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                <Shield size={18} className="text-sky-400" />
                <h4 className="text-sm font-bold text-slate-200">權限模式速查表 (Modes Matrix)</h4>
              </div>

              {/*
                上一頁花整頁建立「監督程度」與「邊界大小」那組對照，這一頁原本一次都沒用到，
                兩頁只是前後相鄰。每一格補一行標它調的是哪一個，前一頁才不是講完就丟。
                2026-09-22 拿掉「旋鈕一／旋鈕二」這個代號，只留名字：代號本身不帶資訊，
                讀者得回上一頁才知道一號是哪一個。同一輪把「旋鈕」這個詞本身也從畫面上清掉，
                兩頁現在都只講監督程度與邊界大小。
              */}
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                上一頁那兩件事，監督程度與邊界大小，在 Claude Code 裡就是下面這六個模式。
                每一格最後一行標的，是它轉的哪一個。
              </p>

              <div className="space-y-3">
                {/* Default Mode Block */}
                <button
                  type="button"
                  onClick={() => {
                    setTerminalMode('default');
                  }}
                  aria-pressed={terminalMode === 'default'}
                  className={`w-full p-3 rounded-2xl border text-left transition-colors duration-150 ${focusRing} ${
                    terminalMode === 'default'
                      ? 'bg-sky-500/10 border-sky-500/40 shadow'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sky-400 text-sm tracking-wide">手動 <code className="text-xs font-mono opacity-70">manual</code></span>
                    <span className="text-xs font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">最安全</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    修改檔案、執行終端機指令前會停下來徵求同意；純讀取不打擾。設定值仍叫 <code className="font-mono">default</code>，介面上寫 Manual。適合金流、認證設定或陌生專案。
                  </p>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-800 font-mono text-xs text-slate-500">
                    監督程度　動手前都先問
                  </div>
                </button>

                {/* Auto-Accept Mode Block */}
                <button
                  type="button"
                  onClick={() => {
                    setTerminalMode('auto-accept');
                  }}
                  aria-pressed={terminalMode === 'auto-accept'}
                  className={`w-full p-3 rounded-2xl border text-left transition-colors duration-150 ${focusRing} ${
                    terminalMode === 'auto-accept'
                      ? 'bg-emerald-500/10 border-emerald-500/40 shadow'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-emerald-400 text-sm tracking-wide">自動接受 <code className="text-xs font-mono opacity-70">acceptEdits</code></span>
                    <span className="text-xs font-mono text-emerald-500/30 bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-900/30">熟悉專案後</span>
                  </div>
                  {/*
                    原本寫「只有檔案編輯自動通過，Bash 指令仍走原本的許可規則」，那是錯的，
                    而且錯在讓人以為比較安全的那一邊：它同時放行 mkdir、touch、mv、cp 這類
                    檔案系統指令，mv 會搬走、會覆蓋。整頁是安全邊界的依據，這裡不能寫鬆。
                  */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    改檔案免提問，<strong className="text-slate-100">連 mkdir、mv、cp 這類搬檔案的指令也一起放行</strong>。其他指令才會問你。適合你正在盯著看的那種連續小修改。
                  </p>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-800 font-mono text-xs text-slate-500">
                    監督程度　改檔案不問，跑指令還問
                  </div>
                </button>

                {/* Plan Mode Block */}
                <button
                  type="button"
                  onClick={() => {
                    setTerminalMode('plan');
                  }}
                  aria-pressed={terminalMode === 'plan'}
                  className={`w-full p-3 rounded-2xl border text-left transition-colors duration-150 ${focusRing} ${
                    terminalMode === 'plan'
                      ? 'bg-amber-500/10 border-amber-500/40 shadow'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-amber-400 text-sm tracking-wide">計畫 <code className="text-xs font-mono opacity-70">plan</code></span>
                    <span className="text-xs font-mono text-amber-500/30 bg-amber-950/20 px-1.5 py-0.5 rounded border border-amber-900/30">大重構推薦</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    它會翻專案、提出方案給你看，<strong className="text-slate-100">但不動任何檔案</strong>。適合先確認方向再放手做。
                  </p>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-800 font-mono text-xs text-slate-500">
                    邊界大小　縮到只能讀
                  </div>
                </button>

                {/* Auto Mode Block */}
                <button
                  type="button"
                  onClick={() => {
                    setTerminalMode('auto');
                  }}
                  aria-pressed={terminalMode === 'auto'}
                  className={`w-full p-3 rounded-2xl border text-left transition-colors duration-150 ${focusRing} ${
                    terminalMode === 'auto'
                      ? 'bg-amber-500/10 border-amber-500/40 shadow'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-amber-400 text-sm tracking-wide">全自動 <code className="text-xs font-mono opacity-70">auto</code></span>
                    <span className="text-xs font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">終端機的起始模式</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    多數動作不問你，改由另一個模型在背後檢查它跟你的要求對不對得上。Pro、Max 與 Team 方案<strong>在終端機與 VS Code</strong> 開機就在這一個，按第一下 Shift + Tab 離開。桌面版記的是你上次在那個資料夾選的模式，不一定是 auto。
                  </p>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-800 font-mono text-xs text-slate-500">
                    監督程度　都不問，改由程式把關
                  </div>
                </button>

                {/* Don't Ask Mode Block */}
                <button
                  type="button"
                  onClick={() => {
                    setTerminalMode('dont-ask');
                  }}
                  aria-pressed={terminalMode === 'dont-ask'}
                  className={`w-full p-3 rounded-2xl border text-left transition-colors duration-150 ${focusRing} ${
                    terminalMode === 'dont-ask'
                      ? 'bg-slate-800/60 border-slate-600 shadow'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-200 text-sm tracking-wide">只放行你核准的 <code className="text-xs font-mono opacity-70">dontAsk</code></span>
                    <span className="text-xs font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">不在循環裡</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    只跑三種：本來就不用問的（例如讀你資料夾裡的檔案）、你在設定檔 <code className="font-mono">permissions.allow</code> 裡寫好的那幾條、以及 Hook 放行的。其餘一律擋下，不會停下來問你。它按不到，只能用啟動參數進去。
                  </p>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-800 font-mono text-xs text-slate-500">
                    邊界大小　縮到只剩你點名的工具
                  </div>
                </button>

                {/* Bypass Mode Block */}
                <button
                  type="button"
                  onClick={() => {
                    setTerminalMode('bypass');
                  }}
                  aria-pressed={terminalMode === 'bypass'}
                  className={`w-full p-3 rounded-2xl border text-left transition-colors duration-150 ${focusRing} ${
                    terminalMode === 'bypass'
                      ? 'bg-red-500/10 border-red-500/40 shadow'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-red-400 text-sm tracking-wide">全放行 <code className="text-xs font-mono opacity-70">bypassPermissions</code></span>
                    <span className="text-xs font-mono text-red-500/30 bg-red-950/20 px-1.5 py-0.5 rounded border border-red-900/30">⚠️ 僅限沙箱</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    無條件放行所有層級的操作，包含高危指令與檔案覆寫。<strong>僅限與外部隔離的 Docker 容器。</strong>
                  </p>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-800 font-mono text-xs text-slate-500">
                    監督程度＋邊界大小　兩個都轉到底
                  </div>
                </button>
              </div>
            </div>

          </AnimatedBlock>
        </div>

        {/* Right column: Interactive Switcher Mockup (Terminal vs Web UI) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Tab Selector */}
              <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-4 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('terminal')}
                  aria-pressed={activeTab === 'terminal'}
                  className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-colors duration-150 flex items-center justify-center gap-1.5 ${focusRing} ${
                    activeTab === 'terminal'
                      ? 'bg-slate-800 text-sky-400 border border-slate-800'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal size={14} />
                  終端機
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('desktop')}
                  aria-pressed={activeTab === 'desktop'}
                  className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-colors duration-150 flex items-center justify-center gap-1.5 ${focusRing} ${
                    activeTab === 'desktop'
                      ? 'bg-slate-800 text-sky-400 border border-slate-800'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MonitorDot size={14} />
                  桌面版
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('web')}
                  aria-pressed={activeTab === 'web'}
                  className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-colors duration-150 flex items-center justify-center gap-1.5 ${focusRing} ${
                    activeTab === 'web'
                      ? 'bg-slate-800 text-indigo-400 border border-slate-800'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Globe size={14} />
                  網頁版
                </button>
              </div>

              {/* Dynamic Interface Mockup */}
              <div className="relative min-h-[260px] flex flex-col">
                <AnimatePresence mode="wait">
                  {activeTab === 'terminal' ? (
                    /* TERMINAL VIEW MOCKUP */
                    <motion.div
                      key="terminal"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-xs text-slate-300 flex-1 flex flex-col justify-between relative min-h-[260px]"
                    >
                      <div>
                        {/* Terminal Window Header */}
                        <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3 text-slate-500 text-xs">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                            <span className="ml-1 text-xs">bash - claude</span>
                          </span>
                          <span>UTC-8</span>
                        </div>

                        {/* Interactive Command Prompt */}
                        <div className="space-y-2">
                          <div className="text-slate-500 font-bold">~ / my-awesome-project</div>
                          <div className="flex items-center gap-1">
                            <span className="text-sky-400 font-black">$</span>
                            <span className="text-slate-100">claude</span>
                            {terminalMode === 'auto-accept' && <span className="text-emerald-400">--permission-mode acceptEdits</span>}
                            {terminalMode === 'plan' && <span className="text-amber-400">--permission-mode plan</span>}
                            {terminalMode === 'bypass' && <span className="text-red-400">--dangerously-skip-permissions</span>}
                          </div>

                          {/* Simulated response from AI CLI */}
                          <div className="text-xs text-slate-400 leading-normal mt-3 pl-2 border-l border-slate-800 space-y-1">
                            <div>🤖 Claude Code initialized.</div>
                            {terminalMode === 'default' && (
                              <div className="text-sky-300">✓ 模式：default：寫入檔案或執行指令前會確認，讀取不打擾</div>
                            )}
                            {terminalMode === 'auto-accept' && (
                              <div className="text-emerald-400">✓ 模式：acceptEdits：檔案編輯與 mkdir／mv／cp 這類指令免提問，其餘照原本的規則問</div>
                            )}
                            {terminalMode === 'plan' && (
                              <div className="text-amber-400">✓ 模式：plan：先讀懂再出方案，不寫入任何檔案</div>
                            )}
                            {terminalMode === 'auto' && (
                              <div className="text-emerald-300">✓ 模式：auto：全放行，但每個動作先經過一道背景檢查</div>
                            )}
                            {terminalMode === 'dont-ask' && (
                              <div className="text-slate-300">✓ 模式：dontAsk：只放行 permissions.allow 寫好的那幾條，其餘一律擋下，不問</div>
                            )}
                            {terminalMode === 'bypass' && (
                              <div className="text-red-400">⚠ 模式：bypassPermissions：所有操作一律放行，不再詢問。請確認你在隔離容器裡</div>
                            )}
                            <div className="text-slate-500 text-xs">Ask me anything... (Press Shift+Tab to switch modes)</div>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Trigger Row representing bottom status bar of Claude Code */}
                      <div className="border-t border-slate-900 pt-3 mt-4 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={cycleTerminalMode}
                          className={`px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs text-sky-400 font-bold flex items-center gap-1 cursor-pointer transition-colors duration-150 active:scale-95 ${focusRing}`}
                          aria-label="模擬按下 Shift Tab 切換 Claude Code 權限模式"
                        >
                          <RefreshCw size={10} />
                          按下 [Shift + Tab] 模擬切換
                        </button>

                        {/* Status bar badge matching Anthropic Claude Code UI */}
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-slate-500">指標狀態:</span>
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            terminalMode === 'default' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                            terminalMode === 'auto-accept' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            terminalMode === 'bypass' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {terminalMode}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ) : activeTab === 'desktop' ? (
                    /* DESKTOP APP MOCKUP：輸入框左下角的 Mode 下拉 */
                    <motion.div
                      key="desktop"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex-1 flex flex-col relative min-h-[260px]"
                    >
                      <div className="text-xs text-slate-500 mb-3">
                        輸入框左下角那個顯示 <span className="font-mono text-slate-300">Auto</span> 的下拉，點開長這樣
                      </div>

                      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                        <div className="text-xs text-slate-500 mb-2">Mode</div>
                        <div className="space-y-1.5">
                          {DESKTOP_MODES.map((m) => (
                            <div
                              key={m.name}
                              className={`flex items-start justify-between gap-3 rounded-lg px-3 py-2 ${
                                m.current ? 'bg-slate-800/70 border border-slate-700' : 'border border-transparent'
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="text-sm font-bold text-slate-100 leading-tight">{m.name}</div>
                                <div className="text-xs text-slate-500 leading-tight mt-0.5">{m.note}</div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {m.current && <Check size={14} className="text-sky-400" />}
                                {m.key ? (
                                  <span className="font-mono text-xs text-slate-500">{m.key}</span>
                                ) : (
                                  <span className="rounded border border-slate-700 px-2 py-0.5 text-xs text-slate-400">Enable</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-slate-500 leading-relaxed">
                        桌面版只到這四個加一個 Bypass，
                        <span className="font-mono text-slate-400">dontAsk</span> 不在這裡，
                        它只能用啟動參數指定。
                      </div>
                    </motion.div>
                  ) : (
                    /* WEB VIEW MOCKUP：claude.ai/code 輸入框旁的模式下拉 */
                    <motion.div
                      key="web"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-slate-950 rounded-2xl border border-slate-800 p-4 text-xs text-slate-300 flex-1 flex flex-col relative min-h-[260px]"
                    >
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3 text-slate-500 text-xs font-mono">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-indigo-500/40" />
                          <span className="ml-1">https://claude.ai/code</span>
                        </span>
                        <span className="text-indigo-400">雲端工作階段</span>
                      </div>

                      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                        <div className="text-xs text-slate-500 mb-2">Mode</div>
                        <div className="space-y-1.5">
                          {WEB_MODES.map((m) => (
                            <div
                              key={m.name}
                              className={`flex items-start justify-between gap-3 rounded-lg px-3 py-2 ${
                                m.current ? 'bg-slate-800/70 border border-slate-700' : 'border border-transparent'
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="text-sm font-bold text-slate-100 leading-tight">{m.name}</div>
                                <div className="text-xs text-slate-500 leading-tight mt-0.5">{m.note}</div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {m.current && <Check size={14} className="text-indigo-400" />}
                                <span className="font-mono text-xs text-slate-500">{m.key}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-slate-500 leading-relaxed">
                        這裡沒有 Manual。雲端跑的工作階段不管在哪個模式都會先放行改檔案，
                        所以那一格直接顯示成 Accept edits。Bypass 也不給用。
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Strategic Summary */}
            <div className="mt-4 p-4 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs text-slate-300">
              <span className="text-sky-400 font-bold block mb-1">💡 這三邊怎麼切模式：</span>
              {activeTab === 'desktop' ? (
                <span>
                  桌面版不用背快捷鍵：點輸入框左下角那個 <code>Auto</code>，選單直接列出來，也可以按數字 1 到 4。
                  桌面版跟終端機是同一個 Claude Code，模式的行為一樣，差別只在這裡用選的、那裡用{' '}
                  <code>Shift + Tab</code> 循環。
                </span>
              ) : activeTab === 'terminal' ? (
                <span>
                  <code>Shift + Tab</code> 每按一下換一個。Pro、Max 與 Team 方案<strong>開起來在 auto</strong>，按第一下切到 <strong>Manual</strong>（設定檔裡的值叫 <code>default</code>），之後是 <strong>acceptEdits → plan</strong>，再按回到 Manual。狀態列會顯示目前是哪一個。
                  上面六格裡，<code>auto</code> 與 <code>bypassPermissions</code> 啟用之後會插進循環、排在 <code>plan</code> 後面；
                  <code>dontAsk</code> 永遠不在循環裡，按不到，只能用啟動參數進去。
                  
                </span>
              ) : (
                <span>
                  在 <code>claude.ai/code</code> 點輸入框旁的下拉。雲端工作階段只有 <strong>Auto、Accept edits、Plan</strong> 三個，
                  沒有 Manual，也不給 Bypass。如果那個工作階段是遠端遙控你自己的電腦，選單換成 <strong>Manual、Accept edits、Plan</strong>。
                </span>
              )}
            </div>
          </AnimatedBlock>
        </div>

      </div>

      {/* Slide Concluding Takeaway footer statement */}
      <AnimatedBlock stepIndex={3} className="text-center text-slate-500 text-xs mt-3">
        🔑 沒有哪一種模式永遠正確：陌生專案用 <code>default</code>，摸熟了切 <code>acceptEdits</code>，大改動前先 <code>plan</code>。
      </AnimatedBlock>
    </SlideLayout>
  );
}
