/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Type } from 'lucide-react';
import { SlideContext } from './components/SlideLayout';

import Slide01 from './slides/01_Cover';
import Slide02 from './slides/02_Philosophy';
import Slide02a from './slides/02a_CoreAssets';
import Slide02b from './slides/02b_Div_Intro';
import Slide03 from './slides/03_Intro_Vibe';
import Slide03b from './slides/03b_Intro_Agentic';
import Slide04 from './slides/04_Intro_Spectrum';
import Slide04c from './slides/04c_Intro_VibeVsAgentic';
import Slide04b from './slides/04b_LLM_Math_Limits';
import Slide04b2 from './slides/04b2_LLM_Prompt';
import Slide04b3 from './slides/04b3_LLM_PromptDrill';
import Slide05 from './slides/05_Intro_Cases';
import Slide06 from './slides/06_Threads';
import Slide07 from './slides/07_Div_Terminal';
import Slide09 from './slides/09_M1_CodeIntro';
import Slide09a from './slides/09a_M1_Benchmarks';
import Slide09b from './slides/09b_M1_TopicsOverview';
import Slide10 from './slides/10_M1_TerminalBasics';
import Slide10a from './slides/10a_M1_WarpTerminal';
import Slide10b from './slides/10b_M1_API_Basics';
import Slide10b2 from './slides/10b2_M1_API_Agent';
import Slide10b3 from './slides/10b3_M1_API_Docs';
import Slide10c from './slides/10c_M1_WebArch';
import Slide10c2 from './slides/10c2_M1_WebArchDuties';
import Slide10c3 from './slides/10c3_M1_Deploy';
import Slide10d from './slides/10d_M1_Database';
import Slide10e from './slides/10e_M1_Git';
import Slide11 from './slides/11_M1_CodeSetup';
import Slide11b from './slides/11b_M1_ClaudeCodeUI';
import Slide11d from './slides/11d_M1_ClaudeShortcuts';
import Slide11d2 from './slides/11d2_M1_ClaudeFlowCmds';
import Slide11e from './slides/11e_M1_ClaudeMenuTabs';
import Slide11c from './slides/11c_M1_PricingAndROI';
import Slide11c2 from './slides/11c2_M1_ROI';
import Slide12 from './slides/12_M1_Example1';
import Slide13 from './slides/13_M1_Example2';
import Slide14 from './slides/14_M1_Boundaries';
import Slide15 from './slides/15_M1_Workflow';
import Slide17 from './slides/17_M1_Error';
import Slide18 from './slides/18_M1_Features';
import Slide18b from './slides/18b_M1_Quiz';
import Slide19 from './slides/19_Div_Harness';
import Slide19a from './slides/19a_M2_SectionGoal';
import Slide19b from './slides/19b_Harness_Context';
import Slide19c from './slides/19c_Harness_Architecture';
import Slide19d from './slides/19d_Harness_Economics';
import Slide20 from './slides/20_M2_HarnessIntro';
import Slide30 from './slides/30_Cheat_Perms';
import Slide31 from './slides/31_Cheat_Dials';
import Slide21 from './slides/21_M2_Pillars';
import Slide21a from './slides/21a_M2_MCPSkills';
import Slide21b from './slides/21b_M2_HandsOn';
import Slide21b2 from './slides/21b2_M2_HandsOnPrompt';
import Slide21b3 from './slides/21b3_M2_ContextCheck';
import Slide21b4 from './slides/21b4_M2_BadRules';
import Slide21c from './slides/21c_M2_ClaudeMdLayers';
import Slide21d1 from './slides/21d1_M2_LoadAlways';
import Slide21d2 from './slides/21d2_M2_LoadOnDemand';
import Slide21d3 from './slides/21d3_M2_OutsideContext';
import Slide21e from './slides/21e_M2_Extensions_Cases';
import Slide21e2 from './slides/21e2_M2_Extensions_Cases2';
import Slide21f from './slides/21f_M2_ClaudeMdRealWorld';
import Slide21f2 from './slides/21f2_M2_ThisDeck';
import Slide21f3 from './slides/21f3_M2_RuleFailure';
import Slide21f4 from './slides/21f4_M2_RuleRouting';
import Slide21f5 from './slides/21f5_M2_ClaudeMdHealth';
import Slide21g from './slides/21g_M2_ClaudeProjects';
import Slide21h2 from './slides/21h2_M2_ProjectsInPractice';
import Slide21j from './slides/21j_M2_ClaudeCodeIntegration';
import Slide32 from './slides/32_Cheat_Tools';
import Slide32c from './slides/32c_M2_TransferQuiz';
import Slide32d from './slides/32d_M2_Recap';
import Slide32b from './slides/32b_MentalModels';
import Slide23 from './slides/23_M3_MultiAgent';
import Slide24 from './slides/24_M3_Roles';
import Slide25 from './slides/25_M3_Quality';
import Slide25b from './slides/25b_M3_HandsOn';
import Slide26 from './slides/26_Div_Loop';
import Slide27 from './slides/27_M4_LoopEng';
import Slide27b from './slides/27b_M4_LoopParts';
import Slide27b2 from './slides/27b2_M4_GoalLoop';
import Slide27b3 from './slides/27b3_M4_GoalWorkflow';
import Slide27b4 from './slides/27b4_M4_Vocabulary';
import Slide27b4b from './slides/27b4b_M4_Caveats';
import Slide27b4c from './slides/27b4c_M4_Intervene';
import Slide27b5 from './slides/27b5_M4_NoCodeBridge';
import Slide27b5b from './slides/27b5b_M4_WhiteScreen';
import Slide27b5c from './slides/27b5c_M4_ReadErrors';
import Slide27b6 from './slides/27b6_M4_FutureEngineering';
import Slide27b7 from './slides/27b7_M4_PopularSkills';
import Slide27b8 from './slides/27b8_M4_MissionLog';
import Slide27b9 from './slides/27b9_M4_ShipIt';
import Slide27c from './slides/27c_M4_Scale';
import Slide28 from './slides/28_M4_Safety';
import Slide28b from './slides/28b_M4_FirstDay';
import Slide33 from './slides/33_Outro';
import { REPLACEMENTS } from './slides-recorded/registry';

