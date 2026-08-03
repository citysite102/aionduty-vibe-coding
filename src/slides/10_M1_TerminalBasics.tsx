import React, { useState, useEffect, useRef } from 'react';
import { 
  TerminalSquare, 
  Keyboard, 
  Play, 
  RotateCcw, 
  Folder, 
  FileCode, 
  Search, 
  HelpCircle, 
  Info,
  ChevronRight,
  FolderPlus,
  Compass,
  CornerDownRight,
  Activity
} from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { OptionalTag } from '../components/OptionalTag';
import { LiveDemo } from '../components/LiveDemo';
import { motion, AnimatePresence } from 'motion/react';

interface FileTreeNode {
  name: string;
  type: 'file' | 'folder';
  children?: string[];
  isHighlighted?: boolean;
}

interface CommandData {
  cmd: string;
  label: string;
  desc: string;
  icon: any;
  explanation: string;
  output: string | string[];
}

const COMMAND_TEMPLATES: Record<string, CommandData> = {
  pwd: {
    cmd: 'pwd',
    label: 'pwd',
    desc: '查詢目前所在路徑',
    icon: Compass,
    explanation: '📍 Print Working Directory：告訴你「我現在站在哪一個資料夾」的完整系統絕對路徑。',
    output: '/workspace/hahow-vibe-coding-project'
  },
  ls: {
    cmd: 'ls',
    label: 'ls',
    desc: '列出目前資料夾的檔案',
    icon: Folder,
    explanation: '📂 List：列出目前目錄底下的所有檔案與子資料夾，方便確認架構。',
    output: [
      'index.html             package.json           vite.config.ts',
      'src/                   public/                postcss.config.js'
    ]
  },
  cat: {
    cmd: 'cat package.json',
    label: 'cat package.json',
    desc: '檢視檔案全部內容',
    icon: FileCode,
    explanation: '📄 Concatenate：直接將指定檔案的完整內容「傾倒」在終端機畫面上。不需用編輯器開啟就能快速確認內容！',
    output: [
      '{',
      '  "name": "hahow-vibe-coding-app",',
      '  "private": true,',
      '  "version": "1.0.0",',
      '  "type": "module",',
      '  "scripts": {',
      '    "dev": "vite",',
      '    "build": "tsc && vite build",',
      '    "lint": "eslint ."',
      '  },',
      '  "dependencies": {',
      '    "react": "^18.3.1",',
      '    "react-dom": "^18.3.1",',
      '    "motion": "^11.11.13",',
      '    "lucide-react": "^0.454.0"',
      '  }',
      '}'
    ]
  },
  grep: {
    cmd: 'grep "dependencies" package.json',
    label: 'grep "dependencies"',
    desc: '在檔案內篩選特定字串',
    icon: Search,
    explanation: '🔍 Global Regular Expression Print：像一個「篩網/過濾器」！讀取 package.json 並篩選只輸出包含 "dependencies" 的那幾行，對查找大型檔案極度實用！',
    output: [
      '  "dependencies": {'
    ]
  },
  greprn: {
    cmd: 'grep -rn "API" src/',
    label: 'grep -rn "API" src/',
    desc: '全目錄遞迴搜尋關鍵字',
    icon: Search,
    explanation: '📂 Recursive search with line numbers：深層、遞迴地搜尋 src/ 資料夾內「所有檔案」，找出哪些檔案、第幾行出現了 "API" 字串。這也是 AI Agent 最愛用的尋寶工具！',
    output: [
      'src/App.tsx:84:  const [apiKey, setApiKey] = useState("");',
      'src/slides/10c_M1_WebArch.tsx:206:  <SlideLayout title="前端與後端的 API 串接">',
      'src/slides/10c_M1_WebArch.tsx:277:  <p>負責發送 API 請求與接收回應</p>'
    ]
  },
  mkdir: {
    cmd: 'mkdir src/utils',
    label: 'mkdir src/utils',
    desc: '建立一個新的資料夾',
    icon: FolderPlus,
    explanation: '📁 Make Directory：建立一個新的空白資料夾。注意它成功時「什麼都不會顯示」，終端機的慣例是沉默即成功，沒有紅字就是做好了。要確認的話再打一次 ls。',
    output: [
      'guest@vibecoding-macbook:~/project$ ls src/',
      'App.tsx      slides/      utils/'
    ]
  }
};

