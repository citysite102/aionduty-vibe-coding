import React, { useState } from 'react';
import { Key, Terminal, Globe, Shield, ShieldAlert, Check, X, ArrowRight, RefreshCw, Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion, AnimatePresence } from 'motion/react';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

export default function SlideCheatPerms() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'web'>('terminal');
  
  // Terminal mockup interactive state
  const [terminalMode, setTerminalMode] = useState<'default' | 'auto-accept' | 'plan' | 'bypass'>('default');
  
  // Web UI mockup interactive states
  const [allowRead, setAllowRead] = useState(true);
  const [allowWrite, setAllowWrite] = useState(false);
  const [allowCommands, setAllowCommands] = useState(false);
  const [sandboxEscalate, setSandboxEscalate] = useState(false);

  const applyWebPreset = (preset: 'strict' | 'auto' | 'bypass') => {
    if (preset === 'strict') {
      setAllowRead(true);
      setAllowWrite(false);
      setAllowCommands(false);
      setSandboxEscalate(false);
    } else if (preset === 'auto') {
      setAllowRead(true);
      setAllowWrite(true);
      setAllowCommands(false);
      setSandboxEscalate(false);
    } else if (preset === 'bypass') {
      setAllowRead(true);
      setAllowWrite(true);
      setAllowCommands(true);
      setSandboxEscalate(true);
    }
  };

  // Shift+Tab 在 Claude Code 裡只在這三個模式間輪替，bypassPermissions 要靠啟動參數，切不進去
  const cycleTerminalMode = () => {
    if (terminalMode === 'default') {
      setTerminalMode('auto-accept');
      applyWebPreset('auto');
    } else if (terminalMode === 'auto-accept') {
      setTerminalMode('plan');
      applyWebPreset('strict');
    } else {
      setTerminalMode('default');
      applyWebPreset('strict');
    }
  };

  return (
    <SlideLayout title="Claude Code 的權限模式" subtitle="Practice: Interactive Permission Modes & Control Interfaces" icon={Key}>
      
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

              <div className="space-y-3">
                {/* Default Mode Block */}
                <button 
                  type="button"
                  onClick={() => {
                    setTerminalMode('default');
                    applyWebPreset('strict');
                  }}
                  aria-pressed={terminalMode === 'default' && !allowWrite}
                  className={`w-full p-3 rounded-2xl border text-left transition-colors duration-150 ${focusRing} ${
                    terminalMode === 'default' && !allowWrite
                      ? 'bg-sky-500/10 border-sky-500/40 shadow' 
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sky-400 text-sm tracking-wide">預設 <code className="text-[11px] font-mono opacity-70">default</code></span>
                    <span className="text-xs font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">最安全</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    修改檔案、執行終端機指令前會停下來徵求同意；純讀取不打擾。適合金流、認證設定或陌生專案。
                  </p>
                </button>

                {/* Auto-Accept Mode Block */}
                <button 
                  type="button"
                  onClick={() => {
                    setTerminalMode('auto-accept');
                    applyWebPreset('auto');
                  }}
                  aria-pressed={terminalMode === 'auto-accept' && allowWrite && !allowCommands}
                  className={`w-full p-3 rounded-2xl border text-left transition-colors duration-150 ${focusRing} ${
                    terminalMode === 'auto-accept' && allowWrite && !allowCommands
                      ? 'bg-emerald-500/10 border-emerald-500/40 shadow' 
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-emerald-400 text-sm tracking-wide">自動接受 <code className="text-[11px] font-mono opacity-70">acceptEdits</code></span>
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
                </button>

                {/* Plan Mode Block */}
                <button 
                  type="button"
                  onClick={() => {
                    setTerminalMode('plan');
                    applyWebPreset('strict');
                  }}
                  aria-pressed={terminalMode === 'plan'}
                  className={`w-full p-3 rounded-2xl border text-left transition-colors duration-150 ${focusRing} ${
                    terminalMode === 'plan'
                      ? 'bg-amber-500/10 border-amber-500/40 shadow' 
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-amber-400 text-sm tracking-wide">計畫 <code className="text-[11px] font-mono opacity-70">plan</code></span>
                    <span className="text-xs font-mono text-amber-500/30 bg-amber-950/20 px-1.5 py-0.5 rounded border border-amber-900/30">大重構推薦</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    它會翻專案、提出方案給你看，<strong className="text-slate-100">但不動任何檔案</strong>。適合先確認方向再放手做。
                  </p>
                </button>

                {/* Bypass Mode Block */}
                <button 
                  type="button"
                  onClick={() => {
                    setTerminalMode('bypass');
                    applyWebPreset('bypass');
                  }}
                  aria-pressed={terminalMode === 'bypass'}
                  className={`w-full p-3 rounded-2xl border text-left transition-colors duration-150 ${focusRing} ${
                    terminalMode === 'bypass'
                      ? 'bg-red-500/10 border-red-500/40 shadow' 
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-red-400 text-sm tracking-wide">全放行 <code className="text-[11px] font-mono opacity-70">bypassPermissions</code></span>
                    <span className="text-xs font-mono text-red-500/30 bg-red-950/20 px-1.5 py-0.5 rounded border border-red-900/30">⚠️ 僅限沙箱</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    無條件放行所有層級的操作，包含高危指令與檔案覆寫。<strong>僅限與外部隔離的 Docker 容器。</strong>
                  </p>
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
                  Terminal 版本 (CLI Indicator)
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
                  網頁版設定 (Cloud Web Console)
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
                  ) : (
                    /* WEB VIEW MOCKUP */
                    <motion.div
                      key="web"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-slate-950 rounded-2xl border border-slate-800 p-4 text-xs text-slate-300 flex-1 flex flex-col justify-between relative min-h-[260px]"
                    >
                      <div>
                        {/* Browser Bar */}
                        <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3 text-slate-500 text-xs font-mono">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500/40" />
                            <span className="ml-1">https://claude.ai/code</span>
                          </span>
                          <span className="text-indigo-400">介面為示意</span>
                        </div>

                        {/* Quick web presets */}
                        <div className="flex gap-2 mb-4">
                          <button 
                            type="button"
                            onClick={() => applyWebPreset('strict')}
                            className={`flex-1 py-1 px-2 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 rounded border border-slate-800 transition-colors duration-150 ${focusRing}`}
                            aria-label="套用嚴格安全設定"
                          >
                            🛡️ 嚴格安全
                          </button>
                          <button 
                            type="button"
                            onClick={() => applyWebPreset('auto')}
                            className={`flex-1 py-1 px-2 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 rounded border border-slate-800 transition-colors duration-150 ${focusRing}`}
                            aria-label="套用自動核可設定"
                          >
                            ⚡ 自動核可
                          </button>
                          <button 
                            type="button"
                            onClick={() => applyWebPreset('bypass')}
                            className={`flex-1 py-1 px-2 bg-red-950/20 hover:bg-red-950/30 text-xs font-bold text-red-400 rounded border border-red-900/30 transition-colors duration-150 ${focusRing}`}
                            aria-label="套用全放行示意設定"
                          >
                            ⚠️ Bypassed
                          </button>
                        </div>

                        {/* Interactive Toggles */}
                        <div className="space-y-2.5">
                          {/* Toggle 1 */}
                          <div className="flex justify-between items-center p-2 bg-slate-900/40 rounded-xl border border-slate-800">
                            <div>
                              <div className="font-bold text-slate-200 text-xs">允許 Agent 讀取本機檔案</div>
                              <div className="text-xs text-slate-500">Read Files (CLAUDE.md, schema.ts)</div>
                            </div>
                            <button 
                              type="button"
                              onClick={() => setAllowRead(!allowRead)}
                              role="switch"
                              aria-checked={allowRead}
                              aria-label="允許 Agent 讀取本機檔案"
                              className={`w-8 h-4 rounded-full p-0.5 transition-colors ${focusRing} ${allowRead ? 'bg-indigo-500' : 'bg-slate-800'}`}
                            >
                              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${allowRead ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                          </div>

                          {/* Toggle 2 */}
                          <div className="flex justify-between items-center p-2 bg-slate-900/40 rounded-xl border border-slate-800">
                            <div>
                              <div className="font-bold text-slate-200 text-xs">允許自動寫入並儲存檔案</div>
                              <div className="text-xs text-slate-500">Write & Overwrite Files Directly</div>
                            </div>
                            <button 
                              type="button"
                              onClick={() => setAllowWrite(!allowWrite)}
                              role="switch"
                              aria-checked={allowWrite}
                              aria-label="允許自動寫入並儲存檔案"
                              className={`w-8 h-4 rounded-full p-0.5 transition-colors ${focusRing} ${allowWrite ? 'bg-indigo-500' : 'bg-slate-800'}`}
                            >
                              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${allowWrite ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                          </div>

                          {/* Toggle 3 */}
                          <div className="flex justify-between items-center p-2 bg-slate-900/40 rounded-xl border border-slate-800">
                            <div>
                              <div className="font-bold text-slate-200 text-xs">執行 Bash 終端機指令無需詢問</div>
                              <div className="text-xs text-slate-500">Run shell execution without approval</div>
                            </div>
                            <button 
                              type="button"
                              onClick={() => setAllowCommands(!allowCommands)}
                              role="switch"
                              aria-checked={allowCommands}
                              aria-label="執行 Bash 終端機指令無需詢問"
                              className={`w-8 h-4 rounded-full p-0.5 transition-colors ${focusRing} ${allowCommands ? 'bg-indigo-500' : 'bg-slate-800'}`}
                            >
                              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${allowCommands ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Web UI Feedback statement */}
                      <div className="text-xs text-slate-500 font-mono mt-3 border-t border-slate-900 pt-2 flex justify-between items-center">
                        <span>安全性評估:</span>
                        {allowCommands && allowWrite ? (
                          <span className="text-red-400 font-bold">🔴 警告：防護已全面解除</span>
                        ) : allowWrite ? (
                          <span className="text-emerald-400 font-bold">🟢 日常設定：可寫檔、不能下指令</span>
                        ) : (
                          <span className="text-sky-400 font-bold">🔵 限制保護：唯讀觀察</span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Strategic Summary */}
            <div className="mt-4 p-4 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs text-slate-300">
              <span className="text-indigo-400 font-bold block mb-1">💡 跨平台控制思維：</span>
              {activeTab === 'terminal' ? (
                <span>
                  <code>Shift + Tab</code> 平常只在 <strong>default（新版介面上叫 Manual）→ acceptEdits → plan</strong> 三個之間循環，目前是哪一種，輸入框下方會顯示。
                  另外還有三種要用啟動參數才進得去：<code>auto</code>（全放行但有背景檢查）、
                  <code>dontAsk</code>（只放行你事先核准的工具，是縮小邊界最實際的做法）、
                  以及上面那個 <code>bypassPermissions</code>。
                  <strong className="text-slate-100"> 按不到它們是刻意的設計，不會誤觸。</strong>
                </span>
              ) : (
                <span>在 Web 網頁控制台中，我們則享有<strong>精細（Granular）的安全隔離</strong>，能精細開關特定資料夾、指令黑名單或特定沙箱行為。</span>
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