const LIVE_TITLES = [
  "封面",
  "內容大綱",
  "學完帶走的 3 大核心資產",
  "跳脫對話框的開發新典範",
  "什麼是 Vibe Coding？",
  "從 Vibe Coding 到 Agentic Engineering",
  "Vibe Coding 與 Agentic Engineering 的演進",
  "依據目標選擇工具",
  "它不是在理解，是在算哪個答案離你最近",
  "講不清楚的，直接給它看",
  "換你把這三句話改清楚",
  "從對話框走向真實環境",
  "兩條學習主線",
  "終端機與 Claude Code 入門",
  "為什麼選擇終端機與 Claude Code？",
  "這件事真的做得到嗎？",
  "前置基礎觀念導覽",
  "終端機指令互動 Playground",
  "推薦現代 AI 終端機 Warp",
  "當錯誤發生時 (Errors)",
  "理解 API 與資料傳遞",
  "讓 Agent 幫你讀文件並串接",
  "如何閱讀 API 文件",
  "讓記憶永久保存",
  "前端與後端的 API 互動與串接",
  "前端與後端各自負責什麼",
  "從本機到上線：交給託管平台",
  "Git 版本控制：為程式碼存檔",
  "健康的工作循環",
  "手把手操作",
  "Claude Code 控制台",
  "Claude Code 核心按鍵與技巧",
  "Claude Code 新手友善內建功能",
  "Claude Code 對話與會話控制命令",
  "Claude Code 指令的四種類型",
  "做出你的第一個作品",
  "叫它寫個小工具，幫你做雜事",
  "能力邊界與判斷",
  "該用什麼工具？",
  "Agent 運作框架與成本分析",
  "每次開新對話，你都要重講一次規矩",
  "什麼是運作框架？",
  "邁向代理工程的橋樑：上下文工程",
  "完整的運作框架有哪些零件",
  "Token 經濟學：資本支出與營運成本",
  "兩大類 AI 程式工具付費與登入模式",
  "為什麼你該花錢買 AI 算力？",
  "這堂課要搭的三根支柱",
  "讓 AI 有手可用：MCP 與 Skills",
  "監督與邊界",
  "Claude Code 的四種權限模式",
  "動手搭建運作框架",
  "跟著做：寫出第一份 CLAUDE.md",
  "怎麼確認它真的讀到了",
  "這三種寫法，寫了等於沒寫",
  "CLAUDE.md 的分層",
  "常駐的東西越少，它越專心",
  "用到才展開，平常只佔一行",
  "真要擋住，就不要放進 context",
  "這幾樣實際怎麼用？（一）規範與流程",
  "這幾樣實際怎麼用？（二）防線與調查",
  "讓團隊為你工作",
  "協作角色拆解",
  "設立品質防線 (Anti-Slop)",
  "養一個小幫手",
  "這跟你的專案有什麼關係？",
  "這份簡報就是這樣做出來的",
  "規則明明寫了，它卻沒照做",
  "這條規則該放哪",
  "手冊越寫越肥，怎麼整理",
  "怎麼把話講對：白名單與探索空間",
  "專屬知識庫與分身",
  "同一套手冊，換個地方用",
  "Claude Projects 與 Claude Code 怎麼搭",
  "跨工具思維對照表",
  "換成你的工作，手冊該寫什麼",
  "這一段你完成了三件事",
  "Agent 循環開發流程",
  "循環工程",
  "自動化之後，最容易累積的三件事",
  "Loop Engineering 的關鍵零件",
  "熱門 Skills 精選",
  "設定目標，讓它自己跑到完成",
  "Goal 五步驟操作",
  "省下的時間，用來擴大搜尋",
  "自動化 Loop 的局限與風險",
  "鬼打牆的時候，你可以怎麼踩煞車",
  "不寫程式，也能守住品質",
  "畫面一片空白，終端機又沒報錯",
  "紅字在跟你說三件事",
  "先說清楚，再讓它自己驗",
  "放手之前，先設好四道邊界",
  "幫計時器加上航行日誌",
  "上線之後才發現的問題",
  "回去之後，第一天做什麼",
  "未來的工作者",
];

