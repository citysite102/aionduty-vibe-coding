/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Type, Timer } from 'lucide-react';
import { SlideContext } from './components/SlideLayout';
import { CountdownOverlay, openCountdown } from './components/CountdownOverlay';

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
import Slide04b4 from './slides/04b4_LLM_PromptPractice';
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
import Slide10f from './slides/10f_M1_DesktopFirst';
import Slide11 from './slides/11_M1_CodeSetup';
import Slide11b from './slides/11b_M1_ClaudeCodeUI';
import Slide11d from './slides/11d_M1_ClaudeShortcuts';
import Slide11e from './slides/11e_M1_ClaudeMenuTabs';
import Slide11c from './slides/11c_M1_PricingAndROI';
import Slide11c2 from './slides/11c2_M1_ROI';
import Slide12 from './slides/12_M1_Example1';
import Slide12b from './slides/12b_M1_Challenge';
import Slide12c from './slides/12c_M1_ApiHandsOn';
import Slide13 from './slides/13_M1_Example2';
import Slide14 from './slides/14_M1_Boundaries';
import Slide15 from './slides/15_M1_Workflow';
import Slide17 from './slides/17_M1_Error';
import Slide18b from './slides/18b_M1_Quiz';
import Slide18c from './slides/18c_M1_Harvest';
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
import Slide21a2 from './slides/21a2_M2_SkillDemoResume';
import Slide21a3 from './slides/21a3_M2_SkillDemoReference';
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
import Slide21e3 from './slides/21e3_M2_ProjectTypes';
import Slide21f from './slides/21f_M2_ClaudeMdRealWorld';
import Slide21f2 from './slides/21f2_M2_ThisDeck';
import SlideDivHandbook from './slides/21g_Div_Handbook';
import Slide21f6 from './slides/21f6_M2_ProblemMap';
import Slide21f3 from './slides/21f3_M2_RuleFailure';
import Slide21f4 from './slides/21f4_M2_RuleRouting';
import Slide21f5 from './slides/21f5_M2_ClaudeMdHealth';
import Slide21h2 from './slides/21h2_M2_ProjectsInPractice';
import Slide21j from './slides/21j_M2_ClaudeCodeIntegration';
import Slide32 from './slides/32_Cheat_Tools';
import Slide32c from './slides/32c_M2_TransferQuiz';
import Slide32d from './slides/32d_M2_Recap';
import Slide32b from './slides/32b_MentalModels';
import SlideDivTeam from './slides/22_Div_MultiAgent';
import Slide23 from './slides/23_M3_MultiAgent';
import Slide24 from './slides/24_M3_Roles';
import Slide25 from './slides/25_M3_Quality';
import Slide25b from './slides/25b_M3_HandsOn';
import Slide25c from './slides/25c_M3_TeachingSim';
import Slide26a from './slides/26a_M3_QuoteSystemIntro';
import Slide26b from './slides/26b_M3_QuoteSystemRequirements';
import Slide26c2 from './slides/26c2_M3_QuoteSystemArchitecture';
import Slide26c from './slides/26c_M3_QuoteSystemData';
import Slide26d from './slides/26d_M3_QuoteSystemStandards';
import Slide26e from './slides/26e_M3_QuoteSystemPrompts';
import Slide26f from './slides/26f_M3_QuoteSystemRisks';
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
import Slide27b7b from './slides/27b7b_M4_GrillMeRouting';
import Slide27b8 from './slides/27b8_M4_MissionLog';
import Slide27b8b from './slides/27b8b_M4_PushToGithub';
import Slide27b8c from './slides/27b8c_M4_GitignoreGuard';
import Slide27b9 from './slides/27b9_M4_ShipIt';
import Slide27c from './slides/27c_M4_Scale';
import Slide28 from './slides/28_M4_Safety';
import Slide28a from './slides/28a_M4_LoopPractice';
import Slide28a2 from './slides/28a2_M4_LoopWatch';
import Slide28b from './slides/28b_M4_FirstDay';
import Slide33 from './slides/33_Outro';
import { REPLACEMENTS } from './slides-recorded/registry';

