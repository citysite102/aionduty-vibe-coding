import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { theme, fadeInMove } from './theme';

export const WorkflowLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0:00-0:02 (0-60)
  const promptOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const cursorBlink = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;

  // 0:02-0:03 (60-90)
  const titleStyle = fadeInMove(frame, 60, 30);

  // Nodes animation (90-240)
  const nodes = ['Explore', 'Plan', 'Execute', 'Verify'];
  const startNodes = [90, 130, 170, 210];

  // 0:08-0:10 (240-300) Arc and hint text
  const loopHintStyle = fadeInMove(frame, 240, 20);
  const loopArcProgress = spring({ frame: frame - 240, fps, config: { damping: 30, stiffness: 120 } });
  
  // 0:10-0:12 (300-360) Role text
  const roleTextStyle = fadeInMove(frame, 300, 20);

  return (
    <div style={{ flex: 1, backgroundColor: theme.bg, fontFamily: theme.fontSans, position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textMain }}>
      
      {/* Initial Terminal Prompt */}
      {frame < 90 && (
        <div style={{ position: 'absolute', fontFamily: theme.fontMono, color: theme.textSub, fontSize: 64, opacity: promptOpacity }}>
          <span style={{ color: theme.accent }}>~</span> % <span style={{ opacity: cursorBlink, backgroundColor: theme.textMain, display: 'inline-block', width: 24, height: 48, verticalAlign: 'middle', marginLeft: 8 }} />
        </div>
      )}

      {/* Title */}
      {frame >= 60 && frame < 300 && (
        <div style={{ position: 'absolute', top: 200, fontSize: 48, fontWeight: 700, ...titleStyle }}>
          別一開口就叫它寫 code
        </div>
      )}

      {/* Nodes */}
      <div style={{ position: 'absolute', top: 400, left: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 120 }}>
        {nodes.map((n, i) => {
          const sFrame = startNodes[i];
          const isActive = frame >= sFrame;
          const nodeScale = spring({ frame: frame - sFrame, fps, config: { damping: 20, stiffness: 100 } });
          const isHighlight = Math.floor(frame / 40) % 4 === i; // just visual for pulse later
          
          if (!isActive) return <div key={n} style={{ width: 160, height: 160 }} />;

          return (
            <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
               <div style={{ 
                 width: 160, height: 160, borderRadius: 32, 
                 backgroundColor: theme.bg, 
                 border: `4px solid ${frame >= 250 && isHighlight ? theme.accent : theme.textSub}`,
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 transform: `scale(${0.96 + nodeScale * 0.04})`,
                 opacity: interpolate(nodeScale, [0, 1], [0, 1]),
                 transition: 'border-color 0.3s ease'
               }}>
                 <span style={{ fontSize: 32, fontFamily: theme.fontMono, color: frame >= 250 && isHighlight ? theme.textMain : theme.textSub, fontWeight: 700 }}>
                   {i + 1}
                 </span>
               </div>
               <div style={{ marginTop: 24, fontSize: 32, color: theme.textMain, opacity: nodeScale }}>
                 {n}
               </div>

               {/* Arrows */}
               {i < 3 && frame >= startNodes[i + 1] && (
                 <div style={{
                   position: 'absolute', right: -90, top: 80, width: 60, height: 4, 
                   backgroundColor: theme.textSub, transform: 'translateY(-50%)',
                   opacity: spring({ frame: frame - startNodes[i + 1], fps, config: { damping: 20 } })
                 }}>
                   <div style={{ position: 'absolute', right: -4, top: -6, width: 16, height: 16, borderTop: `4px solid ${theme.textSub}`, borderRight: `4px solid ${theme.textSub}`, transform: 'rotate(45deg)' }} />
                 </div>
               )}
            </div>
          );
        })}
      </div>

      {/* Loop Arc */}
      {frame >= 240 && (
         <div style={{ position: 'absolute', top: 580, left: '50%', transform: 'translateX(-50%)', width: 900, height: 150 }}>
           <svg width="100%" height="100%" viewBox="0 0 900 150" fill="none">
             <path 
               d="M 820,0 C 820,100 80,100 80,0" 
               stroke={theme.accent} strokeWidth="6" 
               strokeDasharray="1800"
               strokeDashoffset={1800 - 1800 * loopArcProgress}
               strokeLinecap="round"
             />
             <path d="M 60,10 L 80,0 L 100,10" stroke={theme.accent} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: loopArcProgress > 0.9 ? 1 : 0 }} />
           </svg>
         </div>
      )}

      {frame >= 240 && frame < 300 && (
        <div style={{ position: 'absolute', bottom: 200, fontSize: 40, color: theme.accent, ...loopHintStyle }}>
          這是循環，不是直線
        </div>
      )}

      {/* Final Role text */}
      {frame >= 300 && (
        <div style={{ position: 'absolute', bottom: 120, right: 120, fontSize: 36, ...roleTextStyle }}>
          <span style={{ color: theme.textSub }}>你的角色：</span>
          <span style={{ textDecoration: 'line-through', opacity: 0.5, marginRight: 16 }}>從 builder</span>
          <span style={{ color: theme.accent, fontWeight: 700 }}>到 reviewer</span>
        </div>
      )}
    </div>
  );
};