const LIVE_SLIDES = [
  Slide01,
  Slide02,
  Slide02a,
  Slide02b,
  Slide03,
  Slide03b,
  Slide04c,
  Slide04,
  Slide04b,
  Slide04b2,
  Slide04b3,
  Slide05,
  Slide06,
  Slide07,
  Slide09,
  Slide09a,
  Slide09b,
  Slide10,
  Slide10a,
  Slide17,
  Slide10b,
  Slide10b2,
  Slide10b3,
  Slide10d,
  Slide10c,
  Slide10c2,
  Slide10c3,
  Slide10e,
  Slide15,
  Slide11,
  Slide11b,
  Slide11d,
  Slide18,
  Slide11d2,
  Slide11e,
  Slide12,
  Slide13,
  Slide14,
  Slide18b,
  Slide19,
  Slide19a,
  Slide20,
  Slide19b,
  Slide19c,
  Slide19d,
  Slide11c,
  Slide11c2,
  Slide21,
  Slide21a,
  Slide31,
  Slide30,
  Slide21b,
  Slide21b2,
  Slide21b3,
  Slide21b4,
  Slide21c,
  Slide21d1,
  Slide21d2,
  Slide21d3,
  Slide21e,
  Slide21e2,
  Slide23,
  Slide24,
  Slide25,
  Slide25b,
  Slide21f,
  Slide21f2,
  Slide21f3,
  Slide21f4,
  Slide21f5,
  Slide32b,
  Slide21g,
  Slide21h2,
  Slide21j,
  Slide32,
  Slide32c,
  Slide32d,
  Slide26,
  Slide27,
  Slide27b4,
  Slide27b,
  Slide27b7,
  Slide27b2,
  Slide27b3,
  Slide27c,
  Slide27b4b,
  Slide27b4c,
  Slide27b5,
  Slide27b5b,
  Slide27b5c,
  Slide27b6,
  Slide28,
  Slide27b8,
  Slide27b9,
  Slide28b,
  Slide33,
];