const LIVE_TITLES = [
  "封面",
  "四個單元，從看懂到自己做出來",
  "學完帶走的 3 大核心資產",
  "Vibe Coding 是什麼，能做到哪裡",
  "什麼是 Vibe Coding？",
  "從 Vibe Coding 到 Agentic Engineering",
  "Vibe Coding 與 Agentic Engineering",
  "依據目標選擇工具",
  "AI 不是在理解，是在算哪個答案離你最近",
  "講不清楚的，直接給 AI 看",
  "講清楚，先檢查這三件事",
  "換你改這兩句",
  "同一個需求，三種做法",
  "兩條學習主線",
  "讓 AI 動手：Claude Code 入門",
  "為什麼要一個能動手的 AI？",
  "這件事真的做得到嗎？",
  "前置基礎觀念導覽",
  "紅字不是壞事，它在告訴你哪裡卡住",
  "選修：終端機指令互動 Playground",
  "選修：推薦現代 AI 終端機 Warp",
  "兩個程式要講話，得先講好格式",
  "讓 Agent 幫你讀文件並串接",
  "如何閱讀 API 文件",
  "關掉瀏覽器，資料就不見了",
  "你按下按鈕之後，發生了什麼事",
  "前端與後端各自負責什麼",
  "從本機到上線：交給託管平台",
  "用 Git 存檔，改壞了可以回去",
  "一次改一點，比一次改完安全",
  "先用桌面版做出第一個東西",
  "手把手操作",
  "畫面上這幾塊分別在說什麼",
  "Claude Code 核心按鍵與技巧",
  "Claude Code 指令的四種類型",
  "做出你的第一個作品",
  "換你寫一次",
  "讓計時器去外面拿一筆資料",
  "叫它寫個小工具，幫你做雜事",
  "哪些事它做得好，哪些你得自己來",
  "該用什麼工具？",
  "先確認你手上有什麼",
  "Agent 運作框架與成本分析",
  "每次開新對話，你都要重講一次規矩",
  "什麼是運作框架（Harness）？",
  "完整的運作框架有哪些零件",
  "上下文工程",
  "Token 經濟學：資本支出與營運成本",
  "兩大類 AI 程式工具付費與登入模式",
  "為什麼你該花錢買 AI 算力？",
  "接下來要動手的三件事",
  "讓 AI 有手可用：MCP 與 Skills",
  "監督與邊界",
  "Claude Code 的四種權限模式",
  "同一個個人網站，裝與不裝 Skill",
  "給它看，還要叫得出每一塊的名字",
  "動手搭建運作框架",
  "跟著做：寫出真正能用的 CLAUDE.md",
  "怎麼確認它真的讀到了",
  "這三種寫法，寫了等於沒寫",
  "CLAUDE.md 的分層",
  "常駐的東西越少，它越專心",
  "用到才展開，平常只佔一行",
  "光寫在手冊裡，擋不住",
  "這幾樣實際怎麼用？（一）規範與流程",
  "這幾樣實際怎麼用？（二）防線與調查",
  "「專案」不是只有寫程式",
  "這跟你的專案有什麼關係？",
  "這份簡報就是這樣做出來的",
  "手冊（CLAUDE.md）的疑難雜症與轉移",
  "接下來要解決的四個問題",
  "規則明明寫了，它卻沒照做",
  "這條規則該放哪",
  "手冊越寫越肥，怎麼整理",
  "怎麼把話講對：白名單與探索空間",
  "同一套手冊，換個地方用",
  "Claude Projects 與 Claude Code 怎麼搭",
  "跨工具思維對照表",
  "換成你的工作，手冊該寫什麼",
  "這一段你完成了三件事",
  "讓 Agent 分工，並守住品質",
  "讓團隊為你工作",
  "一個人做不完的時候，怎麼分工",
  "設立品質防線 (Anti-Slop)",
  "動手做一個審查子代理",
  "三個角色跑一次，找出自己看不到的洞",
  "把分工放進一個中型專案",
  "先把需求說成一頁",
  "先畫出產品由哪幾層組成",
  "資料庫先只講四張表",
  "把規範放進對的位置",
  "用五個指令推進",
  "中型專案最常卡在這五件事",
  "Agent 循環開發流程",
  "做完一次不算完，要能自己跑下一輪",
  "自動化之後，最容易累積的三件事",
  "讓它自己跑，需要哪幾個零件",
  "熱門 Skills 精選",
  "想讓它每次都這樣問，寫進手冊就好了嗎",
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
  "讓計時器自己跑完一輪",
  "Agent 自己跑的時候，你在旁邊看什麼",
  "幫計時器加上航行日誌",
  "你的專案現在只活在這台電腦裡",
  "有些東西不能推上去",
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
  Slide04b4,
  Slide05,
  Slide06,
  Slide07,
  Slide09,
  Slide09a,
  Slide09b,
  Slide17,
  Slide10,
  Slide10a,
  Slide10b,
  Slide10b2,
  Slide10b3,
  Slide10d,
  Slide10c,
  Slide10c2,
  Slide10c3,
  Slide10e,
  Slide15,
  Slide10f,
  Slide11,
  Slide11b,
  Slide11d,
  Slide11e,
  Slide12,
  Slide12b,
  Slide12c,
  Slide13,
  Slide14,
  Slide18b,
  Slide18c,
  Slide19,
  Slide19a,
  Slide20,
  Slide19c,
  Slide19b,
  Slide19d,
  Slide11c,
  Slide11c2,
  Slide21,
  Slide21a,
  Slide31,
  Slide30,
  Slide21a2,
  Slide21a3,
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
  Slide21e3,
  Slide21f,
  Slide21f2,
  SlideDivHandbook,
  Slide21f6,
  Slide21f3,
  Slide21f4,
  Slide21f5,
  Slide32b,
  Slide21h2,
  Slide21j,
  Slide32,
  Slide32c,
  Slide32d,
  SlideDivTeam,
  Slide23,
  Slide24,
  Slide25,
  Slide25b,
  Slide25c,
  Slide26a,
  Slide26b,
  Slide26c2,
  Slide26c,
  Slide26d,
  Slide26e,
  Slide26f,
  Slide26,
  Slide27,
  Slide27b4,
  Slide27b,
  Slide27b7,
  Slide27b7b,
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
  Slide28a,
  Slide28a2,
  Slide27b8,
  Slide27b8b,
  Slide27b8c,
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
  { start: 3, label: 'Vibe Coding 是什麼，能做到哪裡' },
  { start: 14, label: 'Agent 的心智模型與 Claude Code 實作' },
  { start: 42, label: 'Agent 運作框架與成本分析' },
  { start: 69, label: '手冊（CLAUDE.md）的疑難雜症與轉移' },
  { start: 80, label: '讓 Agent 分工，並守住品質' },
  { start: 93, label: 'Agent 循環開發流程' },
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
const REQUESTED_SLIDE = Number(PARAMS.get('slide'));
const INITIAL_SLIDE = Number.isFinite(REQUESTED_SLIDE)
  ? Math.min(Math.max(Math.trunc(REQUESTED_SLIDE) - 1, 0), SLIDES.length - 1)
  : 0;
const REQUESTED_STEP = Number(PARAMS.get('step'));
const INITIAL_STEP = Number.isFinite(REQUESTED_STEP) ? Math.max(Math.trunc(REQUESTED_STEP), 0) : 0;

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
  const [current, setCurrent] = useState(INITIAL_SLIDE);
  const [currentStep, setCurrentStep] = useState(INITIAL_STEP);
  const [fontScale, setFontScale] = useState<number>(100); // default 100%
  /** 計時器叫出來的時候，翻頁的鍵與點擊都要讓給它 */
  const [timerActive, setTimerActive] = useState(false);
  const maxStepRef = useRef(0);
  const controlFocusClass = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

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
      if (timerActive) return;
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
  }, [next, prev, timerActive]);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (timerActive) return;
    // 點投影片裡的按鈕與連結時不要推進。連結一併放行，否則點外部連結會開新分頁，
    // 底下卻偷偷跳掉一格，講者切回來位置就不對了。放在這裡是為了讓之後新增的連結
    // 自動適用，不必每個 <a> 都記得補一次 stopPropagation。
    if ((e.target as HTMLElement).closest('button, a')) return;
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
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Top Progress Bar */}
      <div className="h-1.5 bg-slate-900 w-full z-50">
        <motion.div
          className="h-full bg-sky-400"
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

      <CountdownOverlay onActiveChange={setTimerActive} />

      {/* Floating Controls */}
      {!IS_CLEAN && <div className="absolute bottom-6 right-6 flex gap-2 items-center bg-slate-900/80 p-2 rounded-full backdrop-blur-md border border-slate-800 shadow-2xl z-50">

        {/* 倒數計時器。鍵盤按 T 也可以叫出來 */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); openCountdown(); }}
          className={`p-1.5 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-sky-300 ${controlFocusClass}`}
          title="倒數計時器 (T)"
          aria-label="開啟倒數計時器"
        >
          <Timer size={16} />
        </button>

        {/* Font Scale Adjuster */}
        <div className="flex gap-1 items-center px-2.5 py-0.5 border-r border-slate-800 text-slate-400 select-none shrink-0" onClick={e => e.stopPropagation()}>
          <Type size={12} className="text-slate-500 mr-1" />
          <button
            type="button"
            onClick={() => setFontScale(p => Math.max(85, p - 5))}
            disabled={fontScale <= 85}
            className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold hover:bg-slate-800 hover:text-slate-200 rounded transition-colors disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed ${controlFocusClass}`}
            title="A- (縮小)"
            aria-label="縮小投影片文字"
          >
            －
          </button>
          <span className="text-[10px] font-mono font-bold min-w-[28px] text-center text-slate-300">
            {fontScale}%
          </span>
          <button
            type="button"
            onClick={() => setFontScale(p => Math.min(150, p + 5))}
            disabled={fontScale >= 150}
            className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold hover:bg-slate-800 hover:text-slate-200 rounded transition-colors disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed ${controlFocusClass}`}
            title="A+ (放大)"
            aria-label="放大投影片文字"
          >
            ＋
          </button>
        </div>

        <select 
          className={`bg-transparent text-xs font-mono text-slate-400 px-3 py-1 cursor-pointer hover:text-slate-200 transition-colors appearance-none text-center max-w-[120px] truncate rounded ${controlFocusClass}`}
          value={current}
          aria-label="選擇投影片"
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
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }} 
            disabled={current === 0 && currentStep === 0} 
            className={`p-1.5 hover:bg-slate-800 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-300 ${controlFocusClass}`}
            aria-label="上一個步驟或上一張投影片"
          >
            <ChevronLeft size={18}/>
          </button>
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }} 
            disabled={current === SLIDES.length - 1 && currentStep === maxStepRef.current} 
            className={`p-1.5 hover:bg-slate-800 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-300 ${controlFocusClass}`}
            aria-label="下一個步驟或下一張投影片"
          >
            <ChevronRight size={18}/>
          </button>
        </div>
      </div>}

    </div>
  );
}
