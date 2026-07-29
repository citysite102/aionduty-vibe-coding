import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Bot, Code2, FileCode2, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';
import { theme, fadeInMove } from './theme';

export const OrchestratorSplit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-60 Big Block
  const bigBlockStyle = fadeInMove(frame, 0, 30);
  const bigBlockOpacity = interpolate(frame, [120, 130], [1, 0], { extrapolateRight: 'clamp' }); // fades out when splitting

  // 60-120 Orchestrator
  const orchestratorStyle = fadeInMove(frame, 60, 30);

  // 120-210 Split
  const splitProgress = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 20 } });
  
  // 210-300 Loading & Checkmarks
  const load1 = spring({ frame: Math.max(0, frame - 210), fps, config: { damping: 20 } });
  const load2 = spring({ frame: Math.max(0, frame - 230), fps, config: { damping: 20 } });
  const load3 = spring({ frame: Math.max(0, frame - 250), fps, config: { damping: 20 } });

  // 300-360 Return and Merge
  const returnProgress = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 20 } });
  
  const endTextStyle = fadeInMove(frame, 360, 30);

  // Positions
  const startY = 400;
  const startCenterY = startY + 80; // Big block height is 160
  
  const subY = 750;
  const subCenterY = subY + 60; // Sub block height is 120
  
  const offsetsX = [-400, 0, 400]; // Spread them out more
  const orchestratorBottom = 270;

  return (
    <div style={{ flex: 1, backgroundColor: theme.bg, color: theme.textMain, fontFamily: theme.fontSans, position: 'relative', overflow: 'hidden' }}>
      
      {/* Orchestrator */}
      {frame >= 60 && (
        <div style={{ position: 'absolute', top: 150, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', ...orchestratorStyle, zIndex: 10 }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', backgroundColor: theme.bg, border: `6px solid ${theme.accent}`, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: `0 0 30px ${theme.accent}40` }}>
            <Bot size={64} color={theme.accent} />
          </div>
          <div style={{ marginTop: 20, fontSize: 32, fontWeight: 700, color: theme.accent }}>指揮者 (Orchestrator)</div>
        </div>
      )}

      {/* Initial Big Block */}
      {frame < 130 && (
         <div style={{ position: 'absolute', top: startY, left: '50%', transform: 'translateX(-50%)', width: 440, height: 160, backgroundColor: theme.textSub, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: bigBlockOpacity, zIndex: 5, ...bigBlockStyle, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
           <FileCode2 size={48} color={theme.bg} style={{ marginRight: 16 }} />
           <span style={{ fontSize: 40, fontWeight: 700, color: theme.bg }}>大型開發任務</span>
         </div>
      )}

      {/* Splitting Blocks */}
      {frame >= 120 && frame < 360 && [0,1,2].map((i) => {
        // Animation calculations
        const x = interpolate(splitProgress, [0, 1], [0, offsetsX[i]]);
        const y = interpolate(splitProgress, [0, 1], [startCenterY, subCenterY - 140]);
        // When returning, interpolate back to orchestrator
        const returnX = interpolate(returnProgress, [0, 1], [x, 0]);
        const returnY = interpolate(returnProgress, [0, 1], [y, orchestratorBottom]); // merges back to orchestrator

        // Loading scale
        const loadP = i === 0 ? load1 : i === 1 ? load2 : load3;
        const scale = returnProgress > 0 ? interpolate(returnProgress, [0,1], [1, 0.5]) : 1;
        const opacity = returnProgress > 0.8 ? 0 : 1;

        const RoleIcon = i === 0 ? Code2 : i === 1 ? Zap : ShieldCheck;
        const roleName = i === 0 ? '前端 Agent' : i === 1 ? '後端 Agent' : '測試 Agent';

        return (
          <React.Fragment key={i}>
            {/* Outline Path */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              {splitProgress > 0 && returnProgress === 0 && (
                 <path d={`M 960 ${startCenterY} L ${960 + x} ${y}`} stroke={theme.textSub} strokeWidth={6} strokeDasharray="12 12" opacity={0.4} />
              )}
              {returnProgress > 0 && (
                 <path d={`M ${960 + returnX} ${returnY} L 960 ${orchestratorBottom}`} stroke={theme.accent} strokeWidth={8} strokeDasharray="12 12" opacity={0.8 * (1 - returnProgress)} />
              )}
            </svg>

            {/* Subagent Nodes */}
            <div style={{ position: 'absolute', top: subY, left: `calc(50% + ${offsetsX[i]}px)`, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: splitProgress, zIndex: 10 }}>
               <div style={{ width: 120, height: 120, borderRadius: '50%', backgroundColor: theme.bg, border: `6px solid ${loadP > 0.9 ? theme.accent : theme.textSub}`, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', boxShadow: loadP > 0.9 ? `0 0 30px ${theme.accent}60` : 'none', transition: 'all 0.3s' }}>
                 <RoleIcon size={56} color={loadP > 0.9 ? theme.accent : theme.textSub} />
                 {/* Loading Checkmark */}
                 {loadP > 0.9 && (
                   <div style={{ position: 'absolute', right: -15, top: -15, backgroundColor: theme.bg, borderRadius: '50%' }}>
                     <CheckCircle2 size={48} color={theme.accent} />
                   </div>
                 )}
               </div>
               <div style={{ marginTop: 20, fontSize: 24, fontWeight: 700, color: loadP > 0.9 ? theme.accent : theme.textSub }}>{roleName}</div>
            </div>

            {/* Moving Task Blocks */}
            <div style={{ 
              position: 'absolute', top: returnY - 40, left: `calc(50% + ${returnX}px)`, transform: `translateX(-50%) scale(${scale})`, 
              width: 180, height: 80, backgroundColor: loadP > 0.9 ? theme.accent : theme.textSub, borderRadius: 16, 
              display: 'flex', justifyContent: 'center', alignItems: 'center', opacity, zIndex: 20, boxShadow: '0 10px 20px rgba(0,0,0,0.4)'
            }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: theme.bg }}>{loadP > 0.9 ? '完成品' : '子任務'}</span>
            </div>
          </React.Fragment>
        )
      })}

      {/* Finished Block */}
      {frame >= 320 && (
        <div style={{ position: 'absolute', top: 380, left: '50%', transform: `translateX(-50%) scale(${returnProgress})`, width: 440, height: 160, backgroundColor: theme.accent, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: returnProgress, zIndex: 30, boxShadow: `0 20px 50px ${theme.accent}80` }}>
          <CheckCircle2 size={56} color={theme.bg} style={{ marginRight: 16 }} />
          <span style={{ fontSize: 40, fontWeight: 700, color: theme.bg }}>最終完整系統</span>
        </div>
      )}

      {/* End Text */}
      {frame >= 360 && (
         <div style={{ position: 'absolute', bottom: 120, left: '50%', transform: 'translateX(-50%)', fontSize: 56, fontWeight: 700, color: theme.textMain, ...endTextStyle }}>
           計畫與進度，始終在<span style={{ color: theme.accent, borderBottom: `6px solid ${theme.accent}`, paddingBottom: 8, marginLeft: 16 }}>指揮者手上</span>
         </div>
      )}

    </div>
  );
};