const PARAMS = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search);
/** ?clean=1 隱藏操作列，錄製時用 */
const IS_CLEAN = PARAMS.get('clean') === '1';

/**
 * 每一節的起點，寫的是「原始頁」在 LIVE_SLIDES 的 index。
 * 拆頁之後實際位置會位移，下面會自動換算，不需要手動改數字。
 */
const SECTION_DEFS = [
  { start: 0, label: '課前導讀' },
  { start: 3, label: '解構 Vibe Coding：跳脫對話框的開發新典範' },
  { start: 13, label: 'Agent 的心智模型與 Claude Code 終端機實作' },
  { start: 39, label: 'Agent 運作框架與成本分析' },
  { start: 77, label: 'Agent 循環開發流程' },
];

/** 把拆好的頁面替換進原本的順序。沒拆過的維持原樣。 */
const ENTRIES = LIVE_SLIDES.flatMap((Component, i) => {
  const replaced = REPLACEMENTS[i];
  if (replaced) {
    return replaced.map((r) => ({ Component: r.Component, title: r.meta.title, liveIndex: i }));
  }
  return [{ Component, title: LIVE_TITLES[i], liveIndex: i }];
});

const SLIDES = ENTRIES.map((e) => e.Component);
const SLIDE_TITLES = ENTRIES.map((e) => e.title);

/** 分節切點依實際位置換算，最後一頁固定是結語，自成一組 */
const SECTIONS = SECTION_DEFS.map((def, i) => {
  const next = SECTION_DEFS[i + 1];
  return {
    label: def.label,
    from: ENTRIES.findIndex((e) => e.liveIndex === def.start),
    to: next ? ENTRIES.findIndex((e) => e.liveIndex === next.start) : ENTRIES.length - 1,
  };
});

