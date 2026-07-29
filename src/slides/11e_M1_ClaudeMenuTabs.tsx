import React, { useState } from 'react';
import { HelpCircle, Settings, Terminal, Sliders } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

type TabType = 'status' | 'settings' | 'session' | 'custom';

export default function SlideClaudeMenuTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('status');

  const tabContent = {
    status: {
      title: '查現況',
      subtitle: '搞不清楚狀況時',
      desc: '',
      points: [
        { cmd: '/help', desc: '列出所有可用指令' },
        { cmd: '/status', desc: '目前登入的帳號與模型' },
        { cmd: '/context', desc: '對話還剩多少空間' }
      ],
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20'
    },
    settings: {
      title: '設定與權限',
      subtitle: '決定它能動到哪裡',
      desc: '',
      points: [
        { cmd: '/permissions', desc: '設定允許與禁止的規則' },
        { cmd: '/model', desc: '換模型（控制花費最直接的手段）' },
        { cmd: 'Shift + Tab', desc: '循環切換權限模式' }
      ],
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    session: {
      title: '會話控制',
      subtitle: '對話變長、變貴時',
      desc: '',
      points: [
        { cmd: '/clear', desc: '開一段全新對話' },
        { cmd: '/compact', desc: '壓縮成摘要繼續（有損，細節會掉）' },
        { cmd: '/resume', desc: '把先前的對話接回來' }
      ],
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    custom: {
      title: '自訂指令',
      subtitle: '同一段話講第三次時',
      desc: '',
      points: [
        { cmd: '.claude/commands/', desc: '一個 .md 檔就是一個自訂指令' },
        { cmd: 'git 版控', desc: '跟著進版控，團隊 clone 就能共用' },
        { cmd: '/agents', desc: '建立專責的子代理' }
      ],
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    }
  };

  return (
    <SlideLayout
      title="Claude Code 指令的四種類型"
      subtitle="Slash Commands, Grouped by What You Need"
      icon={Sliders}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-2 text-left items-stretch">
        
        {/* Left Side: Interactive Tabs and Concept */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <AnimatedBlock stepIndex={1}>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-sky-500/10 border border-sky-500/20 rounded-full text-[11px] font-mono text-sky-400 font-bold tracking-wider uppercase mb-3">
                Slash Commands
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2 leading-snug">
                指令很多，但只有四種用途
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                打 <span className="font-mono text-slate-300">/</span> 會跳出一長串指令，不用背。
                照「你現在想幹嘛」分成四類，需要時再回來查：
              </p>
            </AnimatedBlock>

            {/* Selector Buttons */}
            <div className="space-y-2 mb-6">
              {(Object.keys(tabContent) as TabType[]).map((tab, idx) => {
                const isActive = activeTab === tab;
                const config = tabContent[tab];
                let tabIcon = <HelpCircle size={14} />;
                if (tab === 'settings') tabIcon = <Settings size={14} />;
                if (tab === 'session') tabIcon = <Terminal size={14} />;
                if (tab === 'custom') tabIcon = <Sliders size={14} />;

                return (
                  <AnimatedBlock key={tab} stepIndex={idx + 2}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                        isActive 
                          ? 'bg-slate-900 border-sky-500/50 shadow-[0_0_15px_rgba(56,189,248,0.15)] text-slate-100' 
                          : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${isActive ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-900 text-slate-500'}`}>
                          {tabIcon}
                        </div>
                        <span className="text-xs font-bold font-mono">{config.title}</span>
                      </div>
                      <span className="text-[11px] font-mono opacity-60">
                        {tab === 'status' && '我在哪'}
                        {tab === 'settings' && '能動哪'}
                        {tab === 'session' && '太長了'}
                        {tab === 'custom' && '存起來'}
                      </span>
                    </button>
                  </AnimatedBlock>
                );
              })}
            </div>
          </div>

          {/* Quick interactive hint */}
          <AnimatedBlock stepIndex={6} className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
            <span className="text-sky-400 shrink-0 mt-0.5">💡</span>
            <p>真的只需要先記兩個：<span className="font-mono text-slate-300">/help</span> 忘記指令時查，<span className="font-mono text-slate-300">/clear</span> 想重來時用。其他等遇到再說。</p>
          </AnimatedBlock>
        </div>

        {/* Right Side: High-fidelity Tab Display + Advanced Feature (Design Sync) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          {/* Main Tab Details Window */}
          <AnimatedBlock stepIndex={3} className="bg-slate-900/70 border border-slate-700/70 rounded-2xl p-6 relative overflow-hidden flex-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/[0.02] rounded-full blur-2xl pointer-events-none" />
            
            {/* Header info */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 border rounded-full ${tabContent[activeTab].badgeColor}`}>
                {tabContent[activeTab].title}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Claude Code CLI</span>
            </div>

            <h4 className="text-lg font-bold text-slate-100 mb-5">{tabContent[activeTab].subtitle}</h4>

            <div className="grid grid-cols-[max-content_1fr] gap-x-5 gap-y-3.5 items-baseline">
              {tabContent[activeTab].points.map((point, index) => (
                <React.Fragment key={index}>
                  <code className="font-mono text-sm font-semibold text-sky-300 whitespace-nowrap">{point.cmd}</code>
                  <p className="text-sm text-slate-200 leading-relaxed">{point.desc}</p>
                </React.Fragment>
              ))}
            </div>
          </AnimatedBlock>



        </div>

      </div>
    </SlideLayout>
  );
}