export default function SlideTerminalBasics() {
  const [activeTab, setActiveTab] = useState<'commands' | 'shortcuts'>('commands');
  const [activeCmdKey, setActiveCmdKey] = useState<string>('pwd');
  
  // Terminal Simulation State
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'Welcome to Hahow Vibe Coding MacBook Terminal (v2026.1)',
    'Type or click any command on the left to execute...',
    ''
  ]);
  const [typedInput, setTypedInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  // Directory Tree Simulation State
  const [hasUtilsFolder, setHasUtilsFolder] = useState<boolean>(false);
  const [highlightTree, setHighlightTree] = useState<boolean>(false);

  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeCmdData = COMMAND_TEMPLATES[activeCmdKey];

  // Simulated typing and running effect
  const runCommand = (cmdKey: string) => {
    // If typing is already running, clean up
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    
    const targetCmdData = COMMAND_TEMPLATES[cmdKey];
    setIsTyping(true);
    setIsRunning(false);
    setTypedInput('');
    setActiveCmdKey(cmdKey);

    let currentText = '';
    const fullCmdText = targetCmdData.cmd;
    let charIndex = 0;

    typingTimerRef.current = setInterval(() => {
      if (charIndex < fullCmdText.length) {
        currentText += fullCmdText[charIndex];
        setTypedInput(currentText);
        charIndex++;
      } else {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setIsTyping(false);
        setIsRunning(true);
        
        // Brief loading delay then output results
        setTimeout(() => {
          setIsRunning(false);
          const newPromptLine = `guest@vibecoding-macbook:~/project$ ${fullCmdText}`;
          const rawOutput = targetCmdData.output;
          const outputLines = Array.isArray(rawOutput) ? rawOutput : [rawOutput];
          
          setTerminalLines(prev => [
            ...prev,
            newPromptLine,
            ...outputLines,
            ''
          ]);

          // Side-effects for mkdir
          if (cmdKey === 'mkdir') {
            setHasUtilsFolder(true);
            setHighlightTree(true);
            setTimeout(() => setHighlightTree(false), 2000);
          }
        }, 400);
      }
    }, 45); // typing speed
  };

  // Shortcut triggers
  const handleShortcutClick = (shortcut: string) => {
    if (shortcut === 'Ctrl + L') {
      // Clear Terminal screen
      setTerminalLines(['[Screen Cleared by Ctrl+L]', '']);
    } else if (shortcut === 'Ctrl + C') {
      // Interrupt active typing or state
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      const currentInputText = typedInput;
      setTerminalLines(prev => [
        ...prev,
        `guest@vibecoding-macbook:~/project$ ${currentInputText}^C`,
        ''
      ]);
      setTypedInput('');
      setIsTyping(false);
      setIsRunning(false);
    }
  };

  // Reset simulated file system
  const resetSimulation = () => {
    setTerminalLines([
      'Welcome to Hahow Vibe Coding MacBook Terminal (v2026.1)',
      'Type or click any command on the left to execute...',
      ''
    ]);
    setTypedInput('');
    setIsTyping(false);
    setIsRunning(false);
    setHasUtilsFolder(false);
  };

  return (
    <SlideLayout title="終端機指令互動 Playground" subtitle={<><OptionalTag /> Terminal Interactive Practice</>} icon={TerminalSquare}>
      <LiveDemo kind="terminal" note="每個指令跟著打一次" />
      <div className="flex flex-col gap-5 max-w-6xl mx-auto w-full pb-8">
        
        {/* Intro Banner */}
        <AnimatedBlock stepIndex={1} className="w-full">
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
            <div className="space-y-2">
              <p className="text-slate-300 text-sm leading-relaxed">
                📢 終端機就是一個<strong className="text-sky-400">「用打字命令電腦」的視窗</strong>。以前我們要用滑鼠點開資料夾、用記事本打開檔案；現在只要輸入一行指令，電腦就會幫我們看檔案內容、找關鍵字、建資料夾。
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                💡 <strong>為什麼要學這些指令？跟做出網頁有什麼關係？</strong><br />
                當我們請 AI Agent（例如 Claude Code / Cursor）幫我們寫程式時，AI 其實就是在背景用這些指令<strong>「幫我們點開檔案、搜尋關鍵字、建立資料夾」</strong>。你看得懂 <code>cat</code>（開檔）和 <code>grep</code>（篩選），就知道 AI 在你的電腦裡做什麼，合作起來更有默契！
              </p>
            </div>
            <span className="text-xs bg-slate-950 text-sky-400 font-mono px-2.5 py-1.5 rounded border border-sky-900/50 shrink-0 self-start sm:self-auto">
              Interactive CLI Engine
            </span>
          </div>
        </AnimatedBlock>

        {/* MAIN BODY: Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT PANEL: Interactive Reference and Selection (5-Cols) */}
          <AnimatedBlock stepIndex={2} className="lg:col-span-5 bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              {/* Tab Selector */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mb-4">
                <button
                  onClick={() => setActiveTab('commands')}
                  className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'commands' 
                      ? 'bg-sky-500 text-slate-950 font-black shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <TerminalSquare size={13} />
                  <span>常用生存指令</span>
                </button>
                <button
                  onClick={() => setActiveTab('shortcuts')}
                  className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'shortcuts' 
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Keyboard size={13} />
                  <span>打字快捷鍵包</span>
                </button>
              </div>

              {/* TAB 1 CONTENT: Survival Commands List */}
              {activeTab === 'commands' && (
                <div className="space-y-2">
                  {(Object.keys(COMMAND_TEMPLATES) as string[]).map((key) => {
                    const item = COMMAND_TEMPLATES[key];
                    const Icon = item.icon;
                    const isSelected = activeCmdKey === key;
                    return (
                      <button
                        key={key}
                        onClick={() => runCommand(key)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                          isSelected 
                            ? 'bg-sky-950/40 border-sky-500/50 text-sky-300' 
                            : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:bg-slate-950 hover:border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-2 rounded-lg shrink-0 ${
                            isSelected ? 'bg-sky-500/10 text-sky-400' : 'bg-slate-900 text-slate-500 group-hover:text-slate-300'
                          }`}>
                            <Icon size={14} />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold font-mono block leading-none truncate">{item.cmd}</span>
                            <span className="text-xs text-slate-500 font-sans mt-1 block leading-none truncate">{item.desc}</span>
                          </div>
                        </div>
                        <div className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded border transition-colors shrink-0 ${
                          isSelected 
                            ? 'bg-sky-500/20 border-sky-500/30 text-sky-300' 
                            : 'bg-slate-900 border-slate-800 text-slate-600 group-hover:text-slate-400'
                        }`}>
                          執行 ↵
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* TAB 2 CONTENT: Keyboard Shortcuts List */}
              {activeTab === 'shortcuts' && (
                <div className="space-y-3 font-mono">
                  <p className="text-xs text-slate-400 font-sans leading-relaxed mb-1">
                    終端機不像一般文書處理器，滑鼠是點不到特定字母的。以下是高頻、必學的資深鍵盤快捷鍵：
                  </p>
                  
                  {[
                    { keys: ['Ctrl', 'C'], desc: '強制終止執行，或清空打到一半的殘留指令', action: 'Ctrl + C' },
                    { keys: ['Ctrl', 'L'], desc: '清空終端機畫面，讓排版回到乾淨的最上方', action: 'Ctrl + L' },
                    { keys: ['Ctrl', 'A'], desc: '把游標移到本行最前面' },
                    { keys: ['Ctrl', 'E'], desc: '把游標移到本行最後面' },
                    { keys: ['Ctrl', 'U'], desc: '清空游標前面的所有輸入' },
                    { keys: ['Tab'], desc: '自動補完神鍵！打字打到一半按 Tab 自動補完檔案或資料夾名稱' }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-xl border border-slate-900 bg-slate-950/30 flex items-start gap-3 justify-between ${
                        item.action ? 'cursor-pointer hover:bg-amber-950/20 hover:border-amber-900/40 group' : ''
                      }`}
                      onClick={() => item.action && handleShortcutClick(item.action)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 flex-wrap">
                          {item.keys.map((k, kIdx) => (
                            <React.Fragment key={kIdx}>
                              {kIdx > 0 && <span className="text-slate-600 text-xs">+</span>}
                              <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-200 text-xs rounded border border-slate-700 font-bold shadow-sm">{k}</kbd>
                            </React.Fragment>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 font-sans leading-relaxed">{item.desc}</p>
                      </div>
                      
                      {item.action && (
                        <span className="text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-900/30 rounded px-1.5 py-0.5 shrink-0 select-none group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                          模擬鍵 ↩
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Help Block */}
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
              <span className="text-sky-400 font-bold">💡 </span>
              <span>
                {activeTab === 'commands' 
                  ? '點選指令即可在右側模擬真實打字與執行，觀察過濾後的精細回饋。'
                  : '點擊右方帶有「模擬鍵」的快速鍵，可以在模擬終端機上觸發對應行為！'}
              </span>
            </div>
          </AnimatedBlock>

          {/* RIGHT PANEL: Terminal Simulation Window & File Tree (7-Cols) */}
          <AnimatedBlock stepIndex={3} className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Visual File Directory Tree State */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Folder size={14} className="text-sky-400" />
                  <span>專案目錄樹狀圖</span>
                </span>
                <span className="text-xs text-slate-500 font-mono">/workspace/</span>
              </div>
              
              {/* Fake Tree Node Component */}
              <div className="font-mono text-xs text-slate-300 space-y-1.5 pl-2 select-none">
                <div className="flex items-center gap-1.5">
                  <Folder size={13} className="text-sky-400 shrink-0" />
                  <span className="font-bold text-slate-200">hahow-vibe-coding-project/</span>
                </div>
                
                {/* Level 1 Subfolders */}
                <div className="pl-4 space-y-1.5 border-l border-slate-800 ml-1.5">
                  <div className="flex items-center gap-1.5">
                    <Folder size={13} className="text-sky-400 shrink-0" />
                    <span className="font-semibold text-slate-300">public/</span>
                  </div>
                  
                  {/* SRC folder */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <Folder size={13} className="text-sky-400 shrink-0" />
                      <span className="font-semibold text-slate-300">src/</span>
                    </div>
                    
                    {/* SRC sub-nodes */}
                    <div className="pl-4 space-y-1.5 border-l border-slate-800 ml-1.5">
                      <div className="flex items-center gap-1.5">
                        <FileCode size={13} className="text-slate-400 shrink-0" />
                        <span className="text-slate-400">App.tsx</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <Folder size={13} className="text-sky-400 shrink-0" />
                        <span className="text-slate-300">slides/</span>
                      </div>

                      {/* mkdir action updates this node live */}
                      <AnimatePresence>
                        {hasUtilsFolder && (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className={`flex items-center gap-1.5 rounded-md px-1.5 py-0.5 transition-colors ${
                              highlightTree ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : ''
                            }`}
                          >
                            <Folder size={13} className="text-emerald-400 shrink-0" />
                            <span className="font-bold text-emerald-400">utils/</span>
                            {highlightTree && <span className="text-xs bg-emerald-950 border border-emerald-800 rounded px-1 text-emerald-400 animate-pulse font-sans">New</span>}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <FileCode size={13} className="text-yellow-500/80 shrink-0" />
                    <span className="text-slate-300">package.json</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <FileCode size={13} className="text-slate-500 shrink-0" />
                    <span className="text-slate-400">vite.config.ts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* HIGH-FIDELITY SIMULATED TERMINAL WINDOW */}
            <div className="flex-1 bg-[#050508] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[300px]">
              {/* Window Bar */}
              <div className="bg-[#101015] px-4 py-2.5 flex items-center justify-between border-b border-slate-900 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 block"></span>
                  <span className="text-xs text-slate-500 font-mono ml-3">guest@macbook: ~/project</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={resetSimulation}
                    className="text-xs bg-slate-900 hover:bg-slate-800 hover:text-slate-300 text-slate-500 font-mono border border-slate-800 rounded px-2 py-0.5 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw size={10} />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Terminal Content Screen */}
              <div className="flex-1 p-4 font-mono text-xs text-slate-300 overflow-y-auto space-y-1.5 text-left leading-relaxed max-h-[340px]">
                {terminalLines.map((line, idx) => {
                  // Text Highlight rendering logic for grep examples
                  if (line.includes('guest@vibecoding-macbook')) {
                    return <div key={idx} className="text-sky-400 font-bold">{line}</div>;
                  }
                  if (line.includes('[Screen Cleared')) {
                    return <div key={idx} className="text-slate-500 italic">{line}</div>;
                  }
                  if (activeCmdKey === 'grep' && line.includes('"dependencies":')) {
                    return (
                      <div key={idx} className="bg-amber-500/10 border-l-2 border-amber-500 pl-2 py-0.5 text-slate-200">
                        <span>  "</span>
                        <strong className="text-amber-400 font-black bg-amber-500/20 px-1 py-0.5 rounded font-mono">dependencies</strong>
                        <span>": &#123;</span>
                      </div>
                    );
                  }
                  if (activeCmdKey === 'greprn' && (line.startsWith('src/'))) {
                    // Extract file details and highlight target
                    const parts = line.split(':');
                    const fileName = parts[0];
                    const lineNum = parts[1];
                    const code = parts.slice(2).join(':');
                    return (
                      <div key={idx} className="flex flex-wrap items-center gap-1 pl-1 border-l border-slate-800 hover:bg-slate-900/40">
                        <span className="text-emerald-400 font-semibold">{fileName}</span>
                        <span className="text-slate-500">:</span>
                        <span className="text-yellow-500 font-mono">{lineNum}</span>
                        <span className="text-slate-500">:</span>
                        <span className="text-slate-300">
                          {code.split('API').map((frag, fragIdx, arr) => (
                            <React.Fragment key={fragIdx}>
                              {frag}
                              {fragIdx < arr.length - 1 && (
                                <strong className="text-yellow-400 bg-yellow-500/20 px-0.5 rounded font-black">API</strong>
                              )}
                            </React.Fragment>
                          ))}
                        </span>
                      </div>
                    );
                  }
                  
                  return <div key={idx} className="whitespace-pre-wrap">{line}</div>;
                })}

                {/* CURRENT TYPING PROMPT LINE */}
                <div className="text-slate-300 flex items-center flex-wrap gap-x-1.5">
                  <span className="text-sky-400 font-bold">guest@vibecoding-macbook:~/project$</span>
                  <span className="text-slate-100 font-bold font-mono">
                    {typedInput}
                  </span>
                  {isTyping && <span className="w-1.5 h-3 bg-slate-300 animate-pulse ml-0.5 inline-block"></span>}
                  {isRunning && (
                    <span className="inline-flex items-center gap-1.5 ml-2 text-xs text-sky-400 font-mono">
                      <Activity size={10} className="animate-spin" />
                      <span>正在運算...</span>
                    </span>
                  )}
                </div>

              </div>
            </div>

            {/* Dynamic Command Explainer Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs text-left">
              <div className="flex items-center gap-2 mb-1.5">
                <Info size={14} className="text-sky-400 shrink-0" />
                <span className="font-bold text-slate-300">
                  指令核心知識點：<code>{activeCmdData.cmd}</code>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed pl-5">
                {activeCmdData.explanation}
              </p>
            </div>

          </AnimatedBlock>

        </div>

      </div>
    </SlideLayout>
  );
}