export default function App() {
  const [current, setCurrent] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [fontScale, setFontScale] = useState<number>(100); // default 100%
  const maxStepRef = useRef(0);

  useEffect(() => {
    document.documentElement.style.fontSize = `${(fontScale / 100) * 16}px`;
    return () => {
      document.documentElement.style.fontSize = '';
    };
  }, [fontScale]);

  const registerStep = useCallback((index: number) => {
    if (index > maxStepRef.current) {
      maxStepRef.current = index;
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent(p => Math.min(SLIDES.length - 1, p + 1));
    setCurrentStep(0);
    maxStepRef.current = 0;
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent(p => Math.max(0, p - 1));
    setCurrentStep(0);
    maxStepRef.current = 0;
  }, []);

  const next = useCallback((onlyWithinSlide = false) => {
    if (currentStep < maxStepRef.current) {
      setCurrentStep(s => s + 1);
    } else if (!onlyWithinSlide && current < SLIDES.length - 1) {
      nextSlide();
    }
  }, [current, currentStep, nextSlide]);

  const prev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    } else {
      prevSlide();
    }
  }, [currentStep, prevSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        next(false);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        next(true);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  const handleContainerClick = (e: React.MouseEvent) => {
    // Prevent advancing when clicking on buttons inside the slide
    if ((e.target as HTMLElement).closest('button')) return;
    next(true);
  };

  const CurrentSlide = SLIDES[current];

  return (
    <div 
      className="w-screen h-screen bg-[#020617] text-slate-200 overflow-hidden flex flex-col font-sans relative selection:bg-sky-500/30"
      onClick={handleContainerClick}
    >
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-grid-slate-900 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Top Progress Bar */}
      <div className="h-1.5 bg-slate-900 w-full z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex-1 relative overflow-hidden">
        <SlideContext.Provider value={{ currentStep, registerStep }}>
          <AnimatePresence mode="wait">
            <CurrentSlide key={current} />
          </AnimatePresence>
        </SlideContext.Provider>
      </div>

      {/* Floating Controls */}
      {!IS_CLEAN && <div className="absolute bottom-6 right-6 flex gap-2 items-center bg-slate-900/80 p-2 rounded-full backdrop-blur-md border border-slate-800 shadow-2xl z-50">
        
        {/* Font Scale Adjuster */}
        <div className="flex gap-1 items-center px-2.5 py-0.5 border-r border-slate-800 text-slate-400 select-none shrink-0" onClick={e => e.stopPropagation()}>
          <Type size={12} className="text-slate-500 mr-1" />
          <button
            onClick={() => setFontScale(p => Math.max(85, p - 5))}
            disabled={fontScale <= 85}
            className="w-5 h-5 flex items-center justify-center text-[10px] font-bold hover:bg-slate-800 hover:text-slate-200 rounded transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
            title="A- (縮小)"
          >
            －
          </button>
          <span className="text-[10px] font-mono font-bold min-w-[28px] text-center text-slate-300">
            {fontScale}%
          </span>
          <button
            onClick={() => setFontScale(p => Math.min(150, p + 5))}
            disabled={fontScale >= 150}
            className="w-5 h-5 flex items-center justify-center text-[10px] font-bold hover:bg-slate-800 hover:text-slate-200 rounded transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
            title="A+ (放大)"
          >
            ＋
          </button>
        </div>

        <select 
          className="bg-transparent text-xs font-mono text-slate-400 px-3 py-1 outline-none cursor-pointer hover:text-slate-200 transition-colors appearance-none text-center max-w-[120px] truncate"
          value={current}
          onChange={(e) => {
            setCurrent(Number(e.target.value));
            setCurrentStep(0);
            maxStepRef.current = 0;
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {SECTIONS.map((sec) => (
            <optgroup key={sec.label} label={sec.label}>
              {Array.from({ length: sec.to - sec.from }, (_, k) => sec.from + k).map((idx) => (
                <option key={idx} value={idx} className="bg-slate-900 text-slate-300">
                  Slide {idx + 1} - {SLIDE_TITLES[idx]}
                </option>
              ))}
            </optgroup>
          ))}
          <optgroup label="結語">
            <option value={SLIDES.length - 1} className="bg-slate-900 text-slate-300">
              Slide {SLIDES.length} - {SLIDE_TITLES[SLIDES.length - 1]}
            </option>
          </optgroup>
        </select>

        <span className="text-xs font-mono text-slate-500 pr-2 border-r border-slate-700 selection:bg-transparent">
          / {SLIDES.length}
        </span>
        
        <div className="flex gap-1 pl-1">
          <button 
            onClick={(e) => { e.stopPropagation(); prev(); }} 
            disabled={current === 0 && currentStep === 0} 
            className="p-1.5 hover:bg-slate-800 rounded-full disabled:opacity-30 transition-colors text-slate-300"
          >
            <ChevronLeft size={18}/>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); next(); }} 
            disabled={current === SLIDES.length - 1 && currentStep === maxStepRef.current} 
            className="p-1.5 hover:bg-slate-800 rounded-full disabled:opacity-30 transition-colors text-slate-300"
          >
            <ChevronRight size={18}/>
          </button>
        </div>
      </div>}

    </div>
  );
}
